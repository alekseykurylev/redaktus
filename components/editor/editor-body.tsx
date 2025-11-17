import { EditorContent, useCurrentEditor } from '@tiptap/react'
import { ScrollArea } from '@base-ui-components/react/scroll-area'
import { cx } from '@/lib/cva'

export function EditorBody() {
  const { editor } = useCurrentEditor()

  return (
    <ScrollArea.Root className="h-px grow">
      <ScrollArea.Viewport className="h-full overscroll-contain">
        <EditorContent
          editor={editor}
          role="presentation"
          className={cx('h-full *:min-h-full *:p-6')}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="pointer-events-none m-2 flex w-1 justify-center rounded bg-zinc-800 opacity-0 transition-opacity delay-300 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-75 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-75">
        <ScrollArea.Thumb className="w-full rounded bg-zinc-700" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
