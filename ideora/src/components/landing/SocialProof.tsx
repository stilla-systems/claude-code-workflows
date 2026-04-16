'use client'

import { motion } from 'framer-motion'

// ── Metrics bar data ──────────────────────────────────────────────────────────
const METRICS = [
  { value: '12,000+', label: 'creators' },
  { value: '$2.4B', label: 'in tracked content value' },
  { value: '140', label: 'countries' },
  { value: '4.9★', label: 'average rating' },
]

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      'Ideora found me a gap in the ADHD productivity niche three days before it exploded. That single piece hit 1.2M views. I\'ve never moved faster on a trend in my life.',
    name: 'Mara Chen',
    role: 'Content Creator — 890K followers',
    avatar: 'MC',
    platform: 'TikTok / YouTube',
    accentColor: 'var(--accent-cyan)',
  },
  {
    quote:
      'We run content for 14 brands. Before Ideora, we were guessing. Now our signal-to-publish time is under 48 hours and client retention is through the roof.',
    name: 'James Okoye',
    role: 'Founder — Scale Content Agency',
    avatar: 'JO',
    platform: 'Agency',
    accentColor: 'var(--brand-bright)',
  },
  {
    quote:
      'The Opportunity Grid pays for itself on one piece. Our LinkedIn engagement tripled in the first month because we stopped writing about dead topics.',
    name: 'Sofia Reyes',
    role: 'Creator & Solopreneur — 430K LinkedIn',
    avatar: 'SR',
    platform: 'LinkedIn / X',
    accentColor: 'var(--accent-emerald)',
  },
]

// ── Star rating ───────────────────────────────────────────────────────────────
function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.09L12 4.635l-2.5 2.455.59 3.41L7 8.91l-3.09 1.59.59-3.41L2 4.635l3.455-.545L7 1z"
            fill="var(--accent-amber)"
          />
        </svg>
      ))}
    </div>
  )
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-base"
      style={{
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent corner */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle at 80px 0, ${testimonial.accentColor}18, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Stars */}
      <Stars />

      {/* Quote */}
      <blockquote
        style={{
          margin: 0,
          fontSize: 15,
          lineHeight: 1.65,
          color: 'var(--text-primary)',
          fontStyle: 'italic',
          fontWeight: 400,
          position: 'relative',
          paddingLeft: 16,
          borderLeft: `2px solid ${testimonial.accentColor}50`,
        }}
      >
        "{testimonial.quote}"
      </blockquote>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
        {/* Avatar */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${testimonial.accentColor}30, ${testimonial.accentColor}10)`,
            border: `1px solid ${testimonial.accentColor}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: testimonial.accentColor,
            flexShrink: 0,
          }}
        >
          {testimonial.avatar}
        </div>

        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            {testimonial.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-secondary)',
              marginTop: 2,
              lineHeight: 1.3,
            }}
          >
            {testimonial.role}
          </div>
          <div
            style={{
              fontSize: 11,
              color: testimonial.accentColor,
              marginTop: 2,
              fontWeight: 600,
              letterSpacing: '0.06em',
              opacity: 0.8,
            }}
          >
            {testimonial.platform}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Metrics bar ───────────────────────────────────────────────────────────────
function MetricsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 0,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 56,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {METRICS.map((metric, index) => (
        <div key={metric.value} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Metric item */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 40px',
              gap: 4,
            }}
          >
            <span
              className="font-data"
              style={{
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                background:
                  'linear-gradient(135deg, var(--text-primary) 0%, var(--brand-bright) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {metric.value}
            </span>
            <span
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              {metric.label}
            </span>
          </div>

          {/* Separator */}
          {index < METRICS.length - 1 && (
            <div
              aria-hidden
              style={{
                width: 1,
                height: 40,
                background: 'var(--border-subtle)',
                flexShrink: 0,
              }}
            />
          )}
        </div>
      ))}
    </motion.div>
  )
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ textAlign: 'center', marginBottom: 48 }}
    >
      <span
        style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: 'var(--accent-amber)',
          textTransform: 'uppercase',
          marginBottom: 16,
          padding: '5px 14px',
          background: 'rgba(255,179,64,0.08)',
          border: '1px solid rgba(255,179,64,0.2)',
          borderRadius: 999,
        }}
      >
        Social Proof
      </span>
      <h2
        style={{
          fontSize: 'clamp(28px, 4.5vw, 46px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.12,
          margin: '0 0 16px',
        }}
      >
        <span className="text-gradient">Trusted by creators who ship.</span>
      </h2>
      <p
        style={{
          fontSize: 17,
          color: 'var(--text-secondary)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.6,
        }}
      >
        From solo creators to multi-brand agencies — Ideora is the edge they don't talk about.
      </p>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SocialProof() {
  return (
    <section
      id="social-proof"
      style={{
        padding: 'clamp(64px, 8vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-base)',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 35% at 50% 0%, rgba(255,179,64,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader />
        <MetricsBar />

        {/* Testimonials */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            textAlign: 'center',
            marginTop: 52,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0 }}>
            Join 12,000+ creators already using Ideora to win.
          </p>
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '13px 28px',
              background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              boxShadow:
                '0 0 0 1px rgba(139,111,255,0.35), 0 8px 24px rgba(108,71,255,0.3)',
              cursor: 'pointer',
            }}
          >
            Start free 14-day trial
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
