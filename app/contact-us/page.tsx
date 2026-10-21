import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact Us & Grievance Redressal | Vedic Wisdom',
  description: 'Connect with the Vedic Wisdom central advisory and research desk in Bhopal, India.'
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mb-4">
          Contact & Grievance Redressal
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          For consultation bookings, corporate property evaluations, technical inquiries, or data privacy grievance redressal, please reach our central research desk:
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start space-x-3.5">
            <Mail className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">Official Communication Desk</span>
              <a href="mailto:ask.vedicwisdom@gmail.com" className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-medium hover:underline">
                ask.vedicwisdom@gmail.com
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start space-x-3.5">
            <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">Direct WhatsApp & Client Helpline</span>
              <a href="https://wa.me/919009448601" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 font-medium hover:underline">
                +91 90094 48601
              </a>
              <span className="text-[11px] text-slate-500 block mt-0.5">Mon - Sat: 10:00 AM – 7:00 PM IST</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start space-x-3.5">
            <MapPin className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">Central Research & Lineage Office</span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Bhopal, Madhya Pradesh 462001, India
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/25 flex items-start space-x-3.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">Designated Grievance & Compliance Officer</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-normal mt-0.5">
                For formal notices or data privacy requests under the India DPDP Act, contact: <span className="font-semibold">Compliance Lead, Vedic Wisdom Advisory</span>. Response within 48 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
