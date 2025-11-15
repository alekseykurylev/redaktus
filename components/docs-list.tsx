import { useDocs, useDocActive, useDocsActions } from '@/lib/store'
import { cx } from '@/lib/cva'

export function DocsList() {
  const docs = useDocs()
  const activeId = useDocActive()
  const { setActive } = useDocsActions()

  return (
    <div className="flex flex-col">
      {docs.map((doc) => (
        <button
          key={doc.id}
          type="button"
          onClick={() => setActive(doc.id)}
          className={cx(
            'space-y-1 rounded-md bg-transparent p-4 text-left',
            'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-500',
            doc.id === activeId && 'bg-white/5',
          )}
        >
          <div className="line-clamp-2">{doc.title || 'Без названия'}</div>
          <div className="text-sm text-zinc-400">{new Date(doc.updatedAt).toLocaleString()}</div>
        </button>
      ))}
    </div>
  )
}
