import React, { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useProject } from '@/contexts/ProjectContext'
import Card from '@/components/Card'
import Badge from '@/components/Badge'
import ProgressBar from '@/components/ProgressBar'
import SelectStatus from '@/components/SelectStatus'
import ChartTooltip from '@/components/ChartTooltip'
import SectionHeader from '@/components/SectionHeader'
import type { StatusKey, DayPlan } from '@/types'

const WeeklyView: React.FC = () => {
  const { projectDays, projectWeeks, activeProject, updateDay, projectMeta } = useProject()
  const [expanded, setExpanded] = useState<number | null>(null)
  const accent = projectMeta.accent

  const weeks = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const wk = i + 1
    const wDays = projectDays.filter(d => d.week === wk)
    const plan = projectWeeks.find(w => w.weekNumber === wk)
    const complete = wDays.filter(d => d.status === 'Complete').length
    const inProg   = wDays.filter(d => d.status === 'In Progress').length
    const blocked  = wDays.filter(d => d.status === 'Blocked').length
    const hours    = wDays.reduce((s, d) => s + (parseFloat(d.hours) || 0), 0)
    return { wk, days: wDays, plan, complete, inProg, blocked, todo: 5 - complete - inProg - blocked, hours }
  }), [projectDays, projectWeeks])

  const chartData = weeks.map(w => ({
    name: `W${w.wk}`, complete: w.complete, inProgress: w.inProg, blocked: w.blocked, todo: w.todo,
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader title="Weekly Progress" subtitle="12-week overview with expandable day details" />

      <Card>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
          12-Week Chart
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} ticks={[0,1,2,3,4,5]} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="complete"   name="Complete"    fill="#10b981" stackId="a" radius={[2,2,0,0]} />
            <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" stackId="a" />
            <Bar dataKey="blocked"    name="Blocked"     fill="#ef4444" stackId="a" />
            <Bar dataKey="todo"       name="To Do"       fill="var(--border-hi)" stackId="a" radius={[2,2,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
        {weeks.map(({ wk, days: wDays, plan, complete, inProg, blocked, todo, hours }) => {
          const isOpen = expanded === wk
          const pctW = Math.round(complete / 5 * 100)
          return (
            <div key={wk} style={{
              background: 'var(--card)', border: `1px solid ${isOpen ? accent + '55' : 'var(--border)'}`,
              borderRadius: 16, overflow: 'hidden', transition: 'border-color 0.2s',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <div onClick={() => setExpanded(isOpen ? null : wk)} style={{
                padding: '16px 20px', cursor: 'pointer',
                background: isOpen ? projectMeta.accentBg : 'transparent',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: accent, background: projectMeta.accentBg, padding: '3px 8px', borderRadius: 6, border: `1px solid ${accent}33` }}>
                      W{wk}
                    </div>
                    {plan?.focusArea && <Badge color={accent} bg={projectMeta.accentBg}>{plan.focusArea}</Badge>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {hours > 0 && <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)' }}>{hours}h</span>}
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 700, color: pctW === 100 ? accent : 'var(--text-mid)' }}>{pctW}%</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)', marginBottom: 10 }}>{plan?.goal ?? `Week ${wk}`}</div>
                <ProgressBar value={complete} max={5} color={accent} height={5} />
                <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                  {([['✅', complete], ['🔄', inProg], ['🔴', blocked], ['⬜', todo]] as [string, number][]).map(([icon, val]) => (
                    <span key={icon} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)' }}>{icon} {val}</span>
                  ))}
                </div>
              </div>

              {isOpen && (
                <div style={{ borderTop: '1px solid var(--border)', padding: '12px 20px 16px' }}>
                  {wDays.map(d => (
                    <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)11' }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--text-dim)', minWidth: 32 }}>D{d.dayNumber}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)', minWidth: 26 }}>{d.dayName}</span>
                      <span style={{ flex: 1, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-mid)', lineHeight: 1.4 }}>
                        {d.tasks.length > 70 ? d.tasks.slice(0, 70) + '…' : d.tasks}
                      </span>
                      <div style={{ minWidth: 120 }}>
                        <SelectStatus value={d.status} onChange={v => updateDay(activeProject, d.id, { status: v as StatusKey } as Partial<DayPlan>)} compact />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default WeeklyView
