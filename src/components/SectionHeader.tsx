import React from 'react'

interface Props { title: string; subtitle?: string }

const SectionHeader: React.FC<Props> = ({ title, subtitle }) => (
  <div style={{ marginBottom: 28 }}>
    <h1 style={{
      fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800,
      color: 'var(--text)', lineHeight: 1, marginBottom: 4,
    }}>{title}</h1>
    {subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)' }}>{subtitle}</p>}
  </div>
)
export default SectionHeader
