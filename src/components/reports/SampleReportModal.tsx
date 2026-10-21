import React, { useState } from 'react';
import { 
  X, 
  Compass, 
  FileText, 
  Download, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Eye,
  CalendarCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { Language } from '../../types/index.ts';

interface SampleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
  onOpenBooking?: () => void;
}

export const SampleReportModal: React.FC<SampleReportModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
  onOpenBooking
}) => {
  const isHi = currentLang === 'hi';
  const [activeTab, setActiveTab] = useState<'vastu' | 'astro'>('vastu');

  if (!isOpen) return null;

  const handleDownloadSample = () => {
    // Generate watermarked downloadable text preview
    const sampleText = activeTab === 'vastu' 
      ? `=== VEDIC WISDOM — WATERMARKED SAMPLE AUDIT ===\n` +
        `Document Type: 16-Zone Spatial Vastu Blueprint (Sample Redacted Layout)\n` +
        `Principal Consultant: Sandeep K. Tripathi (M.Sc. Mathematics)\n` +
        `Methodology: Classical Directional Vastu & Complete Non-Demolition Alignment\n\n` +
        `[1] BRAHMASTHAN (Center Zone): Open space, uncluttered geometry.\n` +
        `[2] NORTH (0° - 15°): Water elemental quadrant; clean flow recommended.\n` +
        `[3] NORTH-EAST (30° - 60°): Ishanya clarity zone; light blue color frequency.\n` +
        `[4] SOUTH-EAST (120° - 150°): Agneya fire quadrant; cooktop alignment.\n` +
        `[5] SOUTH-WEST (210° - 240°): Nairutya stability axis; master bedroom.\n` +
        `[6] RECTIFICATION SUMMARY: Non-invasive brass/copper strip floor balancing.\n\n` +
        `*Disclaimer: Traditional observational guidance only. Book private session at https://vedic-wisdom-ant.vercel.app*`
      : `=== VEDIC WISDOM — WATERMARKED SAMPLE ASTROLOGICAL DOSSIER ===\n` +
        `Document Type: Classical Vedic Cycle Matrix (Sample Redacted Chart)\n` +
        `Principal Consultant: Sandeep K. Tripathi (M.Sc. Mathematics)\n` +
        `Methodology: KP Cuspal Interlinks (CIL) & Vimshottari Transit Timeline\n\n` +
        `[1] ASCENDANT DEGREE & SUB-LORD: Lahiri Ayanamsa computation.\n` +
        `[2] ACTIVE DASHA-BHUKTI: Decision-making seasons and planetary transits.\n` +
        `[3] CAREER & WEALTH HOUSES (2nd, 6th, 10th, 11th): Periodic opportunity review.\n` +
        `[4] DIRECTIONAL COGNITION: Mindful self-reflection framework without fatalism.\n\n` +
        `*Disclaimer: Traditional observational guidance only. Book private session at https://vedic-wisdom-ant.vercel.app*`;

    const blob = new Blob([sampleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vedic-Wisdom-Sample-${activeTab.toUpperCase()}-Preview.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sample-report-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-700 dark:text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sample-report-title" className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                {isHi ? "पारदर्शी सैंपल ऑडिट पूर्वावलोकन" : "Transparent Sample Audit Preview"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isHi ? "बुकिंग से पूर्व देखें कि आपको कैसी विस्तृत रिपोर्ट प्राप्त होगी" : "Review the exact structure and depth of our delivered client dossiers"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex space-x-3">
          <button
            type="button"
            onClick={() => setActiveTab('vastu')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'vastu'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>{isHi ? "टैब A: 16-ज़ोन वास्तु ब्लूप्रिंट" : "Tab A: 16-Zone Spatial Vastu Blueprint"}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('astro')}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'astro'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isHi ? "टैब B: शास्त्रीय वैदिक चक्र मैट्रिक्स" : "Tab B: Classical Vedic Cycle Matrix"}</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* TAB A: 16-ZONE VASTU BLUEPRINT PREVIEW */}
          {activeTab === 'vastu' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Sample Visual Mockup */}
              <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-slate-950/60 border border-amber-500/25 relative overflow-hidden">
                {/* Watermark Label */}
                <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest font-extrabold text-amber-600/40 select-none">
                  CONFIDENTIAL SAMPLE WATERMARK
                </div>

                <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 dark:text-[#F3E5AB] mb-3">
                  <Building className="w-4 h-4 text-amber-600" />
                  <span>{isHi ? "सैंपल फ़्लोर प्लान दिशात्मक विश्लेषण (Redacted CAD Overlay)" : "Sample Floor Plan Directional Analysis (Redacted CAD Overlay)"}</span>
                </div>

                {/* Simulated Blueprint Grid */}
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono">
                  <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-800">
                    <span className="font-bold text-cyan-800 dark:text-cyan-300 block">NORTH (0°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Water Element</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">Balanced Flow</span>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-300 dark:border-blue-800">
                    <span className="font-bold text-blue-800 dark:text-blue-300 block">NORTH-EAST (45°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Ishanya Clarity</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">Light Tones Applied</span>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">EAST (90°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Air / Social</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">Open Window Axis</span>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-300 dark:border-indigo-800">
                    <span className="font-bold text-indigo-800 dark:text-indigo-300 block">WEST (270°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Space / Gains</span>
                    <span className="text-[10px] text-amber-600 font-bold block mt-1">Dining / Study</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/50 border-2 border-dashed border-amber-600">
                    <span className="font-bold text-amber-900 dark:text-amber-200 block">BRAHMASTHAN</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300">Central Pivot</span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold block mt-1">Completely Uncluttered</span>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800">
                    <span className="font-bold text-rose-800 dark:text-rose-300 block">SOUTH-EAST (135°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Fire / Kitchen</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">Cooktop Aligned</span>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-800">
                    <span className="font-bold text-teal-800 dark:text-teal-300 block">NORTH-WEST (315°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Vayavya Support</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block mt-1">Guest Room</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block">SOUTH (180°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Relaxation Axis</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block mt-1">Living Lounge</span>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-900/40 border border-amber-400 dark:border-amber-700">
                    <span className="font-bold text-amber-950 dark:text-amber-200 block">SOUTH-WEST (225°)</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">Earth / Anchoring</span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold block mt-1">Master Bedroom</span>
                  </div>
                </div>
              </div>

              {/* Sample Deliverables List */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {isHi ? "रिपोर्ट में शामिल प्रमुख अनुभाग:" : "Key Blueprint Sections:"}
                </h4>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Exact cardinal degree calculation overlay matching satellite coordinates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Non-demolition elemental band recommendations (brass, copper, and color frequencies)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Specific furniture orientation & electronic equipment distribution plan</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB B: CLASSICAL VEDIC CYCLE MATRIX PREVIEW */}
          {activeTab === 'astro' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-slate-950/60 border border-amber-500/25 relative overflow-hidden">
                <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest font-extrabold text-amber-600/40 select-none">
                  CONFIDENTIAL SAMPLE WATERMARK
                </div>

                <div className="flex items-center space-x-2 text-xs font-bold text-amber-900 dark:text-[#F3E5AB] mb-3">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{isHi ? "शास्त्रीय जन्मकुंडली व दशा-गोचर समय चक्र (Sample Redacted Analysis)" : "Classical Kundli & Dasha Transit Milestone Breakdown"}</span>
                </div>

                {/* Simulated Chart Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-[10px] font-bold uppercase text-slate-600 dark:text-slate-400">
                      <tr>
                        <th className="p-2 border-r border-slate-200 dark:border-slate-700">Planet / Cusp</th>
                        <th className="p-2 border-r border-slate-200 dark:border-slate-700">Degree & Sign</th>
                        <th className="p-2 border-r border-slate-200 dark:border-slate-700">Star / Nakshatra</th>
                        <th className="p-2">Sub-Lord (KP)</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-[11px] divide-y divide-slate-200 dark:divide-slate-800">
                      <tr>
                        <td className="p-2 font-bold border-r border-slate-200 dark:border-slate-700">Ascendant (Lagna)</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-700">14° 22' Taurus</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-700">Rohini (Moon)</td>
                        <td className="p-2 text-emerald-600 font-bold">Jupiter</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold border-r border-slate-200 dark:border-slate-700">Sun</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-700">28° 10' Leo</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-700">Uttara Phalguni</td>
                        <td className="p-2 text-amber-600 font-bold">Mercury</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold border-r border-slate-200 dark:border-slate-700">10th Cusp (Career)</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-700">08° 45' Aquarius</td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-700">Shatabhisha (Rahu)</td>
                        <td className="p-2 text-cyan-600 font-bold">Venus</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    {isHi ? "दशा विश्लेषण सारांश:" : "Vimshottari Dasha Horizon:"}
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                    {isHi 
                      ? "वर्तमान में बुध महादशा व गुरु अंतर्दशा का प्रभाव। यह कालखंड व्यावसायिक निर्णय, ज्ञान संवर्धन व संपत्ति विन्यास के लिए अत्यंत अनुकूल है।"
                      : "Currently under Mercury Mahadasha and Jupiter Antardasha. Strategic window for contract negotiations, institutional alignment, and spatial stability."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Methodology Assurance */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 flex items-start space-x-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-[11px] text-emerald-900 dark:text-emerald-200 leading-relaxed">
              {isHi 
                ? "सभी डिलीवर किए जाने वाले डॉसियर में आपके परिसर के सटीक माप, रंगीन ज़ोनल ओवरले और स्पष्ट लिखित निर्देश शामिल होते हैं।" 
                : "All delivered client reports include high-resolution CAD zonal overlays, structured tabular readings, and step-by-step non-demolition instructions."}
            </span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950">
          <button
            type="button"
            onClick={handleDownloadSample}
            className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHi ? "वाटरमार्क सैंपल डाउनलोड करें" : "Download Watermarked Sample Preview"}</span>
          </button>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
            >
              {isHi ? "बंद करें" : "Close"}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenBooking) onOpenBooking();
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{isHi ? "परामर्श बुक करें" : "Proceed to Booking"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
