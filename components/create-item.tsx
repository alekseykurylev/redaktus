import { ComponentProps } from 'react'
import { useDoc, useDocsActions, useDocActive } from '@/lib/store'
import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'

export function CreateItem() {
  const activeId = useDocActive()
  const doc = useDoc(activeId)
  const { createDoc } = useDocsActions()

  const handleClick = () => {
    createDoc().catch((e) => console.log(e))
  }

  const isDisabled = doc?.title?.length === 0

  return (
    <Button
      data-slot="create-item"
      key={activeId}
      disabled={isDisabled}
      onPointerDown={(e) => e.preventDefault()}
      onClick={handleClick}
      variant="outline"
      size="icon-sm"
    >
      <Plus />
      <span className="sr-only">Создать</span>
    </Button>
  )
}
