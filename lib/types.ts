import type { Content } from '@tiptap/react'

export type Doc = {
  id: string
  title?: string
  content: Content
  updatedAt: number
}
