'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// ── Tier data ──────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: 'creator',
    name: 'Creator',
    price: 29,
    period: 'mo',
    tagline: 'For individual creators building their niche.',
    highlight: false,
    badge: null,
    features: [
      '3 niches tracked',
      '5 signals per day',
      'Weekly curated brief',
      'Signal Explorer access',
      'Basic Opportunity Grid',
      'Email pulse alerts',
      'TikTok & Instagram signals',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'outline',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    period: 'mo',
    tagline: 'For serious creators who publish daily.',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited niches',
      'Real-time signals (live feed)',
      'Daily intelligence brief',
      'All platforms — TikTok, YouTube, Instagram, X, LinkedIn',
      'Full Opportunity Grid',
      'Creator Lab (5 angles / trend)',
      'Signal Watch + instant alerts',
      'Content Flow calendar',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'brand',
  },
  {
    id: 'agency',
    name: 'Agency',
    price: 249,
    period: 'mo',
    tagline: 'For agencies scaling content at volume.',
    highlight: false,
    badge: null,
    features: [
      'Everything in Pro',
      'Up to 10 team seats',
      'White-label reports',
      'Full API access',
      'Custom niche onboarding',
      'Dedicated account manager',
      'SLA uptime guarantee',
      'SSO & advanced permissions',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'outline',
  },
]

// ── Check item ────────────────────────────────────────────────────────────────
function FeatureItem({
  text,
  highlight,
}: {
  text: string
  highlight: boolean
}) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        fontSize: 14,
        color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)',
        lineHeight: 1.5,
        padding: '3px 0',
      }}
    >
      <Check
        size={14}
        style={{
          color: highlight ? 'var(--accent-emerald)' : 'var(--text-tertiary)',
          flexShrink: 0,
          marginTop: 3,
          strokeWidth: 2.5,
        }}
      />
      {text}
    </li>
  )
}

// ── Pricing card ──────────────────────────────────────────────────────────────
function PricingCard({
  tier,
  index,
}: {
  tier: (typeof TIERS)[number]
  index: number
}) {
  const isHighlight = tier.highlight

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 20,
        padding: isHighlight ? '2px' : 0,
        background: isHighlight
          ? 'linear-gradient(135deg, rgba(108,71,255,0.7), rgba(139,111,255,0.4), rgba(0,212,255,0.25))'
          : 'transparent',
        // Slight scale-up for Pro
        transform: isHighlight ? 'scale(1.02)' : 'none',
        zIndex: isHighlight ? 2 : 1,
      }}
    >
      {/* Inner card */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: isHighlight ? 18 : 20,
          background: isHighlight
            ? 'linear-gradient(160deg, #16143A 0%, var(--bg-elevated) 100%)'
            : 'var(--bg-surface)',
          border: isHighlight ? 'none' : '1px solid var(--border-subtle)',
          boxShadow: isHighlight
            ? '0 0 0 1px rgba(108,71,255,0.12), 0 20px 60px rgba(0,0,0,0.7), 0 0 80px rgba(108,71,255,0.15)'
            : '0 4px 24px rgba(0,0,0,0.4)',
          padding: 32,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Glow orb inside Pro card */}
        {isHighlight && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -60,
              right: -40,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(108,71,255,0.12)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Badge */}
        {tier.badge && (
          <div style={{ marginBottom: 20 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#fff',
                textTransform: 'uppercase',
              }}
            >
              ★ {tier.badge}
            </span>
          </div>
        )}

        {/* Tier name */}
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: isHighlight ? 'var(--brand-bright)' : 'var(--text-secondary)',
            }}
          >
            {tier.name}
          </span>
        </div>

        {/* Price */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 4,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              alignSelf: 'flex-start',
              marginTop: 8,
            }}
          >
            $
          </span>
          <span
            className="font-data"
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: isHighlight ? 'var(--text-primary)' : 'var(--text-primary)',
            }}
          >
            {tier.price}
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: 6,
            }}
          >
            /{tier.period}
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: 28,
            margin: '0 0 28px',
          }}
        >
          {tier.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: isHighlight
              ? 'linear-gradient(90deg, rgba(108,71,255,0.35), transparent)'
              : 'var(--border-subtle)',
            marginBottom: 24,
          }}
        />

        {/* Features list */}
        <ul
          style={{
            listStyle: 'none',
            margin: '0 0 32px',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flex: 1,
          }}
        >
          {tier.features.map((f) => (
            <FeatureItem key={f} text={f} highlight={isHighlight} />
          ))}
        </ul>

        {/* CTA button */}
        <motion.a
          href={tier.id === 'agency' ? '#contact' : '#signup'}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '14px 24px',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            letterSpacing: '0.01em',
            cursor: 'pointer',
            ...(tier.ctaStyle === 'brand'
              ? {
                  background:
                    'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
                  color: '#fff',
                  boxShadow:
                    '0 0 0 1px rgba(139,111,255,0.4), 0 8px 24px rgba(108,71,255,0.4)',
                }
              : {
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }),
          }}
        >
          {tier.cta}
          {tier.ctaStyle === 'brand' && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </motion.a>

        {/* Trial note */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--text-tertiary)',
            marginTop: 12,
            marginBottom: 0,
          }}
        >
          {tier.id === 'agency'
            ? 'Custom contracts available'
            : '14-day free trial · No credit card required'}
        </p>
      </div>
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
        Pricing
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
        <span className="text-gradient">Simple, transparent pricing.</span>
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
        Start free. Upgrade when your content starts winning.
        <br />
        Cancel any time — no questions asked.
      </p>
    </motion.div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function PricingSection() {
  return (
    <section
      id="pricing"
      style={{
        padding: 'clamp(64px, 8vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-void)',
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(108,71,255,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader />

        {/* Tier grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            alignItems: 'center',
          }}
        >
          {TIERS.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: 48,
            color: 'var(--text-tertiary)',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          {['SOC 2 Type II', 'GDPR Compliant', '99.9% Uptime SLA', 'Cancel anytime'].map(
            (item) => (
              <span
                key={item}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Check size={12} style={{ color: 'var(--accent-emerald)' }} />
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
