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
      className={cx('root flex h-screen overflow-hidden p-3', className)}
      defaultOpen={!isMobile}
      {...props}
    />
  )
}
AppShellRoot.displayName = 'AppShell.Root'

function AppShellHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="app-shell-header" className={cx('px-4 pb-4', className)} {...props} />
}
AppShellHeader.displayName = 'AppShell.Header'

function AppShellSidebar({ className, ...props }: ComponentProps<typeof Collapsible.Panel>) {
  return (
    <Collapsible.Panel
      data-slot="app-shell-sidebar"
      className="w-[--collapsible-panel-width] transition-all ease-out data-ending-style:w-0 data-starting-style:w-0"
    >
      <div
        className={cx('flex h-full w-64 shrink-0 flex-col overflow-hidden p-4', className)}
        {...props}
      />
    </Collapsible.Panel>
  )
}
AppShellSidebar.displayName = 'AppShell.Sidebar'

function AppShellList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="app-shell-list" className={cx('grow overflow-y-auto', className)} {...props} />
  )
}
AppShellList.displayName = 'AppShell.List'

function AppShellFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="app-shell-footer" className={cx('pt-4', className)} {...props} />
}
AppShellFooter.displayName = 'AppShell.Footer'

function AppShellDoc({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="app-shell-doc"
      className={cx(
        'z-10 flex h-full w-full flex-col rounded-2xl bg-zinc-900 ring ring-white/10 max-md:min-w-full',
        className,
      )}
      {...props}
    />
  )
}
AppShellDoc.displayName = 'AppShell.Doc'

export {
  AppShellRoot as Root,
  AppShellSidebar as Sidebar,
  AppShellHeader as Header,
  AppShellList as List,
  AppShellFooter as Footer,
  AppShellDoc as Doc,
}
