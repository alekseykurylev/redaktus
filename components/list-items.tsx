'use client'

import * as React from 'react'
import { useDocs, useDocActive, useDocsActions } from '@/lib/store'
import { Item } from '@/components/ui'

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
      ))}
    </Item.Group>
  )
}
