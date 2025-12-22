import { cx } from '@/lib/cva'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cx('animate-pulse rounded-xl bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
