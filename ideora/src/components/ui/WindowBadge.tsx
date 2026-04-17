import type { WindowStatus } from '@/types';

interface WindowBadgeProps {
  window: WindowStatus;
}

const CONFIG: Record<
  WindowStatus,
  { label: string; color: string; bg: string; border: string; dotClass: string }
> = {
  open: {
    label: 'OPEN',
    color: 'var(--accent-emerald)',
    bg: 'rgba(0,255,157,0.08)',
    border: 'rgba(0,255,157,0.22)',
    dotClass: 'live-dot emerald',
  },
  closing: {
    label: 'CLOSING',
    color: 'var(--accent-amber)',
    bg: 'rgba(255,179,64,0.08)',
    border: 'rgba(255,179,64,0.22)',
    dotClass: 'live-dot amber',
  },
  closed: {
    label: 'CLOSED',
    color: 'var(--accent-rose)',
    bg: 'rgba(255,77,106,0.08)',
    border: 'rgba(255,77,106,0.22)',
    dotClass: 'live-dot rose',
  },
  emerging: {
    label: 'EMERGING',
    color: 'var(--accent-cyan)',
    bg: 'rgba(0,212,255,0.08)',
    border: 'rgba(0,212,255,0.22)',
    dotClass: 'live-dot',
  },
};

export function WindowBadge({ window }: WindowBadgeProps) {
  const { label, color, bg, border, dotClass } = CONFIG[window];

  return (
    <span
      role="status"
      aria-label={`Opportunity window: ${label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 8px',
        borderRadius: 20,
        background: bg,
        border: `1px solid ${border}`,
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: '0.07em',
        color,
        whiteSpace: 'nowrap',
      }}
    >
      <span className={dotClass} aria-hidden="true" style={{ width: 5, height: 5 }} />
      {label}
    </span>
  );
}

export default WindowBadge;
