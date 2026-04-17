'use client';

import { useEffect, useRef, useState } from 'react';

interface OpportunityScoreProps {
  score: number;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getColor(score: number): string {
  if (score > 75) return 'var(--accent-emerald)';
  if (score >= 50) return 'var(--accent-amber)';
  return 'var(--accent-rose)';
}

function getGlow(score: number): string {
  if (score > 75) return 'rgba(0,255,157,0.25)';
  if (score >= 50) return 'rgba(255,179,64,0.25)';
  return 'rgba(255,77,106,0.25)';
}

function getGrade(score: number): string {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 60) return 'B';
  if (score >= 45) return 'C';
  return 'D';
}

export default function OpportunityScore({ score }: OpportunityScoreProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
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

  const targetOffset = CIRCUMFERENCE - (clampedScore / 100) * CIRCUMFERENCE;
  const dashOffset = animated ? targetOffset : CIRCUMFERENCE;

  const color = getColor(clampedScore);
  const glow = getGlow(clampedScore);
  const grade = getGrade(clampedScore);

  return (
    <div
      style={{
        position: 'relative',
        width: 100,
        height: 100,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Track ring */}
        <circle
          cx={50}
          cy={50}
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={7}
        />
        {/* Progress ring */}
        <circle
          cx={50}
          cy={50}
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{
            transition: 'stroke-dashoffset 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
            filter: `drop-shadow(0 0 6px ${glow})`,
          }}
        />
      </svg>

      {/* Center content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            lineHeight: 1,
            color,
            fontVariantNumeric: 'tabular-nums',
            transition: 'color 0.3s ease',
          }}
        >
          {clampedScore}
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--text-tertiary)',
            lineHeight: 1,
          }}
        >
          {grade}
        </span>
      </div>
    </div>
  );
}
