import React from 'react';
import { Award, ShieldCheck, Compass, Sparkles, BookOpen, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { Language } from '../../types/index.ts';
import sandeepPhoto from '../../assets/sandeep-tripathi.jpg';

interface ExpertProfileProps {
  currentLang?: Language;
  onOpenBooking?: (serviceType?: string) => void;
  onOpenConsultationScope?: () => void;
}

export const ExpertProfile: React.FC<ExpertProfileProps> = ({
  currentLang = 'en',
  onOpenBooking,
  onOpenConsultationScope
}) => {
  const isHi = currentLang === 'hi';

  return (
    <section 
      id="about"
      aria-label={isHi ? "सलाहकार परिचय" : "Meet Your Consultant"}
      className="relative w-full py-12 lg:py-16 bg-gradient-to-b from-[#FAF9F6] via-amber-50/20 to-[#FAF9F6] dark:from-[#0B0F19] dark:via-[#0F172A] dark:to-[#0B0F19] border-y border-amber-500/15 scroll-mt-24"
    >
      <div id="expert-profile" className="hidden" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl border border-amber-500/25 dark:border-amber-500/20 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Consultant Avatar & Credentials Seal */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                {/* Brass / Amber Accent Ring */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-700 shadow-xl shadow-amber-900/20">
                  <div className="w-full h-full rounded-full bg-slate-950 border-4 border-slate-900 overflow-hidden flex items-center justify-center relative">
                    <img 
                      src={sandeepPhoto}
                      alt="Sandeep K. Tripathi - Principal Consultant in Spatial Vastu and Classical Vedic Advisory"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Trust Verification Pill */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-700 dark:bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center space-x-1.5 border border-emerald-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                  <span>{isHi ? "सत्यापित मुख्य सलाहकार" : "Verified Principal Lead"}</span>
                </div>
              </div>

              {/* Name & Academic Title */}
              <h3 className="mt-5 text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                Sandeep K. Tripathi
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-[#F3E5AB] mt-1 max-w-xs">
                {isHi 
                  ? "शास्त्रीय ज्योतिष, अंकशास्त्र एवं स्थानिक ऊर्जा वास्तु शोधकर्ता" 
                  : "Researcher in Classical Astrology, Numerology & Spatial Energy Vastu"}
              </p>

              {/* Key Credentials Strip */}
              <div className="mt-4 flex flex-col space-y-2 w-full max-w-xs">
                <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{isHi ? "एम.एससी. गणित | 12+ वर्ष का शोध अनुभव" : "M.Sc. Mathematics | 12+ Years Experience"}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-950 dark:text-emerald-300 border border-emerald-500/20">
                  <Compass className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{isHi ? "गैर-तोड़फोड़ ऊर्जा संतुलन" : "Non-Demolition Spatial Energy Alignment"}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{isHi ? "पारदर्शी प्रेक्षणात्मक परामर्श" : "Transparent, Data-Backed Observational Advisory"}</span>
                </div>
              </div>
            </div>

            {/* Right: Core Philosophy, Rational Stance & Action Trigger */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isHi ? "वैज्ञानिक दृष्टिकोण व शास्त्रीय परंपरा का संगम" : "Empirical Insight Rooted in Classical Indian Lineage"}</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-extrabold text-slate-900 dark:text-slate-100 leading-snug">
                {isHi 
                  ? "तर्कसंगत, भय-मुक्त स्थान संतुलन — बिना किसी तोड़-फोड़ अथवा अंधविश्वास के।"
                  : "Rational, Fear-Free Space Alignment: Structured Advisory Without Structural Demolition or Superstitious Upsells."}
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {isHi
                  ? "हमारा दृष्टिकोण प्राचीन भारतीय प्रेक्षणात्मक शास्त्रों, दिक्-ऊर्जा (Spatial Energy) और गणितीय केपी ज्योतिष पर आधारित है। हम ग्राहकों को भयभीत करने वाले दावों, अनावश्यक रत्नों के व्यापार अथवा दीवारों को तोड़ने के सख्त खिलाफ हैं। प्रत्येक परामर्श एक सुविचारित, व्यावहारिक और तर्कसंगत मार्गदर्शन ढांचा है।"
                  : "Every residence, commercial unit, or industrial floor holds distinct directional geometry. Rooted in rigorous classical Indian observational literature and mathematical coordinate analysis, our advisory focuses entirely on elemental balance, color frequencies, brass/copper metallic energy rectifiers, and practical directional corrections — keeping walls intact and minds at peace."}
              </p>

              {/* Three Core Distinctions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{isHi ? "शून्य तोड़-फोड़" : "Zero Demolition"}</span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                    {isHi ? "मौजूदा संरचना में बिना तोड़-फोड़ के रंगों व धातुओं से ऊर्जा संतुलन।" : "Color bands, elemental redistribution, and non-invasive metallic strip inserts."}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{isHi ? "भय-मुक्त परामर्श" : "Fear-Free Clarity"}</span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                    {isHi ? "दुर्भाग्य का भय दिखाए बिना केवल तार्किक दिशात्मक उपाय।" : "Objective cyclical analysis without fatalistic predictions or high-priced gemstone sales."}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                  <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{isHi ? "गोपनीयता प्रतिबद्धता" : "Strict Privacy"}</span>
                  </div>
                  <p className="text-[12px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                    {isHi ? "आपके सभी नक्शे और जन्म विवरण एंड-टू-एंड सुरक्षित व गोपनीय।" : "DPDP & GDPR compliant handling; floor blueprints never shared or publicized."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenBooking ? onOpenBooking('vastu') : window.location.assign('#pricing')}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-900/20 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{isHi ? "संदीप जी से परामर्श बुक करें" : "Book Advisory Session with Sandeep ji"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenConsultationScope && (
                  <button
                    type="button"
                    onClick={onOpenConsultationScope}
                    className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-all cursor-pointer"
                  >
                    {isHi ? "परामर्श प्रक्रिया देखें" : "View Advisory Process"}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
