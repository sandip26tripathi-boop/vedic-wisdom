import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Rescheduling & Refund Policy | Vedic Wisdom',
  description: 'Transparent consultation rescheduling and digital report refund terms.'
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-6">
          Consultation Rescheduling & Refund Policy
        </h1>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Rescheduling Sessions</h2>
          <p>
            Consultation time slots can be rescheduled without charge up to 24 hours prior to the scheduled call. Requests received within 24 hours of the session may incur a nominal administrative re-allocation fee.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">2. Digital Report Deliverables</h2>
          <p>
            Because each personalized layout blueprint and KP chart involves intensive manual calculation by our principal researcher, fees paid for digital reports that have already commenced processing or have been dispatched are non-refundable.
          </p>

          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-6">3. Refund Processing Timeline</h2>
          <p>
            Eligible refund requests approved by our accounts desk are processed within 5-7 business days back to the original payment method (Bank account, UPI, or Credit/Debit card).
          </p>
        </div>
      </div>
    </div>
  );
}
