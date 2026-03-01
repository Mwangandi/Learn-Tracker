import React from 'react'
import type { SectionId, NavSection } from '@/types'
import { PROJECTS } from '@/data/projects'
import { useProject } from '@/contexts/ProjectContext'
import { useTheme } from '@/contexts/ThemeContext'
import ProgressBar from './ProgressBar'

const NAV_SECTIONS: NavSection[] = [
  { id: 'overview',  label: 'Overview',       icon: '◈', group: 'home'    },
  { id: 'dashboard', label: 'Dashboard',      icon: '◉', group: 'tracker' },
  { id: 'daily',     label: 'Daily Tracker',  icon: '▦', group: 'tracker' },
  { id: 'weekly',    label: 'Weekly View',    icon: '▤', group: 'tracker' },
  { id: 'monthly',   label: 'Monthly View',   icon: '▣', group: 'tracker' },
  { id: 'quarterly', label: 'Quarterly View', icon: '◫', group: 'tracker' },
  { id: 'planner',   label: 'Planner',        icon: '✏', group: 'plan'    },
]

const GROUP_LABELS: Record<string, string> = {
  home: 'Home', tracker: 'Tracker', plan: 'Plan',
}

const Sidebar: React.FC = () => {
  const { activeProject, setActiveProject, activeSection, setActiveSection, projectMeta, days, globalPct } = useProject()
  const { isDark, toggle } = useTheme()

  const projectDays = days[activeProject]
  const done = projectDays.filter(d => d.status === 'Complete').length

  const grouped = NAV_SECTIONS.reduce<Record<string, NavSection[]>>((acc, s) => {
    ;(acc[s.group] ??= []).push(s)
    return acc
  }, {})

  return (
    <div style={{
      width: 220, minHeight: '100vh', background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, zIndex: 20,
      transition: 'background 0.25s ease',
    }}>
      {/* Logo + theme toggle */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'var(--accent-bg)', border: `1px solid var(--accent)33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
            }}>{projectMeta.emoji}</div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>
                LEARN
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 8, color: 'var(--accent)', letterSpacing: '0.12em' }}>
                TRACKER
              </div>
            </div>
          </div>
          {/* Theme toggle */}
          <button onClick={toggle} title={isDark ? 'Switch to light' : 'Switch to dark'} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 8, width: 30, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, color: 'var(--text-mid)',
            transition: 'background 0.2s, color 0.2s',
          }}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Project switcher */}
      <div style={{ padding: '12px 10px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingLeft: 4 }}>
          Projects
        </div>
        {PROJECTS.map(p => {
          const active = p.id === activeProject
          return (
            <div key={p.id} onClick={() => { setActiveProject(p.id); setActiveSection('dashboard') }}
              className="nav-item"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 2,
                background: active ? p.accentBg : 'transparent',
                border: `1px solid ${active ? p.accent + '44' : 'transparent'}`,
                transition: 'all 0.15s ease',
              }}>
              <span style={{ fontSize: 13 }}>{p.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: active ? 600 : 400, color: active ? p.accent : 'var(--text-mid)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.name}
                </div>
              </div>
              {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.accent, flexShrink: 0 }} />}
            </div>
          )
        })}
      </div>

      {/* Active project progress */}
      <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'var(--text-dim)' }}>
            {projectMeta.name}
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: projectMeta.accent }}>
            {Math.round((done / projectDays.length) * 100)}%
          </span>
        </div>
        <ProgressBar value={done} max={projectDays.length} color={projectMeta.accent} height={3} />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'var(--text-dim)', marginTop: 4 }}>
          {done}/{projectDays.length} days complete
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '8px 10px', overflowY: 'auto' }}>
        {Object.entries(grouped).map(([group, sections]) => (
          <div key={group} style={{ marginBottom: 4 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '8px 6px 4px' }}>
              {GROUP_LABELS[group]}
            </div>
            {sections.map(n => {
              const active = activeSection === n.id
              return (
                <div key={n.id} className="nav-item" onClick={() => setActiveSection(n.id as SectionId)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 1,
                    background: active ? 'var(--accent-bg)' : 'transparent',
                    border: `1px solid ${active ? 'var(--accent)33' : 'transparent'}`,
                    transition: 'background 0.15s ease',
                  }}>
                  <span style={{ fontSize: 12, color: active ? 'var(--accent)' : 'var(--text-dim)', width: 14, textAlign: 'center' }}>
                    {n.icon}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: active ? 600 : 400, color: active ? 'var(--accent)' : 'var(--text-mid)' }}>
                    {n.label}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Global progress footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: 'var(--text-dim)', marginBottom: 4 }}>
          All projects: {globalPct}% complete
        </div>
        <ProgressBar value={globalPct} max={100} color='var(--accent)' height={3} />
      </div>
    </div>
  )
}
export default Sidebar
