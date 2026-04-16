'use client';

import type { Trend } from '@/types';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, Users, Globe } from 'lucide-react';
import { PlatformIcon } from '@/components/ui/PlatformIcon';

interface TrendCardProps {
  trend: Trend;
  onClick?: (trend: Trend) => void;
  compact?: boolean;
}

const regionLabels: Record<string, string> = {
  us: 'United States', uk: 'United Kingdom', eu: 'Europe',
  global: 'Global', apac: 'Asia Pacific', latam: 'Latin America', mena: 'MENA'
};

export function TrendCard({ trend, onClick, compact = false }: TrendCardProps) {
  const saturationColor = trend.saturation < 30
    ? 'var(--accent-emerald)'
    : trend.saturation < 60
    ? 'var(--accent-amber)'
    : 'var(--accent-rose)';

  const saturationLabel = trend.saturation < 30 ? 'Low' : trend.saturation < 60 ? 'Medium' : 'High';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(trend)}
      onKeyDown={e => e.key === 'Enter' && onClick?.(trend)}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: compact ? '16px' : '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="group hover:border-[rgba(108,71,255,0.25)] hover:shadow-[0_0_20px_rgba(108,71,255,0.08)]"
    >
      {/* Momentum indicator strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, var(--brand-core), var(--brand-bright))`,
        opacity: trend.momentumScore / 100,
        borderRadius: '12px 12px 0 0',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--text-tertiary)',
            }}>
              {trend.category}
            </span>
          </div>
          <h3 style={{
            fontSize: compact ? '14px' : '15px', fontWeight: 600,
            color: 'var(--text-primary)', lineHeight: 1.3,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {trend.title}
          </h3>
        </div>

        {/* Momentum score */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginLeft: '12px', flexShrink: 0,
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: `conic-gradient(var(--brand-core) ${trend.momentumScore}%, rgba(255,255,255,0.05) 0%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: 'var(--bg-surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {trend.momentumScore}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', gap: '16px',
        marginBottom: compact ? '12px' : '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <TrendingUp size={11} style={{ color: 'var(--accent-emerald)' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-emerald)', fontFamily: 'monospace' }}>
            +{trend.growthRate}%/wk
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Users size={11} style={{ color: 'var(--text-tertiary)' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {formatNumber(trend.volume)} vol
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Globe size={11} style={{ color: 'var(--text-tertiary)' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {regionLabels[trend.region]}
          </span>
        </div>
      </div>

      {/* Saturation + Platforms */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Saturation */}
        <div style={{ flex: 1, marginRight: '16px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginBottom: '4px',
          }}>
            <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Saturation
            </span>
            <span style={{ fontSize: '10px', fontWeight: 600, color: saturationColor, fontFamily: 'monospace' }}>
              {saturationLabel} ({trend.saturation}%)
            </span>
          </div>
          <div style={{
            height: '4px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${trend.saturation}%`,
              background: saturationColor,
              borderRadius: '2px',
              transition: 'width 0.6s ease',
            }} />
          </div>
        </div>

        {/* Platforms */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {trend.platforms.slice(0, 3).map(p => (
            <PlatformIcon key={p} platform={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
