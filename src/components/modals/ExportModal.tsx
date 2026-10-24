import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/sound';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    setIsExporting(true);
    sound.playHover();

    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.6 },
      });

      // Trigger dummy download
      const content = `Date,Revenue,Orders,ConversionRate,Channel\n2026-10-01,39489,532,4.8%,All`;
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tadbeer_metrics_${format}_${Date.now()}.${format}`;
      a.click();
      URL.revokeObjectURL(url);

      setTimeout(() => {
        setExported(false);
        onClose();
      }, 1200);
    }, 700);
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
          maxWidth: 420,
          background: 'var(--bg-surface)',
          padding: '24px 28px',
          borderRadius: 22,
          boxShadow: 'var(--shadow-popover)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Export Business Reports
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 18, lineHeight: 1.45 }}>
          Export aggregated metrics, online vs in-store distribution, and spring launch card milestones.
        </p>

        {/* Format Select */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
          {(['csv', 'json', 'pdf'] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => {
                setFormat(fmt);
                sound.playFilter();
              }}
              style={{
                padding: '12px',
                borderRadius: 12,
                border: format === fmt ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)',
                background: format === fmt ? 'var(--bg-surface-subtle)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                fontWeight: 600,
                fontSize: 13,
                color: 'var(--text-primary)',
                transition: 'all 0.15s ease',
              }}
            >
              <FileText size={18} />
              <span style={{ textTransform: 'uppercase' }}>{fmt}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 600,
            background: 'var(--pill-active-bg)',
            color: 'var(--pill-active-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: 'var(--shadow-md)',
            opacity: isExporting ? 0.7 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          {exported ? (
            <>
              <CheckCircle2 size={16} />
              <span>Downloaded!</span>
            </>
          ) : isExporting ? (
            <span>Generating {format.toUpperCase()}...</span>
          ) : (
            <>
              <Download size={16} />
              <span>Download {format.toUpperCase()} Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
