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
  Sun, 
  Moon,
  Layers,
  LayoutGrid,
  TrendingUp,
  Flame,
  Calendar,
  Zap,
  PhoneCall,
  MapPin,
  Bot,
  Factory,
  Home,
  CheckCircle2,
  BookOpen
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
}

interface CategoryItem {
  id: string;
  nameEn: string;
  nameHi: string;
  descEn: string;
  descHi: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId?: string;
  badge?: { en: string; hi: string };
  actionType?: 'scroll' | 'copilot' | 'report' | 'booking';
  serviceType?: string;
}

interface CategoryGroup {
  id: string;
  groupEn: string;
  groupHi: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: CategoryItem[];
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
}) => {
  const isHi = currentLang === 'hi';
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

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

  // Categories grounded strictly in the website architecture
  const CATEGORY_GROUPS: CategoryGroup[] = [
    {
      id: 'astrology',
      groupEn: 'Vedic & KP Astrology',
      groupHi: 'वैदिक एवं केपी ज्योतिष',
      icon: Sparkles,
      color: 'text-amber-500',
      items: [
        {
          id: 'kundli-calc',
          nameEn: 'Janam Kundli Calculator',
          nameHi: 'जन्मपत्री एवं लग्न कुंडली',
          descEn: 'Instant astronomical Lagna, Moon Sign & Nakshatra',
          descHi: 'सटीक लग्न, चंद्र राशि एवं नक्षत्र गणना',
          icon: Compass,
          targetId: 'free-calculators',
          badge: { en: 'Free Tool', hi: 'निःशुल्क' }
        },
        {
          id: 'astro-consult',
          nameEn: 'KP Cuspal Consultations',
          nameHi: 'केपी कस्पल इंटरलिंक परामर्श',
          descEn: 'Career, Finance, Marriage & High-stakes timing',
          descHi: 'करियर, विवाह व व्यवसाय का सूक्ष्म विश्लेषण',
          icon: TrendingUp,
          targetId: 'consultations',
          badge: { en: '1-on-1', hi: 'परामर्श' }
        },
        {
          id: 'digital-reports',
          nameEn: 'Instant Digital Reports',
          nameHi: 'डिजिटल जन्मपत्री रिपोर्ट्स',
          descEn: 'Automated 24-page analytical dossiers with instant download',
          descHi: '24-पृष्ठ की विस्तृत डिजिटल रिपोर्ट डाउनलोड करें',
          icon: FileText,
          targetId: 'digital-reports',
          badge: { en: 'Instant PDF', hi: 'पीडीएफ' }
        },
        {
          id: 'kp-academy',
          nameEn: 'KP Astrology Course',
          nameHi: 'केपी ज्योतिष प्रशिक्षण',
          descEn: 'Comprehensive Cuspal Sub-Sub Lord mastery',
          descHi: 'संदीप त्रिपाठी जी द्वारा प्रमाणिक केपी कोर्स',
          icon: GraduationCap,
          targetId: 'academy',
          badge: { en: 'Certified', hi: 'सर्टिफाइड' }
        }
      ]
    },
    {
      id: 'vastu',
      groupEn: 'Spatial & Industrial Vastu',
      groupHi: 'स्थानिक एवं औद्योगिक वास्तु',
      icon: Building2,
      color: 'text-emerald-500',
      items: [
        {
          id: 'vastu-services',
          nameEn: '0% Non-Demolition Vastu',
          nameHi: 'शून्य तोड़-फोड़ ऊर्जा वास्तु',
          descEn: 'Elemental metallic strips & pyramid frequency tuning',
          descHi: 'बिना दीवार तोड़े तांबा/पीतल धातु पट्टियों से उपचार',
          icon: ShieldCheck,
          targetId: 'services',
          badge: { en: '0% Demolition', hi: '0% तोड़-फोड़' }
        },
        {
          id: 'cad-intake',
          nameEn: '4-Step Layout Intake',
          nameHi: 'फ़्लोर प्लान व लेआउट समीक्षा',
          descEn: 'Submit your architectural CAD or sketch for audit',
          descHi: 'अपने फ्लैट या फैक्ट्री का नक्शा समीक्षा हेतु भेजें',
          icon: Layers,
          targetId: 'floor-plan-intake',
          badge: { en: 'CAD Review', hi: 'नक्शा रिव्यू' }
        },
        {
          id: 'factory-audit',
          nameEn: 'Commercial & Factory Audits',
          nameHi: 'औद्योगिक व फैक्ट्री ऑडिट',
          descEn: 'Machinery stabilization & geopathic stress clearing',
          descHi: 'भारी मशीनरी स्थिरीकरण व जियोपैथिक स्ट्रेस मुक्ति',
          icon: Factory,
          targetId: 'consultations'
        },
        {
          id: 'compass-tool',
          nameEn: '16-Zone Digital Compass',
          nameHi: '16-जोन लाइव वास्तु कम्पास',
          descEn: 'Calibrate cardinal degrees and inspect Devta zones',
          descHi: 'सटीक डिग्री व 16 दिशाओं का तात्कालिक परीक्षण',
          icon: Compass,
          targetId: 'free-calculators'
        }
      ]
    },
    {
      id: 'numerology',
      groupEn: 'Numerology & Panchang',
      groupHi: 'अंकज्योतिष व पंचांग / मुहूर्त',
      icon: Calendar,
      color: 'text-sky-500',
      items: [
        {
          id: 'live-panchang',
          nameEn: 'Live Panchang & Choghadiya',
          nameHi: 'दैनिक पंचांग व चौघड़िया',
          descEn: 'Real-time auspicious Muhurta windows (Amrit, Shubh, Labh)',
          descHi: 'अमृत, शुभ, लाभ आदि कल्याणकारी मुहूर्तों की सूची',
          icon: Calendar,
          targetId: 'free-calculators',
          badge: { en: 'Real-Time', hi: 'लाइव' }
        },
        {
          id: 'rahu-kaal',
          nameEn: 'Rahu Kaal & Planetary Hora',
          nameHi: 'राहुकाल व ग्रह होरा चक्र',
          descEn: 'Astronomical caution windows for contracts and travel',
          descHi: 'महत्वपूर्ण अनुबंधों व यात्रा हेतु वर्जित समय',
          icon: Calculator,
          targetId: 'free-calculators'
        }
      ]
    },
    {
      id: 'ai-copilot',
      groupEn: 'Gemini AI Research Engine',
      groupHi: 'जेमिनी एआई विश्लेषक',
      icon: Bot,
      color: 'text-[#D4AF37]',
      items: [
        {
          id: 'gemini-prompt',
          nameEn: 'Ask Vedic Gemini AI',
          nameHi: 'जेमिनी एआई से प्रश्न पूछें',
          descEn: 'Ask any question on layout defects or KP planetary timing',
          descHi: 'फैक्ट्री, फ्लैट या कुंडली का प्रश्न लिखकर तुरंत उत्तर पाएं',
          icon: Sparkles,
          targetId: 'gemini-ai-prompt',
          badge: { en: 'Gemini 2.5', hi: 'एआई' }
        },
        {
          id: 'astro-copilot-modal',
          nameEn: 'Launch AstroCopilot Modal',
          nameHi: 'एस्ट्रो-कोपायलट सहायक खोलें',
          descEn: 'Interactive AI dialog grounded in Sandeep Tripathi research',
          descHi: 'केपी एवं वास्तु सिद्धांतों पर आधारित संवाद सहायक',
          icon: Bot,
          actionType: 'copilot',
          badge: { en: 'Interactive', hi: 'संवाद' }
        }
      ]
    },
    {
      id: 'packages',
      groupEn: 'Services & Consultation Pricing',
      groupHi: 'सेवाएं व परामर्श शुल्क',
      icon: Award,
      color: 'text-amber-600',
      items: [
        {
          id: 'spatial-services',
          nameEn: 'Property-Specific Services',
          nameHi: 'संपत्ति अनुसार सेवाएं',
          descEn: 'Flat, Villa, Commercial, Factory & Kundli services',
          descHi: 'फ्लैट, विला, प्लॉट, ऑफिस व फैक्ट्री विशिष्ट समाधान',
          icon: Home,
          targetId: 'services'
        },
        {
          id: 'tiered-pricing',
          nameEn: 'Tiered Pricing Architecture',
          nameHi: 'परामर्श पैकेज व शुल्क',
          descEn: 'Tier 1 to 3 packages with SLA turnarounds & reports',
          descHi: 'पारदर्शी शुल्क संरचना एवं लिखित प्रतिवेदन',
          icon: Award,
          targetId: 'pricing',
          badge: { en: 'Transparent', hi: 'पारदर्शी' }
        },
        {
          id: 'book-now',
          nameEn: 'Book 1-on-1 Consultation',
          nameHi: 'विशेषज्ञ परामर्श बुक करें',
          descEn: 'Direct appointment with Sandeep K. Tripathi & team',
          descHi: 'संदीप त्रिपाठी जी से प्रत्यक्ष परामर्श समय आरक्षित करें',
          icon: PhoneCall,
          actionType: 'booking',
          serviceType: 'industrial',
          badge: { en: 'Book', hi: 'बुकिंग' }
        }
      ]
    },
    {
      id: 'knowledge',
      groupEn: 'Trust, Lineage & Support',
      groupHi: 'अकादमी, केस स्टडीज व संपर्क',
      icon: BookOpen,
      color: 'text-indigo-500',
      items: [
        {
          id: 'leadership',
          nameEn: 'Advisory Board & Founders',
          nameHi: 'मार्गदर्शक एवं संस्थापक',
          descEn: 'Pt. Ravindra Pathak & Master Sandeep K. Tripathi',
          descHi: 'पंडित रवींद्र पाठक एवं संदीप के. त्रिपाठी जी का परिचय',
          icon: Award,
          targetId: 'leadership'
        },
        {
          id: 'case-studies',
          nameEn: 'Industrial Case Studies',
          nameHi: 'सफल औद्योगिक केस स्टडीज',
          descEn: 'Documented field proof of factory turnarounds',
          descHi: 'फैक्ट्री एवं व्यावसायिक स्थलों के प्रमाणित परिणाम',
          icon: CheckCircle2,
          targetId: 'case-studies',
          badge: { en: 'Verified', hi: 'सत्यापित' }
        },
        {
          id: 'research-blog',
          nameEn: 'Vedic Research Journal',
          nameHi: 'वैदिक शोध पत्रिका व ब्लॉग',
          descEn: 'In-depth articles on spatial energy & Cuspal Interlinks',
          descHi: 'स्थानिक ऊर्जा व कस्पल इंटरलिंक्स पर विस्तृत लेख',
          icon: BookOpen,
          targetId: 'blog'
        },
        {
          id: 'faq-section',
          nameEn: 'Frequently Asked Questions',
          nameHi: 'अक्सर पूछे जाने वाले प्रश्न',
          descEn: 'Clarifications on remedies, online audits & pricing',
          descHi: 'ऑनलाइन परामर्श व उपायों से संबंधित सभी समाधान',
          icon: HelpCircle,
          targetId: 'faq'
        },
        {
          id: 'contact-hq',
          nameEn: 'Contact Bhopal Headquarters',
          nameHi: 'भोपाल मुख्यालय से संपर्क',
          descEn: 'Maple High Street, Bhopal, MP (Hotline +91 90094 48601)',
          descHi: 'मेपल हाई स्ट्रीट, भोपाल एवं हेल्पलाइन नंबर',
          icon: MapPin,
          targetId: 'contact'
        }
      ]
    }
  ];

  const handleItemClick = (item: CategoryItem) => {
    setIsOpen(false);

    if (item.actionType === 'copilot' && onOpenCopilot) {
      onOpenCopilot();
      return;
    }

    if (item.actionType === 'booking' && onOpenBooking) {
      onOpenBooking(item.serviceType || 'industrial');
      return;
    }

    if (item.targetId) {
      onScrollTo(item.targetId);
    }
  };

  return (
    <>
      {/* 1. RIGHT-SIDE FLOATING ACTION BUTTON (Mobile Only) */}
      <aside 
        aria-label="Mobile Category Menu Trigger"
        className="fixed right-3.5 bottom-20 sm:bottom-22 z-40 md:hidden flex items-center justify-center animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative min-h-[48px] min-w-[48px] px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] text-slate-950 font-extrabold shadow-xl shadow-[#D4AF37]/35 border-2 border-amber-200 hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#D4AF37]/50"
          aria-label={isHi ? "विषय श्रेणियां मेनू खोलें" : "Open Vedic Category Menu"}
          aria-expanded={isOpen}
        >
          {/* Subtle Ambient Glow Ring */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-[#D4AF37] opacity-60 blur-xs group-hover:opacity-100 animate-pulse pointer-events-none" />

          <div className="relative flex items-center space-x-1.5">
            <LayoutGrid className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="text-[11px] font-black tracking-wide uppercase">
              {isHi ? "श्रेणियां" : "Menu"}
            </span>
          </div>
        </button>
      </aside>

      {/* 2. SLIDE-OVER DRAWER & BACKDROP */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Vedic Categories Slide-Over Menu"
        >
          {/* Backdrop Tap-to-Dismiss */}
          <div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container (Slides from Right) */}
          <div 
            className="relative w-[86vw] max-w-[340px] h-full bg-[#FAF9F6] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 z-10 shadow-2xl flex flex-col border-l-2 border-[#D4AF37]/40 animate-in slide-in-from-right duration-300 ease-out"
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
                  <h3 className="font-cinzel text-sm font-extrabold text-slate-900 dark:text-white tracking-wide">
                    VEDIC WISDOM
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {isHi ? "मुख्य विषय श्रेणियां" : "Platform Category Directory"}
                  </p>
                </div>
              </div>

              {/* Close Button (44x44px minimum touch area) */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] min-w-[44px] p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-center"
                aria-label={isHi ? "मेनू बंद करें" : "Close menu"}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Pills: Astrocopilot & Free Kundli */}
            <div className="p-3 bg-amber-500/10 border-b border-[#D4AF37]/20 flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenCopilot) onOpenCopilot();
                }}
                className="flex-1 min-h-[40px] px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-[#D4AF37]/40 shadow-xs flex items-center justify-center space-x-1.5 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isHi ? "एआई कोपायलट" : "AI Copilot"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onScrollTo('free-calculators');
                }}
                className="flex-1 min-h-[40px] px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] text-slate-950 font-bold text-xs shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-slate-950" />
                <span>{isHi ? "कुंडली कैलकुलेटर" : "Free Kundli"}</span>
              </button>
            </div>

            {/* Category Groups Accordion / List (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3.5 scrollbar-thin">
              {CATEGORY_GROUPS.map((group) => {
                const GroupIcon = group.icon;
                const isExpanded = activeGroup === group.id || activeGroup === null;

                return (
                  <div 
                    key={group.id}
                    className="rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 shadow-xs overflow-hidden"
                  >
                    {/* Category Group Header */}
                    <button
                      type="button"
                      onClick={() => setActiveGroup(activeGroup === group.id ? null : group.id)}
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <GroupIcon className={`w-4 h-4 ${group.color}`} />
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                          {isHi ? group.groupHi : group.groupEn}
                        </span>
                      </div>
                      <ChevronRight 
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90 text-[#D4AF37]' : ''
                        }`} 
                      />
                    </button>

                    {/* Category Items List */}
                    {isExpanded && (
                      <div className="p-1.5 space-y-1">
                        {group.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleItemClick(item)}
                              className="w-full min-h-[46px] p-2.5 rounded-xl hover:bg-[#FAF9F6] dark:hover:bg-slate-800/70 active:bg-amber-500/10 text-left transition-colors flex items-center justify-between gap-2.5 cursor-pointer group"
                            >
                              <div className="flex items-center space-x-2.5 min-w-0">
                                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-[#D4AF37] group-hover:scale-105 transition-transform shrink-0">
                                  <ItemIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#B45309] dark:group-hover:text-[#F3E5AB] transition-colors truncate">
                                    {isHi ? item.nameHi : item.nameEn}
                                  </div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[190px]">
                                    {isHi ? item.descHi : item.descEn}
                                  </div>
                                </div>
                              </div>

                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] text-[9px] font-bold shrink-0 border border-[#D4AF37]/30">
                                  {isHi ? item.badge.hi : item.badge.en}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer Controls (Language, Theme & Direct WhatsApp) */}
            <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md space-y-2.5 shrink-0">
              
              {/* Language & Theme Controls Row (44px min-height buttons) */}
              <div className="flex items-center justify-between gap-2">
                
                {/* Language Switcher */}
                <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`flex-1 min-h-[44px] text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center ${
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
                    className={`flex-1 min-h-[44px] text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center ${
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
                  className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center space-x-1 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                  aria-label="Toggle theme"
                  title={currentTheme === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
                >
                  {currentTheme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span className="text-[11px] font-bold">Day</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-indigo-500" />
                      <span className="text-[11px] font-bold">Night</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Consultation Hotline */}
              <a
                href="https://wa.me/919009448601?text=Namaste%20Sandeep%20Ji%2C%20I%20am%20browsing%20Vedic%20Wisdom%20and%20would%20like%20to%20inquire%20about%20a%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs shadow-md shadow-emerald-900/20 flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isHi ? "सीधा व्हाट्सएप परामर्श (+91 90094 48601)" : "Direct WhatsApp Help (+91 90094 48601)"}</span>
              </a>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
