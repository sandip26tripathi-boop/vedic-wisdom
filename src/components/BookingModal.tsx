import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { X, Calendar, MapPin, Building, Phone, Mail, User, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { validateName, validatePhone, validateEmail, validateCity } from '../utils/validation.ts';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialServiceId = 'industrial',
}) => {
  const { user } = useAuth();
  const [serviceType, setServiceType] = useState(initialServiceId);
  const [clientType, setClientType] = useState('enterprise');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [area, setArea] = useState('');
  const [city, setCity] = useState(user?.pob || '');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialServiceId) {
      setServiceType(initialServiceId);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (user && isOpen) {
      if (user.name) setName(user.name);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
      if (user.pob && !city) setCity(user.pob);
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const t = translations[currentLang];
  const bm = t.bookingModal;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameVal = validateName(name, currentLang);
    const phoneVal = validatePhone(phone, currentLang);
    const emailVal = validateEmail(email, false, currentLang);
    const cityVal = city.trim() ? validateCity(city, currentLang) : { isValid: true };

    const newErrors: Record<string, string> = {};
    if (!nameVal.isValid && nameVal.error) newErrors.name = nameVal.error;
    if (!phoneVal.isValid && phoneVal.error) newErrors.phone = phoneVal.error;
    if (!emailVal.isValid && emailVal.error) newErrors.email = emailVal.error;
    if (!cityVal.isValid && cityVal.error) newErrors.city = cityVal.error;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Build formatted message
    const serviceLabels: Record<string, string> = {
      industrial: "Industrial & Mega Factory Vastu Audit",
      corporate: "Corporate HQ & Commercial Vastu",
      villa: "Luxury Villa / Farmhouse Astro-Vastu",
      kpCil: "KP Astrology & Cuspal Interlinks (CIL)",
      bnn: "Bhrigu Nandi Nadi (BNN) & Transits",
      jaimini: "Jaimini Astrology & Karakamsha System",
      lalKitab: "Lal Kitab Remedial Session",
      btr: "Birth Time Rectification (BTR)",
      astrology: "Strategic KP & Nadi Astrology Consultation"
    };

    const text = `*New Enterprise Consultation Dossier - Vedic Wisdom*\n\n` +
      `*Service Required:* ${serviceLabels[serviceType] || serviceType}\n` +
      `*Client / Entity:* ${name} (${clientType})\n` +
      `*WhatsApp Phone:* ${phone}\n` +
      `*Email:* ${email || 'N/A'}\n` +
      `*City / Location:* ${city || 'India'}\n` +
      `*Facility Area / Scope:* ${area || 'Standard'}\n` +
      `*Preferred Date:* ${date || 'Earliest available'}\n` +
      `*Project Challenges:* ${notes || 'Standard evaluation'}\n\n` +
      `*Source:* Vedic Wisdom Enterprise Web Platform`;

    setTimeout(() => {
      window.open(`https://wa.me/919009448601?text=${encodeURIComponent(text)}`, '_blank');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{currentLang === 'en' ? 'Direct Leadership Engagement' : 'सीधे नेतृत्व से संपर्क'}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {bm.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                {bm.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Type Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {bm.serviceType}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setServiceType('industrial')}
                    className={`p-2.5 rounded-xl font-semibold border text-left cursor-pointer transition-all ${
                      serviceType === 'industrial'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-slate-900 dark:text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    🏭 {currentLang === 'en' ? 'Factory / Industrial Audit' : 'फैक्ट्री / इंडस्ट्रियल ऑडिट'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('corporate')}
                    className={`p-2.5 rounded-xl font-semibold border text-left cursor-pointer transition-all ${
                      serviceType === 'corporate'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-slate-900 dark:text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    🏢 {currentLang === 'en' ? 'Corporate Office / HQ' : 'कॉर्पोरेट कार्यालय / मुख्यालय'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('villa')}
                    className={`p-2.5 rounded-xl font-semibold border text-left cursor-pointer transition-all ${
                      serviceType === 'villa'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-slate-900 dark:text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    🏰 {currentLang === 'en' ? 'Luxury Villa / Farmhouse' : 'लक्जरी विला / फार्महाउस'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('astrology')}
                    className={`p-2.5 rounded-xl font-semibold border text-left cursor-pointer transition-all ${
                      serviceType === 'astrology'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-slate-900 dark:text-white font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    🔮 {currentLang === 'en' ? 'Strategic KP Astrology' : 'रणनीतिक केपी ज्योतिष'}
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.name} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Agarwal"
                    value={name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setName(val);
                      if (errors.name) {
                        const check = validateName(val, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.name;
                            return copy;
                          });
                        }
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPhone(val);
                      if (errors.phone) {
                        const check = validatePhone(val, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.phone;
                            return copy;
                          });
                        }
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.email}
                  </label>
                  <input
                    type="email"
                    placeholder="director@enterprise.com"
                    value={email}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEmail(val);
                      if (errors.email) {
                        const check = validateEmail(val, false, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.email;
                            return copy;
                          });
                        }
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.city}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indore / Dubai"
                    value={city}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCity(val);
                      if (errors.city && val.trim()) {
                        const check = validateCity(val, currentLang);
                        if (check.isValid) {
                          setErrors(prev => {
                            const copy = { ...prev };
                            delete copy.city;
                            return copy;
                          });
                        }
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-900 dark:text-white focus:outline-none ${
                      errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-[#D4AF37]'
                    }`}
                  />
                  {errors.city && (
                    <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Area & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.facilitySize}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 85,000 sq.ft. Rolling Mill"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.preferredDate}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {bm.notes}
                </label>
                <textarea
                  rows={2}
                  placeholder={currentLang === 'en' ? "Describe any machine breakdowns, financial delays, or expansion goals..." : "विशिष्ट समस्याएं या विस्तार की योजनाएं..."}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Notice */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                {bm.instantNotice}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-lg shadow-[#D4AF37]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{bm.submitBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          </>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-cinzel text-2xl font-bold text-slate-900 dark:text-white">
              {bm.successTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {bm.successDesc}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {currentLang === 'en' ? 'Close Window' : 'खिड़की बंद करें'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
