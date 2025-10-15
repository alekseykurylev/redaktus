"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "@/components/menubar";

export const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  return (
    <div className="w-dvw h-dvh  flex flex-col">
      <Menubar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex h-full flex-col max-w-3xl mx-auto w-full *:grow *:p-12 *:bg-red-50"
      />
    </div>
  );
};
