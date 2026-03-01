import React from 'react'

interface Props { label: string; value: number | string; sub?: string; color: string; icon: string; delay?: number }

const KPICard: React.FC<Props> = ({ label, value, sub, color, icon, delay = 0 }) => (
  <div className="fade-up" style={{
    animationDelay: `${delay}ms`,
    background: 'linear-gradient(135deg, var(--card) 0%, var(--card-hi) 100%)',
    border: '1px solid var(--border)', borderRadius: 16, padding: '20px 24px',
    position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
  }}>
    <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80,
      background: `radial-gradient(circle at top right, ${color}22, transparent 70%)` }} />
    <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 34, fontWeight: 600, color, lineHeight: 1, marginBottom: 4 }}>
      {value}
    </div>
    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-mid)', fontWeight: 500 }}>{label}</div>
    {sub && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>{sub}</div>}
  </div>
)
export default KPICard
