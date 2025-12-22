'use client'

import * as React from 'react'
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { cx } from '@/lib/cva'

function SheetRoot({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}
SheetRoot.displayName = 'Sheet.Root'

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}
SheetTrigger.displayName = 'Sheet.Trigger'

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}
SheetClose.displayName = 'Sheet.Close'

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}
SheetPortal.displayName = 'Sheet.Portal'

function SheetBackdrop({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-backdrop"
      className={cx(
        'fixed inset-0 z-50 min-h-dvh bg-black/80 duration-100 data-closed:animate-out data-closed:fade-out-0 data-ending-style:opacity-0 data-open:animate-in data-open:fade-in-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      {...props}
    />
  )
}
SheetBackdrop.displayName = 'Sheet.Backdrop'

function SheetPopup({
  className,
  children,
  side = 'left',
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetBackdrop />
      <SheetPrimitive.Popup
        data-slot="sheet-popup"
        data-side={side}
        className={cx(
          'fixed z-50 flex flex-col bg-background bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-closed:animate-out data-closed:fade-out-0 data-open:animate-in data-open:fade-in-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-closed:slide-out-to-left-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-closed:slide-out-to-right-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-closed:slide-out-to-top-10 data-[side=top]:data-open:slide-in-from-top-10 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" className="absolute top-4 right-4" size="icon-sm" />}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}
SheetPopup.displayName = 'Sheet.Popup'

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cx('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}
SheetHeader.displayName = 'Sheet.Header'

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cx('mt-auto flex flex-col gap-2 p-6', className)}
      {...props}
    />
  )
}
SheetFooter.displayName = 'Sheet.Footer'

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cx('text-base font-semibold text-foreground', className)}
      {...props}
    />
  )
}
SheetTitle.displayName = 'Sheet.Title'

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cx('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
SheetDescription.displayName = 'Sheet.Description'

export {
  SheetRoot as Root,
  SheetTrigger as Trigger,
  SheetClose as Close,
  SheetPopup as Popup,
  SheetHeader as Header,
  SheetFooter as Footer,
  SheetTitle as Title,
  SheetDescription as Description,
}
