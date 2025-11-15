import type { Editor } from '@tiptap/react'
import { useEditorRootContext } from './editor-context'

export function EditorFooter() {
  const { editor } = useEditorRootContext()

  const wordsCount = editor?.storage.characterCount.words()
  const charactersCount = editor?.storage.characterCount.characters()

  return (
    <div className="flex items-center justify-end border-t border-white/10 px-6 py-4 text-xs">
      <div className="flex items-center gap-3">
        <div>{charactersCount} characters</div>
        <div>{wordsCount} words</div>
      </div>
    </div>
  )
}
