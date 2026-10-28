import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../../types/index.ts';

interface FloatingWhatsAppButtonProps {
  currentLang?: Language;
  onOpenConsultation?: () => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  currentLang = 'en',
  onOpenConsultation
}) => {
  const isHi = currentLang === 'hi';
  const [showTooltip, setShowTooltip] = useState(false);

  const preFilledMsg = encodeURIComponent(
    "Namaste Sandeep ji, I would like to inquire about a Property-Specific Vastu / Astrology consultation for my [Flat/House/Office]."
  );
  const waUrl = `https://wa.me/919009448601?text=${preFilledMsg}`;

  return (
    <aside 
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end"
    >
      {/* Subtle Notification Badge Tooltip on Hover / Focus */}
      {showTooltip && (
        <div className="mb-2.5 max-w-[260px] p-3 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 shadow-xl text-left animate-in fade-in slide-in-from-bottom-2 duration-150 relative">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-1.5 right-1.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center space-x-1.5 text-[11px] font-bold text-amber-900 dark:text-[#F3E5AB] mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isHi ? "सीधा रिसर्च डेस्क" : "Direct Advisory Desk"}</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
            {isHi 
              ? "संदीप जी से अपने फ्लैट, मकान अथवा ऑफिस वास्तु पर त्वरित चर्चा करें।" 
              : "Chat with Sandeep ji regarding property-specific Vastu or Kundli advisory."}
          </p>
        </div>
      )}

      {/* Main Pulse Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-900/30 border border-emerald-400/40 transition-all hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        aria-label="Chat on WhatsApp with Principal Consultant Sandeep K. Tripathi"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-white" />
        <span className="hidden sm:inline-block">
          {isHi ? "व्हाट्सएप परामर्श" : "WhatsApp Inquiry"}
        </span>
      </a>
    </aside>
  );
};
