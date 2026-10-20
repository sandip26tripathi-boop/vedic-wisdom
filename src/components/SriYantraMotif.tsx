import React from 'react';

interface SriYantraMotifProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const SriYantraMotif: React.FC<SriYantraMotifProps> = ({
  className = "w-10 h-10",
  size = 100,
  animate = false
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metallic Gold Royal Gradient */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="80%" stopColor="#AA820A" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>

        {/* Upward Ascending Light Shimmer */}
        <linearGradient id="upwardAscentGlow" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
        </linearGradient>

        {/* Central Cosmic Radiance */}
        <radialGradient id="sacredCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Central Radiance Aura */}
      <circle cx="50" cy="50" r="46" fill="url(#sacredCenterGlow)" />

      {/* Outer Sacred Protective Rings */}
      <circle cx="50" cy="50" r="47" stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.65" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="43" stroke="url(#goldGradient)" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="39" stroke="url(#goldGradient)" strokeWidth="0.8" opacity="0.5" />

      {/* 16 Cardinal & Inter-cardinal Ticks */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * 360) / 16;
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + 43 * Math.cos(rad);
        const y1 = 50 + 43 * Math.sin(rad);
        const x2 = 50 + 47 * Math.cos(rad);
        const y2 = 50 + 47 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#goldGradient)"
            strokeWidth={i % 4 === 0 ? "1.8" : "0.9"}
            opacity={i % 4 === 0 ? "0.9" : "0.5"}
          />
        );
      })}

      {/* Subtle Supporting Interlaced Downward Triangles */}
      <polygon points="50,78 79,32 21,32" stroke="#B45309" strokeWidth="0.9" fill="none" opacity="0.4" />
      <polygon points="50,72 74,38 26,38" stroke="url(#goldGradient)" strokeWidth="0.8" fill="none" opacity="0.35" />

      {/* PRIMARY MASTER ASCENDING TRIANGLE (Upward Peak / Vertex at 50, 11) */}
      <polygon 
        points="50,11 87,76 13,76" 
        stroke="url(#goldGradient)" 
        strokeWidth="2.4" 
        fill="url(#upwardAscentGlow)" 
        opacity="0.98" 
        strokeLinejoin="round"
      />

      {/* Tier 2 Nested Upward Triangle (Peak at 50, 19) */}
      <polygon 
        points="50,19 80,71 20,71" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.6" 
        fill="none" 
        opacity="0.85" 
        strokeLinejoin="round"
      />

      {/* Tier 3 Nested Upward Triangle (Peak at 50, 27) */}
      <polygon 
        points="50,27 72,66 28,66" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.2" 
        fill="none" 
        opacity="0.8" 
        strokeLinejoin="round"
      />

      {/* Tier 4 Inner Upward Triangle (Peak at 50, 35) */}
      <polygon 
        points="50,35 64,60 36,60" 
        stroke="url(#goldGradient)" 
        strokeWidth="1" 
        fill="none" 
        opacity="0.9" 
        strokeLinejoin="round"
      />

      {/* Ascending Crown Pinnacle (Highlighting Zenith at Peak 50, 11) */}
      <circle cx="50" cy="11" r="2.2" fill="#FFF2B2" stroke="url(#goldGradient)" strokeWidth="0.8" />

      {/* Central Bindu (Supreme Sacred Source) */}
      <circle cx="50" cy="50" r="3.2" fill="url(#goldGradient)" />
      <circle cx="50" cy="50" r="1.2" fill="#FAF9F6" />
    </svg>
  );
};
