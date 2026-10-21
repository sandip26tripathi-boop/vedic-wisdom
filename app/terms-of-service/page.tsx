import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | Vedic Wisdom',
  description: 'Advisory scope, intellectual property, and service terms for Vedic Wisdom consultations.'
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
          Terms of Service
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Nature of Services</h2>
          <p>
            Vedic Wisdom provides traditional spatial Vastu and classical KP astrological consultations. All advice is observational and intended for personal self-reflection and architectural planning.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">2. User Responsibilities</h2>
          <p>
            Clients agree to provide precise compass readings, floor dimensions, and natal coordinates. Clients remain solely responsible for any independent architectural or business decisions made following consultation.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">3. Intellectual Property Rights</h2>
          <p>
            All custom blueprints, report matrices, and digital artifacts delivered remain the intellectual property of Vedic Wisdom and are licensed for personal and internal business use only.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Bhopal, Madhya Pradesh.
          </p>
        </div>
      </div>
    </div>
  );
}
