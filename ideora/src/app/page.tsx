import HeroSection from '@/components/landing/HeroSection';
import SignalTicker from '@/components/landing/SignalTicker';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import SocialProof from '@/components/landing/SocialProof';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '60px',
        display: 'flex', alignItems: 'center',
        padding: '0 40px',
        background: 'rgba(10,10,18,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '7px',
            background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={14} fill="white" style={{ color: 'white' }} />
          </div>
          <span style={{
            fontSize: '16px', fontWeight: 800, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #A08FFF, #6C47FF)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            IDEORA
          </span>
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['Features', 'How it works', 'Pricing', 'Blog'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} style={{
              fontSize: '13px', color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '12px', alignItems: 'center' }}>
          <Link href="/command-center" style={{
            fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none',
          }}>
            Sign in
          </Link>
          <Link href="/command-center" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 16px', borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
            color: 'white', fontSize: '13px', fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(108,71,255,0.3)',
          }}>
            Start free <ArrowRight size={13} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ paddingTop: '60px' }}>
        <HeroSection />
      </div>

      {/* Signal Ticker */}
      <SignalTicker />

      {/* Features */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Social Proof */}
      <SocialProof />

      {/* Pricing */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '6px',
            background: 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={12} fill="white" style={{ color: 'white' }} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)' }}>IDEORA</span>
          <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>© 2026 All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Security', 'Status'].map(item => (
            <a key={item} href="#" style={{ fontSize: '12px', color: 'var(--text-tertiary)', textDecoration: 'none' }}>
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
