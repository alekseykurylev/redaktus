'use client'

import { useEffect } from 'react'
import { useDoc, useDocsActions, useDocActive } from '@/lib/store'
import { ListItems, Editor, ToggleTheme, SearchForm, CreateItem } from '@/components'
import { Button, Sidebar } from '@/components/ui'
import { Edit, CircleQuestionMark } from 'lucide-react'

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
    <Sidebar.Provider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 16)',
        } as React.CSSProperties
      }
    >
      <Sidebar.Root>
        <Sidebar.Header>
          <div className="flex items-center justify-between p-2">
            <div className="flex gap-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Edit className="size-4" />
              </div>
              <div className="text-2xl font-bold">Редактус</div>
            </div>
            <CreateItem />
          </div>
          <SearchForm />
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <ListItems />
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Group className="flex-row justify-between gap-2">
            <Button variant="ghost" size="icon-sm">
              <CircleQuestionMark />
            </Button>
            <ToggleTheme />
          </Sidebar.Group>
        </Sidebar.Footer>
      </Sidebar.Root>
      <Sidebar.Inset>
        <Editor.Root key={activeId} doc={doc}>
          <Editor.Toolbar />
          <Editor.Body />
          <Editor.Footer />
        </Editor.Root>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )
}
