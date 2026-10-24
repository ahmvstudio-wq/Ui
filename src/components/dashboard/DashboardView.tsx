import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  BarChart2,
  Download,
  Info,
} from 'lucide-react';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { CircularProgress } from '../shared/CircularProgress';
import { Sparkline } from '../shared/Sparkline';
import { SpeedometerGauge } from '../shared/SpeedometerGauge';
import { BarChartRevenue } from '../shared/BarChartRevenue';
import { sound } from '../../utils/sound';

interface DashboardViewProps {
  onNavigateToAnalytics: () => void;
  onOpenExport: () => void;
  onOpenOrdersModal: () => void;
}

type ChannelFilter = 'overview' | 'online' | 'instore';

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToAnalytics,
  onOpenExport,
  onOpenOrdersModal,
}) => {
  const [channel, setChannel] = useState<ChannelFilter>('overview');

  // Dynamic values that update smoothly when channel filter changes
  const metricValues = {
    overview: {
      sales: 48320,
      salesGrowth: '↑ 14.2% vs last month',
      revenue: 39500,
      revenueGrowth: '↑ 7.6% vs last month',
      units: 3842,
      unitsPercent: 77,
      conversion: 4.8,
      conversionGrowth: '↑ 0.4% vs last month',
      score: 86,
    },
    online: {
      sales: 32640,
      salesGrowth: '↑ 18.5% vs last month',
      revenue: 26800,
      revenueGrowth: '↑ 11.2% vs last month',
      units: 2410,
      unitsPercent: 82,
      conversion: 5.2,
      conversionGrowth: '↑ 0.8% vs last month',
      score: 91,
    },
    instore: {
      sales: 15680,
      salesGrowth: '↑ 6.3% vs last month',
      revenue: 12700,
      revenueGrowth: '↑ 3.1% vs last month',
      units: 1432,
      unitsPercent: 68,
      conversion: 4.1,
      conversionGrowth: '↓ -0.2 pt vs last month',
      score: 79,
    },
  }[channel];

  const handleChannelChange = (newChannel: ChannelFilter) => {
    setChannel(newChannel);
    sound.playFilter();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      {/* Title Row with Live Indicator on Right (Ditto Video Frame 1) */}
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
          Dashboard
        </h1>

        {/* Live Now Indicator Pill */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => sound.playHover()}
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
          <span style={{ fontFamily: 'var(--font-mono)' }}>1,284</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>live now</span>
        </motion.div>
      </div>

      {/* Sub-header Filter & Actions Row (Ditto Video Frame 1) */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Sub-channel Segmented Control with layoutId sliding pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface-subtle)',
              padding: '3px',
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
              position: 'relative',
            }}
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'online', label: 'Online' },
              { id: 'instore', label: 'In store' },
            ].map((btn) => {
              const isActive = channel === btn.id;
              return (
                <button
                  key={btn.id}
                  onClick={() => handleChannelChange(btn.id as ChannelFilter)}
                  style={{
                    position: 'relative',
                    padding: '5px 13px',
                    borderRadius: 9999,
                    fontSize: 12.5,
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                    background: 'transparent',
                    zIndex: 2,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-dash-filter"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'var(--pill-active-bg)',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.15)',
                        zIndex: -1,
                      }}
                    />
                  )}
                  {btn.label}
                </button>
              );
            })}
          </div>

          {/* Date Range Selector Pill */}
          <div
            onClick={() => sound.playFilter()}
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 13px',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <Clock size={13} style={{ color: 'var(--text-muted)' }} />
            <span>October 2026, month to date</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Full Analytics */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playTab();
              onNavigateToAnalytics();
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
              transition: 'all 0.2s ease',
            }}
          >
            <BarChart2 size={14} />
            <span>Full analytics</span>
          </motion.button>

          {/* Export */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              sound.playSuccess();
              onOpenExport();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 9999,
              fontSize: 12.5,
              fontWeight: 600,
              background: '#111113',
              color: '#ffffff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <Download size={14} />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* 4 Metric Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 14,
          marginBottom: 18,
        }}
      >
        {/* Card 1: Active sales (Dark Card) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="dark-hero-card"
          style={{
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '142px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 12.5, color: '#d1d5db', fontWeight: 500 }}>Active ARR / Sales</span>
                <Info size={12} style={{ color: '#9ca3af', opacity: 0.7 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  <AnimatedNumber value={metricValues.sales} prefix="$" duration={900} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#34d399',
                    background: 'rgba(52, 211, 153, 0.14)',
                    padding: '1px 6px',
                    borderRadius: 9999,
                    marginTop: 6,
                  }}
                >
                  {metricValues.salesGrowth}
                </div>
              </div>

              {/* 3 Glowing Activity Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 26, paddingBottom: 2 }}>
                <div
                  style={{
                    width: 5,
                    height: 16,
                    borderRadius: 3,
                    background: '#6b7280',
                    animation: 'pulse 1.8s infinite ease-in-out',
                  }}
                />
                <div
                  style={{
                    width: 5,
                    height: 24,
                    borderRadius: 3,
                    background: '#e5e7eb',
                    animation: 'pulse 1.8s infinite ease-in-out 0.2s',
                  }}
                />
                <div
                  style={{
                    width: 5,
                    height: 19,
                    borderRadius: 3,
                    background: '#ffffff',
                    animation: 'pulse 1.8s infinite ease-in-out 0.4s',
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 10, borderTop: '1px dashed rgba(255, 255, 255, 0.12)', marginTop: 10 }}>
            <button
              onClick={() => {
                sound.playNav();
                onOpenOrdersModal();
              }}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#e5e7eb',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                opacity: 0.9,
              }}
            >
              See contracts
            </button>
          </div>
        </motion.div>

        {/* Card 2: Revenue */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-card"
          style={{
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '142px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>Revenue</span>
              <Info size={12} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                  }}
                >
                  <AnimatedNumber value={metricValues.revenue} prefix="$" duration={900} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--accent-green-text)',
                    background: 'var(--accent-green-bg)',
                    padding: '1px 6px',
                    borderRadius: 9999,
                    marginTop: 6,
                  }}
                >
                  {metricValues.revenueGrowth}
                </div>
              </div>

              {/* Sparkline Graphic */}
              <div style={{ paddingBottom: 2 }}>
                <Sparkline
                  data={[22, 28, 25, 34, 30, 42, 38, 48]}
                  width={68}
                  height={24}
                  strokeColor="var(--text-primary)"
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 10, borderTop: '1px dashed var(--border-light)', marginTop: 10 }}>
            <button
              onClick={() => {
                sound.playTab();
                onNavigateToAnalytics();
              }}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              See analytics
            </button>
          </div>
        </motion.div>

        {/* Card 3: Units sold */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-card-subtle"
          style={{
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '142px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>Active licenses</span>
              <Info size={12} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                  }}
                >
                  <AnimatedNumber value={metricValues.units} duration={900} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--accent-green-text)',
                    background: 'var(--accent-green-bg)',
                    padding: '1px 6px',
                    borderRadius: 9999,
                    marginTop: 6,
                  }}
                >
                  ↑ 6.4% vs last month
                </div>
              </div>

              {/* Circular Progress Gauge */}
              <div style={{ paddingBottom: 2 }}>
                <CircularProgress
                  value={metricValues.unitsPercent}
                  size={38}
                  strokeWidth={3.5}
                  color="var(--text-primary)"
                  bgColor="var(--border-medium)"
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 10, borderTop: '1px dashed var(--border-light)', marginTop: 10 }}>
            <button
              onClick={() => sound.playFilter()}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              See software modules
            </button>
          </div>
        </motion.div>

        {/* Card 4: Conversion rate */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-card-subtle"
          style={{
            padding: '16px 18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '142px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>Conversion rate</span>
              <Info size={12} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div
                  style={{
                    fontSize: 25,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                  }}
                >
                  <AnimatedNumber value={metricValues.conversion} suffix="%" decimals={1} duration={900} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 600,
                    color: metricValues.conversionGrowth.includes('↓') ? 'var(--accent-red)' : 'var(--accent-green-text)',
                    background: metricValues.conversionGrowth.includes('↓') ? 'rgba(239, 68, 68, 0.12)' : 'var(--accent-green-bg)',
                    padding: '1px 6px',
                    borderRadius: 9999,
                    marginTop: 6,
                  }}
                >
                  {metricValues.conversionGrowth}
                </div>
              </div>

              {/* Multi-step Funnel Equalizer */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 24, paddingBottom: 2 }}>
                {[10, 13, 16, 20, 18, 15, 19, 22].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3.5,
                      height: h,
                      borderRadius: 1.5,
                      background: i >= 6 ? 'var(--text-primary)' : 'var(--border-medium)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 10, borderTop: '1px dashed var(--border-light)', marginTop: 10 }}>
            <button
              onClick={() => sound.playFilter()}
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              See funnel
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Speedometer Gauge + Revenue Bar Chart */}
      <div className="dash-bottom-grid">
        <SpeedometerGauge score={metricValues.score} />
        <BarChartRevenue />
      </div>
    </motion.div>
  );
};
