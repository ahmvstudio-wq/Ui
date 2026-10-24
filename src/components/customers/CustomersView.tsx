import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  MapPin,
  Info,
  Download,
  LayoutGrid,
  List,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { Sparkline } from '../shared/Sparkline';
import { CircularProgress } from '../shared/CircularProgress';
import { sound } from '../../utils/sound';
import { ClientProfileModal, type CustomerProfileData } from '../modals/ClientProfileModal';

const CUSTOMERS_DATA: CustomerProfileData[] = [
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
    region: 'Singapore',
    role: 'Head of Infrastructure',
    email: 'sophie.chen@fintech-asia.io',
    phone: '+65 6789 0123',
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

type ClientFilter = 'All' | 'Enterprise VIP' | 'SaaS Pro' | 'Trial Account';

export const CustomersView: React.FC = () => {
  const [filterTier, setFilterTier] = useState<ClientFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedClient, setSelectedClient] = useState<CustomerProfileData | null>(null);

  const filtered = CUSTOMERS_DATA.filter((c) => {
    const matchesTier = filterTier === 'All' || c.tier === filterTier;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const totalSpent = CUSTOMERS_DATA.reduce((acc, c) => acc + c.spent, 0);
  const avgACV = Math.round(totalSpent / CUSTOMERS_DATA.length);

  const handleOpenProfile = (client: CustomerProfileData) => {
    sound.playNav();
    setSelectedClient(client);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      {/* 1. Title Row with Live Indicator (Cloned from Dashboard Style) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          Enterprise Clients
        </h1>

        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => sound.playHover()}
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 15px',
            fontSize: 12.5,
            fontWeight: 600,
            color: 'var(--text-primary)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <span className="live-dot" />
          <span style={{ fontFamily: 'var(--font-mono)' }}>{CUSTOMERS_DATA.length}</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>active accounts</span>
        </motion.div>
      </div>

      {/* 2. Sub-header Filter & Actions Row (Cloned from Dashboard Style) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
          marginBottom: 22,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          {/* Capsule Segmented Control with layoutId sliding pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface-subtle)',
              padding: 3,
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
              position: 'relative',
            }}
          >
            {(['All', 'Enterprise VIP', 'SaaS Pro', 'Trial Account'] as ClientFilter[]).map((tier) => {
              const isSelected = filterTier === tier;
              return (
                <button
                  key={tier}
                  onClick={() => {
                    setFilterTier(tier);
                    sound.playFilter();
                  }}
                  style={{
                    position: 'relative',
                    padding: '5px 14px',
                    borderRadius: 9999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: isSelected ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                    transition: 'color 0.2s ease',
                    zIndex: 2,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-client-tier-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 9999,
                        background: 'var(--pill-active-bg)',
                        zIndex: -1,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                      }}
                    />
                  )}
                  {tier}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-surface)',
              padding: '6px 14px',
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
              width: 240,
            }}
          >
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: 12.5,
                color: 'var(--text-primary)',
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* View Switcher & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => sound.playSuccess()}
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              fontSize: 12.5,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            <Download size={14} />
            <span>Export Directory</span>
          </motion.button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface-subtle)',
              padding: 2.5,
              borderRadius: 9999,
              border: '1px solid var(--border-light)',
            }}
          >
            <button
              onClick={() => {
                setViewMode('cards');
                sound.playFilter();
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 9999,
                background: viewMode === 'cards' ? 'var(--pill-active-bg)' : 'transparent',
                color: viewMode === 'cards' ? 'var(--pill-active-text)' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Modern Profiles Grid"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => {
                setViewMode('table');
                sound.playFilter();
              }}
              style={{
                padding: '5px 10px',
                borderRadius: 9999,
                background: viewMode === 'table' ? 'var(--pill-active-bg)' : 'transparent',
                color: viewMode === 'table' ? 'var(--pill-active-text)' : 'var(--text-muted)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Table View"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. 4 Metric Cards Row (Cloned from Dashboard Style) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 24,
        }}
      >
        {/* Card 1: Total Portfolio Value (Dark Card) */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="dark-hero-card"
          style={{
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '172px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 500 }}>Total Portfolio ARR</span>
                <Info size={13} style={{ color: '#9ca3af', opacity: 0.7 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  <AnimatedNumber value={totalSpent} prefix="OMR " duration={900} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: '#34d399',
                    background: 'rgba(52, 211, 153, 0.14)',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    marginTop: 8,
                  }}
                >
                  ↑ 14.8% portfolio growth
                </div>
              </div>

              {/* 3 Glowing Activity Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3.5, height: 30, paddingBottom: 2 }}>
                <div style={{ width: 5, height: 18, borderRadius: 3, background: '#6b7280', animation: 'pulse 1.8s infinite ease-in-out' }} />
                <div style={{ width: 5, height: 28, borderRadius: 3, background: '#e5e7eb', animation: 'pulse 1.8s infinite ease-in-out 0.2s' }} />
                <div style={{ width: 5, height: 22, borderRadius: 3, background: '#ffffff', animation: 'pulse 1.8s infinite ease-in-out 0.4s' }} />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed rgba(255, 255, 255, 0.12)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: '#e5e7eb', opacity: 0.85 }}>
              6 global & regional accounts
            </span>
          </div>
        </motion.div>

        {/* Card 2: Average ACV */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-card"
          style={{
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '172px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Average ACV</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  <AnimatedNumber value={avgACV} prefix="OMR " duration={900} />
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: 'var(--accent-green-text)',
                    background: 'var(--accent-green-bg)',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    marginTop: 8,
                  }}
                >
                  ↑ 8.2% vs last month
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <Sparkline data={[16, 18, 17, 21, 20, 24, 26, 28]} width={76} height={28} strokeColor="var(--text-primary)" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Healthy account retention
            </span>
          </div>
        </motion.div>

        {/* Card 3: Account Health */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-card-subtle"
          style={{
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '172px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Client Health Index</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  <AnimatedNumber value={96} duration={900} />%
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: 'var(--accent-green-text)',
                    background: 'var(--accent-green-bg)',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    marginTop: 8,
                  }}
                >
                  Top percentile
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <CircularProgress value={96} size={42} strokeWidth={4} />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Zero critical escalations
            </span>
          </div>
        </motion.div>

        {/* Card 4: Mean SLA Uptime */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="glass-card"
          style={{
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '172px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Mean SLA Delivery</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  99.98%
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: 'var(--accent-green-text)',
                    background: 'var(--accent-green-bg)',
                    padding: '2px 8px',
                    borderRadius: 9999,
                    marginTop: 8,
                  }}
                >
                  Dedicated GCC MC1
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <Sparkline data={[99.9, 99.94, 99.96, 99.97, 99.98, 99.98, 99.99, 99.98]} width={76} height={28} strokeColor="#34d399" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Guaranteed sovereign uptime
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. Modern Profiles Grid / Table Mode */}
      {viewMode === 'cards' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20, minHeight: 'calc(100vh - 460px)' }}>
          {filtered.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => handleOpenProfile(client)}
              className="glass-card"
              style={{
                padding: '24px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderRadius: 20,
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                minHeight: 280,
              }}
            >
              <div>
                {/* Header: Avatar + Name + Tier */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
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
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                    >
                      {client.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>
                        {client.name}
                      </h3>
                      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>
                        {client.company}
                      </div>
                    </div>
                  </div>

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

                {/* Subtitle / Role & Region */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                  <span>{client.role}</span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: 'var(--text-secondary)' }}>
                    <MapPin size={11} />
                    {client.region}
                  </span>
                </div>

                {/* Micro KPIs Strip */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr 1fr',
                    gap: 8,
                    background: 'var(--bg-surface-subtle)',
                    padding: '10px 12px',
                    borderRadius: 12,
                    marginBottom: 14,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Contract
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                      OMR {client.spent.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Modules
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                      {client.contracts} active
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      SLA
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)', marginTop: 2 }}>
                      {client.slaUptime}
                    </div>
                  </div>
                </div>

                {/* Subscribed Services Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {client.activeModulesList.slice(0, 2).map((m, mIdx) => (
                    <span
                      key={mIdx}
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: 'var(--bg-surface-subtle)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Sovereign SLA & Security Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--accent-green-text)', marginTop: 12 }}>
                  <ShieldCheck size={12} />
                  <span>Sovereign SLA Guaranteed (MC1 Cluster)</span>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: '1px dashed var(--border-light)',
                  marginTop: 14,
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Lead: <strong style={{ color: 'var(--text-primary)' }}>{client.accountManager}</strong>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  <span>Full Profile</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Clean Table Mode */
        <div className="glass-card" style={{ padding: '16px 20px', overflow: 'hidden', minHeight: 'calc(100vh - 460px)' }}>
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
      )}

      {/* Modern Client Profile Modal */}
      <ClientProfileModal
        isOpen={Boolean(selectedClient)}
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </motion.div>
  );
};
