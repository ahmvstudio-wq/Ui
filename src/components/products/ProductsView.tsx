import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Product {
  id: string;
  name: string;
  category: 'ERP Core' | 'Trading' | 'AI Suite' | 'Cloud SaaS' | 'APIs';
  sku: string;
  price: number;
  stock: number;
  maxStock: number;
  status: 'Active' | 'Enterprise Tier' | 'Beta Preview';
}

const PRODUCTS_DATA: Product[] = [
  { id: 'p1', name: 'Tadbeer Enterprise ERP Core v4.8', category: 'ERP Core', sku: 'TDB-ERP-01', price: 4800.0, stock: 45, maxStock: 60, status: 'Active' },
  { id: 'p2', name: 'Tadbeer Low-Latency Trading Engine', category: 'Trading', sku: 'TDB-TRD-04', price: 8500.0, stock: 8, maxStock: 25, status: 'Enterprise Tier' },
  { id: 'p3', name: 'AI Digital Transformation Agent', category: 'AI Suite', sku: 'TDB-AI-12', price: 1450.0, stock: 92, maxStock: 100, status: 'Active' },
  { id: 'p4', name: 'Omnichannel Trading Gateway & API', category: 'APIs', sku: 'TDB-GW-08', price: 2850.0, stock: 14, maxStock: 30, status: 'Active' },
  { id: 'p5', name: 'Tadbeer Cloud Client Portal Pro', category: 'Cloud SaaS', sku: 'TDB-UI-02', price: 650.0, stock: 18, maxStock: 40, status: 'Active' },
  { id: 'p6', name: 'Enterprise Data Lake & ETL Engine', category: 'Cloud SaaS', sku: 'TDB-ETL-09', price: 3200.0, stock: 38, maxStock: 50, status: 'Active' },
];

export const ProductsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = selectedCategory === 'All'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

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
            Software Products & Modules
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
            Tadbeer Transformation Trading Software Ecosystem • 6 active enterprise platforms
          </p>
        </div>

        <button
          onClick={() => sound.playSuccess()}
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
          }}
        >
          <Plus size={15} />
          <span>Deploy Module</span>
        </button>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
        {['All', 'ERP Core', 'Trading', 'AI Suite', 'Cloud SaaS', 'APIs'].map((cat) => {
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
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
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
              onClick={() => sound.playHover()}
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

                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {prod.name}
                </h3>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                  ${prod.price.toFixed(2)}
                </div>
              </div>

              <div>
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
    </motion.div>
  );
};
