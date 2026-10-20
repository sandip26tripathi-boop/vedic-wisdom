import React from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { X, CheckCircle, Clock, Target, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

interface ConsultationScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  currentLang: Language;
  onOpenBooking: (serviceId: string) => void;
}

export const ConsultationScopeModal: React.FC<ConsultationScopeModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  currentLang,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const t = translations[currentLang];
  const s = (t.consultations.astrologyWing as any)[serviceId] || 
            (t.consultations.vastuWing as any)[serviceId] || 
            t.consultations.vastuWing.industrial;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/50 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/30 inline-block mb-2">
            {s.badge}
          </span>
          <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {s.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {s.summary}
          </p>
        </div>

        {/* Deliverables Checklist */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLang === 'en' ? 'Complete Scope of Work & Deliverables:' : 'कार्यक्षेत्र एवं प्राप्तियां:'}</span>
          </div>

          <div className="space-y-2.5">
            {s.deliverables.map((deliv: string, idx: number) => (
              <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{deliv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Turnaround & Client Fit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6 text-xs">
          <div>
            <div className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              {t.consultations.turnaround}
            </div>
            <div className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {s.turnaround}
            </div>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              {t.consultations.idealFor}
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {s.idealFor}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs text-slate-500">
            {s.pricing}
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenBooking(serviceId);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/25 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{t.consultations.bookNow}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
