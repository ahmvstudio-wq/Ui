import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, CheckCircle2 } from 'lucide-react';
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
    description: 'Multi-branch inventory, procurement workflows, and financial accounting.',
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
    description: 'Bilingual document parsing, automated workflows, and cognitive AI agents.',
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
    description: 'Bespoke web applications, client portals, and low-latency API microservices.',
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
    description: 'B2B lead generation, regional SEO dominance, and high-ROI acquisition funnels.',
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
    description: 'Workforce management, WPS automated payroll, and labor compliance tools.',
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
    description: 'High-availability regional cloud clusters, automated backups, and 99.99% SLA.',
  },
];

export const ProductsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
            Services & Software Modules
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
            Tadbeer Transformation Trading ecosystem • Enterprise solutions and active deployments
          </p>
        </div>

        <button
          onClick={() => handleOpenDeploy(SERVICES_DATA[0])}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 9999,
            fontSize: 12.5,
            fontWeight: 600,
            background: 'var(--pill-active-bg)',
            color: 'var(--pill-active-text)',
            boxShadow: 'var(--shadow-md)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Plus size={15} />
          <span>Deploy Service</span>
        </button>
      </div>

      {/* Category Pills matching original */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
        {['All', 'ERP Core', 'AI Solutions', 'Software', 'Marketing', 'Cloud & IT'].map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                sound.playFilter();
              }}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                background: isActive ? 'var(--pill-active-bg)' : 'var(--bg-surface)',
                color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                border: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid matching exact original structure & typography */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20, minHeight: 'calc(100vh - 290px)' }}>
        {filtered.map((prod, idx) => {
          const stockRatio = (prod.stock / prod.maxStock) * 100;
          const isEnterprise = prod.status === 'Enterprise Tier';

          return (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              onClick={() => handleOpenDeploy(prod)}
              className="glass-card"
              style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 230, cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, padding: '2px 8px', borderRadius: 9999, background: 'var(--bg-surface-subtle)', color: 'var(--text-secondary)' }}>
                    {prod.category}
                  </span>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {prod.sku}
                  </span>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                  {prod.name}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.4 }}>
                  {prod.description}
                </p>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  OMR {prod.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div style={{ marginTop: 14 }}>
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

      {/* Clean Quick Deploy Modal (exact concept matching OrdersQuickModal & SettingsModal) */}
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
                maxWidth: 520,
                background: 'var(--bg-surface)',
                padding: '24px 28px',
                borderRadius: 22,
                boxShadow: 'var(--shadow-popover)',
                border: '1px solid var(--border-medium)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {deployModalService.name}
                  </h3>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    SKU: {deployModalService.sku} • {deployModalService.category}
                  </div>
                </div>
                <button
                  onClick={() => setDeployModalService(null)}
                  className="glass-pill"
                  style={{ width: 30, height: 30, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={15} />
                </button>
              </div>

              <div style={{ background: 'var(--bg-surface-subtle)', padding: '14px 16px', borderRadius: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  Enterprise Pricing
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: 2 }}>
                  OMR {deployModalService.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}> / month</span>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.4 }}>
                  {deployModalService.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Status: <strong style={{ color: 'var(--accent-green-text)' }}>{deployModalService.status}</strong></span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{deployModalService.stock} licenses provisioned</span>
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
                    padding: '7px 18px',
                    borderRadius: 9999,
                    background: 'var(--pill-active-bg)',
                    color: 'var(--pill-active-text)',
                    fontSize: 12.5,
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Confirm Provisioning
                </button>
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
