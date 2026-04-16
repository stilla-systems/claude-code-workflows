'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { AngleCard } from '@/components/cards/AngleCard';
import { PlatformIcon } from '@/components/ui/PlatformIcon';
import { mockOpportunities, mockTrends } from '@/lib/mock-data';
import type { Platform, ContentFormat } from '@/types';
import { Zap, Sparkles, RefreshCw, ChevronDown } from 'lucide-react';

const platforms: Platform[] = ['tiktok', 'instagram', 'youtube', 'x', 'linkedin'];
const formats: { value: ContentFormat; label: string }[] = [
  { value: 'short-video', label: 'Short Video' },
  { value: 'long-video', label: 'Long Video' },
  { value: 'carousel', label: 'Carousel' },
  { value: 'thread', label: 'Thread' },
  { value: 'reel', label: 'Reel' },
];

const tones = ['Educational', 'Entertaining', 'Controversial', 'Inspirational', 'News'];
const toneColors: Record<string, string> = {
  Educational: '#00D4FF', Entertaining: '#8B6FFF',
  Controversial: '#FF4D6A', Inspirational: '#00FF9D', News: '#FFB340',
};

export default function CreatorLabPage() {
  const [selectedNiche, setSelectedNiche] = useState(mockTrends[0].niche);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat>('short-video');
  const [selectedTone, setSelectedTone] = useState('Educational');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const allAngles = mockOpportunities.flatMap(o => o.angles);
  const displayAngles = hasGenerated ? allAngles.slice(0, 5) : [];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar title="Creator Lab" />
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(108,71,255,0.2), rgba(139,111,255,0.1))',
              border: '1px solid rgba(108,71,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(108,71,255,0.15)',
            }}>
              <Zap size={17} style={{ color: 'var(--brand-bright)' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Creator Lab
              </h1>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Generate content angles from trend intelligence
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>

            {/* Config panel */}
            <div>
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'sticky', top: '24px',
              }}>
                {/* Panel header */}
                <div style={{
                  padding: '18px 20px',
                  background: 'linear-gradient(135deg, rgba(108,71,255,0.08), transparent)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Configure Generation</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    Set your parameters to generate targeted angles
                  </p>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Niche selector */}
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '8px' }}>
                      Niche / Topic
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={selectedNiche}
                        onChange={e => setSelectedNiche(e.target.value)}
                        style={{
                          width: '100%', padding: '10px 32px 10px 12px',
                          borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                          background: 'var(--bg-elevated)', border: '1px solid var(--border-default)',
                          color: 'var(--text-primary)', appearance: 'none', cursor: 'pointer',
                        }}
                      >
                        {mockTrends.map(t => (
                          <option key={t.id} value={t.niche}>{t.niche}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} style={{
                        position: 'absolute', right: '10px', top: '50%',
                        transform: 'translateY(-50%)', color: 'var(--text-tertiary)',
                        pointerEvents: 'none',
                      }} />
                    </div>
                  </div>

                  {/* Platform selector */}
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '8px' }}>
                      Target Platform
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {platforms.map(p => (
                        <button key={p} onClick={() => setSelectedPlatform(p)} style={{
                          cursor: 'pointer', transition: 'all 0.12s ease',
                          background: selectedPlatform === p ? 'rgba(108,71,255,0.15)' : 'transparent',
                          border: selectedPlatform === p ? '1px solid rgba(108,71,255,0.4)' : '1px solid var(--border-default)',
                          borderRadius: '20px', padding: '4px 10px 4px 6px',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          <PlatformIcon platform={p} />
                          <span style={{ fontSize: '11px', fontWeight: 500, color: selectedPlatform === p ? 'var(--brand-bright)' : 'var(--text-secondary)' }}>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Format selector */}
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '8px' }}>
                      Content Format
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {formats.map(f => (
                        <button key={f.value} onClick={() => setSelectedFormat(f.value)} style={{
                          padding: '8px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                          cursor: 'pointer', transition: 'all 0.12s ease',
                          background: selectedFormat === f.value ? 'rgba(108,71,255,0.12)' : 'rgba(255,255,255,0.02)',
                          border: selectedFormat === f.value ? '1px solid rgba(108,71,255,0.4)' : '1px solid var(--border-subtle)',
                          color: selectedFormat === f.value ? 'var(--brand-bright)' : 'var(--text-secondary)',
                        }}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tone selector */}
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: '8px' }}>
                      Content Tone
                    </label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {tones.map(t => {
                        const active = selectedTone === t;
                        const c = toneColors[t];
                        return (
                          <button key={t} onClick={() => setSelectedTone(t)} style={{
                            padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.12s ease',
                            background: active ? `${c}15` : 'transparent',
                            border: active ? `1px solid ${c}40` : '1px solid var(--border-default)',
                            color: active ? c : 'var(--text-secondary)',
                          }}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Generate button */}
                  <button onClick={handleGenerate} disabled={isGenerating} style={{
                    width: '100%', padding: '13px',
                    borderRadius: '10px', border: 'none',
                    background: isGenerating
                      ? 'rgba(108,71,255,0.3)'
                      : 'linear-gradient(135deg, var(--brand-core), var(--brand-bright))',
                    color: 'white', fontSize: '14px', fontWeight: 700,
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: isGenerating ? 'none' : '0 0 20px rgba(108,71,255,0.35)',
                    transition: 'all 0.15s ease',
                  }}>
                    {isGenerating ? (
                      <>
                        <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                        Generating angles...
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} />
                        Generate 5 Angles
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Output panel */}
            <div>
              {!hasGenerated && !isGenerating && (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  height: '400px',
                  background: 'var(--bg-surface)', border: '1px dashed var(--border-default)',
                  borderRadius: '16px',
                }}>
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '14px',
                    background: 'rgba(108,71,255,0.08)', border: '1px solid rgba(108,71,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px',
                  }}>
                    <Sparkles size={24} style={{ color: 'var(--brand-bright)', opacity: 0.5 }} />
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Configure and generate
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: '280px' }}>
                    Set your niche, platform, and tone, then click Generate to create targeted content angles.
                  </p>
                </div>
              )}

              {isGenerating && (
                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '12px',
                }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} style={{
                      height: '160px', borderRadius: '12px',
                      background: 'linear-gradient(90deg, var(--bg-surface), rgba(108,71,255,0.05), var(--bg-surface))',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 1.5s linear infinite',
                      border: '1px solid var(--border-subtle)',
                    }} />
                  ))}
                </div>
              )}

              {hasGenerated && !isGenerating && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Generated Angles
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {selectedNiche} · {selectedPlatform} · {selectedTone}
                      </p>
                    </div>
                    <button onClick={handleGenerate} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '6px 14px', borderRadius: '8px',
                      background: 'rgba(108,71,255,0.1)', border: '1px solid rgba(108,71,255,0.3)',
                      color: 'var(--brand-bright)', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    }}>
                      <RefreshCw size={12} /> Regenerate
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {displayAngles.map((angle, i) => (
                      <AngleCard key={angle.id + i} angle={angle} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
