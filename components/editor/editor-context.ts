import React from 'react'
import type { Editor } from '@tiptap/react'

interface EditorRootContext {
  editor: Editor
}

export const EditorRootContext = React.createContext<EditorRootContext | undefined>(undefined)

export function useEditorRootContext() {
  const context = React.useContext(EditorRootContext)
  if (context === undefined) {
    throw new Error('Editor parts must be placed within <Editor.Root>.')
  }
  return context
}
