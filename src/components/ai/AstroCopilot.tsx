import React, { useState, useRef, useEffect } from 'react';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { Language } from '../../types/index.ts';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  Compass, 
  RefreshCw, 
  ChevronRight, 
  HelpCircle,
  Building2,
  Factory,
  Zap,
  PhoneCall,
  User,
  ShieldCheck,
  Flame,
  ArrowUpRight
} from 'lucide-react';

interface AstroCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  {
    label: '🏭 Factory machine breakdown & SW zone defect',
    query: 'Our heavy CNC machines and hydraulic presses in the South-West zone keep breaking down. What 0% non-demolition Vastu remedies can stabilize them?'
  },
  {
    label: '💰 Payment recovery & North (Kuber) blockage',
    query: 'We have over ₹3 Crore in delayed accounts receivable. How do we unblock the North (Kuber) zone and align KP 2nd & 11th cusps?'
  },
  {
    label: '🌟 KP Sub-Sub Lord for IPO & business expansion',
    query: 'How does Master Sandeep K. Tripathi verify the 10th and 11th Cusp Sub-Sub Lords for high-growth enterprise expansion and timing an IPO?'
  },
  {
    label: '⚡ SE transformer & fire element clash remedies',
    query: 'Our factory main power transformer and water chiller conduits are in adjacent bays in the South-East. How to cure this fire-water clash without civil tear-down?'
  },
  {
    label: '🏢 Boardroom alignment for executive decision making',
    query: 'Where should the Chairman and Managing Director sit in a Corporate HQ according to Energy Vastu to maximize authority and reduce top-tier attrition?'
  }
];

