import { IconArrowUpRight, IconDots, IconStarOff, IconTrash } from "@tabler/icons-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useDocActions } from "@/hooks/use-doc-actions"

export function DocMenu({ id }: { id: string }) {
  const { handleDeleteDoc } = useDocActions()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm">
            <IconDots />
            <span className="sr-only">More</span>
          </Button>
        }
      />
      <DropdownMenuContent className="w-56 rounded-lg">
        <DropdownMenuItem>
          <IconStarOff className="text-muted-foreground" />
          <span>Remove from Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconArrowUpRight className="text-muted-foreground" />
          <span>Open in New Tab</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await handleDeleteDoc(id)}>
          <IconTrash className="text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
