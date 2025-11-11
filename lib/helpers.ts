import type { Editor } from '@tiptap/react'

export function getDocTitle(editor: Editor) {
  if (!editor) return ''
  const text = editor.getText().trim()
  if (!text) return ''

  let title = text.split('\n')[0].trim()
  if (title.length > 50) {
    title = title.slice(0, 50).trimEnd() + '…'
  }

  return title
}
