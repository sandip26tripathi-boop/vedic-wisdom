import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../../types/index.ts';

interface BackToTopButtonProps {
  currentLang?: Language;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({ currentLang = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isHi = currentLang === 'hi';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label={isHi ? "शीर्ष पर जाएं" : "Back to top"}
      className="fixed right-4 sm:right-7 bottom-36 sm:bottom-42 z-30 flex items-center justify-center animate-in fade-in zoom-in-75 duration-200"
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="group relative min-h-[42px] min-w-[42px] p-2.5 rounded-full bg-slate-950/90 dark:bg-[#111827]/90 text-[#F3E5AB] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 shadow-lg shadow-black/20 hover:shadow-[#D4AF37]/25 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center focus:outline-hidden backdrop-blur-md"
        aria-label={isHi ? "पेज के शीर्ष पर जाएं" : "Scroll to top of page"}
        title={isHi ? "शीर्ष पर जाएं" : "Back to top"}
      >
        <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />

        {/* Desktop Tooltip */}
        <span className="hidden md:group-hover:block absolute right-full mr-2.5 px-2 py-1 rounded-md bg-slate-900 text-white text-[10px] font-semibold whitespace-nowrap shadow-md border border-slate-700 pointer-events-none">
          {isHi ? "शीर्ष पर जाएं" : "Back to top"}
        </span>
      </button>
    </aside>
  );
};
