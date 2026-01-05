import { db } from "@/lib/db"
import { useLiveQuery } from "dexie-react-hooks"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { IconDots, IconFile } from "@tabler/icons-react"
import { Link, useParams } from "@tanstack/react-router"
import { DocMenu } from "./doc-menu"

export function NavDocs() {
  const docs = useLiveQuery(() => db.docs.orderBy("updatedAt").reverse().toArray())
  const params = useParams({ from: "/$docId", shouldThrow: false })

  const { isMobile } = useSidebar()

  if (docs?.length === 0) return null

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* <SidebarGroupLabel>Favorites</SidebarGroupLabel> */}
      <SidebarMenu>
        {docs?.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              isActive={params?.docId === item.id}
              render={<Link to="/$docId" params={{ docId: item.id }} title={item.title} />}
            >
              <span>{item.emoji || <IconFile />}</span>
              <span>{item.title || "Без названия"}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction showOnHover>
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                }
              />
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DocMenu doc={item} />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
