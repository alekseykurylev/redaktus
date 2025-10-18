"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Menubar } from "@/components/menubar";

export const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    // content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  return (
    <div className="bg-white w-full">
      <div className="h-16 flex items-center px-6">
        <Menubar editor={editor} />
      </div>

      <EditorContent
        editor={editor}
        className="h-[calc(100%-(--spacing(28)))] *:px-6 *:h-full overflow-y-auto"
      />
      <div className="h-12 flex items-center px-6 ">123213</div>
    </div>
  );
};
