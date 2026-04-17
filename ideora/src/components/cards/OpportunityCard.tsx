'use client';

import type { Opportunity } from '@/types';
import { formatNumber, daysUntil } from '@/lib/utils';
import { Clock, Sparkles, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import { PlatformIcon } from '@/components/ui/PlatformIcon';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onClick?: (opp: Opportunity) => void;
  onCreate?: (opp: Opportunity) => void;
  featured?: boolean;
}

const urgencyConfig = {
  critical: {
    color: '#FF4D6A',
    bg: 'rgba(255,77,106,0.08)',
    border: 'rgba(255,77,106,0.35)',
    label: 'ACT NOW',
    glow: '0 0 40px rgba(255,77,106,0.15)',
  },
  high: {
    color: '#FFB340',
    bg: 'rgba(255,179,64,0.08)',
    border: 'rgba(255,179,64,0.3)',
    label: 'TIME SENSITIVE',
    glow: '0 0 40px rgba(255,179,64,0.12)',
  },
  medium: {
    color: '#8B6FFF',
    bg: 'rgba(108,71,255,0.06)',
    border: 'rgba(108,71,255,0.25)',
    label: 'OPEN WINDOW',
    glow: '0 0 32px rgba(108,71,255,0.1)',
  },
  low: {
    color: '#8888AA',
    bg: 'rgba(255,255,255,0.03)',
    border: 'rgba(255,255,255,0.08)',
    label: 'EVERGREEN',
    glow: 'none',
  },
};

const formatLabels: Record<string, string> = {
  'short-video': 'Short Video',
  'long-video': 'Long Video',
  'carousel': 'Carousel',
  'thread': 'Thread',
  'reel': 'Reel',
  'post': 'Post',
  'story': 'Story',
};

const formatIcons: Record<string, string> = {
  'short-video': '▶',
  'long-video': '▶▶',
  'carousel': '⊞',
  'thread': '≡',
  'reel': '◉',
  'post': '✎',
  'story': '◎',
};

const difficultyDots: Record<string, number> = { easy: 1, medium: 2, hard: 3 };

