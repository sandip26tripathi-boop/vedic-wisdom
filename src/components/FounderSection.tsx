'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Award, Compass, ShieldCheck, CheckCircle, MapPin, PhoneCall, Mail, Sparkles 
} from 'lucide-react';

export default function FounderSection() {
  const { t, language, openWizard } = useApp();

  const credentialsList = [
    t.founder.cred1,
    t.founder.cred2,
    t.founder.cred3,
    t.founder.cred4,
    t.founder.cred5,
  ];

  return (
    <section id="founder" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--gold-primary)'
          }}
        >
          {/* Subtle watermark background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Real Photograph of Sandeep K. Tripathi (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Golden glowing border ring */}
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-700 shadow-2xl flex items-center justify-center gold-glow">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-stone-900 relative shadow-inner">
                    <img 
                      src="/sandeep-tripathi.jpg" 
                      alt="Sandeep K. Tripathi - Founder & Principal Researcher" 
                      className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute bottom-2 right-2 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-lg flex items-center space-x-1.5 border border-emerald-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>12+ Yrs Empirical Research</span>
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Sandeep K. Tripathi
                </h3>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  Founder & Principal Researcher, Vedic Wisdom
                </p>
                <p className="text-xs text-stone-500">
                  KP Astrology • 0% Demolition Astro-Vastu • MahaVastu • BNN Nadi
                </p>
              </div>

              {/* Direct Reach */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
                <a
                  href="https://wa.me/919009448601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center space-x-1.5 hover:bg-emerald-500/20 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>+91 90094 48601</span>
                </a>
                <a
                  href="mailto:ask.vedicwisdom@gmail.com"
                  className="px-4 py-2 rounded-xl border font-semibold flex items-center space-x-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>Email Desk</span>
                </a>
              </div>
            </div>

            {/* Founder Biography & Scientific Methodology (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.founder.title}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
                {t.founder.subtitle}
              </h2>

              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {t.founder.bioP1}
              </p>

              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {t.founder.bioP2}
              </p>

              {/* Research Disciplines */}
              <div className="pt-2">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 mb-3">
                  {t.founder.credentials}
                </h4>

                <div className="space-y-2">
                  {credentialsList.map((cred, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-stone-700 dark:text-stone-300">
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Quote & Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => openWizard('Executive 1-on-1 Consultation with Sandeep Sir')}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg gold-glow"
                >
                  {language === 'en' ? 'Book Direct 1-on-1 with Sandeep Sir' : 'संदीप सर से व्यक्तिगत परामर्श बुक करें'}
                </button>

                <div className="flex items-center space-x-2 text-xs text-stone-500">
                  <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Bhopal Global HQ | Worldwide Digital Audits</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
