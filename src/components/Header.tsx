import React, { useState } from 'react';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  FileText, 
  GraduationCap, 
  User, 
  Bot, 
  ShoppingBag,
  HelpCircle,
  Award,
  Calculator,
  Compass,
  LogOut
} from 'lucide-react';
import { translations } from '../data/translations.ts';
import { Language, Theme } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';

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
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [astroDropdownOpen, setAstroDropdownOpen] = useState(false);
  const [vastuDropdownOpen, setVastuDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

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
    setMoreDropdownOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#FAF9F6]/95 dark:bg-[#0B0F19]/95 border-b border-[#D4AF37]/25 shadow-xs transition-colors duration-300">
      {/* Top Advisory Hotline Ticker */}
      <div className="w-full bg-gradient-to-r from-[#0B0F19] via-[#1E293B] to-[#0B0F19] text-[#F3E5AB] text-xs py-1 px-3 sm:px-4 border-b border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs gap-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="font-medium text-slate-200 truncate">
              {currentLang === 'en' 
                ? 'Authentic 100% Non-Demolition Industrial Vastu & Classical KP Cuspal Interlink (CIL) Astrology'
                : '100% बिना तोड़-फोड़ औद्योगिक वास्तु एवं प्रामाणिक केपी कस्पल इंटरलिंक ज्योतिष'}
            </span>
            <span className="hidden md:inline-block text-[#D4AF37]">|</span>
            <span className="hidden lg:inline-flex items-center space-x-1.5 text-[#D4AF37] font-semibold">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${liveMuhurta.isAuspicious ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span>{liveMuhurta.name}</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a 
              href="https://wa.me/919009448601" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#F3E5AB] hover:text-white transition-colors flex items-center space-x-1 font-mono text-[11px]"
            >
              <span>WhatsApp:</span>
              <strong className="underline">+91 90094 48601</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer shrink-0"
          >
            <div className="relative p-1 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 via-[#B45309]/20 to-transparent border border-[#D4AF37]/40 shadow-sm group-hover:border-[#D4AF37] transition-all duration-300">
              <SriYantraMotif className="w-8 h-8 sm:w-9 sm:h-9 transform group-hover:scale-105 transition-transform duration-300" animate={false} />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-xl font-black tracking-wider text-slate-900 dark:text-white flex items-center gap-1">
                VEDIC <span className="gold-gradient-text">WISDOM</span>
              </span>
              <span className="hidden xl:block text-[10px] font-medium tracking-tight text-slate-600 dark:text-slate-400 truncate max-w-[280px]">
                {t.nav.tagline}
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Items (Streamlined to prevent 100% zoom clipping) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-200">
            
            {/* 1. Astrology Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAstroDropdownOpen(true)}
              onMouseLeave={() => setAstroDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNavClick('consultations')}
                className="flex items-center space-x-1 px-2.5 py-2 rounded-lg hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>{t.nav.astrology}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {astroDropdownOpen && (
                <div className="absolute top-full left-0 w-64 rounded-xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    {currentLang === 'en' ? 'Predictive Astrology' : 'वैदिक फलित ज्योतिष'}
                  </div>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-xs text-slate-900 dark:text-white"
                  >
                    <div className="font-bold">KP Cuspal Interlinks (CIL)</div>
                    <div className="text-[10px] text-slate-500">Sub-Sub Lord analysis</div>
                  </button>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-xs text-slate-900 dark:text-white"
                  >
                    <div className="font-bold">Birth Time Rectification</div>
                    <div className="text-[10px] text-slate-500">Ruling planets alignment</div>
                  </button>
                  <button 
                    onClick={() => { setAstroDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-xs text-slate-900 dark:text-white"
                  >
                    <div className="font-bold">Lal Kitab Remedial System</div>
                    <div className="text-[10px] text-slate-500">Non-invasive planetary corrections</div>
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
                className="flex items-center space-x-1 px-2.5 py-2 rounded-lg hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>{t.nav.astroVastu}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {vastuDropdownOpen && (
                <div className="absolute top-full left-0 w-64 rounded-xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    {currentLang === 'en' ? '0% Demolition Spatial Vastu' : 'शून्य तोड़-फोड़ वास्तु'}
                  </div>
                  <button 
                    onClick={() => { setVastuDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-xs text-slate-900 dark:text-white"
                  >
                    <div className="font-bold">🏭 Industrial & Mega Factory</div>
                    <div className="text-[10px] text-slate-500">Production flow & machinery balance</div>
                  </button>
                  <button 
                    onClick={() => { setVastuDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-xs text-slate-900 dark:text-white"
                  >
                    <div className="font-bold">🏢 Corporate HQs & Tech Parks</div>
                    <div className="text-[10px] text-slate-500">Boardrooms & cashflow energy</div>
                  </button>
                  <button 
                    onClick={() => { setVastuDropdownOpen(false); handleNavClick('consultations'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors text-xs text-slate-900 dark:text-white"
                  >
                    <div className="font-bold">🏰 Luxury Estates & Villas</div>
                    <div className="text-[10px] text-slate-500">Geopathic stress neutralization</div>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Digital Reports */}
            <button 
              onClick={() => handleNavClick('digital-reports')}
              className="px-2.5 py-2 rounded-lg hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.nav.digitalReports}</span>
            </button>

            {/* 4. Academy */}
            <button 
              onClick={() => handleNavClick('academy')}
              className="px-2.5 py-2 rounded-lg hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.nav.academy}</span>
            </button>

            {/* 5. More ▾ Dropdown (Calculators, Leadership, FAQ, AI Copilot) */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button 
                className="flex items-center space-x-1 px-2.5 py-2 rounded-lg hover:text-[#B45309] dark:hover:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span>{currentLang === 'en' ? 'More' : 'अन्य'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 w-52 rounded-xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button 
                    onClick={() => { setMoreDropdownOpen(false); handleNavClick('free-calculators'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{t.nav.calculators}</span>
                  </button>
                  <button 
                    onClick={() => { setMoreDropdownOpen(false); handleNavClick('leadership'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.nav.leadership}</span>
                  </button>
                  <button 
                    onClick={() => { setMoreDropdownOpen(false); handleNavClick('faq'); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
                    <span>FAQ</span>
                  </button>
                  <button 
                    onClick={() => { setMoreDropdownOpen(false); onOpenCopilot && onOpenCopilot(); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 text-xs font-semibold text-[#B45309] dark:text-[#F3E5AB]"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>AI Copilot</span>
                  </button>
                  <button 
                    onClick={() => { setMoreDropdownOpen(false); onOpenGenerateReport && onOpenGenerateReport(); }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>AI Dossier</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Controls: Cart, Language, Theme & PROMINENT TOP-RIGHT LOGIN */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            
            {/* Language Switcher (EN / HI) */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800/80 rounded-lg p-0.5 border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => onLanguageChange('en')}
                className={`min-h-[40px] px-2 py-1 text-[11px] font-bold rounded transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Switch to English"
                aria-label="Switch website language to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`min-h-[40px] px-2 py-1 text-[11px] font-bold rounded transition-all cursor-pointer ${
                  currentLang === 'hi'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="हिंदी में देखें"
                aria-label="वेबसाइट की भाषा हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>

            {/* Theme Toggle (Day/Night) */}
            <button
              onClick={onThemeToggle}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="Toggle dark and light color theme"
              title="Toggle color theme"
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Shopping Cart Trigger Button with Dynamic Red Badge */}
            <button
              onClick={openCart}
              className="relative min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="View shopping cart drawer"
              title={currentLang === 'en' ? 'Open Vedic Cart' : 'कार्ट देखें'}
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-xs animate-in zoom-in-50">
                  {totalItems}
                </span>
              )}
            </button>

            {/* PROMINENT TOP-RIGHT LOGIN / CLIENT PORTAL & SIGN OUT BUTTONS */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={onOpenDashboard}
                  className="min-h-[44px] inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-900 dark:text-white bg-amber-500/20 hover:bg-amber-500/30 border-2 border-[#D4AF37] shadow-sm shadow-[#D4AF37]/30 cursor-pointer transition-all shrink-0"
                  title="Open Client Dashboard"
                  aria-label="Open Vedic Client Portal Dashboard"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white flex items-center justify-center text-[10px] font-extrabold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'V'}
                  </div>
                  <span className="font-extrabold text-xs">Client Portal</span>
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                </button>
                <button
                  onClick={logout}
                  className="min-h-[44px] inline-flex items-center space-x-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 shadow-xs cursor-pointer transition-all shrink-0"
                  title={currentLang === 'en' ? 'Sign Out / Logout' : 'साइन आउट / लॉगआउट'}
                  aria-label={currentLang === 'en' ? 'Sign Out of Vedic Wisdom' : 'वैदिक विस्डम से साइन आउट करें'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-bold">{currentLang === 'en' ? 'Sign Out' : 'लॉगआउट'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="min-h-[44px] inline-flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 border-2 border-[#D4AF37] shadow-md shadow-[#D4AF37]/40 transition-all duration-200 cursor-pointer shrink-0"
                title="Client Login via Google"
                aria-label="Client Login via Google"
              >
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                  </svg>
                </span>
                <span className="font-black tracking-wide text-slate-950">
                  {currentLang === 'en' ? 'Google Login' : 'Google लॉगिन'}
                </span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#0B0F19] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Auth Button */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#D4AF37]/15 to-emerald-500/15 border-2 border-[#D4AF37]/40 shadow-sm">
            {isAuthenticated ? (
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenDashboard && onOpenDashboard(); }}
                  className="flex-1 text-left font-bold text-xs text-[#B45309] dark:text-[#F3E5AB] flex items-center justify-between cursor-pointer py-1"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                    <span className="truncate">{user?.name} (Portal)</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? 'Sign Out' : 'लॉगआउट'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); openAuthModal(); }}
                className="w-full text-left font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shadow-xs border border-slate-200">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.13z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {currentLang === 'en' ? 'Sign in with Google' : 'Google से लॉगिन करें'}
                    </div>
                    <div className="text-[10px] text-[#B45309] dark:text-[#F3E5AB]">
                      {currentLang === 'en' ? '1-Click Instant Login' : '1-क्लिक त्वरित लॉगिन'}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            )}
          </div>

          {/* Mobile Cart Review Button */}
          <button
            onClick={() => { setMobileMenuOpen(false); openCart(); }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-slate-900 dark:text-white cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentLang === 'en' ? 'Review Vedic Services Cart' : 'वैदिक सर्विसेज कार्ट देखें'}</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 font-bold font-mono text-[11px]">
              {totalItems} {currentLang === 'en' ? 'items' : 'आइटम'}
            </span>
          </button>

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
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              {t.nav.calculators}
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 px-3 rounded-lg font-medium text-slate-800 dark:text-slate-100 hover:bg-[#D4AF37]/10"
            >
              FAQ
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
