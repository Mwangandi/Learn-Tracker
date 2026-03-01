import React from 'react'
import type { StatusKey } from '@/types'

const STATUS_STYLES: Record<StatusKey, { color: string; bg: string; label: string }> = {
  'To Do':       { color: 'var(--text-dim)', bg: 'rgba(100,116,139,0.12)', label: '⬜ To Do' },
  'In Progress': { color: 'var(--yellow)',   bg: 'var(--yellow-bg)',        label: '🔄 In Progress' },
  'Complete':    { color: 'var(--accent)',   bg: 'var(--accent-bg)',        label: '✅ Complete' },
  'Blocked':     { color: 'var(--red)',      bg: 'var(--red-bg)',           label: '🔴 Blocked' },
}

interface Props { value: StatusKey; onChange: (v: StatusKey) => void; compact?: boolean }

const SelectStatus: React.FC<Props> = ({ value, onChange, compact }) => {
  const s = STATUS_STYLES[value]
  return (
    <select value={value} onChange={e => onChange(e.target.value as StatusKey)} style={{
      background: s.bg, border: `1px solid ${s.color}44`,
      color: s.color, borderRadius: 8,
      padding: compact ? '4px 8px' : '6px 12px',
      fontSize: compact ? 11 : 12,
      fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
      cursor: 'pointer', width: '100%',
    }}>
      {(Object.keys(STATUS_STYLES) as StatusKey[]).map(k => (
        <option key={k} value={k}>{STATUS_STYLES[k].label}</option>
      ))}
    </select>
  )
}
export default SelectStatus
export { STATUS_STYLES }
