import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ThemeMode } from '@/types'

interface ThemeCtx {
  mode: ThemeMode
  toggle: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeCtx>({
  mode: 'dark',
  toggle: () => {},
  isDark: true,
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('lt-theme')
    return (saved === 'light' || saved === 'dark') ? saved : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('lt-theme', mode)
  }, [mode])

  const toggle = useCallback(() => {
    setMode(m => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, toggle, isDark: mode === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
