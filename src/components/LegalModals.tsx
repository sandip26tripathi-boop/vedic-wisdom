'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, ShieldCheck, Scale, RefreshCcw } from 'lucide-react';

export default function LegalModals() {
  const { legalModal, closeLegalModal, language } = useApp();

  if (!legalModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border p-6 sm:p-8 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--gold-primary)',
          color: 'var(--text-main)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center space-x-2.5">
            {legalModal === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
            {legalModal === 'terms' && <Scale className="w-5 h-5 text-amber-600" />}
            {legalModal === 'refund' && <RefreshCcw className="w-5 h-5 text-blue-600" />}
            <h3 className="font-serif text-xl font-bold">
              {legalModal === 'privacy' && (language === 'en' ? 'Global Privacy Policy & NDA Terms' : 'गोपनीयता नीति एवं एनडीए नियम')}
              {legalModal === 'terms' && (language === 'en' ? 'Terms of Service & Commercial Agreement' : 'नियम व शर्तें एवं वाणिज्यिक अनुबंध')}
              {legalModal === 'refund' && (language === 'en' ? 'Refund & Cancellation Policy' : 'रिफंड एवं रद्दीकरण नीति')}
            </h3>
          </div>
          <button
            onClick={closeLegalModal}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300 space-y-4">
          
          {legalModal === 'privacy' && (
            <>
              <p>
                <strong>1. Data Confidentiality & Non-Disclosure:</strong> Vedic Wisdom respects the privacy of all clients across India, North America, Europe, the Middle East, and worldwide. All architectural blueprints, floor plans, family birth details (Kundlis), photographic property records, and commercial financial disclosures provided to Sandeep K. Tripathi and our research team are maintained under strict confidentiality and treated as proprietary client secrets under Non-Disclosure standards.
              </p>
              <p>
                <strong>2. Usage of Client Information:</strong> Information submitted via our Audit Inquiry Wizard, WhatsApp channels, or email is solely utilized for conducting mathematical 16-zone spatial grids, astronomical KP horary analysis, and dispatching consecrated remedies. We never sell, rent, or lease client data to third-party marketing brokers.
              </p>
              <p>
                <strong>3. Digital Storage Security:</strong> Digital CAD drawings and horoscopic records are stored in encrypted cloud environments compliant with international GDPR and Indian IT Act standards.
              </p>
            </>
          )}

          {legalModal === 'terms' && (
            <>
              <p>
                <strong>1. Nature of Advisory Services:</strong> Vedic Wisdom consultations, academy courses, and remedial tools are based on traditional Vedic scriptures, astronomical calculations (Krishnamurti Paddhati), MahaVastu grids, and empirical spatial energy research. All services are advisory in nature and based on time-honored traditional knowledge frameworks.
              </p>
              <p>
                <strong>2. No Substitute for Professional Engineering or Medicine:</strong> Vedic Wisdom recommendations are not a replacement for civil architecture, structural engineering licenses, legal contracts, or certified medical diagnosis. Clients are advised to maintain compliance with local municipal building bylaws and lease contracts.
              </p>
              <p>
                <strong>3. Commercial Payment Gateways:</strong> All payments processed through authorized gateways (Razorpay, Stripe, Bank Wire, UPI) are invoiced under Vedic Wisdom business accounts.
              </p>
            </>
          )}

          {legalModal === 'refund' && (
            <>
              <p>
                <strong>1. Customized Consultations & Audits:</strong> Because our Astro-Vastu audits require extensive mathematical CAD zoning, planetary horoscopic calculations, and direct 1-on-1 advisory time by Principal Researcher Sandeep K. Tripathi, consultation fees are non-refundable once the digital analysis or report preparation has commenced.
              </p>
              <p>
                <strong>2. Academy Enrollment:</strong> Cohort fees for live interactive courses may be cancelled up to 72 hours prior to the batch start date for an 80% refund (20% administrative seat-reservation fee deducted). Alternatively, students may transfer their seat to the subsequent batch at zero additional cost.
              </p>
              <p>
                <strong>3. Physical Remedies & Consecrated Gemstones:</strong> Physical products (Copper strips, Brass strips, Pyramids, Yantras) that arrive damaged during international transit are replaced immediately upon submission of courier unboxing verification. Due to personalized Vedic consecration rituals, custom energized gemstones cannot be returned once blessed.
              </p>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 border-t flex justify-end" style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            onClick={closeLegalModal}
            className="px-6 py-2 rounded-xl font-bold text-xs text-white bg-stone-900 dark:bg-amber-600 shadow"
          >
            {language === 'en' ? 'Close Window' : 'बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
}
