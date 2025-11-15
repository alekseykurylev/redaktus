import { useEditorState } from '@tiptap/react'
import { Collapsible } from '@base-ui-components/react/collapsible'
import { Bold, Redo, Undo, PanelLeftIcon, Trash2 } from 'lucide-react'
import { useEditorRootContext } from './editor-context'
import { Separator } from '../ui/separator'

export function EditorToolbar() {
  const { editor } = useEditorRootContext()

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive('bold') ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
      <div className="flex items-center gap-4">
        <Collapsible.Trigger render={<button />}>
          <PanelLeftIcon />
        </Collapsible.Trigger>
        <Separator orientation="vertical" className="h-5" />
        <button>create</button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            // className={editorState?.isBold ? "is-active border" : "border"}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editorState?.canUndo}
          >
            <Undo />
          </button>
          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editorState?.canRedo}
          >
            <Redo />
          </button>
        </div>
      </div>
      <button>
        <Trash2 />
      </button>
    </div>
  )
}
