import React, { useState } from 'react';
import { Language } from '../../types/index.ts';
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
  Search,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

interface FAQSectionProps {
  currentLang?: Language;
  onOpenBooking?: (serviceType?: string) => void;
}

interface FAQItem {
  id: string;
  category: 'renovation' | 'guarantees' | 'timeline' | 'privacy' | 'refunds';
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  currentLang = 'en',
  onOpenBooking
}) => {
  const isHi = currentLang === 'hi';
  const [openId, setOpenId] = useState<string | null>('faq_1');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      id: 'faq_1',
      category: 'renovation',
      qEn: 'Do I need structural renovation or demolition for Vastu rectification?',
      qHi: 'क्या वास्तु सुधार के लिए मुझे कोई तोड़-फोड़ अथवा नवीनीकरण करना होगा?',
      aEn: 'No, absolutely not. Our methodology is rooted strictly in non-structural spatial alignment. We harmonize directional energy imbalances using elemental color frequencies, brass and copper energy boundary strips, and furniture/equipment reorientation—keeping your civil walls and pre-built apartment structures entirely intact.',
      aHi: 'नहीं, बिल्कुल नहीं। हमारी संपूर्ण परामर्श पद्धति बिना किसी तोड़-फोड़ (Non-Structural Spatial Alignment) के सिद्धांतों पर आधारित है। हम दीवारों को तोड़े बिना तांबे व पीतल की पतली ऊर्जा पट्टियों, विशिष्ट रंग तरंगों, धातु तारों और आंतरिक सज्जा के दिशा-संतुलन द्वारा परिसर को सामंजस्य में लाते हैं।'
    },
    {
      id: 'faq_2',
      category: 'outcomes',
      qEn: 'Does classical astrology provide fixed or predetermined outcomes of the future?',
      qHi: 'क्या ज्योतिष भविष्य के पूर्व-निर्धारित अथवा अपरिवर्तनीय परिणाम का दावा करता है?',
      aEn: 'No. Classical Vedic and KP astrology is a traditional observational discipline that maps recurring cyclical time horizons (dasha and transit seasons), rather than fatalistic promises. It functions as a reflective strategic decision-making framework. No ethical consultant can make absolute promises of sudden wealth, medical healings, or predetermined outcomes.',
      aHi: 'नहीं। शास्त्रीय वैदिक व केपी ज्योतिष समय के चक्रीय रुझानों (दशा और गोचर) को समझने का एक पारंपरिक प्रेक्षणात्मक माध्यम है। यह जीवन व व्यापार में समयोचित निर्णय लेने का एक मार्गदर्शक ढांचा है, कोई अपरिवर्तनीय या जादुई दावा नहीं। हम किसी भी अवास्तविक दावे का कड़ाई से विरोध करते हैं।'
    },
    {
      id: 'faq_3',
      category: 'timeline',
      qEn: 'What is the delivery timeline and process for consultations and reports?',
      qHi: 'परामर्श व डिजिटल रिपोर्ट प्राप्त होने की प्रक्रिया और समय-सीमा (SLA) क्या है?',
      aEn: 'Within 48 to 72 business hours of submitting your floor plan and birth coordinates, your personalized digital assessment dossier is delivered via Email and PDF. Following delivery, a private 30 to 45-minute scheduled video/audio consultation is held with Principal Consultant Sandeep K. Tripathi, followed by 7 to 14 days of WhatsApp query follow-up.',
      aHi: 'आपके फ़्लोर प्लान व जन्म विवरण सबमिट करने के 48 से 72 कार्य घंटों के भीतर विस्तृत डिजिटल मूल्यांकन डॉसियर तैयार कर ईमेल/पीडीएफ पर भेजा जाता है। इसके पश्चात मुख्य सलाहकार संदीप के. त्रिपाठी जी के साथ 30-45 मिनट का शेड्यूल्ड वीडियो/ऑडियो कॉल आयोजित होता है, जिसके बाद 7-14 दिनों का व्हाट्सएप फॉलो-अप भी शामिल है।'
    },
    {
      id: 'faq_4',
      category: 'privacy',
      qEn: 'Will my personal natal details, contact number, and floor blueprints remain confidential?',
      qHi: 'क्या मेरी व्यक्तिगत जन्म कुंडली, मोबाइल नंबर और घर का नक्शा पूरी तरह सुरक्षित व गोपनीय रहेंगे?',
      aEn: 'Yes, strictly. All uploaded architectural blueprints, hand-drawn sketches, and personal natal coordinates are treated with institutional-grade confidentiality under the DPDP Act (India) and GDPR principles. Your data is end-to-end encrypted, never published, never shared with third parties, and permanently anonymized in all research case studies.',
      aHi: 'हाँ, शत-प्रतिशत। आपके द्वारा अपलोड किए गए सभी वास्तु नक्शे, स्केच, फोन नंबर और जन्म विवरण भारत के डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) एक्ट एवं वैश्विक GDPR मानकों के तहत एंड-टू-एंड एन्क्रिप्टेड स्टोरेज में सुरक्षित रहते हैं। इन्हें कभी भी किसी तीसरे पक्ष से साझा या सार्वजनिक नहीं किया जाता।'
    },
    {
      id: 'faq_5',
      category: 'refunds',
      qEn: 'What is your consultation rescheduling and refund policy?',
      qHi: 'सत्र रिशेड्यूलिंग एवं रिफंड की क्या नीति और शर्तें हैं?',
      aEn: 'You may reschedule your private consultation free of charge up to 24 hours prior to the scheduled call. Because each spatial blueprint and KP calculation requires intensive manual research and calculation by our senior consultant, digital deliverables that have already entered review or been generated are non-refundable, as detailed in our formal Refund Policy.',
      aHi: 'आप अपनी निर्धारित कॉल से 24 घंटे पूर्व तक बिना किसी अतिरिक्त शुल्क के सत्र को रिशेड्यूल कर सकते हैं। चूंकि प्रत्येक फ़्लोर प्लान और केपी चार्ट पर हमारे मुख्य शोधकर्ता द्वारा गहन व्यक्तिगत शोध किया जाता है, अतः डिजिटल रिपोर्ट तैयार होने के पश्चात वह अपरिवर्तनीय होती है, जैसा कि हमारी रिफंड नीति में स्पष्ट वर्णित है।'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    if (!searchQuery.trim()) return true;
    const q = isHi ? faq.qHi : faq.qEn;
    const a = isHi ? faq.aHi : faq.aEn;
    return q.toLowerCase().includes(searchQuery.toLowerCase()) || 
           a.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <section 
      id="faq" 
      aria-label={isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
      className="py-16 lg:py-20 bg-white dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>{isHi ? "तार्किक शंका समाधान" : "Consumer Hesitation & Clarity FAQ"}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isHi ? "अक्सर पूछे जाने वाले व्यावहारिक प्रश्न" : "Clear Answers to Common Hesitations"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            {isHi 
              ? "बिना तोड़-फोड़ वास्तु, शास्त्रीय ज्योतिष की सीमाओं और डेटा सुरक्षा से संबंधित सभी महत्वपूर्ण उत्तर।" 
              : "Direct transparency regarding non-structural methods, ethical boundaries, SLAs, and strict confidentiality."}
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHi ? "प्रश्न अथवा विषय खोजें..." : "Search common questions..."}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Search FAQs"
              />
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-amber-50/30 dark:bg-slate-900/90 border-amber-500/40 shadow-md ring-1 ring-amber-500/20'
                    : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer space-x-3"
                >
                  <h3 className="text-xs sm:text-sm font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {isHi ? faq.qHi : faq.qEn}
                  </h3>
                  <div className={`p-1.5 rounded-full shrink-0 transition-transform ${
                    isOpen ? 'bg-amber-600 text-white rotate-180' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-amber-500/15">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {isHi ? faq.aHi : faq.aEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Helpline Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-white to-emerald-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-serif font-bold text-slate-900 dark:text-slate-100">
                {isHi ? "क्या आपका कोई अन्य विशिष्ट प्रश्न है?" : "Have a Specific Property Layout Question?"}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {isHi ? "हमारे रिसर्च डेस्क से व्हाट्सएप पर निःसंकोच बात करें।" : "Chat directly with our central advisory desk on WhatsApp."}
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919009448601?text=Namaste%20Sandeep%20ji%2C%20I%20have%20a%20specific%20question%20regarding%20a%20Property%20Vastu%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-950 dark:text-emerald-200 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all flex items-center space-x-1.5 shrink-0"
            aria-label="Direct WhatsApp Inquiry"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span>+91 90094 48601</span>
          </a>
        </div>

      </div>
    </section>
  );
};
