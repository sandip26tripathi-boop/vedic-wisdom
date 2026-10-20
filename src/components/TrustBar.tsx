import React from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { ShieldAlert, CheckCircle, Scale, Magnet, Activity } from 'lucide-react';

interface TrustBarProps {
  currentLang: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const icons = [
    <CheckCircle key="1" className="w-4 h-4 text-emerald-500 shrink-0" />,
    <Scale key="2" className="w-4 h-4 text-[#D4AF37] shrink-0" />,
    <Activity key="3" className="w-4 h-4 text-amber-500 shrink-0" />,
    <Magnet key="4" className="w-4 h-4 text-sky-500 shrink-0" />
  ];

  return (
    <div className="bg-slate-100/60 dark:bg-slate-900/60 border-y border-[#D4AF37]/20 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.trust.title}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.trust.points.map((point, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-[#D4AF37]/50 transition-colors"
            >
              {icons[index % icons.length]}
              <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
