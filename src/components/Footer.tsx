import React, { useState } from 'react';
import { Language, Theme } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sun, 
  Moon, 
  ShieldCheck, 
  ArrowUp, 
  Lock, 
  Compass, 
  BookOpen, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import type { LegalDocType } from './legal/LegalModal.tsx';

const LegalModal = React.lazy(() => import('./legal/LegalModal.tsx').then(m => ({ default: m.LegalModal })));

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  onOpenBooking: (serviceType?: string) => void;
  onScrollTo: (elementId: string) => void;
  onOpenLegalDoc?: (doc: LegalDocType) => void;
  onOpenCompassModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  onOpenBooking,
  onScrollTo,
  onOpenLegalDoc,
  onOpenCompassModal
}) => {
  const isHi = currentLang === 'hi';
  const [internalLegalDoc, setInternalLegalDoc] = useState<LegalDocType | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLegalClick = (doc: LegalDocType) => {
    if (onOpenLegalDoc) {
      onOpenLegalDoc(doc);
    } else {
      setInternalLegalDoc(doc);
    }
  };

  const statutoryDisclaimerText = isHi
    ? "अस्वीकरण: परामर्श एवं वास्तु रिपोर्ट प्राचीन भारतीय प्रेक्षणात्मक शास्त्रों पर आधारित पारंपरिक मार्गदर्शक पद्धतियां हैं। ये केवल व्यक्तिगत, दिशात्मक और गृह-सज्जा योजना हेतु अभिप्रेत हैं। ये किसी भी प्रकार से प्रमाणित चिकित्सा, मनोवैज्ञानिक, कानूनी, वित्तीय अथवा लाइसेंस प्राप्त सिविल इंजीनियरिंग सलाह का विकल्प नहीं हैं। प्रत्येक व्यक्ति का अनुभव व दृष्टिकोण भिन्न हो सकता है।"
    : "Disclaimer: Consultations and spatial reports are traditional advisory practices rooted in classical Indian observational sciences. They are intended solely for personal, directional, and architectural planning. They do not substitute for certified medical, psychological, legal, financial, or licensed structural engineering advice. Individual perspectives and experiences may vary.";

  return (
    <footer 
      id="contact" 
      aria-label="Site Footer and Legal Disclaimers"
      className="bg-[#0B0F19] text-slate-300 border-t border-amber-500/25 pt-16 pb-12 transition-colors relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* 4-Column Structured Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Anchor & Rational Philosophy (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-1 rounded-xl bg-amber-500/20 border border-amber-500/40">
                <SriYantraMotif className="w-8 h-8" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-wide">
                VEDIC <span className="text-amber-400">WISDOM</span>
              </span>
            </div>

            <p className="text-xs text-amber-200/90 font-medium">
              {isHi
                ? "संपत्ति-विशिष्ट वास्तु एवं शास्त्रीय वैदिक परामर्श (व्यावहारिक, तार्किक एवं गैर-तोड़फोड़)"
                : "Property-Specific Spatial Vastu & Classical Vedic Advisory (Practical, Logical & Non-Structural)"}
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isHi
                ? "हम किसी भी प्रकार के अंधविश्वास, भयभीत करने वाले दावों अथवा दीवारों को तोड़ने के सख्त खिलाफ हैं। हमारा दृष्टिकोण गणितीय केपी ज्योतिष और 16-दिशाओं के तत्वीय संतुलन पर आधारित है।"
                : "Founded on empirical research, non-demolition metallic energy strip boundary alignment, and classical KP cuspal interlinks. Zero fear-mongering and zero structural demolition."}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Central Advisory Desk: Bhopal, MP, India</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a href="https://wa.me/919009448601" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                  Direct WhatsApp: +91 90094 48601
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Property-Specific Services (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-xs font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              {isHi ? "वास्तु व ज्योतिष सेवाएं" : "Property Services"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('flat-vastu')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "🏢 फ्लैट एवं अपार्टमेंट वास्तु" : "🏢 Flat & Apartment Vastu"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('villa-vastu')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "🏡 स्वतंत्र मकान एवं कोठी वास्तु" : "🏡 House & Villa Vastu"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('office-vastu')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "💼 व्यापारिक एवं कार्यालय वास्तु" : "💼 Commercial & Office Vastu"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('classical-kundli')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "📜 शास्त्रीय जन्मकुंडली विश्लेषण" : "📜 Classical Kundli Advisory"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenBooking('integrated-astro-vastu')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "✨ एकीकृत एस्ट्रो-वास्तु समीक्षा" : "✨ Integrated Astro-Vastu Review"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('pricing')}
                  className="hover:text-amber-400 transition-colors text-left text-amber-400 font-semibold cursor-pointer"
                >
                  {isHi ? "★ 4-टियर शुल्क व SLA तालिका" : "★ 4-Tier Pricing & SLAs"}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Knowledge, Tools & Blog (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif text-xs font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              {isHi ? "ज्ञान भंडार व टूल्स" : "Knowledge & Tools"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('blog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "📖 16-ज़ोन का वास्तु विज्ञान" : "📖 16 Vastu Zones Guide"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('blog')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "🚪 फ्लैट मुख्य द्वार समाधान" : "🚪 Flat Entrance Solutions"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('pricing')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-emerald-400"
                >
                  {isHi ? "⚡ त्वरित वास्तु चेकलिस्ट (Free)" : "⚡ Quick Vastu Checklist (Free)"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCompassModal ? onOpenCompassModal : () => onScrollTo('floor-plan-intake')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "🧭 स्मार्टफोन कंपास गाइड" : "🧭 Compass Reading Guide"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('case-studies')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "📊 वास्तविक केस स्टडीज" : "📊 Anonymized Case Studies"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  {isHi ? "❓ अक्सर पूछे जाने वाले प्रश्न" : "❓ Consumer FAQs"}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance Suite (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-xs font-bold text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              {isHi ? "वैधानिक एवं नीतियां" : "Legal & Compliance"}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleLegalClick('disclaimer')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer text-amber-300 font-semibold"
                >
                  ⚖️ {isHi ? "सांविधिक कानूनी अस्वीकरण" : "Statutory Legal Disclaimer"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLegalClick('privacy')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  🔒 {isHi ? "गोपनीयता नीति (DPDP Act)" : "Privacy Policy (DPDP & GDPR)"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLegalClick('terms')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  📄 {isHi ? "सेवा की शर्तें (Terms of Service)" : "Terms of Advisory Service"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLegalClick('refund')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  🔄 {isHi ? "रिशेड्यूलिंग एवं रिफंड नीति" : "Rescheduling & Refund Policy"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleLegalClick('contact')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  📞 {isHi ? "शिकायत निवारण अधिकारी" : "Grievance Redressal Officer"}
                </button>
              </li>
            </ul>

            {/* Language & Theme Controls */}
            <div className="pt-3 flex items-center space-x-2">
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                    currentLang === 'en' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => onLanguageChange('hi')}
                  className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                    currentLang === 'hi' ? 'bg-amber-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              <button
                onClick={onThemeToggle}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title="Toggle Theme"
                aria-label="Toggle dark and light color theme"
              >
                {currentTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
              </button>

              <button
                onClick={scrollToTop}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors ml-auto cursor-pointer"
                title="Back to Top"
                aria-label="Scroll back to top of page"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* TRUST BADGES STRIP */}
        <div className="py-6 border-b border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span>{isHi ? "गोपनीय ग्राहक डेटा (DPDP अनुपालन)" : "Confidential Client Data"}</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-400">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>{isHi ? "गैर-तोड़फोड़ स्थान संतुलन" : "Non-Demolition Spatial Vastu"}</span>
          </div>
          <div className="flex items-center space-x-2 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>{isHi ? "सत्यापित शास्त्रीय गणनाएं" : "Verified Classical Calculations"}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{isHi ? "एन्क्रिप्टेड सुरक्षित लेनदेन" : "Encrypted Transactions"}</span>
          </div>
        </div>

        {/* MANDATORY STATUTORY DISCLAIMER BOX (ACROSS ENTIRE BOTTOM) */}
        <div className="my-8 p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-slate-300 text-xs leading-relaxed space-y-1.5">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isHi ? "सांविधिक कानूनी अस्वीकरण (Statutory Notice)" : "Statutory Legal Disclaimer & Advisory Notice"}
            </span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed font-normal">
            {statutoryDisclaimerText}
          </p>
        </div>

        {/* DYNAMIC COPYRIGHT & ATTRIBUTION */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">Vedic Wisdom</span>. {isHi ? "सर्वाधिकार सुरक्षित।" : "All rights reserved."}
          </div>
          <div className="text-[11px] text-slate-500">
            M.Sc. Mathematics Research Lineage | Classical KP & Spatial Alignment
          </div>
        </div>

      </div>

      {/* Internal Legal Modal */}
      {internalLegalDoc && (
        <React.Suspense fallback={null}>
          <LegalModal
            isOpen={Boolean(internalLegalDoc)}
            onClose={() => setInternalLegalDoc(null)}
            initialDoc={internalLegalDoc}
            currentLang={currentLang}
          />
        </React.Suspense>
      )}
    </footer>
  );
};
