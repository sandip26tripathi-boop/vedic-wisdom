'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  CheckCircle2, XCircle, ShieldCheck, Zap, Layers, Cpu, Hammer, Sparkles, ArrowRight 
} from 'lucide-react';

export default function ZeroDemolitionStrip() {
  const { t, language, openWizard } = useApp();

  const comparisonRows = [
    {
      feature: language === 'en' ? 'Structural Alterations' : 'भवन निर्माण में तोड़फोड़',
      conventional: language === 'en' ? 'Demolishing walls, breaking costly bathrooms & relocating kitchens' : 'दीवारें गिराना, महंगे बाथरूम तोड़ना, रसोई स्थानांतरित करना',
      vedicWisdom: language === 'en' ? '100% Zero Demolition. Not a single brick, tile, or pillar is broken' : '100% बिना तोड़फोड़। एक भी ईंट, टाइल अथवा कॉलम तोड़े बिना समाधान',
    },
    {
      feature: language === 'en' ? 'Personalized Kundli Mapping' : 'व्यक्तिगत जन्मकुंडली मिलान',
      conventional: language === 'en' ? 'Generic one-size-fits-all directional rules ignoring horoscopes' : 'सामान्य नियम जो जातक की व्यक्तिगत कुंडली की उपेक्षा करते हैं',
      vedicWisdom: language === 'en' ? 'KP Astrology Cuspal Sub-Lord mapped directly to your 16-zone floor plan' : 'केपी ज्योतिष के कस्पल सब-लॉर्ड का 16 दिशाओं के साथ सूक्ष्म मिलान',
    },
    {
      feature: language === 'en' ? 'Tenant & Overseas Leases' : 'किरायेदार एवं विदेशी लीज नियम',
      conventional: language === 'en' ? 'Impossible to execute due to strict landlord & international lease codes' : 'मकान मालिक या विदेशी लीज कानूनों के कारण तोड़फोड़ असंभव',
      vedicWisdom: language === 'en' ? 'Fully compliant for rented apartments in USA, UK, UAE & corporate hubs' : 'अमेरिका, यूके, दुबई के कड़े लीज नियमों के 100% अनुकूल',
    },
    {
      feature: language === 'en' ? 'Financial Cost of Remedies' : 'उपायों का वित्तीय खर्च',
      conventional: language === 'en' ? 'Massive civil renovation expenses often reaching ₹5 Lakhs to ₹25 Lakhs' : 'लाखों रुपये का भारी सिविल रिनोवेशन खर्च व मानसिक तनाव',
      vedicWisdom: language === 'en' ? 'Subtle, high-purity metal strips, wires & pyramids at fractional cost' : 'किफायती पंचधातु स्ट्रिप, ऊर्जा तार व प्राण-प्रतिष्ठित पिरामिड',
    },
    {
      feature: language === 'en' ? 'Time to Measure Results' : 'परिणाम दिखने का समय',
      conventional: language === 'en' ? 'Months of dusty construction with unpredictable energetic disruption' : 'महीनों का निर्माण कार्य, धूल, शोर और अनिश्चित परिणाम',
      vedicWisdom: language === 'en' ? 'Subtle energy stabilization within 7-14 days; tangible results in 21-45 days' : '7-14 दिनों में मानसिक शांति; 21 से 45 दिनों में प्रत्यक्ष वित्तीय लाभ',
    },
  ];

  const pillars = [
    {
      icon: Layers,
      title: t.usp.point1Title,
      desc: t.usp.point1Desc,
      tag: 'Astro-Vastu Grid'
    },
    {
      icon: Cpu,
      title: t.usp.point2Title,
      desc: t.usp.point2Desc,
      tag: 'Elemental Metal Science'
    },
    {
      icon: Zap,
      title: t.usp.point3Title,
      desc: t.usp.point3Desc,
      tag: 'Sacred Pyramidal Physics'
    },
    {
      icon: ShieldCheck,
      title: t.usp.point4Title,
      desc: t.usp.point4Desc,
      tag: 'Empirical Radiesthesia'
    },
  ];

  return (
    <section id="zero-demolition" className="py-20 border-t border-b" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>0% Demolition (बिना तोड़फोड़) Astro-Vastu</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {t.usp.title}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.usp.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="mt-16 overflow-hidden rounded-2xl border shadow-xl" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}>
          <div className="p-6 sm:p-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <h3 className="font-serif text-2xl font-bold text-center">
              {language === 'en' ? 'Conventional Demolition vs. Vedic Wisdom 0% Method' : 'पारंपरिक तोड़फोड़ बनाम वैदिक विज़डम 0% तोड़फोड़ पद्धति'}
            </h3>
            <p className="text-xs text-stone-500 text-center mt-1">
              {language === 'en' ? 'Why smart homeowners & industrialists choose our empirical approach' : 'जानिए क्यों दुनिया भर के उद्योगपति और गृहस्वामी हमारी वैज्ञानिक पद्धति चुनते हैं'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
                  <th className="py-4 px-6 font-bold text-stone-700 dark:text-stone-300 w-1/4">
                    {language === 'en' ? 'Criterion' : 'मानदंड'}
                  </th>
                  <th className="py-4 px-6 font-bold text-red-600 dark:text-red-400 w-3/8">
                    {language === 'en' ? 'Conventional Vastu Demolition' : 'पारंपरिक तोड़फोड़ वास्तु'}
                  </th>
                  <th className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400 w-3/8">
                    {language === 'en' ? 'Vedic Wisdom 0% Demolition' : 'वैदिक विज़डम 0% तोड़फोड़'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-amber-500/5 transition-colors">
                    <td className="py-4 px-6 font-semibold text-stone-900 dark:text-stone-100">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-stone-600 dark:text-stone-400">
                      <div className="flex items-start space-x-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{row.conventional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-800 dark:text-stone-200 bg-emerald-500/5 font-medium">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{row.vedicWisdom}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Prompt in Comparison Matrix */}
          <div className="p-6 text-center border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
            <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
              {language === 'en' 
                ? 'Save your structural wealth. Protect your home\'s architectural integrity.' 
                : 'अपने भवन के सौंदर्य और पूंजी की रक्षा करें। बिना तोड़े सुख-समृद्धि पाएं।'}
            </span>
            <button
              onClick={() => openWizard()}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow flex items-center space-x-2"
            >
              <span>{language === 'en' ? 'Start 0% Demolition Audit' : '0% तोड़फोड़ ऑडिट शुरू करें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
