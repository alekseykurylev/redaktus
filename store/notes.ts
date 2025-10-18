"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateNoteId } from "@/lib/helpers";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};

type NotesState = {
  notes: Note[];
  actions: {
    addNote: () => void;
    updateNote: (id: string, data: Partial<Note>) => void;
    deleteNote: (id: string) => void;
  };
};

const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      actions: {
        addNote: () => {
          const newNote: Note = {
            id: generateNoteId(),
            title: "Без названия",
            content: "",
            createdAt: Date.now(),
          };

          set((state) => ({
            notes: [...state.notes, newNote].sort(
              (a, b) => b.createdAt - a.createdAt,
            ),
          }));

          return newNote;
        },
        updateNote: (id, data) =>
          set((state) => ({
            notes: state.notes.map((n) =>
              n.id === id ? { ...n, ...data } : n,
            ),
          })),
        deleteNote: (id) =>
          set((state) => ({
            notes: state.notes.filter((n) => n.id !== id),
          })),
      },
    }),
    {
      name: "zametkus",
      partialize: (state) => ({ notes: state.notes }),
    },
  ),
);

export const useNotes = () => useNotesStore((state) => state.notes);

export const useNote = (id: string) =>
  useNotesStore((state) => state.notes.find((n) => n.id === id));

export const useNoteActions = () => useNotesStore((state) => state.actions);
