import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import { sound } from '../../utils/sound';

interface MonthData {
  month: string;
  val2025: number;
  val2026: number;
  orders: number;
  growth: string;
}

const MONTHS: MonthData[] = [
  { month: 'Jan', val2025: 18000, val2026: 22000, orders: 310, growth: '+22.2%' },
  { month: 'Feb', val2025: 21000, val2026: 25400, orders: 345, growth: '+21.0%' },
  { month: 'Mar', val2025: 23000, val2026: 28900, orders: 390, growth: '+25.6%' },
  { month: 'Apr', val2025: 19000, val2026: 24100, orders: 330, growth: '+26.8%' },
  { month: 'May', val2025: 24000, val2026: 31200, orders: 420, growth: '+30.0%' },
  { month: 'Jun', val2025: 34000, val2026: 41000, orders: 512, growth: '+20.5%' },
  { month: 'Jul', val2025: 28000, val2026: 36000, orders: 480, growth: '+28.5%' },
  { month: 'Aug', val2025: 31000, val2026: 38200, orders: 505, growth: '+23.2%' },
  { month: 'Sep', val2025: 35000, val2026: 44500, orders: 580, growth: '+27.1%' },
  { month: 'Oct', val2025: 30500, val2026: 39500, orders: 556, growth: '+29.5%' },
  { month: 'Nov', val2025: 42000, val2026: 51000, orders: 670, growth: '+21.4%' },
  { month: 'Dec', val2025: 48000, val2026: 58000, orders: 740, growth: '+20.8%' },
];

export const BarChartRevenue: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2026'>('2026');
  const [hoveredMonth, setHoveredMonth] = useState<MonthData | null>(MONTHS[9]); // Oct by default as in video frame 3 & 4
  const [hoverIndex, setHoverIndex] = useState<number>(9);

  const maxVal = 60000;
  const chartHeight = 160;

  const handleYearChange = (year: '2025' | '2026') => {
    setSelectedYear(year);
    sound.playFilter();
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '18px 20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '330px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>Enterprise Revenue</span>
          <Info size={13} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
          <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
            $300,000 ARR so far this year
          </span>
        </div>

        {/* Year Toggle with layoutId animated pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-surface-subtle)',
            padding: 2.5,
            borderRadius: 9999,
            border: '1px solid var(--border-light)',
            position: 'relative',
          }}
        >
          {(['2025', '2026'] as const).map((yr) => {
            const isSel = selectedYear === yr;
            return (
              <button
                key={yr}
                onClick={() => handleYearChange(yr)}
                style={{
                  position: 'relative',
                  padding: '3px 11px',
                  borderRadius: 9999,
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: isSel ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                  zIndex: 2,
                  transition: 'color 0.2s ease',
                }}
              >
                {isSel && (
                  <motion.div
                    layoutId="active-year-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      background: 'var(--pill-active-bg)',
                      zIndex: -1,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    }}
                  />
                )}
                {yr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div style={{ position: 'relative', width: '100%', height: chartHeight, marginTop: 10 }}>
        {/* Y Axis Gridlines */}
        {[
          { label: '$60k', y: 0 },
          { label: '$45k', y: 0.25 },
          { label: '$30k', y: 0.5, isAvg: true },
          { label: '$15k', y: 0.75 },
          { label: '$0', y: 1 },
        ].map((grid, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: `${grid.y * 100}%`,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                width: 42,
                fontSize: 11,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                transform: 'translateY(-50%)',
              }}
            >
              {grid.label}
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                borderBottom: grid.isAvg
                  ? '1.5px dashed var(--border-medium)'
                  : '1px dashed var(--border-light)',
              }}
            />
            {grid.isAvg && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  paddingLeft: 8,
                  transform: 'translateY(-50%)',
                }}
              >
                avg $30k
              </span>
            )}
          </div>
        ))}

        {/* Month Bars Container */}
        <div
          style={{
            position: 'absolute',
            left: 48,
            right: 56,
            bottom: 0,
            top: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          {MONTHS.map((item, idx) => {
            const h2025 = (item.val2025 / maxVal) * chartHeight;
            const h2026 = (item.val2026 / maxVal) * chartHeight;
            const isHovered = hoverIndex === idx;

            return (
              <div
                key={item.month}
                onMouseEnter={() => {
                  setHoveredMonth(item);
                  setHoverIndex(idx);
                  sound.playHover();
                }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: 3,
                  height: '100%',
                  cursor: 'pointer',
                  padding: '0 4px',
                }}
              >
                {/* 2025 Hatched bar with spring entrance */}
                <motion.div
                  className="hatched-pattern"
                  initial={{ height: 0 }}
                  animate={{ height: `${h2025}px` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: idx * 0.025 }}
                  style={{
                    width: 11,
                    borderRadius: '6px 6px 2px 2px',
                    border: '1px solid var(--border-medium)',
                    background: selectedYear === '2025' ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.02)',
                    opacity: selectedYear === '2025' ? 1 : 0.6,
                  }}
                />

                {/* 2026 Solid bar with spring entrance */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h2026}px` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: idx * 0.035 }}
                  style={{
                    width: 12,
                    borderRadius: '6px 6px 2px 2px',
                    background:
                      isHovered
                        ? 'linear-gradient(180deg, #111113 0%, #374151 100%)'
                        : selectedYear === '2026'
                        ? 'var(--chart-bar-2026)'
                        : 'var(--border-medium)',
                    boxShadow: isHovered ? '0 0 16px rgba(0,0,0,0.25)' : 'none',
                    position: 'relative',
                  }}
                >
                  {/* Subtle top cap highlight when hovered */}
                  {isHovered && (
                    <motion.div
                      layoutId="bar-active-cap"
                      style={{
                        position: 'absolute',
                        top: 2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: '#ffffff',
                        boxShadow: '0 0 5px rgba(255,255,255,0.8)',
                      }}
                    />
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Interactive Tooltip Card from Frame 4 */}
        <AnimatePresence>
          {hoveredMonth && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                right: 68,
                top: -8,
                background: '#111113',
                color: '#ffffff',
                borderRadius: 12,
                padding: '10px 14px',
                minWidth: 155,
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.12)',
                pointerEvents: 'none',
                zIndex: 30,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f3f4f6', marginBottom: 6 }}>
                {hoveredMonth.month} {selectedYear}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 3 }}>
                <span style={{ color: '#9ca3af' }}>Revenue</span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  ${(selectedYear === '2026' ? hoveredMonth.val2026 : hoveredMonth.val2025).toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 3 }}>
                <span style={{ color: '#9ca3af' }}>Contracts</span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{hoveredMonth.orders}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, paddingTop: 3, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ color: '#9ca3af' }}>vs last year</span>
                <span style={{ fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  {hoveredMonth.growth}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Month Labels Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: 50,
          paddingRight: 58,
          marginTop: 8,
        }}
      >
        {MONTHS.map((item, idx) => (
          <span
            key={item.month}
            style={{
              fontSize: 11,
              fontWeight: hoverIndex === idx ? 700 : 500,
              color: hoverIndex === idx ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => {
              setHoveredMonth(item);
              setHoverIndex(idx);
              sound.playFilter();
            }}
          >
            {item.month}
          </span>
        ))}
      </div>
    </div>
  );
};
