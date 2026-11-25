'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import VedicLogo from '@/components/VedicLogo';
import { 
  MapPin, Phone, Mail, Clock, ShieldCheck, ArrowUp 
} from 'lucide-react';

export default function Footer() {
  const { t, language, openLegalModal, openWizard } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-main)',
        borderColor: 'var(--border-subtle)',
        color: 'var(--text-main)',
      }}
    >
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Headquarters (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <a href="#home">
              <VedicLogo size={42} />
            </a>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-medium">
              {t.tagline}
            </p>

            <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-300 pt-2">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{t.footer.headquarters}:</strong><br />
                  {t.footer.address}
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <a href="https://wa.me/919009448601" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-emerald-700 dark:text-emerald-400">
                  {t.footer.phone} (WhatsApp / Global Desk)
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href="mailto:ask.vedicwisdom@gmail.com" className="hover:underline">
                  {t.footer.email}
                </a>
              </div>

              <div className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{t.footer.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <li><a href="#home" className="hover:text-amber-600 transition-colors">{t.nav.home}</a></li>
              <li><a href="#zero-demolition" className="hover:text-amber-600 transition-colors">{t.nav.zeroDemolition}</a></li>
              <li><a href="#services" className="hover:text-amber-600 transition-colors">{t.nav.services}</a></li>
              <li><a href="#case-studies" className="hover:text-amber-600 transition-colors">{t.nav.caseStudies}</a></li>
              <li><a href="#academy" className="hover:text-amber-600 transition-colors">{t.nav.academy}</a></li>
              <li><a href="#founder" className="hover:text-amber-600 transition-colors">{t.nav.founder}</a></li>
              <li><a href="#blog" className="hover:text-amber-600 transition-colors">{t.nav.blog}</a></li>
              <li><a href="#faq" className="hover:text-amber-600 transition-colors">{t.nav.faq}</a></li>
            </ul>
          </div>

          {/* Compliance & Direct Booking (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {language === 'en' ? 'International Assurance' : 'वैश्विक गुणवत्ता आश्वासन'}
            </h4>

            <p className="text-xs text-stone-500 leading-relaxed">
              {language === 'en'
                ? 'Empirically audited properties across India, North America, Europe, and the Middle East with strict NDA protection.'
                : 'भारत, अमेरिका, यूरोप और मध्य पूर्व में 4,500+ संपत्तियों का सफल ऑडिट। सख्त एनडीए सुरक्षा की गारंटी।'}
            </p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => openLegalModal('privacy')}
                className="block text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                • {t.footer.privacyModal}
              </button>
              <button
                onClick={() => openLegalModal('terms')}
                className="block text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                • {t.footer.termsModal}
              </button>
              <button
                onClick={() => openLegalModal('refund')}
                className="block text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                • {t.footer.refundModal}
              </button>
            </div>

            <button
              onClick={() => openWizard()}
              className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow"
            >
              {language === 'en' ? 'Book Direct Consultation Now' : 'सीधा परामर्श बुक करें'}
            </button>
          </div>

        </div>

        {/* Mandatory Legal & Ethical Disclaimer */}
        <div className="mt-12 p-5 rounded-2xl border bg-amber-500/5 text-xs leading-relaxed text-stone-600 dark:text-stone-400" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center space-x-2 font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide text-[11px] mb-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>{t.footer.disclaimerTitle}</span>
          </div>
          <p>{t.footer.disclaimerText}</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            {t.footer.allRights}
          </div>

          <div className="flex items-center space-x-4">
            <span>Bhopal, MP, India</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
