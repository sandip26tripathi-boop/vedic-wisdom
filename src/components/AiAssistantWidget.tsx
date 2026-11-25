'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  MessageSquare, X, Send, Sparkles, Compass, ShieldCheck, ArrowRight, Bot, User, PhoneCall 
} from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  actionText?: string;
  actionType?: 'wizard' | 'whatsapp';
}

export default function AiAssistantWidget() {
  const { language, openWizard } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        sender: 'ai',
        text: language === 'en'
          ? "Namaste! I am the Vedic Wisdom AI Assistant. I can guide you on 0% Demolition Astro-Vastu remedies, main entrance directions, toilet/kitchen placement, and international audits. How can I assist you today?"
          : "नमस्ते! मैं वैदिक विज़डम एआई असिस्टेंट हूँ। मैं आपको बिना तोड़फोड़ के वास्तु समाधान, मुख्य द्वार, रसोई व शौचालय दोष निवारण और जन्मकुंडली मिलान पर त्वरित जानकारी दे सकता हूँ। आप क्या जानना चाहते हैं?",
      }
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    {
      en: 'Toilet in North-East / South-East remedy?',
      hi: 'ईशान या आग्नेय कोण में शौचालय का बिना तोड़फोड़ उपाय?'
    },
    {
      en: 'Which main entrance directions are auspicious?',
      hi: 'कौन सी दिशा का मुख्य द्वार सबसे शुभ होता है?'
    },
    {
      en: 'How does 0% Demolition actually work?',
      hi: '0% बिना तोड़फोड़ वास्तु कैसे कार्य करता है?'
    },
    {
      en: 'How to fix industrial cash-flow & factory breakdowns?',
      hi: 'फैक्ट्री में नकदी प्रवाह और मशीनरी ब्रेकडाउन कैसे रोकें?'
    },
    {
      en: 'Can you audit overseas properties via Google Earth?',
      hi: 'क्या आप विदेश में स्थित घर का रिमोट ऑडिट करते हैं?'
    }
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    // Add user message
    const userMsg: ChatMessage = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Pre-trained rule-based AI logic
    setTimeout(() => {
      const lower = q.toLowerCase();
      let reply: ChatMessage;

      if (lower.includes('toilet') || lower.includes('bathroom') || lower.includes('शौचालय') || lower.includes('टॉयलेट')) {
        reply = {
          sender: 'ai',
          text: language === 'en'
            ? "Misplaced toilets in North-East (Water/Consciousness) or South-East (Fire/Cash flow) drain vital cosmic energies. Under our 0% Demolition protocol, we NEVER break walls. We insert a millimeter-thin 99.9% Electrolytic Copper Strip (for SE/East) or 316 Stainless Steel Wire (for NE) directly flush into the floor tile joint around the toilet pot. This cuts the draining gravitational suction 100% without structural damage."
            : "ईशान (NE) या आग्नेय (SE) कोण का शौचालय अत्यंत हानिकारक माना जाता है। हमारी 0% तोड़फोड़ पद्धति में हम कभी दीवार या फर्श नहीं तोड़ते। शौचालय पॉट के चारों ओर फर्श की टाइलों के जॉइंट में 99.9% शुद्ध कॉपर स्ट्रिप या स्टेनलेस स्टील वायर दबाकर उसकी नकारात्मक ऊर्जा को 100% काट दिया जाता है।",
          actionText: language === 'en' ? 'Book Toilet Audit Consultation' : 'शौचालय दोष ऑडिट बुक करें',
          actionType: 'wizard'
        };
      } else if (lower.includes('entrance') || lower.includes('door') || lower.includes('द्वार') || lower.includes('प्रवेश')) {
        reply = {
          sender: 'ai',
          text: language === 'en'
            ? "In Vedic 16-Zone MahaVastu, there are 32 distinct entrance padas. Auspicious padas include N3, N4 (Mukhya/Bhallat - enormous wealth), E3, E4 (Jayanta/Indra - high social prestige), and S3, S4. Entrances in South-South-West (disposal) or South-West can cause bankruptcy. We treat wrong entrances non-invasively using Brass, Lead, or Copper energy threshold bars and energized Vastu pyramids without relocating the physical door."
            : "16 दिशाओं में 32 मुख्य द्वार पद होते हैं। उत्तर के N3, N4 (कुबेर/धन) और पूर्व के E3, E4 (मान-सम्मान) अत्यंत शुभ होते हैं। दक्षिण-पश्चिम (SW) या एसएसडब्ल्यू के द्वार को गलत माना जाता है। बिना चौखट बदले हम देहरी पर ब्रास अथवा लेड धातु स्ट्रिप और प्राण-प्रतिष्ठित पिरामिड स्थापित कर दोष को पूर्णतः शांत करते हैं।",
          actionText: language === 'en' ? 'Audit My Entrance Pada' : 'मुख्य द्वार का पद जांचें',
          actionType: 'wizard'
        };
      } else if (lower.includes('0%') || lower.includes('demolition') || lower.includes('तोड़फोड़') || lower.includes('how does')) {
        reply = {
          sender: 'ai',
          text: language === 'en'
            ? "0% Demolition works on quantum electrodynamics and Pancha Tattva (5 Elements) resonance. By placing elemental metals (Copper for Fire, Brass for Earth, Steel for Space, Lead for Rahu/Depression), directional pyramids, and color frequencies, we alter the standing wave frequencies of the building. Furthermore, we overlay your KP Horoscope onto the 16 zones to ensure remedies align with your operating planetary Dasha."
            : "0% तोड़फोड़ का विज्ञान पंचतत्व (जल, वायु, अग्नि, पृथ्वी, आकाश) और विद्युत-चुंबकीय ऊर्जा तरंगों पर कार्य करता है। तांबा, पीतल, स्टील व सीसा धातु की सूक्ष्म पट्टियों, पिरामिडों और रंग तरंगों से भवन की ऊर्जा संतुलित की जाती है। साथ ही आपकी जन्मकुंडली का 16 दिशाओं से मिलान करके व्यक्तिगत उपाय दिए जाते हैं।",
          actionText: language === 'en' ? 'Explore 0% Method' : '0% विधि विस्तार से समझें',
          actionType: 'wizard'
        };
      } else if (lower.includes('factory') || lower.includes('industrial') || lower.includes('cash') || lower.includes('फैक्ट्री') || lower.includes('पैसा')) {
        reply = {
          sender: 'ai',
          text: language === 'en'
            ? "For factories and manufacturing plants: Heavy vibration machinery MUST reside in South-West / South to prevent continuous mechanical breakdowns. Boilers and transformers belong in South-East (Fire). Liquid cash flow is governed by North (Kuber) and South-East (Liquidity). Sandeep K. Tripathi uses heavy lead helix plates and CAD alignment to boost industrial productivity and solve labor union disputes."
            : "फैक्ट्री हेतु: भारी व कंपन करने वाली मशीनें नैऋत्य (SW) या दक्षिण में होनी चाहिए जिससे बार-बार ब्रेकडाउन न हो। बॉयलर व बिजली आग्नेय कोण में और तैयार माल वायव्य कोण में होना चाहिए। नकदी प्रवाह उत्तर (कुबेर) और आग्नेय कोण के संतुलन से बढ़ता है।",
          actionText: language === 'en' ? 'Book Factory Audit' : 'फैक्ट्री ऑडिट बुक करें',
          actionType: 'wizard'
        };
      } else if (lower.includes('remote') || lower.includes('google earth') || lower.includes('overseas') || lower.includes('विदेश') || lower.includes('usa') || lower.includes('dubai')) {
        reply = {
          sender: 'ai',
          text: language === 'en'
            ? "Yes! Over 40% of our clients reside in the USA, UK, UAE, Canada, and Australia. Using Google Earth Pro satellite coordinates, magnetic declination adjustment, and digital CAD layouts, we achieve millimeter precision. Consultations take place on live Zoom sessions in your local timezone (EST, PST, GMT, GST). All remedies are 100% compliant with overseas tenant lease regulations."
            : "हाँ! हमारे 40% से अधिक क्लाइंट्स अमेरिका, यूके, दुबई और कनाडा से हैं। गूगल अर्थ प्रो और डिजिटल फ्लोर प्लान से हम डिग्री-स्तर की सटीक गणना करते हैं। आपके देश के समय अनुसार लाइव ज़ूम कॉल पर संपूर्ण परामर्श दिया जाता है।",
          actionText: language === 'en' ? 'Start Remote Global Audit' : 'रिमोट ग्लोबल ऑडिट शुरू करें',
          actionType: 'wizard'
        };
      } else {
        reply = {
          sender: 'ai',
          text: language === 'en'
            ? `Thank you for sharing your query. Sandeep K. Tripathi provides customized 1-on-1 consultations analyzing your specific architectural blueprint and KP Kundli. Would you like to generate a verified WhatsApp brief or connect directly on WhatsApp?`
            : `आपके प्रश्न के लिए धन्यवाद। संदीप के. त्रिपाठी जी आपकी संपत्ति के नक्शे और जन्मकुंडली का व्यक्तिगत विश्लेषण कर सटीक 0% तोड़फोड़ उपाय प्रदान करते हैं। क्या आप अभी सीधे व्हाट्सएप पर परामर्श आरंभ करना चाहते हैं?`,
          actionText: language === 'en' ? 'Connect on WhatsApp (+91 90094 48601)' : 'व्हाट्सएप पर सीधा संपर्क करें',
          actionType: 'whatsapp'
        };
      }

      setMessages(prev => [...prev, reply]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center space-x-2.5 px-4 py-3.5 rounded-full shadow-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs transition-all transform hover:scale-105 gold-glow"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1"></div>
          <Bot className="w-5 h-5 text-amber-200" />
          <span className="hidden sm:inline">
            {language === 'en' ? 'Smart Vastu AI Assistant' : 'एआई वास्तु सहायक'}
          </span>
          <span className="sm:hidden">AI</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div 
          className="relative w-[360px] sm:w-[400px] h-[540px] rounded-3xl shadow-2xl border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--gold-primary)',
            color: 'var(--text-main)',
          }}
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-md">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-300/40 flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm leading-tight">Vedic Wisdom AI</h4>
                <p className="text-[10px] text-amber-200 font-medium">
                  {language === 'en' ? '0% Demolition Knowledge Base' : '0% तोड़फोड़ ज्ञान पीठ'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'border rounded-bl-none'
                  }`}
                  style={{
                    backgroundColor: m.sender === 'user' ? undefined : 'var(--bg-card-subtle)',
                    borderColor: m.sender === 'user' ? undefined : 'var(--border-subtle)',
                  }}
                >
                  <p>{m.text}</p>
                  
                  {/* Action CTA inside AI message */}
                  {m.actionText && (
                    <div className="mt-3 pt-2 border-t border-amber-500/20">
                      {m.actionType === 'wizard' ? (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            openWizard();
                          }}
                          className="w-full py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] flex items-center justify-center space-x-1 shadow-sm"
                        >
                          <span>{m.actionText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <a
                          href="https://wa.me/919009448601"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center space-x-1 shadow-sm"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>{m.actionText}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 border-t overflow-x-auto flex space-x-1.5 no-scrollbar" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
            {quickPrompts.map((qp, i) => {
              const label = language === 'en' ? qp.en : qp.hi;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(label)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium border whitespace-nowrap hover:border-amber-500 hover:text-amber-600 transition-colors flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t flex items-center space-x-2" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
            <input
              type="text"
              placeholder={language === 'en' ? 'Ask about toilet, entrance, kitchen...' : 'वास्तु या कुंडली दोष के बारे में पूछें...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 px-3 py-2 rounded-xl border text-xs outline-none focus:border-amber-500"
              style={{ backgroundColor: 'var(--bg-card-subtle)', borderColor: 'var(--border-subtle)' }}
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
