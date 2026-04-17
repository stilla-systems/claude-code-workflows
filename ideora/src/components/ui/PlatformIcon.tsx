import type { Platform } from '@/types';

interface PlatformIconProps {
  platform: Platform;
}

const CONFIG: Record<
  Platform,
  { label: string; bg: string; color: string; border: string }
> = {
  tiktok: {
    label: 'TT',
    bg: 'rgba(0, 0, 0, 0.6)',
    color: '#FFFFFF',
    border: 'rgba(255,255,255,0.15)',
  },
  instagram: {
    label: 'IG',
    bg: 'rgba(228,64,95,0.15)',
    color: '#E4405F',
    border: 'rgba(228,64,95,0.3)',
  },
  youtube: {
    label: 'YT',
    bg: 'rgba(255,0,0,0.12)',
    color: '#FF0000',
    border: 'rgba(255,0,0,0.25)',
  },
  x: {
    label: 'X',
    bg: 'rgba(255,255,255,0.06)',
    color: '#E7E9EA',
    border: 'rgba(255,255,255,0.12)',
  },
  linkedin: {
    label: 'IN',
    bg: 'rgba(10,102,194,0.15)',
    color: '#0A66C2',
    border: 'rgba(10,102,194,0.3)',
  },
};

const PLATFORM_NAMES: Record<Platform, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  x: 'X (Twitter)',
  linkedin: 'LinkedIn',
};

export function PlatformIcon({ platform }: PlatformIconProps) {
  const { label, bg, color, border } = CONFIG[platform];

  return (
    <span
      title={PLATFORM_NAMES[platform]}
      aria-label={PLATFORM_NAMES[platform]}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        minWidth: 28,
        padding: '0 6px',
        borderRadius: 5,
        background: bg,
        border: `1px solid ${border}`,
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: '0.04em',
        color,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {label}
    </span>
  );
}

export default PlatformIcon;
