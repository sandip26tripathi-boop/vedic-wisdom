'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { SERVICES_DATA } from '@/data/services';
import { 
  Home, Building2, Factory, Globe, Check, ArrowRight, Clock, Users, Sparkles 
} from 'lucide-react';

export default function ServicesSection() {
  const { t, language, formatPrice, openWizard } = useApp();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'Building2': return Building2;
      case 'Factory': return Factory;
      case 'Globe': return Globe;
      default: return Home;
    }
  };

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Empirical Astro-Vastu Audits' : 'प्रामाणिक एस्ट्रो-वास्तु परामर्श'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t.services.title}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.services.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            const isFeatured = service.category === 'online_global' || service.category === 'residential';
            
            return (
              <div
                key={service.id}
                className={`relative rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 ${
                  service.category === 'online_global' 
                    ? 'ring-2 ring-amber-500 shadow-xl' 
                    : 'shadow-md'
                }`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: service.category === 'online_global' ? 'var(--gold-primary)' : 'var(--border-subtle)',
                }}
              >
                {/* Popular / Featured Badge */}
                {service.category === 'online_global' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md">
                    {language === 'en' ? 'Global NRI Favorite' : 'एनआरआई एवं वैश्विक लोकप्रिय'}
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4 border border-amber-500/20">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                    {language === 'en' ? service.title : service.titleHindi}
                  </h3>

                  <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 font-medium line-clamp-2">
                    {language === 'en' ? service.tagline : service.taglineHindi}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <div className="flex items-baseline space-x-1">
                      <span className="font-serif text-3xl font-extrabold text-stone-900 dark:text-stone-100">
                        {formatPrice(service.priceINR, service.priceUSD)}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {language === 'en' ? '/ Comprehensive Audit' : '/ संपूर्ण ऑडिट'}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center space-x-1.5 text-[11px] text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{language === 'en' ? 'Turnaround: ' : 'समय: '} {service.turnaround}</span>
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mt-4 flex items-start space-x-1.5 text-xs text-stone-600 dark:text-stone-300">
                    <Users className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      <strong className="font-semibold text-stone-800 dark:text-stone-200">
                        {language === 'en' ? 'Best For: ' : 'उपयुक्त: '}
                      </strong>
                      {language === 'en' ? service.bestFor : service.bestForHindi}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      {t.services.deliverables}
                    </p>
                    {(language === 'en' ? service.features : service.featuresHindi).slice(0, 5).map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-stone-600 dark:text-stone-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <button
                    onClick={() => openWizard(service.title)}
                    className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-md flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{t.services.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-gold)' }}>
          <div className="text-left">
            <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              {language === 'en' ? 'Have Multiple Properties or Custom Industrial Acreage?' : 'क्या आपके पास एकाधिक संपत्तियां अथवा बड़ी औद्योगिक भूमि है?'}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'en' 
                ? 'We offer tailored corporate retainer models and bespoke multi-plant Astro-Vastu architectural planning.' 
                : 'हम कस्टमाइज्ड कॉर्पोरेट रिटेनर एवं बहु-इकाई औद्योगिक आर्किटेक्चरल वास्तु समाधान उपलब्ध कराते हैं।'}
            </p>
          </div>
          <button
            onClick={() => openWizard('Custom Enterprise Audit')}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 shadow-md whitespace-nowrap"
          >
            {language === 'en' ? 'Request Enterprise Quote' : 'कस्टम कोटेशन प्राप्त करें'}
          </button>
        </div>

      </div>
    </section>
  );
}
