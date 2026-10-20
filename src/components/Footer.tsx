import React from 'react';
import { translations } from '../data/translations.ts';
import { Language, Theme } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { MapPin, Phone, Mail, Clock, Sun, Moon, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  onOpenBooking: (serviceType?: string) => void;
  onScrollTo: (elementId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  onOpenBooking,
  onScrollTo,
}) => {
  const t = translations[currentLang];
  const f = t.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#0B0F19] text-slate-300 border-t border-[#D4AF37]/30 pt-16 pb-12 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Bhopal Head Office (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-1 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40">
                <SriYantraMotif className="w-9 h-9" />
              </div>
              <span className="font-cinzel text-xl font-black text-white tracking-wider">
                VEDIC <span className="gold-gradient-text">WISDOM</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {f.aboutText}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="font-bold text-[#F3E5AB] uppercase tracking-wider text-[11px]">
                {f.registeredOffice}
              </div>
              <div className="flex items-start space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>178 Maple High Street, Bhopal, Madhya Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Astrology Solutions (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wide uppercase">
              {f.astrologyLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenBooking('astrology')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  🔮 KP System & Cuspal Interlinks (CIL)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('astrology')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  📜 Bhrigu Nandi Nadi (BNN) & Transits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('astrology')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  ⚖️ Lal Kitab Remedial Sessions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('digital-reports')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  💍 Marriage Compatibility & 36-Guna
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('astrology')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  ⏳ Birth Time Rectification (BTR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('free-calculators')}
                  className="hover:text-[#D4AF37] transition-colors text-left text-amber-400 font-medium"
                >
                  ★ Instant Kundli & Panchang
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Astro-Vastu Verticals (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wide uppercase">
              {f.vastuLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenBooking('industrial')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  🏭 Industrial & Factory Vastu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('industrial')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  ⚙️ Factory Layouts & Heavy CNC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('corporate')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  🏢 Corporate HQs & Fintech Hubs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('villa')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  🏰 Luxury Villa & Estate Harmony
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('academy')}
                  className="hover:text-[#D4AF37] transition-colors text-left"
                >
                  🎓 Astro-Vastu Certification
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cinzel text-sm font-bold text-white tracking-wide uppercase">
              {f.contactTitle}
            </h4>

            <div className="space-y-2.5 text-xs">
              <a
                href="https://wa.me/919009448601"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">WhatsApp: +91 90094 48601</span>
              </a>

              <a
                href="mailto:ask.vedicwisdom@gmail.com"
                className="flex items-center space-x-2 text-slate-300 hover:text-[#D4AF37] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>ask.vedicwisdom@gmail.com</span>
              </a>

              <div className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Executive Hours: 09:30 AM – 07:30 PM IST</span>
              </div>
            </div>

            {/* Language & Theme Controls in Footer */}
            <div className="pt-2 flex items-center space-x-3">
              <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                <button
                  onClick={() => onLanguageChange('en')}
                  className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${
                    currentLang === 'en' ? 'bg-[#D4AF37] text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onLanguageChange('hi')}
                  className={`px-2 py-1 text-xs font-semibold rounded cursor-pointer ${
                    currentLang === 'hi' ? 'bg-[#D4AF37] text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  हिंदी
                </button>
              </div>

              <button
                onClick={onThemeToggle}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {currentTheme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Moon className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors ml-auto cursor-pointer"
                title="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">Vedic Wisdom</span>. {f.allRights}
          </div>
          <div className="text-center md:text-right max-w-lg text-[10px] text-slate-500">
            {f.disclaimer}
          </div>
        </div>

      </div>
    </footer>
  );
};
