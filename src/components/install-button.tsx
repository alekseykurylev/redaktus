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

  //   return (
  //     <Card className="gap-2 py-4 shadow-none">
  //       <CardHeader className="px-4">
  //         <CardTitle className="text-sm">Установить приложение</CardTitle>
  //         <CardDescription>Быстрый доступ и работа без браузера.</CardDescription>
  //       </CardHeader>
  //       <CardContent className="px-4">
  //         <Button
  //           disabled={!canInstall}
  //           onClick={install}
  //           className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
  //           size="sm"
  //         >
  //           Установить приложение
  //         </Button>
  //       </CardContent>
  //     </Card>
  //   )
}
