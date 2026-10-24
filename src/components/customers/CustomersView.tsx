import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  MapPin,
  LayoutGrid,
  List,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { sound } from '../../utils/sound';
import { ClientProfileModal, type EnterpriseClient } from '../modals/ClientProfileModal';
import { AnimatedNumber } from '../shared/AnimatedNumber';

export const ENTERPRISE_CLIENTS: EnterpriseClient[] = [
  {
    id: 'cli-01',
    name: 'Eng. Salim Al Harthy',
    nameArabic: 'م. سالم الحارثي',
    company: 'Oman Air',
    companyArabic: 'الطيران العماني',
    industry: 'Aviation & National Transport',
    location: 'Muscat, Seeb',
    headOffice: 'Muscat International Airport Complex, Seeb, Sultanate of Oman',
    crNumber: 'CR 1048291',
    vatNumber: 'OM1100293481',
    clientLeadRole: 'Chief Digital Transformation Officer',
    accountManager: 'Mohammed Rehan',
    accountManagerRole: 'Principal Solutions Architect',
    email: 'salim.alharthy@omanair.com',
    phone: '+968 2451 9000',
    tcv: 142500,
    arr: 48500,
    slaUptime: '99.99%',
    renewalDate: 'Nov 2027 (Year 3)',
    tier: 'Enterprise VIP',
    activeModules: [
      { id: 'm1', name: 'Tadbeer Enterprise ERP Core v4.8', category: 'ERP & Software', status: 'Operational', version: '4.8.2', nodes: 8 },
      { id: 'm2', name: 'Oman VAT e-Invoicing XML Connector', category: 'ERP & Software', status: 'Operational', version: '2.1.0', nodes: 4 },
      { id: 'm3', name: 'AI Ground Crew Schedule Dispatcher', category: 'AI Technology', status: 'Operational', version: '1.4.0', nodes: 6 },
      { id: 'm4', name: 'Human Capital & Omanization Engine', category: 'Human Capital', status: 'Operational', version: '3.2.0', nodes: 4 },
    ],
    contracts: [
      { id: 'INV-2026-089', title: 'Q3 Enterprise Core Platform License', date: 'Oct 01, 2026', amount: 24250, status: 'Paid', method: 'Bank Muscat Transfer' },
      { id: 'INV-2026-042', title: 'Q2 Enterprise Core Platform License', date: 'Jul 01, 2026', amount: 24250, status: 'Paid', method: 'Bank Muscat Transfer' },
      { id: 'SOW-2025-011', title: 'Bespoke AI Optimization Engine Deployment', date: 'Jan 15, 2026', amount: 45000, status: 'Paid', method: 'Corporate Escrow' },
    ],
    openTickets: [
      { id: 'TDB-841', title: 'Preparation for Oman Tax Authority 2027 schema update', severity: 'Medium', status: 'Scheduled', time: '2 days ago' },
      { id: 'TDB-798', title: 'Ground crew mobile biometric login API sync', severity: 'Low', status: 'Resolved', time: '1 week ago' },
    ],
  },
  {
    id: 'cli-02',
    name: 'Sheikh Nasser Al Harrasi',
    nameArabic: 'الشيخ ناصر الحراصي',
    company: 'Al Harrasi Rope Factory',
    companyArabic: 'مصنع الحراصي للحبال',
    industry: 'Industrial Manufacturing & Exports',
    location: 'Muscat, Ghala',
    headOffice: 'Plot 418, Ghala Industrial Area, Muscat, Sultanate of Oman',
    crNumber: 'CR 1394821',
    vatNumber: 'OM1100481920',
    clientLeadRole: 'Managing Director & Operations Head',
    accountManager: 'Salim Al Balushi',
    accountManagerRole: 'Senior Enterprise Consultant',
    email: 'nasser@alharrasi-ropes.com',
    phone: '+968 2459 3421',
    tcv: 86400,
    arr: 32000,
    slaUptime: '99.98%',
    renewalDate: 'Dec 2026 (Year 2)',
    tier: 'Enterprise VIP',
    activeModules: [
      { id: 'm1', name: 'Tadbeer Multi-Plant Manufacturing ERP', category: 'ERP & Software', status: 'Operational', version: '4.8.1', nodes: 4 },
      { id: 'm2', name: 'Industrial IoT Telemetry & Production Line Sensor Hub', category: 'ERP & Software', status: 'Operational', version: '3.0.4', nodes: 6 },
      { id: 'm3', name: 'Raw Material Inventory & Supply Chain Automation', category: 'ERP & Software', status: 'Operational', version: '4.2.0', nodes: 4 },
    ],
    contracts: [
      { id: 'INV-2026-077', title: 'Industrial ERP Maintenance & Cloud Telemetry', date: 'Oct 15, 2026', amount: 16000, status: 'Paid', method: 'Ahli Bank Transfer' },
      { id: 'INV-2026-031', title: 'Ghala Plant Expansion Telemetry Integration', date: 'Apr 10, 2026', amount: 16000, status: 'Paid', method: 'Ahli Bank Transfer' },
    ],
    openTickets: [
      { id: 'TDB-830', title: 'Weighing bridge scale serial-to-cloud webhook latency check', severity: 'Medium', status: 'Investigating', time: 'Yesterday' },
    ],
  },
  {
    id: 'cli-03',
    name: 'Dr. Maryam Al Balushi',
    nameArabic: 'د. مريم البلوشية',
    company: 'Oman Vision 2040 Unit',
    companyArabic: 'وحدة متابعة تنفيذ رؤية عُمان 2040',
    industry: 'Government Digital Transformation',
    location: 'Muscat, KOM',
    headOffice: 'Knowledge Oasis Muscat (KOM 4), Al Rusayl, Sultanate of Oman',
    crNumber: 'CR 1002938',
    vatNumber: 'OM1100091823',
    clientLeadRole: 'Director of National Performance Monitoring',
    accountManager: 'Mohammed Rehan',
    accountManagerRole: 'Principal Solutions Architect',
    email: 'm.balushi@vision2040.gov.om',
    phone: '+968 2415 5000',
    tcv: 98000,
    arr: 28500,
    slaUptime: '99.99%',
    renewalDate: 'Jan 2028 (Year 2)',
    tier: 'Strategic Partner',
    activeModules: [
      { id: 'm1', name: 'National Strategic KPI Orchestration Engine', category: 'Software Solutions', status: 'Operational', version: '5.1.0', nodes: 12 },
      { id: 'm2', name: 'Cognitive Arabic Document Parser & Classifier', category: 'AI Technology', status: 'Operational', version: '2.4.0', nodes: 8 },
      { id: 'm3', name: 'Sovereign Private Cloud Cluster (Muscat)', category: 'Cloud Infrastructure', status: 'Operational', version: '4.8.0', nodes: 16 },
    ],
    contracts: [
      { id: 'INV-2026-081', title: 'National Indicator Dashboard & AI Parser SLA', date: 'Sep 01, 2026', amount: 28500, status: 'Paid', method: 'Ministry of Finance Direct' },
    ],
    openTickets: [
      { id: 'TDB-812', title: 'Automated executive summary generation template tuning', severity: 'Low', status: 'Resolved', time: '3 days ago' },
    ],
  },
  {
    id: 'cli-04',
    name: 'Tariq Al Zadjali',
    nameArabic: 'طارق الزدجالي',
    company: 'Sultanate of Marble',
    companyArabic: 'رخام السلطنة',
    industry: 'Natural Stone Mining & GCC Export',
    location: 'Muscat & Sohar',
    headOffice: 'Sohar Port Freezone & Al Maabilah Industrial, Sultanate of Oman',
    crNumber: 'CR 1184920',
    vatNumber: 'OM1100349201',
    clientLeadRole: 'VP of Commercial Logistics',
    accountManager: 'Salim Al Balushi',
    accountManagerRole: 'Senior Enterprise Consultant',
    email: 'tariq@sultanatemarble.om',
    phone: '+968 2685 1100',
    tcv: 64200,
    arr: 19850,
    slaUptime: '99.96%',
    renewalDate: 'Mar 2027 (Year 2)',
    tier: 'Enterprise VIP',
    activeModules: [
      { id: 'm1', name: 'Tadbeer Quarry Inventory & Container Export System', category: 'ERP & Software', status: 'Operational', version: '4.6.0', nodes: 4 },
      { id: 'm2', name: 'Oman Custom Bayan System API Bridge', category: 'ERP & Software', status: 'Operational', version: '2.0.1', nodes: 2 },
    ],
    contracts: [
      { id: 'INV-2026-064', title: 'Sohar Freezone Dispatch ERP Maintenance', date: 'Aug 14, 2026', amount: 9925, status: 'Paid', method: 'National Bank of Oman' },
      { id: 'INV-2026-022', title: 'Sohar Freezone Dispatch ERP Setup', date: 'Feb 10, 2026', amount: 9925, status: 'Paid', method: 'National Bank of Oman' },
    ],
    openTickets: [],
  },
  {
    id: 'cli-05',
    name: 'Fatima Al Lawati',
    nameArabic: 'فاطمة اللواتية',
    company: "Gloria Jean's Coffees Oman",
    companyArabic: 'جلوريا جينز كافيه عمان',
    industry: 'Hospitality, F&B & Multi-Branch Retail',
    location: 'Muscat & Salalah (14 Outlets)',
    headOffice: 'Al Shatti Street, Qurum Commercial Area, Muscat, Sultanate of Oman',
    crNumber: 'CR 1339201',
    vatNumber: 'OM1100938472',
    clientLeadRole: 'Head of Operations & Retail Systems',
    accountManager: 'Mohammed Rehan',
    accountManagerRole: 'Principal Solutions Architect',
    email: 'fatima.lawati@gloriajeansoman.com',
    phone: '+968 2460 2234',
    tcv: 48600,
    arr: 16200,
    slaUptime: '99.97%',
    renewalDate: 'Aug 2027 (Year 1)',
    tier: 'Enterprise VIP',
    activeModules: [
      { id: 'm1', name: 'Tadbeer Omnichannel Cloud POS Engine (14 Branches)', category: 'ERP & Software', status: 'Operational', version: '4.8.0', nodes: 14 },
      { id: 'm2', name: 'Central Commissary Warehouse & Stock Auto-Replenish', category: 'ERP & Software', status: 'Operational', version: '4.1.2', nodes: 4 },
      { id: 'm3', name: 'Loyalty & Customer Growth Engine', category: 'Digital Marketing', status: 'Operational', version: '2.8.0', nodes: 2 },
    ],
    contracts: [
      { id: 'INV-2026-059', title: '14-Store Central Cloud POS & Inventory Sync', date: 'Aug 01, 2026', amount: 16200, status: 'Paid', method: 'Bank Dhofar Transfer' },
    ],
    openTickets: [
      { id: 'TDB-804', title: 'Salalah Mall branch POS barcode scanner baud rate alignment', severity: 'Low', status: 'Resolved', time: '5 days ago' },
    ],
  },
  {
    id: 'cli-06',
    name: 'Ahmed Al Musharfi',
    nameArabic: 'أحمد المشرفي',
    company: 'AMEC Al Musharfi Engineering',
    companyArabic: 'شركة المشرفي للهندسة والمقاولات',
    industry: 'Civil Engineering, EPC & Infrastructure',
    location: 'Muscat, Al Khuwair',
    headOffice: 'Dohat Al Adab Street, Al Khuwair, Muscat, Sultanate of Oman',
    crNumber: 'CR 1402831',
    vatNumber: 'OM1100572819',
    clientLeadRole: 'Managing Partner & Projects Lead',
    accountManager: 'Salim Al Balushi',
    accountManagerRole: 'Senior Enterprise Consultant',
    email: 'ahmed@musharfi-engineering.om',
    phone: '+968 2448 8899',
    tcv: 72000,
    arr: 24000,
    slaUptime: '99.98%',
    renewalDate: 'May 2027 (Year 2)',
    tier: 'Enterprise VIP',
    activeModules: [
      { id: 'm1', name: 'EPC Project Costing & Subcontractor Billing ERP', category: 'ERP & Software', status: 'Operational', version: '4.7.1', nodes: 6 },
      { id: 'm2', name: 'Ministry of Housing Tendering Document Vault', category: 'Software Solutions', status: 'Operational', version: '3.1.0', nodes: 3 },
    ],
    contracts: [
      { id: 'INV-2026-052', title: 'Infrastructure Project Accounting & Billing System', date: 'May 10, 2026', amount: 12000, status: 'Paid', method: 'Bank Muscat Transfer' },
    ],
    openTickets: [],
  },
  {
    id: 'cli-07',
    name: 'Hamad Al Maqbali',
    nameArabic: 'حمد المقبالي',
    company: 'Mafran Meat & Livestock',
    companyArabic: 'شركة مفران للحوم والمواشي',
    industry: 'Agri-Business & Cold-Chain Distribution',
    location: 'Al Batinah & Muscat',
    headOffice: 'Barka Distribution Hub & Ghala Office, Sultanate of Oman',
    crNumber: 'CR 1209384',
    vatNumber: 'OM1100223948',
    clientLeadRole: 'Chief Executive Officer',
    accountManager: 'Mohammed Rehan',
    accountManagerRole: 'Principal Solutions Architect',
    email: 'h.maqbali@mafran.om',
    phone: '+968 2688 4400',
    tcv: 43350,
    arr: 14450,
    slaUptime: '99.95%',
    renewalDate: 'Feb 2027 (Year 1)',
    tier: 'SaaS Pro',
    activeModules: [
      { id: 'm1', name: 'Cold-Chain Telemetry & Livestock Traceability ERP', category: 'ERP & Software', status: 'Operational', version: '4.5.0', nodes: 4 },
      { id: 'm2', name: 'Oman Wages Protection System (WPS) Automated Payroll', category: 'Human Capital', status: 'Operational', version: '3.0.0', nodes: 2 },
    ],
    contracts: [
      { id: 'INV-2026-038', title: 'Cold-Chain ERP & Automated WPS Payroll Suite', date: 'Feb 20, 2026', amount: 14450, status: 'Paid', method: 'Sohar International Transfer' },
    ],
    openTickets: [],
  },
  {
    id: 'cli-08',
    name: 'Khalfan Al Rawahi',
    nameArabic: 'خلفان الرواحي',
    company: 'Atiin Omani Heritage',
    companyArabic: 'أتين للتراث والأصالة',
    industry: 'Luxury Omani Frankincense, Perfumes & Retail',
    location: 'Muscat, Mall of Oman & Salalah',
    headOffice: 'Al Araimi Boulevard & Salalah Al Haffa, Sultanate of Oman',
    crNumber: 'CR 1478293',
    vatNumber: 'OM1100881923',
    clientLeadRole: 'Founder & Managing Brand Director',
    accountManager: 'Mohammed Rehan',
    accountManagerRole: 'Principal Solutions Architect',
    email: 'khalfan@atiin.om',
    phone: '+968 2450 1234',
    tcv: 35550,
    arr: 11850,
    slaUptime: '99.98%',
    renewalDate: 'Sep 2027 (Year 1)',
    tier: 'SaaS Pro',
    activeModules: [
      { id: 'm1', name: 'Omnichannel B2B/B2C E-Commerce & Inventory Hub', category: 'ERP & Software', status: 'Operational', version: '4.8.0', nodes: 4 },
      { id: 'm2', name: 'GCC Digital Marketing & Performance Acquisition Engine', category: 'Digital Marketing', status: 'Operational', version: '3.4.0', nodes: 2 },
    ],
    contracts: [
      { id: 'INV-2026-083', title: 'Omnichannel Retail Core & GCC Marketing Engine', date: 'Sep 15, 2026', amount: 11850, status: 'Paid', method: 'Bank Muscat Transfer' },
    ],
    openTickets: [],
  },
];

