import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useProject } from '@/contexts/ProjectContext'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import ChartTooltip from '@/components/ChartTooltip'
import SectionHeader from '@/components/SectionHeader'

const MonthlyView: React.FC = () => {
  const { projectDays, projectMonths, projectMeta } = useProject()

  const months = useMemo(() => projectMonths.map(plan => {
    const mDays  = projectDays.filter(d => d.month === plan.monthNumber)
    const complete = mDays.filter(d => d.status === 'Complete').length
    const inProg   = mDays.filter(d => d.status === 'In Progress').length
    const blocked  = mDays.filter(d => d.status === 'Blocked').length
    const todo     = mDays.filter(d => d.status === 'To Do').length
    const hours    = mDays.reduce((s, d) => s + (parseFloat(d.hours) || 0), 0)
    const byWeek   = [1,2,3,4].map(w => {
      const wkNum = (plan.monthNumber - 1) * 4 + w
      const wd = mDays.filter(d => d.week === wkNum)
      return { name: `W${wkNum}`, complete: wd.filter(d => d.status === 'Complete').length }
    })
    return { ...plan, mDays, complete, inProg, blocked, todo, hours, total: mDays.length, byWeek }
  }), [projectDays, projectMonths])

  const compData = months.map(m => ({ name: m.title, complete: m.complete, inProgress: m.inProg, todo: m.todo }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Monthly View" subtitle="3-month learning breakdown" />

      <Card>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
          Monthly Comparison
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={compData} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 20]} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)' }} />
            <Bar dataKey="complete"   name="Complete"    fill="#10b981" radius={[4,4,0,0]} />
            <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" radius={[4,4,0,0]} />
            <Bar dataKey="todo"       name="To Do"       fill="var(--border-hi)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {months.map((m, mi) => {
          const pctM = m.total ? Math.round(m.complete / m.total * 100) : 0
          return (
            <div key={m.id} className="fade-up" style={{
              animationDelay: `${mi * 80}ms`,
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)',
            }}>
              <div style={{ padding: '20px 22px', background: `linear-gradient(135deg, ${m.color}18, ${m.color}06)`, borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: m.color }}>Month {m.monthNumber}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{m.title}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 26, fontWeight: 700, color: pctM === 100 ? projectMeta.accent : m.color, lineHeight: 1 }}>{pctM}%</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)' }}>{m.complete}/{m.total} days</div>
                  </div>
                </div>
                <ProgressBar value={m.complete} max={m.total} color={m.color} height={6} delay={mi * 120} />
              </div>

              <div style={{ padding: '14px 22px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                {[['✅ Complete', m.complete, 'var(--accent)'], ['🔄 Active', m.inProg, 'var(--yellow)'], ['🔴 Blocked', m.blocked, 'var(--red)'], ['⬜ To Do', m.todo, 'var(--text-dim)']].map(([l, v, c]) => (
                  <div key={l as string} style={{ background: 'var(--surface)', borderRadius: 10, padding: '8px 12px', border: '1px solid var(--border)' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)' }}>{l}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, fontWeight: 700, color: c as string, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>

              {m.hours > 0 && (
                <div style={{ padding: '0 22px 12px' }}>
                  <div style={{ background: 'var(--surface)', borderRadius: 8, padding: '8px 12px', border: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)' }}>⏱ </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>{m.hours}h</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)' }}> logged</span>
                  </div>
                </div>
              )}

              <div style={{ padding: '0 22px 18px' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Week Breakdown</div>
                {m.byWeek.map(w => (
                  <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: m.color, minWidth: 22 }}>{w.name}</span>
                    <div style={{ flex: 1 }}><ProgressBar value={w.complete} max={5} color={m.color} height={3} animated={false} /></div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: 'var(--text-dim)', minWidth: 20 }}>{w.complete}/5</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MonthlyView
