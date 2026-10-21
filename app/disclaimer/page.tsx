import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Statutory Disclaimer | Vedic Wisdom',
  description: 'Statutory disclaimer regarding traditional Indian observational science and advisory scope.'
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
          Statutory Legal Disclaimer
        </h1>

        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-950 dark:text-[#F3E5AB] text-xs sm:text-sm mb-6 leading-relaxed">
          <p className="font-semibold">
            "Disclaimer: Consultations and spatial reports are traditional advisory practices rooted in classical Indian observational sciences. They are intended solely for personal, directional, and architectural planning. They do not substitute for certified medical, psychological, legal, financial, or licensed structural engineering advice. Individual perspectives and experiences may vary."
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">1. Observational Scope</h2>
          <p>
            Vedic Wisdom adheres strictly to traditional observational Indian literature. Our consultations provide interpretive perspectives on energy circulation and cyclical planetary transits. We do not issue guarantees, promises of wealth, medical healing claims, or fatalistic outcome declarations.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">2. Professional Independence</h2>
          <p>
            Clients must maintain independent judgment and seek licensed medical, financial, or architectural advice for specific technical or legal challenges. Vedic Wisdom shall not be held liable for any independent choices made by individuals or corporate entities.
          </p>
        </div>
      </div>
    </div>
  );
}
