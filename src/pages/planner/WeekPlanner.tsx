import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import ProgressBar from '@/components/ProgressBar'

const MONTH_COLORS = ['#10b981', '#f97316', '#a855f7']

const WeekPlanner: React.FC = () => {
  const { projectWeeks, projectDays, projectMonths, activeProject, updateWeek, projectMeta } = useProject()
  const [expandedMonth, setExpandedMonth] = useState<number>(1)
  const accent = projectMeta.accent

  const taStyle: React.CSSProperties = { width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: 8, padding: '7px 10px', fontSize: 12, fontFamily: "'DM Sans', sans-serif", resize: 'none', lineHeight: 1.5 }
  const labelStyle: React.CSSProperties = { fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'block', marginBottom: 4 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1, 2, 3].map(mo => {
        const mPlan = projectMonths.find(m => m.monthNumber === mo)
        const mColor = MONTH_COLORS[mo - 1]
        const weeksInMonth = projectWeeks.filter(w => w.month === mo)
        const isOpen = expandedMonth === mo

        return (
          <div key={mo} style={{ background: 'var(--card)', border: `1px solid ${isOpen ? mColor + '55' : 'var(--border)'}`, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {/* Month header */}
            <div onClick={() => setExpandedMonth(isOpen ? 0 : mo)} style={{
              padding: '14px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: isOpen ? `${mColor}0c` : 'transparent',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${mColor}20`, border: `1px solid ${mColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: mColor }}>
                  M{mo}
                </div>
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: mColor }}>{mPlan?.title ?? `Month ${mo}`}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)' }}>Weeks {(mo - 1) * 4 + 1}–{mo * 4}</div>
                </div>
              </div>
              <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
              <div style={{ padding: '0 20px 20px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
                {weeksInMonth.map(w => {
                  const wDays = projectDays.filter(d => d.week === w.weekNumber)
                  const done  = wDays.filter(d => d.status === 'Complete').length
                  return (
                    <div key={w.id} style={{ background: 'var(--surface)', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: accent, background: projectMeta.accentBg, padding: '2px 8px', borderRadius: 5, border: `1px solid ${accent}33` }}>
                          W{w.weekNumber}
                        </div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)' }}>{done}/5</div>
                      </div>
                      <ProgressBar value={done} max={5} color={mColor} height={3} animated={false} />
                      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div>
                          <label style={labelStyle}>Week Goal</label>
                          <input value={w.goal} onChange={e => updateWeek(activeProject, w.id, { goal: e.target.value })}
                            style={{ ...taStyle }} placeholder="e.g. Master CRM workflows" />
                        </div>
                        <div>
                          <label style={labelStyle}>Focus Area</label>
                          <input value={w.focusArea} onChange={e => updateWeek(activeProject, w.id, { focusArea: e.target.value })}
                            style={{ ...taStyle }} placeholder="e.g. CRM, Dart, DocTypes" />
                        </div>
                        <div>
                          <label style={labelStyle}>Notes</label>
                          <textarea rows={2} value={w.notes} onChange={e => updateWeek(activeProject, w.id, { notes: e.target.value })}
                            style={{ ...taStyle, resize: 'vertical' }} placeholder="Any week notes…" />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default WeekPlanner
