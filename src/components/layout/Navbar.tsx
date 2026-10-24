import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../../utils/sound';

export type NavTabId =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'customers'
  | 'messages'
  | 'analytics'
  | 'automations';

interface NavbarProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenNotifications,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  const tabs: { id: NavTabId; label: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders', badge: 14 },
    { id: 'products', label: 'Products' },
    { id: 'customers', label: 'Customers' },
    { id: 'messages', label: 'Messages', badge: 3 },
    { id: 'analytics', label: 'Analytics' },
    { id: 'automations', label: 'Automations' },
  ];

  const handleTabClick = (id: NavTabId) => {
    if (id !== activeTab) {
      sound.playTab();
      onTabChange(id);
    }
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(newState);
    if (newState) sound.playSuccess();
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px 12px 40px',
        maxWidth: 1540,
        margin: '0 auto 28px auto',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'transparent',
      }}
    >
      {/* Brand Full Logo (Light & Dark Mode Aligned) */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => handleTabClick('dashboard')}
        className="header-brand"
        title="Tadbeer Transformation Trading"
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <img
          src="/logo-light.png"
          alt="Tadbeer Transformation Trading"
          className="logo-light-only"
          style={{
            height: 38,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
        <img
          src="/logo-dark.png"
          alt="Tadbeer Transformation Trading"
          className="logo-dark-only"
          style={{
            height: 38,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Center Elongated Pill Navigation with Framer Motion LayoutId Sliding Capsule */}
      <div className="mobile-scroll-tabs no-scrollbar" style={{ display: 'flex' }}>
        <nav
          className="glass-pill"
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            boxShadow: 'var(--shadow-sm)',
            position: 'relative',
            whiteSpace: 'nowrap',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                style={{
                  position: 'relative',
                  padding: '7px 16px',
                  borderRadius: 9999,
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'color 0.2s ease',
                  zIndex: 2,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-top-pill"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 9999,
                      background: 'var(--pill-active-bg)',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                      zIndex: -1,
                    }}
                  />
                )}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 9999,
                      background: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.06)',
                      color: isActive ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Controls matching Video Frame 1 & 7: Audio Toggle + Bell + MR Avatar */}
      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Audio SFX Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleSound}
          className="glass-pill"
          style={{
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: soundEnabled ? 'var(--text-primary)' : 'var(--text-muted)',
            transition: 'color 0.2s ease',
          }}
          title={soundEnabled ? 'Sound FX Enabled (Click to Mute)' : 'Sound FX Muted (Click to Unmute)'}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            sound.playNav();
            if (onOpenNotifications) onOpenNotifications();
          }}
          className="glass-pill"
          style={{
            width: 38,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            position: 'relative',
          }}
          title="Notifications"
        >
          <Bell size={16} />
          <span
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#ef4444',
            }}
          />
        </motion.button>

        {/* User Profile Avatar */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
          title="Mohammed Rehan (Admin)"
        >
          MR
        </motion.div>
      </div>
    </header>
  );
};
