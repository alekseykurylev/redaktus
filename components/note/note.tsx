"use client";

import {
  type Editor,
  EditorContent,
  type UseEditorOptions,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { type ComponentProps, type ReactNode, useEffect } from "react";
import { cx } from "@/lib/cva";
import { useNote, useNoteActions } from "@/store/notes";

interface EditorRootContext {
  id: string;
  editor: Editor | null;
}

const EditorRootContext = React.createContext<EditorRootContext | undefined>(
  undefined,
);

function useNoteRootContext() {
  const value = React.useContext(EditorRootContext);
  if (value === undefined) {
    throw new Error(
      "NoteRootContext is missing. Editor parts must be placed within <Note.Root>.",
    );
  }
  return value;
}

const NoteRoot = ({
  id,
  className,
  children,
  ...options
}: UseEditorOptions & {
  id: string;
  className?: string;
  children: ReactNode;
}) => {
  const note = useNote(id);
  const { updateNote } = useNoteActions();

  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    onUpdate: ({ editor }) => {
      updateNote(id, editor.getJSON());
    },
    ...options,
  });

  useEffect(() => {
    editor?.commands.setContent(note?.content ?? "");
  }, [note, editor]);

  return (
    <EditorRootContext.Provider value={{ id, editor }}>
      <div className={cx("h-full flex flex-col", className)}>{children}</div>
    </EditorRootContext.Provider>
  );
};
NoteRoot.displayName = "Note.Root";

const NoteToolbar = ({ className }: { className?: string }) => {
  const { editor } = useNoteRootContext();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });
  return (
    <div className={cx("py-4 flex items-center px-6", className)}>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editorState?.canBold}
        className={editorState?.isBold ? "is-active" : ""}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
      >
        Clear marks
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().clearNodes().run()}
      >
        Clear nodes
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editorState?.canUndo}
      >
        Undo
      </button>
      <button
        type="button"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editorState?.canRedo}
      >
        Redo
      </button>
    </div>
  );
};
NoteToolbar.displayName = "Note.Toolbar";

const NoteTitle = ({ className }: { className?: string }) => {
  // const { id } = useNoteRootContext();
  // const { updateNote } = useNoteActions();
  //
  // const handleChange = (value: string) => {
  //   updateNote(id, { title: value });
  // };

  return (
    <div className={cx("px-6", className)}>
      <input
        name="title"
        className="border"
        placeholder="Название"
        // onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
NoteTitle.displayName = "Note.Title";

const NoteEditor = ({ className }: { className?: string }) => {
  const { editor } = useNoteRootContext();
  return (
    <EditorContent
      editor={editor}
      role="presentation"
      className={cx("grow *:px-6 *:h-full overflow-y-auto", className)}
    />
  );
};
NoteEditor.displayName = "Note.Editor";

const NoteFooter = ({ className, ...props }: ComponentProps<"div">) => {
  // const { editor } = useNoteRootContext();
  // const wordsCount = editor?.storage.characterCount.words({});
  return (
    <div
      className={cx("flex items-center px-6 text-xs py-4", className)}
      {...props}
    >
      {/*{wordsCount}*/}
    </div>
  );
};
NoteFooter.displayName = "Note.Footer";

export {
  NoteRoot as Root,
  NoteToolbar as Toolbar,
  NoteTitle as Title,
  NoteEditor as Editor,
  NoteFooter as Footer,
};
