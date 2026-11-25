'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { BLOG_POSTS } from '@/data/blog';
import { BlogPost } from '@/types';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export default function BlogSection() {
  const { t, language, selectedBlog, openBlogModal, closeBlogModal, openWizard } = useApp();

  return (
    <section id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20">
            <BookOpen className="w-4 h-4" />
            <span>{t.blog.title}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            {language === 'en' ? 'Empirical Astro-Vastu Research Papers' : 'प्रामाणिक शोध लेख एवं वैदिक विज्ञान'}
          </h2>

          <p className="text-base text-stone-600 dark:text-stone-300">
            {t.blog.subtitle}
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl border p-6 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2">
                  {language === 'en' ? post.title : post.titleHindi}
                </h3>

                {/* Date */}
                <div className="flex items-center space-x-1.5 text-xs text-stone-400 mt-2 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date} • Sandeep K. Tripathi</span>
                </div>

                {/* Excerpt */}
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
                  {language === 'en' ? post.excerpt : post.excerptHindi}
                </p>
              </div>

              {/* Read Action */}
              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  onClick={() => openBlogModal(post)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-amber-700 dark:text-amber-400 hover:bg-amber-500/10 flex items-center justify-center space-x-2 transition-colors border"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span>{t.blog.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Article Reader */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border p-6 sm:p-10 max-h-[88vh] overflow-y-auto animate-in zoom-in-95 duration-200"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--gold-primary)',
                color: 'var(--text-main)'
              }}
            >
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    {selectedBlog.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mt-2">
                    {language === 'en' ? selectedBlog.title : selectedBlog.titleHindi}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {selectedBlog.date} • {selectedBlog.readTime} • Author: Sandeep K. Tripathi
                  </p>
                </div>
                <button
                  onClick={closeBlogModal}
                  className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {/* Article Content */}
              <div className="py-6 text-sm leading-relaxed whitespace-pre-line text-stone-700 dark:text-stone-300 font-sans">
                {language === 'en' ? selectedBlog.content : selectedBlog.contentHindi}
              </div>

              {/* Reader Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-xs text-stone-500">
                  {language === 'en' ? 'Empirical Research Series | Vedic Wisdom Publications' : 'प्रामाणिक शोध प्रकाशन | वैदिक विज़डम शोध पीठ'}
                </span>
                <button
                  onClick={() => {
                    closeBlogModal();
                    openWizard();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-amber-600 to-amber-700 shadow"
                >
                  {language === 'en' ? 'Schedule Research Consultation' : 'शोध परामर्श बुक करें'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
