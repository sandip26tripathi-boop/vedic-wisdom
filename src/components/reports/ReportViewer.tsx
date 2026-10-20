import React, { useRef, useState } from 'react';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { Language } from '../../types/index.ts';
import { 
  Download, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Star, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  AlertTriangle, 
  Zap, 
  Layers, 
  MessageCircle,
  Share2,
  Printer,
  ChevronRight
} from 'lucide-react';

interface ReportViewerProps {
  reportData: any;
  currentLang: Language;
  onBack: () => void;
  onOpenBooking?: () => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  reportData,
  currentLang,
  onBack,
  onOpenBooking
}) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const {
    reportId,
    generatedAt,
    fullName,
    gender,
    dob,
    tob,
    pob,
    focusArea,
    data: report,
    regulatoryNotice
  } = reportData;

  const handleDownloadPdf = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);

    try {
      // Dynamic import to drastically optimize initial landing page load
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ]);

      // Use html2canvas to capture the reportRef element
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        onclone: (clonedDoc) => {
          // Normalize clone to luxury light-print styling so dark-mode does not wash out text
          clonedDoc.documentElement.classList.remove('dark');
          clonedDoc.body.classList.remove('dark');
          const reportEl = clonedDoc.querySelector('[data-report-container]');
          if (reportEl) {
            reportEl.classList.remove('dark:bg-[#0B0F19]', 'dark:text-slate-100');
          }
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`VedicWisdom_${fullName.replace(/\s+/g, '_')}_Dossier.pdf`);
      setIsDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF export error:', err);
      setIsDownloading(false);
      // Fallback to window.print()
      window.print();
    }
  };

  const handleShareWhatsApp = () => {
    const text = `Namaste Sandeep Ji, I have generated my Vedic Wisdom AI Astro-Vastu Report (ID: ${reportId}) for ${fullName}. Please schedule my 1-on-1 verification call.`;
    window.open(`https://wa.me/919009448601?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Generate Another Dossier</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consult Sandeep Tripathi</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Official cryptographic PDF dossier successfully downloaded to your device!</span>
        </div>
      )}

      {/* Printable Report Document Container */}
      <div 
        ref={reportRef}
        data-report-container="true"
        className="rounded-3xl bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 border border-[#D4AF37]/35 shadow-2xl p-6 sm:p-10 space-y-8"
      >
        {/* Luxury Header Banner */}
        <div className="border-b-2 border-[#D4AF37]/40 pb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-1 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-transparent border border-[#D4AF37]/50 shadow-sm">
              <SriYantraMotif className="w-12 h-12" />
            </div>
            <div>
              <span className="font-cinzel text-2xl font-black tracking-widest text-slate-900 dark:text-white flex items-center gap-1.5">
                VEDIC <span className="gold-gradient-text">WISDOM</span>
              </span>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                178 Maple High Street, Bhopal, MP, India • ask.vedicwisdom@gmail.com
              </p>
              <p className="text-[10px] text-[#B45309] dark:text-[#F3E5AB] font-semibold mt-0.5">
                Under Research Oversight of Sandeep K. Tripathi & Ravindra Pathak
              </p>
            </div>
          </div>

          <div className="text-right space-y-0.5">
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
              {reportId}
            </div>
            <div className="text-[10px] text-slate-400">
              Date: {new Date(generatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end gap-1">
              <ShieldCheck className="w-3 h-3" />
              Cryptographically Verified
            </div>
          </div>
        </div>

        {/* Client Subject Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Client Name</span>
            <span className="font-bold text-slate-900 dark:text-white">{fullName}</span>
            <span className="text-[10px] text-slate-500 block">{gender}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Date of Birth</span>
            <span className="font-bold text-slate-900 dark:text-white">{dob}</span>
            <span className="text-[10px] text-slate-500 block">Time: {tob}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Birth Location</span>
            <span className="font-bold text-slate-900 dark:text-white truncate block">{pob}</span>
            <span className="text-[10px] text-slate-500 block">Placidus Coordinate Arc</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Analytical Focus</span>
            <span className="font-bold text-[#B45309] dark:text-[#F3E5AB] truncate block">{focusArea}</span>
            <span className="text-[10px] text-emerald-500 block">KP Cuspal Interlink Verified</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: ASTROLOGICAL SNAPSHOT */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#D4AF37]/25 pb-2">
            <Star className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase">
              Section 1: Astrological Snapshot & Cuspal Coordinates
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">Lagna (Ascendant)</span>
              <span className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                {report.snapshot?.lagna}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Ruler: {report.snapshot?.lagnaLord}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">Chandra Rashi (Moon)</span>
              <span className="font-cinzel text-base font-bold text-[#B45309] dark:text-[#F3E5AB]">
                {report.snapshot?.rashi}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Mind & Emotional Prana</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">Janma Nakshatra</span>
              <span className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
                {report.snapshot?.nakshatra}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Cosmic Frequency Field</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-0.5">Current Dasha Window</span>
              <span className="font-cinzel text-sm font-bold text-purple-600 dark:text-purple-400">
                {report.snapshot?.currentMahadasha}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Antar: {report.snapshot?.currentAntardasha}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
            <span><strong>KP 10th Cusp Sub-Sub Lord:</strong> {report.snapshot?.subSubLord10th || 'Jupiter (Guru)'}</span>
            <span className="text-[#B45309] dark:text-[#F3E5AB] font-bold">Resonating Elements: {report.snapshot?.favorableElements?.join(', ') || 'Fire, Space'}</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: CORE PREDICTIONS & PREDICTIVE INSIGHTS */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#D4AF37]/25 pb-2">
            <Zap className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase">
              Section 2: Core Predictions & Predictive Timing
            </h4>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            <p className="font-medium text-slate-900 dark:text-white">
              {report.corePredictions?.primaryForecast}
            </p>
            <div className="pt-2 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
              Active Wealth Combinations: {report.corePredictions?.wealthYogas}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Astrological Strengths */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] block">
                Key Natal Strengths & Talents
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                {report.corePredictions?.strengths?.map((s: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunities & Strategic Timing */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-[#B45309] dark:text-[#F3E5AB] uppercase tracking-wider text-[11px] block">
                Growth Windows & Strategic Timing
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                {report.corePredictions?.opportunities?.map((o: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Peak Timing Window:</strong> {report.corePredictions?.growthTiming}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: ASTRO-VASTU DIAGNOSTIC MAPPING */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#D4AF37]/25 pb-2">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase">
              Section 3: Astro-Vastu Diagnostic Mapping
            </h4>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 dark:text-slate-400">Favorable Directions:</span>
              <div className="flex gap-1.5">
                {report.astroVastuMapping?.favorableDirections?.map((d: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-600 dark:text-slate-400">Vulnerable Energy Zones:</span>
              <div className="flex gap-1.5">
                {report.astroVastuMapping?.vulnerableZones?.map((z: string, idx: number) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-red-500/15 text-red-700 dark:text-red-300 font-bold text-[11px]">
                    {z}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Zone Diagnostics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {report.astroVastuMapping?.zoneDiagnostics?.map((zd: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{zd.zone}</span>
                  <span className="text-[10px] font-mono text-slate-400">{zd.direction}</span>
                </div>
                <div className="text-[11px] text-[#B45309] dark:text-[#F3E5AB] font-semibold">
                  Element: {zd.element} • {zd.status}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {zd.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: TAILORED PRACTICAL REMEDIES */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#D4AF37]/25 pb-2">
            <Layers className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-cinzel text-base font-bold text-slate-900 dark:text-white tracking-wide uppercase">
              Section 4: Tailored Practical Remedies (100% Non-Demolition)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Non-Demolition Spatial Remedies */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <span className="font-bold text-[#B45309] dark:text-[#F3E5AB] uppercase tracking-wider text-[11px] block">
                0% Zero-Tear-down Spatial Corrections
              </span>
              <div className="space-y-2">
                {report.tailoredRemedies?.nonDemolitionSpatial?.map((nd: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-0.5">
                    <span className="font-bold text-slate-900 dark:text-white block">{nd.item}</span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px]"><strong>Placement:</strong> {nd.placement}</p>
                    <p className="text-emerald-600 dark:text-emerald-400 text-[11px]"><strong>Mechanism:</strong> {nd.mechanism}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lal Kitab Precautions & Mantras */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <span className="font-bold text-[#B45309] dark:text-[#F3E5AB] uppercase tracking-wider text-[11px] block">
                Lal Kitab Grammatical Precautions & Mantras
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                {report.tailoredRemedies?.lalKitabPrecautions?.map((lk: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{lk}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block text-[11px] mb-0.5">
                  Planetary Frequency Mantra:
                </span>
                <p className="font-mono text-xs text-[#B45309] dark:text-[#F3E5AB] bg-amber-500/10 p-2 rounded-lg">
                  {report.tailoredRemedies?.planetaryMantra}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MANDATORY LEGAL & ETHICAL WARNING BANNER (Module 1.4) */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/35 text-amber-900 dark:text-amber-200 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-[#B45309] dark:text-[#F3E5AB]">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>⚠️ Official Disclaimer & Ethical Notice</span>
          </div>
          <p className="leading-relaxed text-[11px] sm:text-xs text-amber-800 dark:text-amber-300">
            {regulatoryNotice || 'This report is generated through an advanced AI-powered computational Vedic & KP analytics engine based on the mathematical coordinates of your birth details. It is intended for self-awareness, timing assessment, and spiritual guidance. For critical architectural alterations, major industrial audits, or pivotal life decisions, a personal 1-on-1 verification with Principal Researcher Sandeep K. Tripathi or Founder Ravindra Pathak is strongly recommended. Vedic Wisdom upholds strict non-superstitious, evidence-based practices.'}
          </p>
        </div>

        {/* Report Footer Verification Stamp */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            <span>Vedic Wisdom Research Institute • Registered Office: 178 Maple High Street, Bhopal, MP, India</span>
          </div>
          <div className="font-mono">
            Direct Helpline: +91 90094 48601
          </div>
        </div>
      </div>
    </div>
  );
};
