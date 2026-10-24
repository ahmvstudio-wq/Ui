import React, { useState } from 'react';
import { X, Volume2 } from 'lucide-react';
import { sound } from '../../utils/sound';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [storeName, setStoreName] = useState('Tadbeer Transformation Trading');
  const [currency, setCurrency] = useState('OMR (ر.ع.)');
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playSuccess();
    onClose();
  };

  const toggleSound = () => {
    const next = sound.toggleMute();
    setSoundEnabled(next);
  };

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            System Settings
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Organization Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface-subtle)',
                color: 'var(--text-primary)',
                fontSize: 14,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Reporting Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface-subtle)',
                color: 'var(--text-primary)',
                fontSize: 13.5,
                outline: 'none',
              }}
            >
              <option value="OMR (ر.ع.)">OMR (ر.ع.) - Omani Rial (Default)</option>
              <option value="USD ($)">USD ($) - United States Dollar</option>
              <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
              <option value="SAR (﷼)">SAR (﷼) - Saudi Riyal</option>
              <option value="EUR (€)">EUR (€) - Euro</option>
              <option value="GBP (£)">GBP (£) - British Pound</option>
            </select>
          </div>

          <div
            onClick={toggleSound}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              borderRadius: 12,
              background: 'var(--bg-surface-subtle)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Volume2 size={18} style={{ color: 'var(--text-secondary)' }} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                  Haptic & Tactile Sound FX
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
                  Play clicks, mechanical toggles, and completion chimes
                </div>
              </div>
            </div>

            <div
              style={{
                width: 38,
                height: 22,
                borderRadius: 12,
                background: soundEnabled ? 'var(--text-primary)' : 'var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                justifyContent: soundEnabled ? 'flex-end' : 'flex-start',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-surface)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <button
              onClick={onClose}
              style={{ padding: '8px 16px', borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: 'var(--text-secondary)' }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 600,
                background: 'var(--pill-active-bg)',
                color: 'var(--pill-active-text)',
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
