'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FAQ_DATA } from '@/data/faq';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export default function FaqSection() {
  const { t, language, openWizard } = useApp();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.title}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {language === 'en' ? 'Frequently Answered Questions' : 'प्रायः पूछे जाने वाले प्रश्न एवं उत्तर'}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: language === 'en' ? 'All Questions' : 'सभी प्रश्न' },
            { id: 'demolition', label: language === 'en' ? '0% Demolition Method' : '0% तोड़फोड़ विधि' },
            { id: 'global', label: language === 'en' ? 'Remote Global Audits' : 'रिमोट अंतरराष्ट्रीय ऑडिट' },
            { id: 'consultation', label: language === 'en' ? 'Astro-Vastu & Kundli' : 'एस्ट्रो-वास्तु व कुंडली' },
            { id: 'academy', label: language === 'en' ? 'Academy & Certification' : 'एकेडमी व प्रमाणन' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'border hover:border-amber-500'
              }`}
              style={{
                backgroundColor: activeCategory === cat.id ? undefined : 'var(--bg-card)',
                borderColor: activeCategory === cat.id ? undefined : 'var(--border-subtle)',
                color: activeCategory === cat.id ? undefined : 'var(--text-main)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isOpen ? 'var(--gold-primary)' : 'var(--border-subtle)',
                }}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <span>{language === 'en' ? faq.question : faq.questionHindi}</span>
                  <div className={`p-1.5 rounded-full flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 bg-amber-500/10 text-amber-600' : 'text-stone-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t pt-4 animate-in fade-in duration-150" style={{ borderColor: 'var(--border-subtle)' }}>
                    <p>{language === 'en' ? faq.answer : faq.answerHindi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-gold)' }}>
          <div className="text-left">
            <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              {language === 'en' ? 'Have a Specific Property Query or Urgent Conflict?' : 'क्या आपकी कोई विशिष्ट वास्तु समस्या अथवा जरूरी प्रश्न है?'}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'en' 
                ? 'Speak directly with Sandeep K. Tripathi\'s global desk on WhatsApp.' 
                : 'संदीप के. त्रिपाठी जी के परामर्श डेस्क से सीधे व्हाट्सएप पर संवाद करें।'}
            </p>
          </div>

          <a
            href="https://wa.me/919009448601?text=Hello%20Vedic%20Wisdom%2C%20I%20have%20a%20specific%20Vastu%20question%20regarding%20my%20property."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-md flex items-center space-x-2 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Quick Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
}
