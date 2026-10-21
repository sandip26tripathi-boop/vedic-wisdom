import React from 'react';
import { X, Calendar, Clock, Tag, ArrowRight, UserCheck, Share2, BookOpen } from 'lucide-react';
import { Language } from '../../types/index.ts';

export interface BlogPostData {
  slug: string;
  titleHi: string;
  titleEn: string;
  excerptHi: string;
  excerptEn: string;
  readTime: string;
  publishDate: string;
  category: string;
  keywords: string[];
  contentHi: string;
  contentEn: string;
  ctaTextEn: string;
  ctaTextHi: string;
}

interface BlogPostModalProps {
  post: BlogPostData | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang?: Language;
  onOpenBooking?: (serviceType?: string) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  isOpen,
  onClose,
  currentLang = 'en',
  onOpenBooking
}) => {
  if (!isOpen || !post) return null;
  const isHi = currentLang === 'hi';

  const title = isHi ? post.titleHi : post.titleEn;
  const content = isHi ? post.contentHi : post.contentEn;
  const ctaText = isHi ? post.ctaTextHi : post.ctaTextEn;

  // Simple Markdown parser to render clean semantic HTML with headings, paragraphs, and lists
  const renderFormattedContent = (raw: string) => {
    const lines = raw.split('\n');
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-3 space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            {listItems.map((li, i) => (
              <li key={i} className="leading-relaxed">{li}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        return;
      }

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={idx} className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-slate-100 mt-5 mb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={idx} className="text-base font-serif font-bold text-amber-900 dark:text-[#F3E5AB] mt-4 mb-1.5">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        inList = true;
        listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      } else if (/^\d+\.\s/.test(trimmed)) {
        inList = true;
        listItems.push(trimmed.replace(/^\d+\.\s+/, ''));
      } else {
        flushList();
        elements.push(
          <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            {trimmed}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-900 dark:text-[#F3E5AB]">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <h1 id="blog-modal-title" className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {title}
          </h1>

          {/* Keywords Strip */}
          <div className="flex flex-wrap gap-1.5 pt-1 pb-3 border-b border-slate-100 dark:border-slate-800">
            {post.keywords.map((kw, i) => (
              <span key={i} className="inline-flex items-center space-x-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB]">
                <Tag className="w-3 h-3 text-amber-600" />
                <span>{kw}</span>
              </span>
            ))}
          </div>

          {/* Body Content */}
          <div className="prose dark:prose-invert max-w-none pt-2">
            {renderFormattedContent(content)}
          </div>

          {/* Context-Relevant CTA Box */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-emerald-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB] block mb-1">
                {isHi ? "व्यावहारिक समाधान चाहिए?" : "Require Layout-Specific Analysis?"}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {isHi 
                  ? "मुख्य सलाहकार संदीप जी के साथ अपने परिसर का व्यक्तिगत नक्शा विश्लेषण सत्र बुक करें।" 
                  : "Book a private advisory session to examine your specific floor layout or natal timeline."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenBooking) onOpenBooking('vastu');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {isHi ? "बंद करें" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
};
