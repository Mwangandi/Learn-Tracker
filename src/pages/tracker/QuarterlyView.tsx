import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { useProject } from '@/contexts/ProjectContext'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import KPICard from '@/components/KPICard'
import ChartTooltip from '@/components/ChartTooltip'
import SectionHeader from '@/components/SectionHeader'

const QuarterlyView: React.FC = () => {
  const { projectDays, projectWeeks, projectMonths, projectQuarters, projectMeta } = useProject()
  const accent = projectMeta.accent

  const m = useMemo(() => {
    const complete = projectDays.filter(d => d.status === 'Complete').length
    const inProg   = projectDays.filter(d => d.status === 'In Progress').length
    const blocked  = projectDays.filter(d => d.status === 'Blocked').length
    const total    = projectDays.length
    const hours    = projectDays.reduce((s, d) => s + (parseFloat(d.hours) || 0), 0)
    const pctDone  = total ? Math.round(complete / total * 100) : 0

    const monthStats = [1, 2, 3].map(mo => {
      const md = projectDays.filter(d => d.month === mo)
      const plan = projectMonths.find(p => p.monthNumber === mo)
      const done = md.filter(d => d.status === 'Complete').length
      return { name: `M${mo}: ${plan?.title ?? ''}`, complete: done, total: md.length, pct: md.length ? Math.round(done / md.length * 100) : 0 }
    })

    const focusBreakdown = projectWeeks.reduce<Record<string, number>>((acc, w) => {
      if (w.focusArea) {
        const wDays = projectDays.filter(d => d.week === w.weekNumber && d.status === 'Complete')
        acc[w.focusArea] = (acc[w.focusArea] ?? 0) + wDays.length
      }
      return acc
    }, {})
    const radarData = Object.entries(focusBreakdown).slice(0, 6).map(([area, val]) => ({ subject: area, value: val, fullMark: 10 }))

    return { complete, inProg, blocked, total, hours, pctDone, monthStats, radarData }
  }, [projectDays, projectWeeks, projectMonths])

  const quarter = projectQuarters[0]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Quarterly View" subtitle={`${quarter?.title ?? 'Q1'} — full quarter summary`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KPICard label="Days Complete"  value={m.complete}  color={accent}           icon="✅" sub={`${m.pctDone}%`} delay={0}   />
        <KPICard label="In Progress"    value={m.inProg}    color="var(--yellow)"    icon="🔄" delay={60}  />
        <KPICard label="Blocked"        value={m.blocked}   color="var(--red)"       icon="🔴" delay={120} />
        <KPICard label="Hours Logged"   value={`${m.hours}h`} color="var(--blue)"   icon="⏱" delay={180} />
      </div>

      {/* Quarter banner */}
      <Card style={{ padding: '22px 28px', background: `linear-gradient(135deg, var(--card) 0%, var(--card-hi) 100%)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: accent }}>Q1 — Full Quarter</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>12 Weeks · 60 Days · {projectMeta.name}</div>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 48, fontWeight: 800, color: accent, lineHeight: 1 }}>{m.pctDone}%</div>
        </div>
        <ProgressBar value={m.complete} max={m.total} color={accent} height={12} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 20 }}>
          {m.monthStats.map((mo, i) => (
            <div key={mo.name} style={{ background: 'var(--surface)', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: ['#10b981','#f97316','#a855f7'][i] }}>{mo.name}</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, fontWeight: 700, color: 'var(--text)', margin: '6px 0' }}>{mo.complete}/{mo.total}</div>
              <ProgressBar value={mo.complete} max={mo.total} color={['#10b981','#f97316','#a855f7'][i]} height={4} animated={false} />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Month bar */}
        <Card style={{ padding: '20px 24px' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
            Month-by-Month Progress
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={m.monthStats} barCategoryGap="40%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 20]} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="complete" name="Complete" fill={accent} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Radar */}
        {m.radarData.length > 2 && (
          <Card style={{ padding: '20px 24px' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
              Focus Area Coverage
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={m.radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar name="Days" dataKey="value" stroke={accent} fill={accent} fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </div>
  )
}
export default QuarterlyView
