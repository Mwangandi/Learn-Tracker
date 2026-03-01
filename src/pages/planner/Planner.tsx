import React, { useState } from 'react'
import { useProject } from '@/contexts/ProjectContext'
import SectionHeader from '@/components/SectionHeader'
import QuarterPlanner from './QuarterPlanner'
import MonthPlanner from './MonthPlanner'
import WeekPlanner from './WeekPlanner'
import DayPlanner from './DayPlanner'

type PlanTab = 'quarter' | 'month' | 'week' | 'day'

const TABS: { id: PlanTab; label: string; icon: string }[] = [
  { id: 'quarter', label: 'Quarter',  icon: '◫' },
  { id: 'month',   label: 'Months',   icon: '▣' },
  { id: 'week',    label: 'Weeks',    icon: '▤' },
  { id: 'day',     label: 'Days',     icon: '▦' },
]

const Planner: React.FC = () => {
  const { projectMeta } = useProject()
  const [tab, setTab] = useState<PlanTab>('quarter')
  const accent = projectMeta.accent

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader
        title={`✏ Planner — ${projectMeta.name}`}
        subtitle="Design your learning plan from quarterly goals down to individual days"
      />

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, background: 'var(--surface)', padding: 6, borderRadius: 12, border: '1px solid var(--border)', width: 'fit-content' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
            background: tab === t.id ? accent + '22' : 'transparent',
            color: tab === t.id ? accent : 'var(--text-mid)',
            transition: 'all 0.15s ease',
            outline: tab === t.id ? `1px solid ${accent}44` : '1px solid transparent',
          }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="fade-in">
        {tab === 'quarter' && <QuarterPlanner />}
        {tab === 'month'   && <MonthPlanner />}
        {tab === 'week'    && <WeekPlanner />}
        {tab === 'day'     && <DayPlanner />}
      </div>
    </div>
  )
}
export default Planner
