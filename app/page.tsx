import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold">Редактус</h1>
      <p className="text-5xl">Whereas a common understanding of these rights and freedoms is</p>
      <Link href="/promo" className="text-blue-500">
        page
      </Link>
    </div>
  )
}
