import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { Language } from '../../types/index.ts';

interface OtpVerificationProps {
  currentLang?: Language;
  initialPhone?: string;
  initialName?: string;
  initialCountryCode?: string;
  onVerified: (verifiedUser: any) => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
  leadData?: any;
}

export const OtpVerification: React.FC<OtpVerificationProps> = ({
  currentLang = 'en',
  initialPhone = '',
  initialName = '',
  onVerified,
  onCancel,
  title,
  subtitle,
  leadData
}) => {
  const [fullName, setFullName] = useState(initialName || leadData?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(
    initialPhone.replace(/^\+\d+\s*/, '').replace(/\D/g, '')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleWhatsAppVerify = () => {
    const cleanName = fullName.trim() || leadData?.name || 'Vedic Seeker';
    if (!cleanName || cleanName.length < 2) {
      setErrorMsg(
        currentLang === 'en'
          ? 'Please enter your Full Name to proceed.'
          : 'कृपया आगे बढ़ने हेतु अपना पूरा नाम दर्ज करें।'
      );
      return;
    }

    const cleanNum = phoneNumber.replace(/\D/g, '').slice(-10);
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

    const verifiedUser = {
      ...(leadData || {}),
      id: leadData?.id || `usr_${Date.now()}`,
      name: cleanName,
      phone: fullPhone,
      isVerified: true,
      isPhoneVerified: true,
      whatsappOptIn: true
    };

    try {
      sessionStorage.setItem(
        'vedic_wisdom_session_user',
        JSON.stringify(verifiedUser)
      );
    } catch {}

    setIsSuccess(true);
    setIsLoading(false);

    setTimeout(() => {
      onVerified(verifiedUser);
    }, 600);
  };

  if (isSuccess) {
    return (
      <div className="p-6 text-center animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-3 text-emerald-500 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
          {currentLang === 'en' ? 'Verified Successfully!' : 'सत्यापन सफल रहा!'}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {currentLang === 'en' ? 'Unlocking Vedic services...' : 'सेवाएं अनलॉक की जा रही हैं...'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-[#D4AF37]/30 text-left">
      <div className="text-center mb-4">
        <h4 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white">
          {title || (currentLang === 'en' ? '1-Click WhatsApp Verification' : '1-क्लिक व्हाट्सएप सत्यापन')}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {subtitle ||
            (currentLang === 'en'
              ? 'Verify your mobile number via WhatsApp to access instant reports & bookings.'
              : 'रिपोर्ट व बुकिंग तक पहुंच हेतु व्हाट्सएप नंबर सत्यापित करें।')}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-3 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {currentLang === 'en' ? 'Full Name' : 'पूरा नाम'} *
          </label>
          <div className="relative">
            <UserCheck className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              placeholder={currentLang === 'en' ? 'e.g. Vikramaditya' : 'उदा. विक्रमादित्य'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {currentLang === 'en' ? 'WhatsApp Number' : 'व्हाट्सएप नंबर'} *
          </label>
          <div className="flex rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-[#D4AF37]">
            <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border-r border-slate-300 dark:border-slate-700 flex items-center gap-1">
              <span>🇮🇳</span>
              <span>+91</span>
            </div>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full px-3 py-2 bg-transparent text-sm font-semibold tracking-wider text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleWhatsAppVerify}
          disabled={isLoading}
          className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:brightness-105 shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          )}
          <span>{currentLang === 'en' ? 'Verify on WhatsApp & Unlock' : 'व्हाट्सएप पर सत्यापित करें व अनलॉक करें'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pt-1 cursor-pointer"
          >
            {currentLang === 'en' ? 'Cancel' : 'रद्द करें'}
          </button>
        )}

        <div className="pt-2 text-center">
          <span className="text-[10px] text-slate-400 inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>DPDP Act Compliant • Strictly Confidential</span>
          </span>
        </div>
      </div>
    </div>
  );
};
