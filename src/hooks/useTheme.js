import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const current = document.documentElement.getAttribute('data-theme')
      if (current === 'dark' || current === 'light') return current
      try {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark' || saved === 'light') return saved
      } catch {
        // localStorage unavailable (e.g. private mode)
      }
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch {
        // Handle unavailable storage gracefully
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
