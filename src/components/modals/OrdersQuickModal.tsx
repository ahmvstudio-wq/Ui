import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { sound } from '../../utils/sound';

interface OrdersQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_ORDERS = [
  { id: '#LIC-8941', customer: 'Oman Air (الطيران العماني)', channel: 'Cloud SaaS', items: 'Tadbeer Enterprise ERP Core v4.8 (x500 seats)', amount: 'OMR 48,000/yr', status: 'Active' },
  { id: '#LIC-8940', customer: 'Al Harrasi Rope Factory', channel: 'Enterprise On-Prem', items: 'Tadbeer Supply Chain & Telemetry Engine', amount: 'OMR 32,000/yr', status: 'Provisioned' },
  { id: '#LIC-8939', customer: 'Oman Vision 2040 Unit', channel: 'Cloud SaaS', items: 'Enterprise AI Agent & Workflow Orchestrator', amount: 'OMR 18,500/yr', status: 'Active' },
  { id: '#LIC-8938', customer: 'Sultanate of Marble', channel: 'Hybrid Cluster', items: 'Multi-Branch Inventory & Oman VAT Engine', amount: 'OMR 14,200/yr', status: 'Active' },
  { id: '#LIC-8937', customer: "Gloria Jean's Coffees Oman", channel: 'Cloud SaaS', items: 'Omnichannel POS & Centralized Stock Hub', amount: 'OMR 24,000/yr', status: 'Provisioned' },
];

export const OrdersQuickModal: React.FC<OrdersQuickModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-surface)',
          padding: '24px 28px',
          borderRadius: 22,
          boxShadow: 'var(--shadow-popover)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--bg-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                Active Software Contracts & Licenses
              </h2>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                14 enterprise deployments active • October 2026
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 380, overflowY: 'auto' }}>
          {SAMPLE_ORDERS.map((ord) => (
            <div
              key={ord.id}
              onClick={() => sound.playHover()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: 12,
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {ord.id}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {ord.customer}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '1px 6px',
                      borderRadius: 9999,
                      background: ord.channel.includes('Online') ? 'var(--accent-green-bg)' : 'rgba(0,0,0,0.06)',
                      color: ord.channel.includes('Online') ? 'var(--accent-green-text)' : 'var(--text-secondary)',
                      fontWeight: 600,
                    }}
                  >
                    {ord.channel}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  {ord.items}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {ord.amount}
                </div>
                <div style={{ fontSize: 11, color: 'var(--accent-green-text)', fontWeight: 600 }}>
                  {ord.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              sound.playSuccess();
              onClose();
            }}
            style={{
              padding: '8px 18px',
              borderRadius: 9999,
              background: 'var(--pill-active-bg)',
              color: 'var(--pill-active-text)',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
