'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCountUp(target: number, duration: number = 1800, delay: number = 0) {
  const [value, setValue] = useState(0)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [target, duration, delay])

  return value
}

// ── Floating orb ─────────────────────────────────────────────────────────────
function FloatingOrb({
  size,
  color,
  top,
  left,
  delay,
  blur,
}: {
  size: number
  color: string
  top: string
  left: string
  delay: number
  blur: number
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: `blur(${blur}px)`,
        pointerEvents: 'none',
        opacity: 0,
      }}
      animate={
        prefersReduced
          ? { opacity: 0.55 }
          : {
              opacity: [0.35, 0.55, 0.35],
              y: [0, -18, 0],
              scale: [1, 1.06, 1],
            }
      }
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 999,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text-secondary)',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ── Signal score widget ───────────────────────────────────────────────────────
function SignalScoreWidget() {
  const score = useCountUp(91, 1600, 600)
  const circumference = 2 * Math.PI * 42
  const dashOffset = circumference - (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 24px 14px 18px',
        background: 'rgba(0,212,255,0.05)',
        border: '1px solid rgba(0,212,255,0.18)',
        borderRadius: 16,
        boxShadow: '0 0 32px rgba(0,212,255,0.12), 0 0 0 1px rgba(0,212,255,0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Circular progress ring */}
      <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 96 96"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="rgba(0,212,255,0.12)"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="var(--accent-cyan)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: 'stroke-dashoffset 0.05s linear',
              filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.6))',
            }}
          />
        </svg>
        {/* Score text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="font-data"
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              lineHeight: 1,
            }}
          >
            {score}
          </span>
        </div>
      </div>

      {/* Labels */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 2,
          }}
        >
          <span className="live-dot" />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--accent-cyan)',
              textTransform: 'uppercase',
            }}
          >
            Live
          </span>
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}
        >
          Signal Quality Today
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            marginTop: 2,
          }}
        >
          91 / 100 — Exceptional
        </div>
      </div>
    </motion.div>
  )
}

// Shared ease curve as a named easing (avoids Variants typing issues)
const EASE = 'easeOut' as const

// ── Main hero ─────────────────────────────────────────────────────────────────
export default function HeroSection() {

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 96,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      {/* ── Radial background glow ──────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(108,71,255,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Floating orbs ───────────────────────────────────────────────────── */}
      <FloatingOrb
        size={480}
        color="rgba(108,71,255,0.09)"
        top="-80px"
        left="-120px"
        delay={0}
        blur={90}
      />
      <FloatingOrb
        size={320}
        color="rgba(0,212,255,0.07)"
        top="120px"
        left="calc(70% - 80px)"
        delay={2}
        blur={70}
      />
      <FloatingOrb
        size={200}
        color="rgba(139,111,255,0.1)"
        top="60%"
        left="15%"
        delay={4}
        blur={50}
      />

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 880,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 28 }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              background: 'rgba(108,71,255,0.1)',
              border: '1px solid rgba(108,71,255,0.28)',
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--brand-bright)',
              textTransform: 'uppercase',
            }}
          >
            <span className="live-dot" style={{ background: 'var(--brand-bright)' }} />
            Content Intelligence Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            margin: '0 auto 24px',
          }}
        >
          <span className="text-gradient">
            The Intelligence Layer
            <br />
            for Creators
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          style={{
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 560,
            margin: '0 auto 40px',
          }}
        >
          Real-time signals.&nbsp; Open windows.&nbsp; Content&nbsp;that&nbsp;wins.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            flexWrap: 'wrap',
            marginBottom: 52,
          }}
        >
          {/* Primary */}
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 0 0 1px rgba(139,111,255,0.4), 0 8px 24px rgba(108,71,255,0.35)',
              transition: 'box-shadow 0.2s',
              cursor: 'pointer',
            }}
          >
            Start for Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="#features"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 28px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.5 6c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="8" cy="10.5" r=".75" fill="currentColor" />
            </svg>
            See How It Works
          </motion.a>
        </motion.div>

        {/* Signal score widget */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <SignalScoreWidget />
        </div>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >
          <StatPill label="2.8M signals analyzed" />
          <StatPill label="6 open windows" />
          <StatPill label="47 niches tracked" />
        </motion.div>
      </div>
    </section>
  )
}
