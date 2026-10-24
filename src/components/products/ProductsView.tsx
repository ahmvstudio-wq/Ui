import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, CheckCircle2, Info, Layers } from 'lucide-react';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { Sparkline } from '../shared/Sparkline';
import { CircularProgress } from '../shared/CircularProgress';
import { sound } from '../../utils/sound';

interface ServiceProduct {
  id: string;
  name: string;
  category: 'ERP Core' | 'AI Solutions' | 'Software' | 'Marketing' | 'Cloud & IT';
  sku: string;
  price: number;
  stock: number;
  maxStock: number;
  status: 'Active' | 'Enterprise Tier' | 'Beta Preview';
  description: string;
  image: string;
  tags: string[];
}

const SERVICES_DATA: ServiceProduct[] = [
  {
    id: 's1',
    name: 'Enterprise ERP Core System',
    category: 'ERP Core',
    sku: 'TDB-ERP-01',
    price: 1450.0,
    stock: 48,
    maxStock: 60,
    status: 'Active',
    description: 'Multi-branch inventory synchronization, procurement workflows, and automated financial accounting.',
    image: '/services/erp.jpg',
    tags: ['Multi-Branch Inventory', 'Oman VAT Ready', 'Supply Chain'],
  },
  {
    id: 's2',
    name: 'AI Business Automation & OCR',
    category: 'AI Solutions',
    sku: 'TDB-AI-02',
    price: 1200.0,
    stock: 34,
    maxStock: 50,
    status: 'Active',
    description: 'Bilingual document parsing, automated invoice OCR, and autonomous customer workflow agents.',
    image: '/services/ai.jpg',
    tags: ['Arabic/English OCR', 'Workflow Agents', 'Predictive AI'],
  },
  {
    id: 's3',
    name: 'Custom Enterprise Software',
    category: 'Software',
    sku: 'TDB-SFT-03',
    price: 3800.0,
    stock: 14,
    maxStock: 25,
    status: 'Enterprise Tier',
    description: 'Bespoke web applications, client portals, and secure low-latency REST/GraphQL API microservices.',
    image: '/services/software.jpg',
    tags: ['Next.js & React', 'Microservices', 'Custom Portals'],
  },
  {
    id: 's4',
    name: 'Digital Marketing Growth Engine',
    category: 'Marketing',
    sku: 'TDB-MKT-04',
    price: 850.0,
    stock: 28,
    maxStock: 40,
    status: 'Active',
    description: 'B2B enterprise lead generation, regional GCC SEO dominance, and high-ROI conversion funnels.',
    image: '/services/marketing.jpg',
    tags: ['B2B Lead Gen', 'Regional SEO', 'Paid Acquisition'],
  },
  {
    id: 's5',
    name: 'Human Capital & Payroll Hub',
    category: 'Cloud & IT',
    sku: 'TDB-HR-05',
    price: 950.0,
    stock: 22,
    maxStock: 35,
    status: 'Active',
    description: 'Workforce management, automated WPS wage protection payroll, and labor compliance tools.',
    image: '/services/hr.jpg',
    tags: ['WPS Payroll', 'Talent Search', 'Compliance Audits'],
  },
  {
    id: 's6',
    name: 'Sovereign Cloud & DevOps',
    category: 'Cloud & IT',
    sku: 'TDB-CLD-06',
    price: 1100.0,
    stock: 38,
    maxStock: 50,
    status: 'Enterprise Tier',
    description: 'High-availability regional cloud clusters, automated daily encrypted backups, and 99.99% SLA.',
    image: '/services/cloud.jpg',
    tags: ['99.99% SLA Uptime', 'Muscat Data Residency', 'Disaster Recovery'],
  },
];

type CategoryFilter = 'All' | 'ERP Core' | 'AI Solutions' | 'Software' | 'Marketing' | 'Cloud & IT';

