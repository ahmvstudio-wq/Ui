import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { KanbanCard } from '../kanban/KanbanView';
import { sound } from '../../utils/sound';

interface AddCardModalProps {
  isOpen: boolean;
  columnId: string;
  onClose: () => void;
  onAddCard: (card: Omit<KanbanCard, 'id'>) => void;
}

export const AddCardModal: React.FC<AddCardModalProps> = ({
  isOpen,
  columnId,
  onClose,
  onAddCard,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Core ERP' | 'Trading' | 'Frontend' | 'Security' | 'DevOps'>('Core ERP');
  const [assignee, setAssignee] = useState<'MR' | 'JO' | 'AP' | 'LT' | 'PS'>('MR');
  const [dueDateText, setDueDateText] = useState('Due in 7 days');
  const [tasksCount, setTasksCount] = useState(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    sound.playSuccess();
    onAddCard({
      columnId: (columnId as any) || 'todo',
      title: title.trim(),
      category,
      assignee,
      dueDateText,
      totalTasks: tasksCount,
      completedTasks: 0,
      commentsCount: 0,
    });
    setTitle('');
    onClose();
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            Add Workflow Card
          </h2>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Card Title
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Silk linen summer samples review"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 10,
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface-subtle)',
                color: 'var(--text-primary)',
                fontSize: 14,
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: 13.5,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                <option value="Core ERP">Core ERP</option>
                <option value="Trading">Trading</option>
                <option value="Frontend">Frontend</option>
                <option value="Security">Security</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Assignee
              </label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: 13.5,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                <option value="MR">MR (Mohammed Rehan)</option>
                <option value="JO">JO (Julia Ortiz)</option>
                <option value="AP">AP (Alex Price)</option>
                <option value="LT">LT (Liam Turner)</option>
                <option value="PS">PS (Priya Sharma)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Due Date
              </label>
              <input
                type="text"
                value={dueDateText}
                onChange={(e) => setDueDateText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: 13.5,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Checklist Tasks
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={tasksCount}
                onChange={(e) => setTasksCount(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: 13.5,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 600,
                color: 'var(--text-secondary)',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 20px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 600,
                background: 'var(--pill-active-bg)',
                color: 'var(--pill-active-text)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
