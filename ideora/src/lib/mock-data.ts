// ============================================================
// IDEORA — Comprehensive Mock Data System
// ============================================================

import type {
  Signal, Trend, Opportunity, Angle, DailyBrief, AgentInsight,
  WatchItem, ContentItem, PulseAlert, MomentumDataPoint, Platform
} from '@/types';

// === SIGNALS ===
export const mockSignals: Signal[] = [
  {
    id: 's1', topic: 'AI-generated morning routines', region: 'us',
    platforms: ['tiktok', 'instagram'], volume: 2_840_000, velocity: 340,
    sentiment: 0.72, timestamp: '2026-04-16T06:00:00Z', strength: 'strong',
    tags: ['ai', 'wellness', 'morning-routine'], category: 'Lifestyle & Wellness'
  },
  {
    id: 's2', topic: 'Mushroom coffee alternatives', region: 'us',
    platforms: ['tiktok', 'youtube'], volume: 1_200_000, velocity: 220,
    sentiment: 0.85, timestamp: '2026-04-16T05:45:00Z', strength: 'strong',
    tags: ['health', 'coffee', 'nootropics'], category: 'Health & Nutrition'
  },
  {
    id: 's3', topic: 'Quiet luxury minimalism', region: 'global',
    platforms: ['instagram', 'tiktok'], volume: 4_100_000, velocity: 120,
    sentiment: 0.61, timestamp: '2026-04-16T05:30:00Z', strength: 'moderate',
    tags: ['fashion', 'minimalism', 'luxury'], category: 'Fashion & Style'
  },
  {
    id: 's4', topic: 'Solopreneurs replacing agencies', region: 'us',
    platforms: ['x', 'linkedin', 'youtube'], volume: 890_000, velocity: 480,
    sentiment: 0.78, timestamp: '2026-04-16T05:15:00Z', strength: 'strong',
    tags: ['business', 'freelance', 'entrepreneurship'], category: 'Business & Finance'
  },
  {
    id: 's5', topic: 'Dopamine dressing revival', region: 'uk',
    platforms: ['instagram', 'tiktok'], volume: 670_000, velocity: 95,
    sentiment: 0.88, timestamp: '2026-04-16T05:00:00Z', strength: 'moderate',
    tags: ['fashion', 'color', 'style'], category: 'Fashion & Style'
  },
  {
    id: 's6', topic: 'Raw milk debate comeback', region: 'us',
    platforms: ['tiktok', 'x'], volume: 3_200_000, velocity: 890,
    sentiment: -0.1, timestamp: '2026-04-16T04:45:00Z', strength: 'strong',
    tags: ['health', 'controversial', 'food'], category: 'Health & Nutrition'
  },
  {
    id: 's7', topic: 'ADHD productivity systems', region: 'global',
    platforms: ['youtube', 'tiktok', 'instagram'], volume: 5_800_000, velocity: 65,
    sentiment: 0.91, timestamp: '2026-04-16T04:30:00Z', strength: 'moderate',
    tags: ['adhd', 'productivity', 'neurodivergent'], category: 'Productivity & Mental Health'
  },
  {
    id: 's8', topic: 'B-roll cinematic iPhone techniques', region: 'global',
    platforms: ['youtube', 'tiktok'], volume: 920_000, velocity: 310,
    sentiment: 0.94, timestamp: '2026-04-16T04:15:00Z', strength: 'strong',
    tags: ['filmmaking', 'iphone', 'content-creation'], category: 'Content Creation'
  },
];

// === MOMENTUM CHART DATA ===
export const generateMomentumData = (days: number, baseScore: number, volatility: number = 10): MomentumDataPoint[] => {
  const data: MomentumDataPoint[] = [];
  let score = baseScore - 30;
  for (let i = days; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    score = Math.max(5, Math.min(100, score + (Math.random() - 0.35) * volatility));
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round(score),
      volume: Math.round((score / 100) * 5_000_000 * (0.8 + Math.random() * 0.4)),
      velocity: Math.round(score * 3.5 * (0.7 + Math.random() * 0.6))
    });
  }
  return data;
};

