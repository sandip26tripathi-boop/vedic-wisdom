import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, AlertCircle, RefreshCw, Mail, Phone, MapPin } from 'lucide-react';
import { Language } from '../../types/index.ts';

export type LegalDocType = 'privacy' | 'terms' | 'refund' | 'disclaimer' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
  currentLang?: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'disclaimer',
  currentLang = 'en'
}) => {
  const isHi = currentLang === 'hi';
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  if (!isOpen) return null;

  const docs = [
    { id: 'disclaimer' as LegalDocType, titleEn: 'Statutory Disclaimer', titleHi: 'सांविधिक अस्वीकरण' },
    { id: 'privacy' as LegalDocType, titleEn: 'Privacy & DPDP Policy', titleHi: 'गोपनीयता नीति (DPDP)' },
    { id: 'terms' as LegalDocType, titleEn: 'Terms of Service', titleHi: 'सेवा की शर्तें' },
    { id: 'refund' as LegalDocType, titleEn: 'Rescheduling & Refund', titleHi: 'रिशेड्यूलिंग व रिफंड' },
    { id: 'contact' as LegalDocType, titleEn: 'Grievance & Contact', titleHi: 'संपर्क व शिकायत निवारण' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <h2 id="legal-modal-title" className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
              {isHi ? "वैधानिक अनुपालन एवं नीतियां" : "Statutory Compliance & Legal Framework"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap gap-2 overflow-x-auto">
          {docs.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActiveDoc(doc.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeDoc === doc.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {isHi ? doc.titleHi : doc.titleEn}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {/* 1. DISCLAIMER */}
          {activeDoc === 'disclaimer' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-950 dark:text-[#F3E5AB]">
                <h3 className="font-bold text-sm mb-1.5 flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Mandatory Statutory Positioning</span>
                </h3>
                <p className="leading-relaxed">
                  "Disclaimer: Consultations and spatial reports are traditional advisory practices rooted in classical Indian observational sciences. They are intended solely for personal, directional, and architectural planning. They do not substitute for certified medical, psychological, legal, financial, or licensed structural engineering advice. Individual perspectives and experiences may vary."
                </p>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">1. Observational Advisory Scope</h4>
              <p>
                All spatial energy balancing (Vastu) and astrological reviews (Krishnamurti Padhdhati / KP Cuspal Interlinks) provided by Vedic Wisdom and Sandeep K. Tripathi are classical interpretive consultations. They do not make promises regarding future events, fixed financial yields, employment assurances, or medical treatments.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">2. Non-Structural & Architectural Clarification</h4>
              <p>
                Recommendations regarding elemental placements (metallic strips, colors, room orientations) are intended as non-invasive spatial harmony suggestions. They do not constitute certified civil engineering, structural stability certifications, or municipal building code authorisations. Clients must consult licensed architects and civil engineers before any physical alteration.
              </p>
            </div>
          )}

          {/* 2. PRIVACY POLICY */}
          {activeDoc === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-200">
                <h3 className="font-bold text-sm mb-1 flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>DPDP Act (India) & Global GDPR Compliance Commitment</span>
                </h3>
                <p className="text-xs leading-relaxed">
                  "Client Confidentiality Commitment: All uploaded blueprints, sketches, and personal natal details are strictly confidential, protected via end-to-end encrypted storage, and never published or shared with third parties."
                </p>
              </div>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">1. Data Minimization & Usage</h4>
              <p>
                We only collect data strictly necessary to prepare your consultation: (a) Architectural floor plans and sketches, (b) Date, time, and geographic place of birth for astrological calculations, (c) Contact WhatsApp/Phone and email address for report dispatch.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">2. Permanent Anonymization in Case Studies</h4>
              <p>
                Any educational references, before-and-after studies, or anonymized testimonials used on our website have client names, apartment numbers, street addresses, and identifiable CAD markers completely redacted.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">3. Right to Erasure</h4>
              <p>
                Clients may request the permanent deletion of their uploaded floor plans and natal details at any time by emailing us at <span className="font-mono text-amber-600">ask.vedicwisdom@gmail.com</span>.
              </p>
            </div>
          )}

          {/* 3. TERMS OF SERVICE */}
          {activeDoc === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">1. Advisory Agreement</h4>
              <p>
                By booking a session or downloading a digital report from Vedic Wisdom, you acknowledge that you are commissioning a classical observational study based on Vedic literature and KP astrology methodologies.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">2. Intellectual Property</h4>
              <p>
                All custom blueprints, calculation matrices, and written reports generated by Vedic Wisdom are copyrighted works provided for personal and internal business planning. Commercial redistribution or republishing of our blueprints without written consent is strictly prohibited.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">3. Limitation of Liability</h4>
              <p>
                In no event shall Vedic Wisdom or its principal consultants be liable for business decisions, personal investments, emotional outcomes, or architectural actions undertaken independently by the client.
              </p>
            </div>
          )}

          {/* 4. REFUND & RESCHEDULING */}
          {activeDoc === 'refund' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">1. Complimentary Rescheduling</h4>
              <p>
                We understand enterprise schedules can shift. Clients may reschedule their consultation session up to 24 hours prior to the booked time slot at zero penalty. Simply notify us via WhatsApp or email.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">2. Digital Report Deliverables</h4>
              <p>
                Because each floor plan analysis and KP astrological chart is manually calculated and drafted by our senior research desk, fees paid for digital reports that have already entered review or been dispatched to the client's email are non-refundable.
              </p>

              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">3. Cancellation Before Analysis</h4>
              <p>
                If a cancellation is requested within 2 hours of booking and prior to the initiation of architectural drawing review, a full refund (minus payment processing gateway fees) will be processed to the original payment source within 5-7 business days.
              </p>
            </div>
          )}

          {/* 5. CONTACT & GRIEVANCE */}
          {activeDoc === 'contact' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Direct Advisory Desk & Grievance Redressal</h4>
              <p>
                For official correspondence, enterprise queries, or privacy compliance requests, contact our central research desk:
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Official Email:</strong> ask.vedicwisdom@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Direct WhatsApp / Helpline:</strong> +91 90094 48601</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span><strong>Central Research Desk:</strong> Bhopal, Madhya Pradesh 462001, India</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Grievance Officer:</strong> Compliance Lead, Vedic Wisdom Advisory</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            {isHi ? "समझ लिया (बंद करें)" : "Close & Acknowledge"}
          </button>
        </div>

      </div>
    </div>
  );
};
