import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { sound } from '../../utils/sound';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '⌘K / Ctrl+K', desc: 'Open Command Palette & fast switcher' },
    { key: 'Tab', desc: 'Cycle through top navigation tabs' },
    { key: 'D', desc: 'Toggle Dark / Light mode with circular wave' },
    { key: 'Drag Cards', desc: 'Drag kanban cards between workflow columns' },
    { key: 'Click Cards', desc: 'Increment card subtask checklist progress' },
    { key: 'Hover Bars', desc: 'Inspect monthly revenue breakdown & YoY delta' },
  ];

  return (
    <div
      onClick={onClose}
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
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: 480,
          background: 'var(--bg-surface)',
          padding: '24px 28px',
          borderRadius: 22,
          boxShadow: 'var(--shadow-popover)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Keyboard size={18} />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
              Keyboard Shortcuts & OS Guide
            </h2>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18, lineHeight: 1.45 }}>
          Tadbeer Transformation Trading OS is optimized for high-velocity software engineering, trading operations, and tactile micro-interactions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 10,
                background: 'var(--bg-surface-subtle)',
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>
                {sc.desc}
              </span>
              <kbd
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: 6,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
                }}
              >
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              sound.playNav();
              onClose();
            }}
            style={{
              padding: '8px 20px',
              borderRadius: 9999,
              fontSize: 13.5,
              fontWeight: 600,
              background: 'var(--pill-active-bg)',
              color: 'var(--pill-active-text)',
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