// === TRENDS ===
export const mockTrends: Trend[] = [
  {
    id: 't1',
    signals: [mockSignals[0]],
    title: 'AI-Optimized Morning Routines',
    category: 'Lifestyle & Wellness',
    niche: 'Wellness & Biohacking',
    audience: ['Millennials', 'Gen Z', 'Health Enthusiasts'],
    tags: ['ai', 'wellness', 'morning', 'productivity'],
    momentumScore: 87,
    growthRate: 340,
    peakEstimate: '2026-04-22',
    platforms: ['tiktok', 'instagram', 'youtube'],
    region: 'us',
    volume: 2_840_000,
    saturation: 23,
    createdAt: '2026-04-14T00:00:00Z'
  },
  {
    id: 't2',
    signals: [mockSignals[1]],
    title: 'Functional Mushroom Beverages',
    category: 'Health & Nutrition',
    niche: 'Nootropics & Superfoods',
    audience: ['Health Conscious', 'Coffee Drinkers', 'Biohackers'],
    tags: ['mushroom', 'health', 'coffee', 'nootropics'],
    momentumScore: 74,
    growthRate: 220,
    peakEstimate: '2026-04-28',
    platforms: ['tiktok', 'youtube', 'instagram'],
    region: 'us',
    volume: 1_200_000,
    saturation: 31,
    createdAt: '2026-04-13T00:00:00Z'
  },
  {
    id: 't3',
    signals: [mockSignals[3]],
    title: 'Solopreneurs Replacing Agencies',
    category: 'Business & Finance',
    niche: 'Entrepreneurship & Freelancing',
    audience: ['Entrepreneurs', 'Freelancers', 'Business Owners'],
    tags: ['solopreneur', 'agency', 'business', 'freelance'],
    momentumScore: 92,
    growthRate: 480,
    peakEstimate: '2026-04-19',
    platforms: ['x', 'linkedin', 'youtube'],
    region: 'us',
    volume: 890_000,
    saturation: 18,
    createdAt: '2026-04-15T00:00:00Z'
  },
  {
    id: 't4',
    signals: [mockSignals[5]],
    title: 'Raw Milk Controversy Wave',
    category: 'Health & Nutrition',
    niche: 'Controversial Health Topics',
    audience: ['Health Skeptics', 'Homesteaders', 'Wellness Influencers'],
    tags: ['raw-milk', 'controversial', 'health', 'food'],
    momentumScore: 95,
    growthRate: 890,
    peakEstimate: '2026-04-17',
    platforms: ['tiktok', 'x'],
    region: 'us',
    volume: 3_200_000,
    saturation: 55,
    createdAt: '2026-04-15T00:00:00Z'
  },
  {
    id: 't5',
    signals: [mockSignals[6]],
    title: 'ADHD-First Productivity Systems',
    category: 'Productivity & Mental Health',
    niche: 'Neurodivergent Productivity',
    audience: ['ADHD Adults', 'Students', 'Remote Workers'],
    tags: ['adhd', 'productivity', 'neurodivergent', 'focus'],
    momentumScore: 68,
    growthRate: 65,
    peakEstimate: '2026-05-10',
    platforms: ['youtube', 'tiktok', 'instagram'],
    region: 'global',
    volume: 5_800_000,
    saturation: 44,
    createdAt: '2026-04-10T00:00:00Z'
  },
  {
    id: 't6',
    signals: [mockSignals[7]],
    title: 'Cinematic iPhone Filming',
    category: 'Content Creation',
    niche: 'Mobile Filmmaking',
    audience: ['Content Creators', 'Videographers', 'Social Media Creators'],
    tags: ['iphone', 'filmmaking', 'video', 'cinematic'],
    momentumScore: 81,
    growthRate: 310,
    peakEstimate: '2026-04-24',
    platforms: ['youtube', 'tiktok'],
    region: 'global',
    volume: 920_000,
    saturation: 27,
    createdAt: '2026-04-14T00:00:00Z'
  },
];

