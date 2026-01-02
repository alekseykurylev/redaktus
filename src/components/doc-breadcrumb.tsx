import { useLiveQuery } from "dexie-react-hooks"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "./ui/breadcrumb"
import { db } from "@/lib/db"

export function DocBreadcrumb({ id }: { id: string }) {
  const doc = useLiveQuery(() => db.docs.get(id))

  if (!doc) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">{doc.title || "Без названия"}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
