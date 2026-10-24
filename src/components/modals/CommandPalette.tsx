import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutDashboard,
  BarChart2,
  KanbanSquare,
  Moon,
  Sun,
  Download,
  Plus,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'dashboard' | 'analytics' | 'kanban') => void;
  onToggleTheme: (e?: any) => void;
  isDarkMode: boolean;
  onOpenAddCard: () => void;
  onOpenExport: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleTheme,
  isDarkMode,
  onOpenAddCard,
  onOpenExport,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else sound.playNav();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'dash',
      label: 'Go to Executive Dashboard',
      icon: <LayoutDashboard size={16} />,
      category: 'Navigation',
      action: () => onNavigate('dashboard'),
    },
    {
      id: 'analytics',
      label: 'Go to Deep Analytics',
      icon: <BarChart2 size={16} />,
      category: 'Navigation',
      action: () => onNavigate('analytics'),
    },
    {
      id: 'kanban',
      label: 'Open Tadbeer Software Roadmap & Kanban',
      icon: <KanbanSquare size={16} />,
      category: 'Navigation',
      action: () => onNavigate('kanban'),
    },
    {
      id: 'add-card',
      label: 'Create new workflow card',
      icon: <Plus size={16} />,
      category: 'Actions',
      action: onOpenAddCard,
    },
    {
      id: 'export',
      label: 'Export executive metrics & reports',
      icon: <Download size={16} />,
      category: 'Actions',
      action: onOpenExport,
    },
    {
      id: 'theme',
      label: isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode',
      icon: isDarkMode ? <Sun size={16} /> : <Moon size={16} />,
      category: 'Preferences',
      action: onToggleTheme,
    },
    {
      id: 'sound',
      label: sound.isEnabled() ? 'Mute sound effects' : 'Unmute sound effects',
      icon: sound.isEnabled() ? <VolumeX size={16} /> : <Volume2 size={16} />,
      category: 'Preferences',
      action: () => sound.toggleMute(),
    },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

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
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        animation: 'fadeInScale 0.15s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 580,
          background: 'var(--bg-surface)',
          borderRadius: 20,
          boxShadow: 'var(--shadow-popover)',
          border: '1px solid var(--border-medium)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-light)',
            gap: 12,
          }}
        >
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Search Tadbeer Transformation OS (⌘K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button
            onClick={onClose}
            style={{
              padding: 4,
              borderRadius: 6,
              color: 'var(--text-muted)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 340, overflowY: 'auto', padding: '10px' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13.5 }}>
              No commands found matching "{query}"
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                onMouseEnter={() => sound.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                  color: 'var(--text-primary)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'var(--bg-surface-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{item.category}</div>
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div
          style={{
            padding: '10px 18px',
            background: 'var(--bg-surface-subtle)',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span>Tip: Press ⌘K anywhere to summon search</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