// === ANGLES ===
const mockAngles: Angle[] = [
  {
    id: 'a1', opportunityId: 'o1',
    hook: 'I tested 30 AI morning routines so you don\'t have to — here\'s the one that actually worked',
    format: 'short-video', platform: ['tiktok', 'instagram'], difficulty: 'easy',
    script: 'Hook → Show failed attempts → Reveal winner → Break down the system → CTA to follow',
    cta: 'Save this before your alarm goes off tomorrow',
    estimatedViews: 280_000, tone: 'educational'
  },
  {
    id: 'a2', opportunityId: 'o1',
    hook: 'The algorithm-optimized morning routine that top creators actually use (not the ones they show you)',
    format: 'carousel', platform: ['instagram'], difficulty: 'easy',
    script: 'Slide 1: Bold claim → Slides 2-7: Each routine element with science → Slide 8: Full schedule CTA',
    cta: 'Share with someone who hits snooze 5 times',
    estimatedViews: 95_000, tone: 'educational'
  },
  {
    id: 'a3', opportunityId: 'o1',
    hook: 'Hot take: AI morning routines are making people MORE anxious, not less',
    format: 'short-video', platform: ['tiktok', 'x'], difficulty: 'medium',
    script: 'Contrarian hook → Explain over-optimization trap → Offer balanced alternative → Call to discussion',
    cta: 'Drop your actual morning routine below',
    estimatedViews: 520_000, tone: 'controversial'
  },
];

