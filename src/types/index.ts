// ─────────────────────────────────────────────────────────────────
// CORE DOMAIN TYPES
// ─────────────────────────────────────────────────────────────────

export type StatusKey = 'To Do' | 'In Progress' | 'Complete' | 'Blocked'

export interface StatusStyle {
  color: string
  bg: string
  label: string
}

// ─────────────────────────────────────────────────────────────────
// PROJECT
// ─────────────────────────────────────────────────────────────────

export type ProjectId = 'zoho' | 'flutter' | 'frappe'

export interface ProjectMeta {
  id: ProjectId
  name: string
  emoji: string
  tagline: string
  accent: string        // primary brand colour for this project
  accentBg: string
}

// ─────────────────────────────────────────────────────────────────
// SCHEDULE / PLAN ITEMS — all editable by the user
// ─────────────────────────────────────────────────────────────────

export interface DayPlan {
  id: string            // `${projectId}-d${dayNumber}`
  projectId: ProjectId
  week: number
  quarter: number
  month: number         // 1-based month within the project timeline
  dayNumber: number     // 1-based absolute day (1–90 for a 3-month plan)
  dayName: string       // Mon/Tue/…
  focusArea: string     // editable
  tasks: string         // editable
  deliverable: string   // editable
  // tracker fields
  status: StatusKey
  notes: string
  hours: string
  keyLearning: string
  blockers: string
  date: string
}

export interface WeekPlan {
  id: string            // `${projectId}-w${weekNum}`
  projectId: ProjectId
  weekNumber: number
  quarter: number
  month: number
  goal: string          // editable
  focusArea: string     // editable
  notes: string         // editable
}

export interface MonthPlan {
  id: string
  projectId: ProjectId
  monthNumber: number
  quarter: number
  title: string         // editable
  objective: string     // editable
  keyMilestones: string // editable (newline-separated)
  color: string
}

export interface QuarterPlan {
  id: string
  projectId: ProjectId
  quarterNumber: number
  title: string         // editable
  objective: string     // editable
  successMetrics: string // editable
}

// ─────────────────────────────────────────────────────────────────
// APP NAV
// ─────────────────────────────────────────────────────────────────

export type SectionId =
  | 'overview'          // cross-project home
  | 'dashboard'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'planner'

export interface NavSection {
  id: SectionId
  label: string
  icon: string
  group: 'home' | 'tracker' | 'plan'
}

// ─────────────────────────────────────────────────────────────────
// THEME
// ─────────────────────────────────────────────────────────────────

export type ThemeMode = 'dark' | 'light'
