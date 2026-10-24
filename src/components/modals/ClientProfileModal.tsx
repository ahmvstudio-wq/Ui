import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Download,
  Layers,
  FileText,
} from 'lucide-react';
import { sound } from '../../utils/sound';

export interface CustomerProfileData {
  id: string;
  name: string;
  company: string;
  spent: number;
  contracts: number;
  tier: 'Enterprise VIP' | 'SaaS Pro' | 'Trial Account';
  region: string;
  role: string;
  email: string;
  phone: string;
  accountManager: string;
  slaUptime: string;
  activeModulesList: string[];
  recentInvoices: Array<{
    id: string;
    desc: string;
    date: string;
    amount: number;
    status: string;
  }>;
}

interface ClientProfileModalProps {
  isOpen: boolean;
  client: CustomerProfileData | null;
  onClose: () => void;
}

export const ClientProfileModal: React.FC<ClientProfileModalProps> = ({
  isOpen,
  client,
  onClose,
}) => {
  if (!isOpen || !client) return null;

  return (
    <AnimatePresence>
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
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: 620,
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            padding: '24px 28px',
            borderRadius: 22,
            boxShadow: 'var(--shadow-popover)',
            border: '1px solid var(--border-medium)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {client.company.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {client.name}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 9999,
                      background: client.tier === 'Enterprise VIP' ? 'var(--accent-green-bg)' : 'var(--bg-surface-subtle)',
                      color: client.tier === 'Enterprise VIP' ? 'var(--accent-green-text)' : 'var(--text-secondary)',
                    }}
                  >
                    {client.tier === 'Enterprise VIP' && <Star size={10} fill="currentColor" />}
                    {client.tier}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {client.company} • {client.role}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playNav();
                onClose();
              }}
              className="glass-pill"
              style={{ width: 30, height: 30, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 16 }} className="no-scrollbar">
            {/* 3 Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px 14px', borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Contract Value
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 3 }}>
                  OMR {client.spent.toLocaleString()}
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px 14px', borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Active Modules
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 3 }}>
                  {client.contracts} modules
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px 14px', borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  SLA Uptime
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)', marginTop: 3 }}>
                  {client.slaUptime}
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="glass-card" style={{ padding: '14px 16px', fontSize: 12.5 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
                  <span>{client.region}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <Mail size={13} style={{ color: 'var(--text-muted)' }} />
                  <span>{client.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <Phone size={13} style={{ color: 'var(--text-muted)' }} />
                  <span>{client.phone}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Account Lead: <strong style={{ color: 'var(--text-primary)' }}>{client.accountManager}</strong>
                </div>
              </div>
            </div>

            {/* Subscribed Active Services */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Layers size={13} />
                <span>Active Subscribed Services</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {client.activeModulesList.map((mod, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'var(--bg-surface-subtle)',
                      fontSize: 12.5,
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>{mod}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--accent-green-text)', fontWeight: 600 }}>
                      <CheckCircle2 size={12} />
                      Operational
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Invoices in OMR */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                <FileText size={13} />
                <span>Recent Agreements & Billing (in OMR)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {client.recentInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'var(--bg-surface-subtle)',
                      fontSize: 12,
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', marginRight: 8, color: 'var(--text-primary)' }}>
                        {inv.id}
                      </span>
                      <span style={{ color: 'var(--text-secondary)' }}>{inv.desc}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                        OMR {inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <span
                        style={{
                          fontSize: 10.5,
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 9999,
                          background: 'var(--accent-green-bg)',
                          color: 'var(--accent-green-text)',
                        }}
                      >
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 16,
              borderTop: '1px solid var(--border-light)',
              marginTop: 16,
            }}
          >
            <button
              onClick={() => {
                sound.playSuccess();
              }}
              className="glass-pill"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}
            >
              <Download size={13} />
              <span>Download Statement</span>
            </button>

            <button
              onClick={onClose}
              style={{
                padding: '6px 18px',
                borderRadius: 9999,
                background: 'var(--pill-active-bg)',
                color: 'var(--pill-active-text)',
                fontSize: 12.5,
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
