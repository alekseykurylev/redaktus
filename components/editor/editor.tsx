"use client";

import {
  type Editor,
  EditorContent as EditorContentBase,
  type UseEditorOptions,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { type ComponentProps, type ReactNode } from "react";
import { cx } from "@/lib/cva";

interface EditorRootContext {
  editor: Editor | null;
}

const EditorRootContext = React.createContext<EditorRootContext | undefined>(
  undefined,
);

function useEditorRootContext() {
  const value = React.useContext(EditorRootContext);
  if (value === undefined) {
    throw new Error(
      "EditorRootContext is missing. Editor parts must be placed within <Editor.Root>.",
    );
  }

  return value;
}

const EditorRoot = ({
  className,
  children,
  ...options
}: UseEditorOptions & { className?: string; children: ReactNode }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    ...options,
  });

  return (
    <EditorRootContext.Provider value={{ editor }}>
      <div className={cx("h-full flex flex-col", className)}>{children}</div>
    </EditorRootContext.Provider>
  );
};
EditorRoot.displayName = "Editor.Root";

const EditorToolbar = ({ className }: { className?: string }) => {
  const { editor } = useEditorRootContext();
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
EditorToolbar.displayName = "Editor.Toolbar";

const EditorContent = ({ className }: { className?: string }) => {
  const { editor } = useEditorRootContext();
  return (
    <EditorContentBase
      className={cx("grow *:px-6 *:h-full overflow-y-auto", className)}
      editor={editor}
    />
  );
};
EditorContent.displayName = "Editor.Content";

const EditorFooter = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cx("flex items-center px-6 text-xs py-4", className)}
      {...props}
    >
      123213
    </div>
  );
};
EditorFooter.displayName = "Editor.Footer";

export {
  EditorRoot as Root,
  EditorToolbar as Toolbar,
  EditorContent as Content,
  EditorFooter as Footer,
};
