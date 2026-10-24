import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { Sparkline } from '../shared/Sparkline';
import { sound } from '../../utils/sound';

interface AnalyticsViewProps {
  onOpenExportCsv: () => void;
}

type TimeRange = '7D' | '30D' | '90D' | '12M';
type Channel = 'All' | 'Online' | 'In store';

interface ChartPoint {
  x: number;
  yThis: number;
  yPrev: number;
  date: string;
  prevDate: string;
  thisVal: number;
  prevVal: number;
  growth: string;
}

const CHART_POINTS: ChartPoint[] = [
  { x: 30, yThis: 195, yPrev: 205, date: 'Thu, Sep 24', prevDate: 'Sun, Aug 25', thisVal: 980, prevVal: 870, growth: '+12.6%' },
  { x: 90, yThis: 175, yPrev: 188, date: 'Sat, Sep 26', prevDate: 'Tue, Aug 27', thisVal: 1040, prevVal: 910, growth: '+14.3%' },
  { x: 155, yThis: 105, yPrev: 165, date: 'Tue, Sep 29', prevDate: 'Sun, Aug 30', thisVal: 1000, prevVal: 1232, growth: '-18.8%' }, // Frame 8
  { x: 220, yThis: 180, yPrev: 145, date: 'Fri, Oct 2', prevDate: 'Wed, Sep 2', thisVal: 1020, prevVal: 980, growth: '+4.1%' },
  { x: 285, yThis: 162, yPrev: 182, date: 'Mon, Oct 5', prevDate: 'Sat, Sep 5', thisVal: 1180, prevVal: 990, growth: '+19.2%' },
  { x: 350, yThis: 120, yPrev: 185, date: 'Wed, Oct 7', prevDate: 'Mon, Sep 7', thisVal: 1290, prevVal: 1020, growth: '+26.5%' },
  { x: 420, yThis: 156, yPrev: 178, date: 'Thu, Oct 8', prevDate: 'Tue, Sep 8', thisVal: 1310, prevVal: 1055, growth: '+24.2%' }, // Frame 7
  { x: 490, yThis: 188, yPrev: 200, date: 'Sun, Oct 11', prevDate: 'Fri, Sep 11', thisVal: 960, prevVal: 840, growth: '+14.2%' },
  { x: 555, yThis: 106, yPrev: 138, date: 'Wed, Oct 14', prevDate: 'Mon, Sep 14', thisVal: 1420, prevVal: 1180, growth: '+20.3%' },
  { x: 620, yThis: 175, yPrev: 156, date: 'Sat, Oct 17', prevDate: 'Thu, Sep 17', thisVal: 1080, prevVal: 940, growth: '+14.9%' },
  { x: 685, yThis: 185, yPrev: 190, date: 'Wed, Oct 21', prevDate: 'Mon, Sep 21', thisVal: 1010, prevVal: 890, growth: '+13.5%' },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ onOpenExportCsv }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [channel, setChannel] = useState<Channel>('All');
  const [vsPrevious, setVsPrevious] = useState<boolean>(true);
  const [hoveredIndex, setHoveredIndex] = useState<number>(6); // Default to Thu, Oct 8 as in frame 7
  const [liveCount, setLiveCount] = useState<number>(1284);

  const activePoint = CHART_POINTS[hoveredIndex];

  const handleTimeRange = (range: TimeRange) => {
    setTimeRange(range);
    sound.playFilter();
  };

  const handleChannel = (ch: Channel) => {
    setChannel(ch);
    sound.playFilter();
  };

  const toggleComparison = () => {
    setVsPrevious(!vsPrevious);
    sound.playToggle();
  };

  // Sparklines matching video frame 7 exactly
  const sparkData = {
    revenue: [24, 28, 22, 34, 26, 38, 29, 36, 42, 35, 46],
    orders: [20, 25, 21, 28, 24, 27, 23, 31, 26, 32, 30],
    aov: [62, 65, 63, 67, 64, 69, 66, 68, 65, 70, 69.8],
    conversion: [4.1, 4.3, 4.2, 4.4, 4.2, 4.5, 4.3, 4.6, 4.4, 4.53],
    retention: [34, 36, 35, 37, 36, 38, 37, 39, 38, 38.7],
  };

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const mx = (p0.x + p1.x) / 2;
      d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const ptsThis = CHART_POINTS.map((p) => ({ x: p.x, y: p.yThis }));
  const ptsPrev = CHART_POINTS.map((p) => ({ x: p.x, y: p.yPrev }));

  const pathThis = createSmoothPath(ptsThis);
  const pathPrev = createSmoothPath(ptsPrev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      {/* Top Header Row with Title and Live Badge on far right (Frame 7 & 8) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <h1
          style={{
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          Analytics
        </h1>

        {/* Live Badge (Far right on title row, matching video frame 7) */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setLiveCount((c) => c + Math.floor(Math.random() * 5 - 2));
            sound.playHover();
          }}
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '5px 13px',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span className="live-dot" />
          <span style={{ fontFamily: 'var(--font-mono)' }}>{liveCount.toLocaleString()}</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>live now</span>
        </motion.div>
      </div>

      {/* Filter Row: Two pill groups on left, Switch & Export on right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {/* Left Filter Pill Capsules */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Timeframe Selector [7D] [30D] [90D] [12M] */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface-subtle)',
              padding: '2.5px',
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
              position: 'relative',
            }}
          >
            {(['7D', '30D', '90D', '12M'] as TimeRange[]).map((r) => {
              const isActive = timeRange === r;
              return (
                <button
                  key={r}
                  onClick={() => handleTimeRange(r)}
                  style={{
                    position: 'relative',
                    padding: '4px 12px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                    background: 'transparent',
                    zIndex: 2,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-analytics-range"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'var(--pill-active-bg)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                        zIndex: -1,
                      }}
                    />
                  )}
                  {r}
                </button>
              );
            })}
          </div>

          {/* Channel Selector [All] [Online] [In store] */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface-subtle)',
              padding: '2.5px',
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
              position: 'relative',
            }}
          >
            {(['All', 'Online', 'In store'] as Channel[]).map((c) => {
              const isActive = channel === c;
              return (
                <button
                  key={c}
                  onClick={() => handleChannel(c)}
                  style={{
                    position: 'relative',
                    padding: '4px 13px',
                    borderRadius: 9999,
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                    background: 'transparent',
                    zIndex: 2,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-analytics-channel"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'var(--pill-active-bg)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                        zIndex: -1,
                      }}
                    />
                  )}
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Comparison Toggle & Export CSV */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            onClick={toggleComparison}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <div
              style={{
                width: 34,
                height: 20,
                borderRadius: 10,
                background: vsPrevious ? 'var(--text-primary)' : 'var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                justifyContent: vsPrevious ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--bg-surface)' }} />
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)' }}>
              vs previous period
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playSuccess();
              onOpenExportCsv();
            }}
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              fontSize: 12.5,
              fontWeight: 600,
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Download size={13} />
            <span>Export CSV</span>
          </motion.button>
        </div>
      </div>

      {/* 5 KPI Metric Cards Row (Ditto from Frame 7 & 8) */}
      <div className="analytics-kpi-grid">
        {/* Card 1: Revenue (Black card #111113) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.18 }}
          className="dark-hero-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '135px',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500, marginBottom: 5 }}>
              Revenue
            </div>
            <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              <AnimatedNumber value={37162} prefix="$" duration={900} />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10.5,
                fontWeight: 600,
                color: '#34d399',
                background: 'rgba(52, 211, 153, 0.15)',
                padding: '1px 6px',
                borderRadius: 9999,
                marginTop: 5,
              }}
            >
              ↑ 8.1% vs previous
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline data={sparkData.revenue} strokeColor="#ffffff" height={22} />
          </div>
        </motion.div>

        {/* Card 2: Orders */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.18 }}
          className="glass-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '135px',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 5 }}>
              Orders
            </div>
            <div
              style={{
                fontSize: 23,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
              }}
            >
              <AnimatedNumber value={532} duration={900} />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--accent-green-text)',
                background: 'var(--accent-green-bg)',
                padding: '1px 6px',
                borderRadius: 9999,
                marginTop: 5,
              }}
            >
              ↑ 7.8% vs previous
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline data={sparkData.orders} strokeColor="var(--text-primary)" height={22} />
          </div>
        </motion.div>

        {/* Card 3: Average order value */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.18 }}
          className="glass-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '135px',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 5 }}>
              Average order value
            </div>
            <div
              style={{
                fontSize: 23,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
              }}
            >
              <AnimatedNumber value={69.81} prefix="$" decimals={2} duration={900} />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--accent-green-text)',
                background: 'var(--accent-green-bg)',
                padding: '1px 6px',
                borderRadius: 9999,
                marginTop: 5,
              }}
            >
              ↑ 0.3% vs previous
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline data={sparkData.aov} strokeColor="var(--text-primary)" height={22} />
          </div>
        </motion.div>

        {/* Card 4: Conversion */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.18 }}
          className="glass-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '135px',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 5 }}>
              Conversion
            </div>
            <div
              style={{
                fontSize: 23,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
              }}
            >
              <AnimatedNumber value={4.52} suffix="%" decimals={2} duration={900} />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--accent-green-text)',
                background: 'var(--accent-green-bg)',
                padding: '1px 6px',
                borderRadius: 9999,
                marginTop: 5,
              }}
            >
              ↑ +0.0 pt vs previous
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline data={sparkData.conversion} strokeColor="var(--text-primary)" height={22} />
          </div>
        </motion.div>

        {/* Card 5: Returning customers */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.18 }}
          className="glass-card"
          style={{
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '135px',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 5 }}>
              Returning customers
            </div>
            <div
              style={{
                fontSize: 23,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
              }}
            >
              <AnimatedNumber value={38.5} suffix="%" decimals={1} duration={900} />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                fontSize: 10.5,
                fontWeight: 600,
                color: 'var(--accent-green-text)',
                background: 'var(--accent-green-bg)',
                padding: '1px 6px',
                borderRadius: 9999,
                marginTop: 5,
              }}
            >
              ↑ +0.3 pt vs previous
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline data={sparkData.retention} strokeColor="var(--text-primary)" height={22} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Main Content: Dual-Layer Chart + Channel Breakdown (Ditto Frame 7 & 8) */}
      <div className="analytics-bottom-grid">
        {/* Revenue Over Time Chart */}
        <div
          className="glass-card"
          style={{
            padding: '18px 20px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '340px',
          }}
        >
          {/* Chart Header Line */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                Revenue over time
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 2 }}>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                  }}
                >
                  <AnimatedNumber value={37162} prefix="$" duration={900} />
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: 'var(--accent-green-text)',
                    background: 'var(--accent-green-bg)',
                    padding: '1px 6px',
                    borderRadius: 9999,
                  }}
                >
                  ↑ 8.1%
                </span>
              </div>
              <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                Last 30 days, all channels
              </span>
            </div>

            {/* Legends */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-secondary)' }}>
                <div style={{ width: 12, height: 2.5, background: 'var(--chart-line)', borderRadius: 2 }} />
                <span>This period</span>
              </div>
              {vsPrevious && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-muted)' }}>
                  <div style={{ width: 12, height: 2, borderBottom: '2px dashed var(--chart-line-prev)' }} />
                  <span>Previous period</span>
                </div>
              )}
            </div>
          </div>

          {/* SVG Line Chart Canvas */}
          <div style={{ position: 'relative', width: '100%', height: 195, marginTop: 6 }}>
            {/* Horizontal guide lines ($2k, $1.5k, $1k, $500) */}
            {[
              { val: '$2k', y: 15 },
              { val: '$1.5k', y: 65 },
              { val: '$1k', y: 115 },
              { val: '$500', y: 165 },
            ].map((g, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  top: g.y,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: 38,
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {g.val}
                </span>
                <div style={{ flex: 1, height: 1, borderBottom: '1px solid var(--border-light)' }} />
              </div>
            ))}

            <svg
              width="100%"
              height="270"
              viewBox="0 0 710 270"
              preserveAspectRatio="none"
              style={{ position: 'absolute', left: 38, right: 0, top: 0, bottom: 0, overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="prevMountainGradientDitto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Shaded mountain area for previous period */}
              {vsPrevious && (
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  d={`${pathPrev} L 685 260 L 30 260 Z`}
                  fill="url(#prevMountainGradientDitto)"
                />
              )}

              {/* Dashed line for previous period */}
              {vsPrevious && (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  d={pathPrev}
                  fill="none"
                  stroke="var(--chart-line-prev)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}

              {/* Solid dark line for this period */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                d={pathThis}
                fill="none"
                stroke="var(--chart-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Double-ring Marker (Ditto Frame 7 & 8) */}
              {activePoint && (
                <g>
                  {/* Outer circle ring on this period */}
                  <circle
                    cx={activePoint.x}
                    cy={activePoint.yThis}
                    r={6.5}
                    fill="var(--bg-surface)"
                    stroke="var(--chart-line)"
                    strokeWidth="2.5"
                  />
                  {/* Dot on previous period if visible */}
                  {vsPrevious && (
                    <circle
                      cx={activePoint.x}
                      cy={activePoint.yPrev}
                      r={4.5}
                      fill="var(--chart-line-prev)"
                    />
                  )}
                </g>
              )}

              {/* Hit Areas for Interactive Cursor Tracking */}
              {CHART_POINTS.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.yThis}
                  r={22}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => {
                    setHoveredIndex(i);
                    sound.playHover();
                  }}
                />
              ))}
            </svg>

            {/* Floating Glass Tooltip Card (Ditto Frame 7 & 8) */}
            <AnimatePresence>
              {activePoint && (
                <motion.div
                  key={activePoint.date}
                  initial={{ opacity: 0, scale: 0.94, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.15 }}
                  className="glass-card"
                  style={{
                    position: 'absolute',
                    left: Math.max(30, Math.min(activePoint.x - 90, 480)),
                    top: Math.max(10, activePoint.yThis - 110),
                    padding: '12px 18px',
                    borderRadius: 14,
                    minWidth: 175,
                    boxShadow: 'var(--shadow-popover)',
                    zIndex: 25,
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                    {activePoint.date}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>— This period</span>
                    <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      ${activePoint.thisVal.toLocaleString()}
                    </span>
                  </div>
                  {vsPrevious && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                      <span style={{ color: 'var(--text-muted)' }}>— {activePoint.prevDate}</span>
                      <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        ${activePoint.prevVal.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 4 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: activePoint.growth.includes('-') ? 'var(--accent-red)' : 'var(--accent-green-text)',
                      }}
                    >
                      {activePoint.growth} vs previous
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Online vs In store Breakdown (Ditto Frame 7 & 8) */}
        <div
          className="glass-card"
          style={{
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '340px',
          }}
        >
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
              Cloud SaaS vs Enterprise On-Prem
            </div>

            {/* Percentages Header from Frame 8: 66% Cloud SaaS | 34% On-Prem */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>66%</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 4 }}>cloud SaaS</span>
              </div>
              <div>
                <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>34%</span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', marginLeft: 4 }}>on-prem trading</span>
              </div>
            </div>

            {/* Segmented Dual Progress Bar (Seamless black and gray pill) */}
            <div
              style={{
                width: '100%',
                height: 8,
                borderRadius: 9999,
                background: 'var(--bg-surface-subtle)',
                overflow: 'hidden',
                display: 'flex',
                marginBottom: 16,
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%',
                  background: 'var(--text-primary)',
                  borderRadius: '9999px 0 0 9999px',
                }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '34%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  height: '100%',
                  background: 'var(--border-medium)',
                  borderRadius: '0 9999px 9999px 0',
                }}
              />
            </div>

            {/* Breakdown List Items from Frame 8 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Channel 1: Online Shop */}
              <motion.div
                whileHover={{ x: 4 }}
                onClick={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 8,
                  transition: 'background 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: 'var(--text-primary)',
                      marginTop: 3,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Cloud SaaS Platform
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      382 subscriptions, $63.78k avg deal
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    $24,344
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--accent-green-text)' }}>
                    ↑ 8.8%
                  </div>
                </div>
              </motion.div>

              {/* Channel 2: Enterprise Clusters */}
              <motion.div
                whileHover={{ x: 4 }}
                onClick={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 8,
                  transition: 'background 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 3,
                      background: 'var(--border-medium)',
                      marginTop: 3,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Enterprise On-Prem Clusters
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      150 client nodes, $85.35k avg deal
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    $12,819
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--accent-green-text)' }}>
                    ↑ 6.6%
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
