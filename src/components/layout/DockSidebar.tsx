import React from 'react';
import {
  Search,
  KanbanSquare,
  Settings,
  HelpCircle,
  Sparkles,
  Moon,
  Sun,
  LayoutDashboard,
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface DockSidebarProps {
  currentView: 'dashboard' | 'analytics' | 'kanban';
  onNavigate: (view: 'dashboard' | 'analytics' | 'kanban') => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  isDarkMode: boolean;
  onToggleTheme: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DockSidebar: React.FC<DockSidebarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenSettings,
  onOpenHelp,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <aside className="dock-sidebar" aria-label="Quick Actions Dock">
      {/* Search / Command Palette */}
      <button
        onClick={() => {
          sound.playNav();
          onOpenSearch();
        }}
        className="dock-btn"
        title="Search & Command (⌘K)"
      >
        <Search size={18} />
        <span className="dock-tooltip">Search (⌘K)</span>
      </button>

      {/* Primary Dashboard View Toggle */}
      <button
        onClick={() => {
          sound.playNav();
          onNavigate('dashboard');
        }}
        className={`dock-btn ${currentView === 'dashboard' ? 'active' : ''}`}
        title="Dashboard"
      >
        <LayoutDashboard size={18} />
        <span className="dock-tooltip">Dashboard</span>
      </button>

      {/* Workspace / Kanban Board (From Video Frame 10 with badge 11) */}
      <button
        onClick={() => {
          sound.playNav();
          onNavigate('kanban');
        }}
        className={`dock-btn ${currentView === 'kanban' ? 'active' : ''}`}
        title="Workspace"
      >
        <KanbanSquare size={18} />
        <span className="dock-badge">11</span>
        <span className="dock-tooltip">Workspace</span>
      </button>

      {/* Settings */}
      <button
        onClick={() => {
          sound.playNav();
          onOpenSettings();
        }}
        className="dock-btn"
        title="Settings"
      >
        <Settings size={18} />
        <span className="dock-tooltip">Settings</span>
      </button>

      {/* Help / Guide */}
      <button
        onClick={() => {
          sound.playNav();
          onOpenHelp();
        }}
        className="dock-btn"
        title="Help & Shortcuts"
      >
        <HelpCircle size={18} />
        <span className="dock-tooltip">Help & Shortcuts</span>
      </button>

      {/* Automations / AI */}
      <button
        onClick={() => {
          sound.playSuccess();
        }}
        className="dock-btn"
        title="AI Automations"
      >
        <Sparkles size={18} />
        <span className="dock-tooltip">AI Workflows</span>
      </button>

      {/* Divider */}
      <div className="dock-divider" />

      {/* Dark / Light Mode Toggle Button (Video Frame 12 & 13) */}
      <button
        data-theme-toggle="true"
        onClick={(e) => onToggleTheme(e)}
        className="dock-btn"
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        <span className="dock-tooltip">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </aside>
  );
};
