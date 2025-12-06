import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '700'],
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
    <html lang="ru" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}>
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
