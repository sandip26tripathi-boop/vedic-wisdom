'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Star, ShieldCheck, Quote, Building2, Home, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const { t, language } = useApp();

  const testimonials = [
    {
      name: 'Aditya Singhania',
      role: language === 'en' ? 'Managing Director, Sharda Textiles' : 'प्रबंध निदेशक, शारदा टेक्सटाइल्स',
      location: 'Mumbai & Bhiwandi, India',
      avatar: 'AS',
      type: 'Industrial / Factory Vastu',
      content: language === 'en'
        ? 'Our automated looms in Bhiwandi suffered recurring breakdowns every 10 days. Other Vastu consultants recommended breaking a 40-foot load-bearing wall. Sandeep K. Tripathi resolved the vibration imbalance using heavy lead helixes in South-West without stopping our plant for a single hour. Our plant uptime has remained 99.4% for the past 9 months.'
        : 'भिवंडी स्थित हमारी फैक्ट्री की मशीनें बार-बार खराब हो रही थीं। अन्य सलाहकारों ने 40 फुट की लोड-बेयरिंग दीवार गिराने को कहा था। संदीप त्रिपाठी जी ने बिना प्लांट रोके नैऋत्य में लेड हेलिक्स लगाकर समस्या का 100% समाधान कर दिया। पिछले 9 महीनों से उत्पादन निर्बाध चल रहा है।'
    },
    {
      name: 'Dr. Tariq Al-Mansoor & Leena',
      role: language === 'en' ? 'Real Estate Portfolio Investors' : 'रियल एस्टेट पोर्टफोलियो निवेशक',
      location: 'Downtown Dubai, UAE',
      avatar: 'TM',
      type: 'Luxury Penthouse Astro-Vastu',
      content: language === 'en'
        ? 'Under Dubai luxury lease agreements, civil demolition is completely banned. Sandeep Sir audited our penthouse via Google Earth and floor plan. By embedding brass strips flush into the entrance threshold and synchronizing our KP charts, our $2.4M escrow dispute settled in 34 days. Truly revolutionary non-invasive science.'
        : 'दुबई के लीज नियमों में तोड़फोड़ पर सख्त पाबंदी है। संदीप सर ने गूगल अर्थ और नक्शे के माध्यम से रिमोट ऑडिट किया। प्रवेश द्वार पर ब्रास स्ट्रिप लगाने और केपी कुंडली मिलान से हमारा अटका हुआ $2.4M का विवाद मात्र 34 दिनों में सुलझ गया। अद्भुत वैज्ञानिक परिणाम।'
    },
    {
      name: 'Smt. Vandana & Dr. Alok Sharma',
      role: language === 'en' ? 'Cardiologist & Healthcare Trustee' : 'वरिष्ठ हृदय रोग विशेषज्ञ',
      location: 'Bhopal, Madhya Pradesh, India',
      avatar: 'VS',
      type: 'Residential Bungalow',
      content: language === 'en'
        ? 'Living right in Bhopal near Ashima Mall, we consulted Sandeep ji for our Maple Heights duplex. The North-East was burdened with excess storage causing acute mental anxiety and sleep disturbance. With zero demolition—just copper pyramid balancing and elemental color shift—our home feels like a tranquil Himalayan temple now.'
        : 'भोपाल में आशिमा मॉल के समीप अपने निवास हेतु हमने संदीप जी से परामर्श लिया। ईशान कोण के दोष के कारण लगातार मानसिक तनाव रहता था। बिना किसी तोड़फोड़ के केवल तांबे के पिरामिड और रंग संतुलन से घर में अद्भुत शांति और सकारात्मक ऊर्जा का संचार हुआ है।'
    },
    {
      name: 'Robert & Evelyn Davies',
      role: language === 'en' ? 'Aesthetic Clinic Directors' : 'निदेशक, एस्थेटिक मेडिकल क्लिनिक',
      location: 'Mayfair, London, UK',
      avatar: 'RD',
      type: 'Commercial Medical Clinic',
      content: language === 'en'
        ? 'Our Grade-II listed building in Mayfair could not be physically altered by British law. Sandeep Tripathi\'s off-site Astro-Vastu audit with medical stainless steel strips and NNE doctor cabin realignment propelled our consultation revenues by 4.2x within 90 days. We recommend him to all our international associates.'
        : 'ब्रिटिश हेरिटेज कानूनों के कारण हम अपनी मेफेयर क्लिनिक में कोई बदलाव नहीं कर सकते थे। संदीप जी के रिमोट ऑडिट और स्टेनलेस स्टील स्ट्रिप्स के प्रयोग से हमारे मरीजों का आगमन और क्लिनिक का राजस्व 90 दिनों में 4.2 गुना बढ़ गया। असाधारण अनुभव।'
    }
  ];

  return (
    <section className="py-24 border-t" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.title}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {language === 'en' ? 'Trusted by Leaders Across 28 Nations' : '28 देशों के गृहस्वामियों एवं उद्यमियों का अटूट विश्वास'}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials 4-Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testi, idx) => (
            <div
              key={idx}
              className="rounded-3xl border p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div>
                {/* Rating & Verified Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{t.testimonials.verified}</span>
                  </span>
                </div>

                <Quote className="w-8 h-8 text-amber-500/30 mb-2" />

                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic font-serif">
                  "{testi.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t flex items-center space-x-3.5" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold flex items-center justify-center text-sm shadow-md">
                  {testi.avatar}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                    {testi.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {testi.role} • <span className="font-semibold text-amber-600">{testi.location}</span>
                  </p>
                  <p className="text-[10px] text-stone-400">
                    {testi.type}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
