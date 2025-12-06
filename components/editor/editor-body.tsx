import { EditorContent, useCurrentEditor } from '@tiptap/react'
import { ScrollArea } from '@/components/ui'
import { cx } from '@/lib/cva'

export function EditorBody() {
  const { editor } = useCurrentEditor()

  return (
    <div className="min-h-0 flex-1">
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <EditorContent
            editor={editor}
            role="presentation"
            className={cx('h-full *:min-h-full *:p-6')}
          />
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
