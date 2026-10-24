import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Play, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  executions: number;
}

const AUTOMATIONS_DATA: Workflow[] = [
  {
    id: 'a1',
    name: 'Low-Latency Trading SLA Failover',
    trigger: 'Execution node latency exceeds 1.5ms',
    action: 'Trigger automated failover to standby cluster & alert DevOps',
    active: true,
    executions: 48,
  },
  {
    id: 'a2',
    name: 'Enterprise Cloud Tenant Provisioning',
    trigger: 'New enterprise software contract signed',
    action: 'Auto-provision isolated AWS Kubernetes pod & generate client JWT keys',
    active: true,
    executions: 124,
  },
  {
    id: 'a3',
    name: 'Release Milestone & CI/CD Sync',
    trigger: 'Tadbeer ERP Core v4.8 card moved to "Done"',
    action: 'Trigger automated regression suite & update changelog portal',
    active: true,
    executions: 312,
  },
];

export const AutomationsView: React.FC = () => {
  const [flows, setFlows] = useState<Workflow[]>(AUTOMATIONS_DATA);

  const toggleFlow = (id: string) => {
    sound.playToggle();
    setFlows((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f))
    );
  };

  const handleTestRun = (_flowName: string) => {
    sound.playSuccess();
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
    });
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
            Automations & AI Workflows
          </h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
            Tadbeer Transformation Trading automated CI/CD, SLA failovers, and intelligent routing
          </p>
        </div>

        <button
          onClick={() => sound.playSuccess()}
          className="glass-pill"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}
        >
          <Sparkles size={14} />
          <span>New Recipe</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minHeight: 'calc(100vh - 290px)' }}>
        {flows.map((f, idx) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            className="glass-card"
            style={{
              padding: '26px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: f.active ? 'var(--accent-green-bg)' : 'var(--bg-surface-subtle)',
                  color: f.active ? 'var(--accent-green-text)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Zap size={20} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {f.name}
                  </h3>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {f.executions} runs
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  <span style={{ fontWeight: 600 }}>WHEN</span>
                  <span style={{ background: 'var(--bg-surface-subtle)', padding: '2px 8px', borderRadius: 6, color: 'var(--text-primary)' }}>
                    {f.trigger}
                  </span>
                  <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontWeight: 600 }}>THEN</span>
                  <span style={{ background: 'var(--bg-surface-subtle)', padding: '2px 8px', borderRadius: 6, color: 'var(--text-primary)' }}>
                    {f.action}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => handleTestRun(f.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 9999,
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  transition: 'all 0.15s ease',
                }}
              >
                <Play size={12} fill="currentColor" />
                <span>Test Flow</span>
              </button>

              <div
                onClick={() => toggleFlow(f.id)}
                style={{
                  width: 44,
                  height: 24,
                  borderRadius: 14,
                  background: f.active ? 'var(--text-primary)' : 'var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  justifyContent: f.active ? 'flex-end' : 'flex-start',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--bg-surface)' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
