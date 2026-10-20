import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language, UserProfile } from '../../types/index.ts';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  Lock, 
  Mail, 
  KeyRound, 
  AlertCircle,
  Globe,
  Check,
  Phone
} from 'lucide-react';

interface AuthModalProps {
  currentLang: Language;
  onSuccessRedirect?: (tab?: string) => void;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE (Dubai)', flag: '🇦🇪' },
  { code: '+1', country: 'USA / Canada', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' }
];

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

  // Funnel steps: 'auth' (Google / Mobile / Email) -> 'otp' (Mandatory phone verification) -> 'success'
  const [funnelStep, setFunnelStep] = useState<'auth' | 'otp' | 'success'>('auth');
  const [authMethod, setAuthMethod] = useState<'options' | 'email' | 'mobile'>('options');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Email form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mobile OTP Gate states
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneInput, setPhoneInput] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState<string>('');

  // Status & loading states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Lock background body scroll when AuthModal is active
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

  // Sync modal options when opened
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
      }

      // If user is already authenticated via email/Google but phone is unverified, jump straight to OTP
      if (activeModalOptions?.initialStep === 'otp' || (user && !user.isPhoneVerified)) {
        setFunnelStep('otp');
      } else {
        setFunnelStep('auth');
      }

      setAuthMethod('options');
      setIsRegisterMode(false);
      setErrorMsg('');
      setIsOtpSent(false);
      setOtpDigits(['', '', '', '', '', '']);
      setResendTimer(30);
      setCanResend(false);
    }
  }, [isAuthModalOpen, activeModalOptions, user]);

  // 30-second resend countdown timer
  useEffect(() => {
    let timerId: any = null;
    if (funnelStep === 'otp' && isOtpSent && resendTimer > 0) {
      timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [funnelStep, isOtpSent, resendTimer]);

  if (!isAuthModalOpen) return null;

  // STEP 1: Google One-Click Auth Action
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      try {
        const prefill = activeModalOptions?.prefilledData;
        const googleUser = loginWithGoogle({
          name: prefill?.name || fullName || 'Dr. Anandvardhan Verma',
          phone: phoneInput ? `${countryCode} ${phoneInput}` : undefined,
          dob: prefill?.dob,
          tob: prefill?.tob,
          pob: prefill?.pob,
          latitude: prefill?.latitude,
          longitude: prefill?.longitude,
          timezone: prefill?.timezone,
          tzOffset: prefill?.tzOffset
        });

        setIsLoading(false);

        // If phone is unverified (mandatory), smoothly advance to Step 2 OTP Gate
        if (!googleUser.isPhoneVerified) {
          setFunnelStep('otp');
          if (phoneInput.trim().length >= 8) {
            handleSendOtp(`${countryCode} ${phoneInput}`);
          }
        } else {
          finishAuthSuccess(googleUser);
        }
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg(err.message || 'Google authentication failed.');
      }
    }, 600);
  };

  // STEP 1: Email/Password Auth Action
  const handleEmailPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(currentLang === 'en' ? 'Please enter a valid email address.' : 'कृपया एक मान्य ईमेल आईडी दर्ज करें।');
      return;
    }
    if (isRegisterMode && !fullName.trim()) {
      setErrorMsg(currentLang === 'en' ? 'Please enter your full name.' : 'कृपया अपना पूरा नाम दर्ज करें।');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      try {
        const emailUser = loginWithEmailPassword(email, password, isRegisterMode, fullName);
        setIsLoading(false);

        // Mandatory Step 2: Transition to OTP Gate
        setFunnelStep('otp');
        if (phoneInput.trim().length >= 8) {
          handleSendOtp(`${countryCode} ${phoneInput}`);
        }
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg(err.message || 'Authentication failed.');
      }
    }, 500);
  };

  // STEP 2: Send OTP Handler
  const handleSendOtp = async (overridePhone?: string) => {
    const rawNumber = overridePhone || phoneInput;
    const cleanNum = rawNumber.replace(/\D/g, '').slice(-10);

    if (cleanNum.length < 8) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter a valid 10-digit mobile number.'
          : 'कृपया एक मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।'
      );
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    const fullFormattedPhone = `${countryCode} ${cleanNum}`;

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanNum,
          countryCode,
          name: fullName || user?.name || activeModalOptions?.prefilledData?.name
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setVerificationToken(data.verificationToken || null);
        setOtpSuccessMessage(data.message || (currentLang === 'en' ? 'OTP sent successfully to your mobile number via SMS.' : 'आपके मोबाइल नंबर पर एसएमएस द्वारा ओटीपी भेजा गया।'));
        setIsOtpSent(true);
        setResendTimer(30);
        setCanResend(false);
        setOtpDigits(['', '', '', '', '', '']);

        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 150);
      } else {
        throw new Error(data.message || 'Failed to dispatch verification code via SMS.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || (currentLang === 'en' ? 'Failed to send SMS OTP. Please check your number and try again.' : 'एसएमएस ओटीपी भेजने में विफल। कृपया नंबर जांचें व पुनः प्रयास करें।'));
    } finally {
      setIsLoading(false);
    }
  };

  // 6-box OTP digits handling
  const handleDigitChange = (index: number, val: string) => {
    if (val && !/^\d+$/.test(val)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = val.slice(-1);
    setOtpDigits(newDigits);
    setErrorMsg('');

    // Advance focus forward
    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto verify when all 6 digits entered
    if (val && index === 5 && newDigits.every((d) => d !== '')) {
      handleVerifyOtp(newDigits.join(''));
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleDigitPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);
    setErrorMsg('');

    if (pasted.length === 6) {
      handleVerifyOtp(pasted);
    } else {
      otpInputRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join('');
    if (code.length < 6) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter all 6 digits of the OTP code.'
          : 'कृपया 6-अंकों का पूरा ओटीपी कोड दर्ज करें।'
      );
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const fullPhone = `${countryCode} ${phoneInput.replace(/\D/g, '').slice(-10)}`;
    const prefill = activeModalOptions?.prefilledData;

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: fullPhone,
          otp: code,
          verificationToken,
          userData: {
            name: fullName || user?.name || prefill?.name,
            email: email || user?.email || prefill?.email,
            dob: prefill?.dob,
            tob: prefill?.tob,
            pob: prefill?.pob,
            latitude: prefill?.latitude,
            longitude: prefill?.longitude,
            timezone: prefill?.timezone,
            tzOffset: prefill?.tzOffset
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const verifiedUser = completePhoneVerification(fullPhone, {
          name: fullName || user?.name || prefill?.name,
          email: email || user?.email || prefill?.email,
          ...prefill
        });
        finishAuthSuccess(verifiedUser);
      } else {
        setErrorMsg(data.message || (currentLang === 'en' ? 'Invalid OTP code. Please check your SMS and enter the 6-digit code.' : 'अमान्य ओटीपी कोड। कृपया एसएमएस में आया 6 अंकों का कोड दर्ज करें।'));
      }
    } catch (err: any) {
      setErrorMsg(err.message || (currentLang === 'en' ? 'Verification failed. Please retry.' : 'सत्यापन विफल। कृपया पुनः प्रयास करें।'));
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Instant Completion & Execution
  const finishAuthSuccess = (verifiedUser: UserProfile) => {
    setFunnelStep('success');

    setTimeout(() => {
      closeAuthModal();

      // Trigger attached report generator, booking, or checkout callback immediately
      if (activeModalOptions?.onSuccess) {
        activeModalOptions.onSuccess(verifiedUser);
      } else if (onSuccessRedirect) {
        onSuccessRedirect(activeModalOptions?.redirectToTab || 'overview');
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
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
        {/* VIEW 1: STEP 1 - IDENTIFICATION (GOOGLE, MOBILE NUMBER, OR EMAIL)         */}
        {/* ========================================================================= */}
        {funnelStep === 'auth' && (
          <div className="p-6 sm:p-8">
            
            {/* Header with Sri Yantra */}
            <div className="text-center mb-6">
              <div className="inline-flex p-2.5 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 mb-3 shadow-inner">
                <SriYantraMotif className="w-10 h-10" />
              </div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] mb-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Vedic Wisdom Authentication Gateway</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {currentLang === 'en' ? 'Verify to Proceed' : 'आगे बढ़ने हेतु सत्यापन करें'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                {activeModalOptions?.message ||
                  (currentLang === 'en'
                    ? 'Authenticate below to securely confirm your booking, generate reports, or reserve academy seats.'
                    : 'परामर्श बुकिंग, रिपोर्ट अथवा अकादमी प्रवेश हेतु प्रमाणीकरण करें।')}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {authMethod === 'options' ? (
              <div className="space-y-3.5">
                {/* OPTION 1: High-Converting One-Click Google Authentication */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-xs flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group hover:border-[#D4AF37]"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  ) : (
                    /* Authentic Google "G" SVG Logo */
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                  )}
                  <span>{currentLang === 'en' ? 'Continue with Google' : 'Google से आगे बढ़ें'}</span>
                </button>

                {/* OPTION 2: Enter Mobile Number Directly */}
                <button
                  type="button"
                  onClick={() => setFunnelStep('otp')}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{currentLang === 'en' ? 'Enter Mobile Number (Instant OTP)' : 'मोबाइल नंबर से आगे बढ़ें (ओटीपी)'}</span>
                </button>

                {/* Aesthetic Divider */}
                <div className="relative flex items-center justify-center my-3">
                  <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                  <span className="bg-[#FAF9F6] dark:bg-[#111827] px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {currentLang === 'en' ? 'or continue with email' : 'अथवा ईमेल से जुड़ें'}
                  </span>
                  <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                </div>

                {/* OPTION 3: Email & Password Trigger */}
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentLang === 'en' ? 'Continue with Email & Password' : 'ईमेल और पासवर्ड से लॉगिन करें'}</span>
                </button>

                {/* Security Guarantee Strip */}
                <div className="pt-2 text-center">
                  <span className="text-[11px] text-slate-400 inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>256-Bit SSL Encrypted & Non-Demolition Guarantee</span>
                  </span>
                </div>
              </div>
            ) : (
              /* EMAIL & PASSWORD LOGIN / REGISTER FORM */
              <form onSubmit={handleEmailPasswordSubmit} className="space-y-4">
                {/* Switcher Tab */}
                <div className="flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1 mb-3 text-xs font-semibold">
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
                      placeholder="e.g. Vikramaditya Singhania"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
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
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
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
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isLoading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isRegisterMode ? 'Register & Verify Mobile' : 'Sign In & Verify Mobile'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('options')}
                    className="hover:underline text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    ← Back to options
                  </button>
                  <span className="text-[#D4AF37] font-semibold">Step 1 of 2</span>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: STEP 2 - MANDATORY MOBILE OTP VERIFICATION GATE                  */}
        {/* ========================================================================= */}
        {funnelStep === 'otp' && (
          <div className="p-6 sm:p-8 animate-in fade-in slide-in-from-right-4 duration-200">
            
            {/* Header */}
            <div className="text-center mb-5">
              <div className="inline-flex p-2.5 rounded-2xl bg-amber-500/15 border border-[#D4AF37]/40 mb-2.5">
                <Smartphone className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-[#B45309] dark:text-[#F3E5AB] mb-1">
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                <span>Mandatory Step 2 of 2: Phone Verification</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white">
                {currentLang === 'en' ? 'Verify Mobile Number' : 'मोबाइल नंबर सत्यापित करें'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                {currentLang === 'en'
                  ? 'We deliver an instant 6-digit access code via SMS to confirm identity and unlock services.'
                  : 'पहचान सत्यापित करने और सेवा आगे बढ़ाने हेतु 6-अंकों का ओटीपी भेजा जाएगा।'}
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Real SMS Dispatched Banner */}
            {isOtpSent && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {otpSuccessMessage || (currentLang === 'en'
                    ? `Verification code dispatched via SMS to ${countryCode} ${phoneInput}. Valid for 5 minutes.`
                    : `${countryCode} ${phoneInput} पर एसएमएस द्वारा सत्यापन कोड भेजा गया। मान्य अवधि: 5 मिनट।`)}
                </span>
              </div>
            )}

            {!isOtpSent ? (
              /* PHONE NUMBER INPUT & SEND OTP FORM */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {currentLang === 'en' ? 'Mobile Phone Number' : 'मोबाइल नंबर'} *
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-[#D4AF37]">
                    {/* Country Code Selector */}
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="px-2.5 py-2.5 bg-slate-100 dark:bg-slate-800 text-xs font-semibold border-r border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} ({c.country})
                        </option>
                      ))}
                    </select>

                    {/* 10-digit Phone Input */}
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full px-3 py-2.5 bg-transparent text-sm font-semibold tracking-wider text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {currentLang === 'en' ? 'Standard SMS carrier rates apply. Confidential & 100% spam-free.' : 'गोपनीय एवं सुरक्षित। कोई स्पैम नहीं।'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendOtp()}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>{currentLang === 'en' ? 'Send 6-Digit OTP Code' : 'ओटीपी कोड भेजें'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => { setFunnelStep('auth'); setAuthMethod('options'); }}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                  >
                    ← {currentLang === 'en' ? 'Change sign-in method' : 'दूसरा माध्यम चुनें'}
                  </button>
                </div>
              </div>
            ) : (
              /* 6-BOX AUTO-FOCUSING OTP INPUT */
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Sent to: <strong className="text-slate-800 dark:text-slate-200">{countryCode} {phoneInput}</strong></span>
                  <button
                    type="button"
                    onClick={() => { setIsOtpSent(false); setOtpDigits(['', '', '', '', '', '']); }}
                    className="text-amber-600 dark:text-[#D4AF37] hover:underline font-semibold text-[11px] cursor-pointer"
                  >
                    Edit Phone
                  </button>
                </div>

                {/* 6 Auto-Focusing Inputs */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpInputRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                      onPaste={handleDigitPaste}
                      className="w-11 sm:w-12 h-13 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] shadow-inner transition-all"
                    />
                  ))}
                </div>

                {/* Timer & Resend */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {canResend ? (
                      <span className="text-amber-600 dark:text-[#D4AF37] font-semibold">Code expired?</span>
                    ) : (
                      <span>Resend available in <strong className="text-slate-800 dark:text-slate-200 font-mono">{resendTimer}s</strong></span>
                    )}
                  </span>

                  <button
                    type="button"
                    disabled={!canResend || isLoading}
                    onClick={() => handleSendOtp()}
                    className={`font-semibold text-xs ${
                      canResend && !isLoading
                        ? 'text-[#B45309] dark:text-[#F3E5AB] hover:underline cursor-pointer'
                        : 'text-slate-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>

                {/* Verify Button */}
                <button
                  type="button"
                  onClick={() => handleVerifyOtp()}
                  disabled={isLoading || otpDigits.some((d) => d === '')}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] shadow-md shadow-[#D4AF37]/25 flex items-center justify-center gap-2 transition-all ${
                    isLoading || otpDigits.some((d) => d === '')
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:opacity-95 cursor-pointer'
                  }`}
                >
                  {isLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <ShieldCheck className="w-4 h-4" />
                  <span>{currentLang === 'en' ? 'Verify OTP & Continue' : 'ओटीपी सत्यापित करें व आगे बढ़ें'}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: STEP 3 - SUCCESS COMPLETION CELEBRATION                           */}
        {/* ========================================================================= */}
        {funnelStep === 'success' && (
          <div className="p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-500 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white mb-1">
              {currentLang === 'en' ? 'Verification Successful!' : 'सत्यापन सफल रहा!'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-4">
              {currentLang === 'en'
                ? 'Your mobile number is verified. Proceeding to your request...'
                : 'मोबाइल नंबर सत्यापित हो गया है। आपका अनुरोध खोला जा रहा है...'}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-semibold text-[#B45309] dark:text-[#F3E5AB]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              <span>Unlocking Action...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
