import { db } from "@/lib/db"
import { IconFile } from "@tabler/icons-react"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  loader: async () => {
    const docs = await db.docs.orderBy("updatedAt").reverse().toArray()
    return docs
  },
  component: App,
})

function App() {
  const docs = Route.useLoaderData()

  return (
    <div className="text-center">
      <div className="flex min-h-screen flex-col justify-center">
        <div className="mx-auto w-full max-w-3xl">
          <div className="text-3xl">Привет! 👋</div>
          <ul>
            {docs?.map((item) => (
              <li key={item.id}>
                <Link to="/$docId" params={{ docId: item.id }} title={item.title}>
                  <span>{item.emoji || <IconFile />}</span>
                  <span>{item.title || "Без названия"}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
