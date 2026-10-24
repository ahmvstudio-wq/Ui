import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { sound } from '../../utils/sound';

interface Thread {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: { fromMe: boolean; text: string; time: string }[];
}

const THREADS_DATA: Thread[] = [
  {
    id: 't1',
    sender: 'Julia Ortiz',
    role: 'Head of Trading Systems',
    avatar: 'JO',
    preview: 'Low-latency trading engine v4.8 benchmark passed with 1.1ms tick execution.',
    time: '10:42 AM',
    unread: true,
    messages: [
      { fromMe: false, text: 'Hey Rehan, the benchmark test on the high-frequency matching engine v4.8 just concluded.', time: '10:40 AM' },
      { fromMe: false, text: 'Sub-millisecond execution confirmed (1.1ms). Ready to deploy to the sandbox cluster for Gulf Trading Corp.', time: '10:42 AM' },
    ],
  },
  {
    id: 't2',
    sender: 'Alex Price',
    role: 'Lead Software Architect',
    avatar: 'AP',
    preview: 'Final GraphQL & REST schemas for Tadbeer ERP Core v4.8 signed off.',
    time: '9:15 AM',
    unread: true,
    messages: [
      { fromMe: false, text: 'Morning! We completed the multi-tenant database partitioning audit yesterday.', time: '9:12 AM' },
      { fromMe: false, text: 'Final GraphQL & REST schemas for Tadbeer ERP Core v4.8 signed off and pushed to staging.', time: '9:15 AM' },
    ],
  },
  {
    id: 't3',
    sender: 'Liam Turner',
    role: 'Cloud & Infrastructure Lead',
    avatar: 'LT',
    preview: 'Kubernetes multi-region clusters in UAE and EU successfully provisioned.',
    time: 'Yesterday',
    unread: true,
    messages: [
      { fromMe: false, text: 'Enterprise cloud tenant clusters for Middle East and European zones are live and isolated.', time: 'Yesterday' },
      { fromMe: true, text: 'Excellent, SOC2 compliance checks and load balancers look solid.', time: 'Yesterday' },
    ],
  },
];

export const MessagesView: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>(THREADS_DATA);
  const [activeThreadId, setActiveThreadId] = useState<string>('t1');
  const [replyText, setReplyText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    sound.playSuccess();
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            unread: false,
            messages: [
              ...t.messages,
              { fromMe: true, text: replyText.trim(), time: 'Just now' },
            ],
          };
        }
        return t;
      })
    );
    setReplyText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="page-container"
    >
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
          Messages & Communications
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>
          Tadbeer Engineering & Architecture Team Correspondence
        </p>
      </div>

      <div
        className="glass-card messages-split-grid"
        style={{
          overflow: 'hidden',
          padding: 0,
        }}
      >
        {/* Left Threads Column */}
        <div style={{ borderRight: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
            Inbox ({threads.filter((t) => t.unread).length} Unread)
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    sound.playNav();
                  }}
                  style={{
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    cursor: 'pointer',
                    background: isActive ? 'var(--bg-surface-subtle)' : 'transparent',
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-medium)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-primary)',
                      flexShrink: 0,
                    }}
                  >
                    {thread.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {thread.sender}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{thread.time}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginBottom: 4 }}>
                      {thread.role}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {thread.preview}
                    </div>
                  </div>
                  {thread.unread && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-orange)', marginTop: 6 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Conversation Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-surface)' }}>
          {/* Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--bg-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                fontFamily: 'var(--font-mono)',
              }}
            >
              {activeThread.avatar}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                {activeThread.sender}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{activeThread.role}</div>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeThread.messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.fromMe ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.fromMe ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: 16,
                    fontSize: 13.5,
                    lineHeight: 1.45,
                    background: m.fromMe ? 'var(--pill-active-bg)' : 'var(--bg-surface-subtle)',
                    color: m.fromMe ? 'var(--pill-active-text)' : 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {m.text}
                </div>
                <span style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 4, padding: '0 4px' }}>
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <form
            onSubmit={handleSendReply}
            style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', display: 'flex', gap: 10 }}
          >
            <input
              type="text"
              placeholder={`Reply to ${activeThread.sender}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 9999,
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface-subtle)',
                color: 'var(--text-primary)',
                fontSize: 13.5,
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--pill-active-bg)',
                color: 'var(--pill-active-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
