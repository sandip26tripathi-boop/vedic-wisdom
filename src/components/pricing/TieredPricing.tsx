import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Download, 
  ArrowRight, 
  UserCheck, 
  Layers, 
  Zap, 
  Calendar,
  Lock,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { Language } from '../../types/index.ts';
import { useCurrency, CurrencyToggle } from '../../context/CurrencyContext.tsx';

interface TieredPricingProps {
  currentLang?: Language;
  onOpenBooking?: (tierId: string) => void;
  onOpenSampleReport?: () => void;
}

export const TieredPricing: React.FC<TieredPricingProps> = ({
  currentLang = 'en',
  onOpenBooking,
  onOpenSampleReport
}) => {
  const isHi = currentLang === 'hi';
  const { formatPrice, userTzAbbr } = useCurrency();

  // Tier 0 Free Hook state
  const [freeHookName, setFreeHookName] = useState('');
  const [freeHookContact, setFreeHookContact] = useState('');
  const [isFreeHookClaimed, setIsFreeHookClaimed] = useState(false);

  const handleFreeHookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeHookContact.trim()) return;
    setIsFreeHookClaimed(true);

    // Provide instant automated PDF checklist download trigger
    const link = document.createElement('a');
    link.href = '/assets/Vedic-Wisdom-Non-Demolition-Vastu-Checklist.txt';
    link.download = 'Vedic-Wisdom-Non-Demolition-Vastu-Checklist.txt';
    // Fallback: create client-side text download if file doesn't exist
    const blob = new Blob([
      `VEDIC WISDOM — NON-DEMOLITION SPATIAL VASTU QUICK CHECKLIST\n` +
      `Principal Consultant: Sandeep K. Tripathi\n` +
      `Client: ${freeHookName || 'Valued Seeker'}\n` +
      `Date: ${new Date().toLocaleDateString()}\n\n` +
      `1. NORTH (0° - 15°): Keep clutter-free; optimal for water element and financial growth.\n` +
      `2. NORTH-EAST (30° - 60°): Avoid heavy overhead weight; preserve light and mental clarity.\n` +
      `3. SOUTH-EAST (120° - 150°): Ideal kitchen fire quadrant; avoid blue/black floor colors.\n` +
      `4. SOUTH-WEST (210° - 240°): Grounding earth quadrant; prime for master bedroom & stability.\n` +
      `5. BRAHMASTHAN (Center): Keep open and unburdened by heavy civil pillars.\n\n` +
      `For comprehensive multi-zone evaluation, book your consultation at https://vedic-wisdom-ant.vercel.app`
    ], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tiers = [
    {
      id: 'tier-1',
      titleEn: 'Directional Snapshot',
      titleHi: 'दिशात्मक स्नैपशॉट',
      badgeEn: 'Single Floor Plan',
      badgeHi: 'एकल फ़्लोर प्लान',
      isPopular: false,
      inrPrice: 499,
      usdPrice: 19,
      turnaroundEn: '24 business hours',
      turnaroundHi: '24 कार्य घंटे',
      descEn: 'Digital 16-zone assessment summary for 1 residential floor layout delivered via Email & PDF.',
      descHi: 'एक आवासीय फ़्लोर प्लान के लिए 16-ज़ोन का त्वरित दिशात्मक मूल्यांकन, ईमेल व पीडीएफ द्वारा प्रेषित।',
      featuresEn: [
        '16-Zone cardinal compass overlay on your layout',
        'Top 3 non-structural remedial recommendations',
        'Main entrance classification & element status',
        'Official Digital PDF Summary (No Call Included)'
      ],
      featuresHi: [
        'नक्शे पर 16-दिशाओं का डिजिटल कंपास ग्रिड',
        'शीर्ष 3 गैर-तोड़फोड़ दिशात्मक सुधार सुझाव',
        'मुख्य प्रवेश द्वार की दिशा व तत्वीय स्थिति',
        'डिजिटल सारांश पीडीएफ (कॉल शामिल नहीं)'
      ],
      ctaEn: 'Get Snapshot',
      ctaHi: 'स्नैपशॉट प्राप्त करें'
    },
    {
      id: 'tier-2',
      titleEn: 'Core Consultation',
      titleHi: 'मुख्य व्यक्तिगत परामर्श',
      badgeEn: 'Most Popular Choice',
      badgeHi: 'सर्वाधिक लोकप्रिय चयन',
      isPopular: true,
      inrPrice: 2499,
      usdPrice: 49,
      turnaroundEn: '48 business hours',
      turnaroundHi: '48 कार्य घंटे',
      descEn: 'Comprehensive Property Audit OR Detailed Kundli Review + 30-min private 1-on-1 video/audio call + 7 days query support.',
      descHi: 'विस्तृत वास्तु ऑडिट अथवा संपूर्ण कुंडली विश्लेषण + 30-मिनट का व्यक्तिगत लाइव परामर्श सत्र + 7 दिनों का व्हाट्सएप सपोर्ट।',
      featuresEn: [
        'Detailed zonal analysis or KP cuspal transit evaluation',
        '30-minute private one-on-one video/audio consultation',
        'Room-by-room practical non-demolition recommendations',
        '7 days post-consultation WhatsApp query follow-up'
      ],
      featuresHi: [
        'विस्तृत दिशात्मक ऑडिट अथवा केपी कुंडली विश्लेषण',
        '30-मिनट का व्यक्तिगत आमने-सामने वीडियो/ऑडियो परामर्श',
        'प्रत्येक कमरे के अनुसार व्यावहारिक बिना तोड़-फोड़ समाधान',
        'परामर्श उपरांत 7 दिनों तक व्हाट्सएप पर प्रश्न समाधान'
      ],
      ctaEn: 'Book Core Session',
      ctaHi: 'सत्र बुक करें'
    },
    {
      id: 'tier-3',
      titleEn: 'Master Astro-Vastu Blueprint',
      titleHi: 'मास्टर एस्ट्रो-वास्तु ब्लूप्रिंट',
      badgeEn: 'Enterprise & Comprehensive',
      badgeHi: 'संपूर्ण विस्तृत ब्लूप्रिंट',
      isPopular: false,
      inrPrice: 6999,
      usdPrice: 119,
      turnaroundEn: '48-72 business hours',
      turnaroundHi: '48-72 कार्य घंटे',
      descEn: 'Full residential/commercial layout analysis + personal astro-chart integration + 45-min live consultation + custom placement plan.',
      descHi: 'संपूर्ण आवासीय/व्यावसायिक नक्शा + व्यक्तिगत कुंडली दशा समन्वय + 45-मिनट का लाइव सत्र + धातु व रंग विन्यास ब्लूप्रिंट।',
      featuresEn: [
        'Complete layout audit + birth dasha astronomical sync',
        '45-minute deep-dive session with Principal Consultant',
        'Customized metallic strip & color element placement guide',
        '14 days priority WhatsApp follow-up & revision review'
      ],
      featuresHi: [
        'संपूर्ण संपत्ति ऑडिट + जन्म कुंडली दशा का दिशात्मक समन्वय',
        'मुख्य सलाहकार संदीप जी के साथ 45-मिनट का गहन परामर्श',
        'विस्तृत धातु पट्टी, तांबा/पीतल तार एवं रंग संतुलन चार्ट',
        '14 दिनों का प्राथमिकता व्हाट्सएप फॉलो-अप व संशोधन समीक्षा'
      ],
      ctaEn: 'Book Master Blueprint',
      ctaHi: 'मास्टर ब्लूप्रिंट बुक करें'
    }
  ];

  return (
    <section 
      id="pricing"
      aria-label={isHi ? "शुल्क एवं परामर्श योजनाएं" : "Transparent Tiered Pricing & SLAs"}
      className="w-full py-12 lg:py-16 bg-white dark:bg-[#0B0F19]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header with Currency & Timezone Bar */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHi ? "पारदर्शी शुल्क व सेवा स्तर समझौता" : "Transparent Pricing & Defined SLAs"}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100">
            {isHi ? "अपनी आवश्यकता अनुसार सही परामर्श चुनें" : "Select Your Tailored Advisory Tier"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
            {isHi 
              ? "बिना किसी छुपे हुए शुल्क के। सभी योजनाएं स्पष्ट कार्य-अवधि, गोपनीयता प्रतिबद्धता और अनुभवी मार्गदर्शन के साथ आती हैं।" 
              : "Zero hidden charges. Transparent domestic (₹ INR) and international ($ USD) schedules with confirmed turnaround commitments."}
          </p>

          {/* Interactive Currency Switcher */}
          <div className="mt-5 flex items-center space-x-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isHi ? "मुद्रा चुनें:" : "Billing Currency:"}
            </span>
            <CurrencyToggle />
          </div>
        </div>

        {/* TIER 0: FREE ENTRY HOOK (QUICK VASTU DIRECTION CHECKER) */}
        <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 border border-amber-500/30 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB] mb-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>{isHi ? "टियर 0: निःशुल्क प्रवेश टूल" : "Tier 0: Instant Free Entry Tool"}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">
                {isHi ? "त्वरित वास्तु दिशा चेकर व 1-पेज चेकलिस्ट" : "Quick Vastu Direction Checker & 1-Page Non-Demolition Checklist"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {isHi 
                  ? "घर के मुख्य 5 कोनों (उत्तर, ईशान, आग्नेय, नैऋत्य, ब्रह्मस्थान) की त्वरित स्व-समीक्षा हेतु तैयार की गई व्यावहारिक चेकलिस्ट तुरंत डाउनलोड करें।"
                  : "Instant downloadable reference guide for the 5 cardinal quadrants of your home. Clear, logical tips to evaluate your space before booking a private consultation."}
              </p>
              <div className="mt-3 flex items-center space-x-4 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isHi ? "तुरंत डाउनलोड" : "Instant Download"}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isHi ? "स्पैम-मुक्त गोपनीयता" : "Strict Zero-Spam Policy"}</span>
                </span>
              </div>
            </div>

            {/* Lead Capture Form */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              {isFreeHookClaimed ? (
                <div className="text-center py-3 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 mx-auto flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {isHi ? "चेकलिस्ट डाउनलोड हो गई है!" : "Checklist Downloaded!"}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {isHi 
                      ? "फ़ाइल आपकी डिवाइस में सहेज ली गई है। विस्तृत समीक्षा हेतु नीचे दिए गए टियर चुनें।" 
                      : "Your PDF guide has been saved to your downloads. For personalized layout review, explore our consultation tiers below."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFreeHookSubmit} className="space-y-3">
                  <input
                    type="text"
                    value={freeHookName}
                    onChange={(e) => setFreeHookName(e.target.value)}
                    placeholder={isHi ? "आपका नाम" : "Your Name"}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    required
                    value={freeHookContact}
                    onChange={(e) => setFreeHookContact(e.target.value)}
                    placeholder={isHi ? "व्हाट्सएप / ईमेल दर्ज करें *" : "Enter WhatsApp / Email *"}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isHi ? "निःशुल्क चेकलिस्ट डाउनलोड करें" : "Download Free Vastu Checklist"}</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* TIERS 1 - 3: MONETIZATION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                tier.isPopular
                  ? 'bg-gradient-to-b from-amber-500/10 via-white to-amber-500/5 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-2 border-amber-600 shadow-xl shadow-amber-900/10 ring-2 ring-amber-500/20'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                  {isHi ? tier.badgeHi : tier.badgeEn}
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100">
                    {isHi ? tier.titleHi : tier.titleEn}
                  </h3>
                  {!tier.isPopular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {isHi ? tier.badgeHi : tier.badgeEn}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 min-h-[36px] leading-relaxed">
                  {isHi ? tier.descHi : tier.descEn}
                </p>

                {/* Price Display */}
                <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-slate-900 dark:text-slate-100 font-mono">
                      {formatPrice(tier.inrPrice, tier.usdPrice)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {isHi ? "/ परामर्श" : "/ session"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-amber-800 dark:text-amber-400 mt-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isHi ? `टर्नअराउंड: ${tier.turnaroundHi}` : `Delivery SLA: ${tier.turnaroundEn}`}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 block">
                    {isHi ? "शामिल सुविधाएं:" : "Package Inclusions:"}
                  </span>
                  {(isHi ? tier.featuresHi : tier.featuresEn).map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onOpenBooking ? onOpenBooking(tier.id) : window.location.assign('#floor-plan-intake')}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                    tier.isPopular
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-amber-900/20'
                      : 'bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isHi ? tier.ctaHi : tier.ctaEn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* SLA COMMITMENTS STRIP (PROMINENT TRUST FOOTER) */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{isHi ? "टर्नअराउंड: 48-72 व्यावसायिक घंटे" : "Turnaround: 48-72 Business Hours"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isHi ? "सख्त गोपनीयता व एन्क्रिप्टेड डेटा" : "Confidential Redacted Data (DPDP & GDPR)"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>{isHi ? "7-14 दिन अनुवर्ती व्हाट्सएप समाधान" : "7-14 Days Query Follow-Up Support"}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
