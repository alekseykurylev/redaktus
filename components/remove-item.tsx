'use client'

import { useDocs, useDocsActions, useDocActive } from '@/lib/store'
import { Button } from '@/components/ui'
import { Trash2 } from 'lucide-react'

export function RemoveItem() {
  const activeId = useDocActive()
  const docs = useDocs()
  const { deleteDoc } = useDocsActions()

  const handleRemove = () => {
    deleteDoc(activeId ?? '').catch((e) => console.error(e))
  }

  const isDisabled = docs.length === 1

  return (
    <Button
      data-slot="remove-item"
      variant="ghost"
      size="icon-sm"
      key={activeId}
      disabled={isDisabled}
      onClick={handleRemove}
    >
      <Trash2 />
    </Button>
  )
}
