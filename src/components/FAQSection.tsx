import React, { useState } from 'react';
import { Language } from '../types/index.ts';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  MessageCircle, 
  Building2, 
  Compass, 
  Lock,
  Search
} from 'lucide-react';

interface FAQSectionProps {
  currentLang: Language;
  onOpenBooking: (serviceType?: string) => void;
}

interface FAQItem {
  id: string;
  category: 'vastu' | 'astrology' | 'process' | 'confidentiality';
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  currentLang,
  onOpenBooking
}) => {
  const [openId, setOpenId] = useState<string | null>('faq_1');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      id: 'faq_1',
      category: 'vastu',
      qEn: 'What is 0% Non-Demolition Spatial Vastu? Will we have to tear down civil walls or move heavy machinery?',
      qHi: '0% बिना तोड़-फोड़ (Non-Demolition) ऊर्जा वास्तु क्या है? क्या हमें कोई दीवार या मशीनरी तोड़नी होगी?',
      aEn: 'Absolutely not. Vedic Wisdom provides a 100% Zero-Demolition Guarantee. Established under the empirical research of Ravindra Pathak and Sandeep K. Tripathi, our methodology harmonizes fire-water and earth-space elemental clashes using 99.9% pure elemental copper/brass energy strips, 9-unit lead helix pyramids, and color spectrum deflectors without breaking a single brick or stopping factory production.',
      aHi: 'बिल्कुल नहीं। वैदिक विजडम 100% शून्य तोड़-फोड़ की गारंटी देता है। रवींद्र पाठक एवं संदीप त्रिपाठी जी के शोध के अनुसार, हम 99.9% शुद्ध कॉपर/ब्रास एनर्जी स्ट्रिप्स, लेड हेलिक्स पिरामिड और ऊर्जा विखंडन तकनीक द्वारा बिना कोई दीवार तोड़े और बिना फैक्ट्री का काम रोके पूर्ण वास्तु संशोधन करते हैं।'
    },
    {
      id: 'faq_2',
      category: 'astrology',
      qEn: 'How does KP Cuspal Interlink (CIL) Astrology differ from traditional Vedic astrology?',
      qHi: 'केपी कस्पल इंटरलिंक्स (KP Cuspal Interlinks - CIL) ज्योतिष सामान्य फलित ज्योतिष से कैसे भिन्न है?',
      aEn: 'Traditional astrology often relies on broad 30-degree sign transits which can be ambiguous. KP Cuspal Interlinks operates with classical Sub-Sub Lord scriptural analysis (dividing each sign into micro-cuspal coordinates). This allows definitive traditional guidance and timeline windows for business M&A, capital fundraise (houses 2, 6, 10, 11), tender bids, and litigation navigation.',
      aHi: 'सामान्य ज्योतिष 30-अंश की विस्तृत राशियों पर आधारित होता है। इसके विपरीत केपी कस्पल इंटरलिंक प्रणाली प्रत्येक भाव के सब-सब लॉर्ड (Sub-Sub Lord) की शास्त्रीय जांच करती है। इससे व्यापारिक विस्तार, टेंडर जीत, शेयर बाजार लाभ (भाव 2-6-10-11) और कानूनी मामलों के शास्त्रसम्मत समय का आकलन संभव होता है।'
    },
    {
      id: 'faq_3',
      category: 'process',
      qEn: 'How does an offline On-Site Factory / Real Estate Audit work?',
      qHi: 'औद्योगिक फैक्ट्रियों व व्यावसायिक परिसरों हेतु ऑन-साइट ऑफ़लाइन ऑडिट कैसे संपन्न होता है?',
      aEn: 'The workflow has three clear phases: (1) Preliminary online review of your CAD architectural floorplans and promoter horoscopes at our Bhopal Research Desk. (2) Physical on-site visit by senior specialists using calibrated Lecher Antennas to detect subterranean water veins and geopathic stress lines. (3) On-site installation of elemental energy boundary strips and pyramids with immediate Lecher frequency verification.',
      aHi: 'प्रक्रिया तीन चरणों में होती है: (1) आपकी फैक्ट्री के सीएडी फ्लोरप्लान और प्रवर्तक की कुंडली का भोपाल रिसर्च डेस्क पर प्रारंभिक अध्ययन। (2) वरिष्ठ विशेषज्ञों द्वारा फैक्ट्री में आकर लेचर एंटीना से भू-गर्भीय जल धाराओं व जियोपैथिक तनाव का परीक्षण। (3) ऑन-साइट ही ऊर्जा स्ट्रिप्स व पिरामिड स्थापित कर लेचर एंटीना द्वारा तत्काल ऊर्जा स्तर का सत्यापन।'
    },
    {
      id: 'faq_4',
      category: 'astrology',
      qEn: 'How authentic is the online Janam Kundli and Lagna generation tool on this page?',
      qHi: 'इस पेज पर दिया गया जन्म कुंडली और लग्न कैलकुलेटर कितना प्रामाणिक है?',
      aEn: 'Our online calculator uses authentic Chitrapaksha / Lahiri Ayanamsa, true Greenwich Sidereal Time (LST), and reliable geographic coordinates across world cities. It calculates the classical Lagna, Moon sign, Nakshatra Pada, and planetary house placements according to ancient Vedic traditions. For deeper cuspal sub-sub lords and Dasha-Bhukti-Antara forecasting, Master Sandeep K. Tripathi provides complete 1-on-1 offline sessions.',
      aHi: 'हमारा ऑनलाइन कैलकुलेटर वास्तविक लाहिड़ी अयनांश, ग्रीनविच साइडरियल टाइम और दुनिया भर के शहरों के प्रामाणिक अक्षांश-देशांतर पर आधारित है। यह पारंपरिक वैदिक पद्धति के अनुसार सही लग्न, चंद्र राशि, नक्षत्र पाद और 12 भावों की स्थिति निकालता है। इसके आगे के सूक्ष्म केपी सब-सब लॉर्ड्स व दशा विश्लेषण हेतु संदीप त्रिपाठी जी ऑफ़लाइन व्यक्तिगत परामर्श सत्र लेते हैं।'
    },
    {
      id: 'faq_5',
      category: 'confidentiality',
      qEn: 'Are our industrial architectural CAD blueprints and promoter birth data kept confidential?',
      qHi: 'क्या हमारी फैक्ट्री के ब्लूप्रिंट्स और जन्म विवरण पूरी तरह गोपनीय रखे जाते हैं?',
      aEn: 'Yes, 100%. We routinely serve manufacturing conglomerates, top corporate leaders, and high-net-worth families under strict corporate Non-Disclosure Agreements (NDAs). Your factory coordinates, financial milestones, and Kundli details are never shared or commercialized.',
      aHi: 'जी हाँ, शत-प्रतिशत। हम शीर्ष औद्योगिक घरानों और व्यावसायिक लीडर्स के साथ सख्त गैर-प्रकटीकरण समझौते (NDA) के तहत कार्य करते हैं। आपकी फैक्ट्री का नक्शा, वित्तीय आंकड़े और जन्म विवरण पूरी तरह गोपनीय रहते हैं।'
    },
    {
      id: 'faq_6',
      category: 'process',
      qEn: 'How can clients outside Madhya Pradesh, in Delhi NCR, Mumbai, or overseas (Dubai / GCC) book a session?',
      qHi: 'मध्य प्रदेश से बाहर, दिल्ली एनसीआर, मुंबई या दुबई (खाड़ी देशों) के ग्राहक कैसे परामर्श ले सकते हैं?',
      aEn: 'Our research desk is based at 178 Maple High Street, Bhopal, but our team regularly travels across India (Delhi NCR, Mumbai, Ahmedabad, Bengaluru, Hyderabad) and GCC (Dubai, Abu Dhabi, Doha) for on-site audits. 1-on-1 astrology consultations can also be conducted via private video conference or at our Bhopal Headquarters.',
      aHi: 'हमारा मुख्यालय 178 मेपल हाई स्ट्रीट, भोपाल में है, किंतु हमारी विशेषज्ञ टीम दिल्ली, मुंबई, गुजरात, बेंगलुरु तथा दुबई/खाड़ी देशों में ऑन-साइट ऑडिट हेतु नियमित दौरा करती है। व्यक्तिगत केपी परामर्श सीधे भोपाल केंद्र पर या सुरक्षित वीडियो कॉन्फ्रेंस द्वारा भी लिया जा सकता है।'
    },
    {
      id: 'faq_7',
      category: 'vastu',
      qEn: 'Can spatial Vastu defects cause delayed receivables, cash flow crunches, or machine breakdowns?',
      qHi: 'क्या वास्तु दोषों के कारण फंसा हुआ धन (पेमेंट ब्लॉकेज) या मशीनरी ब्रेकडाउन हो सकता है?',
      aEn: 'Yes, emphatically. In our empirical spatial framework, delayed receivables and sluggish cash flows frequently correlate with clutter or red/fire elements in the North (Kuber - Water) zone. Frequent machine breakdowns or hydraulic leaks typically trace to geopathic stress faults in the South-West (Nairutya - Earth) or transformer clashes in the South-East (Agneya). Neutralizing these energetic leaks restores operational throughput.',
      aHi: 'हाँ, निश्चित रूप से। हमारे शोध के अनुसार, अटके हुए पेमेंट्स प्रायः उत्तर दिशा (कुबेर क्षेत्र) में गंदगी, लाल रंग या अग्नि तत्व के कारण होते हैं। भारी मशीनों का बार-बार खराब होना नैऋत्य (दक्षिण-पश्चिम) में जियोपैथिक तनाव या आग्नेय (दक्षिण-पूर्व) में अग्नि-जल के टकराव से जुड़ा होता है। ऊर्जा स्ट्रिप्स से इन्हें संतुलित करते ही सकारात्मक परिणाम मिलते हैं।'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const textEn = (faq.qEn + ' ' + faq.aEn).toLowerCase();
    const textHi = (faq.qHi + ' ' + faq.aHi).toLowerCase();
    return textEn.includes(query) || textHi.includes(query);
  });

  return (
    <section id="faq" className="py-20 bg-white dark:bg-[#0B0F19] border-t border-[#D4AF37]/20 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>{currentLang === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {currentLang === 'en' ? (
              <>Clarity & Truth: <span className="gold-gradient-text">Non-Superstitious Insights</span></>
            ) : (
              <>शास्त्रसम्मत समाधान: <span className="gold-gradient-text">तार्किक एवं पारंपरिक उत्तर</span></>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {currentLang === 'en'
              ? 'Clear answers regarding our 100% Non-Demolition Vastu, KP Cuspal Interlinks, and offline site consultation workflow.'
              : 'शून्य तोड़-फोड़ वास्तु, केपी कस्पल इंटरलिंक्स एवं ऑफ़लाइन ऑन-साइट विजिट से संबंधित सभी प्रश्नों के स्पष्ट उत्तर।'}
          </p>

          {/* Quick Search Input */}
          <div className="pt-3 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                id="faq-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentLang === 'en' ? 'Search questions (e.g. factory, demolition, timing)...' : 'प्रश्न खोजें (जैसे फैक्ट्री, तोड़-फोड़, केपी)...'}
                aria-label={currentLang === 'en' ? 'Search frequently asked questions' : 'प्रश्न खोजें'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5 mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-amber-50/40 dark:bg-slate-800/80 border-[#D4AF37]/50 shadow-md'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-[#D4AF37]/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="min-h-[48px] w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-cinzel text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {currentLang === 'en' ? faq.qEn : faq.qHi}
                    </span>
                    <div className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#D4AF37] text-slate-950 rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`faq-answer-${faq.id}`} className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
                      <p>{currentLang === 'en' ? faq.aEn : faq.aHi}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              {currentLang === 'en' ? 'No matching questions found. Ask us directly on WhatsApp below.' : 'कोई प्रश्न नहीं मिला। नीचे दिए व्हाट्सएप पर सीधे पूछें।'}
            </div>
          )}
        </div>

        {/* Bottom Direct Inquiry Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-amber-500/10 border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {currentLang === 'en' ? 'Have a Specific Factory or Kundli Question?' : 'क्या आपकी फैक्ट्री या कुंडली से जुड़ा कोई विशेष प्रश्न है?'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentLang === 'en'
                ? 'Speak directly with Master Sandeep K. Tripathi & Ravindra Pathak’s research desk.'
                : 'संदीप के. त्रिपाठी एवं रवींद्र पाठक जी की भोपाल रिसर्च डेस्क से सीधे परामर्श लें।'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/919009448601?text=Namaste%20Vedic%20Wisdom,%20I%20have%20a%20specific%20question%20regarding%20an%20offline%20audit/consultation."
              target="_blank"
              rel="noopener noreferrer"
              aria-label={currentLang === 'en' ? "Contact Vedic Wisdom research desk on WhatsApp for FAQ inquiries" : "प्रश्नोत्तरी हेतु रिसर्च डेस्क से व्हाट्सएप पर संपर्क करें"}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Hotline</span>
            </a>
            <button
              onClick={() => onOpenBooking('astrology')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:opacity-95 transition-all shadow-sm cursor-pointer"
            >
              {currentLang === 'en' ? 'Book 1-on-1' : 'परामर्श बुक करें'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
