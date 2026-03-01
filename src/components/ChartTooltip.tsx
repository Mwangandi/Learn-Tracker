import React from 'react'
import type { TooltipProps } from 'recharts'

const ChartTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '10px 14px',
      fontFamily: "'DM Sans', sans-serif", boxShadow: 'var(--shadow)',
    }}>
      <div style={{ color: 'var(--text-mid)', fontSize: 11, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontSize: 12, fontWeight: 600 }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  )
}
export default ChartTooltip
