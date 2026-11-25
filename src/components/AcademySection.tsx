'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ACADEMY_COURSES } from '@/data/academy';
import { AcademyCourse } from '@/types';
import { 
  GraduationCap, BookOpen, Video, Award, Star, Users, Calendar, ArrowRight, X, CheckCircle 
} from 'lucide-react';

export default function AcademySection() {
  const { t, language, formatPrice } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse | null>(null);

  const handleEnroll = (course: AcademyCourse) => {
    const text = encodeURIComponent(`*ENROLLMENT INQUIRY — VEDIC WISDOM ACADEMY*
----------------------------------------
*Course Name:* ${course.title}
*Price:* ${formatPrice(course.priceINR, course.priceUSD)}
*Next Cohort Batch:* ${course.nextBatch}
*Mode:* Live Interactive Zoom + LMS Access

Hello Sandeep Sir, I would like to enroll in this upcoming batch. Please share payment and batch details.
----------------------------------------`);
    window.open(`https://wa.me/919009448601?text=${text}`, '_blank');
  };

  return (
    <section id="academy" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <GraduationCap className="w-4 h-4" />
            <span>{t.academy.title}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t.academy.tagline}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.academy.subtitle}
          </p>
        </div>

        {/* 4 Courses Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl border p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div>
                {/* Top Badge & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {language === 'en' ? course.level : course.levelHindi}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                    <span className="text-stone-400">({course.studentsEnrolled} students)</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {language === 'en' ? course.title : course.titleHindi}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {language === 'en' ? course.description : course.descriptionHindi}
                </p>

                {/* Course Metadata Strip */}
                <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border flex items-center space-x-2" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}>
                    <Video className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span className="truncate">{language === 'en' ? course.duration : course.durationHindi}</span>
                  </div>
                  <div className="p-3 rounded-xl border flex items-center space-x-2" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}>
                    <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{language === 'en' ? course.certification : course.certificationHindi}</span>
                  </div>
                </div>

                {/* Batch Announcement */}
                <div className="mt-4 flex items-center space-x-2 text-xs font-semibold text-amber-700 dark:text-amber-400">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{course.nextBatch}</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="mt-8 pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <span className="text-[11px] text-stone-400 block font-medium">
                    {language === 'en' ? 'Full Certification Fee:' : 'संपूर्ण प्रमाणन शुल्क:'}
                  </span>
                  <span className="font-serif text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                    {formatPrice(course.priceINR, course.priceUSD)}
                  </span>
                </div>

                <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    {t.academy.syllabusBtn}
                  </button>

                  <button
                    onClick={() => handleEnroll(course)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow"
                  >
                    {t.academy.enrollBtn}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Syllabus Breakdown Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border p-6 sm:p-8 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--gold-primary)',
                color: 'var(--text-main)'
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <h3 className="font-serif text-xl font-bold">
                    {language === 'en' ? selectedCourse.title : selectedCourse.titleHindi}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {language === 'en' ? selectedCourse.duration : selectedCourse.durationHindi} | {formatPrice(selectedCourse.priceINR, selectedCourse.priceUSD)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="py-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {language === 'en' ? 'Comprehensive Module-by-Module Curriculum' : 'सप्ताह-वार संपूर्ण पाठ्यक्रम विवरण'}
                </h4>

                {selectedCourse.modules.map((mod, i) => (
                  <div key={i} className="p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                      <span>{mod.week}</span>
                      <span className="font-serif text-stone-900 dark:text-stone-100 font-bold">{language === 'en' ? mod.title : mod.titleHindi}</span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                      {mod.topics.map((top, j) => (
                        <li key={j} className="flex items-center space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{top}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  onClick={() => {
                    const c = selectedCourse;
                    setSelectedCourse(null);
                    handleEnroll(c);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 shadow"
                >
                  {language === 'en' ? 'Confirm Seat via WhatsApp' : 'व्हाट्सएप पर सीट आरक्षित करें'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
