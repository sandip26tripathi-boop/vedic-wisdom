import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Language } from '../../types/index.ts';

interface StatutoryDisclaimerBannerProps {
  currentLang?: Language;
  onOpenDisclaimerModal?: () => void;
}

export const StatutoryDisclaimerBanner: React.FC<StatutoryDisclaimerBannerProps> = ({
  currentLang = 'en',
  onOpenDisclaimerModal
}) => {
  const isHi = currentLang === 'hi';
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if user dismissed it in this session
    try {
      const dismissed = sessionStorage.getItem('vw_disclaimer_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch {
      // storage unavailable
    }
  }, []);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('vw_disclaimer_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <div 
      role="region" 
      aria-label="Statutory Legal Disclaimer Banner"
      className="w-full bg-slate-950 text-slate-300 border-b border-amber-500/25 px-3 py-1.5 text-[11px] sm:text-xs z-30 transition-all select-none"
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="font-bold text-amber-300 shrink-0">
            {isHi ? "वैधानिक सूचना:" : "Statutory Notice:"}
          </span>
          <span className="truncate text-slate-400">
            {isHi 
              ? "परामर्श व रिपोर्ट शास्त्रीय भारतीय प्रेक्षणात्मक विज्ञान पर आधारित पारंपरिक मार्गदर्शन हैं..."
              : "Consultations and reports are traditional advisory practices rooted in classical Indian observational sciences..."}
          </span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-400 hover:text-amber-300 font-semibold underline text-[11px] flex items-center space-x-0.5 cursor-pointer"
          >
            <span>{isExpanded ? (isHi ? "संक्षिप्त करें" : "Collapse") : (isHi ? "विस्तार से पढ़ें" : "Read Full Disclaimer")}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-slate-500 hover:text-slate-300 rounded cursor-pointer"
            aria-label="Dismiss disclaimer banner"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="container mx-auto max-w-7xl pt-2 pb-1 border-t border-slate-800 mt-1.5 animate-in fade-in duration-150 text-[11px] text-slate-400 leading-relaxed">
          <p>
            {isHi
              ? "अस्वीकरण: परामर्श एवं वास्तु रिपोर्ट प्राचीन भारतीय प्रेक्षणात्मक शास्त्रों पर आधारित पारंपरिक मार्गदर्शक पद्धतियां हैं। ये केवल व्यक्तिगत, दिशात्मक और गृह-सज्जा योजना हेतु अभिप्रेत हैं। ये किसी भी प्रकार से प्रमाणित चिकित्सा, मनोवैज्ञानिक, कानूनी, वित्तीय अथवा लाइसेंस प्राप्त सिविल इंजीनियरिंग सलाह का विकल्प नहीं हैं। प्रत्येक व्यक्ति का अनुभव व दृष्टिकोण भिन्न हो सकता है।"
              : "Disclaimer: Consultations and spatial reports are traditional advisory practices rooted in classical Indian observational sciences. They are intended solely for personal, directional, and architectural planning. They do not substitute for certified medical, psychological, legal, financial, or licensed structural engineering advice. Individual perspectives and experiences may vary."}
          </p>
        </div>
      )}
    </div>
  );
};
