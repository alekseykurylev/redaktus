"use client";

import { useRouter } from "next/navigation";
import { useNoteActions, useNotes } from "@/store/notes";

export function CreateNoteButton() {
  const router = useRouter();
  const { addNote } = useNoteActions();
  const notes = useNotes();

  const handleCreate = () => {
    const lastNote = notes[0];
    const isLastNote = lastNote && !lastNote.title && !lastNote.content;

    if (!isLastNote) {
      const note = addNote();
      router.push(`/notes/${note.id}`);
    }
  };

  return (
    <button type="button" className="border" onClick={handleCreate}>
      Новая заметка
    </button>
  );
}
