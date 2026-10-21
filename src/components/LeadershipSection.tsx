import React from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Quote, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Compass, 
  Scale, 
  Lightbulb, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface LeadershipSectionProps {
  currentLang: Language;
  onOpenBooking: (serviceType?: string) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  currentLang,
  onOpenBooking,
}) => {
  const t = translations[currentLang];
  const l = t.leadership;

  return (
    <section id="leadership" className="py-20 bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-amber-950 dark:text-[#F3E5AB]">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>{l.sectionBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {l.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {l.subtitle}
          </p>
        </div>

        {/* 2 Co-Founders Featured Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          
          {/* Ravindra Pathak — Founder & Visionary Leader */}
          <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#111827] border border-[#D4AF37]/40 shadow-xl relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#D4AF37]/10 to-transparent blur-2xl pointer-events-none"></div>

            <div>
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] p-0.5 shadow-md shrink-0 flex items-center justify-center text-slate-950 font-bold text-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-[#F3E5AB] font-cinzel text-2xl font-black">
                      RP
                    </div>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-2xl font-extrabold text-slate-900 dark:text-white">
                      {l.founders.ravindra.name}
                    </h3>
                    <div className="text-xs font-bold text-amber-950 dark:text-[#F3E5AB] mt-0.5">
                      {l.founders.ravindra.role}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 self-start sm:self-auto">
                  {currentLang === 'en' ? 'Institutional Strategist' : 'संस्थागत रणनीतिकार'}
                </span>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-6">
                {l.founders.ravindra.bio}
              </p>

              {/* Core Credentials List */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {currentLang === 'en' ? 'Key Credentials & Impact:' : 'प्रमुख उपलब्धियां:'}
                </div>
                {l.founders.ravindra.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy Quote */}
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 mb-6">
                <Quote className="w-4 h-4 text-[#D4AF37] inline-block mr-1 mb-1" />
                <span>"{l.founders.ravindra.quote}"</span>
              </div>
            </div>

            {/* Bottom Contact / Direct Consult */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {currentLang === 'en' ? 'Enterprise Land & Factory Audit' : 'बड़े उद्योगों का मास्टर अलाइनमेंट'}
              </span>
              <button
                onClick={() => onOpenBooking('industrial')}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-105 transition-all shadow-sm cursor-pointer"
              >
                <span>{currentLang === 'en' ? 'Consult Ravindra Pathak' : 'परामर्श बुक करें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Sandeep K. Tripathi — Principal Researcher & Chief Educator */}
          <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#111827] border border-[#D4AF37]/40 shadow-xl relative overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-amber-500/10 to-transparent blur-2xl pointer-events-none"></div>

            <div>
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B45309] p-0.5 shadow-md shrink-0 flex items-center justify-center text-slate-950 font-bold text-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-[#F3E5AB] font-cinzel text-2xl font-black">
                      ST
                    </div>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-2xl font-extrabold text-slate-900 dark:text-white">
                      {l.founders.sandeep.name}
                    </h3>
                    <div className="text-xs font-bold text-amber-950 dark:text-[#F3E5AB] mt-0.5">
                      {l.founders.sandeep.role}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 self-start sm:self-auto">
                  {currentLang === 'en' ? '12+ Yrs KP & Vastu Researcher' : '12+ वर्ष पारंपरिक शोध'}
                </span>
              </div>

              {/* Bio */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed my-6">
                {l.founders.sandeep.bio}
              </p>

              {/* Core Credentials List */}
              <div className="space-y-2.5 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {currentLang === 'en' ? 'Research Domain & Accreditations:' : 'शोध विषय व विशेषज्ञता:'}
                </div>
                {l.founders.sandeep.credentials.map((cred, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              {/* Philosophy Quote */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border-l-4 border-[#B45309] text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 mb-6">
                <Quote className="w-4 h-4 text-[#B45309] inline-block mr-1 mb-1" />
                <span>"{l.founders.sandeep.quote}"</span>
              </div>
            </div>

            {/* Bottom Contact / Direct Consult */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {currentLang === 'en' ? 'Private Kundli / Academy Mastermind' : 'व्यक्तिगत केपी कुंडली व कोर्सेज'}
              </span>
              <button
                onClick={() => onOpenBooking('astrology')}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-105 transition-all shadow-sm cursor-pointer"
              >
                <span>{currentLang === 'en' ? 'Consult Sandeep Tripathi' : 'परामर्श बुक करें'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* 4 Pillars of Core Traditional Methodology */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-slate-100/80 dark:bg-[#111827]/80 border border-[#D4AF37]/30 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {l.methodologyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              {currentLang === 'en'
                ? 'Rooted in ancient scriptural wisdom, classical Vastu Shastra, and traditional Vedic philosophies.'
                : 'प्राचीन वैदिक शास्त्रों, शास्त्रीय वास्तु नियमों और पारंपरिक ज्योतिषीय मान्यताओं पर आधारित।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {l.methodologyPoints.map((point, index) => {
              const icons = [
                <Cpu key="0" className="w-6 h-6 text-[#D4AF37]" />,
                <Compass key="1" className="w-6 h-6 text-sky-400" />,
                <ShieldCheck key="2" className="w-6 h-6 text-emerald-400" />,
                <Scale key="3" className="w-6 h-6 text-amber-500" />
              ];

              return (
                <div 
                  key={index}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 w-fit mb-4">
                      {icons[index % icons.length]}
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white mb-2">
                      {point.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
