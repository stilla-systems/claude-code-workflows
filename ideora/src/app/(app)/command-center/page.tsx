'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { OpportunityCard } from '@/components/cards/OpportunityCard';
import { mockDailyBrief } from '@/lib/mock-data';
import {
  AlertTriangle, ChevronRight, Radio, Target, TrendingUp, Zap,
  Clock, CheckCircle, Activity
} from 'lucide-react';
import Link from 'next/link';

export default function CommandCenterPage() {
  const brief = mockDailyBrief;
  const opps = brief.topOpportunities;

  const criticalCount = opps.filter(o => o.urgencyLevel === 'critical').length;
  const highCount = opps.filter(o => o.urgencyLevel === 'high').length;
  const mediumCount = opps.filter(o => o.urgencyLevel === 'medium').length;
  const closingCount = opps.filter(o => o.window === 'closing').length;

  const featured = opps[0];
  const rest = opps.slice(1);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Command Center" />

        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Decision Engine Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>

              {/* Title + urgency pills */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '9px',
                    background: 'linear-gradient(135deg, rgba(108,71,255,0.25), rgba(108,71,255,0.08))',
                    border: '1px solid rgba(108,71,255,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Zap size={15} style={{ color: 'var(--brand-bright)' }} />
                  </div>
                  <h1 style={{
                    fontSize: '26px', fontWeight: 900, color: 'var(--text-primary)',
                    letterSpacing: '-0.03em', lineHeight: 1,
                  }}>
                    Today's Opportunities
                  </h1>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {criticalCount > 0 && (
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '4px 10px', borderRadius: '20px',
                      background: 'rgba(255,77,106,0.12)', border: '1px solid rgba(255,77,106,0.3)',
                      fontSize: '11px', fontWeight: 700, color: 'var(--accent-rose)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-rose)', display: 'inline-block' }} />
                      {criticalCount} Critical
                    </span>
                  )}
                  {highCount > 0 && (
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '4px 10px', borderRadius: '20px',
                      background: 'rgba(255,179,64,0.10)', border: '1px solid rgba(255,179,64,0.28)',
                      fontSize: '11px', fontWeight: 700, color: 'var(--accent-amber)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-amber)', display: 'inline-block' }} />
                      {highCount} High
                    </span>
                  )}
                  {mediumCount > 0 && (
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '4px 10px', borderRadius: '20px',
                      background: 'rgba(108,71,255,0.10)', border: '1px solid rgba(108,71,255,0.25)',
                      fontSize: '11px', fontWeight: 700, color: 'var(--brand-bright)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--brand-bright)', display: 'inline-block' }} />
                      {mediumCount} Medium
                    </span>
                  )}

                  {closingCount > 0 && (
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '4px 10px', borderRadius: '20px',
                      background: 'rgba(255,179,64,0.06)', border: '1px solid rgba(255,179,64,0.2)',
                      fontSize: '11px', fontWeight: 600, color: 'var(--accent-amber)',
                    }}>
                      <AlertTriangle size={10} />
                      {closingCount} window{closingCount > 1 ? 's' : ''} closing today
                    </span>
                  )}
                </div>
              </div>

              {/* Right: live scan status */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="live-dot" style={{ width: '6px', height: '6px' }} />
                  <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '0.06em' }}>
                    LIVE
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    · Updated {timeStr}
                  </span>
                </div>
                <Link href="/opportunity-grid" style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '12px', color: 'var(--brand-bright)', textDecoration: 'none', fontWeight: 600,
                }}>
                  View all {opps.length} opportunities <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Alert banner — closing windows */}
          {closingCount > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
              background: 'rgba(255,179,64,0.06)',
              border: '1px solid rgba(255,179,64,0.2)',
              borderLeft: '3px solid var(--accent-amber)',
            }}>
              <AlertTriangle size={14} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: 'var(--accent-amber)', fontWeight: 600 }}>
                {closingCount} opportunity window{closingCount > 1 ? 's are' : ' is'} closing today — act before these trends peak without you.
              </p>
            </div>
          )}

          {/* Featured Opportunity */}
          {featured && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{
                  padding: '3px 9px', borderRadius: '6px',
                  background: 'rgba(255,77,106,0.12)', border: '1px solid rgba(255,77,106,0.25)',
                  fontSize: '10px', fontWeight: 800, color: 'var(--accent-rose)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  #1 Priority
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                  Highest-urgency opportunity right now
                </span>
              </div>
              <OpportunityCard opportunity={featured} featured={true} />
            </div>
          )}

          {/* Remaining opportunities grid + agent sidebar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}>

            {/* Opportunity grid */}
            <div>
              {rest.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    More opportunities
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
                </div>
              )}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '14px',
              }}>
                {rest.map(opp => (
                  <OpportunityCard key={opp.id} opportunity={opp} featured={false} />
                ))}
              </div>
            </div>

            {/* Agent status panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'sticky', top: '24px' }}>

              {/* Agent Activity */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Activity size={13} style={{ color: 'var(--brand-bright)' }} />
                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Agent Activity</p>
                  <span className="live-dot" style={{ width: '5px', height: '5px', marginLeft: 'auto' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {brief.agentInsights.slice(0, 5).map(insight => (
                    <AgentRow key={insight.id} insight={insight} />
                  ))}
                </div>
              </div>

              {/* Quick stats — minimal, decision-oriented */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '16px',
              }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>
                  Signal Health
                </p>
                {[
                  { label: 'Signals scanned', value: '2.8M', color: 'var(--accent-cyan)' },
                  { label: 'Signal quality', value: `${brief.signalScore}/100`, color: 'var(--brand-bright)' },
                  { label: 'Top velocity', value: '+890%', color: 'var(--accent-emerald)' },
                  { label: 'Niches monitored', value: '47', color: 'var(--text-secondary)' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '7px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{item.label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: item.color, fontFamily: 'monospace' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

const agentTypeColor: Record<string, string> = {
  spike: 'var(--accent-cyan)',
  warning: 'var(--accent-amber)',
  discovery: 'var(--brand-bright)',
  opportunity: 'var(--accent-emerald)',
  info: 'var(--text-tertiary)',
};

function AgentRow({ insight }: { insight: { id: string; agent: string; message: string; type: string; timestamp: string; priority: string } }) {
  const color = agentTypeColor[insight.type] ?? 'var(--text-tertiary)';
  return (
    <div style={{
      display: 'flex', gap: '8px', alignItems: 'flex-start',
      padding: '8px', borderRadius: '8px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border-subtle)',
    }}>
      <div style={{
        width: '22px', height: '22px', borderRadius: '5px', flexShrink: 0,
        background: `${color}15`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <AgentDot color={color} type={insight.type} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {insight.agent}
        </p>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {insight.message}
        </p>
      </div>
    </div>
  );
}

function AgentDot({ color, type }: { color: string; type: string }) {
  if (type === 'opportunity') return <CheckCircle size={11} style={{ color }} />;
  if (type === 'spike') return <TrendingUp size={11} style={{ color }} />;
  if (type === 'warning') return <AlertTriangle size={11} style={{ color }} />;
  if (type === 'discovery') return <Radio size={11} style={{ color }} />;
  return <Clock size={11} style={{ color }} />;
}
