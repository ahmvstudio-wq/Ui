import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 800,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [current, setCurrent] = useState<number>(value);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = current;
    const diff = value - startValue;

    if (diff === 0) return;

    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const nextVal = startValue + diff * easeProgress;
      setCurrent(nextVal);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    animFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animFrame);
  }, [value, duration]);

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(current);

  return (
    <span className={`tabular-nums font-mono ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
