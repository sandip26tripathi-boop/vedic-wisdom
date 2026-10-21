import React, { useState } from 'react';
import { X, Compass, Smartphone, Magnet, Eye, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../../types/index.ts';

interface CompassCalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
  onSelectDegree?: (degree: number, zoneName: string) => void;
}

const ZONES_16 = [
  { nameEn: 'North (N)', nameHi: 'उत्तर (N)', min: 348.75, max: 11.25, center: 0, element: 'Water', color: 'text-cyan-600' },
  { nameEn: 'North-North-East (NNE)', nameHi: 'उत्तर-उत्तर-पूर्व (NNE)', min: 11.25, max: 33.75, center: 22.5, element: 'Water', color: 'text-cyan-600' },
  { nameEn: 'North-East (NE)', nameHi: 'ईशान / उत्तर-पूर्व (NE)', min: 33.75, max: 56.25, center: 45, element: 'Water/Clarity', color: 'text-blue-600' },
  { nameEn: 'East-North-East (ENE)', nameHi: 'पूर्व-उत्तर-पूर्व (ENE)', min: 56.25, max: 78.75, center: 67.5, element: 'Air/Recreation', color: 'text-emerald-600' },
  { nameEn: 'East (E)', nameHi: 'पूर्व (E)', min: 78.75, max: 101.25, center: 90, element: 'Air/Social', color: 'text-emerald-600' },
  { nameEn: 'East-South-East (ESE)', nameHi: 'पूर्व-दक्षिण-पूर्व (ESE)', min: 101.25, max: 123.75, center: 112.5, element: 'Air/Churning', color: 'text-emerald-600' },
  { nameEn: 'South-East (SE)', nameHi: 'आग्नेय / दक्षिण-पूर्व (SE)', min: 123.75, max: 146.25, center: 135, element: 'Fire/Liquidity', color: 'text-rose-600' },
  { nameEn: 'South-South-East (SSE)', nameHi: 'दक्षिण-दक्षिण-पूर्व (SSE)', min: 146.25, max: 168.75, center: 157.5, element: 'Fire/Strength', color: 'text-rose-600' },
  { nameEn: 'South (S)', nameHi: 'दक्षिण (S)', min: 168.75, max: 191.25, center: 180, element: 'Fire/Relaxation', color: 'text-amber-600' },
  { nameEn: 'South-South-West (SSW)', nameHi: 'दक्षिण-दक्षिण-पश्चिम (SSW)', min: 191.25, max: 213.75, center: 202.5, element: 'Earth/Disposal', color: 'text-amber-700' },
  { nameEn: 'South-West (SW)', nameHi: 'नैऋत्य / दक्षिण-पश्चिम (SW)', min: 213.75, max: 236.25, center: 225, element: 'Earth/Relationships', color: 'text-amber-800' },
  { nameEn: 'West-South-West (WSW)', nameHi: 'पश्चिम-दक्षिण-पश्चिम (WSW)', min: 236.25, max: 258.75, center: 247.5, element: 'Space/Education', color: 'text-indigo-600' },
  { nameEn: 'West (W)', nameHi: 'पश्चिम (W)', min: 258.75, max: 281.25, center: 270, element: 'Space/Gains', color: 'text-indigo-600' },
  { nameEn: 'West-North-West (WNW)', nameHi: 'पश्चिम-उत्तर-पश्चिम (WNW)', min: 281.25, max: 303.75, center: 292.5, element: 'Space/Depression', color: 'text-indigo-600' },
  { nameEn: 'North-West (NW)', nameHi: 'वायव्य / उत्तर-पश्चिम (NW)', min: 303.75, max: 326.25, center: 315, element: 'Air/Support', color: 'text-teal-600' },
  { nameEn: 'North-North-West (NNW)', nameHi: 'उत्तर-उत्तर-पश्चिम (NNW)', min: 326.25, max: 348.75, center: 337.5, element: 'Water/Attraction', color: 'text-teal-600' }
];

