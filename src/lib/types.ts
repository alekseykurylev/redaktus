import type { JSONContent } from '@tiptap/react'

export type EditorContentJSON = JSONContent

export interface Doc {
  id: string
  title: string
  updatedAt: Date
  emoji?: string
}

export interface Content {
  id: string
  data: EditorContentJSON
}
