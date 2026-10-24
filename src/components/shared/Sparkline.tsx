import React, { useEffect, useState } from 'react';

interface SparklineProps {
  data: number[];
  width?: number | string;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  showDot?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = '100%',
  height = 28,
  strokeColor = 'currentColor',
  fillColor = 'transparent',
  strokeWidth = 2,
  showDot = false,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const vbWidth = 140;
  const vbHeight = 28;
  const padding = 3;
  const usableWidth = vbWidth - padding * 2;
  const usableHeight = vbHeight - padding * 2;

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * usableWidth;
    const y = vbHeight - padding - ((val - min) / range) * usableHeight;
    return { x, y };
  });

  // Build smooth bezier path
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }

  const lastPoint = points[points.length - 1];

  return (
    <div style={{ width: typeof width === 'number' ? `${width}px` : width, height, overflow: 'visible' }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        preserveAspectRatio="none"
        style={{ overflow: 'visible', display: 'block' }}
      >
        {fillColor !== 'transparent' && (
          <path
            d={`${pathD} L ${lastPoint.x} ${vbHeight} L ${points[0].x} ${vbHeight} Z`}
            fill={fillColor}
            opacity={0.2}
          />
        )}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: 300 * (1 - animatedProgress),
            transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {showDot && (
          <circle
            cx={lastPoint.x}
            cy={lastPoint.y}
            r={3}
            fill={strokeColor}
            style={{
              opacity: animatedProgress,
              transition: 'opacity 0.4s ease 0.6s',
            }}
          />
        )}
      </svg>
    </div>
  );
};
