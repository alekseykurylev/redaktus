'use client'

import { useEffect } from 'react'
import { useDoc, useDocsActions, useDocActive } from '@/lib/store'
import { ListItems, Editor, ToggleTheme } from '@/components'
import { Sidebar, ScrollArea } from '@/components/ui'

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
    <Sidebar.Provider>
      <Sidebar.Root>
        <Sidebar.Header>
          <h1 className="text-2xl font-bold">Редактус</h1>
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <ListItems />
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <ToggleTheme />
        </Sidebar.Footer>
      </Sidebar.Root>
      <Sidebar.Inset>
        <div>
          <div>toolbar</div>
          <Sidebar.Trigger />
        </div>
        <div className="min-h-0 flex-1">
          <ScrollArea.Root>
            <ScrollArea.Viewport>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
              <div>Group</div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
        <div>footer</div>
      </Sidebar.Inset>
    </Sidebar.Provider>
  )

  // return (
  //   <AppShell.Root>
  //     <AppShell.Sidebar>
  //       <AppShell.Header>
  //         <h1 className="text-2xl font-bold">Редактус</h1>
  //         <Sheet.Root>
  //           <Sheet.Trigger>Trigger</Sheet.Trigger>
  //           <Sheet.Popup>123312321</Sheet.Popup>
  //         </Sheet.Root>
  //       </AppShell.Header>
  //       <AppShell.List>
  //         <ListDocs />
  //       </AppShell.List>
  //       <AppShell.Footer>
  //         <ToggleTheme />
  //       </AppShell.Footer>
  //     </AppShell.Sidebar>
  //     <AppShell.Body>
  //       <Editor.Root key={activeId} doc={doc}>
  //         <Editor.Toolbar />
  //         <Editor.Body />
  //         <Editor.Footer />
  //       </Editor.Root>
  //     </AppShell.Body>
  //   </AppShell.Root>
  // )
}
