import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Playora - Instant Games',
  description: 'Play instant games without downloads or login.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="antialiased min-h-screen flex flex-col bg-background text-foreground font-sans"
      >
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
