import { type ComponentProps } from 'react'
import { Collapsible } from '@base-ui-components/react/collapsible'
import { cx } from '@/lib/cva'
import { useIsMobile } from '@/lib/hooks'

function AppShellRoot({ className, ...props }: ComponentProps<typeof Collapsible.Root>) {
  const isMobile = useIsMobile()

  return (
    <Collapsible.Root
      key={isMobile ? 'mobile' : 'other'}
      data-slot="app-shell"
      className={cx('root flex h-screen bg-sidebar', className)}
      defaultOpen={!isMobile}
      {...props}
    />
  )
}
AppShellRoot.displayName = 'AppShell.Root'

function AppShellHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="app-shell-header" className={cx('p-4', className)} {...props} />
}
AppShellHeader.displayName = 'AppShell.Header'

function AppShellSidebar({ className, ...props }: ComponentProps<typeof Collapsible.Panel>) {
  return (
    <Collapsible.Panel
      data-slot="app-shell-sidebar"
      className="w-[--collapsible-panel-width] transition-all ease-out data-ending-style:w-0 data-starting-style:w-0"
    >
      <div
        className={cx('flex h-full min-h-0 w-64 shrink-0 flex-col p-3 pr-0', className)}
        {...props}
      />
    </Collapsible.Panel>
  )
}
AppShellSidebar.displayName = 'AppShell.Sidebar'

function AppShellList({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="app-shell-list" className={cx('min-h-0 flex-1', className)} {...props} />
}
AppShellList.displayName = 'AppShell.List'

function AppShellFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="app-shell-footer" className={cx('p-2', className)} {...props} />
}
AppShellFooter.displayName = 'AppShell.Footer'

function AppShellBody({ className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="app-shell-body" className={cx('z-10 w-full p-3', className)} {...props}>
      <div className="flex h-full w-full flex-col rounded-2xl bg-background ring ring-border max-md:min-w-full">
        {children}
      </div>
    </div>
  )
}
AppShellBody.displayName = 'AppShell.Body'

export {
  AppShellRoot as Root,
  AppShellSidebar as Sidebar,
  AppShellHeader as Header,
  AppShellList as List,
  AppShellFooter as Footer,
  AppShellBody as Body,
}
