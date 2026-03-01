import React from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ProjectProvider, useProject } from '@/contexts/ProjectContext'
import Sidebar from '@/components/Sidebar'
import Overview from '@/pages/Overview'
import Dashboard from '@/pages/tracker/Dashboard'
import DailyView from '@/pages/tracker/DailyView'
import WeeklyView from '@/pages/tracker/WeeklyView'
import MonthlyView from '@/pages/tracker/MonthlyView'
import QuarterlyView from '@/pages/tracker/QuarterlyView'
import Planner from '@/pages/planner/Planner'

const Main: React.FC = () => {
  const { activeSection } = useProject()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar />
      <div style={{ marginLeft: 220, flex: 1, padding: '32px 36px', minHeight: '100vh', maxWidth: 'calc(100vw - 220px)' }}>
        {activeSection === 'overview'  && <Overview />}
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'daily'     && <DailyView />}
        {activeSection === 'weekly'    && <WeeklyView />}
        {activeSection === 'monthly'   && <MonthlyView />}
        {activeSection === 'quarterly' && <QuarterlyView />}
        {activeSection === 'planner'   && <Planner />}
      </div>
    </div>
  )
}

const App: React.FC = () => (
  <ThemeProvider>
    <ProjectProvider>
      <Main />
    </ProjectProvider>
  </ThemeProvider>
)

export default App
