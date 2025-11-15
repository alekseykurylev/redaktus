import { Editor, useCurrentEditor, useEditorState } from '@tiptap/react'

export function EditorFooter() {
  const { editor } = useCurrentEditor()

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        wordsCount: ctx.editor?.storage.characterCount.characters(),
        charactersCount: ctx.editor?.storage.characterCount.characters(),
      }
    },
  })

  return (
    <div className="flex items-center justify-end border-t border-white/10 px-6 py-4 text-xs">
      <div className="flex items-center gap-3">
        <div>{editorState?.wordsCount} characters</div>
        <div>{editorState?.charactersCount} words</div>
      </div>
    </div>
  )
}
