import { useMemo, useRef, type ReactNode } from "react"
import {
  useEditor,
  EditorContent,
  EditorContext,
  ReactNodeViewRenderer,
  useCurrentEditor,
  useEditorState,
} from "@tiptap/react"
import { CharacterCount, Placeholder } from "@tiptap/extensions"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { all, createLowlight } from "lowlight"
import { useDebouncedCallback } from "use-debounce"
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from "@tiptap/starter-kit"
import { useDocActions } from "@/hooks/use-doc-actions"
import type { EditorContentJSON } from "@/lib/types"
import { CodeBlock } from "./code-block"
import { Button } from "./ui/button"
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react"

const lowlight = createLowlight(all)

function Editor({
  id,
  content,
  children,
}: {
  id: string
  content: EditorContentJSON
  children: ReactNode
}) {
  const { handleSaveContent } = useDocActions()

  const countRenderRef = useRef(0)
  countRenderRef.current += 1

  const debouncedUpdate = useDebouncedCallback((content: EditorContentJSON) => {
    handleSaveContent(id, content)
  }, 300)

  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CharacterCount,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock)
        },
      }).configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      Placeholder.configure({
        placeholder: "Напишите текст",
      }),
    ],
    onUpdate: async ({ editor }) => {
      const json = editor.getJSON()
      debouncedUpdate(json)
    },
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  if (!editor) return null

  return (
    <EditorContext.Provider value={providerValue}>
      {/* <div>
        Number of renders: <span id="render-count">{countRenderRef.current}</span>
      </div> */}
      {children}
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </EditorContext.Provider>
  )
}

function EditorBody() {
  const { editor } = useCurrentEditor()
  return <EditorContent editor={editor} role="presentation" className="h-full *:min-h-full" />
}

function EditorToolbar() {
  const { editor } = useCurrentEditor()

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <div className="flex gap-1">
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editorState?.canUndo}
      >
        <IconArrowBackUp />
        <span className="sr-only">undo</span>
      </Button>
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editorState?.canRedo}
      >
        <IconArrowForwardUp />
        <span className="sr-only">redo</span>
      </Button>
    </div>
  )
}

export { Editor, EditorBody, EditorToolbar }
