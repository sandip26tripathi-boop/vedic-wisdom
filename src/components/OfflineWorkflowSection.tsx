import React from 'react';
import { Language } from '../types/index.ts';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  FileCheck2,
  Users
} from 'lucide-react';

interface OfflineWorkflowSectionProps {
  currentLang: Language;
  onOpenBooking: (serviceType?: string) => void;
}

export const OfflineWorkflowSection: React.FC<OfflineWorkflowSectionProps> = ({
  currentLang,
  onOpenBooking
}) => {
  const steps = [
    {
      step: '01',
      badgeEn: 'Preliminary Assessment',
      badgeHi: 'प्रारंभिक मूल्यांकन',
      titleEn: 'Digital Intake & Blueprint Submission',
      titleHi: 'डिजिटल इनटेक एवं लेआउट सबमिशन',
      descEn: 'Submit your birth coordinates or architectural CAD floorplans online. Our research desk registers your case dossier and conducts preliminary cuspal/zonal verification.',
      descHi: 'अपने जन्म विवरण या फैक्ट्री/कार्यालय का सीएडी लेआउट ऑनलाइन जमा करें। हमारी भोपाल रिसर्च डेस्क आपकी केस फाइल तैयार कर प्रारंभिक जांच करती है।',
      icon: <FileCheck2 className="w-6 h-6 text-[#D4AF37]" />,
      actionEn: 'Online Step',
      actionHi: 'ऑनलाइन प्रक्रिया'
    },
    {
      step: '02',
      badgeEn: 'Scriptural Verification',
      badgeHi: 'पारंपरिक विश्लेषण',
      titleEn: 'Bhopal Research Desk Analysis',
      titleHi: 'भोपाल रिसर्च डेस्क द्वारा गहन परीक्षण',
      descEn: 'Master Sandeep K. Tripathi & Ravindra Pathak analyze authentic KP Sub-Sub Lord cuspal interlinks and map environmental energy vectors across 16 cardinal zones.',
      descHi: 'संदीप के. त्रिपाठी एवं रवींद्र पाठक जी द्वारा केपी कस्पल इंटरलिंक्स एवं 16 दिशाओं के ऊर्जा ग्रिड का शास्त्रीय विश्लेषण कर डायग्नोस्टिक रिपोर्ट तैयार की जाती है।',
      icon: <Cpu className="w-6 h-6 text-amber-500" />,
      actionEn: 'Offline Research Desk',
      actionHi: 'ऑफ़लाइन रिसर्च डेस्क'
    },
    {
      step: '03',
      badgeEn: '0% Non-Demolition Site Visit',
      badgeHi: 'शून्य तोड़-फोड़ ऑन-साइट विजिट',
      titleEn: 'On-Site Energy Balancing Rectification',
      titleHi: 'ऑन-साइट ऊर्जा संशोधन',
      descEn: 'Our senior specialists visit your manufacturing facility, corporate HQ, or residence, embedding pure copper/lead energy helixes to balance spatial energies without breaking walls.',
      descHi: 'वरिष्ठ विशेषज्ञ आपकी फैक्ट्री या संपत्ति पर आकर ऊर्जा स्तर मापते हैं और बिना तोड़-फोड़ 99.9% शुद्ध कॉपर/लेड एनर्जी स्ट्रिप्स स्थापित करते हैं।',
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      actionEn: 'On-Site Offline Execution',
      actionHi: 'ऑन-साइट ऑफ़लाइन कार्य'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] dark:bg-[#0B0F19] border-t border-[#D4AF37]/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLang === 'en' ? 'Empirical Offline Delivery Model' : 'विश्वसनीय ऑफ़लाइन कार्यप्रणाली'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? (
              <>How We Work: <span className="gold-gradient-text">From Coordinates to On-Site Rectification</span></>
            ) : (
              <>हमारी कार्यप्रणाली: <span className="gold-gradient-text">ऑनलाइन जानकारी से लेकर ऑन-साइट ऊर्जा सुधार तक</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentLang === 'en'
              ? 'This portal provides preliminary tools and diagnostic orientation. All definitive industrial audits, Lecher antenna calibrations, and 1-on-1 KP consultations are executed with rigorous offline privacy.'
              : 'यह पोर्टल प्रारंभिक जानकारी व टूल्स प्रदान करता है। सभी वास्तविक औद्योगिक ऑडिट, लेचर एंटीना जांच और व्यक्तिगत केपी परामर्श पूरी गोपनीयता के साथ ऑफ़लाइन संपन्न होते हैं।'}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="relative rounded-3xl p-7 bg-white dark:bg-[#111827] border border-[#D4AF37]/35 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              {/* Step Number Watermark */}
              <div className="absolute top-4 right-5 text-4xl font-mono font-black text-slate-100 dark:text-slate-800/80 pointer-events-none select-none">
                {item.step}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB]">
                    {currentLang === 'en' ? item.badgeEn : item.badgeHi}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5">
                  {currentLang === 'en' ? item.titleEn : item.titleHi}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {currentLang === 'en' ? item.descEn : item.descHi}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{currentLang === 'en' ? item.actionEn : item.actionHi}</span>
                </span>
                <span className="text-xs font-bold text-slate-400">Step {item.step}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Action Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-[#1E293B] to-[#0B0F19] text-white border border-[#D4AF37]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-bold text-[#F3E5AB]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{currentLang === 'en' ? 'Serving Pan-India, UAE & Global GCC Hubs' : 'अखिल भारतीय स्तर, दुबई एवं खाड़ी देशों में ऑन-साइट सेवाएं'}</span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              {currentLang === 'en' 
                ? 'Ready to Request an Offline Factory or Kundli Verification?' 
                : 'क्या आप अपनी फैक्ट्री या कुंडली के ऑफ़लाइन सत्यापन हेतु तैयार हैं?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {currentLang === 'en'
                ? 'Directly connect with the Bhopal Research Desk on WhatsApp (+91 90094 48601) or schedule an engineer site visit.'
                : 'भोपाल रिसर्च डेस्क से सीधे व्हाट्सएप (+91 90094 48601) पर संपर्क करें या ऑन-साइट इंजीनियर विजिट शेड्यूल करें।'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking('industrial')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'Schedule Site Audit' : 'ऑन-साइट ऑडिट शेड्यूल करें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/919009448601?text=Hello%20Vedic%20Wisdom,%20I%20would%20like%20to%20schedule%20an%20offline%20consultation/factory%20audit."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Hotline</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
