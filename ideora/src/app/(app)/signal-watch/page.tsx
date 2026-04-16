'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MomentumChart } from '@/components/charts/MomentumChart';
import { WindowBadge } from '@/components/ui/WindowBadge';
import { PlatformIcon } from '@/components/ui/PlatformIcon';
import { mockWatchItems, generateMomentumData } from '@/lib/mock-data';
import type { WatchItem } from '@/types';
import { Eye, Plus, Bell, TrendingUp, Activity } from 'lucide-react';

export default function SignalWatchPage() {
  const [selected, setSelected] = useState<WatchItem>(mockWatchItems[0]);

  const chartData = generateMomentumData(14, selected.currentScore, 12);

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Signal Watch" />
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(108,71,255,0.1)', border: '1px solid rgba(108,71,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Eye size={15} style={{ color: 'var(--brand-bright)' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Signal Watch
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {mockWatchItems.filter(w => w.isActive).length} active watches · alerts enabled
                </p>
              </div>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
              border: 'none', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}>
              <Plus size={14} /> Add Watch
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>

            {/* Watch list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mockWatchItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  style={{
                    padding: '16px', borderRadius: '12px', cursor: 'pointer',
                    transition: 'all 0.12s ease',
                    background: selected.id === item.id
                      ? 'linear-gradient(135deg, rgba(108,71,255,0.1), rgba(108,71,255,0.03))'
                      : 'var(--bg-surface)',
                    border: selected.id === item.id
                      ? '1px solid rgba(108,71,255,0.35)'
                      : '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        {item.isActive ? (
                          <span className="live-dot" style={{ width: '6px', height: '6px', flexShrink: 0 }} />
                        ) : (
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-tertiary)', flexShrink: 0 }} />
                        )}
                        <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.topic}
                        </p>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.niche}</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '8px' }}>
                      <p style={{
                        fontSize: '20px', fontWeight: 900, fontFamily: 'monospace',
                        color: item.currentScore >= 80 ? 'var(--accent-emerald)' : item.currentScore >= 60 ? 'var(--accent-amber)' : 'var(--accent-rose)',
                      }}>
                        {item.currentScore}
                      </p>
                      <p style={{ fontSize: '9px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>score</p>
                    </div>
                  </div>

                  {/* Mini sparkline */}
                  <div style={{ height: '30px', marginBottom: '10px' }}>
                    <MomentumChart data={item.history.map(h => ({ date: h.date, score: h.score, volume: 0, velocity: 0 }))} height={30} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {item.platforms.map(p => <PlatformIcon key={p} platform={p} />)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Bell size={10} style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                        {`>`}{item.alertThreshold}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detail view */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Score + info */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(108,71,255,0.08), transparent)',
                border: '1px solid rgba(108,71,255,0.2)',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                      {selected.niche}
                    </p>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {selected.topic}
                    </h2>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {selected.platforms.map(p => <PlatformIcon key={p} platform={p} />)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '56px', fontWeight: 900, fontFamily: 'monospace', lineHeight: 1, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                      {selected.currentScore}
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>momentum score</p>
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {[
                    { icon: <Activity size={12} />, label: 'Alert Threshold', value: `>${selected.alertThreshold}%` },
                    { icon: <TrendingUp size={12} />, label: 'Status', value: selected.isActive ? 'Active' : 'Paused' },
                    { icon: <Bell size={12} />, label: 'Region', value: selected.region.toUpperCase() },
                  ].map(s => (
                    <div key={s.label} style={{
                      padding: '12px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
                    }}>
                      <div style={{ color: 'var(--brand-bright)', marginBottom: '4px' }}>{s.icon}</div>
                      <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full chart */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>14-Day Momentum Trend</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[
                      { color: '#6C47FF', label: 'Score' },
                      { color: '#00D4FF', label: 'Velocity' },
                    ].map(l => (
                      <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '12px', height: '2px', background: l.color, borderRadius: '1px' }} />
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <MomentumChart data={chartData} height={200} showAxes />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