// === OPPORTUNITIES ===
export const mockOpportunities: Opportunity[] = [
  {
    id: 'o1',
    trendId: 't1',
    trend: mockTrends[0],
    title: 'AI Morning Routine Optimizer',
    summary: 'Creators are building massive audiences by showing AI-curated morning routines. Saturation is still low (23%) with exponential search growth.',

    hook: "I let AI build my morning routine for 30 days — here's what it actually changed",
    whyThisWorks: 'Search volume spiked 340% this week as AI tools hit mainstream. Most creators are showing the tool, not the result — showing lived results is the unclaimed angle.',
    bestFormat: 'short-video',
    bestPlatform: 'tiktok',
    timing: { postWithin: 'Next 48 hours', peakIn: '6 days', urgencyLabel: 'Post today or tomorrow' },
    urgencyLevel: 'high',

    score: 87,
    window: 'open',
    saturation: 23,
    competitorCount: 142,
    estimatedReach: 340_000,
    difficulty: 'easy',
    angles: mockAngles,
    platforms: ['tiktok', 'instagram', 'youtube'],
    region: 'us',
    createdAt: '2026-04-16T06:00:00Z',
    expiresAt: '2026-04-22T00:00:00Z'
  },
  {
    id: 'o2',
    trendId: 't3',
    trend: mockTrends[2],
    title: 'Solopreneur vs Agency Angle',
    summary: 'The narrative that one person can out-execute a full agency is exploding across X and LinkedIn. Extremely low competition, high engagement signal.',

    hook: "I fired my agency and replaced them with 3 AI tools. Revenue went up 40%.",
    whyThisWorks: 'This narrative triggers agency owners AND freelancers — double the engagement surface. X and LinkedIn audiences are actively searching for validation of this belief.',
    bestFormat: 'thread',
    bestPlatform: 'x',
    timing: { postWithin: 'Today', peakIn: '3 days', urgencyLabel: 'Act today — window closes April 19' },
    urgencyLevel: 'critical',

    score: 92,
    window: 'open',
    saturation: 18,
    competitorCount: 67,
    estimatedReach: 180_000,
    difficulty: 'medium',
    angles: mockAngles.slice(0, 2),
    platforms: ['x', 'linkedin', 'youtube'],
    region: 'us',
    createdAt: '2026-04-16T05:00:00Z',
    expiresAt: '2026-04-19T00:00:00Z'
  },
  {
    id: 'o3',
    trendId: 't6',
    trend: mockTrends[5],
    title: 'Cinematic iPhone B-Roll Secrets',
    summary: 'iPhone filmmaking technique searches surging 310%/week. Tutorial content is beating studio-quality videos 3:1 in this niche.',

    hook: "5 iPhone B-roll shots that make your videos look $10,000 better (free)",
    whyThisWorks: 'Every creator wants better video but few can afford gear — this hook removes the barrier. The word "free" in mobile filming context is performing 2.4x higher CTR right now.',
    bestFormat: 'short-video',
    bestPlatform: 'youtube',
    timing: { postWithin: 'Next 3 days', peakIn: '8 days', urgencyLabel: 'Post this week' },
    urgencyLevel: 'high',

    score: 81,
    window: 'open',
    saturation: 27,
    competitorCount: 201,
    estimatedReach: 210_000,
    difficulty: 'easy',
    angles: mockAngles.slice(0, 2),
    platforms: ['youtube', 'tiktok'],
    region: 'global',
    createdAt: '2026-04-16T04:00:00Z',
    expiresAt: '2026-04-24T00:00:00Z'
  },
  {
    id: 'o4',
    trendId: 't2',
    trend: mockTrends[1],
    title: 'Mushroom Coffee vs Regular Coffee',
    summary: 'The "coffee replacement" narrative is performing 4x better than health-claim framing. Biohacker + coffee drinker crossover is the sweet spot.',

    hook: "I switched from coffee to mushroom drinks for 30 days. Here's what nobody tells you.",
    whyThisWorks: 'The "I tried X for 30 days" format is at peak algorithmic favor this week. Mushroom coffee specifically has no dominant creator in the honest-review angle yet.',
    bestFormat: 'reel',
    bestPlatform: 'instagram',
    timing: { postWithin: 'Next 5 days', peakIn: '12 days', urgencyLabel: 'Wide-open window' },
    urgencyLevel: 'medium',

    score: 74,
    window: 'open',
    saturation: 31,
    competitorCount: 289,
    estimatedReach: 140_000,
    difficulty: 'easy',
    angles: mockAngles.slice(1, 3),
    platforms: ['tiktok', 'youtube', 'instagram'],
    region: 'us',
    createdAt: '2026-04-16T03:00:00Z',
    expiresAt: '2026-04-28T00:00:00Z'
  },
  {
    id: 'o5',
    trendId: 't4',
    trend: mockTrends[3],
    title: 'Raw Milk — Science Response',
    summary: 'Controversy at peak velocity but high saturation. Only open angle is science-based or "nuanced take" — not advocacy. Must post in the next 24h.',

    hook: "The raw milk debate is actually about something deeper than milk.",
    whyThisWorks: 'Meta-commentary on viral controversies consistently outperforms direct takes. This angle isn\'t about milk — it\'s about why people distrust institutions, which is a universal hook.',
    bestFormat: 'short-video',
    bestPlatform: 'tiktok',
    timing: { postWithin: 'Today only', peakIn: '1 day', urgencyLabel: 'Post in the next 24h or miss it' },
    urgencyLevel: 'critical',

    score: 61,
    window: 'closing',
    saturation: 55,
    competitorCount: 1840,
    estimatedReach: 890_000,
    difficulty: 'hard',
    angles: mockAngles.slice(2, 3),
    platforms: ['tiktok', 'x'],
    region: 'us',
    createdAt: '2026-04-15T00:00:00Z',
    expiresAt: '2026-04-17T00:00:00Z'
  },
  {
    id: 'o6',
    trendId: 't5',
    trend: mockTrends[4],
    title: 'ADHD Productivity — Honest Review',
    summary: '"What actually works for ADHD brains" review format is underserved and outperforming generic productivity content 3:1. Evergreen signal with growing audience.',

    hook: "I have ADHD and tried every productivity system. Only 2 actually worked.",
    whyThisWorks: 'ADHD content creators are the fastest-growing niche on YouTube. The "I tried everything" format builds instant parasocial trust with an audience desperate for someone who gets it.',
    bestFormat: 'long-video',
    bestPlatform: 'youtube',
    timing: { postWithin: 'This week', peakIn: '24 days', urgencyLabel: 'Wide open — take your time' },
    urgencyLevel: 'medium',

    score: 68,
    window: 'open',
    saturation: 44,
    competitorCount: 612,
    estimatedReach: 95_000,
    difficulty: 'medium',
    angles: mockAngles.slice(0, 2),
    platforms: ['youtube', 'tiktok'],
    region: 'global',
    createdAt: '2026-04-16T02:00:00Z',
    expiresAt: '2026-05-10T00:00:00Z'
  },
];

