'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Radio,
  BarChart3,
  Zap,
  Eye,
  Calendar,
  Bell,
  Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  path: string;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Command Center', icon: LayoutDashboard, path: '/command-center' },
  { label: 'Signal Explorer', icon: Radio, path: '/signal-explorer' },
  { label: 'Opportunity Grid', icon: BarChart3, path: '/opportunity-grid' },
  { label: 'Creator Lab', icon: Zap, path: '/creator-lab' },
  { label: 'Signal Watch', icon: Eye, path: '/signal-watch' },
  { label: 'Content Flow', icon: Calendar, path: '/content-flow' },
  { label: 'Pulse Alerts', icon: Bell, path: '/pulse-alerts', badge: 4 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        minWidth: 'var(--sidebar-width)',
        maxWidth: 'var(--sidebar-width)',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        style={{
          height: 'var(--topbar-height)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid var(--border-subtle)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 12px rgba(108,71,255,0.4)',
            }}
          >
            <Zap size={14} strokeWidth={2.5} style={{ color: '#fff' }} />
          </div>
          <span
            className="text-gradient-brand"
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            IDEORA
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: '12px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                transition: 'background 0.15s ease, color 0.15s ease',
                position: 'relative',
                background: isActive ? 'var(--brand-glow)' : 'transparent',
                border: isActive
                  ? '1px solid var(--border-bright)'
                  : '1px solid transparent',
                color: isActive ? 'var(--brand-bright)' : 'var(--text-secondary)',
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: 18,
                    borderRadius: '0 2px 2px 0',
                    background: 'var(--brand-bright)',
                    boxShadow: '0 0 8px var(--brand-bright)',
                  }}
                />
              )}
              <Icon
                size={16}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                style={{
                  fontSize: 13.5,
                  fontWeight: isActive ? 600 : 400,
                  flex: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
              {item.badge != null && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    background: isActive
                      ? 'var(--brand-bright)'
                      : 'rgba(108,71,255,0.25)',
                    color: isActive ? '#fff' : 'var(--brand-bright)',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '0 5px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: User + Settings */}
      <div
        style={{
          padding: '12px 10px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-core), var(--accent-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
              boxShadow: '0 0 10px rgba(108,71,255,0.3)',
            }}
          >
            U
          </div>
          <div>
            <div
              style={{
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
              }}
            >
              User
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-tertiary)',
                lineHeight: 1.2,
              }}
            >
              Pro Plan
            </div>
          </div>
        </div>
        <button
          aria-label="Settings"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-tertiary)',
            transition: 'color 0.15s ease, border-color 0.15s ease',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-tertiary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)';
          }}
        >
          <Settings size={15} strokeWidth={1.8} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
