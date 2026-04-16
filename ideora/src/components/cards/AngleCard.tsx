'use client';

import type { Angle } from '@/types';
import { Zap, Copy, CheckCheck } from 'lucide-react';
import { PlatformIcon } from '@/components/ui/PlatformIcon';
import { useState } from 'react';

interface AngleCardProps {
  angle: Angle;
  index: number;
}

const toneColors: Record<string, string> = {
  educational: '#00D4FF',
  entertaining: '#8B6FFF',
  controversial: '#FF4D6A',
  inspirational: '#00FF9D',
  news: '#FFB340',
};

const toneLabels: Record<string, string> = {
  educational: 'Educational',
  entertaining: 'Entertaining',
  controversial: 'Controversial',
  inspirational: 'Inspirational',
  news: 'News',
};

export function AngleCard({ angle, index }: AngleCardProps) {
  const [copied, setCopied] = useState(false);

  const copyHook = () => {
    navigator.clipboard.writeText(angle.hook).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColor = angle.difficulty === 'easy'
    ? 'var(--accent-emerald)'
    : angle.difficulty === 'medium'
    ? 'var(--accent-amber)'
    : 'var(--accent-rose)';

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '18px',
      transition: 'all 0.15s ease',
    }}
    className="hover:border-[rgba(108,71,255,0.2)] hover:bg-[rgba(255,255,255,0.01)]"
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '6px',
            background: 'var(--brand-pulse)',
            border: '1px solid var(--border-bright)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--brand-bright)' }}>
              {index + 1}
            </span>
          </div>
          <span style={{
            fontSize: '10px', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: toneColors[angle.tone],
            background: `${toneColors[angle.tone]}15`,
            padding: '2px 8px', borderRadius: '4px',
            border: `1px solid ${toneColors[angle.tone]}30`,
          }}>
            {toneLabels[angle.tone]}
          </span>
        </div>

        <button
          onClick={copyHook}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 10px', borderRadius: '6px',
            background: copied ? 'rgba(0,255,157,0.1)' : 'rgba(108,71,255,0.1)',
            border: `1px solid ${copied ? 'rgba(0,255,157,0.3)' : 'rgba(108,71,255,0.25)'}`,
            color: copied ? 'var(--accent-emerald)' : 'var(--brand-bright)',
            fontSize: '11px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {copied ? <CheckCheck size={11} /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy Hook'}
        </button>
      </div>

      {/* Hook */}
      <p style={{
        fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)',
        lineHeight: 1.5, marginBottom: '12px',
        fontStyle: 'italic',
      }}>
        &ldquo;{angle.hook}&rdquo;
      </p>

      {/* Script brief */}
      <div style={{
        padding: '10px 12px',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        marginBottom: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Zap size={10} style={{ color: 'var(--brand-bright)' }} />
          <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
            Structure
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {angle.script}
        </p>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {angle.platform.slice(0, 3).map(p => <PlatformIcon key={p} platform={p} />)}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: difficultyColor, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {angle.difficulty}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
            ~{(angle.estimatedViews / 1000).toFixed(0)}K views
          </span>
        </div>
      </div>
    </div>
  );
}
