import { ComponentProps } from 'react'
import { useDocs, useDocsActions, useDocActive } from '@/lib/store'

export function RemoveDoc(props: ComponentProps<'button'>) {
  const activeId = useDocActive()
  const docs = useDocs()
  const { deleteDoc } = useDocsActions()

  const handleRemove = () => {
    deleteDoc(activeId ?? '').catch((e) => console.error(e))
  }

  const isDisabled = docs.length === 1

  return (
    <button
      data-slot="remove-doc"
      key={activeId}
      disabled={isDisabled}
      onClick={handleRemove}
      {...props}
    />
  )
}
