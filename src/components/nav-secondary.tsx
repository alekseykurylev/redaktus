import { IconSend, IconSettings } from "@tabler/icons-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { useTheme } from "./theme-provider"
import { InstallButton } from "./install-button"

export function NavSecondary() {
  const { setTheme, theme } = useTheme()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <IconSettings />
              <span>Настройки</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <a
                  target="_blank"
                  href="https://max.ru/u/f9LHodD0cOIx_VDfFdQXq-lJui_lzCsnD5DP9ojaeVQuU2sE0OX5g0ZJMvU"
                />
              }
            >
              <IconSend />
              <span>Обратная связь</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <InstallButton />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
