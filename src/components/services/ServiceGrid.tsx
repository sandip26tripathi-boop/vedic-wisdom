import React from 'react';
import { 
  Building, 
  Home, 
  Briefcase, 
  Compass, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  FileSpreadsheet,
  CalendarCheck
} from 'lucide-react';
import { Language } from '../../types/index.ts';
import { useCurrency } from '../../context/CurrencyContext.tsx';

interface ServiceGridProps {
  currentLang?: Language;
  onOpenBooking?: (serviceId: string) => void;
  onOpenSampleReport?: () => void;
}

interface ServiceCardData {
  id: string;
  titleEn: string;
  titleHi: string;
  badgeEn: string;
  badgeHi: string;
  descEn: string;
  descHi: string;
  deliverablesEn: string[];
  deliverablesHi: string[];
  turnaroundEn: string;
  turnaroundHi: string;
  inrPrice: number;
  usdPrice: number;
  icon: React.ElementType;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  currentLang = 'en',
  onOpenBooking,
  onOpenSampleReport
}) => {
  const isHi = currentLang === 'hi';
  const { formatPrice } = useCurrency();

  const services: ServiceCardData[] = [
    {
      id: 'flat-vastu',
      titleEn: 'Flat & Apartment Vastu',
      titleHi: 'फ्लैट एवं अपार्टमेंट वास्तु',
      badgeEn: 'Non-Structural Spatial Alignment',
      badgeHi: 'बिना तोड़-फोड़ ऊर्जा संतुलन',
      descEn: 'Zonal rebalancing tailored specifically for fixed civil boundaries in modern high-rise residential apartments.',
      descHi: 'अपार्टमेंट्स एवं आधुनिक फ्लैट्स की निश्चित दीवारों में बिना तोड़-फोड़ रंग पट्टियों व धातु तारों से दिशा संतुलन।',
      deliverablesEn: [
        '16-Zone directional mapping on your apartment CAD layout',
        'Main entrance energy rectification via non-invasive metal strips',
        'Kitchen fire-water axis balancing & master bedroom alignment',
        '30-minute private one-on-one video consultation'
      ],
      deliverablesHi: [
        'आपके फ्लैट के नक्शे पर 16-दिशाओं का विस्तृत चक्र',
        'मुख्य द्वार का धातु पट्टियों द्वारा गैर-तोड़फोड़ संतुलन',
        'रसोई में अग्नि-जल विरोध निवारण एवं शयनकक्ष दिशा निर्धारण',
        '30-मिनट का व्यक्तिगत वीडियो परामर्श'
      ],
      turnaroundEn: '48 business hours',
      turnaroundHi: '48 कार्य घंटे',
      inrPrice: 2499,
      usdPrice: 49,
      icon: Building
    },
    {
      id: 'villa-vastu',
      titleEn: 'Independent House & Villa Vastu',
      titleHi: 'स्वतंत्र मकान एवं कोठी वास्तु',
      badgeEn: 'Boundary-to-Core Energy Mapping',
      badgeHi: 'चारदीवारी से ब्रह्मस्थान तक संपूर्ण संतुलन',
      descEn: 'Comprehensive spatial alignment from boundary perimeter to core Brahmasthan, encompassing multi-floor levels and water tanks.',
      descHi: 'प्लॉट सीमा, मुख्य द्वार, बोरवेल, ओवरहेड टैंक और बहु-मंजिला कमरों का शास्त्रीय ऊर्जा संतुलन।',
      deliverablesEn: [
        'External boundary & main gate cardinal degree evaluation',
        'Underground/overhead water reservoir and septic tank review',
        'Staircase rotational spin & Brahmasthan decluttering protocol',
        '45-minute comprehensive audio/video consultation + PDF audit'
      ],
      deliverablesHi: [
        'बाहरी सीमा, मुख्य फाटक व परिसर ढलान का दिशात्मक विश्लेषण',
        'भूमिगत जल, सेप्टिक टैंक व ओवरहेड टैंक का शास्त्रीय समाधान',
        'सीढ़ियों का घुमाव एवं ब्रह्मस्थान शोधन निर्देशिका',
        '45-मिनट का विस्तृत वीडियो कॉल + डिजिटल पीडीएफ ऑडिट'
      ],
      turnaroundEn: '48-72 business hours',
      turnaroundHi: '48-72 कार्य घंटे',
      inrPrice: 4999,
      usdPrice: 89,
      icon: Home
    },
    {
      id: 'office-vastu',
      titleEn: 'Commercial & Office Vastu',
      titleHi: 'व्यापारिक एवं कार्यालय वास्तु',
      badgeEn: 'Executive Stability & Flow Dynamics',
      badgeHi: 'नेतृत्व स्थिरता व कार्यक्षमता संवर्धन',
      descEn: 'Strategic workspace orientation focusing on leadership desk placement, accounts stability, client reception, and workforce productivity.',
      descHi: 'डायरेक्टर चेयर, अकाउंट्स, कॉन्फ्रेंस रूम और टीम उत्पादकता के लिए व्यावसायिक दिशात्मक अनुकूलन।',
      deliverablesEn: [
        'Managing Director & key executive seating orientation',
        'Accounts & cash-flow zone (South-East / North) rebalancing',
        'Reception & client greeting alignment for positive negotiation',
        'Complete executive dossier + 45-minute priority review'
      ],
      deliverablesHi: [
        'निदेशक व प्रमुख अधिकारियों के बैठने की अनुकूल दिशा',
        'अकाउंट्स व वित्तीय प्रवाह क्षेत्र (आग्नेय व उत्तर) का संतुलन',
        'सार्थक सौदों हेतु रिसेप्शन व मीटिंग रूम का दिशात्मक नियोजन',
        'पूर्ण कॉर्पोरेट डॉसियर + 45-मिनट की प्राथमिकता कॉल'
      ],
      turnaroundEn: '72 business hours',
      turnaroundHi: '72 कार्य घंटे',
      inrPrice: 5999,
      usdPrice: 99,
      icon: Briefcase
    },
    {
      id: 'classical-kundli',
      titleEn: 'Classical Kundli Advisory',
      titleHi: 'शास्त्रीय जन्मकुंडली विश्लेषण',
      badgeEn: 'KP Cuspal Interlinks & Transits',
      badgeHi: 'केपी सब-लॉर्ड एवं गोचर चक्र',
      descEn: 'Deep-dive predictive astrological consultation focusing on dasha transit milestones and practical decision horizons — free from fatalistic fear.',
      descHi: 'विंशोत्तरी दशा, गोचर और केपी उप-स्वामी प्रणाली पर आधारित स्पष्ट, तार्किक व भय-मुक्त जीवन परामर्श।',
      deliverablesEn: [
        'High-precision Lahiri Ayanamsa natal chart computation',
        'Vimshottari Dasha-Bhukti-Antara timeline analysis',
        'Career transitions, relationship harmony & financial seasons',
        '30-minute private audio/video consultation'
      ],
      deliverablesHi: [
        'लाहिड़ी अयनांश आधारित शुद्ध जन्मपत्रिका गणना',
        'विंशोत्तरी दशा-भुक्ति-अंतर एवं आगामी गोचर कालखंड',
        'करियर, संबंध और आर्थिक निर्णय हेतु उपयुक्त समय चक्र',
        '30-मिनट का व्यक्तिगत ऑडियो/वीडियो परामर्श'
      ],
      turnaroundEn: '24-48 business hours',
      turnaroundHi: '24-48 कार्य घंटे',
      inrPrice: 1999,
      usdPrice: 39,
      icon: Compass
    },
    {
      id: 'integrated-astro-vastu',
      titleEn: 'Integrated Astro-Vastu Review',
      titleHi: 'एकीकृत एस्ट्रो-वास्तु समीक्षा',
      badgeEn: 'Personal Natal & Space Synergy',
      badgeHi: 'व्यक्तिगत ग्रह दशा व गृह ऊर्जा समन्वय',
      descEn: 'Synchronizing an individual’s ruling planetary dasha with the cardinal zones of their actual living space for cohesive harmony.',
      descHi: 'व्यक्ति की वर्तमान ग्रह दशा को उसके घर के 16 ज़ोनों से जोड़कर व्यक्तिगत समृद्धि व मानसिक शांति का तार्किक समन्वय।',
      deliverablesEn: [
        'Combined examination of birth dasha and residence floor plan',
        'Custom non-demolition color band & elemental placement chart',
        'Identification of planetary activations in physical quadrants',
        '60-minute in-depth session with Principal Consultant + Full Blueprint'
      ],
      deliverablesHi: [
        'जन्मपत्रिका की सक्रिय दशा व घर के नक्शे का एकीकृत परीक्षण',
        'व्यक्तिगत रंग, धातु पट्टियां एवं बिना तोड़-फोड़ वस्तु विन्यास',
        'घर के विभिन्न कोनों में सक्रिय ग्रहों की पहचान व संतुलन',
        'मुख्य सलाहकार के साथ 60-मिनट का सत्र + संपूर्ण ब्लूप्रिंट'
      ],
      turnaroundEn: '72 business hours',
      turnaroundHi: '72 कार्य घंटे',
      inrPrice: 6999,
      usdPrice: 119,
      icon: Sparkles
    }
  ];

  return (
    <section 
      id="services"
      aria-label={isHi ? "वास्तु एवं ज्योतिष परामर्श सेवाएं" : "Property-Specific Spatial & Astrological Services"}
      className="w-full py-12 lg:py-16 bg-[#FAF9F6] dark:bg-[#0B0F19] relative"
    >
      <div id="astro-vastu" className="absolute -top-24" aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHi ? "विशिष्ट संपत्ति-आधारित परामर्श" : "Property-Specific Niche Advisory"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100">
            {isHi 
              ? "तर्कसंगत, व्यावहारिक एवं गैर-तोड़फोड़ समाधान" 
              : "Practical, Logical & Non-Structural Solutions for Homes & Workplaces"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 max-w-2xl mx-auto">
            {isHi
              ? "प्रत्येक सेवा स्पष्ट समय-सीमा (SLA), पारदर्शी शुल्क और अनुभवी मुख्य सलाहकार के प्रत्यक्ष मार्गदर्शन के साथ प्रदान की जाती है।"
              : "Clear deliverables, defined turnaround timelines, dual-currency pricing, and direct consultation with Principal Researcher Sandeep K. Tripathi."}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-amber-500/40 transition-all flex flex-col justify-between p-6 relative group"
              >
                <div>
                  {/* Top Header Pill */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/25">
                      {isHi ? svc.badgeHi : svc.badgeEn}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100">
                    {isHi ? svc.titleHi : svc.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {isHi ? svc.descHi : svc.descEn}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
                      {isHi ? "शामिल मुख्य घटक (Deliverables):" : "Included Deliverables:"}
                    </span>
                    {(isHi ? svc.deliverablesHi : svc.deliverablesEn).map((del, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: SLA, Price & CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-3">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isHi ? `समय: ${svc.turnaroundHi}` : `SLA: ${svc.turnaroundEn}`}</span>
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-amber-900 dark:text-amber-300 font-mono">
                      {formatPrice(svc.inrPrice, svc.usdPrice)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {onOpenSampleReport && (
                      <button
                        type="button"
                        onClick={onOpenSampleReport}
                        className="w-full py-2 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <FileSpreadsheet className="w-3 h-3 text-amber-600" />
                        <span>{isHi ? "सैंपल देखें" : "Sample Audit"}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onOpenBooking ? onOpenBooking(svc.id) : window.location.assign('#pricing')}
                      className={`w-full py-2 rounded-xl text-[11px] font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-sm transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                        !onOpenSampleReport ? 'col-span-2' : ''
                      }`}
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>{isHi ? "बुक करें" : "Book Session"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
