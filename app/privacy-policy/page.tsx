import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & DPDP Compliance | Vedic Wisdom',
  description: 'Enterprise data confidentiality and compliance under India DPDP Act and global GDPR frameworks.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
          Privacy Policy & DPDP Act Compliance
        </h1>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm mb-6">
          <p className="font-semibold">
            Client Confidentiality Commitment: All uploaded blueprints, sketches, and personal natal details are strictly confidential, protected via end-to-end encrypted storage, and never published or shared with third parties.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">1. Scope of Data Collection</h2>
          <p>
            Vedic Wisdom collects only the minimum necessary data to perform spatial directional alignment and astrological calculations:
            architectural CAD/PDF layouts, birth coordinates (Date, Time, Place of Birth), and communication numbers (WhatsApp/Email).
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">2. Data Security & Storage</h2>
          <p>
            All submitted files are transmitted via SSL/TLS encryption and stored on secure cloud databases with restricted role-based access. Only authorized researchers reviewing your floor plan or chart have access.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">3. Anonymization in Research</h2>
          <p>
            Case studies, architectural diagrams, and research examples published on our portal are fully anonymized, with all client identifying metadata redacted in strict accordance with the Digital Personal Data Protection (DPDP) Act of India.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">4. Contact & Data Deletion</h2>
          <p>
            To request full data deletion or exercise privacy rights, email our compliance officer at <span className="font-mono text-amber-600">ask.vedicwisdom@gmail.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
