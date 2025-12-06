'use client'

import * as React from 'react'
import { SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <button className="p-2" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <SunMoon className="size-5" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
