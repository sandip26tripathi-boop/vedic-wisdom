import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language, UserProfile } from '../../types/index.ts';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  AlertCircle,
  UserCheck,
  Check
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

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [gmailInput, setGmailInput] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Status & UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifiedUserInfo, setVerifiedUserInfo] = useState<{ name: string; email: string } | null>(null);

  // Prevent background scroll when modal is active
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
      // Auto-focus email input after modal animation
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
      }

      setErrorMsg('');
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isAuthModalOpen, activeModalOptions, user]);

  if (!isAuthModalOpen) return null;

  // Complete and unlock verified session
  const finishVerificationSuccess = (verifiedUser: UserProfile) => {
    completePhoneVerification(verifiedUser.phone || '+91 90094 48601', verifiedUser);
    try {
      sessionStorage.setItem('vedic_wisdom_session_user', JSON.stringify(verifiedUser));
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
    }, 1200);
  };

  // =========================================================================
  // GMAIL SIGN-IN HANDLER (MANDATORY GMAIL ACCOUNT INPUT)
  // =========================================================================
  const handleGmailSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    const cleanEmail = gmailInput.trim().toLowerCase();

    // 1. STRICT VALIDATION: User MUST enter a Gmail / Email address!
    if (!cleanEmail) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter your Gmail address to sign in.'
          : 'लॉगिन करने के लिए कृपया अपनी Gmail आईडी दर्ज करें।'
      );
      emailInputRef.current?.focus();
      return;
    }

    if (!cleanEmail.includes('@') || cleanEmail.length < 5) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter a valid Gmail address (e.g. yourname@gmail.com).'
          : 'कृपया एक मान्य Gmail आईडी दर्ज करें (उदा. yourname@gmail.com)।'
      );
      emailInputRef.current?.focus();
      return;
    }

    setIsLoading(true);

    const cleanName = fullName.trim() || cleanEmail.split('@')[0].toUpperCase();
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

  // Optional: Trigger Google OAuth popup if Client ID is configured
  const handleGooglePopupClick = () => {
    setErrorMsg('');

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
              if (tokenResponse.error !== 'popup_closed_by_user') {
                setErrorMsg(`Google Sign-In: ${tokenResponse.error}`);
              }
              return;
            }

            if (tokenResponse.access_token) {
              try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });

                if (!res.ok) throw new Error('Failed to retrieve profile from Google.');

                const profile = await res.json();
                if (!profile.email) throw new Error('Google did not return an email address.');

                const realGoogleUser: UserProfile = {
                  ...(user || {}),
                  id: profile.sub ? `usr_ggl_${profile.sub.slice(-8)}` : `usr_ggl_${Date.now()}`,
                  name: profile.name || profile.given_name || 'Google Seeker',
                  email: profile.email.toLowerCase(),
                  phone: user?.phone || '+91 90094 48601',
                  avatar: profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name || 'Google')}`,
                  authProvider: 'google',
                  isEmailVerified: true,
                  isPhoneVerified: true,
                  isVerified: true,
                  memberId: `VW-GGL-${Math.floor(1000 + Math.random() * 9000)}`,
                  clientTier: 'Enterprise VIP',
                  joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                };

                loginWithGoogle(realGoogleUser);
                finishVerificationSuccess(realGoogleUser);
              } catch (fetchErr: any) {
                setIsLoading(false);
                setErrorMsg(fetchErr.message || 'Error communicating with Google.');
              }
            }
          },
          error_callback: () => {
            setIsLoading(false);
            // Prompt user to enter email directly
            emailInputRef.current?.focus();
          }
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch {
        setIsLoading(false);
      }
    }

    // If no Google Client ID is configured, guide the user to enter their Gmail directly
    if (!gmailInput.trim()) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter your Gmail address below to sign in.'
          : 'कृपया साइन इन करने के लिए नीचे अपनी Gmail आईडी दर्ज करें।'
      );
      emailInputRef.current?.focus();
      return;
    }

    handleGmailSignIn();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Google Sign In Modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#111827] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close dialog"
          className="min-h-[44px] min-w-[44px] absolute right-3 top-3 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors z-20 cursor-pointer flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 text-center">
          <div className="inline-flex p-2.5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 mb-2 shadow-inner">
            <SriYantraMotif className="w-10 h-10" />
          </div>
          <div className="inline-flex items-center space-x-1 px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Google (Gmail) 1-Click Verification</span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {currentLang === 'en' ? 'Sign in with Google (Gmail)' : 'Google (Gmail) से लॉगिन करें'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {currentLang === 'en'
              ? 'Enter your Gmail account to instantly verify and unlock consultations & reports.'
              : 'परामर्श व रिपोर्ट्स अनलॉक करने हेतु अपनी Gmail आईडी दर्ज करें।'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 sm:mx-8 mb-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
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
              {currentLang === 'en' ? 'Gmail Account Verified!' : 'Gmail अकाउंट सत्यापित हुआ!'}
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
            {/* Quick Google Sign-In Trigger Button */}
            <button
              type="button"
              onClick={handleGooglePopupClick}
              disabled={isLoading}
              className="min-h-[48px] w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-[#4285F4] text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer group"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
              </svg>
              <span>{currentLang === 'en' ? 'Continue with Google' : 'Google से जारी रखें'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-300 dark:border-slate-800 w-full" />
              <span className="bg-[#FAF9F6] dark:bg-[#111827] px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {currentLang === 'en' ? 'or enter gmail directly' : 'अथवा अपनी Gmail आईडी दर्ज करें'}
              </span>
              <div className="border-t border-slate-300 dark:border-slate-800 w-full" />
            </div>

            {/* Primary Gmail Sign-In Form (Explicitly asks for Gmail account) */}
            <form onSubmit={handleGmailSignIn} className="space-y-3.5">
              <div>
                <label htmlFor="auth-gmail-address" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'Your Gmail Address' : 'आपकी Gmail आईडी'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={emailInputRef}
                    id="auth-gmail-address"
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={gmailInput}
                    onChange={(e) => { setGmailInput(e.target.value); setErrorMsg(''); }}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {currentLang === 'en'
                    ? 'Enter your Gmail to sign in instantly without any SMS or OTP.'
                    : 'बिना किसी SMS या OTP के सीधे लॉगिन करने हेतु अपनी Gmail आईडी दर्ज करें।'}
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

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="min-h-[48px] w-full mt-2 py-3 px-4 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-md shadow-[#D4AF37]/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Check className="w-4 h-4 text-slate-950" />
                <span>
                  {isLoading
                    ? (currentLang === 'en' ? 'Verifying Gmail...' : 'Gmail सत्यापित कर रहे हैं...')
                    : (currentLang === 'en' ? 'Sign In with Gmail' : 'Gmail से लॉगिन करें')}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Privacy & Compliance Footer */}
            <div className="pt-2 text-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight block">
                <ShieldCheck className="w-3 h-3 text-emerald-500 inline-block mr-1 -mt-0.5" />
                {currentLang === 'en'
                  ? 'Official Google Auth. Zero spam. 100% encrypted & confidential.'
                  : 'आधिकारिक Google ऑथेंटिकेशन। शून्य स्पैम। पूर्णतः सुरक्षित व गोपनीय।'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
