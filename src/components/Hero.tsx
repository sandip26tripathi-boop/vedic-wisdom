import React from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Factory, 
  Building2, 
  Award, 
  CheckCircle2, 
  Zap,
  TrendingUp,
  Cpu,
  Grid,
  FileText
} from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenBooking: (service?: string) => void;
  onScrollTo: (elementId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenBooking,
  onScrollTo,
}) => {
  const { openAuthModal, isAuthenticated } = useAuth();
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden w-full max-w-full pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#D4AF37]/15 bg-[#FAF9F6] dark:bg-[#0B0F19] transition-colors duration-300">
      {/* Background Decorative Gradients & Sacred Geometry Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 flex items-center justify-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-[#D4AF37]/20 via-transparent to-transparent blur-3xl"></div>
        <div className="absolute -top-24 right-0 w-[400px] h-[400px] rounded-full bg-radial from-[#B45309]/15 via-transparent to-transparent blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Balanced Dual-Pillar Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill / Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs sm:text-sm font-bold text-amber-950 dark:text-[#F3E5AB]">
              <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Primary Headline */}
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {currentLang === 'en' ? (
                <>
                  <span className="gold-gradient-text">Traditional Vedic Astrology</span> & Non-Demolition Spatial Vastu
                </>
              ) : (
                <>
                  <span className="gold-gradient-text">प्रामाणिक वैदिक ज्योतिष</span> एवं शून्य तोड़-फोड़ ऊर्जा वास्तु
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              {t.hero.subheading}
            </p>

            {/* Non-Demolition & Traditional Vedic Guarantees */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.hero.nonDemolitionBadge}</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-200 text-xs font-semibold">
                <Cpu className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.hero.lecherVerified}</span>
              </div>
            </div>

            {/* Dual Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                onClick={() => onOpenBooking('industrial')}
                className="flex items-center justify-center space-x-2.5 px-6 py-4 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-lg shadow-[#D4AF37]/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onScrollTo('free-calculators')}
                className="flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-[#D4AF37]/40 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <Grid className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Quick 1-Click Gmail Access Badge for Visitors */}
            {!isAuthenticated && (
              <div className="pt-2 flex items-center">
                <button
                  type="button"
                  onClick={() => openAuthModal()}
                  className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800/90 border border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-sm text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#F3E5AB] transition-all cursor-pointer group"
                >
                  <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xs shrink-0">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                    </svg>
                  </span>
                  <span>
                    {currentLang === 'en'
                      ? 'New visitor? 1-Click Enter via Gmail'
                      : 'नए आगंतुक? 1-क्लिक में सीधे Gmail से प्रवेश करें'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Quick Link to Digital Reports Store */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
              <button
                onClick={() => onScrollTo('digital-reports')}
                className="text-slate-600 dark:text-slate-400 hover:text-[#B45309] dark:hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4 decoration-[#D4AF37]/50"
              >
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.hero.ctaReports}</span>
                <span>→</span>
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Sacred Geometry & 16-Zone Compass Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Outer Container with Light-first Luxury Glassmorphism & Gold Border Glow */}
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/95 via-white/90 to-[#FAF9F6]/95 dark:from-[#111827]/95 dark:via-[#0F172A]/95 dark:to-[#0B0F19]/95 border border-[#D4AF37]/40 shadow-2xl gold-border-glow backdrop-blur-md overflow-hidden">
              
              {/* Corner Accents */}
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]"></div>

              {/* Header inside graphic card */}
              <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {currentLang === 'en' ? 'Vedic Resonance Architecture' : 'स्थानिक व ग्रहीय ऊर्जा तंत्र'}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/15 text-amber-950 dark:text-[#F3E5AB] font-mono font-bold">
                  KP • CIL • 16-ZONES
                </span>
              </div>

              {/* Graphic Yantra Visual with live rotating ticks and direction labels */}
              <div className="relative my-6 flex items-center justify-center">
                
                {/* Floating Cardinal Badges */}
                <div className="absolute top-0 text-[10px] font-bold text-sky-800 dark:text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded-full border border-sky-500/30">
                  N • Kuber (0°)
                </div>
                <div className="absolute bottom-0 text-[10px] font-bold text-rose-800 dark:text-rose-300 bg-rose-500/15 px-2 py-0.5 rounded-full border border-rose-500/30">
                  S • Yama (180°)
                </div>
                <div className="absolute right-0 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  E • Surya (90°)
                </div>
                <div className="absolute left-0 text-[10px] font-bold text-amber-900 dark:text-amber-200 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                  W • Varuna (270°)
                </div>

                {/* Main Sri Yantra Graphic in Center (Ascending Upward Orientation) */}
                <div className="p-6 my-4">
                  <SriYantraMotif className="w-48 h-48 sm:w-56 sm:h-56 drop-shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:scale-105 transition-transform duration-300" animate={false} />
                </div>
              </div>

              {/* Bottom Feature Badges inside the visual card */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">KP Sub-Sub Lord</div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">Micro-Second Timing</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-100">0% Demolition</div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">Elemental Metallic Transmutation</div>
                  </div>
                </div>
              </div>

              {/* Founding Leadership Endorsement Strip */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                <span>By Ravindra Pathak & Sandeep Tripathi</span>
                <span className="font-bold text-amber-950 dark:text-[#F3E5AB]">Bhopal, MP, India</span>
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic Metric Strip */}
        <div className="mt-14 pt-8 border-t border-[#D4AF37]/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-[#D4AF37]/20 shadow-xs">
              <div className="font-cinzel text-2xl sm:text-4xl font-extrabold gold-gradient-text">
                {t.hero.metrics.years}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {t.hero.metrics.yearsLabel}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-[#D4AF37]/20 shadow-xs">
              <div className="font-cinzel text-2xl sm:text-4xl font-extrabold gold-gradient-text">
                {t.hero.metrics.spaces}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {t.hero.metrics.spacesLabel}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-[#D4AF37]/20 shadow-xs">
              <div className="font-cinzel text-2xl sm:text-4xl font-extrabold gold-gradient-text">
                {t.hero.metrics.remedy}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {t.hero.metrics.remedyLabel}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-[#D4AF37]/20 shadow-xs">
              <div className="font-cinzel text-2xl sm:text-4xl font-extrabold gold-gradient-text">
                {t.hero.metrics.countries}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
                {t.hero.metrics.countriesLabel}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