export const CustomersView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedClient, setSelectedClient] = useState<EnterpriseClient | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const filtered = ENTERPRISE_CLIENTS.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.companyArabic.includes(query) ||
      c.crNumber.toLowerCase().includes(query.toLowerCase()) ||
      c.location.toLowerCase().includes(query.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'All' ||
      (selectedIndustry === 'VIP' && c.tier === 'Enterprise VIP') ||
      (selectedIndustry === 'Gov & Aviation' && (c.industry.includes('Aviation') || c.industry.includes('Government'))) ||
      (selectedIndustry === 'Industry & Mfg' && (c.industry.includes('Industrial') || c.industry.includes('Mining') || c.industry.includes('Engineering'))) ||
      (selectedIndustry === 'Retail & Hospitality' && (c.industry.includes('Hospitality') || c.industry.includes('Retail')));

    return matchesQuery && matchesIndustry;
  });

  const totalTCV = ENTERPRISE_CLIENTS.reduce((acc, curr) => acc + curr.tcv, 0);
  const totalARR = ENTERPRISE_CLIENTS.reduce((acc, curr) => acc + curr.arr, 0);

  const handleOpenClient = (client: EnterpriseClient) => {
    sound.playNav();
    setSelectedClient(client);
    setIsProfileOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      {/* Top Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Enterprise Clients & Corporate Accounts
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Tadbeer Transformation Trading client relationship management, SLA tracking, and ACV metrics across the Sultanate of Oman
          </p>
        </div>

        {/* View Switcher & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
              width: 280,
            }}
          >
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search client, CR #, or Arabic name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

          {/* Grid vs Table toggle */}
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
                transition: 'all 0.2s ease',
              }}
              title="Card Grid View"
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
                transition: 'all 0.2s ease',
              }}
              title="Detailed Table View"
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview Strip in OMR */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div className="glass-card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Portfolio Total Contract Value
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 4 }}>
            <AnimatedNumber value={totalTCV} prefix="OMR " duration={800} />
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--accent-green-text)', marginTop: 3 }}>
            ↑ 14.8% growth vs last fiscal cycle
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Annual Run-Rate (ARR)
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 4 }}>
            <AnimatedNumber value={totalARR} prefix="OMR " duration={800} />
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 3 }}>
            8 multi-year recurring retainers
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Average System Uptime
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)', marginTop: 4 }}>
            99.98%
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 3 }}>
            Sovereign Muscat MC1 Facility
          </div>
        </div>

        <div className="glass-card" style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
            Active Accounts in Oman
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 4 }}>
            {ENTERPRISE_CLIENTS.length} Accounts
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 3 }}>
            100% Oman VAT Compliant
          </div>
        </div>
      </div>

      {/* Industry Filter Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
        {[
          { key: 'All', label: 'All GCC Accounts' },
          { key: 'VIP', label: 'Enterprise VIP Tier' },
          { key: 'Gov & Aviation', label: 'Government & Aviation' },
          { key: 'Industry & Mfg', label: 'Industry & Manufacturing' },
          { key: 'Retail & Hospitality', label: 'Retail & Hospitality' },
        ].map((f) => {
          const isActive = selectedIndustry === f.key;
          return (
            <button
              key={f.key}
              onClick={() => {
                setSelectedIndustry(f.key);
                sound.playFilter();
              }}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 12.5,
                fontWeight: isActive ? 700 : 500,
                background: isActive ? 'var(--pill-active-bg)' : 'var(--bg-surface)',
                color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Main View: Cards Grid Mode */}
      {viewMode === 'cards' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 20,
            minHeight: 'calc(100vh - 460px)',
          }}
        >
          {filtered.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.03 }}
              whileHover={{ y: -3 }}
              onClick={() => handleOpenClient(client)}
              className="glass-card"
              style={{
                padding: '24px 26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderRadius: 20,
                minHeight: 290,
                border: '1px solid var(--border-light)',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
            >
              <div>
                {/* Header row with Avatar + Badges */}
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
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                    >
                      {client.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {client.company}
                      </h3>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'system-ui, sans-serif' }}>
                        {client.companyArabic}
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
                    {client.tier === 'Enterprise VIP' && <Star size={11} fill="currentColor" />}
                    {client.tier}
                  </span>
                </div>

                {/* Subtitle / Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 14 }}>
                  <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                  <span>{client.location}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span>{client.crNumber}</span>
                </div>

                {/* Financial Pill in OMR */}
                <div
                  style={{
                    background: 'var(--bg-surface-subtle)',
                    padding: '12px 14px',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Contract Value
                    </div>
                    <div style={{ fontSize: 16.5, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      OMR {client.tcv.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Annual ARR
                    </div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      OMR {client.arr.toLocaleString()} / yr
                    </div>
                  </div>
                </div>

                {/* Active Modules Strip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  <Layers size={13} style={{ color: 'var(--text-muted)' }} />
                  <span>{client.activeModules.length} provisioned systems</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: 'var(--accent-green-text)', fontWeight: 600 }}>{client.slaUptime} SLA</span>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 12,
                  borderTop: '1px dashed var(--border-light)',
                  marginTop: 8,
                }}
              >
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Lead: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{client.name.split(' ')[0]} {client.name.split(' ')[1] || ''}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>Full Profile</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="glass-card" style={{ padding: '16px 20px', overflow: 'hidden', minHeight: 'calc(100vh - 460px)' }}>
          <div style={{ width: '100%', overflowX: 'auto' }} className="no-scrollbar">
            <table style={{ width: '100%', minWidth: 780, borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '14px 14px' }}>Client Organization</th>
                  <th style={{ padding: '14px 14px' }}>Legal & CR #</th>
                  <th style={{ padding: '14px 14px' }}>Primary Stakeholder</th>
                  <th style={{ padding: '14px 14px' }}>Annual Contract (OMR)</th>
                  <th style={{ padding: '14px 14px' }}>SLA Uptime</th>
                  <th style={{ padding: '14px 14px' }}>Status Tier</th>
                  <th style={{ padding: '14px 14px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: idx * 0.02 }}
                    onClick={() => handleOpenClient(c)}
                    style={{
                      borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border-light)',
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.company}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{c.companyArabic} • {c.location}</div>
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', fontSize: 12.5 }}>
                        {c.crNumber}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>VAT: {c.vatNumber}</div>
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{c.clientLeadRole}</div>
                    </td>
                    <td style={{ padding: '14px 14px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                      OMR {c.arr.toLocaleString()} / yr
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-green-text)' }}>
                        {c.slaUptime}
                      </span>
                    </td>
                    <td style={{ padding: '14px 14px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 9999,
                          background: c.tier === 'Enterprise VIP' ? 'var(--accent-green-bg)' : 'var(--bg-surface-subtle)',
                          color: c.tier === 'Enterprise VIP' ? 'var(--accent-green-text)' : 'var(--text-secondary)',
                        }}
                      >
                        {c.tier}
                      </span>
                    </td>
                    <td style={{ padding: '14px 14px', textAlign: 'right' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenClient(c);
                        }}
                        className="glass-pill"
                        style={{ padding: '4px 12px', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}
                      >
                        View Profile
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full Client Profile Modal Interface */}
      <ClientProfileModal
        isOpen={isProfileOpen}
        client={selectedClient}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedClient(null);
        }}
      />
    </motion.div>
  );
};
