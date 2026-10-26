import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { Language } from '../../types/index.ts';
import { SriYantraMotif } from '../SriYantraMotif.tsx';
import { 
  Sparkles, 
  Send, 
  Bot, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  Zap, 
  RefreshCw,
  Lock,
  ChevronRight,
  Flame,
  Building2,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface GeminiPromptSectionProps {
  currentLang: Language;
  onOpenBooking: (service?: string) => void;
  onOpenCopilot: () => void;
}

const PRESET_PROMPTS = [
  {
    icon: '🏭',
    tag: 'Industrial Vastu',
    labelEn: 'Factory Machinery Breakdown in SW',
    labelHi: 'दक्षिण-पश्चिम में फैक्ट्री मशीनरी ब्रेकडाउन',
    promptEn: 'Our CNC machines and heavy presses in the South-West zone keep breaking down. What 0% non-demolition metallic remedies can stabilize the energy grid?',
    promptHi: 'हमारी फैक्ट्री के दक्षिण-पश्चिम (SW) जोन में स्थापित भारी मशीनें बार-बार खराब हो रही हैं। बिना किसी तोड़-फोड़ के कौन से धातु उपचार से ऊर्जा स्थिर होगी?'
  },
  {
    icon: '💰',
    tag: 'Cash Flow',
    labelEn: 'Delayed Receivables & North (Kuber)',
    labelHi: 'अटका हुआ धन एवं उत्तर (कुबेर) जोन',
    promptEn: 'We have delayed corporate receivables over ₹2 Crore. How to inspect and unblock the North (Kuber) zone according to Energy Vastu and KP 2nd & 11th cusps?',
    promptHi: 'हमारा ₹2 करोड़ से अधिक का भुगतान अटका हुआ है। उत्तर (कुबेर) दिशा के ऊर्जा दोष और केपी ज्योतिष के द्वितीय व एकादश भाव के अनुसार क्या उपाय करें?'
  },
  {
    icon: '🚪',
    tag: 'Entrance Dosha',
    labelEn: 'South-West Main Entrance Remedy',
    labelHi: 'नैऋत्य (SW) मुख्य द्वार निवारण',
    promptEn: 'Our commercial office main entrance falls in the South-West (Nairutya). How to neutralize this without civil demolition using elemental metal strips?',
    promptHi: 'हमारे कमर्शियल ऑफिस का मुख्य द्वार नैऋत्य (SW) दिशा में है। बिना दीवार तोड़े पीतल अथवा सीसे की ऊर्जा पट्टी से इसे कैसे संतुलित करें?'
  },
  {
    icon: '🌟',
    tag: 'KP Astrology',
    labelEn: 'Business Expansion & IPO Timing',
    labelHi: 'व्यवसाय विस्तार एवं केपी शुभ समय',
    promptEn: 'How does Master Sandeep K. Tripathi analyze the 10th and 11th Cusp Sub-Sub Lords to time large capital expansion and strategic investments?',
    promptHi: 'संदीप के. त्रिपाठी जी नए व्यापार विस्तार और बड़े निवेश के सही समय निर्धारण हेतु 10वें और 11वें कस्पल सब-सब लॉर्ड का विश्लेषण कैसे करते हैं?'
  }
];

export const GeminiPromptSection: React.FC<GeminiPromptSectionProps> = ({
  currentLang,
  onOpenBooking,
  onOpenCopilot
}) => {
  const isHi = currentLang === 'hi';
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [promptText, setPromptText] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingResponse, setStreamingResponse] = useState('');
  const [completedAnswer, setCompletedAnswer] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const answerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Execute Gemini AI generation call
  const executeGeminiCall = async (queryToRun: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setStreamingResponse('');
    setCompletedAnswer(null);
    setActiveQuery(queryToRun);

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryToRun,
          history: []
        })
      });

      const data = await response.json();
      const reply = data.reply || (
        isHi
          ? 'आपके प्रश्न हेतु धन्यवाद। हमारी शून्य तोड़-फोड़ ऊर्जा वास्तु पद्धति में हम मशीनों की दिशा को आपकी केपी कुंडली से जोड़कर देखते हैं। पूर्ण समाधान हेतु कृपया व्हाट्सएप पर संपर्क करें।'
          : 'Thank you for your inquiry. In our Non-Demolition Energy Vastu methodology, we evaluate physical orientation alongside your KP Cuspal Interlink timeline. Connect directly on WhatsApp (+91 90094 48601) for detailed CAD layout rectification.'
      );

      // Smooth streaming text effect
      let currentIdx = 0;
      const streamInterval = setInterval(() => {
        if (currentIdx < reply.length) {
          const chunk = reply.slice(0, currentIdx + 6);
          setStreamingResponse(chunk);
          currentIdx += 6;
        } else {
          clearInterval(streamInterval);
          setStreamingResponse('');
          setCompletedAnswer(reply);
          setIsLoading(false);

          setTimeout(() => {
            answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        }
      }, 15);
    } catch (err: any) {
      console.warn('[Gemini Prompt Fallback]:', err);
      setIsLoading(false);
      const fallbackText = isHi
        ? `**वैदिक विस्डम जेमिनी एआई विश्लेषण:**\n\n1. **स्थानिक निदान:** आपके प्रश्न ("${queryToRun}") के आधार पर, यह ऊर्जा असंतुलन मुख्य रूप से संबंधित दिशा के तात्विक टकराव के कारण उत्पन्न होता है।\n2. **शून्य तोड़-फोड़ उपाय:** बिना किसी सिविल तोड़-फोड़ के 99.9% शुद्ध तांबा, पीतल अथवा सीसा (Lead) ऊर्जा पट्टियों द्वारा इस दोष को संतुलित किया जा सकता है।\n3. **केपी ज्योतिष सत्यापन:** संदीप त्रिपाठी जी द्वारा संबंधित कस्पल सब-सब लॉर्ड का सूक्ष्म परीक्षण अनुशंसित है।\n\n*तत्काल समीक्षा हेतु नीचे दिए गए व्हाट्सएप बटन द्वारा सीधे हमारे भोपाल अनुसंधान केंद्र से संपर्क करें।*`
        : `**Vedic Wisdom Gemini AI Analysis:**\n\n1. **Spatial Energy Assessment:** Regarding your inquiry ("${queryToRun}"), energetic friction is typically driven by an elemental clash within the corresponding cardinal axis.\n2. **0% Non-Demolition Rectification:** In our scriptural protocol, we embed copper/brass frequency rods and lead pyramidal stabilizers to transmute the electromagnetic field without breaking walls.\n3. **KP Astrology Verification:** Master Sandeep K. Tripathi verifies the 6th, 10th, or 11th Cusp Sub-Sub Lords to ascertain exact planetary resonance.\n\n*For a personalized layout review, tap the WhatsApp button below to speak directly with our Bhopal Research Desk (+91 90094 48601).*`;
      setCompletedAnswer(fallbackText);
    }
  };

  // Submit / Generate Handler with Action-Gated Auth
  const handleSubmit = (overrideText?: string) => {
    const query = (overrideText || promptText).trim();
    if (!query || isLoading) return;

    // Login Trigger on Action:
    // If user is NOT logged in, trigger Google Sign-In while preserving their typed query!
    if (!isAuthenticated && !user) {
      setPromptText(query);
      openAuthModal({
        message: isHi 
          ? 'Gemini AI उत्तर व वैज्ञानिक विश्लेषण प्राप्त करने के लिए कृपया Google से लॉगिन करें।' 
          : 'Please sign in with Google to generate your instant Gemini AI analysis.',
        source: 'landing-gemini-prompt',
        onSuccess: (_verifiedUser) => {
          // Preserve User Query: login complete hote hi automatically answer generate ho jaye
          executeGeminiCall(query);
        }
      });
      return;
    }

    // User is already logged in -> direct Gemini AI answer generation!
    executeGeminiCall(query);
  };

  const handleCopyAnswer = () => {
    if (!completedAnswer) return;
    navigator.clipboard.writeText(completedAnswer);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const generateWhatsAppShare = () => {
    const q = activeQuery || promptText || 'Astro-Vastu Query';
    const text = `Namaste Sandeep Ji & Ravindra Ji,\n\nI was analyzing our layout on your Vedic Wisdom Gemini AI engine:\nQuestion: "${q}"\n\nKindly advise on an official Non-Demolition consultation. (Ref: Bhopal Desk +91 90094 48601)`;
    return `https://wa.me/919009448601?text=${encodeURIComponent(text)}`;
  };

  return (
    <section 
      id="gemini-ai-prompt"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      aria-label="Vedic Wisdom Gemini AI Analytics Prompt"
    >
      {/* Container Card with Sacred Geometry Glow */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white via-[#FAF9F6] to-white dark:from-[#111827] dark:via-[#0F172A] dark:to-[#0B0F19] border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden p-6 sm:p-8 lg:p-10 transition-all duration-300">
        
        {/* Subtle Background Sri Yantra Watermark */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 pointer-events-none opacity-5 dark:opacity-10">
          <SriYantraMotif className="w-full h-full text-[#D4AF37]" />
        </div>

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/20">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#B45309]/20 border border-[#D4AF37]/40 text-xs font-bold text-[#B45309] dark:text-[#F3E5AB]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>{isHi ? "जेमिनी 2.5 पावर्ड वैदिक विश्लेषण" : "Gemini 2.5 Powered Vedic Analytics"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isHi ? (
                <>स्थानिक वास्तु एवं केपी ज्योतिष <span className="gold-gradient-text">एआई विश्लेषक</span></>
              ) : (
                <>Ask Vedic <span className="gold-gradient-text">Gemini AI</span></>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {isHi 
                ? "अपनी फैक्ट्री, फ्लैट, कार्यालय या जन्म विवरण का प्रश्न यहाँ लिखें। 0% तोड़-फोड़ एवं कस्पल इंटरलिंक सिद्धांतों पर आधारित त्वरित प्रामाणिक उत्तर प्राप्त करें।"
                : "Type your query regarding factory defects, residential layout, or KP planetary timing. Receive instant non-demolition remedies and astrological insights."}
            </p>
          </div>

          {/* User Status / Info Pill */}
          <div className="flex items-center space-x-2 self-start md:self-auto shrink-0">
            {isAuthenticated ? (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isHi ? `सत्यापित: ${user?.name?.split(' ')[0]}` : `Active: ${user?.name?.split(' ')[0]}`}</span>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-center space-x-1.5">
                <Bot className="w-4 h-4 text-[#D4AF37]" />
                <span>{isHi ? "सार्वजनिक पूर्वावलोकन (लॉगिन पर उत्तर)" : "Free Public Preview"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Preset Prompt Pills */}
        <div className="relative z-10 pt-5 pb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isHi ? "त्वरित विषय चुनें या नीचे अपना प्रश्न लिखें:" : "Select a common enterprise query or write your own:"}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const targetText = isHi ? item.promptHi : item.promptEn;
                  setPromptText(targetText);
                  handleSubmit(targetText);
                }}
                className="p-3 text-left rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-[#FAF9F6] dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#B45309] dark:text-[#F3E5AB]">
                    {item.tag}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-[#B45309] dark:group-hover:text-[#F3E5AB] transition-colors leading-tight line-clamp-2">
                  {isHi ? item.labelHi : item.labelEn}
                </div>
                <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>{isHi ? "क्लिक करके पूछें" : "Click to ask"}</span>
                  <ChevronRight className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Prompt Input Box */}
        <div className="relative z-10 pt-3">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-3"
          >
            <div className="relative rounded-2xl border-2 border-slate-300 dark:border-slate-700 focus-within:border-[#D4AF37] bg-white dark:bg-slate-900/90 shadow-inner transition-colors">
              <textarea
                ref={textareaRef}
                rows={3}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={
                  isHi
                    ? "अपने घर, फैक्ट्री, मुख्य द्वार, नैऋत्य/ईशान कोण, या केपी ज्योतिष कुंडली से जुड़ा सवाल यहाँ लिखें..."
                    : "Ask Gemini AI about your property layout, machinery orientation, North/South-West defects, or KP planetary Dasha timing..."
                }
                className="w-full p-4 pr-12 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-transparent resize-none focus:outline-hidden"
              />

              {/* Character Indicator & Submit Action Row */}
              <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 rounded-b-2xl flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isHi ? "0% तोड़-फोड़ एवं वैदिक शोध आधारित" : "0% Non-Demolition & Vedic Empirical Grounded"}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {promptText && (
                    <button
                      type="button"
                      onClick={() => setPromptText('')}
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 cursor-pointer"
                    >
                      {isHi ? "साफ़ करें" : "Clear"}
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={!promptText.trim() || isLoading}
                    className="min-h-[42px] px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] hover:brightness-105 shadow-md shadow-[#D4AF37]/25 flex items-center space-x-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>{isHi ? "विश्लेषण हो रहा है..." : "Analyzing with Gemini..."}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>{isHi ? "जेमिनी एआई से उत्तर पाएं" : "Analyze with Gemini AI"}</span>
                        <Send className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Live Response Dossier Display Card */}
        {(isLoading || streamingResponse || completedAnswer) && (
          <div 
            ref={answerRef}
            className="relative z-10 mt-6 p-5 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#D4AF37] shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300"
          >
            {/* Header of Answer Card */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B45309] flex items-center justify-center text-slate-950 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{isHi ? "जेमिनी एआई वैदिक निदान" : "Gemini AI Vedic Assessment"}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30">
                      Grounded
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-xs sm:max-w-md">
                    Query: "{activeQuery}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1.5">
                {completedAnswer && (
                  <button
                    onClick={handleCopyAnswer}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    title={isHi ? "कॉपी करें" : "Copy to Clipboard"}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-600">{isHi ? "कॉपी हुआ" : "Copied"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">{isHi ? "कॉपी" : "Copy"}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Answer Content */}
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap">
              {streamingResponse || completedAnswer}
              {isLoading && (
                <span className="inline-block w-2 h-4 ml-1 bg-[#D4AF37] animate-pulse" />
              )}
            </div>

            {/* Next Steps CTA Strip */}
            {completedAnswer && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    {isHi 
                      ? "पं. रवींद्र पाठक एवं संदीप त्रिपाठी जी से विस्तृत समीक्षा हेतु:"
                      : "For official CAD review by Ravindra Pathak & Sandeep Tripathi:"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={generateWhatsAppShare()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Review</span>
                  </a>

                  <button
                    onClick={onOpenCopilot}
                    className="px-3.5 py-2 rounded-xl font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{isHi ? "कोपायलट में पूछें" : "Open in Copilot"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
