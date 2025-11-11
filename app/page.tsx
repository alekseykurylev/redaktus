'use client'

import { useEffect } from 'react'
import { useDoc, useDocsActions, useDocActive } from '@/lib/store'
import { AppShell } from '@/components'

export default function Home() {
  const { load } = useDocsActions()

  const activeId = useDocActive()
  const note = useDoc(activeId)

  useEffect(() => {
    load().catch()
  }, [])

  if (!note) return null

  return (
    <AppShell.Root>
      <AppShell.Sidebar>
        <AppShell.Header>
          <h1 className="text-2xl font-bold">Редактус</h1>
        </AppShell.Header>
        <AppShell.List>List</AppShell.List>
        <AppShell.Footer />
      </AppShell.Sidebar>
      <AppShell.Doc>Doc</AppShell.Doc>
    </AppShell.Root>
  )
}
