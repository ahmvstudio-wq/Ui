import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  Truck,
  Info,
  Server,
  ShieldCheck,
  Cpu,
  X,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { Sparkline } from '../shared/Sparkline';
import { CircularProgress } from '../shared/CircularProgress';
import { sound } from '../../utils/sound';

interface OrderItem {
  id: string;
  customer: string;
  company: string;
  channel: 'Cloud SaaS' | 'On-Prem Trading' | 'Hybrid Cluster';
  items: string;
  amount: number;
  status: 'Active' | 'Deploying' | 'Provisioned';
  date: string;
  clusterNodes: number;
  sla: string;
  region: string;
}

const ORDERS_DATA: OrderItem[] = [
  {
    id: '#TDB-9420',
    customer: 'Emma Watson',
    company: 'Apex Global Technologies',
    channel: 'Cloud SaaS',
    items: 'Tadbeer ERP Core + AI Engine (50 Seats)',
    amount: 48500.0,
    status: 'Active',
    date: 'Oct 24, 2026',
    clusterNodes: 6,
    sla: '99.99%',
    region: 'Dubai, UAE',
  },
  {
    id: '#TDB-9419',
    customer: 'David Miller',
    company: 'Gulf Trading Capital',
    channel: 'On-Prem Trading',
    items: 'Low-Latency Core Engine v4 (Node 1-4)',
    amount: 32000.0,
    status: 'Active',
    date: 'Oct 24, 2026',
    clusterNodes: 4,
    sla: '99.98%',
    region: 'Riyadh, KSA',
  },
  {
    id: '#TDB-9418',
    customer: 'Sophie Chen',
    company: 'FinTech Innovations Asia',
    channel: 'Cloud SaaS',
    items: 'Omnichannel Trading Gateway & API Bridge',
    amount: 28500.0,
    status: 'Deploying',
    date: 'Oct 23, 2026',
    clusterNodes: 4,
    sla: '99.97%',
    region: 'Singapore',
  },
  {
    id: '#TDB-9417',
    customer: 'Marcus Aurel',
    company: 'Aurel Financial OS',
    channel: 'Hybrid Cluster',
    items: 'Cloud Client Portal Pro + Automated Billing Module',
    amount: 19850.0,
    status: 'Active',
    date: 'Oct 23, 2026',
    clusterNodes: 2,
    sla: '99.95%',
    region: 'London, UK',
  },
  {
    id: '#TDB-9416',
    customer: 'Chloe Bennett',
    company: 'Bennett Logistics & Trade',
    channel: 'Cloud SaaS',
    items: 'Enterprise ERP Core Module (30 Seats) + Warehouse Tracker',
    amount: 16200.0,
    status: 'Active',
    date: 'Oct 22, 2026',
    clusterNodes: 3,
    sla: '99.98%',
    region: 'Abu Dhabi, UAE',
  },
  {
    id: '#TDB-9415',
    customer: 'Lucas Vance',
    company: 'Quantum Capital Global',
    channel: 'On-Prem Trading',
    items: 'High-Frequency Core Engine (Cluster B) + Sandbox',
    amount: 24000.0,
    status: 'Deploying',
    date: 'Oct 22, 2026',
    clusterNodes: 3,
    sla: '99.90%',
    region: 'Zurich, Switzerland',
  },
  {
    id: '#TDB-9414',
    customer: 'Aria Thorne',
    company: 'Emirates Asset Management',
    channel: 'Cloud SaaS',
    items: 'AI Workflow Transformation Suite & OCR Pipeline',
    amount: 14450.0,
    status: 'Provisioned',
    date: 'Oct 21, 2026',
    clusterNodes: 2,
    sla: '99.95%',
    region: 'Dubai, UAE',
  },
  {
    id: '#TDB-9413',
    customer: 'Ethan Brooks',
    company: 'Brooks Trading Partners',
    channel: 'Cloud SaaS',
    items: 'Trading API Connector & Analytics Suite',
    amount: 11850.0,
    status: 'Active',
    date: 'Oct 20, 2026',
    clusterNodes: 2,
    sla: '99.95%',
    region: 'Doha, Qatar',
  },
];

type OrderStatusFilter = 'All' | 'Active' | 'Deploying' | 'Provisioned';

