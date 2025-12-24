import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './styles/globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin', 'cyrillic'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'Редактус',
  description: 'Редактус',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={geistSans.variable} suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="isolate">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
