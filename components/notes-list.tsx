"use client";

import { useRouter } from "next/navigation";
import { type Note, useNoteActions, useNotes } from "@/store/notes";

export function NotesList() {
  const notes = useNotes();
  return (
    <ul>
      {notes.map((note) => (
        <NotesListItem key={note.id} item={note} />
      ))}
    </ul>
  );
}

export function NotesListItem({ item }: { item: Note }) {
  const { deleteNote } = useNoteActions();
  const router = useRouter();

  const handleRemove = () => {
    deleteNote(item.id);
    router.push(`/notes/`);
  };

  return (
    <li>
      <div>{!item.title ? "Без названия" : item.title}</div>
      <button type="button" onClick={handleRemove}>
        remove
      </button>
    </li>
  );
}
