"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconLogo } from "@/components/icon-logo"
import { NavDocs } from "./nav-docs"
import { NavMain } from "./nav-main"
import { Link } from "@tanstack/react-router"
import { NavSecondary } from "./nav-secondary"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <IconLogo className="size-5" />
              </div>
              <div className="text-2xl font-bold">Редактус</div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain />
      </SidebarHeader>

      <SidebarContent>
        <NavDocs />
      </SidebarContent>
      <SidebarFooter>
        <NavSecondary />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
