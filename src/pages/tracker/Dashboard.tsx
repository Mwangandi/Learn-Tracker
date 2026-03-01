import React, { useMemo } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Line, PieChart, Pie, Cell,
} from 'recharts'
import { useProject } from '@/contexts/ProjectContext'
import Card from '@/components/Card'
import KPICard from '@/components/KPICard'
import ProgressBar from '@/components/ProgressBar'
import ChartTooltip from '@/components/ChartTooltip'
import SectionHeader from '@/components/SectionHeader'

const pct = (n: number, t: number) => t === 0 ? 0 : Math.round(n / t * 100)

const Dashboard: React.FC = () => {
  const { projectDays, projectWeeks, projectMeta } = useProject()
  const accent = projectMeta.accent

  const m = useMemo(() => {
    const total    = projectDays.length
    const complete = projectDays.filter(d => d.status === 'Complete').length
    const inProg   = projectDays.filter(d => d.status === 'In Progress').length
    const blocked  = projectDays.filter(d => d.status === 'Blocrtd').length
    const todo     = projectDays.filter(d => d.status === 'To Do').length

    const byWeek = Array.from({ length: 12 }, (_, i) => {
      const wk = i + 1
      const wDays = projectDays.filter(d => d.week === wk)
      return {
        name: `W${wk}`,
        complete:   wDays.filter(d => d.status === 'Complete').length,
        inProgress: wDays.filter(d => d.status === 'In Progress').length,
        blocked:    wDays.filter(d => d.status === 'Blocked').length,
        todo:       wDays.filter(d => d.status === 'To Do').length,
      }
    })

    const byMonth = [1, 2, 3].map(mo => {
      const md = projectDays.filter(d => d.month === mo)
      const done = md.filter(d => d.status === 'Complete').length
      const wk4 = projectWeeks.filter(w => w.month === mo)
      const focusAreas = [...new Set(wk4.map(w => w.focusArea).filter(Boolean))]
      return { name: `M${mo}`, value: done, total: md.length, pct: pct(done, md.length), focus: focusAreas.slice(0, 2).join(', ') }
    })

    let cum = 0
    const cumulative = byWeek.map((w, i) => {
      cum += w.complete
      return { name: `W${i + 1}`, actual: cum, target: (i + 1) * 5 }
    })

    return { total, complete, inProg, blocked, todo, pctDone: pct(complete, total), byWeek, byMonth, cumulative }
  }, [projectDays, projectWeeks])

  const monthColors = ['#10b981', '#f97316', '#a855f7']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader
        title={`${projectMeta.emoji} ${projectMeta.name}`}
        subtitle={projectMeta.tagline}
      />

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16 }}>
        <KPICard label="Total Days"  value={m.total}    color="var(--blue)"     icon="📋" delay={0}   />
        <KPICard label="Complete"    value={m.complete} color={accent}           icon="✅" sub={`${m.pctDone}%`} delay={60}  />
        <KPICard label="In Progress" value={m.inProg}   color="var(--yellow)"   icon="🔄" delay={120} />
        <KPICard label="Blocked"     value={m.blocked}  color="var(--red)"      icon="🔴" delay={180} />
        <KPICard label="To Do"       value={m.todo}     color="var(--text-mid)" icon="⬜" delay={240} />
      </div>

      {/* Overall bar */}
      <Card style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Overall Progress
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>
              12 Weeks · 60 Days
            </div>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 600, color: accent }}>
            {m.pctDone}%
          </div>
        </div>
        <ProgressBar value={m.complete} max={m.total} color={accent} height={10} />
        <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
          {[['Complete', m.complete, accent], ['In Progress', m.inProg, 'var(--yellow)'], ['Blocked', m.blocked, 'var(--red)'], ['To Do', m.todo, 'var(--text-dim)']].map(([l, v, c]) => (
            <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c as string }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--text-mid)' }}>
                {l} <span style={{ color: c as string, fontWeight: 600 }}>{v}</span>
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20 }}>
        <Card style={{ padding: '20px 24px' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
            Weekly Breakdown
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={m.byWeek} barSize={15}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="complete"   name="Complete"    fill="#10b981" radius={[2, 2, 0, 0]} stackId="a" />
              <Bar dataKey="inProgress" name="In Progress" fill="#f59e0b" stackId="a" />
              <Bar dataKey="blocked"    name="Blocked"     fill="#ef4444" stackId="a" />
              <Bar dataKey="todo"       name="To Do"       fill="var(--border-hi)" radius={[2, 2, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card style={{ padding: '20px 24px' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
            Monthly Completion
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={m.byMonth} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={4}>
                {m.byMonth.map((_, i) => <Cell key={i} fill={monthColors[i]} />)}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {m.byMonth.map((mo, i) => (
            <div key={mo.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: monthColors[i] }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-mid)' }}>Month {mo.name.slice(1)}</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: monthColors[i] }}>{mo.pct}%</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Cumulative */}
      <Card style={{ padding: '20px 24px' }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
          Actual vs Target Pace
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={m.cumulative}>
            <defs>
              <linearGradient id={`grad-${projectMeta.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={accent} stopOpacity={0.28} />
                <stop offset="95%" stopColor={accent} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 60]} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="actual" name="Actual" stroke={accent} strokeWidth={2.5} fill={`url(#grad-${projectMeta.id})`} dot={{ fill: accent, r: 3 }} />
            <Line type="monotone" dataKey="target" name="Target" stroke="var(--blue)" strokeWidth={2} strokeDasharray="6 3" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
export default Dashboard
