import React, { useState } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { X, GraduationCap, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  currentLang: Language;
}

export const CourseEnrollModal: React.FC<CourseEnrollModalProps> = ({
  isOpen,
  onClose,
  courseId,
  currentLang,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [priorExperience, setPriorExperience] = useState('beginner');

  if (!isOpen) return null;

  const t = translations[currentLang];
  const em = t.enrollModal;
  const course = (t.academy.courses as any)[courseId] || t.academy.courses.kpMastery;

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) {
      alert(currentLang === 'en' ? 'Please provide your name and WhatsApp number.' : 'कृपया नाम और व्हाट्सएप नंबर दर्ज करें।');
      return;
    }

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const text = `*New Academy Seat Reservation - Vedic Wisdom*\n\n` +
      `*Course:* ${course.title}\n` +
      `*Student Name:* ${studentName}\n` +
      `*WhatsApp Phone:* ${studentPhone}\n` +
      `*Email:* ${studentEmail || 'N/A'}\n` +
      `*Experience Level:* ${priorExperience}\n` +
      `*Reservation Token:* ${course.tokenFee}\n\n` +
      `Please provide batch schedule and onboarding access.`;

    setTimeout(() => {
      window.open(`https://wa.me/919009448601?text=${encodeURIComponent(text)}`, '_blank');
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB] mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{course.badge}</span>
          </div>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {course.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {em.subtitle}
          </p>
        </div>

        {/* Course Highlights & Token Fee */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">{t.academy.duration}</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{course.duration}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">{t.academy.instructor}</span>
            <span className="font-bold text-[#B45309] dark:text-[#D4AF37]">{course.instructor}</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200 dark:border-slate-700">
            <span className="text-slate-500 font-semibold">{em.tokenLabel}</span>
            <span className="font-mono text-base font-extrabold text-[#B45309] dark:text-[#F3E5AB]">{course.tokenFee}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleEnrollSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {currentLang === 'en' ? 'Full Name *' : 'पूरा नाम *'}
              </label>
              <input
                type="text"
                required
                placeholder="Dr. / Er. / Pt."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {currentLang === 'en' ? 'WhatsApp Number *' : 'व्हाट्सएप नंबर *'}
              </label>
              <input
                type="tel"
                required
                placeholder="+91 90094 48601"
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {currentLang === 'en' ? 'Email Address' : 'ईमेल पता'}
            </label>
            <input
              type="email"
              placeholder="scholar@domain.com"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {currentLang === 'en' ? 'Astrology / Vastu Background' : 'पूर्व ज्योतिष या वास्तु अनुभव'}
            </label>
            <select
              value={priorExperience}
              onChange={(e) => setPriorExperience(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="beginner">{currentLang === 'en' ? 'Beginner / Curious Seeker' : 'शुरुआती जिज्ञासु'}</option>
              <option value="practitioner">{currentLang === 'en' ? 'Practicing Astrologer / Consultant' : 'अभ्यासकर्ता ज्योतिषी / वास्तुविद'}</option>
              <option value="architect">{currentLang === 'en' ? 'Architect / Civil Engineer' : 'आर्किटेक्ट / इंजीनियर'}</option>
            </select>
          </div>

          {/* Program Features Checklist */}
          <div className="space-y-1.5 pt-2">
            {em.benefits.map((b, i) => (
              <div key={i} className="flex items-center space-x-2 text-[11px] text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-lg shadow-[#D4AF37]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-4"
          >
            <span>{em.proceedWhatsapp}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
