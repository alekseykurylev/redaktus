import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import { CharacterCount } from '@tiptap/extensions'
import StarterKit from '@tiptap/starter-kit'
import { useDebouncedCallback } from 'use-debounce'
import { useDocsActions, useDocs } from '@/lib/store'
import type { Doc } from '@/lib/types'
import { getDocTitle } from '@/lib/helpers'

interface EditorRootContext {
  editor: Editor
}

const EditorRootContext = React.createContext<EditorRootContext | undefined>(undefined)

function useEditorRootContext() {
  const context = React.useContext(EditorRootContext)
  if (context === undefined) {
    throw new Error('Editor parts must be placed within <Editor.Root>.')
  }
  return context
}

function EditorRoot({ note }: { note: Doc }) {
  const { updateDoc, deleteDoc } = useDocsActions()
  const docs = useDocs()

  const debouncedUpdate = useDebouncedCallback((title, content) => {
    updateDoc(note.id, { title, content }).catch()
  }, 200)

  const editor = useEditor({
    extensions: [StarterKit, CharacterCount],
    immediatelyRender: true,
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
    content: note.content,
    onUpdate({ editor }) {
      const content = editor.getJSON()
      const title = getDocTitle(editor)
      debouncedUpdate(title, content)
    },
    onFocus: () => {
      if (docs[0].id !== note.id && docs[0].title?.length === 0) {
        deleteDoc(docs[0].id).catch()
      }
    },
  })

  return <EditorRootContext.Provider value={{ editor }} />
}
EditorRoot.displayName = 'Editor.Root'

function EditorToolbar() {
  return 123
}
EditorToolbar.displayName = 'Editor.Toolbar'

function EditorBody() {
  const { editor } = useEditorRootContext()
  return <EditorContent editor={editor} />
}
EditorBody.displayName = 'Editor.Body'

function EditorFooter() {
  return 123
}
EditorFooter.displayName = 'Editor.Footer'

export { EditorRoot as Root, EditorToolbar as Toolbar, EditorBody as Body, EditorFooter as Footer }
