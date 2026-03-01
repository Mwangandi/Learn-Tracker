import React from 'react'

interface Props {
  value: number; max?: number; color?: string
  height?: number; animated?: boolean; delay?: number
}

const ProgressBar: React.FC<Props> = ({
  value, max = 100, color = 'var(--accent)',
  height = 6, animated = true, delay = 0,
}) => {
  const w = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100))
  return (
    <div style={{ background: 'var(--border)', borderRadius: 99, height, overflow: 'hidden', width: '100%' }}>
      <div style={{
        height: '100%', width: `${w}%`, borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        boxShadow: `0 0 8px ${color}55`,
        transition: animated ? `width 0.9s cubic-bezier(.22,1,.36,1) ${delay}ms` : 'none',
      }} />
    </div>
  )
}
export default ProgressBar
