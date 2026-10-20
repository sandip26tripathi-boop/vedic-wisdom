import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { Language } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
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
  MessageCircle,
  Clock,
  Compass
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
    isAuthModalOpen,
    closeAuthModal,
    activeModalTab,
    setActiveModalTab,
    activeModalOptions,
    simulatedOtpCode,
    loginWithPhoneOtp,
    loginWithGoogle,
    loginWithMagicLink,
    generateNewOtp
  } = useAuth();

  // Internal state
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('1990-01-01');
  const [tob, setTob] = useState('08:00');
  const [pob, setPob] = useState('Bhopal, MP');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);

  // 6-digit OTP fields
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Pre-fill from activeModalOptions if any
  useEffect(() => {
    if (activeModalOptions?.prefilledData) {
      if (activeModalOptions.prefilledData.name) setFullName(activeModalOptions.prefilledData.name);
      if (activeModalOptions.prefilledData.phone) setPhone(activeModalOptions.prefilledData.phone);
      if (activeModalOptions.prefilledData.email) setEmail(activeModalOptions.prefilledData.email);
      if (activeModalOptions.prefilledData.dob) setDob(activeModalOptions.prefilledData.dob);
      if (activeModalOptions.prefilledData.tob) setTob(activeModalOptions.prefilledData.tob);
      if (activeModalOptions.prefilledData.pob) setPob(activeModalOptions.prefilledData.pob);
    }
    setStep('input');
    setErrorMsg('');
    setOtpDigits(['', '', '', '', '', '']);
  }, [isAuthModalOpen, activeModalOptions]);

  // Timer countdown for OTP
  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 8) {
      setErrorMsg(currentLang === 'en' ? 'Please enter a valid mobile number' : 'कृपया एक मान्य मोबाइल नंबर दर्ज करें');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      // Auto focus first OTP input
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }, 600);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);
    setErrorMsg('');

    // Advance focus
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto verify if all 6 filled
    if (value && index === 5 && newDigits.every(d => d !== '')) {
      verifyOtp(newDigits.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setOtpDigits(newDigits);
    setErrorMsg('');

    const targetIdx = Math.min(pastedData.length, 5);
    otpInputRefs.current[targetIdx]?.focus();

    if (pastedData.length === 6) {
      verifyOtp(pastedData);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    generateNewOtp(phone);
    setTimer(30);
    setCanResend(false);
    setOtpDigits(['', '', '', '', '', '']);
    setErrorMsg('');
  };

  const verifyOtp = (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join('');
    if (code.length < 6) {
      setErrorMsg(currentLang === 'en' ? 'Please enter all 6 digits of the OTP' : 'कृपया 6 अंकों का ओटीपी दर्ज करें');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = loginWithPhoneOtp(phone, code, {
        name: fullName || 'Vedic Client',
        email: email || undefined,
        dob,
        tob,
        pob,
        whatsappOptIn
      });

      setIsSubmitting(false);
      if (success) {
        setStep('success');
        setTimeout(() => {
          if (onSuccessRedirect) {
            onSuccessRedirect(activeModalOptions?.redirectToTab || 'overview');
          }
        }, 1200);
      } else {
        setErrorMsg(currentLang === 'en' ? 'Invalid OTP. Please check the code above.' : 'अमान्य ओटीपी कोड। कृपया ऊपर दिया गया कोड जांचें।');
      }
    }, 500);
  };

  const handleFastTrackGoogle = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      loginWithGoogle();
      setIsSubmitting(false);
      setStep('success');
      setTimeout(() => {
        if (onSuccessRedirect) {
          onSuccessRedirect(activeModalOptions?.redirectToTab || 'overview');
        }
      }, 1000);
    }, 700);
  };

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg(currentLang === 'en' ? 'Please enter a valid email address' : 'कृपया एक मान्य ईमेल आईडी दर्ज करें');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      loginWithMagicLink(email);
      setIsSubmitting(false);
      setStep('success');
      setTimeout(() => {
        if (onSuccessRedirect) {
          onSuccessRedirect(activeModalOptions?.redirectToTab || 'overview');
        }
      }, 1000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#FAF9F6] dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl overflow-hidden transition-all text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Metallic Border Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-1 rounded-lg bg-gradient-to-br from-[#D4AF37]/30 to-transparent border border-[#D4AF37]/40">
              <SriYantraMotif className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                VEDIC <span className="gold-gradient-text">WISDOM</span>
              </h3>
              <p className="text-xs text-[#B45309] dark:text-[#F3E5AB] font-medium">
                {currentLang === 'en' ? 'Client Portal & Secure Lead Verification' : 'क्लाइंट पोर्टल एवं सुरक्षित सत्यापन'}
              </p>
            </div>
          </div>

          {/* Gating Notice Banner if triggered from tool */}
          {activeModalOptions?.message && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{activeModalOptions.message}</span>
            </div>
          )}

          {/* Tabs for Login Type */}
          <div className="grid grid-cols-3 gap-1 mt-4 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => { setActiveModalTab('phone'); setStep('input'); setErrorMsg(''); }}
              className={`py-2 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                activeModalTab === 'phone'
                  ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-[#F3E5AB] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Mobile OTP' : 'मोबाइल OTP'}</span>
            </button>
            <button
              onClick={() => { setActiveModalTab('google'); setErrorMsg(''); }}
              className={`py-2 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                activeModalTab === 'google'
                  ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-[#F3E5AB] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google 1-Click</span>
            </button>
            <button
              onClick={() => { setActiveModalTab('magicLink'); setErrorMsg(''); }}
              className={`py-2 px-1 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                activeModalTab === 'magicLink'
                  ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-[#F3E5AB] shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Magic Link' : 'मैजिक लिंक'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* TAB 1: Mobile Number + 6-Digit OTP */}
          {activeModalTab === 'phone' && (
            <>
              {step === 'input' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'Full Name / Enterprise Executive' : 'पूरा नाम / अधिकृत प्रतिनिधि'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikramaditya Singhania"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currentLang === 'en' ? 'Mobile Number (for instant OTP)' : 'मोबाइल नंबर (त्वरित ओटीपी हेतु)'} *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 90094 48601"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {currentLang === 'en' 
                        ? '6-digit SMS verification code will be simulated instantly for seamless login.' 
                        : 'त्वरित सत्यापन हेतु 6-अंकों का ओटीपी तुरंत जनरेट किया जाएगा।'}
                    </p>
                  </div>

                  {/* Optional Birth Details for Progressive Gating */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-0.5">
                        {currentLang === 'en' ? 'Date of Birth (Optional)' : 'जन्म तिथि (वैकल्पिक)'}
                      </label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-0.5">
                        {currentLang === 'en' ? 'Birth City (Optional)' : 'जन्म स्थान (वैकल्पिक)'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bhopal"
                        value={pob}
                        onChange={(e) => setPob(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Opt-In Checkbox (Requirement 2.3) */}
                  <label className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 cursor-pointer mt-3">
                    <input
                      type="checkbox"
                      checked={whatsappOptIn}
                      onChange={(e) => setWhatsappOptIn(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-amber-400 text-[#D4AF37] focus:ring-[#D4AF37] accent-[#B45309]"
                    />
                    <div className="text-xs text-slate-700 dark:text-slate-200">
                      <span className="font-semibold text-[#B45309] dark:text-[#F3E5AB] flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-500 inline" />
                        {currentLang === 'en' ? 'WhatsApp Instant Integration' : 'व्हाट्सएप तत्काल एकीकरण'}
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {currentLang === 'en'
                          ? 'Send instant updates, free daily panchang, and reports directly to my WhatsApp (+91 90094 48601 community integration).'
                          : 'त्वरित अपडेट, दैनिक पंचांग एवं रिपोर्ट्स सीधे मेरे व्हाट्सएप पर भेजें (+91 90094 48601 कम्युनिटी)।'}
                      </p>
                    </div>
                  </label>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>{currentLang === 'en' ? 'Verify Mobile & Proceed' : 'मोबाइल सत्यापित करें व आगे बढ़ें'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 2: 6-Digit OTP Entry */}
              {step === 'otp' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] mb-1">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                      {currentLang === 'en' ? 'Enter 6-Digit Verification Code' : '6-अंकों का सत्यापन कोड दर्ज करें'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentLang === 'en' ? `Sent via SMS to ${phone}` : `एसएमएस द्वारा भेजा गया: ${phone}`}
                    </p>
                  </div>

                  {/* Simulated OTP Display Helper */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                    <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium block">
                      {currentLang === 'en' ? '⚡ Instant SMS OTP generated for rapid testing:' : '⚡ त्वरित परीक्षण हेतु जनरेट किया गया कोड:'}
                    </span>
                    <span className="text-lg font-mono font-black tracking-widest text-[#B45309] dark:text-[#F3E5AB]">
                      {simulatedOtpCode}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const digits = simulatedOtpCode.split('');
                        setOtpDigits(digits);
                        verifyOtp(simulatedOtpCode);
                      }}
                      className="text-[11px] underline ml-2 text-slate-700 dark:text-slate-300 hover:text-[#D4AF37] font-semibold cursor-pointer"
                    >
                      {currentLang === 'en' ? '(Auto-Fill)' : '(स्वतः भरें)'}
                    </button>
                  </div>

                  {/* 6 Digit Inputs */}
                  <div className="flex justify-center items-center gap-2 sm:gap-3">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpInputRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        onPaste={handlePaste}
                        className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-xs"
                      />
                    ))}
                  </div>

                  {/* Resend & Timer */}
                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <button
                      type="button"
                      onClick={() => setStep('input')}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {currentLang === 'en' ? '← Change Phone' : '← नंबर बदलें'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="font-bold text-[#B45309] dark:text-[#F3E5AB] hover:underline cursor-pointer"
                        >
                          {currentLang === 'en' ? 'Resend OTP' : 'ओटीपी पुनः भेजें'}
                        </button>
                      ) : (
                        <span className="text-slate-400">
                          {currentLang === 'en' ? `Resend in ${timer}s` : `${timer}s में पुनः भेजें`}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => verifyOtp()}
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>{currentLang === 'en' ? 'Confirm OTP & Open Dashboard' : 'पुष्टि करें व पोर्टल खोलें'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* TAB 2: Google 1-Click Fast Track */}
          {activeModalTab === 'google' && (
            <div className="py-4 space-y-5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>

              <div className="space-y-1">
                <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
                  {currentLang === 'en' ? 'Fast-Track Google Enterprise Sign-In' : 'गूगल वन-क्लिक लॉगिन'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  {currentLang === 'en' 
                    ? 'Authenticate seamlessly with verified corporate email credentials. Zero password required.' 
                    : 'बिना पासवर्ड के सीधे अपने गूगल अकाउंट द्वारा तुरंत सत्यापित करें।'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleFastTrackGoogle}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-sm flex items-center justify-center gap-3 cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span>{currentLang === 'en' ? 'Continue with Google Account' : 'गूगल खाते के साथ जारी रखें'}</span>
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Enterprise 256-Bit SSL Encryption</span>
              </div>
            </div>
          )}

          {/* TAB 3: Passwordless Email Magic Link */}
          {activeModalTab === 'magicLink' && (
            <form onSubmit={handleMagicLinkSubmit} className="space-y-4 py-2">
              <div className="text-center space-y-1 mb-3">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                  {currentLang === 'en' ? 'Passwordless Magic Link' : 'पासवर्ड-मुक्त मैजिक लिंक'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentLang === 'en' 
                    ? 'Enter your work or personal email to receive an instant access authorization.' 
                    : 'तत्काल एक्सेस हेतु अपना आधिकारिक ईमेल दर्ज करें।'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currentLang === 'en' ? 'Official / Personal Email' : 'ईमेल पता'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="director@conglomerate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>{currentLang === 'en' ? 'Send Instant Login Link' : 'लॉगिन लिंक भेजें'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Success Animation Screen */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h4 className="font-cinzel text-xl font-extrabold text-slate-900 dark:text-white">
                {currentLang === 'en' ? 'Verification Successful!' : 'सत्यापन सफल!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentLang === 'en' 
                  ? 'Redirecting to your protected Vedic Wisdom Client Dashboard...' 
                  : 'वैदिक विजडम क्लाइंट डैशबोर्ड पर ले जाया जा रहा है...'}
              </p>
              <div className="w-32 h-1 mx-auto bg-gradient-to-r from-[#D4AF37] to-[#B45309] rounded-full animate-pulse mt-2" />
            </div>
          )}
        </div>

        {/* Modal Footer Trust Bar */}
        <div className="px-6 py-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#D4AF37]" />
            100% Confidential Vedic Records
          </span>
          <span>Bhopal • Delhi • Mumbai</span>
        </div>
      </div>
    </div>
  );
};
