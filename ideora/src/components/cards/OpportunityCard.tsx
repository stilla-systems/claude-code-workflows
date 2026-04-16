'use client';

import type { Opportunity } from '@/types';
import { formatNumber, daysUntil } from '@/lib/utils';
import { Clock, Target, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { WindowBadge } from '@/components/ui/WindowBadge';
import { PlatformIcon } from '@/components/ui/PlatformIcon';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick?: (opp: Opportunity) => void;
  featured?: boolean;
}

const difficultyColors: Record<string, string> = {
  easy: 'var(--accent-emerald)',
  medium: 'var(--accent-amber)',
  hard: 'var(--accent-rose)',
};

export function OpportunityCard({ opportunity: opp, onClick, featured = false }: OpportunityCardProps) {
  const days = daysUntil(opp.expiresAt);
  const scoreColor = opp.score >= 80
    ? 'var(--accent-emerald)'
    : opp.score >= 60
    ? 'var(--accent-amber)'
    : 'var(--accent-rose)';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(opp)}
      onKeyDown={e => e.key === 'Enter' && onClick?.(opp)}
      style={{
        background: featured
          ? 'linear-gradient(135deg, rgba(108,71,255,0.08), rgba(108,71,255,0.02))'
          : 'var(--bg-surface)',
        border: featured
          ? '1px solid rgba(108,71,255,0.35)'
          : '1px solid var(--border-subtle)',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: featured ? '0 0 40px rgba(108,71,255,0.12)' : '0 4px 24px rgba(0,0,0,0.4)',
      }}
      className="group hover:translate-y-[-1px] hover:shadow-[0_8px_40px_rgba(108,71,255,0.15)]"
    >
      {/* Score ring */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px',
        width: '52px', height: '52px',
      }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="22" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="26" cy="26" r="22"
            stroke={scoreColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${138.2 * opp.score / 100} 138.2`}
            transform="rotate(-90 26 26)"
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
            {opp.score}
          </span>
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '14px', paddingRight: '64px' }}>
        <div style={{ marginBottom: '6px' }}>
          <WindowBadge window={opp.window} />
        </div>
        <h3 style={{
          fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)',
          lineHeight: 1.3, marginBottom: '6px',
        }}>
          {opp.title}
        </h3>
        <p style={{
          fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {opp.summary}
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '8px', marginBottom: '14px',
      }}>
        <StatItem
          icon={<Target size={10} />}
          label="Reach"
          value={formatNumber(opp.estimatedReach)}
          color="var(--text-secondary)"
        />
        <StatItem
          icon={<Users size={10} />}
          label="Competition"
          value={formatNumber(opp.competitorCount)}
          color="var(--text-secondary)"
        />
        <StatItem
          icon={<Clock size={10} />}
          label="Window"
          value={days > 0 ? `${days}d left` : 'Today'}
          color={days <= 2 ? 'var(--accent-rose)' : days <= 4 ? 'var(--accent-amber)' : 'var(--text-secondary)'}
        />
      </div>

      {/* Saturation bar */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Saturation
          </span>
          <span style={{ fontSize: '10px', fontWeight: 600, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
            {opp.saturation}%
          </span>
        </div>
        <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${opp.saturation}%`,
            background: opp.saturation < 30 ? 'var(--accent-emerald)' : opp.saturation < 60 ? 'var(--accent-amber)' : 'var(--accent-rose)',
            borderRadius: '2px',
          }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {opp.platforms.slice(0, 4).map(p => <PlatformIcon key={p} platform={p} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 600,
            color: difficultyColors[opp.difficulty],
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {opp.difficulty}
          </span>
          <TrendingUp size={11} style={{ color: 'var(--brand-bright)' }} />
          <span style={{ fontSize: '11px', color: 'var(--brand-bright)' }}>
            {opp.angles.length} angles
          </span>
        </div>
      </div>

      {/* Hover arrow */}
      <div style={{
        position: 'absolute', bottom: '20px', right: '20px',
        opacity: 0, transition: 'opacity 0.15s ease',
      }} className="group-hover:opacity-100">
        <ChevronRight size={16} style={{ color: 'var(--brand-bright)' }} />
      </div>
    </div>
  );
}

function StatItem({
  icon, label, value, color
}: {
  icon: React.ReactNode; label: string; value: string; color: string;
}) {
  return (
    <div style={{
      padding: '8px 10px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '8px',
      border: '1px solid var(--border-subtle)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px', color: 'var(--text-tertiary)' }}>
        {icon}
        <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      </div>
      <span style={{ fontSize: '13px', fontWeight: 700, color, fontFamily: 'monospace' }}>{value}</span>
    </div>
  );
}
