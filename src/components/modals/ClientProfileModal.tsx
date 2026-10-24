import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Building2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Download,
  Copy,
  Layers,
  FileText,
  Activity,
  MessageSquare,
  Send,
  Server,
  Sparkles,
} from 'lucide-react';
import { sound } from '../../utils/sound';

export interface EnterpriseClient {
  id: string;
  name: string;
  nameArabic: string;
  company: string;
  companyArabic: string;
  industry: string;
  location: string;
  crNumber: string;
  vatNumber: string;
  headOffice: string;
  accountManager: string;
  accountManagerRole: string;
  clientLeadRole: string;
  email: string;
  phone: string;
  tcv: number;
  arr: number;
  slaUptime: string;
  renewalDate: string;
  tier: 'Enterprise VIP' | 'SaaS Pro' | 'Strategic Partner';
  activeModules: Array<{
    id: string;
    name: string;
    category: string;
    status: 'Operational' | 'Updating' | 'Provisioned';
    version: string;
    nodes: number;
  }>;
  contracts: Array<{
    id: string;
    title: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Processing' | 'Pending';
    method: string;
  }>;
  openTickets: Array<{
    id: string;
    title: string;
    severity: 'High' | 'Medium' | 'Low';
    status: 'Investigating' | 'Scheduled' | 'Resolved';
    time: string;
  }>;
}

interface ClientProfileModalProps {
  isOpen: boolean;
  client: EnterpriseClient | null;
  onClose: () => void;
}

type TabKey = 'overview' | 'modules' | 'contracts' | 'telemetry' | 'notes';

