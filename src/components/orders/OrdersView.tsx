import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  Truck,
} from 'lucide-react';
import { AnimatedNumber } from '../shared/AnimatedNumber';
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
}

const ORDERS_DATA: OrderItem[] = [
  { id: '#TDB-9420', customer: 'Emma Watson', company: 'Global Asset Management', channel: 'Cloud SaaS', items: 'Tadbeer ERP Core + AI Engine (50 Seats)', amount: 4800.0, status: 'Active', date: 'Oct 24, 2026' },
  { id: '#TDB-9419', customer: 'David Miller', company: 'Gulf Trading Corp', channel: 'On-Prem Trading', items: 'Low-Latency Trading Engine v4 (Node 1-4)', amount: 8500.0, status: 'Active', date: 'Oct 24, 2026' },
  { id: '#TDB-9418', customer: 'Sophie Chen', company: 'Apex Financial Tech', channel: 'Cloud SaaS', items: 'Omnichannel Trading Gateway & API', amount: 2850.0, status: 'Deploying', date: 'Oct 23, 2026' },
  { id: '#TDB-9417', customer: 'Marcus Aurel', company: 'Capital Partners', channel: 'Hybrid Cluster', items: 'Client Portal Pro + Data Lake Pipeline', amount: 3850.0, status: 'Active', date: 'Oct 23, 2026' },
  { id: '#TDB-9416', customer: 'Chloe Bennett', company: 'Tadbeer Logistics & Trade', channel: 'Cloud SaaS', items: 'Enterprise ERP Core Module (30 Seats)', amount: 3200.0, status: 'Active', date: 'Oct 22, 2026' },
  { id: '#TDB-9415', customer: 'Lucas Vance', company: 'Quantum Capital', channel: 'On-Prem Trading', items: 'High-Frequency Trading Engine (Cluster B)', amount: 5400.0, status: 'Deploying', date: 'Oct 22, 2026' },
  { id: '#TDB-9414', customer: 'Aria Thorne', company: 'Emirates Financial Group', channel: 'Cloud SaaS', items: 'AI Transformation Agent (Full Stack)', amount: 1450.0, status: 'Provisioned', date: 'Oct 21, 2026' },
  { id: '#TDB-9413', customer: 'Ethan Brooks', company: 'Brooks Trading Partners', channel: 'Cloud SaaS', items: 'Trading API Connector & Analytics Suite', amount: 1850.0, status: 'Active', date: 'Oct 20, 2026' },
];

export const OrdersView: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Deploying' | 'Provisioned'>('All');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Software Contracts & Deployments
          </h1>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
            {filtered.length} active enterprise accounts • <AnimatedNumber value={totalRevenue} prefix="$" duration={600} decimals={2} /> annual contract value
          </span>
        </div>

        <button
          onClick={() => sound.playSuccess()}
          className="glass-pill"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}
        >
          <Download size={14} />
          <span>Export Contracts</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="glass-card" style={{ padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--bg-surface-subtle)', padding: 2.5, borderRadius: 9999 }}>
          {(['All', 'Active', 'Deploying', 'Provisioned'] as const).map((st) => {
            const isActive = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  sound.playFilter();
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 9999,
                  fontSize: 12.5,
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? 'var(--pill-active-bg)' : 'transparent',
                  color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-surface-subtle)', padding: '7px 14px', borderRadius: 9999, width: 290, border: '1px solid var(--border-light)' }}>
          <Search size={15} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search client, contract ID, or module..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: 'var(--text-primary)', width: '100%', fontFamily: 'inherit' }}
          />
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="glass-card" style={{ padding: '16px 20px', overflow: 'hidden', minHeight: 'calc(100vh - 290px)' }}>
        <div style={{ width: '100%', overflowX: 'auto' }} className="no-scrollbar">
          <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '16px 14px' }}>Contract ID</th>
              <th style={{ padding: '16px 14px' }}>Enterprise Client</th>
              <th style={{ padding: '16px 14px' }}>Deployment Model</th>
              <th style={{ padding: '16px 14px' }}>Software Modules</th>
              <th style={{ padding: '16px 14px' }}>Date</th>
              <th style={{ padding: '16px 14px' }}>Contract Value</th>
              <th style={{ padding: '16px 14px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ord, idx) => (
              <motion.tr
                key={ord.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                onClick={() => sound.playHover()}
                style={{
                  borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border-light)',
                  fontSize: 13.5,
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
                      fontSize: 11.5,
                      fontWeight: 600,
                      padding: '3px 10px',
                      borderRadius: 9999,
                      background: ord.channel === 'Cloud SaaS' ? 'var(--accent-green-bg)' : ord.channel === 'On-Prem Trading' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(0,0,0,0.06)',
                      color: ord.channel === 'Cloud SaaS' ? 'var(--accent-green-text)' : ord.channel === 'On-Prem Trading' ? '#3b82f6' : 'var(--text-secondary)',
                    }}
                  >
                    {ord.channel}
                  </span>
                </td>
                <td style={{ padding: '16px 14px', color: 'var(--text-secondary)', maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {ord.items}
                </td>
                <td style={{ padding: '16px 14px', color: 'var(--text-muted)', fontSize: 12.5 }}>
                  {ord.date}
                </td>
                <td style={{ padding: '16px 14px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  ${ord.amount.toFixed(2)}
                </td>
                <td style={{ padding: '16px 14px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11.5,
                      fontWeight: 600,
                      padding: '3px 9px',
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
                    {ord.status === 'Active' && <CheckCircle2 size={12} />}
                    {ord.status === 'Deploying' && <Truck size={12} />}
                    {ord.status === 'Provisioned' && <Clock size={12} />}
                    {ord.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </motion.div>
  );
};
