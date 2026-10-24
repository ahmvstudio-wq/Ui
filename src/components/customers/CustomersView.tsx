import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import { sound } from '../../utils/sound';
import { ClientProfileModal, type CustomerProfileData } from '../modals/ClientProfileModal';

const CUSTOMERS: CustomerProfileData[] = [
  {
    id: 'c1',
    name: 'Emma Watson',
    company: 'Apex Global Technologies',
    spent: 28400.0,
    contracts: 12,
    tier: 'Enterprise VIP',
    region: 'Dubai, UAE',
    role: 'Chief Technology Officer',
    email: 'emma.watson@apex-global.com',
    phone: '+971 4 390 1200',
    accountManager: 'Mohammed Rehan',
    slaUptime: '99.99%',
    activeModulesList: [
      'Tadbeer Enterprise ERP Core v4.8 (50 Seats)',
      'AI Document Intelligence & OCR Pipeline',
      'Omnichannel B2B Gateway & Webhooks',
    ],
    recentInvoices: [
      { id: 'INV-8821', desc: 'Q3 Enterprise ERP Core License', date: 'Oct 01, 2026', amount: 14200.0, status: 'Paid' },
      { id: 'INV-8419', desc: 'Q2 Enterprise ERP Core License', date: 'Jul 01, 2026', amount: 14200.0, status: 'Paid' },
    ],
  },
  {
    id: 'c2',
    name: 'David Miller',
    company: 'Gulf Trading Capital',
    spent: 48500.0,
    contracts: 8,
    tier: 'Enterprise VIP',
    region: 'Riyadh, KSA',
    role: 'VP of Engineering',
    email: 'david.miller@gulftrading.com',
    phone: '+966 11 482 9900',
    accountManager: 'Mohammed Rehan',
    slaUptime: '99.98%',
    activeModulesList: [
      'Tadbeer Low-Latency Core Engine (4 Nodes)',
      'Enterprise Data Pipeline & Analytics',
    ],
    recentInvoices: [
      { id: 'INV-8750', desc: 'Enterprise Node Cluster SLA', date: 'Sep 15, 2026', amount: 24250.0, status: 'Paid' },
      { id: 'INV-8210', desc: 'Enterprise Node Cluster Setup', date: 'Mar 15, 2026', amount: 24250.0, status: 'Paid' },
    ],
  },
  {
    id: 'c3',
    name: 'Sophie Chen',
    company: 'FinTech Innovations Asia',
    spent: 18200.0,
    contracts: 6,
    tier: 'Enterprise VIP',
    region: 'Muscat, Oman',
    role: 'Head of Infrastructure',
    email: 'sophie.chen@fintech-asia.io',
    phone: '+968 2450 1234',
    accountManager: 'Salim Al Balushi',
    slaUptime: '99.97%',
    activeModulesList: [
      'Omnichannel Trading Gateway & API Bridge',
      'AI Workflow Transformation Suite',
    ],
    recentInvoices: [
      { id: 'INV-8690', desc: 'Annual API Gateway Retainer', date: 'Aug 10, 2026', amount: 18200.0, status: 'Paid' },
    ],
  },
  {
    id: 'c4',
    name: 'Marcus Aurel',
    company: 'Aurel Financial OS',
    spent: 9400.0,
    contracts: 3,
    tier: 'SaaS Pro',
    region: 'London, UK',
    role: 'Operations Director',
    email: 'marcus@aurel-os.co.uk',
    phone: '+44 20 7946 0192',
    accountManager: 'Mohammed Rehan',
    slaUptime: '99.95%',
    activeModulesList: [
      'Cloud Client Portal Pro',
      'Automated Billing & Reporting Module',
    ],
    recentInvoices: [
      { id: 'INV-8540', desc: 'SaaS Pro Annual Retainer', date: 'Jul 22, 2026', amount: 9400.0, status: 'Paid' },
    ],
  },
  {
    id: 'c5',
    name: 'Chloe Bennett',
    company: 'Bennett Logistics & Trade',
    spent: 14200.0,
    contracts: 5,
    tier: 'Enterprise VIP',
    region: 'Abu Dhabi, UAE',
    role: 'Supply Chain Executive Lead',
    email: 'c.bennett@bennett-logistics.ae',
    phone: '+971 2 612 8844',
    accountManager: 'Salim Al Balushi',
    slaUptime: '99.98%',
    activeModulesList: [
      'Enterprise ERP Core (30 Seats)',
      'Multi-Warehouse Inventory Tracker',
    ],
    recentInvoices: [
      { id: 'INV-8490', desc: 'Logistics ERP Core Subscription', date: 'Jun 18, 2026', amount: 14200.0, status: 'Paid' },
    ],
  },
  {
    id: 'c6',
    name: 'Lucas Vance',
    company: 'Quantum Capital Global',
    spent: 5400.0,
    contracts: 2,
    tier: 'Trial Account',
    region: 'Zurich, Switzerland',
    role: 'Systems Architect',
    email: 'lucas.vance@quantumcap.ch',
    phone: '+41 44 215 5500',
    accountManager: 'Mohammed Rehan',
    slaUptime: '99.90%',
    activeModulesList: [
      'Tadbeer Cloud Sandbox Environment',
      'API Integration Testing Cluster',
    ],
    recentInvoices: [
      { id: 'INV-8301', desc: 'Sandbox Environment Provisioning', date: 'May 05, 2026', amount: 5400.0, status: 'Paid' },
    ],
  },
];

