'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui'

export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      data-slot="toggle-theme"
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
