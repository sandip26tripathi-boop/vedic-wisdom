import React, { useState, useEffect } from 'react';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { Language, Theme } from '../../types/index.ts';
import { 
  X, 
  Sparkles, 
  Compass, 
  FileText, 
  GraduationCap, 
  Award, 
  HelpCircle, 
  Calculator, 
  Building2, 
  ShieldCheck, 
  MessageCircle, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Sun, 
  Moon, 
  Layers, 
  Menu, 
  TrendingUp, 
  PhoneCall, 
  Phone,
  MapPin, 
  Bot, 
  Home, 
  CheckCircle2, 
  BookOpen,
  Search,
  ArrowUpRight
} from 'lucide-react';

interface MobileCategoryDrawerProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  onScrollTo: (elementId: string) => void;
  onOpenCopilot?: () => void;
  onOpenBooking?: (service?: string) => void;
  onOpenGenerateReport?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

interface NavItem {
  id: string;
  nameEn: string;
  nameHi: string;
  descEn?: string;
  descHi?: string;
  targetId: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: { en: string; hi: string };
  actionType?: 'scroll' | 'copilot' | 'report' | 'booking';
  serviceType?: string;
}

interface CourseCategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  descEn: string;
  descHi: string;
  targetId: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: { en: string; hi: string };
  tag: string;
}

