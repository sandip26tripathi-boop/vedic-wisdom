import React, { useState } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { CourseSyllabusModal } from './courses/CourseSyllabusModal.tsx';
import { 
  GraduationCap, 
  Clock, 
  UserCheck, 
  Award, 
  BookOpen, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Compass, 
  Layers, 
  ShoppingBag 
} from 'lucide-react';

interface AcademyDirectoryProps {
  currentLang: Language;
  onOpenEnroll: (courseId: string) => void;
}

export const AcademyDirectory: React.FC<AcademyDirectoryProps> = ({
  currentLang,
  onOpenEnroll,
}) => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'astrology' | 'vastu' | 'numerology'>('all');
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string | null>(null);
  const t = translations[currentLang];
  const c = t.academy.courses;

  const courses = [
    {
      id: 'kpMastery',
      category: 'astrology',
      title: c.kpMastery.title,
      badge: c.kpMastery.badge,
      level: c.kpMastery.level,
      duration: c.kpMastery.duration,
      instructor: c.kpMastery.instructor,
      format: c.kpMastery.format,
      tokenFee: c.kpMastery.tokenFee,
      highlights: c.kpMastery.highlights,
      tierBoxes: null,
      accent: 'border-[#D4AF37]/50 hover:border-[#D4AF37]'
    },
    {
      id: 'bnn',
      category: 'astrology',
      title: c.bnn.title,
      badge: c.bnn.badge,
      level: c.bnn.level,
      duration: c.bnn.duration,
      instructor: c.bnn.instructor,
      format: c.bnn.format,
      tokenFee: c.bnn.tokenFee,
      highlights: c.bnn.highlights,
      tierBoxes: null,
      accent: 'border-amber-500/40 hover:border-amber-500'
    },
    {
      id: 'jaimini',
      category: 'astrology',
      title: c.jaimini.title,
      badge: c.jaimini.badge,
      level: c.jaimini.level,
      duration: c.jaimini.duration,
      instructor: c.jaimini.instructor,
      format: c.jaimini.format,
      tokenFee: c.jaimini.tokenFee,
      highlights: c.jaimini.highlights,
      tierBoxes: null,
      accent: 'border-purple-500/40 hover:border-purple-500'
    },
    {
      id: 'vastuMastery',
      category: 'vastu',
      title: c.vastuMastery.title,
      badge: c.vastuMastery.badge,
      level: c.vastuMastery.level,
      duration: c.vastuMastery.duration,
      instructor: c.vastuMastery.instructor,
      format: c.vastuMastery.format,
      tokenFee: c.vastuMastery.tokenFee,
      tierBoxes: c.vastuMastery.tierBoxes,
      highlights: c.vastuMastery.highlights,
      accent: 'border-amber-500/60 hover:border-[#D4AF37] ring-1 ring-[#D4AF37]/30'
    },
    {
      id: 'astroVastuCert',
      category: 'vastu',
      title: c.astroVastuCert.title,
      badge: c.astroVastuCert.badge,
      level: c.astroVastuCert.level,
      duration: c.astroVastuCert.duration,
      instructor: c.astroVastuCert.instructor,
      format: c.astroVastuCert.format,
      tokenFee: c.astroVastuCert.tokenFee,
      highlights: c.astroVastuCert.highlights,
      tierBoxes: null,
      accent: 'border-emerald-500/50 hover:border-emerald-400'
    },
    {
      id: 'numerology',
      category: 'numerology',
      title: c.numerology.title,
      badge: c.numerology.badge,
      level: c.numerology.level,
      duration: c.numerology.duration,
      instructor: c.numerology.instructor,
      format: c.numerology.format,
      tokenFee: c.numerology.tokenFee,
      highlights: c.numerology.highlights,
      tierBoxes: null,
      accent: 'border-sky-500/40 hover:border-sky-400'
    }
  ];

  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter(course => course.category === activeTab);

  return (
    <section id="academy" className="py-20 bg-slate-50 dark:bg-[#0F172A] border-y border-[#D4AF37]/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
            <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            <span>{t.academy.sectionBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.academy.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.academy.subtitle}
          </p>

          {/* Directory Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.academy.tabs.all}
            </button>
            <button
              onClick={() => setActiveTab('astrology')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'astrology'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.academy.tabs.astrology}
            </button>
            <button
              onClick={() => setActiveTab('vastu')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'vastu'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.academy.tabs.vastu}
            </button>
            <button
              onClick={() => setActiveTab('numerology')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'numerology'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.academy.tabs.numerology}
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#111827] border ${course.accent} shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                
                {/* Course Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                    {course.badge}
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>{t.academy.certificationBadge}</span>
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {course.title}
                </h3>

                {/* Meta details: Level, Duration, Mentor */}
                <div className="space-y-1.5 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.academy.level}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      {t.academy.duration}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-emerald-500" />
                      {t.academy.instructor}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{course.instructor}</span>
                  </div>
                </div>

                {/* Dedicated 4-Tier Modules Box (Basic, Advance, Professional, Industrial) */}
                {course.tierBoxes && (
                  <div className="mb-5 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-[#D4AF37]/40">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] dark:text-[#F3E5AB] mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{currentLang === 'en' ? '4 Complete Mastery Tiers:' : '4-स्तरीय संपूर्ण मॉड्यूल:'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {course.tierBoxes.map((tier: any, tIdx: number) => (
                        <div key={tIdx} className="p-2 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                          <span className="font-bold text-[#B45309] dark:text-[#F3E5AB] text-[11px]">
                            {tier.level}
                          </span>
                          <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                            {tier.focus}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Curriculum Highlights */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t.academy.curriculum}
                  </div>
                  {course.highlights.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Actions and Token Reservation */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{t.academy.tokenFeeLabel}</span>
                  <span className="font-mono font-bold text-base text-[#B45309] dark:text-[#F3E5AB]">
                    {course.tokenFee}
                  </span>
                </div>

                {/* Quick 60-Second Syllabus Overview Button (Module 2) */}
                <button
                  type="button"
                  onClick={() => setSelectedSyllabusId(course.id)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-[#B45309] dark:text-[#F3E5AB] bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Curriculum Overview (60s Quick Syllabus)</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenEnroll(course.id)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-sm transition-all cursor-pointer"
                  >
                    <span>{t.academy.enrollBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart({
                      id: course.id,
                      title: course.title,
                      category: 'Academy Certification',
                      price: course.id === 'kpMastery' ? 14999 : course.id === 'astroVastuCert' ? 18500 : 7999,
                      turnaround: course.duration,
                      badge: course.badge
                    })}
                    className="p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] transition-colors cursor-pointer"
                    title={currentLang === 'en' ? 'Add Course to Cart' : 'कोर्स कार्ट में जोड़ें'}
                    aria-label="Add Course to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSyllabusId(course.id)}
                    className="px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
                    title="View Syllabus"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Academy Research Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#111827] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/15">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h4 className="font-cinzel font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                {currentLang === 'en' 
                  ? 'Official Certification & Direct Mentorship' 
                  : 'आधिकारिक संस्थागत सर्टिफिकेशन एवं प्रत्यक्ष मार्गदर्शन'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentLang === 'en'
                  ? 'Graduates gain lifetime access to private research updates, software discounts, and real-case auditing masterminds.'
                  : 'उत्तीर्ण विद्यार्थियों को शोध अपडेट्स, वास्तु सॉफ्टवेयर एवं केस स्टडीज का आजीवन एक्सेस प्रदान किया जाता है।'}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919009448601?text=Hello%20Vedic%20Wisdom%2C%20I%20want%20to%20know%20upcoming%20batch%20dates%20for%20Academy%20Courses"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-900 bg-gradient-to-r from-[#F3E5AB] to-[#D4AF37] hover:brightness-105 transition-all shadow-sm"
          >
            {currentLang === 'en' ? 'Check Next Batch Dates' : 'अगले बैच की तिथि जानें'}
          </a>
        </div>

      </div>

      {/* 60-Second Academy Course Syllabus Modal (Module 2) */}
      <CourseSyllabusModal
        courseId={selectedSyllabusId || 'kpMastery'}
        isOpen={!!selectedSyllabusId}
        onClose={() => setSelectedSyllabusId(null)}
        onOpenEnroll={(id) => {
          setSelectedSyllabusId(null);
          onOpenEnroll(id);
        }}
        currentLang={currentLang}
      />
    </section>
  );
};