export const CompassCalibrationModal: React.FC<CompassCalibrationModalProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
  onSelectDegree
}) => {
  const isHi = currentLang === 'hi';
  const [degree, setDegree] = useState<number>(0);

  if (!isOpen) return null;

  // Determine current active zone based on degree
  const activeZone = ZONES_16.find(z => {
    if (z.min > z.max) {
      // Wraps around 360 (North)
      return degree >= z.min || degree < z.max;
    }
    return degree >= z.min && degree < z.max;
  }) || ZONES_16[0];

  const handleApply = () => {
    if (onSelectDegree) {
      onSelectDegree(degree, isHi ? activeZone.nameHi : activeZone.nameEn);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compass-calibration-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-50/50 dark:bg-slate-950/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-700 dark:text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 id="compass-calibration-title" className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                {isHi ? "स्मार्टफोन कंपास कैलिब्रेशन गाइड" : "Smartphone Compass Calibration Guide"}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {isHi ? "60-सेकंड में अपने घर के मुख्य द्वार की सही दिशा ज्ञात करें" : "60-second visual protocol to capture precise main entrance orientation"}
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

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* 3 Step Protocol Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
              {isHi ? "तीन चरणों की सरल विधि" : "Three-Step Precision Protocol"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center">1</span>
                    <Compass className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {isHi ? "ब्रह्मस्थान (केंद्र) में खड़े हों" : "Stand at the Center (Brahmasthan)"}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                    {isHi ? "घर अथवा फ्लैट के अनुमानित केंद्र भाग में स्थिर खड़े हों।" : "Position yourself approximately at the geometric center of the flat or residence."}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center">2</span>
                    <Magnet className="w-4 h-4 text-rose-500" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {isHi ? "धातु व ग्रिल से दूर रहें" : "Clear Metallic Interference"}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                    {isHi ? "फोन को हथेली पर क्षैतिज रखें, लोहे के गेट या इन्वर्टर से कम से कम 3 फीट दूर।" : "Hold phone horizontally flat, keeping at least 3 feet away from iron grilles, inverters, and heavy speakers."}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center">3</span>
                    <Eye className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {isHi ? "बाहर देखते हुए डिग्री दर्ज करें" : "Face Outward at Main Door"}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                    {isHi ? "घर से बाहर निकलते समय जिस दिशा में मुख होता है, वह डिग्री नोट करें।" : "Face the exterior entrance as if walking out. The degree shown is your primary facing."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Degree Dial & 16-Zone Visualizer */}
          <div className="p-5 rounded-2xl bg-amber-50/40 dark:bg-slate-950/60 border border-amber-500/25 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB]">
                  {isHi ? "इंटरएक्टिव दिशा चयनकर्ता" : "Interactive Direction Calibrator"}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isHi ? "स्लाइडर को घुमाकर अपने कंपास की डिग्री चुनें" : "Drag the slider to match your phone's compass degree reading"}
                </p>
              </div>

              <div className="text-right">
                <span className="font-mono text-2xl font-black text-amber-600 dark:text-amber-400">
                  {degree}°
                </span>
              </div>
            </div>

            {/* Slider */}
            <div>
              <input
                type="range"
                min="0"
                max="359"
                value={degree}
                onChange={(e) => setDegree(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                aria-label="Direction degree slider"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300 mt-1.5">
                <span>0° N</span>
                <span>90° E</span>
                <span>180° S</span>
                <span>270° W</span>
                <span>359°</span>
              </div>
            </div>

            {/* Calculated Zone Preview Badge */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300 block">
                  {isHi ? "पहचाना गया 16-वास्तु ज़ोन" : "Calibrated 16-Zone Cardinal Sector"}
                </span>
                <span className={`text-sm sm:text-base font-bold ${activeZone.color}`}>
                  {isHi ? activeZone.nameHi : activeZone.nameEn}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300 block">
                  {isHi ? "संबद्ध तत्व" : "Dominant Element"}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB]">
                  {activeZone.element}
                </span>
              </div>
            </div>
          </div>

          {/* Precision Note */}
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              {isHi
                ? "यदि आपके पास सटीक डिग्री नहीं है, तो चिंता न करें। फ़्लोर प्लान जमा करने के बाद हमारे मुख्य सलाहकार Google Earth सैटेलाइट मैपिंग द्वारा भी मुख्य द्वार की पुष्टि करते हैं।"
                : "If you are unsure of the exact degree, our advisory desk verifies orientation during review using verified high-resolution satellite coordinate geometry."}
            </span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-3 bg-slate-50 dark:bg-slate-950">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {isHi ? "बंद करें" : "Close"}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{isHi ? `यह दिशा चुनें (${degree}°)` : `Apply Selected Facing (${degree}°)`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
