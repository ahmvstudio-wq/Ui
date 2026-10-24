import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar, type NavTabId } from './components/layout/Navbar';
import { DockSidebar } from './components/layout/DockSidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { OrdersView } from './components/orders/OrdersView';
import { ProductsView } from './components/products/ProductsView';
import { CustomersView } from './components/customers/CustomersView';
import { MessagesView } from './components/messages/MessagesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { AutomationsView } from './components/automations/AutomationsView';
import { KanbanView } from './components/kanban/KanbanView';
import { CommandPalette } from './components/modals/CommandPalette';
import { AddCardModal } from './components/modals/AddCardModal';
import { ExportModal } from './components/modals/ExportModal';
import { OrdersQuickModal } from './components/modals/OrdersQuickModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { HelpModal } from './components/modals/HelpModal';
import { sound } from './utils/sound';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [currentView, setCurrentView] = useState<NavTabId | 'kanban'>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState('todo');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('tadbeer_theme') ?? localStorage.getItem('corbel_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'd' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        handleToggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDarkMode]);

  // Sync navbar tabs with current view
  const handleNavTabChange = (tab: NavTabId) => {
    setActiveTab(tab);
    setCurrentView(tab);
  };

  const handleDockNavigate = (view: 'dashboard' | 'analytics' | 'kanban') => {
    setCurrentView(view);
    if (view === 'dashboard') setActiveTab('dashboard');
    else if (view === 'analytics') setActiveTab('analytics');
  };

  // Circular Wipe Transition & Sound matching Frame 13 in the video
  const handleToggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Play the exact extracted tactile mechanical toggle sound
    sound.playToggle();

    let clickX = 40;
    let clickY = window.innerHeight - 80;

    if (e && e.clientX && e.clientY) {
      clickX = e.clientX;
      clickY = e.clientY;
    } else {
      const toggleEl = document.querySelector('[data-theme-toggle]');
      if (toggleEl) {
        const rect = toggleEl.getBoundingClientRect();
        clickX = rect.left + rect.width / 2;
        clickY = rect.top + rect.height / 2;
      }
    }

    const newMode = !isDarkMode;

    if ('startViewTransition' in document && typeof (document as any).startViewTransition === 'function') {
      const transition = (document as any).startViewTransition(() => {
        setIsDarkMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
        localStorage.setItem('tadbeer_theme', newMode ? 'dark' : 'light');
      });

      transition.ready.then(() => {
        const right = window.innerWidth - clickX;
        const bottom = window.innerHeight - clickY;
        const maxRadius = Math.hypot(Math.max(clickX, right), Math.max(clickY, bottom));

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${clickX}px ${clickY}px)`,
              `circle(${maxRadius}px at ${clickX}px ${clickY}px)`,
            ],
          },
          {
            duration: 550,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
            fill: 'forwards',
          }
        );
      });
    } else {
      setIsDarkMode(newMode);
      document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
      localStorage.setItem('tadbeer_theme', newMode ? 'dark' : 'light');
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Top Main Navigation Bar with layoutId Sliding Capsule */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleNavTabChange}
        onOpenNotifications={() => sound.playSuccess()}
      />

      {/* Floating Capsule Dock Sidebar on the Left */}
      <DockSidebar
        currentView={currentView === 'kanban' ? 'kanban' : currentView === 'analytics' ? 'analytics' : 'dashboard'}
        onNavigate={handleDockNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => {
          sound.playNav();
          setIsSettingsOpen(true);
        }}
        onOpenHelp={() => {
          sound.playNav();
          setIsHelpOpen(true);
        }}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Container with Dynamic Section Transitions */}
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <DashboardView
              key="dashboard"
              onNavigateToAnalytics={() => {
                setActiveTab('analytics');
                setCurrentView('analytics');
              }}
              onOpenExport={() => setIsExportOpen(true)}
              onOpenOrdersModal={() => setIsOrdersOpen(true)}
            />
          )}

          {currentView === 'orders' && <OrdersView key="orders" />}

          {currentView === 'products' && <ProductsView key="products" />}

          {currentView === 'customers' && <CustomersView key="customers" />}

          {currentView === 'messages' && <MessagesView key="messages" />}

          {currentView === 'analytics' && (
            <AnalyticsView key="analytics" onOpenExportCsv={() => setIsExportOpen(true)} />
          )}

          {currentView === 'automations' && <AutomationsView key="automations" />}

          {currentView === 'kanban' && (
            <KanbanView
              key="kanban"
              onOpenAddCardModal={(colId) => {
                setTargetColumnId(colId);
                setIsAddCardOpen(true);
              }}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(view) => {
          handleDockNavigate(view);
          setIsSearchOpen(false);
        }}
        onToggleTheme={handleToggleTheme}
        isDarkMode={isDarkMode}
        onOpenAddCard={() => {
          setIsSearchOpen(false);
          setIsAddCardOpen(true);
        }}
        onOpenExport={() => {
          setIsSearchOpen(false);
          setIsExportOpen(true);
        }}
      />

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardOpen}
        columnId={targetColumnId}
        onClose={() => setIsAddCardOpen(false)}
        onAddCard={() => {
          setCurrentView('kanban');
        }}
      />

      {/* Export Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

      {/* Orders Quick Modal */}
      <OrdersQuickModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default App;
