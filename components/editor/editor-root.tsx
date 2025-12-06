import React, { useMemo } from 'react'
import { useEditor, EditorContext } from '@tiptap/react'
import { CharacterCount } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { useDebouncedCallback } from 'use-debounce'
import { useDocsActions, useDocs } from '@/lib/store'
import type { Doc } from '@/lib/types'
import { getDocTitle } from '@/lib/helpers'

export function EditorRoot({ doc, children }: { doc: Doc; children: React.ReactNode }) {
  const { updateDoc, deleteDoc } = useDocsActions()
  const docs = useDocs()

  const debouncedUpdate = useDebouncedCallback((title, content) => {
    updateDoc(doc.id, { title, content }).catch()
  }, 200)

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    autofocus: 'start',
    editorProps: {
      handlePaste: (view, event) => {
        event.preventDefault()
        const text = event.clipboardData?.getData('text/plain') || ''
        view.dispatch(view.state.tr.insertText(text))
        return true
      },
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
      },
    },
    content: doc.content,
    onUpdate({ editor }) {
      const content = editor.getJSON()
      const title = getDocTitle(editor)
      debouncedUpdate(title, content)
    },
    onFocus: () => {
      if (docs[0].id !== doc.id && docs[0].title?.length === 0) {
        deleteDoc(docs[0].id).catch()
      }
    },
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="flex h-full min-h-0 flex-col">{children}</div>
    </EditorContext.Provider>
  )
}
