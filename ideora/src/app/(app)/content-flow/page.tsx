'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { PlatformIcon } from '@/components/ui/PlatformIcon';
import { mockContentItems } from '@/lib/mock-data';
import type { ContentItem } from '@/types';
import { Calendar, Plus, Clock, CheckCircle, Edit3, Archive } from 'lucide-react';

const statusColors: Record<ContentItem['status'], string> = {
  draft: 'var(--text-tertiary)',
  scheduled: 'var(--accent-cyan)',
  published: 'var(--accent-emerald)',
  archived: 'var(--accent-rose)',
};

const statusBg: Record<ContentItem['status'], string> = {
  draft: 'rgba(255,255,255,0.04)',
  scheduled: 'rgba(0,212,255,0.08)',
  published: 'rgba(0,255,157,0.08)',
  archived: 'rgba(255,77,106,0.08)',
};

const formatIcon: Record<string, string> = {
  'short-video': '▶',
  'long-video': '▶▶',
  'carousel': '⊞',
  'thread': '≡',
  'reel': '◉',
};

function groupByDate(items: ContentItem[]): Record<string, ContentItem[]> {
  return items.reduce((acc, item) => {
    const date = new Date(item.scheduledFor).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);
}

export default function ContentFlowPage() {
  const [items] = useState(mockContentItems);
  const grouped = groupByDate(items);

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Content Flow" />
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(255,179,64,0.1)', border: '1px solid rgba(255,179,64,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Calendar size={15} style={{ color: 'var(--accent-amber)' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Content Flow
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {items.filter(i => i.status === 'scheduled').length} scheduled · {items.filter(i => i.status === 'draft').length} drafts
                </p>
              </div>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
              border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}>
              <Plus size={14} /> New Content
            </button>
          </div>

          {/* Status filter + summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {[
              { label: 'Draft', count: items.filter(i => i.status === 'draft').length, icon: <Edit3 size={14} />, color: 'var(--text-tertiary)' },
              { label: 'Scheduled', count: items.filter(i => i.status === 'scheduled').length, icon: <Clock size={14} />, color: 'var(--accent-cyan)' },
              { label: 'Published', count: items.filter(i => i.status === 'published').length, icon: <CheckCircle size={14} />, color: 'var(--accent-emerald)' },
              { label: 'Archived', count: items.filter(i => i.status === 'archived').length, icon: <Archive size={14} />, color: 'var(--accent-rose)' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                borderRadius: '10px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ color: s.color }}>{s.icon}</span>
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace', lineHeight: 1 }}>{s.count}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content queue by date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {Object.entries(grouped).map(([date, dateItems]) => (
              <div key={date}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>{date}</p>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    {dateItems.length} item{dateItems.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {dateItems.map(item => (
                    <ContentItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function ContentItemRow({ item }: { item: ContentItem }) {
  const time = new Date(item.scheduledFor).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{
      display: 'flex', gap: '16px', alignItems: 'center',
      padding: '16px 18px', borderRadius: '12px',
      background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
      transition: 'all 0.12s ease',
    }}
    className="hover:border-[rgba(108,71,255,0.2)]"
    >
      {/* Time */}
      <div style={{ width: '52px', flexShrink: 0, textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{time}</p>
      </div>

      {/* Format icon */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
        background: 'rgba(108,71,255,0.08)', border: '1px solid rgba(108,71,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '14px',
      }}>
        {formatIcon[item.format] || '▶'}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.title}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          &ldquo;{item.hook}&rdquo;
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '200px' }}>
        {item.tags.slice(0, 2).map(tag => (
          <span key={tag} style={{
            fontSize: '10px', padding: '2px 7px', borderRadius: '4px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)',
            color: 'var(--text-tertiary)',
          }}>#{tag}</span>
        ))}
      </div>

      {/* Platform */}
      <PlatformIcon platform={item.platform} />

      {/* Status */}
      <div style={{
        padding: '4px 10px', borderRadius: '20px', flexShrink: 0,
        background: statusBg[item.status],
        border: `1px solid ${statusColors[item.status]}30`,
      }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: statusColors[item.status], textTransform: 'capitalize' }}>
          {item.status}
        </span>
      </div>
    </div>
  );
}