export const OrdersView: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const filtered = ORDERS_DATA.filter((ord) => {
    const matchesStatus = statusFilter === 'All' || ord.status === statusFilter;
    const matchesQuery =
      ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const totalRevenue = filtered.reduce((acc, curr) => acc + curr.amount, 0);
  const totalNodes = filtered.reduce((acc, curr) => acc + curr.clusterNodes, 0);

  const handleOpenDetail = (order: OrderItem) => {
    sound.playNav();
    setSelectedOrder(order);
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
          Software Contracts & Deployments
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
          <span style={{ fontFamily: 'var(--font-mono)' }}>{filtered.length}</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>active deployments</span>
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
            {(['All', 'Active', 'Deploying', 'Provisioned'] as OrderStatusFilter[]).map((st) => {
              const isSelected = statusFilter === st;
              return (
                <button
                  key={st}
                  onClick={() => {
                    setStatusFilter(st);
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
                      layoutId="active-orders-filter-pill"
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
                  {st}
                </button>
              );
            })}
          </div>

          {/* Date Selector Pill */}
          <div
            onClick={() => sound.playFilter()}
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '6px 14px',
              fontSize: 12.5,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <Clock size={13} style={{ color: 'var(--text-muted)' }} />
            <span>Q4 2026 Sovereign Deployments</span>
          </div>
        </div>

        {/* Right Actions */}
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
            <span>Export Deployments</span>
          </motion.button>
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
        {/* Card 1: Total Deployments ARR (Dark Hero Card) */}
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
                <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 500 }}>Total Deployments ARR</span>
                <Info size={13} style={{ color: '#9ca3af', opacity: 0.7 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  <AnimatedNumber value={totalRevenue} prefix="OMR " duration={900} />
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
                  ↑ 22.4% ARR expansion
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
              {filtered.length} active enterprise cluster agreements
            </span>
          </div>
        </motion.div>

        {/* Card 2: Active Server Nodes */}
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
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Cloud Nodes</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  <AnimatedNumber value={totalNodes} duration={900} /> nodes
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
                  ↑ 4 nodes this week
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <Sparkline data={[12, 14, 15, 18, 19, 21, 23, 24]} width={76} height={28} strokeColor="var(--text-primary)" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Muscat MC1 Sovereign Center
            </span>
          </div>
        </motion.div>

        {/* Card 3: Deployment SLA Delivery */}
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
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Deployment SLA Delivery</span>
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
                  Zero unmanaged downtime
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <CircularProgress value={99.98} size={42} strokeWidth={4} />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              All milestones delivered on-time
            </span>
          </div>
        </motion.div>

        {/* Card 4: Mean Provisioning Velocity */}
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
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Mean Provisioning Velocity</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  1.2 days
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
                  ↓ 0.8 days vs benchmark
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <Sparkline data={[3.2, 2.9, 2.6, 2.2, 1.9, 1.6, 1.4, 1.2]} width={76} height={28} strokeColor="#34d399" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Automated CI/CD orchestrator
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. Interactive Deployments & Contracts Table Card */}
      <div className="glass-card" style={{ padding: '20px 24px', overflow: 'hidden', minHeight: 'calc(100vh - 460px)', borderRadius: 20 }}>
        {/* Table Filter & Search Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Active Deployments Directory
          </div>

          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--bg-surface-subtle)',
              padding: '6px 14px',
              borderRadius: 9999,
              width: 280,
              border: '1px solid var(--border-light)',
            }}
          >
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search client, contract ID, or module..."
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

        {/* Table */}
        <div style={{ width: '100%', overflowX: 'auto' }} className="no-scrollbar">
          <table style={{ width: '100%', minWidth: 780, borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '14px 14px' }}>Contract ID</th>
                <th style={{ padding: '14px 14px' }}>Enterprise Client</th>
                <th style={{ padding: '14px 14px' }}>Topology & Channel</th>
                <th style={{ padding: '14px 14px' }}>Software Modules</th>
                <th style={{ padding: '14px 14px' }}>Signed Date</th>
                <th style={{ padding: '14px 14px' }}>Contract ARR</th>
                <th style={{ padding: '14px 14px' }}>SLA Target</th>
                <th style={{ padding: '14px 14px' }}>Status</th>
                <th style={{ padding: '14px 14px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ord, idx) => (
                <motion.tr
                  key={ord.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  onClick={() => handleOpenDetail(ord)}
                  style={{
                    borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border-light)',
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '16px 14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {ord.id}
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ord.customer}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{ord.company}</div>
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: 9999,
                        background:
                          ord.channel === 'Cloud SaaS'
                            ? 'var(--accent-green-bg)'
                            : ord.channel === 'On-Prem Trading'
                            ? 'rgba(59, 130, 246, 0.12)'
                            : 'var(--bg-surface-subtle)',
                        color:
                          ord.channel === 'Cloud SaaS'
                            ? 'var(--accent-green-text)'
                            : ord.channel === 'On-Prem Trading'
                            ? '#3b82f6'
                            : 'var(--text-secondary)',
                      }}
                    >
                      {ord.channel}
                    </span>
                  </td>
                  <td style={{ padding: '16px 14px', color: 'var(--text-secondary)', maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ord.items}
                  </td>
                  <td style={{ padding: '16px 14px', color: 'var(--text-muted)', fontSize: 12 }}>
                    {ord.date}
                  </td>
                  <td style={{ padding: '16px 14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    OMR {ord.amount.toLocaleString()} / yr
                  </td>
                  <td style={{ padding: '16px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-green-text)' }}>
                    {ord.sla}
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 9999,
                        background:
                          ord.status === 'Active'
                            ? 'var(--accent-green-bg)'
                            : ord.status === 'Deploying'
                            ? 'rgba(59, 130, 246, 0.12)'
                            : 'var(--accent-orange-bg)',
                        color:
                          ord.status === 'Active'
                            ? 'var(--accent-green-text)'
                            : ord.status === 'Deploying'
                            ? '#3b82f6'
                            : 'var(--accent-orange-text)',
                      }}
                    >
                      {ord.status === 'Active' && <CheckCircle2 size={11} />}
                      {ord.status === 'Deploying' && <Truck size={11} />}
                      {ord.status === 'Provisioned' && <Clock size={11} />}
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                      <span>View</span>
                      <ChevronRight size={13} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Sleek Deployment Detail Drawer / Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div
            onClick={() => setSelectedOrder(null)}
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
                maxWidth: 580,
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
                    <Server size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {selectedOrder.id}
                      </h3>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 9999,
                          background: 'var(--accent-green-bg)',
                          color: 'var(--accent-green-text)',
                        }}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                      {selectedOrder.company} • {selectedOrder.customer}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playNav();
                    setSelectedOrder(null);
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
                      Contract ARR
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 3 }}>
                      OMR {selectedOrder.amount.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px 14px', borderRadius: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Active Nodes
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 3 }}>
                      {selectedOrder.clusterNodes} Nodes
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px 14px', borderRadius: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      SLA Guarantee
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)', marginTop: 3 }}>
                      {selectedOrder.sla}
                    </div>
                  </div>
                </div>

                {/* Cluster Topology & Specs */}
                <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 16px', borderRadius: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Cpu size={14} />
                    <span>Infrastructure & Cluster Specification</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <div><strong>Data Residency:</strong> Muscat MC1 Sovereign Zone ({selectedOrder.region})</div>
                    <div><strong>Deployment Model:</strong> {selectedOrder.channel}</div>
                    <div><strong>Encryption & Security:</strong> TLS 1.3 + FIPS 140-2 Hardware HSM</div>
                  </div>
                </div>

                {/* Subscribed Software Items */}
                <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 16px', borderRadius: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={14} />
                    <span>Deployed Platform Package</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={14} style={{ color: 'var(--accent-green-text)', flexShrink: 0 }} />
                    <span>{selectedOrder.items}</span>
                  </div>
                </div>

                {/* SLA Trust Stamp */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--accent-green-text)' }}>
                  <ShieldCheck size={14} />
                  <span>CBO & SOC2 Type II Certified Deployment</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border-light)', marginTop: 16 }}>
                <button
                  onClick={() => sound.playSuccess()}
                  className="glass-pill"
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}
                >
                  <Download size={14} />
                  <span>Download SLA Agreement</span>
                </button>

                <button
                  onClick={() => {
                    sound.playSuccess();
                    setSelectedOrder(null);
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9999,
                    fontSize: 12.5,
                    fontWeight: 600,
                    background: '#111113',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
