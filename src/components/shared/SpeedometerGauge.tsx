import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowUpRight } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

interface SpeedometerGaugeProps {
  score?: number;
  delta?: string;
  interactive?: boolean;
}

export const SpeedometerGauge: React.FC<SpeedometerGaugeProps> = ({
  score = 86,
  delta = '+14',
  interactive = true,
}) => {
  const [currentScore, setCurrentScore] = useState<number>(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScore(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  // Semicircle parameters
  const size = 300;
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;

  // Perimeter of semicircle = Math.PI * radius
  const arcLength = Math.PI * radius;
  const progressRatio = Math.min(Math.max(currentScore / 100, 0), 1);
  const strokeDashoffset = arcLength * (1 - progressRatio);

  // Knob position along arc: angle from 180 (left) to 0 (right)
  const angleDeg = 180 - progressRatio * 180;
  const angleRad = (angleDeg * Math.PI) / 180;
  const knobX = cx + radius * Math.cos(angleRad);
  const knobY = cy - radius * Math.sin(angleRad);

  return (
    <div
      style={{
        background: 'var(--bg-dark-card)',
        borderRadius: 24,
        padding: '28px 30px',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
        minHeight: '440px',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow behind arc */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 220,
          height: 120,
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#f3f4f6' }}>System Performance & SLA Score</span>
          <Info size={14} style={{ color: '#9ca3af', opacity: 0.8, cursor: 'pointer' }} />
        </div>
        <button
          onClick={() => interactive && setCurrentScore(currentScore === 86 ? 94 : 86)}
          title="Simulate score update"
          style={{
            fontSize: 11,
            color: '#9ca3af',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '3px 8px',
            borderRadius: 12,
            transition: 'all 0.2s ease',
          }}
        >
          Target: 100
        </button>
      </div>

      {/* Speedometer Arc Illustration */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10, zIndex: 2 }}>
        <svg
          width={size}
          height={size / 2 + 55}
          viewBox={`0 0 ${size} ${size / 2 + 55}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <filter id="knobGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#ffffff" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Outer Tick Marks */}
          {Array.from({ length: 33 }).map((_, i) => {
            const tickAngle = Math.PI - (i / 32) * Math.PI;
            const rInner = radius + 14;
            const rOuter = radius + (i % 4 === 0 ? 22 : 18);
            const x1 = cx + rInner * Math.cos(tickAngle);
            const y1 = cy - rInner * Math.sin(tickAngle);
            const x2 = cx + rOuter * Math.cos(tickAngle);
            const y2 = cy - rOuter * Math.sin(tickAngle);
            const isPassed = (i / 32) <= progressRatio;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isPassed ? '#ffffff' : '#374151'}
                strokeWidth={i % 4 === 0 ? 2 : 1}
                strokeLinecap="round"
                opacity={isPassed ? 0.95 : 0.35}
                style={{ transition: 'stroke 0.3s ease, opacity 0.3s ease' }}
              />
            );
          })}

          {/* Background Arc Track */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#262a33"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active Gradient Arc Track with Framer Motion */}
          <motion.path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          />

          {/* Glowing Indicator Knob with Spring Physics */}
          <motion.g
            animate={{ cx: knobX, cy: knobY }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            <circle
              cx={knobX}
              cy={knobY}
              r={13}
              fill="#111113"
              stroke="#ffffff"
              strokeWidth={3.5}
              filter="url(#knobGlow)"
            />
            <circle cx={knobX} cy={knobY} r={4.5} fill="#ffffff" />
          </motion.g>
        </svg>

        {/* Center Score Display */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
              <AnimatedNumber value={currentScore} duration={1200} />
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12,
                fontWeight: 600,
                color: '#34d399',
                background: 'rgba(52, 211, 153, 0.15)',
                padding: '3px 7px',
                borderRadius: 12,
              }}
            >
              ↑ {delta}
            </span>
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4, fontWeight: 500 }}>
            of 100 points
          </div>
        </div>
      </div>

      {/* Bottom Insights */}
      <div style={{ marginTop: 14, zIndex: 2 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>
          Ahead of plan
        </div>
        <p style={{ fontSize: 13.5, color: '#9ca3af', lineHeight: 1.45, marginBottom: 12 }}>
          Both SaaS and Trading engine tiers beat SLA targets. Cloud SaaS did most of the lifting.
        </p>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 13,
            color: '#e5e7eb',
            fontWeight: 500,
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            opacity: 0.9,
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
        >
          Improve your score <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};
