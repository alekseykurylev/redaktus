import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useDocActions } from "@/hooks/use-doc-actions"
import { db } from "@/lib/db"
import { formatDocDate } from "@/lib/helpers"
import { IconFile, IconPlus } from "@tabler/icons-react"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  loader: async () => {
    return db.docs.orderBy("updatedAt").reverse().limit(5).toArray()
  },
  component: App,
})

function App() {
  const docs = Route.useLoaderData()
  const { handleAddDoc } = useDocActions()

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </header>
      <div className="flex flex-1 flex-col gap-6 px-4 py-10">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 text-3xl">Привет! 👋</div>
          <div className="flex w-full max-w-xl flex-col gap-6">
            <ItemGroup className="grid grid-cols-3 gap-4">
              {docs?.map((item) => (
                <Item
                  key={item.id}
                  variant="outline"
                  render={<Link to="/$docId" params={{ docId: item.id }} title={item.title} />}
                >
                  <ItemHeader>{item.emoji || <IconFile />}</ItemHeader>
                  <ItemContent>
                    <ItemTitle className="line-clamp-2">{item.title || "Без названия"}</ItemTitle>
                    <ItemDescription>{formatDocDate(item.updatedAt)}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
              <Item
                variant="outline"
                render={<button onClick={handleAddDoc} />}
                className="cursor-pointer"
              >
                <ItemHeader>
                  <IconPlus />
                </ItemHeader>
                <ItemContent>
                  <ItemTitle className="line-clamp-2">Создать</ItemTitle>
                </ItemContent>
              </Item>
            </ItemGroup>
          </div>
        </div>
      </div>
    </>
  )
}
