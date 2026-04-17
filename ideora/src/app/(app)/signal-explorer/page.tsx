'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { TrendCard } from '@/components/cards/TrendCard';
import { MomentumChart } from '@/components/charts/MomentumChart';
import { mockTrends, mockSignals, generateMomentumData, formatVolume } from '@/lib/mock-data';
import type { Trend, Platform, Region } from '@/types';
import { Radio, Filter, TrendingUp, Globe } from 'lucide-react';

const platforms: Platform[] = ['tiktok', 'instagram', 'youtube', 'x', 'linkedin'];
const regions: { value: Region; label: string }[] = [
  { value: 'global', label: 'Global' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'eu', label: 'Europe' },
  { value: 'apac', label: 'Asia Pacific' },
];

const categories = ['All', 'Lifestyle & Wellness', 'Health & Nutrition', 'Business & Finance', 'Content Creation', 'Productivity & Mental Health', 'Fashion & Style'];

const platformLabels: Record<Platform, string> = {
  tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube', x: 'X', linkedin: 'LinkedIn'
};

export default function SignalExplorerPage() {
  const [selectedRegion, setSelectedRegion] = useState<Region>('us');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(mockTrends[0]);

  const filteredTrends = mockTrends.filter(t => {
    const regionMatch = selectedRegion === 'global' || t.region === selectedRegion || t.region === 'global';
    const catMatch = selectedCategory === 'All' || t.category === selectedCategory;
    return regionMatch && catMatch;
  });

  const chartData = selectedTrend ? generateMomentumData(14, selectedTrend.momentumScore, 12) : [];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Signal Explorer" />
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Radio size={15} style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Signal Explorer
              </h1>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '3px 10px', borderRadius: '20px',
                background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
              }}>
                <span className="live-dot" style={{ width: '5px', height: '5px' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.06em' }}>LIVE</span>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '42px' }}>
              {mockSignals.length} active signals · updated 2 minutes ago
            </p>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex', gap: '12px', marginBottom: '24px',
            flexWrap: 'wrap', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={12} style={{ color: 'var(--text-tertiary)' }} />
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Filter</span>
            </div>

            {/* Region filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {regions.map(r => (
                <button key={r.value} onClick={() => setSelectedRegion(r.value)} style={{
                  padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.12s ease',
                  background: selectedRegion === r.value ? 'rgba(108,71,255,0.15)' : 'transparent',
                  border: selectedRegion === r.value ? '1px solid rgba(108,71,255,0.4)' : '1px solid var(--border-default)',
                  color: selectedRegion === r.value ? 'var(--brand-bright)' : 'var(--text-secondary)',
                }}>
                  {r.label}
                </button>
              ))}
            </div>

            <div style={{ width: '1px', height: '20px', background: 'var(--border-default)' }} />

            {/* Category filter */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button key={c} onClick={() => setSelectedCategory(c)} style={{
                  padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.12s ease',
                  background: selectedCategory === c ? 'rgba(0,212,255,0.08)' : 'transparent',
                  border: selectedCategory === c ? '1px solid rgba(0,212,255,0.3)' : '1px solid var(--border-default)',
                  color: selectedCategory === c ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Main split layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px' }}>

            {/* Trend grid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {filteredTrends.length} trend{filteredTrends.length !== 1 ? 's' : ''} found
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Sorted by momentum</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {filteredTrends.map(trend => (
                  <TrendCard
                    key={trend.id}
                    trend={trend}
                    onClick={setSelectedTrend}
                  />
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div style={{ position: 'sticky', top: '24px', alignSelf: 'flex-start' }}>
              {selectedTrend ? (
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}>
                  {/* Gradient header */}
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(108,71,255,0.1), transparent)',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '6px' }}>
                      {selectedTrend.category}
                    </p>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                      {selectedTrend.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedTrend.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                          background: 'rgba(108,71,255,0.1)', border: '1px solid rgba(108,71,255,0.2)',
                          color: 'var(--brand-bright)',
                        }}>#{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ padding: '18px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { label: 'Momentum Score', value: `${selectedTrend.momentumScore}/100`, color: 'var(--brand-bright)' },
                        { label: 'Growth Rate', value: `+${selectedTrend.growthRate}%/wk`, color: 'var(--accent-emerald)' },
                        { label: 'Volume', value: formatVolume(selectedTrend.volume), color: 'var(--accent-cyan)' },
                        { label: 'Saturation', value: `${selectedTrend.saturation}%`, color: selectedTrend.saturation < 40 ? 'var(--accent-emerald)' : 'var(--accent-amber)' },
                      ].map(s => (
                        <div key={s.label} style={{
                          padding: '10px 12px',
                          background: 'rgba(255,255,255,0.02)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-subtle)',
                        }}>
                          <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
                          <p style={{ fontSize: '16px', fontWeight: 800, color: s.color, fontFamily: 'monospace' }}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chart */}
                  <div style={{ padding: '18px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      14-Day Momentum
                    </p>
                    <MomentumChart data={chartData} height={120} />
                  </div>

                  {/* Audience */}
                  <div style={{ padding: '18px' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Target Audience
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {selectedTrend.audience.map(a => (
                        <span key={a} style={{
                          fontSize: '11px', padding: '4px 10px', borderRadius: '20px',
                          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-default)',
                          color: 'var(--text-secondary)',
                        }}>
                          {a}
                        </span>
                      ))}
                    </div>

                    <a href="/opportunity-grid" style={{
                      display: 'block', marginTop: '14px', padding: '10px',
                      background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
                      borderRadius: '8px', textAlign: 'center',
                      color: 'white', fontSize: '13px', fontWeight: 600,
                      textDecoration: 'none', transition: 'opacity 0.15s',
                    }}
                    className="hover:opacity-90">
                      View Opportunities →
                    </a>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                  borderRadius: '16px', padding: '40px 24px', textAlign: 'center',
                }}>
                  <Globe size={32} style={{ color: 'var(--text-tertiary)', margin: '0 auto 12px' }} />
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Select a trend to explore details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
