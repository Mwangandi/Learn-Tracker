import React from 'react'

interface Props { children: React.ReactNode; color?: string; bg?: string }

const Badge: React.FC<Props> = ({ children, color = 'var(--accent)', bg = 'var(--accent-bg)' }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 10px', borderRadius: 99, fontSize: 11,
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: '0.02em',
    color, background: bg, border: `1px solid ${color}33`,
  }}>{children}</span>
)
export default Badge
