import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Download,
  Building2,
  Sliders,
} from 'lucide-react';
import { sound } from '../../utils/sound';

export interface TadbeerService {
  id: string;
  name: string;
  nameArabic: string;
  category: 'ERP & Software' | 'AI Technology' | 'Digital Marketing' | 'Human Capital';
  tagline: string;
  description: string;
  priceAmount: number;
  priceUnit: string;
  setupFee?: number;
  status: 'Active' | 'Enterprise Retainer' | 'Deployment Sprint';
  deliverables: string[];
  timeline: string;
  activeDeployments: number;
  referenceClients: string[];
  techStack: string[];
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  service: TadbeerService | null;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  service,
  onClose,
}) => {
  const [scaleSeats, setScaleSeats] = useState(25);
  const [supportTier, setSupportTier] = useState<'Standard' | 'Priority 24/7'>('Priority 24/7');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen || !service) return null;

  const calculatedQuote =
    service.priceAmount +
    (scaleSeats > 10 ? (scaleSeats - 10) * 18 : 0) +
    (supportTier === 'Priority 24/7' ? 250 : 0);

  const handleDeployRequest = () => {
    sound.playSuccess();
    setToastMessage(`Deployment request submitted for ${service.name}! Our Muscat team will reach out within 2 hours.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownloadSpec = () => {
    sound.playSuccess();
    setToastMessage(`Technical SOW & SLA specification for ${service.name} downloaded.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 130,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
        }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: 'spring', damping: 28, stiffness: 380 }}
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: 820,
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 24,
            boxShadow: 'var(--shadow-popover)',
            border: '1px solid var(--border-medium)',
            background: 'var(--bg-surface)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '26px 28px 20px 28px',
              borderBottom: '1px solid var(--border-light)',
              background: 'linear-gradient(180deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => {
                sound.playNav();
                onClose();
              }}
              className="glass-pill"
              style={{
                position: 'absolute',
                top: 22,
                right: 22,
                width: 32,
                height: 32,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              <X size={16} />
            </button>

            {/* Badges row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 9999,
                  background: 'var(--pill-active-bg)',
                  color: 'var(--pill-active-text)',
                }}
              >
                {service.category}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                {service.nameArabic}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  background: 'var(--accent-green-bg)',
                  color: 'var(--accent-green-text)',
                }}
              >
                <ShieldCheck size={12} />
                {service.status}
              </span>
            </div>

            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                marginBottom: 6,
                lineHeight: 1.2,
              }}
            >
              {service.name}
            </h2>

            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500, margin: 0 }}>
              {service.tagline}
            </p>
          </div>

          {/* Modal Body */}
          <div
            style={{
              padding: '24px 28px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
            }}
            className="no-scrollbar"
          >
            {/* Plain Human Language Description Card */}
            <div className="glass-card" style={{ padding: '20px 22px' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.04em' }}>
                How Tadbeer Delivers This For Your Business
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
                {service.description}
              </p>
            </div>

            {/* Two-Column Grid: Deliverables & Reference Clients */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
              {/* Deliverables List */}
              <div className="glass-card" style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--accent-green-text)' }} />
                  <span>Key Deliverables & System Inclusions</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {service.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => sound.playHover()}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: 12.5,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'var(--text-primary)',
                          marginTop: 6,
                          flexShrink: 0,
                        }}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Omani Client Implementations */}
              <div className="glass-card" style={{ padding: '20px 22px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Building2 size={15} />
                  <span>Proven In Production At</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {service.referenceClients.map((clientName, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        background: 'var(--bg-surface-subtle)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{clientName}</span>
                      <span style={{ fontSize: 11, color: 'var(--accent-green-text)', fontWeight: 700 }}>Active</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 10 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 6 }}>
                    Typical Deployment Sprint Timeline
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    <span>{service.timeline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive OMR Quote Estimator */}
            <div
              className="glass-card"
              style={{
                padding: '22px 24px',
                background: 'linear-gradient(180deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sliders size={15} />
                    <span>Interactive OMR Pricing & Capacity Calculator</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Transparent corporate pricing tailored for Omani enterprises
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Estimated Investment
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    OMR {calculatedQuote.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>/ month</span>
                  </div>
                </div>
              </div>

              {/* Slider for Enterprise Scale */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  <span>Enterprise Seats / Workstations: {scaleSeats} seats</span>
                  <span>Bandwidth: High-Throughput Cluster</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={scaleSeats}
                  onChange={(e) => {
                    setScaleSeats(Number(e.target.value));
                    sound.playHover();
                  }}
                  style={{
                    width: '100%',
                    accentColor: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                />
              </div>

              {/* SLA Support Tier Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  SLA Support Level:
                </span>
                {(['Standard', 'Priority 24/7'] as const).map((tier) => {
                  const isSel = supportTier === tier;
                  return (
                    <button
                      key={tier}
                      onClick={() => {
                        setSupportTier(tier);
                        sound.playFilter();
                      }}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 9999,
                        fontSize: 12,
                        fontWeight: 600,
                        background: isSel ? 'var(--pill-active-bg)' : 'var(--bg-surface)',
                        color: isSel ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {tier} {tier === 'Priority 24/7' ? '(+250 OMR/mo)' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Bar with Action Triggers */}
          <div
            style={{
              padding: '16px 28px',
              borderTop: '1px solid var(--border-light)',
              background: 'var(--bg-surface-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <button
              onClick={handleDownloadSpec}
              className="glass-pill"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              <Download size={14} />
              <span>Download Technical SOW</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={onClose}
                className="glass-pill"
                style={{ padding: '8px 18px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeployRequest}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 22px',
                  borderRadius: 9999,
                  background: 'var(--pill-active-bg)',
                  color: 'var(--pill-active-text)',
                  fontSize: 12.5,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Sparkles size={14} />
                <span>Request Scope Proposal</span>
              </button>
            </div>
          </div>

          {/* Floating Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                style={{
                  position: 'absolute',
                  bottom: 75,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#111113',
                  color: '#ffffff',
                  padding: '9px 18px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 250,
                  maxWidth: '90%',
                  textAlign: 'center',
                  pointerEvents: 'none',
                }}
              >
                <Sparkles size={14} style={{ color: '#34d399', flexShrink: 0 }} />
                <span>{toastMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
