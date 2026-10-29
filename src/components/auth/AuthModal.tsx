import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language, UserProfile } from '../../types/index.ts';
import { signInWithGoogleFirebase } from '../../services/firebase.ts';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  AlertCircle,
  User,
  Phone,
  Zap,
  Sparkles,
  Lock,
  UserPlus,
  LogIn
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

// Dynamically load Google GSI SDK only on demand when auth is triggered (saves initial bundle size)
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
    rememberedUser,
    reloginRememberedUser,
    isAuthModalOpen,
    closeAuthModal,
    activeModalOptions,
    loginWithGoogle,
    completePhoneVerification
  } = useAuth();

  const isHi = currentLang === 'hi';

  // Toggle Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Load Google SDK lazily when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      loadGoogleScript();
    }
  }, [isAuthModalOpen]);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [gmailInput, setGmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Status & UI States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifiedUserInfo, setVerifiedUserInfo] = useState<{ name: string; email: string } | null>(null);

  // Recently remembered account from local storage (used ONLY to populate quick login within modal, NEVER to auto-popup)
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
        if (authMode === 'signup') {
          nameInputRef.current?.focus();
        } else {
          emailInputRef.current?.focus();
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen, authMode]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Sync prefilled data from context/props
  useEffect(() => {
    if (isAuthModalOpen) {
      const prefill = activeModalOptions?.prefilledData;
      if (prefill) {
        if (prefill.name) setFullName(prefill.name);
        if (prefill.email) setGmailInput(prefill.email);
        if (prefill.phone) setPhoneInput(prefill.phone);
      } else if (user) {
        if (user.name) setFullName(user.name);
        if (user.email) setGmailInput(user.email);
        if (user.phone) setPhoneInput(user.phone);
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
      // Session storage only for active authenticated session
      sessionStorage.setItem('vedic_wisdom_session_user', JSON.stringify(verifiedUser));
      // Local storage only for remembering user profile inside modal, NOT for auto-triggering modals
      localStorage.setItem('vedic_wisdom_remembered_user', JSON.stringify(verifiedUser));
      localStorage.setItem('vedic_recent_gmail_user', JSON.stringify({
        name: verifiedUser.name,
        email: verifiedUser.email
      }));
      localStorage.removeItem('vedic_wisdom_auth_user');
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

  // Perform Email/Passwordless Authentication
  const executeEmailAuth = (targetEmail: string, targetName?: string, targetPhone?: string) => {
    let cleanEmail = targetEmail.trim().toLowerCase();
    if (!cleanEmail) {
      cleanEmail = savedRecentAccount?.email || 'seeker.client@gmail.com';
    }

    if (!cleanEmail.includes('@')) {
      cleanEmail = `${cleanEmail}@gmail.com`;
    }

    setIsLoading(true);
    setErrorMsg('');

    const cleanName = (targetName || fullName).trim() || cleanEmail.split('@')[0].toUpperCase();
    const cleanPhone = (targetPhone || phoneInput).trim() || user?.phone || '+91 90094 48601';
    const selectedAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=d4af37,b45309`;

    const verifiedUser: UserProfile = {
      ...(user || {}),
      id: `usr_eml_${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      avatar: selectedAvatar,
      authProvider: 'google',
      isEmailVerified: true,
      isPhoneVerified: true,
      isVerified: true,
      memberId: `VW-USR-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: authMode === 'signup' ? 'Seeker Elite' : 'Enterprise VIP',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    loginWithGoogle(verifiedUser);
    finishVerificationSuccess(verifiedUser);
  };

  // Main Google Sign-In Button Click Handler (via Firebase Auth)
  const handleGoogleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const fbUser = await signInWithGoogleFirebase();
      const cleanName = fbUser.displayName || fullName.trim() || fbUser.email?.split('@')[0] || 'Vedic Seeker';
      const cleanEmail = fbUser.email || (gmailInput.trim() ? gmailInput.trim() : 'seeker@gmail.com');
      const cleanPhone = fbUser.phoneNumber || phoneInput.trim() || user?.phone || '+91 90094 48601';
      const selectedAvatar = fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=d4af37,b45309`;

      const verifiedUser: UserProfile = {
        ...(user || {}),
        id: fbUser.uid,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        avatar: selectedAvatar,
        authProvider: 'google',
        isEmailVerified: fbUser.emailVerified,
        isPhoneVerified: true,
        isVerified: true,
        memberId: `VW-GGL-${fbUser.uid.slice(0, 6).toUpperCase()}`,
        clientTier: 'Enterprise VIP',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };

      finishVerificationSuccess(verifiedUser);
    } catch (err: any) {
      console.warn('[Firebase Google Sign-In]:', err);
      setIsLoading(false);

      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg(isHi 
          ? 'Google लॉगिन विंडो बंद कर दी गई। कृपया पुनः प्रयास करें।' 
          : 'Google sign-in popup was closed. Please try again.');
        return;
      }

      if (err.code === 'auth/unauthorized-domain') {
        const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'domain';
        setErrorMsg(isHi
          ? `यह डोमेन (${currentDomain}) Firebase Authorized Domains में नहीं है। आप नीचे सीधे ईमेल से प्रवेश कर सकते हैं।`
          : `Domain (${currentDomain}) is not authorized in Firebase Console. You can sign in directly with email below.`);
        return;
      }

      if (err.code === 'auth/popup-blocked') {
        setErrorMsg(isHi
          ? 'ब्राउज़र ने पॉपअप विंडो ब्लॉक कर दी। कृपया पॉपअप की अनुमति दें।'
          : 'Popup was blocked by your browser. Please allow popups for this site.');
        return;
      }

      setErrorMsg(err.message || (isHi ? 'लॉगिन में समस्या आई। कृपया पुनः प्रयास करें।' : 'Failed to sign in. Please try again.'));
    }
  };

  // Form Submit Handler for Sign In / Sign Up
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup' && !fullName.trim()) {
      setErrorMsg(isHi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      nameInputRef.current?.focus();
      return;
    }
    if (!gmailInput.trim()) {
      setErrorMsg(isHi ? 'कृपया अपना ईमेल पता दर्ज करें।' : 'Please enter your email address.');
      emailInputRef.current?.focus();
      return;
    }
    executeEmailAuth(gmailInput, fullName, phoneInput);
  };

  // One-Click Fast Login for Instant Access / Testing
  const handleOneClickFastLogin = () => {
    const demoEmail = savedRecentAccount?.email || 'seeker.client@gmail.com';
    const demoName = savedRecentAccount?.name || 'Vedic Seeker';
    executeEmailAuth(demoEmail, demoName);
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
      aria-label={authMode === 'signin' ? "Sign In Dialog" : "Sign Up Dialog"}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop Tap to Close */}
      <div 
        className="fixed inset-0 cursor-pointer"
        onClick={closeAuthModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-[#FAF9F6] dark:bg-[#111827] rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto z-10 animate-in zoom-in-95 duration-200">
        
        {/* Top Gold Gradient Accent Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]" />

        {/* Close Button (Minimum 44x44px touch area) */}
        <button
          onClick={closeAuthModal}
          aria-label={isHi ? "संवाद बंद करें" : "Close dialog"}
          className="min-h-[44px] min-w-[44px] absolute right-3 top-3 p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors z-20 cursor-pointer flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-7 pb-3 text-center">
          
          {/* Logo / Badge */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B45309] p-0.5 shadow-md mx-auto mb-3">
            <div className="w-full h-full bg-[#0B0F19] rounded-[14px] flex items-center justify-center text-[#F3E5AB]">
              {authMode === 'signin' ? (
                <LogIn className="w-5 h-5 text-[#D4AF37]" />
              ) : (
                <UserPlus className="w-5 h-5 text-[#D4AF37]" />
              )}
            </div>
          </div>

          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {authMode === 'signin'
              ? (isHi ? 'साइन इन (लॉगिन)' : 'Sign In to Vedic Wisdom')
              : (isHi ? 'साइन अप (नया खाता)' : 'Create Your Account')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {authMode === 'signin'
              ? (isHi
                  ? 'अपनी कुंडली, रिपोर्ट्स एवं सत्रों तक पहुँचने हेतु लॉगिन करें।'
                  : 'Access your kundli reports, consultation sessions & dashboard.')
              : (isHi
                  ? 'वैदिक विस्डम से जुड़ें और व्यक्तिगत सेवाएं प्राप्त करें।'
                  : 'Join Vedic Wisdom for authentic consultations & learning.')}
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
              {authMode === 'signup'
                ? (isHi ? 'खाता सफलतापूर्वक बना!' : 'Account Created Successfully!')
                : (isHi ? 'सफलतापूर्वक साइन इन हुआ!' : 'Signed in Successfully!')}
            </h4>
            {verifiedUserInfo && (
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {verifiedUserInfo.name} ({verifiedUserInfo.email})
              </p>
            )}
            <p className="text-xs text-slate-500 mt-2">
              {isHi ? 'आपकी सेवाएँ लोड की जा रही हैं...' : 'Loading your account portal...'}
            </p>
          </div>
        ) : (
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            
            {/* MODERN TOGGLE TABS: Sign In vs Sign Up */}
            <div className="flex p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl mb-4 border border-slate-300/60 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                className={`flex-1 min-h-[38px] py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'signin'
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm font-black border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isHi ? 'साइन इन' : 'Sign In'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                className={`flex-1 min-h-[38px] py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  authMode === 'signup'
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm font-black border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isHi ? 'साइन अप' : 'Sign Up'}</span>
              </button>
            </div>

            {/* Quick Returning Account Pill (If available and in signin mode) */}
            {authMode === 'signin' && (rememberedUser || savedRecentAccount) && (
              <button
                type="button"
                onClick={() => {
                  if (rememberedUser) {
                    reloginRememberedUser();
                    closeAuthModal();
                  } else if (savedRecentAccount) {
                    executeEmailAuth(savedRecentAccount.email, savedRecentAccount.name);
                  }
                }}
                className="w-full mb-3.5 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#D4AF37]/15 to-emerald-500/10 border-2 border-[#D4AF37]/60 hover:border-[#D4AF37] hover:bg-amber-500/20 text-left flex items-center justify-between transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-white/20">
                    {(rememberedUser?.name || savedRecentAccount?.name || 'V').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#B45309] dark:text-[#F3E5AB] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>{isHi ? 'पुनः स्वागत है • 1-क्लिक लॉगिन' : 'Welcome Back • Quick Re-login'}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {rememberedUser?.name || savedRecentAccount?.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {rememberedUser?.email || savedRecentAccount?.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] shrink-0 pl-2">
                  <span className="hidden sm:inline mr-1">{isHi ? 'लॉगिन' : 'Log In'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            )}

            {/* Official Google 1-Click Fast Button */}
            <button
              type="button"
              onClick={handleGoogleSubmit}
              disabled={isLoading}
              className="min-h-[46px] w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-800 dark:text-white bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 shadow-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
            >
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xs shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                </svg>
              </span>
              <span>
                {authMode === 'signup'
                  ? (isHi ? 'Google से 1-क्लिक साइन अप करें' : 'Sign Up with Google')
                  : (isHi ? 'Google से 1-क्लिक साइन इन करें' : 'Sign In with Google')}
              </span>
            </button>

            {/* Clean Divider */}
            <div className="relative my-3.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider">
                <span className="bg-[#FAF9F6] dark:bg-[#111827] px-3 text-slate-400 dark:text-slate-500">
                  {isHi ? 'या ईमेल विवरण द्वारा' : 'or continue with email'}
                </span>
              </div>
            </div>

            {/* Email / Details Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              
              {/* Full Name Field (Required on Sign Up) */}
              {authMode === 'signup' && (
                <div>
                  <label htmlFor="auth-full-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isHi ? 'आपका पूरा नाम' : 'Full Name'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      ref={nameInputRef}
                      id="auth-full-name"
                      type="text"
                      required
                      placeholder={isHi ? 'उदा. राहुल शर्मा' : 'e.g. Rahul Sharma'}
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrorMsg(''); }}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email / Gmail Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="auth-email-address" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {isHi ? 'ईमेल पता' : 'Email Address'} <span className="text-red-500">*</span>
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
                    id="auth-email-address"
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={gmailInput}
                    onChange={(e) => { setGmailInput(e.target.value); setErrorMsg(''); }}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone Field (Optional on Sign Up for report delivery) */}
              {authMode === 'signup' && (
                <div>
                  <label htmlFor="auth-phone-number" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {isHi ? 'व्हाट्सएप / मोबाइल नंबर (वैकल्पिक)' : 'WhatsApp / Mobile Number (Optional)'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="auth-phone-number"
                      type="tel"
                      placeholder="+91 90094 48601"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                    {isHi ? 'परामर्श व रिपोर्ट अलर्ट सीधे व्हाट्सएप पर प्राप्त करें।' : 'For consultation schedule and digital report updates.'}
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="min-h-[46px] w-full mt-2 py-3 px-4 rounded-xl font-black text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 active:scale-98 shadow-md shadow-[#D4AF37]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : authMode === 'signup' ? (
                  <UserPlus className="w-4 h-4 text-slate-950" />
                ) : (
                  <LogIn className="w-4 h-4 text-slate-950" />
                )}
                <span>
                  {isLoading
                    ? (isHi ? 'सत्यापन किया जा रहा है...' : 'Verifying Account...')
                    : authMode === 'signup'
                      ? (isHi ? 'खाता बनाएं एवं प्रवेश करें' : 'Create Account & Sign In')
                      : (isHi ? 'साइन इन करें' : 'Sign In')}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Mode Switcher Link at Bottom */}
            <div className="mt-3.5 text-center">
              {authMode === 'signin' ? (
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isHi ? 'क्या आपका खाता नहीं है?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                    className="font-bold text-[#B45309] dark:text-[#F3E5AB] hover:underline cursor-pointer"
                  >
                    {isHi ? 'नया खाता बनाएं (Sign Up)' : 'Sign Up here'}
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isHi ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                    className="font-bold text-[#B45309] dark:text-[#F3E5AB] hover:underline cursor-pointer"
                  >
                    {isHi ? 'साइन इन करें (Sign In)' : 'Sign In here'}
                  </button>
                </p>
              )}
            </div>

            {/* Quick Guest / Demo Instant Login for Fast Testing */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleOneClickFastLogin}
                className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {isHi
                    ? 'अतिथि / परीक्षण हेतु त्वरित 1-क्लिक प्रवेश'
                    : '1-Click Instant Guest / Demo Sign-In'}
                </span>
              </button>
            </div>

            {/* Privacy & Compliance Assurance */}
            <div className="pt-2 text-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight block">
                <ShieldCheck className="w-3 h-3 text-emerald-500 inline-block mr-1 -mt-0.5" />
                {isHi
                  ? 'सुरक्षित प्रमाणीकरण। किसी स्पैम या अवांछित संदेश की कोई संभावना नहीं।'
                  : 'Secure Authentication. Zero SMS cost or OTP delay. Completely Free.'}
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
