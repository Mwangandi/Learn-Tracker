import React from 'react'
import { useProject } from '@/contexts/ProjectContext'
import Card from '@/components/Card'

const QuarterPlanner: React.FC = () => {
  const { projectQuarters, activeProject, updateQuarter, projectMeta } = useProject()
  const accent = projectMeta.accent
  const taStyle: React.CSSProperties = { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, padding: '10px 12px', fontSize: 13, fontFamily: "'DM Sans', sans-serif", resize: 'vertical', lineHeight: 1.6 }
  const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', padding: '12px 16px', background: `${accent}0f`, borderRadius: 10, border: `1px solid ${accent}22` }}>
        💡 Define your high-level quarterly goal, what success looks like, and key metrics. This feeds into your monthly and weekly breakdowns.
      </div>
      {projectQuarters.map(q => (
        <Card key={q.id} style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {projectMeta.emoji}
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: accent }}>Q{q.quarterNumber}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-dim)' }}>12 weeks · 60 days · 3 months</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={labelStyle}>Quarter Title</label>
              <input value={q.title} onChange={e => updateQuarter(activeProject, q.id, { title: e.target.value })}
                style={{ ...taStyle, resize: 'none' }} placeholder="e.g. Q1 Zoho One Mastery" />
            </div>
            <div />
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Quarter Objective</label>
              <textarea rows={3} value={q.objective} onChange={e => updateQuarter(activeProject, q.id, { objective: e.target.value })}
                style={taStyle} placeholder="What is the main goal of this quarter? What will you be able to do when it's done?" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Success Metrics</label>
              <textarea rows={3} value={q.successMetrics} onChange={e => updateQuarter(activeProject, q.id, { successMetrics: e.target.value })}
                style={taStyle} placeholder="How will you measure success? e.g. pass certification, build 3 demo systems, implement for a client…" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
export default QuarterPlanner
