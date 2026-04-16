'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { TrendCard } from '@/components/cards/TrendCard';
import { MomentumChart } from '@/components/charts/MomentumChart';
import { mockDailyBrief, mockTrends, generateMomentumData, formatVolume } from '@/lib/mock-data';
import {
  Zap, TrendingUp, Target, Radio, AlertTriangle, CheckCircle, Info, ChevronRight
} from 'lucide-react';

const chartData = generateMomentumData(14, 91, 8);

const agentIconMap: Record<string, typeof Zap> = {
  'Signal Scout': Radio,
  'Opportunity Strategist': Target,
  'Trend Classifier': TrendingUp,
  'Momentum Analyst': TrendingUp,
  'Daily Brief Agent': Zap,
  'Platform Formatter': Zap,
};

const agentTypeColor: Record<string, string> = {
  spike: 'var(--accent-cyan)',
  warning: 'var(--accent-amber)',
  discovery: 'var(--brand-bright)',
  opportunity: 'var(--accent-emerald)',
  info: 'var(--text-secondary)',
};

function AgentTypeIcon({ type }: { type: string }) {
  if (type === 'spike') return <AlertTriangle size={13} style={{ color: 'var(--accent-cyan)' }} />;
  if (type === 'warning') return <AlertTriangle size={13} style={{ color: 'var(--accent-amber)' }} />;
  if (type === 'discovery') return <Radio size={13} style={{ color: 'var(--brand-bright)' }} />;
  if (type === 'opportunity') return <CheckCircle size={13} style={{ color: 'var(--accent-emerald)' }} />;
  return <Info size={13} style={{ color: 'var(--text-secondary)' }} />;
}

export default function CommandCenterPage() {
  const brief = mockDailyBrief;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Command Center" />

        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', maxWidth: '1400px', width: '100%' }}>

          {/* Date + Signal Score Hero */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            marginBottom: '28px', flexWrap: 'wrap', gap: '16px',
          }}>
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                {today}
              </p>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                Daily Command Center
              </h1>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                {brief.agentInsights.length} agents active · {brief.alertCount} alerts · {brief.topOpportunities.length} open opportunities
              </p>
            </div>

            {/* Signal Quality Score */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(108,71,255,0.12), rgba(108,71,255,0.04))',
              border: '1px solid rgba(108,71,255,0.3)',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex', alignItems: 'center', gap: '20px',
              boxShadow: '0 0 30px rgba(108,71,255,0.1)',
            }}>
              <div>
                <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  Signal Quality
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '40px', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'monospace', letterSpacing: '-0.03em' }}>
                    {brief.signalScore}
                  </span>
                  <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/100</span>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                {/* Score ring */}
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                  <circle
                    cx="32" cy="32" r="28"
                    stroke="url(#scoreGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${175.9 * brief.signalScore / 100} 175.9`}
                    transform="rotate(-90 32 32)"
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6C47FF" />
                      <stop offset="100%" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Elite</p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px', marginBottom: '28px',
          }}>
            {[
              { label: 'Open Windows', value: '6', color: 'var(--accent-emerald)', sub: 'opportunities available' },
              { label: 'Signals Tracked', value: '2.8M', color: 'var(--accent-cyan)', sub: 'past 24 hours' },
              { label: 'Top Velocity', value: '+890%', color: 'var(--brand-bright)', sub: 'Raw milk trend' },
              { label: 'Niches Monitored', value: '47', color: 'var(--accent-amber)', sub: 'across 8 regions' },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '16px 18px',
              }}>
                <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
                  {stat.label}
                </p>
                <p style={{ fontSize: '24px', fontWeight: 800, color: stat.color, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', marginBottom: '24px' }}>

            {/* Left: Top Opportunities */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Top Opportunities Today
                </h2>
                <a href="/opportunity-grid" style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '12px', color: 'var(--brand-bright)', textDecoration: 'none',
                }}>
                  View all <ChevronRight size={12} />
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {brief.topOpportunities.map((opp, i) => (
                  <OpportunityCard key={opp.id} opportunity={opp} featured={i === 0} />
                ))}
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Signal Momentum Chart */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '18px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Signal Momentum</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>14-day rolling score</p>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '11px', color: 'var(--accent-cyan)',
                    fontWeight: 600,
                  }}>
                    <span className="live-dot" style={{ width: '6px', height: '6px' }} />
                    LIVE
                  </div>
                </div>
                <MomentumChart data={chartData} height={140} />
              </div>

              {/* Agent Feed */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '18px',
                flex: 1,
              }}>
                <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
                  Agent Activity
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {brief.agentInsights.slice(0, 5).map((insight) => (
                    <div key={insight.id} style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      padding: '10px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-subtle)',
                    }}>
                      <div style={{
                        width: '26px', height: '26px', borderRadius: '6px',
                        background: `${agentTypeColor[insight.type]}15`,
                        border: `1px solid ${agentTypeColor[insight.type]}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '1px',
                      }}>
                        <AgentTypeIcon type={insight.type} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>
                          {insight.agent}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trending Niches */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
              Trending Niches
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {mockTrends.map((trend) => (
                <TrendCard key={trend.id} trend={trend} compact />
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
