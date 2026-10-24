import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  MoreHorizontal,
  Clock,
  MessageSquare,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CircularProgress } from '../shared/CircularProgress';
import { sound } from '../../utils/sound';

export interface KanbanCard {
  id: string;
  columnId: 'todo' | 'in_progress' | 'review' | 'done';
  title: string;
  category: 'Core ERP' | 'Trading' | 'Frontend' | 'Security' | 'DevOps';
  completedTasks: number;
  totalTasks: number;
  assignee: 'MR' | 'JO' | 'AP' | 'LT' | 'PS';
  dueDateText: string;
  isUrgent?: boolean;
  commentsCount?: number;
}

const INITIAL_CARDS: KanbanCard[] = [
  {
    id: 'c1',
    columnId: 'todo',
    title: 'Implement SSO & OAuth 2.1 for Tadbeer Trading Engine',
    category: 'Core ERP',
    completedTasks: 0,
    totalTasks: 8,
    assignee: 'AP',
    dueDateText: 'Due in 12 days',
    commentsCount: 2,
  },
  {
    id: 'c2',
    columnId: 'todo',
    title: 'Benchmark low-latency order routing under 1.5ms',
    category: 'Trading',
    completedTasks: 0,
    totalTasks: 1,
    assignee: 'JO',
    dueDateText: 'Due in 6 days',
  },
  {
    id: 'c3',
    columnId: 'in_progress',
    title: 'Enterprise client portal UI & real-time analytics',
    category: 'Frontend',
    completedTasks: 2,
    totalTasks: 4,
    assignee: 'MR',
    dueDateText: 'Due in 3 days',
    commentsCount: 6,
  },
  {
    id: 'c4',
    columnId: 'in_progress',
    title: 'Multi-tenant database partitioning & read replicas',
    category: 'DevOps',
    completedTasks: 3,
    totalTasks: 6,
    assignee: 'AP',
    dueDateText: 'Due in 9 days',
    commentsCount: 3,
  },
  {
    id: 'c5',
    columnId: 'review',
    title: 'SOC2 compliance & penetration test audit proof',
    category: 'Security',
    completedTasks: 3,
    totalTasks: 3,
    assignee: 'MR',
    dueDateText: 'Due tomorrow',
    isUrgent: true,
    commentsCount: 1,
  },
  {
    id: 'c6',
    columnId: 'done',
    title: 'Confirm Dubai & EU data center provisioning',
    category: 'DevOps',
    completedTasks: 2,
    totalTasks: 2,
    assignee: 'LT',
    dueDateText: 'Oct 19',
  },
  {
    id: 'c7',
    columnId: 'done',
    title: 'Finalize AI Transformation workflow engine specs',
    category: 'Core ERP',
    completedTasks: 1,
    totalTasks: 1,
    assignee: 'MR',
    dueDateText: 'Oct 14',
    commentsCount: 5,
  },
];

interface KanbanViewProps {
  onOpenAddCardModal: (columnId: string) => void;
}

