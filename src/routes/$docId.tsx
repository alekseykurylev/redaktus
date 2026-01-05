import * as React from "react"
import { Editor, EditorBody, EditorToolbar } from "@/components/editor"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { createFileRoute, notFound } from "@tanstack/react-router"
import { db } from "@/lib/db"
import { DocTitle } from "@/components/doc-title"
import { DocMenu } from "@/components/doc-menu"
import { formatSmartDate } from "@/lib/helpers"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IconDots } from "@tabler/icons-react"
import { DocEmoji } from "@/components/doc-emoji"

export const Route = createFileRoute("/$docId")({
  loader: async ({ params }) => {
    const doc = await db.docs.get(params.docId)
    const content = await db.contents.get(params.docId)

    if (!doc) throw notFound()
    return { doc, content }
  },
  component: EditorComponent,
  notFoundComponent: () => {
    return <p>!!!404 Not found</p>
  },
})

function EditorComponent() {
  const { doc, content } = Route.useLoaderData()

  if (!doc || !content) return null

  return (
    <React.Fragment key={doc.id}>
      <Editor id={content.id} content={content.data}>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <EditorToolbar />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <div className="text-sm">{formatSmartDate(doc.updatedAt)}</div>
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-sm">
                    <IconDots />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-56 rounded-lg">
                <DocMenu doc={doc} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 px-4 py-10">
          <div className="mx-auto w-full max-w-3xl space-y-3">
            <DocEmoji id={doc.id} icon={doc.emoji} />
            <DocTitle id={doc.id} title={doc.title} />
          </div>
          <div className="mx-auto h-full w-full max-w-3xl">
            <EditorBody />
          </div>
        </div>
      </Editor>
    </React.Fragment>
  )
}
