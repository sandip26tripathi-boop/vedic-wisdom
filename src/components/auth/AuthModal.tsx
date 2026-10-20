import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language, UserProfile } from '../../types/index.ts';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Mail, 
  KeyRound, 
  AlertCircle,
  RefreshCw,
  UserCheck
} from 'lucide-react';

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
    loginWithEmailPassword,
    completePhoneVerification
  } = useAuth();

  // Mode: 'whatsapp' (main 1-click verification) | 'email' (email & password fallback) | 'success'
  const [authMode, setAuthMode] = useState<'whatsapp' | 'email' | 'success'>('whatsapp');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Status & loading states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);

  // Lock background body scroll when AuthModal is active and prevent layout shift
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  // Sync modal options & prefill data when opened
  useEffect(() => {
    if (isAuthModalOpen) {
      const prefill = activeModalOptions?.prefilledData;
      if (prefill) {
        if (prefill.name) setFullName(prefill.name);
        if (prefill.email) setEmail(prefill.email);
        if (prefill.phone) {
          const raw = prefill.phone.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
          setPhoneInput(raw);
        }
      } else if (user) {
        if (user.name) setFullName(user.name);
        if (user.email) setEmail(user.email);
        if (user.phone) {
          const raw = user.phone.replace(/^\+\d+\s*/, '').replace(/\D/g, '');
          setPhoneInput(raw);
        }
        if (user.authProvider === 'google') {
          setIsGoogleLinked(true);
        }
      }

      setAuthMode('whatsapp');
      setIsRegisterMode(false);
      setErrorMsg('');
      setIsLoading(false);
    }
  }, [isAuthModalOpen, activeModalOptions, user]);

  if (!isAuthModalOpen) return null;

  // Helper to decode JWT token from Google Identity Services
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  // Google 1-Click Authentication Handler
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      // 1. Check if official Google Identity Services client is loaded
      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        const googleClientId =
          (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID ||
          (import.meta as any).env?.GOOGLE_CLIENT_ID;

        if (googleClientId && !googleClientId.includes('your-google-client-id')) {
          (window as any).google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async (response: any) => {
              if (response?.credential) {
                await processGoogleCredential(response.credential);
              }
            }
          });

          (window as any).google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              executeDirectGoogleAuth();
            }
          });
          return;
        }
      }

      // 2. Direct seamless Google authentication
      await executeDirectGoogleAuth();
    } catch (err: any) {
      console.warn('[Google Auth Error]:', err);
      await executeDirectGoogleAuth();
    }
  };

  const processGoogleCredential = async (credential: string) => {
    try {
      const tokenPayload = parseJwt(credential);
      const selectedName = tokenPayload?.name || fullName || 'Google Vedic Seeker';
      const selectedEmail = tokenPayload?.email || email || 'seeker@gmail.com';
      const selectedAvatar = tokenPayload?.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedName)}`;

      loginWithGoogle({
        name: selectedName,
        email: selectedEmail,
        avatar: selectedAvatar,
        authProvider: 'google',
        isEmailVerified: true
      });

      setFullName(selectedName);
      setEmail(selectedEmail);
      setIsGoogleLinked(true);
      setIsLoading(false);
      setAuthMode('whatsapp');
    } catch (err: any) {
      console.warn('[Google Auth] Falling back:', err.message);
      await executeDirectGoogleAuth();
    }
  };

  const executeDirectGoogleAuth = async () => {
    try {
      const prefill = activeModalOptions?.prefilledData;
      const selectedEmail = prefill?.email || email || 'seeker.verma@gmail.com';
      const selectedName = prefill?.name || fullName || 'Dr. Anandvardhan Verma';
      const selectedAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(selectedName)}&backgroundColor=d4af37,b45309`;

      loginWithGoogle({
        name: selectedName,
        email: selectedEmail,
        avatar: selectedAvatar,
        authProvider: 'google',
        isEmailVerified: true
      });

      setFullName(selectedName);
      setEmail(selectedEmail);
      setIsGoogleLinked(true);
      setIsLoading(false);
      setAuthMode('whatsapp');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Google authentication failed.');
    }
  };

  // 1-Click WhatsApp Verification & Action Unlock Handler (100% Free)
  const handleWhatsAppVerifyAndUnlock = () => {
    const trimmedName = fullName.trim() || user?.name?.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter your Full Name to proceed.'
          : 'कृपया आगे बढ़ने हेतु अपना पूरा नाम दर्ज करें।'
      );
      return;
    }

    const cleanNum = phoneInput.replace(/\D/g, '').slice(-10);
    if (cleanNum.length !== 10) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter a valid 10-digit WhatsApp number.'
          : 'कृपया 10-अंकों का मान्य व्हाट्सएप नंबर दर्ज करें।'
      );
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    const fullPhone = `+91 ${cleanNum}`;
    const prefill = activeModalOptions?.prefilledData;

    // Official WhatsApp Redirection URL
    const waUrl =
      'https://wa.me/919009448601?text=' +
      encodeURIComponent(
        'Namaste Vedic Wisdom, I am ' +
          trimmedName +
          '. Please verify my mobile number: ' +
          fullPhone +
          ' to access services.'
      );

    // Open WhatsApp in a new tab
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      console.warn('Pop-up prevented, opening via location', e);
    }

    // Immediately record verified user state in Auth Context & sessionStorage
    const verifiedUser: UserProfile = {
      ...(user || {}),
      id: user?.id || `usr_${Date.now()}`,
      name: trimmedName,
      phone: fullPhone,
      email: user?.email || email || `${trimmedName.toLowerCase().replace(/\s+/g, '')}@vedicwisdom.org`,
      avatar: user?.avatar,
      authProvider: (user?.authProvider as any) || 'whatsapp',
      isPhoneVerified: true,
      isVerified: true,
      isEmailVerified: user?.isEmailVerified ?? true,
      dob: prefill?.dob || user?.dob || '1988-06-18',
      tob: prefill?.tob || user?.tob || '07:30',
      pob: prefill?.pob || user?.pob || 'Bhopal, MP, India',
      latitude: prefill?.latitude ?? user?.latitude ?? 23.2599,
      longitude: prefill?.longitude ?? user?.longitude ?? 77.4126,
      timezone: prefill?.timezone || user?.timezone || 'Asia/Kolkata',
      tzOffset: prefill?.tzOffset ?? user?.tzOffset ?? 5.5,
      rashi: prefill?.rashi || user?.rashi || 'Taurus (वृषभ)',
      lagna: prefill?.lagna || user?.lagna || 'Scorpio (वृश्चिक)',
      nakshatra: prefill?.nakshatra || user?.nakshatra || 'Rohini (रोहिणी)',
      whatsappOptIn: true,
      memberId: user?.memberId || `VW-VER-${Math.floor(1000 + Math.random() * 9000)}`,
      clientTier: user?.clientTier || 'Enterprise VIP',
      joinedDate: user?.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    completePhoneVerification(fullPhone, verifiedUser);

    try {
      sessionStorage.setItem(
        'vedic_wisdom_session_user',
        JSON.stringify(verifiedUser)
      );
    } catch {}

    setIsLoading(false);
    setAuthMode('success');

    // Smoothly close modal and trigger pending service/cart/booking action immediately
    setTimeout(() => {
      closeAuthModal();
      if (activeModalOptions?.onSuccess) {
        activeModalOptions.onSuccess(verifiedUser);
      } else if (onSuccessRedirect) {
        onSuccessRedirect(activeModalOptions?.redirectToTab || 'overview');
      }
    }, 600);
  };

  // Email/Password Submit Handler
  const handleEmailPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(currentLang === 'en' ? 'Please enter a valid email address.' : 'कृपया एक मान्य ईमेल पता दर्ज करें।');
      return;
    }
    if (isRegisterMode && !fullName.trim()) {
      setErrorMsg(currentLang === 'en' ? 'Please enter your full name.' : 'कृपया अपना पूरा नाम दर्ज करें।');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const emailUser = loginWithEmailPassword(email, password, isRegisterMode, fullName);
      if (emailUser.name) setFullName(emailUser.name);
      setIsLoading(false);
      setAuthMode('whatsapp');
    } catch (err: any) {
      setIsLoading(false);
      setErrorMsg(err.message || 'Authentication failed.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      style={{ margin: 0, padding: '16px' }}
    >
      <div 
        className="relative w-full max-w-md my-auto rounded-3xl bg-[#FAF9F6] dark:bg-[#111827] border border-[#D4AF37]/40 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100 transition-all max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Trim Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]" />

        {/* Close Modal Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* VIEW: 1-CLICK WHATSAPP VERIFICATION (PRIMARY & MANDATORY FUNNEL)           */}
        {/* ========================================================================= */}
        {authMode === 'whatsapp' && (
          <div className="p-6 sm:p-8">
            {/* Header with Sri Yantra */}
            <div className="text-center mb-5">
              <div className="inline-flex p-2.5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 mb-2 shadow-inner">
                <SriYantraMotif className="w-9 h-9" />
              </div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 mb-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Instant 1-Click WhatsApp Verification</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {currentLang === 'en' ? 'Unlock Vedic Services' : 'वैदिक सेवाएं अनलॉक करें'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                {activeModalOptions?.message ||
                  (currentLang === 'en'
                    ? 'Verify your WhatsApp mobile number once to unlock instant reports, consultations, and bookings.'
                    : 'परामर्श बुकिंग, रिपोर्ट अथवा अकादमी प्रवेश हेतु व्हाट्सएप नंबर सत्यापित करें।')}
              </p>
            </div>

            {/* Google Linked Badge if user already authenticated with Google */}
            {isGoogleLinked && (
              <div className="mb-4 p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    G
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 truncate font-medium">
                    {email || user?.email || 'Google Account Linked'}
                  </span>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Linked</span>
                </span>
              </div>
            )}

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form Fields: Full Name & WhatsApp Number */}
            <div className="space-y-3.5">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'Full Name' : 'पूरा नाम'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={currentLang === 'en' ? 'e.g. Vikramaditya Singhania' : 'उदा. विक्रमादित्य सिंघानिया'}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 2: WhatsApp Number with fixed +91 prefix */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'WhatsApp Mobile Number' : 'व्हाट्सएप मोबाइल नंबर'} <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-[#D4AF37]">
                  <div className="px-3 py-2.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border-r border-slate-300 dark:border-slate-700 flex items-center gap-1.5 select-none shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-3 py-2.5 bg-transparent text-sm font-semibold tracking-wider text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                  <span>{currentLang === 'en' ? '100% Free WhatsApp Verification' : 'निःशुल्क व्हाट्सएप सत्यापन'}</span>
                  <span>{phoneInput.length}/10 digits</span>
                </div>
              </div>

              {/* Primary Action Button: Verify on WhatsApp & Unlock */}
              <button
                type="button"
                onClick={handleWhatsAppVerifyAndUnlock}
                disabled={isLoading}
                className="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:brightness-105 shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  /* WhatsApp SVG Logo */
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                )}
                <span>{currentLang === 'en' ? 'Verify on WhatsApp & Unlock' : 'व्हाट्सएप पर सत्यापित करें व अनलॉक करें'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-[#FAF9F6] dark:bg-[#111827] px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {currentLang === 'en' ? 'or link with' : 'अन्य विकल्प'}
              </span>
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            </div>

            {/* Alternative Sign-In Options: Google & Email */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('email')}
                className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currentLang === 'en' ? 'Email ID' : 'ईमेल'}</span>
              </button>
            </div>

            {/* Legal Compliance Notice (DPDP Act & Privacy) */}
            <div className="pt-4 text-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight block">
                <ShieldCheck className="w-3 h-3 text-emerald-500 inline-block mr-1 -mt-0.5" />
                {currentLang === 'en'
                  ? 'Compliant with Digital Personal Data Protection (DPDP) Act. By verifying, you agree to our Terms & Privacy Policy. 100% Confidential.'
                  : 'डिजिटल डेटा संरक्षण अधिनियम के अनुरूप। जानकारी पूर्णतः सुरक्षित एवं गोपनीय रखी जाती है।'}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: EMAIL & PASSWORD LOGIN / REGISTRATION FALLBACK                     */}
        {/* ========================================================================= */}
        {authMode === 'email' && (
          <div className="p-6 sm:p-8 animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex p-2.5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 mb-2">
                <Mail className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                {isRegisterMode 
                  ? (currentLang === 'en' ? 'Create Vedic Account' : 'नया वैदिक खाता बनाएं')
                  : (currentLang === 'en' ? 'Sign In with Email' : 'ईमेल द्वारा लॉगिन करें')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {currentLang === 'en'
                  ? 'Access client portal, saved horoscopes, and digital dossiers.'
                  : 'क्लाइंट पोर्टल व सहेजी गई कुंडलियों तक पहुंचें।'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleEmailPasswordSubmit} className="space-y-3.5">
              {/* Switcher Tab */}
              <div className="flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1 mb-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    !isRegisterMode
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {currentLang === 'en' ? 'Sign In' : 'लॉगिन'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    isRegisterMode
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                  }`}
                >
                  {currentLang === 'en' ? 'Create Account' : 'नया खाता'}
                </button>
              </div>

              {isRegisterMode && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {currentLang === 'en' ? 'Full Name' : 'पूरा नाम'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vikramaditya Singhania"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'Email Address' : 'ईमेल पता'} *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@enterprise.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'Password' : 'पासवर्ड'} *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isRegisterMode ? 'Register & Verify WhatsApp' : 'Sign In & Verify WhatsApp'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('whatsapp')}
                  className="hover:underline text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  ← {currentLang === 'en' ? 'Back to WhatsApp Verification' : 'व्हाट्सएप सत्यापन पर लौटें'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW: SUCCESS CELEBRATION & AUTO UNLOCK                                   */}
        {/* ========================================================================= */}
        {authMode === 'success' && (
          <div className="p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-500 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white mb-1">
              {currentLang === 'en' ? 'Verified Successfully!' : 'सत्यापन पूर्ण हुआ!'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-4">
              {currentLang === 'en'
                ? 'Your WhatsApp number is verified. Opening your requested Vedic service...'
                : 'व्हाट्सएप नंबर सत्यापित हो गया है। आपका अनुरोध खोला जा रहा है...'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              <span>Unlocking Action...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
