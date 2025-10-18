import { CreateNoteButton } from "@/components/create-note-button";
import { NotesList } from "@/components/notes-list";
import { AppShell } from "@/components/ui";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell.Root>
      <AppShell.Bar>
        <div>123</div>
        <div>1</div>
      </AppShell.Bar>
      <AppShell.Notes>
        <AppShell.SideBar>
          <AppShell.Header>
            <h1 className="text-2xl mb-2">Заметкус</h1>
            <CreateNoteButton />
          </AppShell.Header>
          <AppShell.List>
            <NotesList />
          </AppShell.List>
        </AppShell.SideBar>
        <AppShell.Note>{children}</AppShell.Note>
      </AppShell.Notes>
    </AppShell.Root>
  );
}
