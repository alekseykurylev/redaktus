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
import StarterKit from "@tiptap/starter-kit"
import { useDocActions } from "@/hooks/use-doc-actions"
import type { EditorContentJSON } from "@/lib/types"
import { CodeBlock } from "./code-block"
import { Button } from "./ui/button"
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconUnderline,
  IconCode,
} from "@tabler/icons-react"
import { Toggle } from "./ui/toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

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
        isItalic: editor.isActive("italic") ?? false,
        canItalic: editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: editor.isActive("underline") ?? false,
        canUnderline: editor.can().chain().toggleUnderline().run() ?? false,
        isStrike: editor.isActive("strike") ?? false,
        canStrike: editor.can().chain().toggleStrike().run() ?? false,
        isCode: editor.isActive("code") ?? false,
        canCode: editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: editor.isActive("paragraph") ?? false,
        isHeading1: editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: editor.isActive("bulletList") ?? false,
        isOrderedList: editor.isActive("orderedList") ?? false,
        isCodeBlock: editor.isActive("codeBlock") ?? false,
        isBlockquote: editor.isActive("blockquote") ?? false,
      }
    },
  })

  const getBlockType = () => {
    if (editorState?.isHeading1) return "Заголовок 1"
    if (editorState?.isHeading2) return "Заголовок 2"
    if (editorState?.isHeading3) return "Заголовок 3"
    if (editorState?.isBulletList) return "Маркированный список"
    if (editorState?.isOrderedList) return "Нумерованный список"
    if (editorState?.isCodeBlock) return "Блок кода"
    if (editorState?.isBlockquote) return "Цитата"
    return "Текст"
  }

  const handleBlockTypeChange = (value: string | null) => {
    if (!editor) return

    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run()
        break
      case "heading1":
        editor.chain().focus().toggleHeading({ level: 1 }).run()
        break
      case "heading2":
        editor.chain().focus().toggleHeading({ level: 2 }).run()
        break
      case "heading3":
        editor.chain().focus().toggleHeading({ level: 3 }).run()
        break
      case "bulletList":
        editor.chain().focus().toggleBulletList().run()
        break
      case "orderedList":
        editor.chain().focus().toggleOrderedList().run()
        break
      case "codeBlock":
        editor.chain().focus().toggleCodeBlock().run()
        break
      case "blockquote":
        editor.chain().focus().toggleBlockquote().run()
        break
    }
  }

  if (!editor) return null
  return (
    <>
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>
        <div className="flex items-center gap-1 rounded-md bg-popover p-0.5 shadow-md ring-1 ring-foreground/10">
          <Select value={getBlockType()} onValueChange={handleBlockTypeChange}>
            <SelectTrigger size="sm" className="border-none hover:bg-muted dark:bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-min">
              <SelectItem value="paragraph">Текст</SelectItem>
              <SelectItem value="heading1">Заголовок 1</SelectItem>
              <SelectItem value="heading2">Заголовок 2</SelectItem>
              <SelectItem value="heading3">Заголовок 3</SelectItem>
              <SelectItem value="bulletList">Маркированный список</SelectItem>
              <SelectItem value="orderedList">Нумерованный список</SelectItem>
              <SelectItem value="codeBlock">Блок кода</SelectItem>
              <SelectItem value="blockquote">Цитата</SelectItem>
            </SelectContent>
          </Select>
          <Toggle
            size="sm"
            pressed={editorState?.isBold}
            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editorState?.canBold}
            aria-label="Жирный"
          >
            <IconBold />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editorState?.isItalic}
            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editorState?.canItalic}
            aria-label="Курсив"
          >
            <IconItalic />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editorState?.isStrike}
            onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editorState?.canStrike}
            aria-label="Зачёркнутый"
          >
            <IconStrikethrough />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editorState?.isUnderline}
            onPressedChange={() => editor?.chain().focus().toggleUnderline().run()}
            disabled={!editorState?.canUnderline}
            aria-label="Подчёркнутый"
          >
            <IconUnderline />
          </Toggle>

          <Toggle
            size="sm"
            pressed={editorState?.isCode}
            onPressedChange={() => editor?.chain().focus().toggleCode().run()}
            disabled={!editorState?.canCode}
            aria-label="Код"
          >
            <IconCode />
          </Toggle>
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