export const KanbanView: React.FC<KanbanViewProps> = ({ onOpenAddCardModal }) => {
  const [cards, setCards] = useState<KanbanCard[]>(INITIAL_CARDS);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [activeBoard, setActiveBoard] = useState<'spring' | 'retail'>('spring');
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const assignees = ['MR', 'JO', 'AP', 'LT', 'PS'];

  const filteredCards = selectedAssignee
    ? cards.filter((c) => c.assignee === selectedAssignee)
    : cards;

  const totalCards = filteredCards.length;
  const doneCards = filteredCards.filter((c) => c.columnId === 'done').length;
  const progressPercent = totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;

  const columns: { id: 'todo' | 'in_progress' | 'review' | 'done'; title: string }[] = [
    { id: 'todo', title: 'To do' },
    { id: 'in_progress', title: 'In progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ];

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
    setDraggedCardId(cardId);
    sound.playHover();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCol: 'todo' | 'in_progress' | 'review' | 'done') => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
    if (!cardId) return;

    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          if (targetCol === 'done' && c.columnId !== 'done') {
            sound.playSuccess();
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#10b981', '#34d399', '#3b82f6', '#f59e0b'],
            });
            return { ...c, columnId: targetCol, completedTasks: c.totalTasks };
          } else {
            sound.playDrop();
            return { ...c, columnId: targetCol };
          }
        }
        return c;
      })
    );
    setDraggedCardId(null);
  };

  const handleCardTaskToggle = (cardId: string) => {
    sound.playFilter();
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const next = c.completedTasks >= c.totalTasks ? 0 : c.completedTasks + 1;
          if (next === c.totalTasks && c.columnId !== 'done') {
            sound.playSuccess();
          }
          return { ...c, completedTasks: next };
        }
        return c;
      })
    );
  };

  const filterByAssignee = (a: string | null) => {
    setSelectedAssignee(a);
    sound.playFilter();
  };

  return (
    <div className="page-container animate-view-in">
      {/* Top Header & Project Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
        <h1
          style={{
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          Spring Launch
        </h1>

        {/* Project Pill Tabs from Frame 11 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-surface-subtle)',
            padding: '2.5px',
            borderRadius: 9999,
            border: '1px solid var(--border-light)',
          }}
        >
          <button
            onClick={() => {
              setActiveBoard('spring');
              sound.playTab();
            }}
            style={{
              padding: '5px 12px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: activeBoard === 'spring' ? 600 : 500,
              background: activeBoard === 'spring' ? 'var(--pill-active-bg)' : 'transparent',
              color: activeBoard === 'spring' ? 'var(--pill-active-text)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span>Core ERP v4.8</span>
            <span
              style={{
                fontSize: 10.5,
                padding: '1px 5px',
                borderRadius: 9999,
                background: activeBoard === 'spring' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.06)',
                color: 'inherit',
                fontFamily: 'var(--font-mono)',
              }}
            >
              6
            </span>
          </button>

          <button
            onClick={() => {
              setActiveBoard('retail');
              sound.playTab();
            }}
            style={{
              padding: '5px 12px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: activeBoard === 'retail' ? 600 : 500,
              background: activeBoard === 'retail' ? 'var(--pill-active-bg)' : 'transparent',
              color: activeBoard === 'retail' ? 'var(--pill-active-text)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span>Trading Engine Upgrade</span>
            <span
              style={{
                fontSize: 10.5,
                padding: '1px 5px',
                borderRadius: 9999,
                background: activeBoard === 'retail' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.06)',
                color: 'inherit',
                fontFamily: 'var(--font-mono)',
              }}
            >
              5
            </span>
          </button>
        </div>
      </div>

      {/* Main Project Status Header Card from Frame 11 */}
      <div
        className="glass-card"
        style={{
          padding: '16px 20px',
          marginBottom: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Top Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: 'var(--text-primary)',
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Tadbeer Transformation Software Release v4.8 — Core ERP, Trading Engine & Client Portal.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
            <span>Due Nov 26, 2026, in 34 days</span>
          </div>
          <span>•</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{totalCards} cards</span>
        </div>

        {/* Bottom Filter & Progress Bar Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            paddingTop: 12,
            borderTop: '1px solid var(--border-light)',
          }}
        >
          {/* Assignee Filter Stack */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
              Show cards for
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                onClick={() => filterByAssignee(null)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: selectedAssignee === null ? 'var(--pill-active-bg)' : 'var(--bg-surface-subtle)',
                  color: selectedAssignee === null ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.2s ease',
                }}
              >
                All
              </button>
              {assignees.map((a) => {
                const isSelected = selectedAssignee === a;
                return (
                  <button
                    key={a}
                    onClick={() => filterByAssignee(isSelected ? null : a)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      fontSize: 12,
                      fontWeight: 700,
                      background: isSelected ? 'var(--pill-active-bg)' : 'var(--bg-surface-subtle)',
                      color: isSelected ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                      border: '1px solid var(--border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                    }}
                    title={`Filter cards for ${a}`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress Donut & Add Card Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CircularProgress
                value={progressPercent}
                size={42}
                strokeWidth={4.5}
                color="var(--accent-green-text)"
                bgColor="var(--border-medium)"
              />
              <div style={{ fontSize: 13 }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  {doneCards} of {totalCards}
                </span>{' '}
                <span style={{ color: 'var(--text-secondary)' }}>cards done</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playNav();
                onOpenAddCardModal('todo');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 600,
                background: 'var(--pill-active-bg)',
                color: 'var(--pill-active-text)',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.2s ease',
              }}
            >
              <Plus size={15} />
              <span>Add card</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Kanban Columns from Frame 11 & 13 */}
      <div className="kanban-board-grid no-scrollbar">
        {columns.map((col) => {
          const colCards = filteredCards.filter((c) => c.columnId === col.id);
          const isDoneCol = col.id === 'done';

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              style={{
                background: 'var(--bg-surface-subtle)',
                borderRadius: 20,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minHeight: 'calc(100vh - 280px)',
                border: '1px solid var(--border-light)',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: isDoneCol ? 'var(--accent-green)' : 'var(--text-secondary)',
                    }}
                  />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {col.title}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {colCards.length}
                  </span>
                </div>

                <button
                  onClick={() => {
                    sound.playNav();
                    onOpenAddCardModal(col.id);
                  }}
                  style={{
                    color: 'var(--text-muted)',
                    padding: 4,
                    borderRadius: 6,
                    transition: 'color 0.2s ease',
                  }}
                  title="Add card to column"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {colCards.map((card) => {
                  const isComplete = card.completedTasks === card.totalTasks;
                  const ratio = card.totalTasks > 0 ? (card.completedTasks / card.totalTasks) * 100 : 0;

                  return (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      onClick={() => handleCardTaskToggle(card.id)}
                      className="glass-card"
                      style={{
                        padding: '16px',
                        cursor: 'grab',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                        background: 'var(--bg-surface)',
                      }}
                    >
                      {/* Card Category Tag & More Options */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            fontSize: 11.5,
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: 9999,
                            background: 'var(--bg-surface-subtle)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-light)',
                          }}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background:
                                card.category === 'Trading'
                                  ? 'var(--accent-green)'
                                  : card.category === 'Core ERP'
                                  ? 'var(--accent-blue)'
                                  : card.category === 'Security'
                                  ? '#ef4444'
                                  : card.category === 'DevOps'
                                  ? '#8b5cf6'
                                  : 'var(--text-secondary)',
                            }}
                          />
                          {card.category}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playFilter();
                          }}
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <MoreHorizontal size={15} />
                        </button>
                      </div>

                      {/* Card Title */}
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          lineHeight: 1.4,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {card.title}
                      </div>

                      {/* Checklist Progress Line from Frame 11 & 13 */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 11.5,
                            color: isComplete ? 'var(--accent-green-text)' : 'var(--text-muted)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          <Check size={12} strokeWidth={2.5} />
                          <span>
                            {card.completedTasks}/{card.totalTasks}
                          </span>
                        </div>

                        {/* Progress Bar with glowing mint in dark mode */}
                        <div
                          style={{
                            flex: 1,
                            height: 3.5,
                            borderRadius: 9999,
                            background: 'var(--border-light)',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${ratio}%`,
                              height: '100%',
                              borderRadius: 9999,
                              background: isComplete ? 'var(--accent-green)' : 'var(--text-primary)',
                              boxShadow: isComplete ? '0 0 8px var(--accent-green)' : 'none',
                              transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          />
                        </div>
                      </div>

                      {/* Card Footer: Assignee, Due, Comments */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: 8,
                          borderTop: '1px solid var(--border-light)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {/* Assignee Avatar */}
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: 'var(--bg-surface-subtle)',
                              border: '1px solid var(--border-light)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 10,
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            {card.assignee}
                          </div>

                          {/* Due Date or Urgent Badge */}
                          {card.isUrgent ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: 11,
                                fontWeight: 600,
                                color: 'var(--accent-orange-text)',
                                background: 'var(--accent-orange-bg)',
                                padding: '2px 7px',
                                borderRadius: 6,
                              }}
                            >
                              <Clock size={11} />
                              {card.dueDateText}
                            </span>
                          ) : (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                fontSize: 11.5,
                                color: 'var(--text-muted)',
                              }}
                            >
                              <Clock size={11} />
                              {card.dueDateText}
                            </span>
                          )}
                        </div>

                        {/* Comments count */}
                        {card.commentsCount !== undefined && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 3,
                              fontSize: 11,
                              color: 'var(--text-muted)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            <MessageSquare size={12} />
                            <span>{card.commentsCount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Column Add Card Button */}
                <button
                  onClick={() => {
                    sound.playNav();
                    onOpenAddCardModal(col.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 12px',
                    borderRadius: 12,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'var(--bg-surface)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Plus size={14} />
                  <span>Add card</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
