'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { REMEDIES_DATA } from '@/data/remedies';
import { RemedyItem } from '@/types';
import { 
  ShoppingBag, Sparkles, Plane, Send, Check, ShieldCheck 
} from 'lucide-react';

export default function RemediesStoreSection() {
  const { t, language, formatPrice } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRemedies = selectedCategory === 'all'
    ? REMEDIES_DATA
    : REMEDIES_DATA.filter(r => r.category === selectedCategory);

  const handleOrder = (item: RemedyItem) => {
    const text = encodeURIComponent(`*ORDER / INQUIRY — VEDIC WISDOM REMEDIES STORE*
----------------------------------------
*Product Name:* ${item.name}
*Price:* ${formatPrice(item.priceINR, item.priceUSD)}
*Category:* ${item.categoryLabel}
*Ideal Zone:* ${item.idealZone}

Hello Sandeep Sir / Team Vedic Wisdom, I want to order this authentic energy remedy. Please confirm availability and shipping details.
----------------------------------------`);
    window.open(`https://wa.me/919009448601?text=${text}`, '_blank');
  };

  return (
    <section id="remedies" className="py-24 border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <ShoppingBag className="w-4 h-4" />
            <span>{t.remedies.title}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {language === 'en' ? 'Sacred Energy Tools for 0% Demolition' : '0% तोड़फोड़ हेतु प्रामाणिक ऊर्जा यंत्र एवं स्ट्रिप्स'}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.remedies.subtitle}
          </p>

          {/* International Shipping Banner */}
          <div className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Plane className="w-3.5 h-3.5" />
            <span>{t.remedies.globalShipping} (USA • UK • UAE • Canada • Europe • India)</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: t.remedies.filterAll },
            { id: 'strips', label: t.remedies.filterStrips },
            { id: 'pyramids', label: t.remedies.filterPyramids },
            { id: 'gemstones', label: t.remedies.filterGemstones },
            { id: 'clearing', label: t.remedies.filterClearing },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'border hover:border-amber-500'
              }`}
              style={{
                backgroundColor: selectedCategory === cat.id ? undefined : 'var(--bg-card)',
                borderColor: selectedCategory === cat.id ? undefined : 'var(--border-subtle)',
                color: selectedCategory === cat.id ? undefined : 'var(--text-main)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRemedies.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div>
                {/* Badge & Shipping */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {language === 'en' ? item.categoryLabel : item.categoryLabelHindi}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                  {language === 'en' ? item.name : item.nameHindi}
                </h3>

                {/* Material Specification */}
                <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {item.material}
                </p>

                {/* Description */}
                <p className="mt-2.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {language === 'en' ? item.description : item.descriptionHindi}
                </p>

                {/* Ideal Zone & Purpose */}
                <div className="mt-4 p-3 rounded-xl border text-[11px] space-y-1" style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <p>
                    <strong className="text-stone-800 dark:text-stone-200">
                      {language === 'en' ? 'Target Zone: ' : 'प्रभावित दिशा: '}
                    </strong>
                    {item.idealZone}
                  </p>
                  <p className="line-clamp-2 text-stone-500">
                    <strong className="text-stone-800 dark:text-stone-200">
                      {language === 'en' ? 'Core Purpose: ' : 'उपयोग: '}
                    </strong>
                    {language === 'en' ? item.purpose : item.purposeHindi}
                  </p>
                </div>
              </div>

              {/* Price & WhatsApp Action */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <span className="text-[10px] text-stone-400 block font-medium">
                    {language === 'en' ? 'Price (Excl. Customs):' : 'मूल्य:'}
                  </span>
                  <span className="font-serif text-2xl font-extrabold text-stone-900 dark:text-stone-100">
                    {formatPrice(item.priceINR, item.priceUSD)}
                  </span>
                </div>

                <button
                  onClick={() => handleOrder(item)}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow flex items-center space-x-1.5 transition-colors whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Order on WhatsApp' : 'ऑर्डर करें'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