export const ClientProfileModal: React.FC<ClientProfileModalProps> = ({
  isOpen,
  client,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Array<{ id: string; author: string; time: string; text: string }>>([
    {
      id: 'n1',
      author: 'Mohammed Rehan (Tadbeer Principal)',
      time: 'Oct 24, 2026 • 11:30 AM',
      text: 'Completed Q3 enterprise review with client IT executive. Requested expansion of Oman VAT automated tax filing connector for 2 new branches.',
    },
    {
      id: 'n2',
      author: 'Salim Al Harthy (Client Lead)',
      time: 'Oct 18, 2026 • 03:15 PM',
      text: 'Verified 99.98% SLA performance during end-of-month payroll dispatch. High throughput with zero latency spikes.',
    },
  ]);
  const [actionToast, setActionToast] = useState<string | null>(null);

  if (!isOpen || !client) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    sound.playSuccess();
    triggerToast(`${label} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    sound.playSuccess();
    setNotes([
      {
        id: `n-${Date.now()}`,
        author: 'You (Operations Officer)',
        time: 'Just now',
        text: newNote.trim(),
      },
      ...notes,
    ]);
    setNewNote('');
    triggerToast('Account note recorded in audit log');
  };

  const handleDownloadInvoice = (contractId: string) => {
    sound.playSuccess();
    triggerToast(`Tax invoice for ${contractId} exported as PDF`);
  };

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
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
            maxWidth: 880,
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
          {/* Top Banner / Header with Gradient Glass */}
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

            {/* Entity Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
              {/* Monogram Avatar */}
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #111113 0%, #374151 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {client.company.slice(0, 2).toUpperCase()}
              </div>

              {/* Title & Metadata */}
              <div style={{ flex: 1, minWidth: 0, paddingRight: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                  <h2
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}
                  >
                    {client.company}
                  </h2>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      fontFamily: 'system-ui, sans-serif',
                    }}
                  >
                    {client.companyArabic}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 12.5 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontWeight: 700,
                      color: 'var(--accent-green-text)',
                      background: 'var(--accent-green-bg)',
                      padding: '2px 8px',
                      borderRadius: 9999,
                    }}
                  >
                    <ShieldCheck size={13} />
                    {client.tier}
                  </span>

                  <span style={{ color: 'var(--text-muted)' }}>•</span>

                  <span style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
                    {client.location}
                  </span>

                  <span style={{ color: 'var(--text-muted)' }}>•</span>

                  <span style={{ color: 'var(--text-secondary)' }}>
                    {client.industry}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick KPI Strip in OMR */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 12,
                marginTop: 20,
                padding: '14px 16px',
                borderRadius: 14,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Contract Value
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                  OMR {client.tcv.toLocaleString()}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Annual Recurring (ARR)
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                  OMR {client.arr.toLocaleString()} / yr
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  SLA Uptime
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)', marginTop: 2 }}>
                  {client.slaUptime}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Next Renewal
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
                  {client.renewalDate}
                </div>
              </div>
            </div>

            {/* Navigation Tabs Bar with spring capsule */}
            <div
              style={{
                display: 'flex',
                gap: 4,
                marginTop: 18,
                overflowX: 'auto',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: 2,
              }}
              className="no-scrollbar"
            >
              {[
                { key: 'overview', label: 'Overview & Legal', icon: Building2 },
                { key: 'modules', label: `Active Services (${client.activeModules.length})`, icon: Layers },
                { key: 'contracts', label: `Contracts & Invoices (${client.contracts.length})`, icon: FileText },
                { key: 'telemetry', label: 'SLA & Telemetry', icon: Activity },
                { key: 'notes', label: `Audit Notes (${notes.length})`, icon: MessageSquare },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key as TabKey);
                      sound.playTab();
                    }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 14px',
                      fontSize: 12.5,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <Icon size={14} style={{ opacity: isActive ? 1 : 0.7 }} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="client-modal-active-tab"
                        transition={{ type: 'spring', damping: 25, stiffness: 450 }}
                        style={{
                          position: 'absolute',
                          bottom: -2,
                          left: 0,
                          right: 0,
                          height: 2,
                          background: 'var(--text-primary)',
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div
            style={{
              padding: '24px 28px',
              overflowY: 'auto',
              flex: 1,
            }}
            className="no-scrollbar"
          >
            {/* TAB 1: OVERVIEW & LEGAL */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {/* Legal Identification Grid */}
                <div
                  className="glass-card"
                  style={{
                    padding: '20px 22px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 16,
                  }}
                >
                  {/* CR Number */}
                  <div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Commercial Registration (MOCI)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                        {client.crNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(client.crNumber, 'CR Number')}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: copiedField === 'CR Number' ? 'var(--accent-green-text)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        title="Copy CR Number"
                      >
                        {copiedField === 'CR Number' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      Verified Ministry of Commerce, Industry & Investment Promotion
                    </div>
                  </div>

                  {/* VAT Tax ID */}
                  <div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Oman VAT Identification (OTA)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                        {client.vatNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(client.vatNumber, 'VAT TIN')}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: copiedField === 'VAT TIN' ? 'var(--accent-green-text)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        title="Copy VAT Number"
                      >
                        {copiedField === 'VAT TIN' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      Registered 5% Oman Value Added Tax System
                    </div>
                  </div>

                  {/* Head Office */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Registered Corporate Address
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>
                      {client.headOffice}
                    </div>
                  </div>
                </div>

                {/* Key Stakeholders & Relationship Management */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 16,
                  }}
                >
                  {/* Client Lead */}
                  <div className="glass-card" style={{ padding: '18px 20px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10 }}>
                      Primary Client Stakeholder
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
                      {client.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                      {client.clientLeadRole}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5 }}>
                      <a
                        href={`mailto:${client.email}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-secondary)', textDecoration: 'none' }}
                      >
                        <Mail size={13} style={{ color: 'var(--text-muted)' }} />
                        <span>{client.email}</span>
                      </a>
                      <a
                        href={`tel:${client.phone}`}
                        style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-secondary)', textDecoration: 'none' }}
                      >
                        <Phone size={13} style={{ color: 'var(--text-muted)' }} />
                        <span>{client.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Assigned Tadbeer Relationship Lead */}
                  <div className="glass-card" style={{ padding: '18px 20px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10 }}>
                      Assigned Tadbeer Lead
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
                      {client.accountManager}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                      {client.accountManagerRole}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12.5 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-secondary)' }}>
                        <Mail size={13} style={{ color: 'var(--text-muted)' }} />
                        <span>operation@tadbeertt.com</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-secondary)' }}>
                        <Phone size={13} style={{ color: 'var(--text-muted)' }} />
                        <span>+968 7630 7656 (Muscat Office)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sovereign Hosting & Compliance Information */}
                <div className="glass-card" style={{ padding: '18px 20px' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Server size={15} />
                    <span>Data Residency & Infrastructure Architecture</span>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Dedicated isolated cluster provisioned inside Equinix MC1 Muscat sovereign data facility. Certified fully compliant with the National Data Protection Law of the Sultanate of Oman (Royal Decree 6/2022) with automatic encrypted daily off-site mirroring.
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 2: ACTIVE SERVICES & MODULES */}
            {activeTab === 'modules' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                    Active deployments for {client.company}
                  </span>
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      triggerToast('Provisioning request sent to Tadbeer DevOps cluster');
                    }}
                    className="glass-pill"
                    style={{ fontSize: 12, padding: '4px 12px', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    + Provision Add-on
                  </button>
                </div>

                {client.activeModules.map((mod, idx) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="glass-card"
                    style={{
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 14,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: 'var(--bg-surface-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <Layers size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
                          {mod.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          {mod.category} • Version {mod.version} • {mod.nodes} active nodes
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 11.5,
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: 9999,
                          background: 'var(--accent-green-bg)',
                          color: 'var(--accent-green-text)',
                        }}
                      >
                        <span className="live-dot" style={{ width: 6, height: 6 }} />
                        {mod.status}
                      </span>

                      <button
                        onClick={() => {
                          sound.playNav();
                          triggerToast(`Configuring environment for ${mod.name}`);
                        }}
                        className="glass-pill"
                        style={{ fontSize: 12, padding: '4px 10px', color: 'var(--text-secondary)' }}
                      >
                        Configure
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* TAB 3: CONTRACTS & BILLING IN OMR */}
            {activeTab === 'contracts' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
                    Executed Enterprise Agreements & Tax Invoices (in OMR)
                  </span>
                  <button
                    onClick={() => {
                      sound.playSuccess();
                      triggerToast('Full annual billing ledger generated in OMR');
                    }}
                    className="glass-pill"
                    style={{ fontSize: 12, padding: '4px 12px', fontWeight: 600, color: 'var(--text-primary)' }}
                  >
                    <Download size={13} style={{ marginRight: 4 }} />
                    Download Ledger (PDF)
                  </button>
                </div>

                <div className="glass-card" style={{ padding: '4px 0', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: 11.5, textTransform: 'uppercase' }}>
                        <th style={{ padding: '12px 18px' }}>Invoice #</th>
                        <th style={{ padding: '12px 18px' }}>Description</th>
                        <th style={{ padding: '12px 18px' }}>Date</th>
                        <th style={{ padding: '12px 18px' }}>Amount</th>
                        <th style={{ padding: '12px 18px' }}>Status</th>
                        <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {client.contracts.map((c, i) => (
                        <tr
                          key={c.id}
                          style={{
                            borderBottom: i === client.contracts.length - 1 ? 'none' : '1px solid var(--border-light)',
                          }}
                        >
                          <td style={{ padding: '14px 18px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                            {c.id}
                          </td>
                          <td style={{ padding: '14px 18px', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {c.title}
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.method}</div>
                          </td>
                          <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: 12 }}>
                            {c.date}
                          </td>
                          <td style={{ padding: '14px 18px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                            OMR {c.amount.toLocaleString()}
                          </td>
                          <td style={{ padding: '14px 18px' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: 9999,
                                background: c.status === 'Paid' ? 'var(--accent-green-bg)' : 'var(--bg-surface-subtle)',
                                color: c.status === 'Paid' ? 'var(--accent-green-text)' : 'var(--text-secondary)',
                              }}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleDownloadInvoice(c.id)}
                              className="glass-pill"
                              style={{ fontSize: 11.5, padding: '3px 10px', color: 'var(--text-secondary)' }}
                            >
                              PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB 4: SLA & TELEMETRY */}
            {activeTab === 'telemetry' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
              >
                {/* Real-time Health Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                  <div className="glass-card" style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                      Muscat Edge Latency
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 4 }}>
                      14 ms
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--accent-green-text)', marginTop: 2 }}>
                      Optimal routing via Omantel IX
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                      Database Uptime
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)', marginTop: 4 }}>
                      99.992%
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      Multi-AZ replica in Salalah
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '16px 18px' }}>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>
                      Oman VAT Sync Health
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 4 }}>
                      100% OK
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--accent-green-text)', marginTop: 2 }}>
                      Synchronized with OTA gateway
                    </div>
                  </div>
                </div>

                {/* Support Tickets Section */}
                <div className="glass-card" style={{ padding: '18px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Recent SLA Incidents & Support Tickets
                    </div>
                    <button
                      onClick={() => {
                        sound.playNav();
                        triggerToast('New priority ticket opened with Tadbeer Enterprise Support');
                      }}
                      className="glass-pill"
                      style={{ fontSize: 12, padding: '3px 10px', color: 'var(--text-primary)' }}
                    >
                      + Open Ticket
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {client.openTickets.map((t) => (
                      <div
                        key={t.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: 'var(--bg-surface-subtle)',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: 6 }}>{t.id}</span>
                            {t.title}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            Reported {t.time}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: 6,
                              background: t.severity === 'High' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                              color: t.severity === 'High' ? '#ef4444' : '#3b82f6',
                            }}
                          >
                            {t.severity}
                          </span>
                          <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {t.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: AUDIT NOTES & TIMELINE */}
            {activeTab === 'notes' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {/* Note input form */}
                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Log account note, SLA review, or stakeholder meeting..."
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: 12,
                      border: '1px solid var(--border-medium)',
                      background: 'var(--bg-surface-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: 13,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '0 18px',
                      borderRadius: 12,
                      background: 'var(--pill-active-bg)',
                      color: 'var(--pill-active-text)',
                      fontWeight: 600,
                      fontSize: 13,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Send size={14} />
                    <span>Post</span>
                  </button>
                </form>

                {/* Notes Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {notes.map((n) => (
                    <div
                      key={n.id}
                      className="glass-card"
                      style={{ padding: '16px 18px', position: 'relative' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                          {n.author}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {n.time}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                        {n.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Bar with Actions */}
          <div
            style={{
              padding: '14px 28px',
              borderTop: '1px solid var(--border-light)',
              background: 'var(--bg-surface-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 12.5,
            }}
          >
            <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={13} />
              <span>Client record synchronized with Tadbeer Cloud Master Registry</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => {
                  sound.playSuccess();
                  triggerToast(`Client Statement exported for ${client.company}`);
                }}
                className="glass-pill"
                style={{ padding: '6px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}
              >
                <Download size={13} style={{ marginRight: 4 }} />
                Export Profile
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: '6px 18px',
                  borderRadius: 9999,
                  background: 'var(--pill-active-bg)',
                  color: 'var(--pill-active-text)',
                  fontSize: 12,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
            </div>
          </div>

          {/* Floating Toast notification */}
          <AnimatePresence>
            {actionToast && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                style={{
                  position: 'absolute',
                  bottom: 70,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#111113',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 200,
                  pointerEvents: 'none',
                }}
              >
                <Sparkles size={14} style={{ color: '#34d399' }} />
                <span>{actionToast}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
