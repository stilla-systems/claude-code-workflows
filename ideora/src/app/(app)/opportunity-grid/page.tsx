'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { AngleCard } from '@/components/cards/AngleCard';
import { MomentumChart } from '@/components/charts/MomentumChart';
import { WindowBadge } from '@/components/ui/WindowBadge';
import { mockOpportunities, generateMomentumData, formatVolume } from '@/lib/mock-data';
import type { Opportunity } from '@/types';
import { BarChart3, X, Clock, Target, Users, TrendingUp } from 'lucide-react';
import { daysUntil } from '@/lib/utils';

const filters = ['All', 'Open', 'Closing', 'Emerging'];

export default function OpportunityGridPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selected, setSelected] = useState<Opportunity | null>(null);

  const filtered = mockOpportunities.filter(o => {
    if (activeFilter === 'All') return true;
    return o.window === activeFilter.toLowerCase();
  });

  const chartData = selected ? generateMomentumData(14, selected.score, 10) : [];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Opportunity Grid" />
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BarChart3 size={15} style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Opportunity Grid
                </h1>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '42px' }}>
                {mockOpportunities.filter(o => o.window === 'open').length} open windows · sorted by score
              </p>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {filters.map(f => {
                const color = f === 'Open' ? 'var(--accent-emerald)' : f === 'Closing' ? 'var(--accent-amber)' : f === 'Emerging' ? 'var(--accent-cyan)' : 'var(--brand-bright)';
                const active = activeFilter === f;
                return (
                  <button key={f} onClick={() => setActiveFilter(f)} style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.12s ease',
                    background: active ? `${color}15` : 'transparent',
                    border: active ? `1px solid ${color}40` : '1px solid var(--border-default)',
                    color: active ? color : 'var(--text-secondary)',
                  }}>
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
            {[
              { label: 'Open Windows', value: mockOpportunities.filter(o => o.window === 'open').length, color: 'var(--accent-emerald)' },
              { label: 'Avg Score', value: Math.round(mockOpportunities.reduce((a, b) => a + b.score, 0) / mockOpportunities.length), color: 'var(--brand-bright)' },
              { label: 'Closing Soon', value: mockOpportunities.filter(o => o.window === 'closing').length, color: 'var(--accent-amber)' },
              { label: 'Easy Entry', value: mockOpportunities.filter(o => o.difficulty === 'easy').length, color: 'var(--accent-cyan)' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                borderRadius: '10px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ fontSize: '28px', fontWeight: 900, color: s.color, fontFamily: 'monospace' }}>{s.value}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Grid + detail */}
          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 420px' : '1fr', gap: '20px' }}>

            {/* Cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', alignContent: 'start' }}>
              {filtered.map((opp, i) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  featured={opp.score >= 90}
                  onClick={setSelected}
                />
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <div style={{ position: 'sticky', top: '24px', alignSelf: 'flex-start' }}>
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  maxHeight: 'calc(100vh - 120px)',
                  overflowY: 'auto',
                }}>
                  {/* Header */}
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(108,71,255,0.08), transparent)',
                    borderBottom: '1px solid var(--border-subtle)',
                    position: 'sticky', top: 0, zIndex: 10,
                    backdropFilter: 'blur(12px)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <WindowBadge window={selected.window} />
                      <button onClick={() => setSelected(null)} style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)',
                        borderRadius: '6px', padding: '4px', cursor: 'pointer',
                        color: 'var(--text-secondary)',
                      }}>
                        <X size={14} />
                      </button>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                      {selected.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {selected.summary}
                    </p>
                  </div>

                  {/* Score + stats */}
                  <div style={{ padding: '18px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                      {[
                        { icon: <Target size={10} />, label: 'Score', value: `${selected.score}/100` },
                        { icon: <Clock size={10} />, label: 'Days Left', value: `${daysUntil(selected.expiresAt)}d` },
                        { icon: <Users size={10} />, label: 'Competition', value: selected.competitorCount.toLocaleString() },
                      ].map(s => (
                        <div key={s.label} style={{
                          padding: '10px', borderRadius: '8px',
                          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
                          textAlign: 'center',
                        }}>
                          <div style={{ color: 'var(--text-tertiary)', marginBottom: '3px', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>{s.label}</p>
                          <p style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{s.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Saturation */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Saturation</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{selected.saturation}%</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${selected.saturation}%`,
                          background: selected.saturation < 30 ? 'var(--accent-emerald)' : selected.saturation < 60 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                          borderRadius: '2px',
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div style={{ padding: '18px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
                      Score Momentum
                    </p>
                    <MomentumChart data={chartData} height={110} />
                  </div>

                  {/* Content Angles */}
                  <div style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Content Angles
                      </p>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {selected.angles.length} generated
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selected.angles.map((angle, i) => (
                        <AngleCard key={angle.id} angle={angle} index={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
