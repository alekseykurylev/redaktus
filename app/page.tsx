import { Editor } from "@/components/editor";
import { AppShell } from "@/components/ui";

export default function Home() {
  return (
    <AppShell.Root>
      <AppShell.Bar>
        <div>123</div>
        <div>1</div>
      </AppShell.Bar>
      <AppShell.Notes>
        <AppShell.SideBar>
          <AppShell.Header>
            <div className="text-2xl">Заметкус</div>
            <button type="button" className="border">
              Новая заметка
            </button>
          </AppShell.Header>
          <AppShell.List>
            <div className="h-16 border p-3">12123123</div>
            <div className="h-16 border p-3">12123123</div>
            <div className="h-16 border p-3">12123123</div>
            <div className="h-16 border p-3">12123123</div>
            <div className="h-16 border p-3">12123123</div>
            <div className="h-16 border p-3">12123123</div>
          </AppShell.List>
        </AppShell.SideBar>
        <AppShell.Note>
          <Editor.Root>
            <Editor.Toolbar />
            <Editor.Content />
            <Editor.Footer />
          </Editor.Root>
        </AppShell.Note>
      </AppShell.Notes>
    </AppShell.Root>
  );
}
