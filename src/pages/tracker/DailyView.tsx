import React, { useState } from 'react'
import type { DayPlan } from '@/types'
import { useProject } from '@/contexts/ProjectContext'
import { STATUS_STYLES } from '@/components/SelectStatus'
import Card from '@/components/Card'
import Badge from '@/components/Badge'
import SelectStatus from '@/components/SelectStatus'
import SectionHeader from '@/components/SectionHeader'

const DailyView: React.FC = () => {
  const { projectDays, projectWeeks, activeProject, updateDay, projectMeta } = useProject()
  const [selected, setSelected] = useState(projectDays[0]?.id ?? '')
  const day = projectDays.find(d => d.id === selected)
  const accent = projectMeta.accent

  const update = (field: keyof DayPlan, value: string) => {
    if (day) updateDay(activeProject, day.id, { [field]: value } as Partial<DayPlan>)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--surface)',
    border: '1px solid var(--border)', color: 'var(--text)',
    borderRadius: 8, padding: '7px 10px', fontSize: 12,
    fontFamily: "'DM Sans', sans-serif",
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)',
    fontWeight: 600, display: 'block', marginBottom: 5,
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader title="Daily Tracker" subtitle="Click a day to log your progress" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
        {/* Grid */}
        <div>
          {Array.from({ length: 12 }, (_, wi) => {
            const wk = wi + 1
            const wkDays = projectDays.filter(d => d.week === wk)
            const weekPlan = projectWeeks.find(w => w.weekNumber === wk)
            const focusColor = accent
            return (
              <div key={wk} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700,
                    color: focusColor, background: projectMeta.accentBg,
                    padding: '3px 10px', borderRadius: 6, border: `1px solid ${focusColor}33`,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>W{wk}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)' }}>
                    {weekPlan?.goal ?? `Week ${wk}`}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: focusColor }}>
                    {wkDays.filter(d => d.status === 'Complete').length}/5
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
                  {wkDays.map(d => {
                    const st = STATUS_STYLES[d.status]
                    const isSelected = d.id === selected
                    return (
                      <div key={d.id} className="day-card" onClick={() => setSelected(d.id)} style={{
                        background: isSelected ? projectMeta.accentBg : 'var(--card)',
                        border: `1px solid ${isSelected ? focusColor : 'var(--border)'}`,
                        borderRadius: 10, padding: '10px 12px', cursor: 'pointer',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: 'var(--text-dim)' }}>D{d.dayNumber}</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'var(--text-dim)' }}>{d.dayName}</span>
                        </div>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: st.color, boxShadow: d.status !== 'To Do' ? `0 0 5px ${st.color}` : 'none' }} />
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: st.color, fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {d.status}
                        </div>
                        {d.hours && <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: 'var(--text-dim)', marginTop: 2 }}>{d.hours}h</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        {day && (
          <div style={{ position: 'sticky', top: 32 }}>
            <Card style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)', marginBottom: 3 }}>
                    Week {day.week} · Day {day.dayNumber} · {day.dayName}
                  </div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>
                    Day {day.dayNumber}
                  </div>
                </div>
                <Badge color={accent} bg={projectMeta.accentBg}>{day.focusArea || 'General'}</Badge>
              </div>

              <div style={{ background: projectMeta.accentBg, border: `1px solid ${accent}22`, borderRadius: 10, padding: 12, marginBottom: 14 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Tasks</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text)', lineHeight: 1.7 }}>{day.tasks}</div>
              </div>

              {day.deliverable && (
                <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '8px 12px', marginBottom: 16, border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Deliverable</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)' }}>{day.deliverable}</div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Status</label>
                  <SelectStatus value={day.status} onChange={v => update('status', v)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={labelStyle}>Date</label>
                    <input type="date" value={day.date} onChange={e => update('date', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Hours</label>
                    <input type="number" min={0} max={12} step={0.5} value={day.hours} onChange={e => update('hours', e.target.value)} placeholder="0" style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Key Learning</label>
                  <textarea value={day.keyLearning} onChange={e => update('keyLearning', e.target.value)} placeholder="What did you learn today?" rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={labelStyle}>Blockers</label>
                  <textarea value={day.blockers} onChange={e => update('blockers', e.target.value)} placeholder="Any challenges?" rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
                <div>
                  <label style={labelStyle}>Notes</label>
                  <textarea value={day.notes} onChange={e => update('notes', e.target.value)} placeholder="Additional notes…" rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
export default DailyView