// === AGENT INSIGHTS ===
export const mockAgentInsights: AgentInsight[] = [
  {
    id: 'ai1', agent: 'Signal Scout',
    message: 'Detected 3 new high-velocity signals in US Wellness niche. Volume spike of 340% in past 6 hours.',
    type: 'spike', timestamp: '2026-04-16T06:45:00Z', priority: 'high'
  },
  {
    id: 'ai2', agent: 'Opportunity Strategist',
    message: '"Solopreneur vs Agency" opportunity window closing in ~72 hours. Estimated saturation crossing 40% by April 19.',
    type: 'warning', timestamp: '2026-04-16T06:30:00Z', priority: 'high'
  },
  {
    id: 'ai3', agent: 'Trend Classifier',
    message: 'Mobile Filmmaking and Content Creation niches showing unusual cross-platform correlation. YouTube → TikTok pipeline forming.',
    type: 'discovery', timestamp: '2026-04-16T06:15:00Z', priority: 'medium'
  },
  {
    id: 'ai4', agent: 'Momentum Analyst',
    message: 'Raw Milk controversy approaching peak saturation. Recommend pivoting to science-based response angle within 24h.',
    type: 'warning', timestamp: '2026-04-16T06:00:00Z', priority: 'high'
  },
  {
    id: 'ai5', agent: 'Daily Brief Agent',
    message: 'Today\'s signal quality score: 91/100. 6 open opportunities detected across 4 niches.',
    type: 'info', timestamp: '2026-04-16T06:00:00Z', priority: 'low'
  },
  {
    id: 'ai6', agent: 'Platform Formatter',
    message: 'TikTok algorithm favoring 47-60 second videos in Health niche this week. Format recommendations updated.',
    type: 'discovery', timestamp: '2026-04-16T05:45:00Z', priority: 'medium'
  },
];

// === DAILY BRIEF ===
export const mockDailyBrief: DailyBrief = {
  date: '2026-04-16',
  region: 'us',
  signalScore: 91,
  topOpportunities: mockOpportunities.slice(0, 3),
  agentInsights: mockAgentInsights,
  trendingNiches: ['AI & Wellness', 'Entrepreneurship', 'Mobile Content Creation', 'ADHD Productivity', 'Health Controversies'],
  alertCount: 4
};

// === WATCH ITEMS ===
export const mockWatchItems: WatchItem[] = [
  {
    id: 'w1', topic: 'AI Wellness Tools', niche: 'Wellness & Biohacking',
    platforms: ['tiktok', 'instagram'], region: 'us', alertThreshold: 200,
    currentScore: 87,
    history: generateMomentumData(14, 87, 12).map(d => ({ date: d.date, score: d.score })),
    isActive: true, createdAt: '2026-04-01T00:00:00Z'
  },
  {
    id: 'w2', topic: 'Solopreneur Economy', niche: 'Entrepreneurship',
    platforms: ['x', 'linkedin'], region: 'us', alertThreshold: 300,
    currentScore: 92,
    history: generateMomentumData(14, 92, 18).map(d => ({ date: d.date, score: d.score })),
    isActive: true, createdAt: '2026-04-05T00:00:00Z'
  },
  {
    id: 'w3', topic: 'ADHD Productivity', niche: 'Productivity & Mental Health',
    platforms: ['youtube', 'tiktok'], region: 'global', alertThreshold: 100,
    currentScore: 68,
    history: generateMomentumData(14, 68, 8).map(d => ({ date: d.date, score: d.score })),
    isActive: true, createdAt: '2026-04-08T00:00:00Z'
  },
  {
    id: 'w4', topic: 'Functional Mushrooms', niche: 'Health & Nutrition',
    platforms: ['tiktok', 'youtube'], region: 'us', alertThreshold: 150,
    currentScore: 74,
    history: generateMomentumData(14, 74, 10).map(d => ({ date: d.date, score: d.score })),
    isActive: false, createdAt: '2026-04-10T00:00:00Z'
  },
];

