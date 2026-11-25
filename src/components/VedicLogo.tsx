'use client';

import React from 'react';

interface VedicLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function VedicLogo({ className = '', size = 44, showText = true }: VedicLogoProps) {
  return (
    <div className={`flex items-center space-x-3.5 group select-none ${className}`}>
      {/* Intricate Royal Astro-Vastu Emblem */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center rounded-2xl p-0.5 shadow-xl transition-all duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        {/* Glowing subtle backdrop */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 opacity-90 shadow-lg group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 opacity-40 blur-sm group-hover:opacity-75 transition-opacity"></div>

        {/* Master SVG Emblem: Sacred Geometry, 16 Directional Petals, Intersecting Cosmic Triangles & Core Bindu */}
        <svg 
          viewBox="0 0 100 100" 
          className="relative z-10 w-full h-full p-1"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D0" />
              <stop offset="35%" stopColor="#F5D061" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9A6B1F" />
            </linearGradient>
            <radialGradient id="binduGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFDF0" />
              <stop offset="60%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </radialGradient>
          </defs>

          {/* Outer Sun Halo Rays (16 Directions) */}
          {[...Array(16)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 44 * Math.cos((i * 22.5 * Math.PI) / 180)}
              y2={50 + 44 * Math.sin((i * 22.5 * Math.PI) / 180)}
              stroke="url(#goldSheen)"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              opacity="0.8"
            />
          ))}

          {/* Outer Protective Cosmic Ring */}
          <circle cx="50" cy="50" r="42" stroke="url(#goldSheen)" strokeWidth="2" opacity="0.9" />
          <circle cx="50" cy="50" r="38" stroke="url(#goldSheen)" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />

          {/* 8-Petal Sacred Lotus Overlay */}
          {[...Array(8)].map((_, i) => {
            const rot = i * 45;
            return (
              <g key={i} transform={`rotate(${rot} 50 50)`}>
                <path
                  d="M50 20 C46 29 44 38 50 44 C56 38 54 29 50 20 Z"
                  fill="url(#goldSheen)"
                  fillOpacity="0.35"
                  stroke="url(#goldSheen)"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}

          {/* Intersecting Sacred Geometry (Upward Shiva / Downward Shakti Triangles) */}
          {/* Upward Triangle (Fire / Growth / Divine Masculine) */}
          <polygon
            points="50,22 74,68 26,68"
            stroke="url(#goldSheen)"
            strokeWidth="1.5"
            fill="url(#goldSheen)"
            fillOpacity="0.15"
          />
          {/* Downward Triangle (Water / Grace / Cosmic Grounding) */}
          <polygon
            points="50,78 26,32 74,32"
            stroke="url(#goldSheen)"
            strokeWidth="1.5"
            fill="url(#goldSheen)"
            fillOpacity="0.15"
          />

          {/* Cardinal Direction Markers (N, E, S, W) */}
          <circle cx="50" cy="11" r="2" fill="url(#goldSheen)" />
          <circle cx="89" cy="50" r="2" fill="url(#goldSheen)" />
          <circle cx="50" cy="89" r="2" fill="url(#goldSheen)" />
          <circle cx="11" cy="50" r="2" fill="url(#goldSheen)" />

          {/* Central Sacred Bindu (Golden Sun Core) */}
          <circle cx="50" cy="50" r="8" fill="url(#binduGlow)" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-1.5">
            <span className="font-serif text-2xl font-black tracking-tight text-gold-gradient">
              VEDIC WISDOM
            </span>
            <span className="text-[9px] tracking-widest font-extrabold px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-500/15 to-amber-600/25 text-amber-800 dark:text-amber-300 border border-amber-500/30 uppercase">
              GLOBAL
            </span>
          </div>
          <div className="flex items-center space-x-1 text-[10.5px] tracking-wider uppercase font-semibold text-stone-500 dark:text-stone-400">
            <span>0% Demolition</span>
            <span className="text-amber-500">•</span>
            <span>Astro-Vastu Sciences</span>
          </div>
        </div>
      )}
    </div>
  );
}
