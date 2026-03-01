import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import { STATUS_STYLES } from '@/components/SelectStatus'
import ProgressBar from '@/components/ProgressBar'

const DayPlanner: React.FC = () => {
  const { projectDays, projectWeeks, projectMonths, activeProject, updateDay, projectMeta } = useProject()
  const [expandedWeek, setExpandedWeek] = useState<number>(1)
  const [expandedMonth, setExpandedMonth] = useState<number>(1)
  const accent = projectMeta.accent

  const MONTH_COLORS = ['#10b981', '#f97316', '#a855f7']

  const taStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
    color: 'var(--text)', borderRadius: 6, padding: '6px 8px',
    fontSize: 11, fontFamily: "'DM Sans', sans-serif", resize: 'none', lineHeight: 1.5,
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600,
    color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em',
    display: 'block', marginBottom: 3,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', padding: '10px 14px', background: `${accent}0f`, borderRadius: 10, border: `1px solid ${accent}22` }}>
        ✏️ Edit the tasks, focus area, and deliverable for each day. Expand a month to see its weeks, then expand a week to see all 5 days.
      </div>

      {[1, 2, 3].map(mo => {
        const mPlan  = projectMonths.find(m => m.monthNumber === mo)
        const mColor = MONTH_COLORS[mo - 1]
        const mDays  = projectDays.filter(d => d.month === mo)
        const done   = mDays.filter(d => d.status === 'Complete').length
        const isMonthOpen = expandedMonth === mo

        return (
          <div key={mo} style={{ background: 'var(--card)', border: `1px solid ${isMonthOpen ? mColor + '55' : 'var(--border)'}`, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {/* Month row */}
            <div onClick={() => setExpandedMonth(isMonthOpen ? 0 : mo)} style={{
              padding: '12px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
              background: isMonthOpen ? `${mColor}0c` : 'transparent',
            }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: mColor, minWidth: 60 }}>Month {mo}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)', flex: 1 }}>{mPlan?.title ?? ''}</div>
              <div style={{ width: 80 }}><ProgressBar value={done} max={mDays.length} color={mColor} height={3} animated={false} /></div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)', minWidth: 30 }}>{done}/{mDays.length}</div>
              <span style={{ color: 'var(--text-dim)', fontSize: 10 }}>{isMonthOpen ? '▲' : '▼'}</span>
            </div>

            {isMonthOpen && (
              <div style={{ padding: '0 16px 16px' }}>
                {[1, 2, 3, 4].map(wkOffset => {
                  const wkNum = (mo - 1) * 4 + wkOffset
                  const wPlan = projectWeeks.find(w => w.weekNumber === wkNum)
                  const wDays = projectDays.filter(d => d.week === wkNum)
                  const wDone = wDays.filter(d => d.status === 'Complete').length
                  const isWkOpen = expandedWeek === wkNum

                  return (
                    <div key={wkNum} style={{
                      background: 'var(--surface)', borderRadius: 12, marginBottom: 8, overflow: 'hidden',
                      border: `1px solid ${isWkOpen ? accent + '44' : 'var(--border)'}`,
                    }}>
                      {/* Week row */}
                      <div onClick={() => setExpandedWeek(isWkOpen ? 0 : wkNum)} style={{
                        padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                        background: isWkOpen ? projectMeta.accentBg : 'transparent',
                      }}>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: accent, background: `${accent}18`, padding: '2px 7px', borderRadius: 5, border: `1px solid ${accent}33` }}>
                          W{wkNum}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)', flex: 1 }}>{wPlan?.goal ?? `Week ${wkNum}`}</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)' }}>{wDone}/5</div>
                        <span style={{ color: 'var(--text-dim)', fontSize: 10 }}>{isWkOpen ? '▲' : '▼'}</span>
                      </div>

                      {isWkOpen && (
                        <div style={{ padding: '0 14px 14px' }}>
                          {wDays.map((d, di) => {
                            const st = STATUS_STYLES[d.status]
                            return (
                              <div key={d.id} style={{
                                background: 'var(--card)', borderRadius: 10, padding: '12px 14px',
                                marginBottom: di < wDays.length - 1 ? 8 : 0,
                                border: '1px solid var(--border)',
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)' }}>D{d.dayNumber}</div>
                                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)', minWidth: 24 }}>{d.dayName}</div>
                                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: st.color }} />
                                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: st.color, fontWeight: 600 }}>{d.status}</div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                                  <div>
                                    <label style={labelStyle}>Focus Area</label>
                                    <input value={d.focusArea} onChange={e => updateDay(activeProject, d.id, { focusArea: e.target.value })}
                                      style={{ ...taStyle, resize: 'none' }} placeholder="Focus…" />
                                  </div>
                                  <div>
                                    <label style={labelStyle}>Tasks</label>
                                    <textarea rows={2} value={d.tasks} onChange={e => updateDay(activeProject, d.id, { tasks: e.target.value })}
                                      style={taStyle} placeholder="What to do today…" />
                                  </div>
                                  <div>
                                    <label style={labelStyle}>Deliverable</label>
                                    <textarea rows={2} value={d.deliverable} onChange={e => updateDay(activeProject, d.id, { deliverable: e.target.value })}
                                      style={taStyle} placeholder="Output / artifact…" />
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
            )}
          </div>
        )
      })}
    </div>
  )
}
export default DayPlanner
