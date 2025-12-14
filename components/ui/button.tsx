import type { ComponentProps } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cx } from '@/lib/cva'

export function Button({ className, ...props }: ComponentProps<typeof ButtonPrimitive>) {
  return <ButtonPrimitive className={cx(className)} {...props} />
}
