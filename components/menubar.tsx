import { type Editor, useEditorState } from "@tiptap/react";

export function Menubar({ editor }: { editor: Editor | null }) {
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
    <div className="flex gap-2">
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
}
