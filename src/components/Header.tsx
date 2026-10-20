import React, { useState } from 'react';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { Sun, Moon, Globe, PhoneCall, Menu, X, ArrowRight, ShieldCheck, ChevronDown, Sparkles, FileText, Compass, GraduationCap, User, LogIn, Lock, Bot } from 'lucide-react';
import { translations } from '../data/translations.ts';
import { Language, Theme } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  onOpenBooking: (serviceType?: string) => void;
  onOpenDashboard?: () => void;
  onOpenCopilot?: () => void;
  onOpenGenerateReport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  onOpenBooking,
  onOpenDashboard,
  onOpenCopilot,
  onOpenGenerateReport,
}) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [astroDropdownOpen, setAstroDropdownOpen] = useState(false);
  const [vastuDropdownOpen, setVastuDropdownOpen] = useState(false);

  const t = translations[currentLang];

  // Real-time Choghadiya calculator based on local time
  const getLiveChoghadiya = () => {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    const day = now.getDay();
    const slotIdx = Math.max(0, Math.min(7, Math.floor((hours - 6) / 1.5)));

    const sequences = [
      ['Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sun
      ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit'], // Mon
      ['Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'],   // Tue
      ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh'], // Wed
      ['Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thu
      ['Chal', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal'],   // Fri
      ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Chal', 'Labh', 'Amrit', 'Kaal']   // Sat
    ];

    const currentName = sequences[day][slotIdx] || 'Shubh';
    const isAuspicious = ['Amrit', 'Shubh', 'Labh', 'Chal'].includes(currentName);

    const labels: Record<string, { en: string; hi: string; meaningEn: string; meaningHi: string }> = {
      Amrit: { en: 'Amrit Muhurta Active', hi: 'अमृत मुहूर्त सक्रिय', meaningEn: 'Best for offline bookings & agreements', meaningHi: 'ऑफ़लाइन बुकिंग व समझौतों हेतु श्रेष्ठ' },
      Shubh: { en: 'Shubh Muhurta Active', hi: 'शुभ मुहूर्त सक्रिय', meaningEn: 'Auspicious for consultation booking', meaningHi: 'परामर्श बुकिंग हेतु कल्याणकारी समय' },
      Labh: { en: 'Labh Muhurta Active', hi: 'लाभ मुहूर्त सक्रिय', meaningEn: 'Optimal for commercial & factory expansion', meaningHi: 'व्यावसायिक व औद्योगिक विस्तार हेतु श्रेष्ठ' },
      Chal: { en: 'Char Muhurta Active', hi: 'चर मुहूर्त सक्रिय', meaningEn: 'Favorable for site visits & movement', meaningHi: 'साइट विजिट व कार्य आरंभ हेतु अनुकूल' },
      Rog: { en: 'Pradosh/Sandhya Cycle', hi: 'संध्या काल चक्र', meaningEn: 'Ideal for Vedic diagnostics & chart evaluation', meaningHi: 'कुंडली विश्लेषण व परीक्षण हेतु उपयुक्त' },
      Kaal: { en: 'Samya Transit Window', hi: 'साम्य काल चक्र', meaningEn: 'Empirical review & CAD layout preparation', meaningHi: 'लेआउट समीक्षा व तैयारी हेतु उपयुक्त' },
      Udveg: { en: 'Deep Analysis Window', hi: 'गहन समीक्षा चक्र', meaningEn: 'KP Sub-Sub Lord verification recommended', meaningHi: 'केपी ज्योतिष सत्यापन की अनुशंसा' },
    };

    const details = labels[currentName] || labels.Shubh;
    return {
      name: currentLang === 'en' ? details.en : details.hi,
      meaning: currentLang === 'en' ? details.meaningEn : details.meaningHi,
      isAuspicious
    };
  };

  const liveMuhurta = getLiveChoghadiya();

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    setAstroDropdownOpen(false);
    setVastuDropdownOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#FAF9F6]/95 dark:bg-[#0B0F19]/95 border-b border-[#D4AF37]/25 shadow-xs transition-colors duration-300">
      {/* Top Advisory Hotline Ticker */}
      <div className="w-full max-w-full overflow-x-hidden bg-gradient-to-r from-[#0B0F19] via-[#1E293B] to-[#0B0F19] text-[#F3E5AB] text-xs py-1.5 px-3 sm:px-4 border-b border-[#D4AF37]/30">
        <div className="container mx-auto flex items-center justify-between text-[11px] sm:text-xs gap-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-medium text-slate-200 truncate">
              {currentLang === 'en' 
                ? 'Empirical 100% Non-Demolition Industrial Vastu & KP Cuspal Interlink (CIL) Astrology'
                : '100% बिना तोड़-फोड़ औद्योगिक वास्तु एवं गणितीय केपी कस्पल इंटरलिंक ज्योतिष'}
            </span>
            <span className="hidden md:inline-block text-[#D4AF37]">|</span>
            <span className="hidden md:inline-block text-slate-300 whitespace-nowrap">
              {currentLang === 'en' ? 'Bhopal • Delhi NCR • Mumbai • Dubai' : 'भोपाल • दिल्ली • मुंबई • दुबई'}
            </span>
            <span className="hidden lg:inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold">{liveMuhurta.name}</span>
              <span className="text-slate-400 font-normal">• {liveMuhurta.meaning}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <a 
              href="tel:+919009448601" 
              className="flex items-center space-x-1.5 text-amber-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-semibold tracking-wide">+91 90094 48601</span>
            </a>
            <span className="hidden sm:inline-block text-slate-400">•</span>
            <a 
              href="mailto:ask.vedicwisdom@gmail.com" 
              className="hidden sm:inline-block text-slate-300 hover:text-amber-200 transition-colors whitespace-nowrap"
            >
              ask.vedicwisdom@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Identity Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3.5 group cursor-pointer"
          >
            <div className="relative p-1 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 via-[#B45309]/20 to-transparent border border-[#D4AF37]/40 shadow-sm group-hover:border-[#D4AF37] transition-all duration-300">
              <SriYantraMotif className="w-10 h-10 transform group-hover:scale-105 transition-transform duration-300" animate={false} />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-black tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                VEDIC <span className="gold-gradient-text">WISDOM</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-tight text-slate-600 dark:text-slate-400 max-w-[210px] sm:max-w-none truncate">
                {t.nav.tagline}
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-sm font-medium">
            
            {/* 1. Astrology Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAstroDropdownOpen(true)}
              onMouseLeave={() => setAstroDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNavClick('consultations')}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>{t.nav.astrology}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {astroDropdownOpen && (
                <div className="absolute top-full left-0 w-72 rounded-xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    {currentLang === 'en' ? 'Predictive Astrology Systems' : 'वैदिक फलित ज्योतिष'}
                  </div>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      KP System & Cuspal Interlinks (CIL)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sub-Sub Lord precision for career & IPOs
                    </span>
                  </button>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      Birth Time Rectification (BTR)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sub-second verification with Ruling Planets
                    </span>
                  </button>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      Bhrigu Nandi Nadi (BNN) & Jaimini
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Karmic debts & Karakamsha soul missions
                    </span>
                  </button>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      Lal Kitab Remedial Sessions
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Practical, non-invasive planetary corrections
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Astro-Vastu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setVastuDropdownOpen(true)}
              onMouseLeave={() => setVastuDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNavClick('consultations')}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>{t.nav.astroVastu}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {vastuDropdownOpen && (
                <div className="absolute top-full left-0 w-72 rounded-xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    {currentLang === 'en' ? 'Non-Demolition Spatial Vastu' : 'शून्य तोड़-फोड़ वास्तु'}
                  </div>
                  <button 
                    onClick={() => { setVastuDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      🏭 Industrial & Mega Factory Vastu
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Boilers, heavy CNC & production flow
                    </span>
                  </button>
                  <button 
                    onClick={() => { setVastuDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      🏢 Corporate HQs & Tech Campuses
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Boardrooms & liquidity optimization
                    </span>
                  </button>
                  <button 
                    onClick={() => { setVastuDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex flex-col"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-xs">
                      🏰 Luxury Estates & Farmhouses
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Geopathic stress & Kundli-matched aura
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Digital Reports */}
            <button 
              onClick={() => handleNavClick('digital-reports')}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.nav.digitalReports}</span>
            </button>

            {/* 4. Academy & Courses */}
            <button 
              onClick={() => handleNavClick('academy')}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.nav.academy}</span>
            </button>

            {/* 5. Free Calculators */}
            <button 
              onClick={() => handleNavClick('free-calculators')}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5 font-semibold"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span>
              <span>{t.nav.calculators}</span>
            </button>

            {/* 6. Leadership */}
            <button 
              onClick={() => handleNavClick('leadership')}
              className="px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {t.nav.leadership}
            </button>

            {/* 7. FAQ */}
            <button 
              onClick={() => handleNavClick('faq')}
              className="px-2.5 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
            >
              {currentLang === 'en' ? 'FAQ' : 'एफएक्यू'}
            </button>

            {/* 8. AI Copilot */}
            <button 
              onClick={onOpenCopilot}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              title="Open Gemini AI AstroCopilot Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>AI Copilot</span>
            </button>
          </nav>

          {/* Right Controls: Language, Theme & Primary CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* AI Dossier Button */}
            <button
              onClick={onOpenGenerateReport}
              className="hidden xl:inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 border border-[#D4AF37]/40 shadow-xs cursor-pointer transition-all"
              title="Generate AI Astro-Vastu Dossier"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>AI Dossier</span>
            </button>
            
            {/* Language Switcher (EN / HI) */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  currentLang === 'hi'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="हिंदी में देखें"
              >
                हिंदी
              </button>
            </div>

            {/* Theme Toggle (Day/Night) - default light */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="Toggle theme"
              title={currentTheme === 'dark' ? "Switch to Day Mode (Light)" : "Switch to Night Mode (Dark)"}
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Client Portal / Sign In Button */}
            {isAuthenticated ? (
              <button
                onClick={onOpenDashboard}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-900 dark:text-white bg-amber-500/15 hover:bg-amber-500/25 border border-[#D4AF37]/50 shadow-xs cursor-pointer transition-all"
                title="Open Client Dashboard"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center text-[10px] font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
                </div>
                <span className="hidden sm:inline">Client Portal</span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Client Portal Sign In"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg font-semibold text-xs lg:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <span>{t.nav.bookConsultation}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#0B0F19] border-b border-[#D4AF37]/30 px-5 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Auth Button */}
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
            {isAuthenticated ? (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenDashboard && onOpenDashboard(); }}
                className="w-full text-left font-bold text-xs text-[#B45309] dark:text-[#F3E5AB] flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  {user?.name} (Open Client Portal)
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                className="w-full text-left font-bold text-xs text-[#B45309] dark:text-[#F3E5AB] flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#D4AF37]" />
                  Client Sign In / Verify Mobile OTP
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {/* AI Tools Quick Access Strip */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCopilot && onOpenCopilot(); }}
              className="py-2 px-3 rounded-lg font-bold text-xs bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/35 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>AI Copilot</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenGenerateReport && onOpenGenerateReport(); }}
              className="py-2 px-3 rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-[#D4AF37]/35 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>AI Dossier</span>
            </button>
          </div>
          <div className="flex flex-col space-y-2 pt-2 text-sm">
            <button
              onClick={() => handleNavClick('consultations')}
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              {t.nav.astrology} & {t.nav.astroVastu}
            </button>
            <button
              onClick={() => handleNavClick('digital-reports')}
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              {t.nav.digitalReports}
            </button>
            <button
              onClick={() => handleNavClick('academy')}
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              {t.nav.academy}
            </button>
            <button
              onClick={() => handleNavClick('free-calculators')}
              className="text-left py-2 px-3 rounded-lg font-medium text-[#B45309] dark:text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold"
            >
              ★ {t.nav.calculators}
            </button>
            <button
              onClick={() => handleNavClick('leadership')}
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              {t.nav.leadership}
            </button>
            <button
              onClick={() => handleNavClick('case-studies')}
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              {t.nav.caseStudies}
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 px-3 rounded-lg font-medium text-[#B45309] dark:text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold"
            >
              ❓ {currentLang === 'en' ? 'FAQ' : 'अक्सर पूछे जाने वाले प्रश्न'}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]"
            >
              <span>{t.nav.bookConsultation}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-slate-500">
              Hotline: <a href="tel:+919009448601" className="text-[#B45309] dark:text-[#D4AF37] font-semibold">+91 90094 48601</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