export const CustomersView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<CustomerProfileData | null>(null);

  const filtered = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.region.toLowerCase().includes(query.toLowerCase())
  );

  const handleOpenProfile = (c: CustomerProfileData) => {
    sound.playNav();
    setSelectedClient(c);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Enterprise Clients & Accounts
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
            Tadbeer Transformation client relationship management, SLA tracking, and ACV metrics
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--bg-surface)', padding: '5px 14px', borderRadius: 9999, border: '1px solid var(--border-light)', width: 260 }}>
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search enterprise client or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 12.5, color: 'var(--text-primary)', width: '100%', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '16px 20px', overflow: 'hidden', minHeight: 'calc(100vh - 290px)' }}>
        <div style={{ width: '100%', overflowX: 'auto' }} className="no-scrollbar">
          <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '16px 14px' }}>Client Lead</th>
                <th style={{ padding: '16px 14px' }}>Organization & Location</th>
                <th style={{ padding: '16px 14px' }}>Active Contracts</th>
                <th style={{ padding: '16px 14px' }}>Annual Contract Value</th>
                <th style={{ padding: '16px 14px' }}>SLA Tier</th>
                <th style={{ padding: '16px 14px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  onClick={() => handleOpenProfile(c)}
                  style={{
                    borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border-light)',
                    fontSize: 13.5,
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '16px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{c.role}</div>
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.company}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>{c.region}</div>
                  </td>
                  <td style={{ padding: '16px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{c.contracts} modules</td>
                  <td style={{ padding: '16px 14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    OMR {c.spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11.5,
                        fontWeight: 700,
                        padding: '3px 9px',
                        borderRadius: 9999,
                        background: c.tier === 'Enterprise VIP' ? 'var(--accent-green-bg)' : 'var(--bg-surface-subtle)',
                        color: c.tier === 'Enterprise VIP' ? 'var(--accent-green-text)' : 'var(--text-secondary)',
                      }}
                    >
                      {c.tier === 'Enterprise VIP' && <Star size={11} fill="currentColor" />}
                      {c.tier}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProfile(c);
                      }}
                      className="glass-pill"
                      style={{ padding: '4px 12px', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      Profile
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clean Client Profile Modal */}
      <ClientProfileModal
        isOpen={Boolean(selectedClient)}
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </motion.div>
  );
};
