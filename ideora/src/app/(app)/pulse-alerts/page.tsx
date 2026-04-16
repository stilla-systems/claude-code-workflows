'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { mockAlerts } from '@/lib/mock-data';
import type { PulseAlert } from '@/types';
import { Bell, Zap, AlertTriangle, CheckCircle, Info, TrendingDown, ChevronRight } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

const priorityColors: Record<PulseAlert['priority'], string> = {
  critical: 'var(--accent-rose)',
  high: 'var(--accent-amber)',
  medium: 'var(--brand-bright)',
  low: 'var(--text-tertiary)',
};

const priorityBg: Record<PulseAlert['priority'], string> = {
  critical: 'rgba(255,77,106,0.08)',
  high: 'rgba(255,179,64,0.08)',
  medium: 'rgba(108,71,255,0.08)',
  low: 'rgba(255,255,255,0.03)',
};

const typeIcons: Record<PulseAlert['type'], React.ReactNode> = {
  spike: <TrendingDown size={14} style={{ color: 'var(--accent-cyan)', transform: 'rotate(180deg)' }} />,
  'window-closing': <AlertTriangle size={14} style={{ color: 'var(--accent-amber)' }} />,
  'new-opportunity': <Zap size={14} style={{ color: 'var(--accent-emerald)' }} />,
  'brief-ready': <CheckCircle size={14} style={{ color: 'var(--brand-bright)' }} />,
  'threshold-hit': <Bell size={14} style={{ color: 'var(--accent-rose)' }} />,
};

const filters = ['All', 'Unread', 'Critical', 'High', 'Medium'];

export default function PulseAlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = alerts.filter(a => {
    if (activeFilter === 'Unread') return !a.isRead;
    if (activeFilter === 'Critical') return a.priority === 'critical';
    if (activeFilter === 'High') return a.priority === 'high';
    if (activeFilter === 'Medium') return a.priority === 'medium';
    return true;
  });

  const markAllRead = () => setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));

  const markRead = (id: string) => setAlerts(prev =>
    prev.map(a => a.id === id ? { ...a, isRead: true } : a)
  );

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Pulse Alerts" />
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(255,77,106,0.08)', border: '1px solid rgba(255,77,106,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Bell size={15} style={{ color: 'var(--accent-rose)' }} />
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'var(--accent-rose)', fontSize: '8px', fontWeight: 800,
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Pulse Alerts
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {unreadCount} unread · {alerts.length} total alerts
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{
                padding: '7px 14px', borderRadius: '8px',
                background: 'transparent', border: '1px solid var(--border-default)',
                color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              }}>
                Mark all read
              </button>
            )}
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
            {filters.map(f => {
              const active = activeFilter === f;
              return (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.12s ease',
                  background: active ? 'rgba(108,71,255,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(108,71,255,0.35)' : '1px solid var(--border-default)',
                  color: active ? 'var(--brand-bright)' : 'var(--text-secondary)',
                }}>
                  {f}
                  {f === 'Unread' && unreadCount > 0 && (
                    <span style={{
                      marginLeft: '6px', fontSize: '10px', fontWeight: 800,
                      color: 'var(--accent-rose)',
                    }}>{unreadCount}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Alert list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '720px' }}>
            {filtered.map(alert => (
              <AlertRow key={alert.id} alert={alert} onRead={markRead} />
            ))}
            {filtered.length === 0 && (
              <div style={{
                padding: '48px', textAlign: 'center',
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
              }}>
                <Bell size={28} style={{ color: 'var(--text-tertiary)', margin: '0 auto 12px', display: 'block' }} />
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No alerts in this category</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function AlertRow({ alert, onRead }: { alert: PulseAlert; onRead: (id: string) => void }) {
  return (
    <div
      onClick={() => !alert.isRead && onRead(alert.id)}
      style={{
        display: 'flex', gap: '14px', alignItems: 'flex-start',
        padding: '16px 18px', borderRadius: '12px',
        background: alert.isRead ? 'var(--bg-surface)' : priorityBg[alert.priority],
        border: `1px solid ${alert.isRead ? 'var(--border-subtle)' : priorityColors[alert.priority] + '30'}`,
        cursor: alert.isRead ? 'default' : 'pointer',
        transition: 'all 0.12s ease',
        position: 'relative',
      }}
    >
      {/* Unread indicator */}
      {!alert.isRead && (
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          width: '3px', height: '60%', borderRadius: '0 2px 2px 0',
          background: priorityColors[alert.priority],
        }} />
      )}

      {/* Icon */}
      <div style={{
        width: '34px', height: '34px', borderRadius: '8px', flexShrink: 0,
        background: `${priorityColors[alert.priority]}12`,
        border: `1px solid ${priorityColors[alert.priority]}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: '1px',
      }}>
        {typeIcons[alert.type]}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <p style={{ fontSize: '14px', fontWeight: alert.isRead ? 500 : 700, color: 'var(--text-primary)', paddingRight: '16px' }}>
            {alert.title}
          </p>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', flexShrink: 0, fontFamily: 'monospace' }}>
            {timeAgo(alert.timestamp)}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {alert.message}
        </p>
        {alert.linkedOpportunityId && (
          <a href="/opportunity-grid" style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            marginTop: '8px', fontSize: '11px', color: 'var(--brand-bright)',
            textDecoration: 'none', fontWeight: 600,
          }}>
            View Opportunity <ChevronRight size={11} />
          </a>
        )}
      </div>

      {/* Priority badge */}
      <div style={{
        flexShrink: 0, padding: '3px 8px', borderRadius: '20px',
        background: `${priorityColors[alert.priority]}12`,
        border: `1px solid ${priorityColors[alert.priority]}30`,
      }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: priorityColors[alert.priority], textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {alert.priority}
        </span>
      </div>
    </div>
  );
}
