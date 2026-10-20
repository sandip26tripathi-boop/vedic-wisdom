import React, { useState } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { X, Calendar, MapPin, Building, Phone, Mail, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [serviceType, setServiceType] = useState(initialServiceId);
  const [clientType, setClientType] = useState('enterprise');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const t = translations[currentLang];
  const bm = t.bookingModal;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert(currentLang === 'en' ? 'Please provide your name and WhatsApp number.' : 'कृपया अपना नाम और व्हाट्सएप नंबर भरें।');
      return;
    }

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
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {bm.city}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Indore / Dubai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
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
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
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
