import type { ComponentProps } from 'react'
import { Separator as SeparatorPrimitive } from '@base-ui-components/react/separator'
import { cx } from '@/lib/cva'

export function Separator({
  orientation,
  className,
  ...props
}: ComponentProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      className={cx(
        'w-px bg-border',
        orientation === 'vertical' && 'w-px',
        orientation === 'horizontal' && 'h-px',
        className,
      )}
      orientation={orientation}
      {...props}
    />
  )
}