// === CONTENT ITEMS ===
export const mockContentItems: ContentItem[] = [
  {
    id: 'c1', title: 'AI Morning Routine — 30 Tests',
    hook: 'I tested 30 AI morning routines so you don\'t have to',
    platform: 'tiktok', format: 'short-video',
    scheduledFor: '2026-04-17T09:00:00Z', status: 'scheduled',
    opportunityId: 'o1', tags: ['ai', 'wellness', 'morning']
  },
  {
    id: 'c2', title: 'Solopreneur vs Agency — Thread',
    hook: 'How one person is out-executing 10-person agencies in 2026',
    platform: 'x', format: 'thread',
    scheduledFor: '2026-04-17T14:00:00Z', status: 'draft',
    opportunityId: 'o2', tags: ['solopreneur', 'agency', 'business']
  },
  {
    id: 'c3', title: 'Cinematic iPhone B-Roll Tutorial',
    hook: 'The 5 B-roll shots that made my video go viral (iPhone only)',
    platform: 'youtube', format: 'long-video',
    scheduledFor: '2026-04-18T12:00:00Z', status: 'draft',
    opportunityId: 'o3', tags: ['iphone', 'filmmaking', 'tutorial']
  },
  {
    id: 'c4', title: 'Mushroom Coffee Challenge',
    hook: 'I replaced my coffee with mushroom drinks for 30 days — here\'s what happened',
    platform: 'instagram', format: 'reel',
    scheduledFor: '2026-04-19T10:00:00Z', status: 'scheduled',
    opportunityId: 'o4', tags: ['mushroom', 'health', 'coffee']
  },
  {
    id: 'c5', title: 'ADHD Focus System Review',
    hook: 'The only productivity system that actually works for ADHD brains',
    platform: 'youtube', format: 'long-video',
    scheduledFor: '2026-04-21T15:00:00Z', status: 'draft',
    opportunityId: 'o6', tags: ['adhd', 'productivity', 'focus']
  },
];

// === PULSE ALERTS ===
export const mockAlerts: PulseAlert[] = [
  {
    id: 'pa1', type: 'spike',
    title: 'Velocity Spike: AI Morning Routines',
    message: 'Search volume up 340% in past 6 hours. Window is wide open.',
    priority: 'critical', isRead: false,
    timestamp: '2026-04-16T06:45:00Z', linkedOpportunityId: 'o1'
  },
  {
    id: 'pa2', type: 'window-closing',
    title: 'Window Closing: Solopreneur vs Agency',
    message: 'Opportunity window closes in ~72h. Saturation crossing 40% threshold.',
    priority: 'high', isRead: false,
    timestamp: '2026-04-16T06:30:00Z', linkedOpportunityId: 'o2'
  },
  {
    id: 'pa3', type: 'new-opportunity',
    title: 'New Opportunity Detected',
    message: 'B-Roll iPhone Technique showing 310% weekly velocity. Score: 81/100.',
    priority: 'high', isRead: false,
    timestamp: '2026-04-16T06:15:00Z', linkedOpportunityId: 'o3'
  },
  {
    id: 'pa4', type: 'brief-ready',
    title: 'Daily Brief Ready',
    message: 'Today\'s signal quality: 91/100. 6 opportunities detected.',
    priority: 'medium', isRead: true,
    timestamp: '2026-04-16T06:00:00Z'
  },
  {
    id: 'pa5', type: 'threshold-hit',
    title: 'Watch Alert: Solopreneur Economy',
    message: 'Velocity crossed your 300% alert threshold.',
    priority: 'high', isRead: true,
    timestamp: '2026-04-16T05:30:00Z', linkedOpportunityId: 'o2'
  },
];

// === STAT HELPERS ===
export const formatVolume = (v: number): string => {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
  return v.toString();
};

export const formatVelocity = (v: number): string => `+${v}%/wk`;

export const getWindowColor = (w: string): string => {
  switch (w) {
    case 'open': return '#00FF9D';
    case 'closing': return '#FFB340';
    case 'closed': return '#FF4D6A';
    case 'emerging': return '#00D4FF';
    default: return '#8888AA';
  }
};

export const getPlatformLabel = (p: Platform): string => {
  const labels: Record<Platform, string> = {
    tiktok: 'TikTok', instagram: 'Instagram', youtube: 'YouTube',
    x: 'X (Twitter)', linkedin: 'LinkedIn'
  };
  return labels[p];
};

export const scoreToGrade = (score: number): string => {
  if (score >= 90) return 'S';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'D';
};
