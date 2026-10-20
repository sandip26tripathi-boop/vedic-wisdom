import React from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { 
  Building, 
  MapPin, 
  AlertCircle, 
  Wrench, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Factory, 
  ArrowRight 
} from 'lucide-react';

interface CaseStudiesSectionProps {
  currentLang: Language;
  onOpenBooking: (serviceType?: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const t = translations[currentLang];
  const cs = t.caseStudies;

  return (
    <section id="case-studies" className="py-20 bg-white dark:bg-[#0F172A] border-t border-[#D4AF37]/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="w-4 h-4" />
            <span>{cs.sectionBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {cs.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {cs.subtitle}
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cs.cases.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl p-6 sm:p-7 bg-[#FAF9F6] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center space-x-2 text-xs text-[#B45309] dark:text-[#D4AF37] font-semibold mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {item.title}
                </h3>

                {/* Challenge */}
                <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs">
                  <div className="flex items-center space-x-1.5 text-rose-700 dark:text-rose-400 font-bold mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{currentLang === 'en' ? 'Core Industrial Challenge:' : 'प्राथमिक चुनौती:'}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.challenge}
                  </p>
                </div>

                {/* Non-Demolition Remedy Applied */}
                <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="flex items-center space-x-1.5 text-amber-800 dark:text-amber-300 font-bold mb-1">
                    <Wrench className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{currentLang === 'en' ? '0% Demolition Remedy Executed:' : 'लागू किया गया वैज्ञानिक उपाय:'}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.remedy}
                  </p>
                </div>

                {/* Measured Business Results */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {currentLang === 'en' ? 'Measured 90-Day ROI:' : '90 दिनों के प्रमाणित परिणाम:'}
                  </div>
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start space-x-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  {item.roi}
                </span>
                <button
                  onClick={() => onOpenBooking('industrial')}
                  className="text-xs font-semibold text-[#B45309] dark:text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{currentLang === 'en' ? 'Audit Plant' : 'ऑडिट कराएं'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
