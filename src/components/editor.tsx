import { useMemo, useRef, type ReactNode } from "react"
import {
  useEditor,
  EditorContent,
  EditorContext,
  ReactNodeViewRenderer,
  useCurrentEditor,
  useEditorState,
} from "@tiptap/react"
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus"
import { CharacterCount } from "@tiptap/extensions"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { all, createLowlight } from "lowlight"
import { useDebouncedCallback } from "use-debounce"
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from "@tiptap/starter-kit"
import { useDocActions } from "@/hooks/use-doc-actions"
import type { EditorContentJSON } from "@/lib/types"
import { CodeBlock } from "./code-block"
import { Button } from "./ui/button"
import { IconArrowBackUp, IconArrowForwardUp, IconBold } from "@tabler/icons-react"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"

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
      // Placeholder.configure({
      //   placeholder: "Напишите текст",
      // }),
    ],
    onUpdate: async ({ editor }) => {
      const json = editor.getJSON()
      debouncedUpdate(json)
    },
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      {/* <div>
        Number of renders: <span id="render-count">{countRenderRef.current}</span>
      </div> */}
      {children}
    </EditorContext.Provider>
  )
}

function EditorMenu() {
  const { editor } = useCurrentEditor()

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null

      return {
        isBold: editor.isActive("bold") ?? false,
        canBold: editor.can().chain().toggleBold().run() ?? false,
      }
    },
  })

  if (!editor) return null
  return (
    <>
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>
        {/* <ToggleGroup type="multiple" variant="outline" spacing={2} size="sm">
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <IconBold className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup> */}
        <div>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            className={editorState?.isBold ? "is-active" : ""}
          >
            Bold
          </button>
        </div>
      </BubbleMenu>
    </>
  )
}

function EditorBody() {
  const { editor } = useCurrentEditor()
  return (
    <>
      <EditorContent editor={editor} role="presentation" className="h-full" />
      <EditorMenu />
    </>
  )
}

function EditorToolbar() {
  const { editor } = useCurrentEditor()

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null

      return {
        canUndo: editor.can().chain().undo().run() ?? false,
        canRedo: editor.can().chain().redo().run() ?? false,
      }
    },
  })

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editorState?.canUndo}
      >
        <IconArrowBackUp />
        <span className="sr-only">Отменить</span>
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editorState?.canRedo}
      >
        <IconArrowForwardUp />
        <span className="sr-only">Вернуть</span>
      </Button>
    </div>
  )
}

export { Editor, EditorBody, EditorToolbar }
