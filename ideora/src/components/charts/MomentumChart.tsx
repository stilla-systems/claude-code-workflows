'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { MomentumDataPoint } from '@/types';

interface MomentumChartProps {
  data: MomentumDataPoint[];
  height?: number;
  showAxes?: boolean;
  color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-default)',
      borderRadius: '8px',
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
    }}>
      <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>
        {payload[0]?.value}
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px' }}>score</span>
      </p>
      {payload[1] && (
        <p style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
          +{payload[1]?.value}%/wk velocity
        </p>
      )}
    </div>
  );
}

export function MomentumChart({
  data,
  height = 200,
  showAxes = false,
  color = 'var(--brand-core)',
}: MomentumChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="momentumGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C47FF" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#6C47FF" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {showAxes && (
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        )}
        {showAxes && (
          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
        )}
        {showAxes && (
          <YAxis
            tick={{ fill: 'var(--text-tertiary)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
        )}
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(108,71,255,0.3)', strokeWidth: 1 }} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#6C47FF"
          strokeWidth={2}
          fill="url(#momentumGrad)"
          dot={false}
          activeDot={{ r: 4, fill: '#8B6FFF', stroke: '#6C47FF', strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="velocity"
          stroke="#00D4FF"
          strokeWidth={1.5}
          fill="url(#velocityGrad)"
          dot={false}
          activeDot={{ r: 3, fill: '#00D4FF' }}
          strokeOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
