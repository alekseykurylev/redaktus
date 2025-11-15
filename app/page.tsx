'use client'

import { useEffect } from 'react'
import { useDoc, useDocsActions, useDocActive } from '@/lib/store'
import { AppShell, DocsList, Editor } from '@/components'

export default function Home() {
  const { load } = useDocsActions()

  const activeId = useDocActive()
  const doc = useDoc(activeId)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      load().catch()
    }
  }, [load])

  if (!doc) return null

  return (
    <AppShell.Root>
      <AppShell.Sidebar>
        <AppShell.Header>
          <h1 className="text-2xl font-bold">Редактус</h1>
        </AppShell.Header>
        <AppShell.List>
          <DocsList />
        </AppShell.List>
        <AppShell.Footer />
      </AppShell.Sidebar>
      <AppShell.Body>
        <Editor.Root key={activeId} doc={doc}>
          <Editor.Toolbar />
          <Editor.Body />
          <Editor.Footer />
        </Editor.Root>
      </AppShell.Body>
    </AppShell.Root>
  )
}
