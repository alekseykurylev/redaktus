import type { ComponentProps } from 'react'
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui-components/react/scroll-area'
import { cx } from '@/lib/cva'

function ScrollAreaRoot({ className, ...props }: ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cx(className)} {...props} />
}
ScrollAreaRoot.displayName = 'ScrollArea.Root'

function ScrollAreaViewport({
  className,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cx(className)}
      {...props}
    />
  )
}
ScrollAreaRoot.displayName = 'ScrollArea.Viewport'

function ScrollAreaScrollbar({
  className,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      className={cx(className)}
      {...props}
    />
  )
}
ScrollAreaRoot.displayName = 'ScrollArea.Scrollbar'

function ScrollAreaThumb({
  className,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Thumb>) {
  return (
    <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" className={cx(className)} {...props} />
  )
}
ScrollAreaRoot.displayName = 'ScrollArea.Thumb'

export {
  ScrollAreaRoot as Root,
  ScrollAreaViewport as Viewport,
  ScrollAreaScrollbar as Scrollbar,
  ScrollAreaThumb as Thumb,
}
