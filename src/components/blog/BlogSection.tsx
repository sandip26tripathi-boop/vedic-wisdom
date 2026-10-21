import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Language } from '../../types/index.ts';
import blogsData from '../../../content/blogs.json';
import { BlogPostModal, BlogPostData } from './BlogPostModal.tsx';

interface BlogSectionProps {
  currentLang?: Language;
  onOpenBooking?: (serviceType?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  currentLang = 'en',
  onOpenBooking
}) => {
  const isHi = currentLang === 'hi';
  const [selectedPost, setSelectedPost] = useState<BlogPostData | null>(null);

  const posts = blogsData as BlogPostData[];

  return (
    <section 
      id="blog"
      aria-label={isHi ? "वैदिक ज्ञान एवं वास्तु ब्लॉग" : "Vedic Knowledge & Spatial Articles"}
      className="w-full py-12 lg:py-16 bg-[#FAF9F6] dark:bg-[#0B0F19] border-t border-slate-200 dark:border-slate-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>{isHi ? "ज्ञान भंडार व अनुसंधान लेख" : "Classical Research & Practical Articles"}</span>
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100">
            {isHi ? "तर्कसंगत वास्तु एवं ज्योतिषीय मार्गदर्शन" : "Demystifying Directional Vastu & Classical Timing"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 max-w-2xl mx-auto">
            {isHi 
              ? "अंधविश्वास और भय से दूर, हमारे मुख्य शोधकर्ता द्वारा लिखित व्यावहारिक एवं वैज्ञानिक दृष्टिकोण पर आधारित विशेष लेख।" 
              : "Clear, logical essays grounded in observational classical literature—free from fear-mongering and superstitious claims."}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-lg hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20">
                    {post.category}
                  </span>
                  <span className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-[11px]">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <button 
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    className="text-left cursor-pointer"
                  >
                    {isHi ? post.titleHi : post.titleEn}
                  </button>
                </h3>

                {/* Excerpt */}
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {isHi ? post.excerptHi : post.excerptEn}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.keywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Read Article Trigger */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>{isHi ? "पूरा लेख पढ़ें" : "Read Full Article"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking ? onOpenBooking('vastu') : window.location.assign('#pricing')}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  {isHi ? "परामर्श लें" : "Consult"}
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      <BlogPostModal
        post={selectedPost}
        isOpen={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
        currentLang={currentLang}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
};