export function OpportunityCard({ opportunity: opp, onClick, onCreate, featured = false }: OpportunityCardProps) {
  const urgency = urgencyConfig[opp.urgencyLevel];
  const days = daysUntil(opp.expiresAt);

  return (
    <div
      role="article"
      style={{
        background: featured
          ? `linear-gradient(135deg, ${urgency.bg}, rgba(108,71,255,0.03))`
          : 'var(--bg-surface)',
        border: `1px solid ${featured ? urgency.border : 'var(--border-subtle)'}`,
        borderRadius: '16px',
        padding: '0',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: featured
          ? `0 8px 32px rgba(0,0,0,0.5), ${urgency.glow}`
          : '0 4px 20px rgba(0,0,0,0.35)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={() => onClick?.(opp)}
      className="group hover:translate-y-[-2px] hover:shadow-[0_12px_48px_rgba(108,71,255,0.18)]"
    >
      {/* URGENCY STRIPE */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, ${urgency.color}, ${urgency.color}88, transparent)`,
      }} />

      {/* TOP ROW — Urgency + Score */}
      <div style={{
        padding: '14px 18px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: urgency.bg,
          border: `1px solid ${urgency.border}`,
        }}>
          {opp.urgencyLevel === 'critical' && (
            <span className="live-dot rose" style={{ width: '5px', height: '5px', background: urgency.color }} />
          )}
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: urgency.color,
          }}>
            {urgency.label}
          </span>
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            color: urgency.color,
            opacity: 0.8,
          }}>
            · {opp.timing.urgencyLabel}
          </span>
        </div>

        {/* Score pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '3px 9px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: opp.score >= 80 ? 'var(--accent-emerald)' : opp.score >= 60 ? 'var(--accent-amber)' : 'var(--accent-rose)',
            boxShadow: `0 0 8px ${opp.score >= 80 ? 'rgba(0,255,157,0.5)' : 'rgba(255,179,64,0.5)'}`,
          }} />
          <span style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)' }}>
            {opp.score}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>/100</span>
        </div>
      </div>

      {/* HOOK — The hero of the card */}
      <div style={{ padding: '14px 18px 10px' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginBottom: '8px',
        }}>
          Post This →
        </p>
        <h3 style={{
          fontSize: '17px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          letterSpacing: '-0.015em',
          fontStyle: 'italic',
        }}>
          &ldquo;{opp.hook}&rdquo;
        </h3>
      </div>

      {/* WHY THIS WORKS */}
      <div style={{
        margin: '0 18px 14px',
        padding: '12px 14px',
        background: 'rgba(108,71,255,0.06)',
        border: '1px solid rgba(108,71,255,0.15)',
        borderRadius: '10px',
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-start',
      }}>
        <Lightbulb size={14} style={{ color: 'var(--brand-bright)', flexShrink: 0, marginTop: '1px' }} />
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--brand-bright)',
            marginBottom: '4px',
          }}>
            Why This Works
          </p>
          <p style={{
            fontSize: '12.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}>
            {opp.whyThisWorks}
          </p>
        </div>
      </div>

      {/* BRIEF SPECS — Format, Platform, Timing */}
      <div style={{
        margin: '0 18px 14px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
      }}>
        {/* Format */}
        <SpecBlock
          label="Format"
          icon={<span style={{ fontSize: '13px', color: 'var(--accent-cyan)' }}>{formatIcons[opp.bestFormat] || '▶'}</span>}
          value={formatLabels[opp.bestFormat] || opp.bestFormat}
        />
        {/* Platform */}
        <SpecBlock
          label="Platform"
          icon={<PlatformIcon platform={opp.bestPlatform} />}
          value={opp.bestPlatform === 'x' ? 'X' : opp.bestPlatform.charAt(0).toUpperCase() + opp.bestPlatform.slice(1)}
        />
        {/* Timing */}
        <SpecBlock
          label="Peak in"
          icon={<Clock size={12} style={{ color: urgency.color }} />}
          value={opp.timing.peakIn}
          valueColor={urgency.color}
        />
      </div>

      {/* METRICS ROW — Saturation + Difficulty + Reach */}
      <div style={{
        margin: '0 18px 14px',
        padding: '10px 0 0',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}>
        {/* Saturation mini-bar */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Saturation
            </span>
            <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
              {opp.saturation}%
            </span>
          </div>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${opp.saturation}%`,
              background: opp.saturation < 30 ? 'var(--accent-emerald)' : opp.saturation < 60 ? 'var(--accent-amber)' : 'var(--accent-rose)',
              borderRadius: '2px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>

        {/* Difficulty dots */}
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px', textAlign: 'center' }}>
            Difficulty
          </p>
          <div style={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: n <= difficultyDots[opp.difficulty]
                  ? opp.difficulty === 'easy' ? 'var(--accent-emerald)' : opp.difficulty === 'medium' ? 'var(--accent-amber)' : 'var(--accent-rose)'
                  : 'rgba(255,255,255,0.08)',
              }} />
            ))}
          </div>
        </div>

        {/* Est. reach */}
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <p style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
            Est. Reach
          </p>
          <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'monospace', lineHeight: 1 }}>
            {formatNumber(opp.estimatedReach)}
          </p>
        </div>
      </div>

      {/* CTA ROW */}
      <div style={{
        padding: '12px 18px',
        background: 'rgba(0,0,0,0.2)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        gap: '8px',
      }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCreate?.(opp);
          }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '10px 14px',
            borderRadius: '8px',
            border: 'none',
            background: `linear-gradient(135deg, ${urgency.color}, ${urgency.color}CC)`,
            color: opp.urgencyLevel === 'medium' || opp.urgencyLevel === 'low' ? 'white' : '#0A0A12',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: `0 0 16px ${urgency.color}40`,
            letterSpacing: '-0.01em',
          }}
          className="hover:brightness-110"
        >
          <Zap size={13} fill="currentColor" />
          Create Now
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(opp);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'transparent',
            border: '1px solid var(--border-default)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          className="hover:border-[rgba(108,71,255,0.4)] hover:text-[var(--brand-bright)]"
        >
          {opp.angles.length} angles
          <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

function SpecBlock({
  label,
  icon,
  value,
  valueColor = 'var(--text-primary)',
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  valueColor?: string;
}) {
  return (
    <div style={{
      padding: '10px 12px',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-tertiary)' }}>
        {icon}
        <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </span>
      </div>
      <span style={{
        fontSize: '13px',
        fontWeight: 700,
        color: valueColor,
        letterSpacing: '-0.01em',
      }}>
        {value}
      </span>
    </div>
  );
}
