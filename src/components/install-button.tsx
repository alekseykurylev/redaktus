import usePwa from "use-pwa"
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { IconAppsFilled } from "@tabler/icons-react"

export function InstallButton() {
  const { canInstall, install, isInstalled, isSupported } = usePwa()

  if (!isSupported || isInstalled) return null

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={install} disabled={!canInstall}>
        <IconAppsFilled />
        <span>Установить приложение</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
