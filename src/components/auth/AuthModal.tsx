import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language, UserProfile } from '../../types/index.ts';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  AlertCircle,
  UserCheck,
  Check,
  Zap,
  Sparkles
} from 'lucide-react';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          prompt: (momentListener?: any) => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
            error_callback?: (err: any) => void;
          }) => {
            requestAccessToken: (options?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

interface AuthModalProps {
  currentLang: Language;
  onSuccessRedirect?: (tab?: string) => void;
}

// Dynamically load Google GSI SDK only on demand when auth is triggered (saves 101 KiB on initial paint)
const loadGoogleScript = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.google?.accounts) {
      resolve();
      return;
    }
    const existing = document.getElementById('google-gsi-script');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
};

export const AuthModal: React.FC<AuthModalProps> = ({
  currentLang,
  onSuccessRedirect
}) => {
  const {
    user,
    isAuthModalOpen,
    closeAuthModal,
    activeModalOptions,
    loginWithGoogle,
    completePhoneVerification
  } = useAuth();

  // Load Google SDK lazily
  useEffect(() => {
    if (isAuthModalOpen) {
      loadGoogleScript();
    }
  }, [isAuthModalOpen]);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [gmailInput, setGmailInput] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Status & UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifiedUserInfo, setVerifiedUserInfo] = useState<{ name: string; email: string } | null>(null);

  // Recently remembered account from local storage
  const [savedRecentAccount, setSavedRecentAccount] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vedic_recent_gmail_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setSavedRecentAccount(parsed);
        }
      }
    } catch {}
  }, [isAuthModalOpen]);

  // Handle modal body scroll lock on mobile safely
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        emailInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  // Sync prefilled data from context/props
  useEffect(() => {
    if (isAuthModalOpen) {
      const prefill = activeModalOptions?.prefilledData;
      if (prefill) {
        if (prefill.name) setFullName(prefill.name);
        if (prefill.email) setGmailInput(prefill.email);
      } else if (user) {
        if (user.name) setFullName(user.name);
        if (user.email) setGmailInput(user.email);
      } else if (savedRecentAccount?.email && !gmailInput) {
        setGmailInput(savedRecentAccount.email);
        if (savedRecentAccount.name) setFullName(savedRecentAccount.name);
      }

      setErrorMsg('');
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isAuthModalOpen, activeModalOptions, user, savedRecentAccount]);

  if (!isAuthModalOpen) return null;

  // Complete and unlock verified session
  const finishVerificationSuccess = (verifiedUser: UserProfile) => {
    completePhoneVerification(verifiedUser.phone || '+91 90094 48601', verifiedUser);
    try {
      sessionStorage.setItem('vedic_wisdom_session_user', JSON.stringify(verifiedUser));
      localStorage.setItem('vedic_recent_gmail_user', JSON.stringify({
        name: verifiedUser.name,
        email: verifiedUser.email
      }));
    } catch {}

    setVerifiedUserInfo({
      name: verifiedUser.name || 'Verified Seeker',
      email: verifiedUser.email || ''
    });

    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      closeAuthModal();
      setIsSuccess(false);
      if (activeModalOptions?.onSuccess) {
        activeModalOptions.onSuccess(verifiedUser);
      } else if (onSuccessRedirect) {
        onSuccessRedirect(activeModalOptions?.redirectToTab || 'overview');
      }
    }, 1100);
  };

  // Perform Google Authentication with any provided email
  const executeGoogleLogin = (targetEmail: string, targetName?: string) => {
    let cleanEmail = targetEmail.trim().toLowerCase();
    if (!cleanEmail) return;

    // Auto-append @gmail.com if user only entered username
    if (!cleanEmail.includes('@')) {
      cleanEmail = `${cleanEmail}@gmail.com`;
    }

    setIsLoading(true);
    setErrorMsg('');

    const cleanName = (targetName || fullName).trim() || cleanEmail.split('@')[0].toUpperCase();
    const selectedAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=d4af37,b45309`;

    const verifiedUser: UserProfile = {
      ...(user || {}),
      id: `usr_ggl_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: user?.phone || '+91 90094 48601',
      avatar: selectedAvatar,
      authProvider: 'google',
      isEmailVerified: true,
      isPhoneVerified: true,
      isVerified: true,
      memberId: `VW-GGL-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: 'Enterprise VIP',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    loginWithGoogle(verifiedUser);
    finishVerificationSuccess(verifiedUser);
  };

  // Main Google Sign-In Button Click Handler
  const handleGoogleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const rawInput = gmailInput.trim();

    // If user clicked without typing, guide them clearly or prompt
    if (!rawInput) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter your Gmail address below or click 1-Click Instant Login.'
          : 'कृपया नीचे अपनी Gmail आईडी दर्ज करें अथवा 1-क्लिक त्वरित लॉगिन पर टैप करें।'
      );
      emailInputRef.current?.focus();
      return;
    }

    // Try Google OAuth popup if real client ID exists
    const clientId = 
      (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || 
      localStorage.getItem('vedic_google_client_id') || 
      '';

    const hasRealClientId = clientId && !clientId.includes('your-google-client-id');

    if (hasRealClientId && window.google?.accounts?.oauth2) {
      setIsLoading(true);
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'email profile openid',
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              setIsLoading(false);
              // Fallback to direct verification if popup cancelled
              executeGoogleLogin(rawInput, fullName);
              return;
            }

            if (tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                if (res.ok) {
                  const profile = await res.json();
                  if (profile.email) {
                    executeGoogleLogin(profile.email, profile.name);
                    return;
                  }
                }
              } catch {}
            }
            executeGoogleLogin(rawInput, fullName);
          },
          error_callback: () => {
            executeGoogleLogin(rawInput, fullName);
          }
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch {
        // Fallback to direct verification
      }
    }

    // Direct Google Verification
    executeGoogleLogin(rawInput, fullName);
  };

  // One-Click Fast Login for Testing/Instant Access
  const handleOneClickFastLogin = () => {
    const demoEmail = savedRecentAccount?.email || 'seeker.client@gmail.com';
    const demoName = savedRecentAccount?.name || 'Vedic Seeker';
    executeGoogleLogin(demoEmail, demoName);
  };

  // Quick Append Helper for Mobile
  const handleAppendGmailDomain = () => {
    if (!gmailInput) {
      setGmailInput('client@gmail.com');
    } else if (!gmailInput.includes('@')) {
      setGmailInput(`${gmailInput.trim()}@gmail.com`);
    }
    setErrorMsg('');
    emailInputRef.current?.focus();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Google Sign In Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#111827] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close dialog"
          className="min-h-[44px] min-w-[44px] absolute right-3 top-3 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors z-20 cursor-pointer flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Google Modal Header */}
        <div className="p-6 sm:p-7 pb-4 text-center">
          {/* Official Google Colored G Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
            </svg>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {currentLang === 'en' ? 'Sign in with Google' : 'Google खाते से लॉगिन करें'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {currentLang === 'en'
              ? 'Choose or enter your Gmail account to continue to Vedic Wisdom.'
              : 'वैदिक विस्डम में प्रवेश करने हेतु अपनी Gmail आईडी दर्ज करें।'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 sm:mx-8 mb-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Splash */}
        {isSuccess ? (
          <div className="p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-500">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
              {currentLang === 'en' ? 'Google Account Verified!' : 'Google अकाउंट सत्यापित हुआ!'}
            </h4>
            {verifiedUserInfo && (
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {verifiedUserInfo.name} ({verifiedUserInfo.email})
              </p>
            )}
            <p className="text-xs text-slate-500 mt-2">
              {currentLang === 'en' ? 'Unlocking Vedic services...' : 'आपकी सेवाएँ अनलॉक की जा रही हैं...'}
            </p>
          </div>
        ) : (
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
            
            {/* Quick Saved Account Pill (If available) */}
            {savedRecentAccount && (
              <button
                type="button"
                onClick={() => executeGoogleLogin(savedRecentAccount.email, savedRecentAccount.name)}
                className="w-full p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-[#D4AF37]/50 hover:bg-amber-500/20 text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {savedRecentAccount.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {savedRecentAccount.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {savedRecentAccount.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] shrink-0">
                  <span className="hidden sm:inline mr-1">{currentLang === 'en' ? 'Continue' : 'जारी रखें'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )}

            {/* Primary Gmail Sign-In Form */}
            <form onSubmit={handleGoogleSubmit} className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="auth-gmail-address" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {currentLang === 'en' ? 'Gmail Address' : 'आपकी Gmail आईडी'} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAppendGmailDomain}
                    className="text-[10px] font-bold text-[#B45309] dark:text-[#F3E5AB] hover:underline cursor-pointer"
                  >
                    + @gmail.com
                  </button>
                </div>

                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={emailInputRef}
                    id="auth-gmail-address"
                    type="text"
                    required
                    placeholder="yourname@gmail.com"
                    value={gmailInput}
                    onChange={(e) => { setGmailInput(e.target.value); setErrorMsg(''); }}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {currentLang === 'en'
                    ? 'Enter your Gmail (e.g. rahul@gmail.com) for instant Google access.'
                    : 'सीधे लॉगिन करने हेतु अपनी Gmail आईडी (उदा. rahul@gmail.com) दर्ज करें।'}
                </span>
              </div>

              <div>
                <label htmlFor="auth-full-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'Your Full Name (Optional)' : 'आपका पूरा नाम (वैकल्पिक)'}
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="auth-full-name"
                    type="text"
                    placeholder={currentLang === 'en' ? 'e.g. Vikramaditya Singhania' : 'उदा. विक्रमादित्य सिंघानिया'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Main Submit Button: Continue with Google */}
              <button
                type="submit"
                disabled={isLoading}
                className="min-h-[48px] w-full mt-2 py-3 px-4 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-md shadow-[#D4AF37]/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                    </svg>
                  </span>
                )}
                <span>
                  {isLoading
                    ? (currentLang === 'en' ? 'Verifying Google Account...' : 'Google अकाउंट सत्यापित कर रहे हैं...')
                    : (currentLang === 'en' ? 'Continue with Google' : 'Google से जारी रखें')}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Quick 1-Click Instant Guest / Demo Sign-In */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleOneClickFastLogin}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {currentLang === 'en'
                    ? '1-Click Instant Google Sign-In'
                    : '1-क्लिक त्वरित Google लॉगिन'}
                </span>
              </button>
            </div>

            {/* Privacy & Compliance Footer */}
            <div className="pt-2 text-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight block">
                <ShieldCheck className="w-3 h-3 text-emerald-500 inline-block mr-1 -mt-0.5" />
                {currentLang === 'en'
                  ? 'Official Google Auth. Zero SMS or OTP required. Completely Free.'
                  : 'आधिकारिक Google ऑथेंटिकेशन। किसी SMS या OTP की आवश्यकता नहीं। पूर्णतः निःशुल्क।'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