export const AstroCopilot: React.FC<AstroCopilotProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'copilot',
      text: currentLang === 'en'
        ? 'Namaste! I am the **Vedic Wisdom AstroCopilot**, channeling the empirical research of **Master Sandeep K. Tripathi** (12+ Yrs KP Astrology & Cuspal Interlinks) and **Ravindra Pathak** (Non-Demolition Spatial Vastu).\n\nHow can I assist your factory, commercial facility, or astrological timing today? You can select a common enterprise query below or ask directly.'
        : 'नमस्ते! मैं **वैदिक विजडम एस्ट्रो-कोपायलट** हूँ, जो **संदीप के. त्रिपाठी** (केपी ज्योतिष एवं कस्पल इंटरलिंक्स) तथा **रवींद्र पाठक** (शून्य तोड़-फोड़ ऊर्जा वास्तु) के शोध पर आधारित है।\n\nआपकी औद्योगिक फैक्ट्री, कार्यालय या व्यक्तिगत कुंडली के संबंध में मैं क्या सहायता कर सकता हूँ?',
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4)
        })
      });

      const data = await response.json();
      const reply = data.reply || (
        currentLang === 'en'
          ? 'Thank you for your inquiry. In our Non-Demolition Energy Vastu methodology, we evaluate physical machine orientation against your KP Cuspal Interlink timeline. Connect with Sandeep K. Tripathi via WhatsApp for a personalized layout audit.'
          : 'आपके प्रश्न हेतु धन्यवाद। हमारी शून्य तोड़-फोड़ ऊर्जा वास्तु पद्धति में हम मशीनों की दिशा को आपकी केपी कुंडली से जोड़कर देखते हैं।'
      );

      // Simulate smooth streaming effect
      let currentIdx = 0;
      const streamInterval = setInterval(() => {
        if (currentIdx < reply.length) {
          const chunk = reply.slice(0, currentIdx + 4);
          setStreamingText(chunk);
          currentIdx += 4;
        } else {
          clearInterval(streamInterval);
          setStreamingText('');
          setMessages((prev) => [
            ...prev,
            {
              id: `copilot_${Date.now()}`,
              sender: 'copilot',
              text: reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setIsLoading(false);
        }
      }, 15);
    } catch (error) {
      console.error('Copilot request failed:', error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `copilot_err_${Date.now()}`,
          sender: 'copilot',
          text: currentLang === 'en'
            ? 'We are experiencing high server traffic. For immediate industrial assistance, please connect with Master Sandeep K. Tripathi directly on WhatsApp (+91 90094 48601).'
            : 'सर्वर पर अधिक लोड है। तत्काल सहायता हेतु कृपया व्हाट्सएप (+91 90094 48601) पर संपर्क करें।',
          timestamp: 'Just now'
        }
      ]);
    }
  };

  // Build WhatsApp Transfer URL with full conversation context
  const generateWhatsAppUrl = () => {
    const lastUserQuery = messages.filter(m => m.sender === 'user').slice(-1)[0]?.text || 'Enterprise Astro-Vastu inquiry';
    const text = `Namaste Sandeep Ji & Ravindra Ji,\n\nI was consulting your Vedic Wisdom AstroCopilot regarding:\n"${lastUserQuery}"\n\nKindly advise on scheduling an official review for our facility/horoscope. (Ref: Bhopal Desk +91 90094 48601)`;
    return `https://wa.me/919009448601?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl h-[92vh] sm:h-[85vh] max-h-[720px] rounded-2xl bg-[#FAF9F6] dark:bg-[#111827] border border-[#D4AF37]/40 shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gold Shimmer Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309]" />

        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#151D30]/90 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-transparent border border-[#D4AF37]/40">
              <SriYantraMotif className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  ASTRO <span className="gold-gradient-text">COPILOT</span>
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#B45309] dark:text-[#F3E5AB] border border-[#D4AF37]/30">
                  AI Research Agent
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Grounded in KP Cuspal Interlinks & 0% Non-Demolition Energy Vastu
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition-all"
              title="Transfer conversation to Sandeep Tripathi on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Transfer</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close copilot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-[#D4AF37] to-[#B45309] text-white'
                  : 'bg-slate-800 text-[#F3E5AB] border border-[#D4AF37]/40'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#D4AF37]" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B45309] text-slate-950 font-semibold'
                  : 'bg-white dark:bg-[#1A2234] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}>
                {/* Markdown-like rendering for bold and bullets */}
                <div className="whitespace-pre-wrap space-y-1.5">
                  {msg.text.split('\n').map((line, idx) => {
                    if (line.startsWith('- ') || line.startsWith('* ')) {
                      return (
                        <div key={idx} className="flex items-start gap-1.5 pl-1">
                          <span className="text-[#D4AF37]">•</span>
                          <span>{line.replace(/^[-*]\s*/, '')}</span>
                        </div>
                      );
                    }
                    if (line.match(/^\d+\.\s/)) {
                      return (
                        <div key={idx} className="font-semibold text-slate-900 dark:text-white pt-1">
                          {line}
                        </div>
                      );
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>

                <div className={`text-[10px] mt-2 pt-1 border-t ${
                  msg.sender === 'user' 
                    ? 'border-black/10 text-slate-800/80' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-400'
                } flex items-center justify-between`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'copilot' && (
                    <span className="flex items-center gap-1 text-[#B45309] dark:text-[#F3E5AB]">
                      <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                      Vedic Wisdom Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Streaming Bubble */}
          {isLoading && streamingText && (
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-[#F3E5AB] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <div className="max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm bg-white dark:bg-[#1A2234] border border-[#D4AF37]/40 shadow-sm text-slate-800 dark:text-slate-200">
                <div className="whitespace-pre-wrap">
                  {streamingText}
                  <span className="inline-block w-2 h-4 bg-[#D4AF37] ml-1 animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator when awaiting response */}
          {isLoading && !streamingText && (
            <div className="flex items-center gap-2 p-3 text-xs text-slate-500">
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
              <span>Analyzing 16 Vastu Zones & KP Cuspal Interlinks with Gemini AI...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Contextual Query Pills */}
        <div className="p-3 bg-slate-100/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            Quick:
          </span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(preset.query)}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-white dark:bg-slate-800 hover:bg-amber-500/10 border border-slate-200 dark:border-slate-700 hover:border-[#D4AF37] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-[#F3E5AB] whitespace-nowrap transition-all cursor-pointer shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Input Bar & Actions */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#151D30] border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={currentLang === 'en' ? 'Ask about industrial defects, factory layout, or KP astrology...' : 'फैक्ट्री दोष, मशीन प्लेसमेंट या केपी ज्योतिष से जुड़ा प्रश्न पूछें...'}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] text-slate-950 font-bold hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom WhatsApp Transfer Strip */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-500" />
              Direct Research Desk: +91 90094 48601
            </span>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Transfer to WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
