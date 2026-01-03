import { useMemo, useRef } from "react"
import { useEditor, EditorContent, EditorContext, ReactNodeViewRenderer } from "@tiptap/react"
import { CharacterCount } from "@tiptap/extensions"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { all, createLowlight } from "lowlight"
import { useDebouncedCallback } from "use-debounce"
// import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from "@tiptap/starter-kit"
import { useDocActions } from "@/hooks/use-doc-actions"
import type { EditorContentJSON } from "@/lib/types"
import { CodeBlock } from "./code-block"

const lowlight = createLowlight(all)

export function Editor({ id, content }: { id: string; content: EditorContentJSON }) {
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
      <EditorContent editor={editor} role="presentation" className="h-full *:min-h-full" />
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </EditorContext.Provider>
  )
}
