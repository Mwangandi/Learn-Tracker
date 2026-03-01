import React, {
  createContext, useContext, useState, useCallback, useMemo,
} from 'react'
import type {
  ProjectId, ProjectMeta, DayPlan, WeekPlan, MonthPlan, QuarterPlan,
  StatusKey, SectionId,
} from '@/types'
import {
  PROJECTS, buildInitialDays, buildInitialWeeks,
  buildInitialMonths, buildInitialQuarters,
} from '@/data/projects'

interface ProjectCtx {
  // navigation
  activeProject: ProjectId
  setActiveProject: (id: ProjectId) => void
  activeSection: SectionId
  setActiveSection: (id: SectionId) => void
  projectMeta: ProjectMeta

  // data
  days:     Record<ProjectId, DayPlan[]>
  weeks:    Record<ProjectId, WeekPlan[]>
  months:   Record<ProjectId, MonthPlan[]>
  quarters: Record<ProjectId, QuarterPlan[]>

  // actions
  updateDay:     (projectId: ProjectId, dayId: string, patch: Partial<DayPlan>) => void
  updateWeek:    (projectId: ProjectId, weekId: string, patch: Partial<WeekPlan>) => void
  updateMonth:   (projectId: ProjectId, monthId: string, patch: Partial<MonthPlan>) => void
  updateQuarter: (projectId: ProjectId, qId: string, patch: Partial<QuarterPlan>) => void

  // helpers
  projectDays:     DayPlan[]
  projectWeeks:    WeekPlan[]
  projectMonths:   MonthPlan[]
  projectQuarters: QuarterPlan[]
  globalPct:       number
}

function buildAllDays()     { return Object.fromEntries(PROJECTS.map(p => [p.id, buildInitialDays(p.id)]))     as Record<ProjectId, DayPlan[]> }
function buildAllWeeks()    { return Object.fromEntries(PROJECTS.map(p => [p.id, buildInitialWeeks(p.id)]))    as Record<ProjectId, WeekPlan[]> }
function buildAllMonths()   { return Object.fromEntries(PROJECTS.map(p => [p.id, buildInitialMonths(p.id)]))   as Record<ProjectId, MonthPlan[]> }
function buildAllQuarters() { return Object.fromEntries(PROJECTS.map(p => [p.id, buildInitialQuarters(p.id)])) as Record<ProjectId, QuarterPlan[]> }

const ProjectContext = createContext<ProjectCtx>(null as unknown as ProjectCtx)

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeProject, setActiveProject] = useState<ProjectId>('zoho')
  const [activeSection, setActiveSection] = useState<SectionId>('overview')

  const [days,     setDays]     = useState(buildAllDays)
  const [weeks,    setWeeks]    = useState(buildAllWeeks)
  const [months,   setMonths]   = useState(buildAllMonths)
  const [quarters, setQuarters] = useState(buildAllQuarters)

  const updateDay = useCallback((pid: ProjectId, dayId: string, patch: Partial<DayPlan>) => {
    setDays(prev => ({
      ...prev,
      [pid]: prev[pid].map(d => d.id === dayId ? { ...d, ...patch } : d),
    }))
  }, [])

  const updateWeek = useCallback((pid: ProjectId, weekId: string, patch: Partial<WeekPlan>) => {
    setWeeks(prev => ({
      ...prev,
      [pid]: prev[pid].map(w => w.id === weekId ? { ...w, ...patch } : w),
    }))
  }, [])

  const updateMonth = useCallback((pid: ProjectId, monthId: string, patch: Partial<MonthPlan>) => {
    setMonths(prev => ({
      ...prev,
      [pid]: prev[pid].map(m => m.id === monthId ? { ...m, ...patch } : m),
    }))
  }, [])

  const updateQuarter = useCallback((pid: ProjectId, qId: string, patch: Partial<QuarterPlan>) => {
    setQuarters(prev => ({
      ...prev,
      [pid]: prev[pid].map(q => q.id === qId ? { ...q, ...patch } : q),
    }))
  }, [])

  const projectMeta    = useMemo(() => PROJECTS.find(p => p.id === activeProject)!, [activeProject])
  const projectDays    = useMemo(() => days[activeProject],     [days,     activeProject])
  const projectWeeks   = useMemo(() => weeks[activeProject],    [weeks,    activeProject])
  const projectMonths  = useMemo(() => months[activeProject],   [months,   activeProject])
  const projectQuarters = useMemo(() => quarters[activeProject], [quarters, activeProject])

  const globalPct = useMemo(() => {
    const allDays = Object.values(days).flat()
    const done    = allDays.filter(d => d.status === 'Complete').length
    return allDays.length ? Math.round((done / allDays.length) * 100) : 0
  }, [days])

  return (
    <ProjectContext.Provider value={{
      activeProject, setActiveProject, activeSection, setActiveSection, projectMeta,
      days, weeks, months, quarters,
      updateDay, updateWeek, updateMonth, updateQuarter,
      projectDays, projectWeeks, projectMonths, projectQuarters,
      globalPct,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => useContext(ProjectContext)
