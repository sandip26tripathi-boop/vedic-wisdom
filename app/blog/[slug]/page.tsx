import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogsData from '../../../content/blogs.json';
import { Clock, ArrowLeft, Tag, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogsData.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0B0F19] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </Link>

        {/* Article Container */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-900 dark:text-[#F3E5AB] mb-4">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>{post.category}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-slate-100 leading-tight mb-4">
            {post.titleEn}
          </h1>

          <div className="flex flex-wrap gap-1.5 pb-6 border-b border-slate-100 dark:border-slate-800">
            {post.keywords.map((kw, i) => (
              <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-950 dark:text-[#F3E5AB]">
                #{kw}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none pt-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {post.contentEn}
          </div>

          {/* Consultation CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-emerald-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-[#F3E5AB] block mb-1">
                Require Layout-Specific Analysis?
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Book a private advisory session to examine your specific floor layout or natal timeline.
              </p>
            </div>

            <Link
              href="/#services"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 shadow-md transition-all whitespace-nowrap flex items-center space-x-1.5 shrink-0"
            >
              <span>{post.ctaTextEn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>

      </div>
    </div>
  );
}
