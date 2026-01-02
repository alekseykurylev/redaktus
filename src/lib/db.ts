import { Dexie, type EntityTable } from 'dexie'
import type { Doc, Content } from './types'

const db = new Dexie('RedaktusDB') as Dexie & {
  docs: EntityTable<Doc, 'id'>
  contents: EntityTable<Content, 'id'>
}

db.version(1).stores({
  docs: 'id, updatedAt, title',
  contents: 'id',
})

export { db }
