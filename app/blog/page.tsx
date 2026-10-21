import React from 'react';
import Link from 'next/link';
import blogsData from '../../content/blogs.json';
import { BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Knowledge Base & Vastu Blog | Vedic Wisdom',
  description: 'Practical, non-demolition spatial Vastu insights and classical astrological guidance by Sandeep K. Tripathi.'
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB] border border-amber-500/20 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Classical Research & Practical Articles</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100">
            Vedic Wisdom Knowledge Base
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Demystifying directional Vastu & classical astrological timing through observational Indian science.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogsData.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB]">
                    {post.category}
                  </span>
                  <span className="flex items-center space-x-1 text-slate-500 text-[11px]">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-amber-600 transition-colors">
                    {post.titleEn}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed">
                  {post.excerptEn}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {post.keywords.map((kw, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
