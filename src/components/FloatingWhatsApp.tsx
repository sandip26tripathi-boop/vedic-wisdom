import React, { useState } from 'react';
import { translations } from '../data/translations.ts';
import { Language } from '../types/index.ts';
import { MessageCircle, X, Send, Users, ShieldCheck, ArrowRight, Bot, Sparkles, Lock } from 'lucide-react';
import { SriYantraMotif } from './SriYantraMotif.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface FloatingWhatsAppProps {
  currentLang: Language;
  onOpenCopilot?: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ currentLang, onOpenCopilot }) => {
  const { openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const t = translations[currentLang];
  const wa = t.whatsapp;

  const handleSendPrompt = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919009448601?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const prefix = currentLang === 'en' ? 'Hello Vedic Wisdom Team, ' : 'नमस्ते वैदिक विजडम टीम, ';
    handleSendPrompt(prefix + customMsg);
    setCustomMsg('');
  };

  return (
    <>
      {/* Floating Button at Bottom-Right */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        
        {/* Floating AstroCopilot AI Trigger */}
        {onOpenCopilot && (
          <button
            onClick={onOpenCopilot}
            className="mb-2.5 flex items-center space-x-2 px-3.5 py-2 rounded-full bg-slate-900 text-white border border-[#D4AF37]/50 shadow-xl hover:bg-slate-800 hover:scale-105 transition-all cursor-pointer group"
            title="Open AI AstroCopilot Assistant"
          >
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-[#F3E5AB]">AstroCopilot</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        )}

        {/* Pulsating Callout Tooltip (Only when closed) */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="mb-2 hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-xl border border-[#D4AF37]/40 cursor-pointer animate-bounce"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{wa.floatingPrompt}</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative min-h-[56px] min-w-[56px] p-4 rounded-full bg-gradient-to-tr from-[#059669] to-[#10B981] hover:brightness-110 text-white shadow-2xl hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transform hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center border-2 border-white/30"
          aria-label={isOpen ? "Close WhatsApp Advisory Chat" : "Open WhatsApp Advisory Chat"}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white dark:border-slate-900 animate-pulse"></span>
            </>
          )}
        </button>

      </div>

      {/* Sleek WhatsApp Chat Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 left-3 sm:left-auto sm:right-6 w-auto sm:w-96 max-w-sm z-50 rounded-3xl bg-white dark:bg-[#111827] border border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#0B0F19] text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative p-1 rounded-xl bg-white/10 border border-white/20">
                <SriYantraMotif className="w-8 h-8" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#064E3B]"></span>
              </div>
              <div>
                <h4 className="font-cinzel text-sm font-bold tracking-wide">
                  {wa.headerTitle}
                </h4>
                <div className="text-[10px] text-emerald-200 flex items-center space-x-1">
                  <span>{wa.onlineStatus}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body & Quick Prompts */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-3 bg-[#F0FDF4]/30 dark:bg-slate-900/60">
            
            {/* System Greeting Bubble */}
            <div className="p-3.5 rounded-2xl rounded-tl-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
              <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Vedic Wisdom Official Advisory</span>
              </div>
              {wa.greeting}
            </div>

            {/* Quick Prompt Options */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                {currentLang === 'en' ? 'Select Instant Enterprise Topic:' : 'विषय चुनें:'}
              </div>
              {wa.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(opt.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 shrink-0 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>

            {/* Official Community Link */}
            <div className="pt-2">
              <button
                onClick={() => handleSendPrompt("Hello, please invite me to the official Vedic Wisdom Research Community.")}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#D4AF37]/20 to-amber-500/15 border border-[#D4AF37]/40 text-xs font-bold text-slate-800 dark:text-[#F3E5AB] flex items-center justify-center space-x-1.5 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{wa.communityBtn}</span>
              </button>
            </div>

            {/* Quick 1-Click WhatsApp Login Button */}
            <div className="pt-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openAuthModal({ source: 'whatsapp_widget' });
                }}
                className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-110 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{currentLang === 'en' ? '🔐 1-Click Login via WhatsApp / Gmail' : '🔐 WhatsApp / Gmail से 1-क्लिक लॉगिन'}</span>
              </button>
            </div>

          </div>

          {/* Custom Message Input Footer */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder={currentLang === 'en' ? "Type your project query..." : "अपना प्रश्न यहां लिखें..."}
              aria-label={currentLang === 'en' ? "Type your project query" : "अपना प्रश्न यहां लिखें"}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 cursor-pointer shadow-xs transition-colors"
              title="Send to WhatsApp"
              aria-label="Send query to WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
