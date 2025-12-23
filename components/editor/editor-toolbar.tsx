'use client'

import * as React from 'react'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { Bold, Redo, Undo, PanelLeftIcon, Trash2, SquarePen } from 'lucide-react'
import { Sidebar, Separator, Button } from '@/components/ui'
import { RemoveItem } from '@/components'

export function EditorToolbar() {
  const { editor } = useCurrentEditor()

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
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Sidebar.Trigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
        />
        <div className="flex grow items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={!editorState?.canBold}
              // className={editorState?.isBold ? "is-active border" : "border"}
            >
              <Bold />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editorState?.canUndo}
            >
              <Undo />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editorState?.canRedo}
            >
              <Redo />
            </Button>
          </div>
          <RemoveItem />
        </div>
      </div>
    </header>
  )

  // return (
  //   <div className="flex items-center justify-between border-b border-border px-6 py-4">
  //     <div className="flex items-center gap-6">
  //       {children}
  //       <Separator orientation="vertical" className="h-5" />
  //       <CreateDoc>
  //         <SquarePen />
  //       </CreateDoc>
  // <div className="flex items-center gap-2">
  //   <button
  //     onClick={() => editor?.chain().focus().toggleBold().run()}
  //     disabled={!editorState?.canBold}
  //     // className={editorState?.isBold ? "is-active border" : "border"}
  //   >
  //     <Bold />
  //   </button>
  //   <button
  //     onClick={() => editor?.chain().focus().undo().run()}
  //     disabled={!editorState?.canUndo}
  //   >
  //     <Undo />
  //   </button>
  //   <button
  //     onClick={() => editor?.chain().focus().redo().run()}
  //     disabled={!editorState?.canRedo}
  //   >
  //     <Redo />
  //   </button>
  // </div>
  //     </div>
  //     <RemoveDoc>
  //       <Trash2 />
  //     </RemoveDoc>
  //   </div>
  // )
}