export const MobileCategoryDrawer: React.FC<MobileCategoryDrawerProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeToggle,
  onScrollTo,
  onOpenCopilot,
  onOpenBooking,
  onOpenGenerateReport,
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
}) => {
  const isHi = currentLang === 'hi';
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [searchQuery, setSearchQuery] = useState('');
  const [isCoursesAccordionOpen, setIsCoursesAccordionOpen] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState<string>('home');
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleOpen = () => {
    if (onOpen) onOpen();
    setInternalIsOpen(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    setInternalIsOpen(false);
    setSearchQuery('');
  };

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard accessibility: close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Track active visible section with IntersectionObserver
  useEffect(() => {
    const observedSectionIds = [
      'home',
      'about',
      'features',
      'courses',
      'category-foundation',
      'category-advanced',
      'category-test-series',
      'category-resources',
      'testimonials',
      'faq',
      'contact',
      'free-calculators',
      'consultations'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -40% 0px', threshold: [0.15, 0.4] }
    );

    observedSectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Swipe-to-dismiss gesture on mobile touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    // Swiping right by more than 65px closes the drawer smoothly
    if (touchEnd - touchStart > 65) {
      handleClose();
    }
    setTouchStart(null);
  };

  // SECTION A: Primary Navigation
  const PRIMARY_NAV_ITEMS: NavItem[] = [
    {
      id: 'nav-home',
      nameEn: 'Home',
      nameHi: 'होम / मुख्य पृष्ठ',
      descEn: 'Platform landing & holistic overview',
      descHi: 'मुख्य परिचय व समग्र अवलोकन',
      targetId: 'home',
      icon: Home,
    },
    {
      id: 'nav-about',
      nameEn: 'About Us',
      nameHi: 'हमारे बारे में',
      descEn: 'Faculty, advisory lineage & research mission',
      descHi: 'संस्थापक, विशेषज्ञ व प्रामाणिक परंपरा',
      targetId: 'about',
      icon: Award,
      badge: { en: 'Lineage', hi: 'परंपरा' }
    },
    {
      id: 'nav-features',
      nameEn: 'Why Choose Us',
      nameHi: 'हमारी विशेषताएं',
      descEn: '0% Non-demolition & scientific KP validation',
      descHi: 'शून्य तोड़-फोड़ एवं वैज्ञानिक सिद्धांत',
      targetId: 'features',
      icon: ShieldCheck,
      badge: { en: '0% Demolition', hi: '0% तोड़-फोड़' }
    }
  ];

  // SECTION B: Courses & Categorized Specializations
  const COURSE_CATEGORIES: CourseCategoryItem[] = [
    {
      id: 'cat-foundation',
      nameEn: 'Foundation Programs',
      nameHi: 'बुनियादी / फाउंडेशन कोर्सेज',
      descEn: 'KP Cuspal Interlink & Astrological Core Fundamentals',
      descHi: 'केपी कस्पल इंटरलिंक्स एवं लग्न सिद्धांत',
      targetId: 'category-foundation',
      icon: Compass,
      badge: { en: 'Foundation', hi: 'फाउंडेशन' },
      tag: 'KP Sub-Lord Basics'
    },
    {
      id: 'cat-advanced',
      nameEn: 'Professional & Advanced Tracks',
      nameHi: 'प्रोफेशनल व एडवांस्ड ट्रैक',
      descEn: 'Industrial Spatial Vastu & High-Stakes Remedies',
      descHi: 'औद्योगिक स्थानिक वास्तु व सूक्ष्म ऊर्जा संतुलन',
      targetId: 'category-advanced',
      icon: Building2,
      badge: { en: 'Advanced', hi: 'एडवांस्ड' },
      tag: 'Industrial Mastery'
    },
    {
      id: 'cat-test-series',
      nameEn: 'Test Series & Practice Batches',
      nameHi: 'प्रैक्टिस बैच व कुंडली परीक्षण',
      descEn: '100+ Live Chart Case Audits & Assessment Certification',
      descHi: 'प्रत्यक्ष कुंडली परीक्षण व केस स्टडीज',
      targetId: 'category-test-series',
      icon: TrendingUp,
      badge: { en: 'Practice', hi: 'प्रैक्टिस' },
      tag: 'Live Case Audits'
    },
    {
      id: 'cat-resources',
      nameEn: 'Free Demo & Study Materials',
      nameHi: 'निःशुल्क डेमो व अध्ययन सामग्री',
      descEn: 'Astronomical Calculators, Panchang & Video Previews',
      descHi: 'कैलकुलेटर, नोट्स व परिचयात्मक वीडियो',
      targetId: 'category-resources',
      icon: BookOpen,
      badge: { en: 'Free Access', hi: 'मुफ्त' },
      tag: 'Free Tools'
    }
  ];

  // SECTION C: Trust & Support
  const SUPPORT_NAV_ITEMS: NavItem[] = [
    {
      id: 'nav-testimonials',
      nameEn: 'Student Reviews & Results',
      nameHi: 'छात्र समीक्षाएं व वास्तविक परिणाम',
      descEn: 'Documented field proof and student success stories',
      descHi: 'प्रमाणित परिणाम एवं केस स्टडीज',
      targetId: 'testimonials',
      icon: CheckCircle2,
      badge: { en: 'Verified', hi: 'सत्यापित' }
    },
    {
      id: 'nav-faq',
      nameEn: 'Frequently Asked Questions',
      nameHi: 'अक्सर पूछे जाने वाले प्रश्न',
      descEn: 'Clarifications on courses, remedies & pricing',
      descHi: 'कोर्स, फीस व परामर्श संबंधी समाधान',
      targetId: 'faq',
      icon: HelpCircle,
    },
    {
      id: 'nav-contact',
      nameEn: 'Contact Us / Enquire Now',
      nameHi: 'मुख्यालय से संपर्क व पूछताछ',
      descEn: 'Bhopal Headquarters & dedicated consultation helpline',
      descHi: 'मेपल हाई स्ट्रीट, भोपाल एवं हेल्पलाइन',
      targetId: 'contact',
      icon: MapPin,
      badge: { en: 'Support', hi: 'हेल्पलाइन' }
    }
  ];

  const handleNavigate = (targetId: string, actionType?: string, serviceType?: string) => {
    handleClose();

    if (actionType === 'copilot' && onOpenCopilot) {
      onOpenCopilot();
      return;
    }

    if (actionType === 'booking' && onOpenBooking) {
      onOpenBooking(serviceType || 'industrial');
      return;
    }

    if (targetId) {
      onScrollTo(targetId);
    }
  };

  // Filter items if user types in search box
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filterMatch = (en: string, hi: string, descEn?: string, descHi?: string) => {
    if (!normalizedQuery) return true;
    return (
      en.toLowerCase().includes(normalizedQuery) ||
      hi.toLowerCase().includes(normalizedQuery) ||
      (descEn && descEn.toLowerCase().includes(normalizedQuery)) ||
      (descHi && descHi.toLowerCase().includes(normalizedQuery))
    );
  };

  const filteredPrimary = PRIMARY_NAV_ITEMS.filter(item => 
    filterMatch(item.nameEn, item.nameHi, item.descEn, item.descHi)
  );

  const filteredCourses = COURSE_CATEGORIES.filter(item => 
    filterMatch(item.nameEn, item.nameHi, item.descEn, item.descHi)
  );

  const filteredSupport = SUPPORT_NAV_ITEMS.filter(item => 
    filterMatch(item.nameEn, item.nameHi, item.descEn, item.descHi)
  );

  return (
    <>
      {/* 1. RIGHT-SIDE FLOATING ACTION BUTTON (Executive Obsidian & Gold Theme) */}
      <aside 
        aria-label="Website Menu Trigger"
        className="fixed right-3.5 sm:right-6 bottom-20 sm:bottom-24 z-40 flex items-center justify-center animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={handleOpen}
          className="group relative min-h-[46px] min-w-[46px] px-3.5 py-2 rounded-full bg-slate-950/95 dark:bg-[#111827]/95 text-[#F3E5AB] font-extrabold shadow-xl shadow-amber-950/30 border border-[#D4AF37]/60 hover:border-[#D4AF37] hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer focus:outline-hidden backdrop-blur-md"
          aria-label={isHi ? "वेबसाइट मेनू खोलें" : "Open Website Menu"}
          aria-expanded={isOpen}
        >
          {/* Subtle Ambient Gold Glow Ring */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-[#D4AF37]/30 blur-xs group-hover:opacity-100 pointer-events-none" />

          <div className="relative flex items-center space-x-2">
            <Menu className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-xs font-black tracking-wider uppercase text-white dark:text-[#F3E5AB]">
              {isHi ? "मेनू" : "Menu"}
            </span>
          </div>

          {/* Desktop Hover Tooltip */}
          <span className="hidden md:group-hover:block absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-slate-900 text-[#F3E5AB] text-[11px] font-bold whitespace-nowrap shadow-xl border border-[#D4AF37]/40 pointer-events-none">
            {isHi ? "वेबसाइट मेनू खोलें" : "Open Website Menu"}
          </span>
        </button>
      </aside>

      {/* 2. SLIDE-OVER DRAWER & BACKDROP (Mobile & Desktop) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Vedic Wisdom Platform Navigation Drawer"
        >
          {/* Backdrop Tap-to-Dismiss */}
          <div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Drawer Container (Slides from Right with Touch-Swipe-to-Close) */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-[88vw] sm:w-[400px] max-w-[430px] h-full bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 z-10 shadow-2xl flex flex-col border-l-2 border-[#D4AF37]/40 animate-in slide-in-from-right duration-300 ease-out"
          >
            {/* Top Gold Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] shrink-0" />

            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-sm flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#B45309] p-0.5 shadow-sm">
                  <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                    <span className="font-cinzel text-xs font-black text-[#F3E5AB]">ॐ</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-extrabold text-slate-900 dark:text-white tracking-wide flex items-center gap-1.5">
                    VEDIC <span className="gold-gradient-text">WISDOM</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isHi ? "वेबसाइट एवं कोर्स नेविगेशन" : "Site & Courses Navigation"}
                  </p>
                </div>
              </div>

              {/* Close Button (44x44px minimum touch area) */}
              <button
                type="button"
                onClick={handleClose}
                className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center focus:outline-hidden"
                aria-label={isHi ? "मेनू बंद करें" : "Close menu"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Search Filter Input */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/50 shrink-0">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHi ? "कोर्स या सेक्शन खोजें..." : "Quick search courses or pages..."}
                  className="w-full min-h-[40px] pl-9 pr-8 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Action Pills: AI Copilot & Free Kundli Calculator */}
            <div className="p-2.5 bg-amber-500/10 border-b border-[#D4AF37]/20 flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  if (onOpenCopilot) onOpenCopilot();
                }}
                className="flex-1 min-h-[40px] px-2 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-[#D4AF37]/40 shadow-xs flex items-center justify-center space-x-1.5 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isHi ? "एआई कोपायलट" : "AI Copilot"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigate('free-calculators')}
                className="flex-1 min-h-[40px] px-2 py-1.5 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] text-slate-950 font-bold text-xs shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-slate-950" />
                <span>{isHi ? "कुंडली कैलकुलेटर" : "Free Kundli"}</span>
              </button>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-thin">
              
              {/* SECTION A: Primary Navigation */}
              {filteredPrimary.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{isHi ? "मुख्य नेविगेशन" : "Primary Navigation"}</span>
                    <span className="text-[10px] text-[#D4AF37] font-semibold">Core</span>
                  </div>

                  <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 shadow-xs p-1 space-y-0.5 overflow-hidden">
                    {filteredPrimary.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSectionId === item.targetId;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavigate(item.targetId, item.actionType, item.serviceType)}
                          className={`w-full min-h-[46px] p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                            isActive
                              ? 'bg-amber-500/15 text-[#B45309] dark:text-[#F3E5AB] font-black border-l-4 border-[#D4AF37]'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-semibold'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <div className={`p-1.5 rounded-lg border shrink-0 ${
                              isActive
                                ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[#D4AF37]'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold truncate">
                                {isHi ? item.nameHi : item.nameEn}
                              </div>
                              {item.descEn && (
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  {isHi ? item.descHi : item.descEn}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] text-[9px] font-bold border border-[#D4AF37]/30">
                                {isHi ? item.badge.hi : item.badge.en}
                              </span>
                            )}
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION B: Courses & Categorized Specializations (Accordion) */}
              {(filteredCourses.length > 0 || !searchQuery) && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{isHi ? "पाठ्यक्रम एवं विशेषज्ञता" : "Courses & Specializations"}</span>
                    <button
                      type="button"
                      onClick={() => handleNavigate('courses')}
                      className="text-[10px] text-[#B45309] dark:text-[#F3E5AB] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{isHi ? "सभी देखें" : "View All"}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 shadow-xs overflow-hidden">
                    {/* Courses Master Header & Accordion Toggle */}
                    <button
                      type="button"
                      onClick={() => setIsCoursesAccordionOpen(!isCoursesAccordionOpen)}
                      className="w-full min-h-[46px] px-3.5 py-2.5 bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/10 to-transparent flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className="p-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#B45309] dark:text-[#F3E5AB]">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
                            {isHi ? "अकादमी कोर्स श्रेणियां" : "Academy Course Tracks"}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {isHi ? "4 मुख्य विषय श्रेणियां" : "4 Specialization tracks"}
                          </div>
                        </div>
                      </div>
                      
                      {isCoursesAccordionOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {/* Expandable Course Category Items */}
                    {isCoursesAccordionOpen && (
                      <div className="p-1.5 space-y-1">
                        {filteredCourses.map((cat) => {
                          const Icon = cat.icon;
                          const isActive = activeSectionId === cat.targetId;

                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => handleNavigate(cat.targetId)}
                              className={`w-full min-h-[48px] p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                                isActive
                                  ? 'bg-amber-500/15 text-[#B45309] dark:text-[#F3E5AB] font-black border-l-4 border-[#D4AF37]'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                <div className={`p-1.5 rounded-lg border shrink-0 ${
                                  isActive
                                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[#D4AF37]'
                                }`}>
                                  <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold truncate">
                                    {isHi ? cat.nameHi : cat.nameEn}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                    {isHi ? cat.descHi : cat.descEn}
                                  </div>
                                </div>
                              </div>

                              <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] text-[9px] font-bold border border-[#D4AF37]/30 shrink-0">
                                {isHi ? cat.badge.hi : cat.badge.en}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION C: Trust & Support */}
              {filteredSupport.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>{isHi ? "सत्यापन एवं सहायता" : "Trust & Support"}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Helpdesk</span>
                  </div>

                  <div className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 shadow-xs p-1 space-y-0.5 overflow-hidden">
                    {filteredSupport.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSectionId === item.targetId;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleNavigate(item.targetId, item.actionType, item.serviceType)}
                          className={`w-full min-h-[46px] p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                            isActive
                              ? 'bg-amber-500/15 text-[#B45309] dark:text-[#F3E5AB] font-black border-l-4 border-[#D4AF37]'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-semibold'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <div className={`p-1.5 rounded-lg border shrink-0 ${
                              isActive
                                ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[#D4AF37]'
                            }`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold truncate">
                                {isHi ? item.nameHi : item.nameEn}
                              </div>
                              {item.descEn && (
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                  {isHi ? item.descHi : item.descEn}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 shrink-0">
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] text-[9px] font-bold border border-[#D4AF37]/30">
                                {isHi ? item.badge.hi : item.badge.en}
                              </span>
                            )}
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* No Search Results Fallback */}
              {filteredPrimary.length === 0 && filteredCourses.length === 0 && filteredSupport.length === 0 && (
                <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
                  <p className="font-bold">{isHi ? "कोई परिणाम नहीं मिला" : "No matching sections found"}</p>
                  <p className="text-[11px] mt-1">{isHi ? "कृपया अन्य शब्द खोजें" : "Try searching another keyword"}</p>
                </div>
              )}

            </div>

            {/* SECTION D: Direct Action Buttons (Pinned to Drawer Footer) */}
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md space-y-2.5 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              
              {/* Direct Instant Conversion Dual Buttons: Call Now & WhatsApp Inquiry */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+919009448601"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#F3E5AB] font-bold text-xs shadow-md border border-[#D4AF37]/50 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  title="Direct Phone Call"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isHi ? "कॉल करें" : "Call Now"}</span>
                </a>

                <a
                  href="https://wa.me/919009448601?text=Namaste%20Sandeep%20Ji%2C%20I%20am%20browsing%20Vedic%20Wisdom%20and%20would%20like%20to%20inquire%20about%20courses%20and%20consultations."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  title="WhatsApp Inquiry"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isHi ? "व्हाट्सएप" : "WhatsApp"}</span>
                </a>
              </div>

              {/* Language & Theme Controls Row */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                {/* Language Switcher */}
                <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`flex-1 min-h-[38px] text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      currentLang === 'en'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => onLanguageChange('hi')}
                    className={`flex-1 min-h-[38px] text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      currentLang === 'hi'
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    हिंदी
                  </button>
                </div>

                {/* Day / Night Theme Toggle */}
                <button
                  type="button"
                  onClick={onThemeToggle}
                  className="min-h-[38px] min-w-[42px] px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-1 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                  aria-label="Toggle theme"
                  title={currentTheme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                >
                  {currentTheme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-500" />
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
