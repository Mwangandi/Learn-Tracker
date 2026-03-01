import React from 'react'
import { useProject } from '@/contexts/ProjectContext'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'

const MonthPlanner: React.FC = () => {
  const { projectMonths, projectDays, activeProject, updateMonth, projectMeta } = useProject()
  const taStyle: React.CSSProperties = { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, padding: '8px 12px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", resize: 'vertical', lineHeight: 1.6 }
  const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 5 }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
      {projectMonths.map((m, mi) => {
        const mDays = projectDays.filter(d => d.month === m.monthNumber)
        const done  = mDays.filter(d => d.status === 'Complete').length
        const pctM  = mDays.length ? Math.round(done / mDays.length * 100) : 0

        return (
          <Card key={m.id} style={{ padding: 22 }}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${m.color}18, ${m.color}06)`, borderRadius: 12, padding: '14px 16px', marginBottom: 20, border: `1px solid ${m.color}22` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: m.color }}>Month {m.monthNumber}</div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 700, color: m.color }}>{pctM}%</div>
              </div>
              <ProgressBar value={done} max={mDays.length} color={m.color} height={4} animated={false} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)', marginTop: 4 }}>{done}/{mDays.length} days complete</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Month Title</label>
                <input value={m.title} onChange={e => updateMonth(activeProject, m.id, { title: e.target.value })}
                  style={{ ...taStyle, resize: 'none' }} placeholder={`Month ${m.monthNumber} focus…`} />
              </div>
              <div>
                <label style={labelStyle}>Objective</label>
                <textarea rows={2} value={m.objective} onChange={e => updateMonth(activeProject, m.id, { objective: e.target.value })}
                  style={taStyle} placeholder="What will you accomplish this month?" />
              </div>
              <div>
                <label style={labelStyle}>Key Milestones</label>
                <textarea rows={3} value={m.keyMilestones} onChange={e => updateMonth(activeProject, m.id, { keyMilestones: e.target.value })}
                  style={taStyle} placeholder={'• Milestone 1\n• Milestone 2\n• Milestone 3'} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
export default MonthPlanner
