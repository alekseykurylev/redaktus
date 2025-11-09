import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold">Редактус</h1>
      <Link href="/promo" className="text-blue-500">
        page
      </Link>
    </div>
  )
}
