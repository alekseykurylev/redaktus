import { useNavigate } from "@tanstack/react-router"
import type { EditorContentJSON } from "@/lib/types"
import { db } from "@/lib/db"

const EMPTY_DOC: EditorContentJSON = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
}

export function useDocActions() {
  const navigate = useNavigate()

  async function handleAddDoc() {
    const id = crypto.randomUUID()
    const now = new Date()

    try {
      await db.transaction("rw", db.docs, db.contents, async () => {
        await db.docs.add({
          id,
          title: "",
          updatedAt: now,
        })

        await db.contents.add({
          id,
          data: EMPTY_DOC,
        })
      })

      navigate({
        to: "/$docId",
        params: { docId: id },
      })
    } catch (error) {
      console.error("Failed to create document", error)
    }
  }

  async function handleDeleteDoc(id: string) {
    try {
      let nextDocId: string | null = null

      await db.transaction("rw", db.docs, db.contents, async () => {
        await db.docs.delete(id)
        await db.contents.delete(id)

        const docs = await db.docs.orderBy("updatedAt").reverse().toArray()

        nextDocId = docs[0]?.id ?? null
      })

      if (nextDocId) {
        navigate({
          to: "/$docId",
          params: { docId: nextDocId },
        })
      } else {
        navigate({ to: "/" })
      }
    } catch (error) {
      console.error("Failed to delete document", error)
    }
  }

  async function handleSaveTitle(id: string, title: string) {
    const now = new Date()

    try {
      await db.docs.update(id, { title, updatedAt: now })
    } catch (error) {
      console.error("Failed to save title", error)
    }
  }

  async function handleSaveContent(id: string, content: EditorContentJSON) {
    const now = new Date()
    // const title = content.slice(0, 50).replace(/\n/g, " ")
    // console.log(title)

    try {
      await db.transaction("rw", db.contents, db.docs, async () => {
        await db.contents.update(id, { data: content })
        await db.docs.update(id, { updatedAt: now })
      })
    } catch (error) {
      console.error("Failed to save content", error)
    }
  }

  return {
    handleAddDoc,
    handleDeleteDoc,
    handleSaveTitle,
    handleSaveContent,
  }
}
