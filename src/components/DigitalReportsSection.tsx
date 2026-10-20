import React from 'react';
import { digitalReportsData, DigitalReportItem } from '../data/digitalReports.ts';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Calendar, 
  TrendingUp, 
  ShieldAlert, 
  Heart, 
  Zap, 
  ShoppingBag 
} from 'lucide-react';

interface DigitalReportsSectionProps {
  currentLang: Language;
  onOpenReportModal: (report: DigitalReportItem) => void;
  onOpenGenerateReport?: () => void;
}

export const DigitalReportsSection: React.FC<DigitalReportsSectionProps> = ({
  currentLang,
  onOpenReportModal,
  onOpenGenerateReport,
}) => {
  const { addToCart } = useCart();
  const t = translations[currentLang];
  const dr = t.digitalReports;

  const getReportIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-[#D4AF37]" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-rose-500" />;
      default:
        return <FileText className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="digital-reports" className="py-20 bg-white dark:bg-[#0B0F19] border-t border-[#D4AF37]/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{dr.sectionBadge}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {dr.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {dr.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>{dr.deliveryGuarantee}</span>
          </div>
        </div>

        {/* Module 1: AI Digital Report Generation Agent Spotlight Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#1E293B] to-[#0B0F19] text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-bold text-[#F3E5AB]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Automated AI Digital Report Generation Agent</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              Generate Your Personalized AI Astro-Vastu Dossier
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Input your birth coordinates to trigger our computational Vedic & KP analytics engine. Instant on-screen dossier preview with high-resolution PDF download & compliance disclaimers.
            </p>
          </div>

          <button
            onClick={onOpenGenerateReport}
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Report Generator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Digital Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {digitalReportsData.map((report) => (
            <div
              key={report.id}
              className="rounded-3xl p-6 bg-[#FAF9F6] dark:bg-[#111827] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                    {getReportIcon(report.icon)}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                    {currentLang === 'en' ? report.badgeEn : report.badgeHi}
                  </span>
                </div>

                {/* Report Title */}
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-[#B45309] dark:group-hover:text-[#D4AF37] transition-colors">
                  {currentLang === 'en' ? report.titleEn : report.titleHi}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {currentLang === 'en' ? report.descriptionEn : report.descriptionHi}
                </p>

                {/* Pricing & Length Badge */}
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 mb-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono text-lg font-extrabold text-[#B45309] dark:text-[#F3E5AB]">
                      {report.priceInr}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {report.priceUsd} USD
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                    <div>{currentLang === 'en' ? report.pagesEn : report.pagesHi}</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                      Instant PDF
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-700 dark:text-slate-300">
                  {(currentLang === 'en' ? report.highlightsEn : report.highlightsHi).slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenReportModal(report)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>{dr.orderReportBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => addToCart({
                      id: report.id,
                      title: currentLang === 'en' ? report.titleEn : report.titleHi,
                      category: 'Digital Report',
                      price: parseInt(report.priceInr.replace(/\D/g, ''), 10) || 999,
                      turnaround: report.deliveryTimeEn,
                      badge: report.badgeEn
                    })}
                    className="p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] transition-colors cursor-pointer"
                    title={currentLang === 'en' ? 'Add Report to Cart' : 'रिपोर्ट कार्ट में जोड़ें'}
                    aria-label="Add Report to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>

                <button
                  onClick={() => onOpenReportModal(report)}
                  className="w-full py-2 rounded-xl font-semibold text-[11px] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#D4AF37]" />
                  <span>{dr.samplePreviewBtn}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
