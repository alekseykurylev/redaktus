import { type SVGProps } from "react"

export function IconLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" fill="none" {...props}>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={3.177}
        d="M17.123 7.657c-2.761.124-5.47.426-8.111.732-3.049.353-5.487 2.79-5.827 5.839-.383 3.428-.753 6.97-.753 10.594 0 3.624.37 7.166.753 10.594.34 3.05 2.778 5.487 5.826 5.84 3.445.398 7.004.79 10.646.79 3.642 0 7.2-.392 10.645-.79 3.049-.353 5.486-2.79 5.827-5.84.276-2.465.544-4.99.673-7.562"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.177}
        d="M32.114 4.138 20.407 17.422l-1.604 7.543c-.258 1.213 1.007 2.362 2.192 1.99l7.506-2.36L40.593 11.87c2.008-2.113 1.658-5.648-.773-7.798-2.374-2.1-5.824-2.07-7.706.065Z"
      />
    </svg>
  )
}
