import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GavelIntroAnimationProps {
  onComplete: () => void;
  className?: string;
}

export const GavelIntroAnimation: React.FC<GavelIntroAnimationProps> = ({
  onComplete,
  className,
}) => {
  const [phase, setPhase] = useState<'intro' | 'striking' | 'reveal' | 'exit'>('intro');
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize a subtle, realistic wooden percussion knock via Web Audio API
  const playSubtleKnock = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      // Wooden body resonance oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      // Low wooden thud frequency sweep
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + 0.06);

      // Bandpass filter to simulate hollow solid wood sound block resonance
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);

      // Sharp initial transient with rapid decay (45ms)
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Graceful silence if audio policy prevents autoplay
    }
  };

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    // Sequence timing
    // 0.0s -> White screen
    // 0.2s -> Sound block & Gavel appear
    // 0.7s -> Strike 1
    const strike1AudioTimer = setTimeout(() => {
      playSubtleKnock();
    }, 700);

    // 1.05s -> Strike 2
    const strike2AudioTimer = setTimeout(() => {
      playSubtleKnock();
    }, 1050);

    // 1.25s -> Reveal Brand
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1250);

    // 1.75s -> Start Exit fade
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 1750);

    // 2.05s -> Finish and reveal application
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2050);

    return () => {
      clearTimeout(strike1AudioTimer);
      clearTimeout(strike2AudioTimer);
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FFFFFF] select-none pointer-events-auto transition-opacity duration-300 ease-out',
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100',
        className
      )}
    >
      <style>{`
        @keyframes blockFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gavelMotion {
          0% {
            opacity: 0;
            transform: rotate(-26deg) translateY(-8px);
          }
          20% {
            opacity: 1;
            transform: rotate(-24deg) translateY(-8px);
          }
          /* Strike 1: Accelerates downward to strike block at 35% */
          34% {
            transform: rotate(-24deg) translateY(-8px);
          }
          36% {
            transform: rotate(0deg) translateY(0px); /* Impact 1 */
          }
          40% {
            transform: rotate(-7deg) translateY(-2px); /* Natural recoil */
          }
          45% {
            transform: rotate(-5deg) translateY(-1px);
          }
          /* Prepare Strike 2 */
          49% {
            transform: rotate(-16deg) translateY(-5px);
          }
          /* Strike 2: Impact at 54% */
          53.5% {
            transform: rotate(0deg) translateY(0px); /* Impact 2 */
          }
          57% {
            transform: rotate(-3deg) translateY(-1px); /* Slight settle */
          }
          62% {
            transform: rotate(0deg) translateY(0px); /* Rest firmly */
          }
          100% {
            opacity: 1;
            transform: rotate(0deg) translateY(0px);
          }
        }

        @keyframes brandReveal {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .anim-block {
          animation: blockFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .anim-gavel {
          transform-origin: 260px 185px;
          animation: gavelMotion 2.0s cubic-bezier(0.25, 1, 0.5, 1) 0.0s both;
        }

        .anim-brand {
          animation: brandReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) 1.25s both;
        }
      `}</style>

      {/* Main Minimalist Graphic Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[340px] sm:max-w-[400px] px-6">
        <svg
          viewBox="0 0 360 250"
          className="w-full h-auto max-h-[220px] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sound Block Wood Gradients */}
            <linearGradient id="blockTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A2D1B" />
              <stop offset="50%" stopColor="#3B2012" />
              <stop offset="100%" stopColor="#29140A" />
            </linearGradient>

            <linearGradient id="blockRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#221109" />
              <stop offset="25%" stopColor="#553320" />
              <stop offset="65%" stopColor="#331A0F" />
              <stop offset="100%" stopColor="#1A0D07" />
            </linearGradient>

            <linearGradient id="brassAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B38838" />
              <stop offset="40%" stopColor="#E6C875" />
              <stop offset="70%" stopColor="#C4983E" />
              <stop offset="100%" stopColor="#8A6420" />
            </linearGradient>

            {/* Gavel Head Wood Gradients */}
            <linearGradient id="gavelHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4E2E1C" />
              <stop offset="45%" stopColor="#381D10" />
              <stop offset="85%" stopColor="#281309" />
              <stop offset="100%" stopColor="#1B0C06" />
            </linearGradient>

            <linearGradient id="gavelHandleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5C3620" />
              <stop offset="35%" stopColor="#3F2213" />
              <stop offset="80%" stopColor="#2D160B" />
              <stop offset="100%" stopColor="#1F0D06" />
            </linearGradient>

            {/* Soft Ambient Ground Shadow Filter */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.10" />
            </filter>
            <filter id="contactShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* 1. Ground Contact Shadow */}
          <ellipse
            cx="150"
            cy="192"
            rx="66"
            ry="11"
            fill="#000000"
            opacity="0.08"
            className="anim-block"
          />
          <ellipse
            cx="150"
            cy="191"
            rx="52"
            ry="6"
            fill="#000000"
            opacity="0.12"
            className="anim-block"
          />

          {/* 2. Sound Block (Base + Beveled Tier + Polished Top) */}
          <g className="anim-block" filter="url(#softShadow)">
            {/* Block Base tier */}
            <path
              d="M 88 184 C 88 174 212 174 212 184 L 212 190 C 212 198 88 198 88 190 Z"
              fill="url(#blockRimGrad)"
            />
            {/* Brass Inlay Ring on Base */}
            <path
              d="M 92 183 C 92 176 208 176 208 183 L 208 185 C 208 190 92 190 92 185 Z"
              fill="url(#brassAccent)"
            />
            {/* Main Wooden Cylinder Body */}
            <path
              d="M 94 176 C 94 167 206 167 206 176 L 206 183 C 206 191 94 191 94 183 Z"
              fill="url(#blockRimGrad)"
            />
            {/* Top Strike Face Ellipse */}
            <ellipse
              cx="150"
              cy="176"
              rx="56"
              ry="11.5"
              fill="url(#blockTopGrad)"
              stroke="#5D3A24"
              strokeWidth="0.8"
            />
            {/* Subtle Top Brass Center Inset */}
            <ellipse
              cx="150"
              cy="176"
              rx="45"
              ry="8.5"
              fill="none"
              stroke="url(#brassAccent)"
              strokeWidth="0.75"
              opacity="0.4"
            />
          </g>

          {/* 3. The Gavel (Animated) */}
          <g className="anim-gavel">
            {/* Gavel Handle */}
            <g>
              {/* Handle Shaft */}
              <path
                d="M 148 136 L 270 184 L 272 189 L 149 141 Z"
                fill="url(#gavelHandleGrad)"
              />
              {/* Turned Wood Handle Grip Detail */}
              <path
                d="M 230 168 L 272 185 L 274 190 L 232 173 Z"
                fill="url(#gavelHeadGrad)"
              />
              {/* Brass Collar on Handle */}
              <path
                d="M 154 138 L 160 140 L 159 144 L 153 142 Z"
                fill="url(#brassAccent)"
              />
              {/* Handle Pommel End Cap */}
              <ellipse
                cx="272"
                cy="187"
                rx="3.5"
                ry="4"
                fill="url(#brassAccent)"
              />
            </g>

            {/* Gavel Head */}
            <g filter="url(#contactShadow)">
              {/* Main Barrel Body */}
              <rect
                x="132"
                y="110"
                width="34"
                height="56"
                rx="4"
                fill="url(#gavelHeadGrad)"
                stroke="#241108"
                strokeWidth="0.5"
              />

              {/* Central Brass Inscription Ring */}
              <rect
                x="131.5"
                y="132.5"
                width="35"
                height="11"
                fill="url(#brassAccent)"
                rx="1"
              />

              {/* Upper Striking Crown / Tier */}
              <path
                d="M 129 114 C 129 110 169 110 169 114 L 167 119 L 131 119 Z"
                fill="url(#blockRimGrad)"
              />
              <ellipse
                cx="149"
                cy="111"
                rx="19"
                ry="4"
                fill="url(#brassAccent)"
              />

              {/* Lower Striking Face (The Face that strikes the Sound Block) */}
              <path
                d="M 130 162 L 168 162 L 169 167 C 169 171 129 171 129 167 Z"
                fill="url(#blockRimGrad)"
              />
              <ellipse
                cx="149"
                cy="166"
                rx="19"
                ry="3.8"
                fill="url(#brassAccent)"
              />
            </g>
          </g>
        </svg>

        {/* 4. ApkaLawyer Minimalist Brand Reveal */}
        <div className="anim-brand mt-4 text-center">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-black font-sans">
            ApkaLawyer
          </span>
        </div>
      </div>
    </div>
  );
};
