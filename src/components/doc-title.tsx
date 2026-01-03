import { useRef, useState } from "react"
import ContentEditable from "react-basic-contenteditable"
import { useDebouncedCallback } from "use-debounce"
import { useDocActions } from "@/hooks/use-doc-actions"
import { useCurrentEditor } from "@tiptap/react"

export function DocTitle({ id, title }: { id: string; title: string }) {
  const { editor } = useCurrentEditor()
  const { handleSaveTitle } = useDocActions()
  const isFirstRender = useRef(true)
  const [currentContent, setCurrentContent] = useState(title)

  const debouncedUpdate = useDebouncedCallback((next: string) => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    handleSaveTitle(id, next)
  }, 100)

  const handleChange = (next: string) => {
    setCurrentContent(next)
    debouncedUpdate(next)
  }

  return (
    <ContentEditable
      updatedContent={title}
      placeholder={!currentContent ? "Без названия" : ""}
      containerClassName="text-4xl font-semibold"
      contentEditableClassName="max-w-full w-full p-0! overflow-hidden! focus-visible:outline-0"
      placeholderClassName="text-muted-foreground/50"
      onChange={handleChange}
      autoFocus={!title}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          editor?.chain().focus()
        }
      }}
    />
  )
}
