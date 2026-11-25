'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CASE_STUDIES_DATA } from '@/data/caseStudies';
import { CaseStudy } from '@/types';
import { 
  Building, Sparkles, AlertCircle, Search, Compass, CheckCircle2, TrendingUp, X, ArrowRight 
} from 'lucide-react';

export default function CaseStudiesSection() {
  const { t, language, openWizard } = useApp();
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="py-24 border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Empirical Field Evidence' : 'वास्तविक अनुभवजन्य परिणाम'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t.testimonials.title} & {language === 'en' ? 'Case Studies' : 'केस स्टडीज'}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {language === 'en' 
              ? 'Documented before-and-after Astro-Vastu alignments executed with 100% Zero Demolition across luxury estates, foreign clinics, and heavy industrial plants.' 
              : 'दुबई, लंदन, मुंबई और अमेरिका में बिना किसी तोड़फोड़ के किए गए वास्तविक वैज्ञानिक वास्तु सुधारों का संपूर्ण विवरण।'}
          </p>
        </div>

        {/* Case Studies 4-Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES_DATA.map((cs) => (
            <div
              key={cs.id}
              className="rounded-3xl border p-6 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="space-y-4">
                {/* Location & Flag Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-stone-500">
                    <span className="text-xl">{cs.flag}</span>
                    <span>{cs.location}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {cs.metric}
                  </span>
                </div>

                {/* Title & Client Type */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {language === 'en' ? cs.title : cs.titleHindi}
                </h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {language === 'en' ? `Client: ${cs.clientType}` : `क्लाइंट: ${cs.clientTypeHindi}`}
                </p>

                {/* Problem Box */}
                <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex items-center space-x-1.5 font-bold text-red-600 dark:text-red-400 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'The Core Challenge:' : 'मुख्य समस्या:'}</span>
                  </div>
                  <p className="line-clamp-2">
                    {language === 'en' ? cs.problem : cs.problemHindi}
                  </p>
                </div>

                {/* 0% Demolition Solution */}
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex items-center space-x-1.5 font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? '0% Demolition Solution:' : 'बिना तोड़फोड़ समाधान:'}</span>
                  </div>
                  <p className="line-clamp-2">
                    {language === 'en' ? cs.solution0Demolition : cs.solution0DemolitionHindi}
                  </p>
                </div>
              </div>

              {/* View Full Case Study Button */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-xs font-semibold text-stone-500">
                  {language === 'en' ? 'Outcome: ' : 'परिणाम: '}
                  <strong className="text-stone-800 dark:text-stone-200">
                    {language === 'en' ? '100% Resolved' : 'पूर्ण समाधान'}
                  </strong>
                </span>

                <button
                  onClick={() => setSelectedCase(cs)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 flex items-center space-x-1.5 transition-colors"
                >
                  <span>{language === 'en' ? 'Read Diagnostic Deep-Dive' : 'विस्तृत रिपोर्ट देखें'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for In-depth Case Study */}
        {selectedCase && (
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
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{selectedCase.flag}</span>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold">
                      {language === 'en' ? selectedCase.title : selectedCase.titleHindi}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {selectedCase.location} | {selectedCase.clientType}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="py-5 space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-red-600 dark:text-red-400 uppercase tracking-wide text-xs mb-1">
                    {language === 'en' ? 'Initial Symptoms & Financial/Health Loss' : 'प्रारंभिक लक्षण एवं संकट'}
                  </h4>
                  <p className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 leading-relaxed">
                    {language === 'en' ? selectedCase.problem : selectedCase.problemHindi}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide text-xs mb-1">
                    {language === 'en' ? 'CAD & 16-Zone Spatial Grid Diagnosis' : '16-दिशा ग्रिड एवं वास्तु डायग्नोसिस'}
                  </h4>
                  <p className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 leading-relaxed">
                    {language === 'en' ? selectedCase.diagnosis : selectedCase.diagnosisHindi}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide text-xs mb-1">
                    {language === 'en' ? 'KP Astrology (Horoscope) Cuspal Correlation' : 'केपी जन्मकुंडली कस्पल मिलान'}
                  </h4>
                  <p className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 leading-relaxed">
                    {language === 'en' ? selectedCase.astroCorrelation : selectedCase.astroCorrelationHindi}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide text-xs mb-1">
                    {language === 'en' ? '0% Demolition Metal Strip & Energy Protocol' : '0% तोड़फोड़ धातु व ऊर्जा समाधान'}
                  </h4>
                  <p className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 leading-relaxed">
                    {language === 'en' ? selectedCase.solution0Demolition : selectedCase.solution0DemolitionHindi}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide text-xs mb-1">
                    {language === 'en' ? 'Measurable Real-World Outcome' : 'प्रत्यक्ष प्राप्त परिणाम'}
                  </h4>
                  <p className="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 leading-relaxed font-semibold">
                    {language === 'en' ? selectedCase.result : selectedCase.resultHindi}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  onClick={() => {
                    setSelectedCase(null);
                    openWizard(selectedCase.title);
                  }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 shadow"
                >
                  {language === 'en' ? 'Consult for Similar Property' : 'समान समाधान हेतु परामर्श लें'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
