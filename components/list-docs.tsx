'use client'

import { useDocs, useDocActive, useDocsActions } from '@/lib/store'
import { ScrollArea } from '@/components/ui'
import { cx } from '@/lib/cva'

export function ListDocs() {
  const docs = useDocs()
  const activeId = useDocActive()
  const { setActive } = useDocsActions()

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>
        <div className="flex flex-col">
          {docs.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => setActive(doc.id)}
              className={cx(
                'space-y-1 rounded-md p-4 text-left text-card-foreground',
                'focus-visible:outline-2 focus-visible:-outline-offset-2',
                doc.id === activeId && 'bg-card bg-linear-to-t to-card shadow-xs',
              )}
            >
              <div className="line-clamp-2">{doc.title || 'Без названия'}</div>
              <div className="text-sm text-muted-foreground">
                {new Date(doc.updatedAt).toLocaleString()}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
