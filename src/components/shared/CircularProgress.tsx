import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  color?: string;
  bgColor?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 46,
  strokeWidth = 4.5,
  showText = true,
  color = 'currentColor',
  bgColor = 'rgba(0,0,0,0.08)',
}) => {
  const [animatedValue, setAnimatedValue] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 120);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      {showText && (
        <span
          style={{
            position: 'absolute',
            fontSize: size * 0.28,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {Math.round(animatedValue)}%
        </span>
      )}
    </div>
  );
};
