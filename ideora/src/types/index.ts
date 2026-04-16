// ============================================================
// IDEORA — Core Type Definitions
// ============================================================

export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'x' | 'linkedin';
export type Region = 'global' | 'us' | 'uk' | 'eu' | 'apac' | 'latam' | 'mena';
export type WindowStatus = 'open' | 'closing' | 'closed' | 'emerging';
export type SignalStrength = 'strong' | 'moderate' | 'weak';
export type AgentStatus = 'running' | 'complete' | 'idle' | 'error';
export type ContentFormat = 'short-video' | 'long-video' | 'post' | 'story' | 'thread' | 'reel' | 'carousel';

// === SIGNAL ===
export interface Signal {
  id: string;
  topic: string;
  region: Region;
  platforms: Platform[];
  volume: number;         // Raw search/mention volume
  velocity: number;       // Growth rate % per day
  sentiment: number;      // -1 to 1
  timestamp: string;
  strength: SignalStrength;
  tags: string[];
  category: string;
}

// === TREND ===
export interface Trend {
  id: string;
  signals: Signal[];
  title: string;
  category: string;
  niche: string;
  audience: string[];
  tags: string[];
  momentumScore: number;  // 0-100
  growthRate: number;     // % per week
  peakEstimate: string;   // ISO date
  platforms: Platform[];
  region: Region;
  volume: number;
  saturation: number;     // 0-100 (0=wide open, 100=totally saturated)
  createdAt: string;
}

// === OPPORTUNITY ===
export interface Opportunity {
  id: string;
  trendId: string;
  trend: Trend;
  title: string;
  summary: string;
  score: number;          // 0-100 overall opportunity score
  window: WindowStatus;
  saturation: number;     // 0-100
  competitorCount: number;
  estimatedReach: number;
  difficulty: 'easy' | 'medium' | 'hard';
  angles: Angle[];
  platforms: Platform[];
  region: Region;
  createdAt: string;
  expiresAt: string;
}

// === ANGLE ===
export interface Angle {
  id: string;
  opportunityId: string;
  hook: string;
  format: ContentFormat;
  platform: Platform[];
  script: string;
  cta: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedViews: number;
  tone: 'educational' | 'entertaining' | 'controversial' | 'inspirational' | 'news';
}

// === DAILY BRIEF ===
export interface DailyBrief {
  date: string;
  region: Region;
  signalScore: number;      // 0-100 today's overall signal quality
  topOpportunities: Opportunity[];
  agentInsights: AgentInsight[];
  trendingNiches: string[];
  alertCount: number;
}

// === AGENT INSIGHT ===
export interface AgentInsight {
  id: string;
  agent: string;
  message: string;
  type: 'discovery' | 'warning' | 'spike' | 'opportunity' | 'info';
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

// === WATCH ITEM ===
export interface WatchItem {
  id: string;
  topic: string;
  niche: string;
  platforms: Platform[];
  region: Region;
  alertThreshold: number;   // velocity %
  currentScore: number;
  history: { date: string; score: number }[];
  isActive: boolean;
  createdAt: string;
}

// === CONTENT ITEM (Planner) ===
export interface ContentItem {
  id: string;
  title: string;
  hook: string;
  platform: Platform;
  format: ContentFormat;
  scheduledFor: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  opportunityId?: string;
  tags: string[];
}

// === ALERT ===
export interface PulseAlert {
  id: string;
  type: 'spike' | 'window-closing' | 'new-opportunity' | 'brief-ready' | 'threshold-hit';
  title: string;
  message: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  isRead: boolean;
  timestamp: string;
  linkedOpportunityId?: string;
}

// === MOMENTUM CHART DATA ===
export interface MomentumDataPoint {
  date: string;
  score: number;
  volume: number;
  velocity: number;
}

// === USER PREFERENCES ===
export interface UserPreferences {
  region: Region;
  niches: string[];
  platforms: Platform[];
  watchedTopics: string[];
}