export const ProductsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [deployModalService, setDeployModalService] = useState<ServiceProduct | null>(null);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const filtered = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((p) => p.category === selectedCategory);

  const handleOpenDeploy = (srv: ServiceProduct) => {
    sound.playNav();
    setDeployModalService(srv);
  };

  const handleConfirmDeploy = () => {
    sound.playSuccess();
    setDeployModalService(null);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 3000);
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
          Services & Software
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
          <span style={{ fontFamily: 'var(--font-mono)' }}>6</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>active platforms</span>
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
            {(['All', 'ERP Core', 'AI Solutions', 'Software', 'Marketing', 'Cloud & IT'] as CategoryFilter[]).map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
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
                      layoutId="active-service-filter-pill"
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
                  {cat}
                </button>
              );
            })}
          </div>

          <div
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              fontSize: 12.5,
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}
          >
            <Layers size={13} style={{ color: 'var(--text-muted)' }} />
            <span>Sultanate of Oman • GCC Core</span>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpenDeploy(SERVICES_DATA[0])}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 16px',
              borderRadius: 9999,
              fontSize: 12.5,
              fontWeight: 600,
              background: '#111113',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            <Plus size={14} />
            <span>Deploy Service</span>
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
        {/* Card 1: Active sales (Dark Card) */}
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
                <span style={{ fontSize: 13, color: '#d1d5db', fontWeight: 500 }}>Active Services ARR</span>
                <Info size={13} style={{ color: '#9ca3af', opacity: 0.7 }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  <AnimatedNumber value={94800} prefix="OMR " duration={900} />
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
                  ↑ 18.4% vs last cycle
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
              6 provisioned software engines
            </span>
          </div>
        </motion.div>

        {/* Card 2: Deployed Licenses */}
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
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Active Licenses</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  <AnimatedNumber value={184} duration={900} />
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
                  ↑ 12.5% deployed
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <Sparkline data={[14, 18, 22, 28, 35, 42, 48, 56]} width={76} height={28} strokeColor="var(--text-primary)" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Out of 260 total capacity
            </span>
          </div>
        </motion.div>

        {/* Card 3: Cloud Capacity */}
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
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>Cloud Capacity</span>
              <Info size={13} style={{ color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
                  <AnimatedNumber value={78} duration={900} />%
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
                  Optimal load
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <CircularProgress value={78} size={42} strokeWidth={4} />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Muscat MC1 Sovereign Center
            </span>
          </div>
        </motion.div>

        {/* Card 4: SLA Reliability */}
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
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>System SLA Uptime</span>
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
                  ↑ 0.02 pt vs SLA
                </div>
              </div>

              <div style={{ paddingBottom: 2 }}>
                <Sparkline data={[99.9, 99.92, 99.95, 99.97, 99.98, 99.98, 99.98, 99.99]} width={76} height={28} strokeColor="#34d399" />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: 12, borderTop: '1px dashed var(--border-light)', marginTop: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              Zero unmanaged outages
            </span>
          </div>
        </motion.div>
      </div>

      {/* 4. Services Grid with Visual Image Headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 20, minHeight: 'calc(100vh - 460px)' }}>
        {filtered.map((prod, idx) => {
          const stockRatio = (prod.stock / prod.maxStock) * 100;
          const isEnterprise = prod.status === 'Enterprise Tier';

          return (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => handleOpenDeploy(prod)}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                {/* Visual Image Header */}
                <div style={{ position: 'relative', width: '100%', height: 165, overflow: 'hidden', background: '#111113' }}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.88,
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 9999,
                        background: 'rgba(255, 255, 255, 0.92)',
                        color: '#111113',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {prod.category}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: 'var(--font-mono)',
                        color: '#ffffff',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '2px 8px',
                        borderRadius: 9999,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {prod.sku}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px 22px 14px 22px' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.25 }}>
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.45 }}>
                    {prod.description}
                  </p>

                  {/* Capability tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {prod.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          padding: '2px 8px',
                          borderRadius: 6,
                          background: 'var(--bg-surface-subtle)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    OMR {prod.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}> / mo</span>
                  </div>
                </div>
              </div>

              {/* Progress & Bottom status */}
              <div style={{ padding: '0 22px 18px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Deployed: {prod.stock} / {prod.maxStock} licenses</span>
                  <span style={{ fontWeight: 600, color: isEnterprise ? '#8b5cf6' : 'var(--accent-green-text)' }}>
                    {prod.status}
                  </span>
                </div>
                <div style={{ width: '100%', height: 4, borderRadius: 9999, background: 'var(--border-light)', overflow: 'hidden' }}>
                  <div style={{ width: `${stockRatio}%`, height: '100%', background: isEnterprise ? '#8b5cf6' : 'var(--text-primary)', borderRadius: 9999, transition: 'width 0.4s ease' }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Clean Quick Deploy Modal */}
      <AnimatePresence>
        {deployModalService && (
          <div
            onClick={() => setDeployModalService(null)}
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
                maxWidth: 540,
                background: 'var(--bg-surface)',
                borderRadius: 22,
                boxShadow: 'var(--shadow-popover)',
                border: '1px solid var(--border-medium)',
                overflow: 'hidden',
              }}
            >
              {/* Image in modal header */}
              <div style={{ position: 'relative', width: '100%', height: 160, background: '#111113' }}>
                <img
                  src={deployModalService.image}
                  alt={deployModalService.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                <button
                  onClick={() => setDeployModalService(null)}
                  className="glass-pill"
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 30,
                    height: 30,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    border: 'none',
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {deployModalService.name}
                  </h3>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {deployModalService.sku}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.45 }}>
                  {deployModalService.description}
                </p>

                <div style={{ background: 'var(--bg-surface-subtle)', padding: '12px 16px', borderRadius: 12, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Enterprise Pricing
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                    OMR {deployModalService.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}> / month</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Status: <strong style={{ color: 'var(--accent-green-text)' }}>{deployModalService.status}</strong></span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{deployModalService.stock} / {deployModalService.maxStock} deployed</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button
                    onClick={() => setDeployModalService(null)}
                    className="glass-pill"
                    style={{ padding: '7px 16px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDeploy}
                    style={{
                      padding: '7px 20px',
                      borderRadius: 9999,
                      background: 'var(--pill-active-bg)',
                      color: 'var(--pill-active-text)',
                      fontSize: 12.5,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Provision Service
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Success Toast */}
      <AnimatePresence>
        {isSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#111113',
              color: '#ffffff',
              padding: '8px 18px',
              borderRadius: 9999,
              fontSize: 12.5,
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 300,
            }}
          >
            <CheckCircle2 size={15} style={{ color: '#34d399' }} />
            <span>Service module successfully provisioned!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
