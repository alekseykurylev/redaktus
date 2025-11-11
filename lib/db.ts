import { openDB, type DBSchema } from 'idb'
import type { Doc } from '@/lib/types'

const DB_NAME = 'docs-db'
const STORE = 'docs'
const DB_VERSION = 1

interface DocsDB extends DBSchema {
  [STORE]: {
    key: string
    value: Doc
    indexes: { 'by-updatedAt': number }
  }
}

const dbPromise = openDB<DocsDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE)) {
      const store = db.createObjectStore(STORE, { keyPath: 'id' })
      store.createIndex('by-updatedAt', 'updatedAt')
    }
  },
})

export async function getAllDocs() {
  const db = await dbPromise
  return await db.getAll(STORE)
}

export async function putDoc(doc: Doc) {
  const db = await dbPromise
  await db.put(STORE, doc)
}

export async function delDoc(id: string) {
  const db = await dbPromise
  await db.delete(STORE, id)
}
