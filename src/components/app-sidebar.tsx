'use client'

import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavDocs } from './nav-docs'
import { NavMain } from './nav-main'
import { Link } from '@tanstack/react-router'
import { NavSecondary } from './nav-secondary'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link to="/" />}>
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
      <SidebarRail />
    </Sidebar>
  )
}
