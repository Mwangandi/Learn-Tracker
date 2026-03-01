import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useProject } from '@/contexts/ProjectContext'
import { PROJECTS } from '@/data/projects'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import KPICard from '@/components/KPICard'
import ChartTooltip from '@/components/ChartTooltip'
import SectionHeader from '@/components/SectionHeader'

const Overview: React.FC = () => {
  const { days, setActiveProject, setActiveSection } = useProject()

  const stats = PROJECTS.map(p => {
    const pd = days[p.id]
    const complete = pd.filter(d => d.status === 'Complete').length
    const inProg   = pd.filter(d => d.status === 'In Progress').length
    const blocked  = pd.filter(d => d.status === 'Blocked').length
    return { ...p, complete, inProg, blocked, todo: pd.length - complete - inProg - blocked, total: pd.length }
  })

  const total = stats.reduce((s, p) => s + p.total, 0)
  const totalDone = stats.reduce((s, p) => s + p.complete, 0)

  const chartData = Array.from({ length: 12 }, (_, i) => {
    const wk = i + 1
    const entry: Record<string, unknown> = { name: `W${wk}` }
    PROJECTS.forEach(p => {
      const wd = days[p.id].filter(d => d.week === wk)
      entry[p.name] = wd.filter(d => d.status === 'Complete').length
    })
    return entry
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader title="Overview" subtitle="All learning projects at a glance" />

      {/* Global KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <KPICard label="Total Days" value={total} color="var(--blue)" icon="📋" delay={0} />
        <KPICard label="Complete" value={totalDone} color="var(--accent)" icon="✅" sub={`${Math.round(totalDone/total*100)}%`} delay={60} />
        <KPICard label="Projects" value={PROJECTS.length} color="var(--purple)" icon="🗂" delay={120} />
        <KPICard label="Weeks" value={36} color="var(--yellow)" icon="📅" sub="12 per project" delay={180} />
      </div>

      {/* Project cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {stats.map((p, i) => (
          <div key={p.id} className="fade-up card-hover" style={{
            animationDelay: `${i * 80}ms`,
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: 'var(--shadow-sm)',
          }} onClick={() => { setActiveProject(p.id); setActiveSection('dashboard') }}>
            <div style={{
              padding: '20px 24px',
              background: `linear-gradient(135deg, ${p.accentBg}, transparent)`,
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: p.accentBg,
                    border: `1px solid ${p.accent}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>{p.emoji}</div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{p.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--text-dim)' }}>{p.tagline}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 700, color: p.accent }}>
                  {Math.round(p.complete / p.total * 100)}%
                </div>
              </div>
              <ProgressBar value={p.complete} max={p.total} color={p.accent} height={6} delay={i * 100} />
            </div>
            <div style={{ padding: '14px 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
              {[
                { l: 'Done', v: p.complete, c: 'var(--accent)' },
                { l: 'Active', v: p.inProg, c: 'var(--yellow)' },
                { l: 'Blocked', v: p.blocked, c: 'var(--red)' },
                { l: 'Todo', v: p.todo, c: 'var(--text-dim)' },
              ].map(s => (
                <div key={s.l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-project weekly chart */}
      <Card style={{ padding: '20px 24px' }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>
          Weekly Completions — All Projects
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={10} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 5]} />
            <Tooltip content={<ChartTooltip />} />
            {PROJECTS.map(p => (
              <Bar key={p.id} dataKey={p.name} fill={p.accent} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
export default Overview
