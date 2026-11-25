'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { VASTU_16_ZONES } from '@/data/vastuChakra';
import { VastuZone } from '@/types';
import { 
  Sparkles, Compass, ArrowRight, ShieldCheck, Award, Globe2, ChevronRight, Eye 
} from 'lucide-react';

export default function Hero() {
  const { t, language, openWizard, openZoneModal } = useApp();
  const [hoveredZone, setHoveredZone] = useState<VastuZone>(VASTU_16_ZONES[0]);

  // Generate SVG path for a 22.5 degree slice
  const getSlicePath = (index: number) => {
    const center = 200;
    const radius = 180;
    const innerRadius = 55;
    // North is at 0 degrees (top: 270 in standard math, or adjusted)
    // 16 zones starting at North (-11.25 to +11.25)
    const anglePerSlice = 360 / 16; // 22.5 deg
    const startAngle = (index * anglePerSlice - 90 - 11.25) * (Math.PI / 180);
    const endAngle = ((index + 1) * anglePerSlice - 90 - 11.25) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const ix1 = center + innerRadius * Math.cos(startAngle);
    const iy1 = center + innerRadius * Math.sin(startAngle);
    const ix2 = center + innerRadius * Math.cos(endAngle);
    const iy2 = center + innerRadius * Math.sin(endAngle);

    return `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 0 0 ${ix1} ${iy1} Z`;
  };

  const getTextPos = (index: number) => {
    const center = 200;
    const r = 120;
    const anglePerSlice = 360 / 16;
    const midAngle = (index * anglePerSlice - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(midAngle),
      y: center + r * Math.sin(midAngle)
    };
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-6 pb-16">
      {/* Vastu Purusha Mandala Watermark in background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05] flex items-center justify-center -z-10"
        aria-hidden="true"
      >
        <svg viewBox="0 0 600 600" className="w-[850px] h-[850px] stroke-current" fill="none" strokeWidth="1.5">
          {/* 8x8 Padadevata Grid of Vastu Purusha Mandala */}
          {[...Array(9)].map((_, i) => (
            <React.Fragment key={i}>
              <line x1="50" y1={50 + i * 62.5} x2="550" y2={50 + i * 62.5} />
              <line x1={50 + i * 62.5} y1="50" x2={50 + i * 62.5} y2="550" />
            </React.Fragment>
          ))}
          {/* Diagonal cosmic energy lines */}
          <line x1="50" y1="50" x2="550" y2="550" strokeDasharray="4 4" />
          <line x1="50" y1="550" x2="550" y2="50" strokeDasharray="4 4" />
          {/* Concentric rings */}
          <circle cx="300" cy="300" r="180" strokeDasharray="6 6" />
          <circle cx="300" cy="300" r="240" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Grid: Left copy, Right interactive 16-zone chakra */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-colors"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-gold)',
                color: 'var(--gold-primary)'
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]">
              <span className="block text-stone-900 dark:text-stone-100">{t.hero.heading1}</span>
              <span className="block text-gold-gradient">{t.hero.heading2}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* Key Value Proposition Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-medium text-stone-600 dark:text-stone-300">
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                100% Non-Invasive (0% Demolition)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                <Compass className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                KP Astrological Kundli Synchronization
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                <Globe2 className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                Global Online Audits (US, UK, UAE, IN)
              </span>
            </div>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openWizard()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white shadow-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2.5 group"
              >
                <span>{t.hero.ctaAudit}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#zero-demolition"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm border shadow-sm transition-all hover:border-amber-600 flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)'
                }}
              >
                <span>{t.hero.ctaMethod}</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </a>
            </div>

            {/* Founder Quote Subtext */}
            <div className="pt-2 flex items-center justify-center lg:justify-start space-x-3 text-xs text-stone-500">
              <span className="w-8 h-px bg-amber-600/40"></span>
              <span className="italic font-serif">
                {language === 'en' 
                  ? '"Space is not inert. It is an electromagnetic mirror of your planetary karma." — Sandeep K. Tripathi'
                  : '"स्थान अचेतन नहीं है। यह आपके ग्रहीय कर्म का ऊर्जावान प्रतिबिंब है।" — संदीप के. त्रिपाठी'}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 16-Zone Cosmic Chakra (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              
              {/* Golden Outer Aura Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-pulse pointer-events-none"></div>
              <div className="absolute -inset-2 rounded-full border border-dashed border-amber-600/30 animate-spin-reverse-slow pointer-events-none"></div>

              {/* SVG 16-Zone Chakra */}
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full drop-shadow-xl select-none"
              >
                {/* 16 Zone Wedges */}
                {VASTU_16_ZONES.map((zone, idx) => {
                  const isHovered = hoveredZone.id === zone.id;
                  return (
                    <g 
                      key={zone.id} 
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredZone(zone)}
                      onClick={() => openZoneModal(zone)}
                    >
                      <path
                        d={getSlicePath(idx)}
                        fill={zone.colorCode}
                        fillOpacity={isHovered ? 0.95 : 0.65}
                        stroke="rgba(255,255,255,0.7)"
                        strokeWidth={isHovered ? 2.5 : 1}
                        className="transition-all duration-200 hover:scale-[1.02] origin-center"
                      />
                      {/* Zone Label */}
                      <text
                        x={getTextPos(idx).x}
                        y={getTextPos(idx).y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#FFFFFF"
                        fontSize="9.5"
                        fontWeight="bold"
                        className="pointer-events-none drop-shadow"
                      >
                        {zone.id}
                      </text>
                    </g>
                  );
                })}

                {/* Central Brahmasthan Core */}
                <circle 
                  cx="200" 
                  cy="200" 
                  r="52" 
                  fill="url(#goldGrad)" 
                  stroke="#FFFFFF" 
                  strokeWidth="2.5" 
                  className="shadow-lg cursor-pointer"
                  onClick={() => openZoneModal(VASTU_16_ZONES[0])}
                />
                <defs>
                  <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="70%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#92400E" />
                  </radialGradient>
                </defs>

                {/* Center Symbol */}
                <text
                  x="200"
                  y="196"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFF"
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="serif"
                  className="pointer-events-none"
                >
                  ॐ
                </text>
                <text
                  x="200"
                  y="214"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#FFF"
                  fontSize="7.5"
                  fontWeight="bold"
                  letterSpacing="1"
                  className="pointer-events-none uppercase"
                >
                  BRAHMASTHAN
                </text>
              </svg>
            </div>

            {/* Live Inspection Card under Chakra */}
            <div 
              className="mt-4 w-full max-w-[420px] p-4 rounded-xl border shadow-md transition-all animate-in fade-in duration-150"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--gold-primary)',
              }}
            >
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center space-x-2">
                  <span 
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: hoveredZone.colorCode }}
                  >
                    {hoveredZone.id}
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-sm">
                      {language === 'en' ? hoveredZone.name : hoveredZone.hindiName}
                    </h4>
                    <p className="text-[10px] text-stone-500">
                      {hoveredZone.degrees} | {language === 'en' ? `Element: ${hoveredZone.element}` : hoveredZone.elementHindi}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => openZoneModal(hoveredZone)}
                  className="flex items-center space-x-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Inspect' : 'विवरण'}</span>
                </button>
              </div>

              <div className="mt-2 text-xs text-stone-600 dark:text-stone-300">
                <p className="line-clamp-1 font-medium">
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">
                    {language === 'en' ? 'Influence: ' : 'प्रभाव: '}
                  </span>
                  {language === 'en' ? hoveredZone.lifeAttribute : hoveredZone.lifeAttributeHindi}
                </p>
                <p className="mt-1 line-clamp-1 text-[11px] text-stone-500">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {language === 'en' ? '0% Remedy: ' : 'बिना तोड़फोड़: '}
                  </span>
                  {language === 'en' ? hoveredZone.zeroDemolitionRemedy : hoveredZone.zeroDemolitionRemedyHindi}
                </p>
              </div>
            </div>

            <p className="mt-2 text-[11px] text-stone-400 text-center">
              {t.hero.chakraHint}
            </p>
          </div>

        </div>

        {/* Global Empirical Trust Stats Ribbon */}
        <div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl border shadow-lg"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="text-center p-2">
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-gradient">
              4,500+
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium">
              {t.hero.statsAudits}
            </p>
          </div>

          <div className="text-center p-2 border-l" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-gradient">
              28+
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium">
              {t.hero.statsCountries}
            </p>
          </div>

          <div className="text-center p-2 border-l md:border-l" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-gold-gradient">
              12+
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium">
              {t.hero.statsExperience}
            </p>
          </div>

          <div className="text-center p-2 border-l" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="font-serif text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              0%
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-medium">
              {t.hero.statsDemolition}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
