import { IconPlus, IconSearch } from '@tabler/icons-react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { useDocActions } from '@/hooks/use-doc-actions'

export function NavMain() {
  const { handleAddDoc } = useDocActions()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={handleAddDoc}>
          <IconPlus />
          <span>Создать</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <IconSearch />
          <span>Поиск</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
