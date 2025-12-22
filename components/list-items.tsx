'use client'

import * as React from 'react'
import { useDocs, useDocActive, useDocsActions } from '@/lib/store'
import { Item } from '@/components/ui'
import { cx } from '@/lib/cva'

export function ListItems() {
  const docs = useDocs()
  const activeId = useDocActive()
  const { setActive } = useDocsActions()

  return (
    <Item.Group>
      {docs.map((doc) => (
        <React.Fragment key={doc.id}>
          <Item.Root
            variant={doc.id === activeId ? 'active' : 'default'}
            className="cursor-pointer"
            render={<button onClick={() => setActive(doc.id)} />}
          >
            <Item.Content>
              <Item.Title className="line-clamp-2">{doc.title || 'Без названия'}</Item.Title>
              <Item.Description>{new Date(doc.updatedAt).toLocaleString()}</Item.Description>
            </Item.Content>
          </Item.Root>
        </React.Fragment>
        // <button
        //   key={doc.id}
        //   type="button"
        //   onClick={() => setActive(doc.id)}
        //   className={cx(
        //     'space-y-1 rounded-md p-4 text-left text-card-foreground',
        //     'focus-visible:outline-2 focus-visible:-outline-offset-2',
        //     doc.id === activeId && 'bg-card bg-linear-to-t to-card shadow-xs',
        //   )}
        // >
        //   <div className="line-clamp-2">{doc.title || 'Без названия'}</div>
        //   <div className="text-sm text-muted-foreground">
        //     {new Date(doc.updatedAt).toLocaleString()}
        //   </div>
        // </button>
      ))}
    </Item.Group>
  )
}
