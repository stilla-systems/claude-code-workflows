'use client'

// SignalTicker — live horizontally scrolling trend signal tape

const SIGNALS = [
  { topic: 'AI Morning Routines',         velocity: 340,  tag: 'Wellness'       },
  { topic: 'Solopreneurs Replacing Agencies', velocity: 480, tag: 'Business'    },
  { topic: 'Mushroom Coffee Alternatives', velocity: 220, tag: 'Health'         },
  { topic: 'Cinematic iPhone B-Roll',      velocity: 310,  tag: 'Content'       },
  { topic: 'Raw Milk Controversy',         velocity: 890,  tag: 'Viral'         },
  { topic: 'ADHD Productivity Systems',    velocity: 65,   tag: 'Productivity'  },
  { topic: 'Quiet Luxury Minimalism',      velocity: 120,  tag: 'Fashion'       },
  { topic: 'Dopamine Dressing Revival',    velocity: 95,   tag: 'Style'         },
  { topic: 'Creator Economy 3.0',          velocity: 415,  tag: 'Business'      },
  { topic: 'Functional Fitness Protocols', velocity: 178,  tag: 'Wellness'      },
]

// Double the list so the CSS loop is seamless
const TICKER_ITEMS = [...SIGNALS, ...SIGNALS]

const TAG_COLORS: Record<string, string> = {
  Wellness:    'var(--accent-emerald)',
  Business:    'var(--brand-bright)',
  Health:      'var(--accent-emerald)',
  Content:     'var(--accent-cyan)',
  Viral:       'var(--accent-rose)',
  Productivity:'var(--accent-amber)',
  Fashion:     'var(--brand-bright)',
  Style:       'var(--brand-bright)',
}

export default function SignalTicker() {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, var(--bg-void) 0%, var(--bg-surface) 8%, var(--bg-surface) 92%, var(--bg-void) 100%)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left / right fade masks */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background: 'linear-gradient(90deg, var(--bg-void) 0%, transparent 12%, transparent 88%, var(--bg-void) 100%)',
        }}
      />

      {/* LIVE badge */}
      <div
        style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 6, padding: '4px 10px',
          boxShadow: '0 0 12px rgba(0,212,255,0.15)',
        }}
      >
        <span className="live-dot" style={{ width: 6, height: 6 }} />
        <span
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
            color: 'var(--accent-cyan)', textTransform: 'uppercase',
          }}
        >
          LIVE
        </span>
      </div>

      {/* Scrolling tape */}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ticker-scroll 40s linear infinite',
          paddingLeft: 120, /* clear the LIVE badge */
        }}
      >
        {TICKER_ITEMS.map((item, i) => {
          const tagColor = TAG_COLORS[item.tag] ?? 'var(--text-secondary)'
          return (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 28px 11px 0',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {/* Topic name */}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.01em',
                }}
              >
                {item.topic}
              </span>

              {/* Velocity */}
              <span
                className="font-data"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--accent-cyan)',
                  background: 'rgba(0,212,255,0.08)',
                  border: '1px solid rgba(0,212,255,0.18)',
                  borderRadius: 4,
                  padding: '1px 6px',
                  letterSpacing: '0.03em',
                }}
              >
                +{item.velocity}%/wk
              </span>

              {/* Tag */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: tagColor,
                  opacity: 0.7,
                  textTransform: 'uppercase',
                }}
              >
                {item.tag}
              </span>

              {/* Separator dot */}
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: 'var(--border-default)',
                  marginLeft: 4,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
