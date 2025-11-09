import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="/promo" className="text-blue-500">
        Promo
      </Link>
    </div>
  )
}
