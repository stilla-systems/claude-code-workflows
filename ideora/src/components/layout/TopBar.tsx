'use client';

import { Search, Bell, ChevronRight } from 'lucide-react';

interface TopBarProps {
  pageTitle?: string;
  title?: string;
  breadcrumb?: string[];
  alertCount?: number;
}

export function TopBar({
  pageTitle,
  title,
  breadcrumb,
  alertCount = 4,
}: TopBarProps) {
  const resolvedTitle = pageTitle ?? title ?? '';
  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 24px',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      {/* Left: Title + Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {breadcrumb && breadcrumb.length > 0 && (
          <>
            {breadcrumb.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {crumb}
                </span>
                <ChevronRight size={12} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              </span>
            ))}
          </>
        )}
        <h1
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {resolvedTitle}
        </h1>
      </div>

      {/* Center: Search */}
      <div style={{ flex: 1, maxWidth: 440, margin: '0 auto' }}>
        <label
          htmlFor="topbar-search"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '0 12px',
            height: 34,
            transition: 'border-color 0.15s ease',
            cursor: 'text',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLLabelElement).style.borderColor = 'var(--border-default)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLLabelElement).style.borderColor = 'var(--border-subtle)';
          }}
        >
          <Search size={13} strokeWidth={1.8} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
          <input
            id="topbar-search"
            type="text"
            placeholder="Search signals, trends, topics..."
            readOnly
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--text-secondary)',
              cursor: 'text',
            }}
          />
          <kbd
            style={{
              fontSize: 10,
              color: 'var(--text-tertiary)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 4,
              padding: '1px 5px',
              fontFamily: 'inherit',
              flexShrink: 0,
            }}
          >
            ⌘K
          </kbd>
        </label>
      </div>

      {/* Right: Live + Bell + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {/* Live Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 20,
            background: 'rgba(0,212,255,0.06)',
            border: '1px solid rgba(0,212,255,0.18)',
          }}
        >
          <span className="live-dot" aria-hidden="true" />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--accent-cyan)',
            }}
          >
            LIVE
          </span>
        </div>

        {/* Bell */}
        <button
          aria-label={`Notifications — ${alertCount} unread`}
          style={{
            position: 'relative',
            width: 34,
            height: 34,
            borderRadius: 8,
            border: '1px solid var(--border-subtle)',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-default)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)';
          }}
        >
          <Bell size={16} strokeWidth={1.8} />
          {alertCount > 0 && (
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--accent-rose)',
                boxShadow: '0 0 6px var(--accent-rose)',
                border: '1.5px solid var(--bg-surface)',
              }}
            />
          )}
        </button>

        {/* User Avatar */}
        <button
          aria-label="User menu"
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
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(108,71,255,0.3)',
            flexShrink: 0,
          }}
        >
          U
        </button>
      </div>
    </header>
  );
}

export default TopBar;
