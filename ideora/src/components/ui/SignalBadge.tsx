import type { SignalStrength } from '@/types';

interface SignalBadgeProps {
  strength: SignalStrength;
}

const CONFIG: Record<
  SignalStrength,
  { label: string; color: string; bg: string; border: string; dotClass: string }
> = {
  strong: {
    label: 'Strong',
    color: 'var(--accent-emerald)',
    bg: 'rgba(0,255,157,0.08)',
    border: 'rgba(0,255,157,0.2)',
    dotClass: 'live-dot emerald',
  },
  moderate: {
    label: 'Moderate',
    color: 'var(--accent-amber)',
    bg: 'rgba(255,179,64,0.08)',
    border: 'rgba(255,179,64,0.2)',
    dotClass: 'live-dot amber',
  },
  weak: {
    label: 'Weak',
    color: 'var(--accent-rose)',
    bg: 'rgba(255,77,106,0.08)',
    border: 'rgba(255,77,106,0.2)',
    dotClass: 'live-dot rose',
  },
};

export default function SignalBadge({ strength }: SignalBadgeProps) {
  const { label, color, bg, border, dotClass } = CONFIG[strength];

  return (
    <span
      role="status"
      aria-label={`Signal strength: ${label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 8px',
        borderRadius: 20,
        background: bg,
        border: `1px solid ${border}`,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.04em',
        color,
        whiteSpace: 'nowrap',
      }}
    >
      <span className={dotClass} aria-hidden="true" style={{ width: 5, height: 5 }} />
      {label}
    </span>
  );
}
