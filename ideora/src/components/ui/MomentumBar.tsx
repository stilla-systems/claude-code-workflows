'use client';

import { useEffect, useRef, useState } from 'react';

interface MomentumBarProps {
  value: number;
  showLabel?: boolean;
}

export default function MomentumBar({ value, showLabel = false }: MomentumBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const [animated, setAnimated] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => {
      setAnimated(true);
    });
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text-tertiary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Momentum
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-secondary)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {clampedValue}/100
          </span>
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Momentum: ${clampedValue} out of 100`}
        style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: animated ? `${clampedValue}%` : '0%',
            height: '100%',
            borderRadius: 3,
            background: 'linear-gradient(90deg, var(--brand-dim), var(--brand-bright))',
            boxShadow: '0 0 8px rgba(139,111,255,0.4)',
            transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>
    </div>
  );
}
