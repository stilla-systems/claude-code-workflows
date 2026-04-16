'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  TrendingUp,
  LayoutGrid,
  Zap,
  Eye,
  Calendar,
  Bell,
} from 'lucide-react'

// ── Feature data ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: TrendingUp,
    title: 'Signal Explorer',
    description:
      'Know what\'s moving before it\'s mainstream. Surface high-velocity trends across every major platform with momentum scores, saturation indexes, and peak-timing estimates.',
    accent: 'var(--accent-cyan)',
    glowColor: 'rgba(0,212,255,0.08)',
    borderGlow: 'rgba(0,212,255,0.14)',
  },
  {
    icon: LayoutGrid,
    title: 'Opportunity Grid',
    description:
      'Open windows close fast. We tell you first. Every opportunity is scored, timed, and ranked so you act when it matters—before the window shuts.',
    accent: 'var(--accent-emerald)',
    glowColor: 'rgba(0,255,157,0.07)',
    borderGlow: 'rgba(0,255,157,0.14)',
  },
  {
    icon: Zap,
    title: 'Creator Lab',
    description:
      '5 angles per trend. Pick your hook. The Lab generates ready-to-shoot hooks, scripts, and CTAs tuned to your platform and tone—no blank page, ever.',
    accent: 'var(--brand-bright)',
    glowColor: 'rgba(108,71,255,0.08)',
    borderGlow: 'rgba(108,71,255,0.16)',
  },
  {
    icon: Eye,
    title: 'Signal Watch',
    description:
      'Set alerts. Never miss a spike. Monitor any topic or niche with custom velocity thresholds. When something breaks out, you\'re the first to know.',
    accent: 'var(--accent-amber)',
    glowColor: 'rgba(255,179,64,0.07)',
    borderGlow: 'rgba(255,179,64,0.14)',
  },
  {
    icon: Calendar,
    title: 'Content Flow',
    description:
      'Plan. Schedule. Execute. Convert signals directly into a publishing queue. Drag-and-drop calendar, multi-platform scheduling, and opportunity context baked in.',
    accent: 'var(--accent-cyan)',
    glowColor: 'rgba(0,212,255,0.07)',
    borderGlow: 'rgba(0,212,255,0.12)',
  },
  {
    icon: Bell,
    title: 'Pulse Alerts',
    description:
      'Threshold crossed? You know instantly. Real-time push and email alerts the moment a signal hits your configured spike level—no dashboards required.',
    accent: 'var(--accent-rose)',
    glowColor: 'rgba(255,77,106,0.07)',
    borderGlow: 'rgba(255,77,106,0.14)',
  },
]

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number]
  index: number
}) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="card-base"
      style={{
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = feature.borderGlow
        el.style.boxShadow = `0 0 0 1px ${feature.borderGlow}, 0 8px 40px rgba(0,0,0,0.5), 0 0 32px ${feature.glowColor}`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = ''
        el.style.boxShadow = ''
      }}
    >
      {/* Corner glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: feature.glowColor,
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon container */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `linear-gradient(135deg, ${feature.glowColor.replace(')', ', 2)').replace('rgba', 'rgba')}, transparent)`,
          border: `1px solid ${feature.borderGlow}`,
          flexShrink: 0,
        }}
      >
        <Icon
          size={20}
          style={{ color: feature.accent, strokeWidth: 1.8 }}
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          margin: 0,
          flexGrow: 1,
        }}
      >
        {feature.description}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, ${feature.accent}30, transparent)`,
          marginTop: 4,
        }}
      />
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
      style={{ textAlign: 'center', marginBottom: 64 }}
    >
      <span
        style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: 'var(--brand-bright)',
          textTransform: 'uppercase',
          marginBottom: 16,
          padding: '5px 14px',
          background: 'rgba(108,71,255,0.1)',
          border: '1px solid rgba(108,71,255,0.22)',
          borderRadius: 999,
        }}
      >
        Platform Features
      </span>
      <h2
        style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          margin: '0 0 18px',
        }}
      >
        <span className="text-gradient">Everything you need</span>
        <br />
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.75em' }}>
          to move at signal speed
        </span>
      </h2>
      <p
        style={{
          fontSize: 17,
          color: 'var(--text-secondary)',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.6,
        }}
      >
        Six purpose-built modules that turn raw trend data into published content—faster than any workflow you've used before.
      </p>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        padding: 'clamp(64px, 8vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(108,71,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader />

        {/* 3 × 2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
