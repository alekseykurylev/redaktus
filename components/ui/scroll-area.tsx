import type { ComponentProps } from 'react'
import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'
import { cx } from '@/lib/cva'

function ScrollAreaRoot({ className, ...props }: ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cx('h-full', className)}
      {...props}
    />
  )
}
ScrollAreaRoot.displayName = 'ScrollArea.Root'

function ScrollAreaViewport({
  className,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cx('h-full overscroll-contain', className)}
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
      className={cx(
        'pointer-events-none m-2 flex w-1 justify-center rounded opacity-0 transition-opacity delay-300 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-75 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-75',
        className,
      )}
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
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      className={cx('w-full rounded bg-border', className)}
      {...props}
    />
  )
}
ScrollAreaRoot.displayName = 'ScrollArea.Thumb'

export {
  ScrollAreaRoot as Root,
  ScrollAreaViewport as Viewport,
  ScrollAreaScrollbar as Scrollbar,
  ScrollAreaThumb as Thumb,
}
