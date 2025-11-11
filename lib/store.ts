import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { Doc } from '@/lib/types'
import { delDoc, getAllDocs, putDoc } from '@/lib/db'

type State = {
  docs: Doc[]
  activeId?: string | null
  actions: {
    load: () => Promise<void>
    createDoc: () => Promise<Doc>
    updateDoc: (id: string, data: Partial<Doc>) => Promise<void>
    deleteDoc: (id: string) => Promise<void>
    setActive: (id?: string | null) => void
  }
}

const createEmptyDoc = async (): Promise<Doc> => {
  const doc: Doc = {
    id: uuidv4(),
    title: '',
    content: '',
    updatedAt: Date.now(),
  }
  await putDoc(doc)
  return doc
}

const sortDocs = (docs: Doc[]) => [...docs].sort((a, b) => b.updatedAt - a.updatedAt)

const useDocsStore = create<State>((set, get) => {
  return {
    docs: [],
    actions: {
      load: async () => {
        let docs = await getAllDocs()
        docs = sortDocs(docs)

        if (docs.length === 0) {
          const newDoc = await createEmptyDoc()
          docs = [newDoc]
        }

        set({ docs: docs, activeId: docs[0]?.id ?? null })
      },
      createDoc: async () => {
        const doc = await createEmptyDoc()
        set((state) => ({ docs: [doc, ...state.docs], activeId: doc.id }))
        return doc
      },
      updateDoc: async (id, data) => {
        const doc = get().docs.find((n) => n.id === id)
        if (!doc) return

        const updatedDoc = { ...doc, ...data, updatedAt: Date.now() }
        await putDoc(updatedDoc)

        set((state) => ({
          docs: sortDocs(state.docs.map((n) => (n.id === id ? updatedDoc : n))),
          activeId: id,
        }))
      },
      deleteDoc: async (id) => {
        await delDoc(id)

        const state = get()
        const idx = state.docs.findIndex((n) => n.id === id)
        let next = state.docs.filter((n) => n.id !== id)
        let nextActive = state.activeId

        if (state.activeId === id) {
          if (next.length === 0) {
            const newDoc = await createEmptyDoc()
            next = [newDoc]
            nextActive = newDoc.id
          } else if (idx < next.length) {
            nextActive = next[idx].id
          } else {
            nextActive = next[0].id
          }
        }

        set({ docs: next, activeId: nextActive })
      },
      setActive: (id) => set({ activeId: id ?? null }),
    },
  }
})

export const useDoc = (id?: string | null) =>
  useDocsStore((state) => state.docs.find((n) => n.id === id))

export const useDocActive = () => useDocsStore((state) => state.activeId)

export const useDocs = () => useDocsStore((state) => state.docs)

export const useDocsActions = () => useDocsStore((state) => state.actions)
