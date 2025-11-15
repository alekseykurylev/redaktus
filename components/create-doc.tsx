import { ComponentProps } from 'react'
import { useDoc, useDocsActions, useDocActive } from '@/lib/store'

export function CreateDoc(props: ComponentProps<'button'>) {
  const activeId = useDocActive()
  const note = useDoc(activeId)
  const { createDoc } = useDocsActions()

  const handleClick = () => {
    createDoc().catch((e) => console.log(e))
  }

  const isDisabled = note?.title?.length === 0

  return (
    <button
      data-slot="create-doc"
      key={activeId}
      disabled={isDisabled}
      onPointerDown={(e) => e.preventDefault()}
      onClick={handleClick}
      {...props}
    />
  )
}
