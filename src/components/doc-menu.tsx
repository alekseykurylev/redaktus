import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { useDocActions } from "@/hooks/use-doc-actions"
import type { Doc } from "@/lib/types"
import { IconTrash } from "@tabler/icons-react"

export function DocMenu({ doc }: { doc: Doc }) {
  const { handleDeleteDoc } = useDocActions()

  return (
    <>
      <DropdownMenuItem onClick={async () => await handleDeleteDoc(doc.id)}>
        <IconTrash className="text-muted-foreground" />
        <span>Удалить</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        Последнее изменение
        <br />
        {new Date(doc.updatedAt).toLocaleString()}
      </div>
    </>
  )
}
