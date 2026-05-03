import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { AppProvider } from '@/context/AppContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CompareBar } from '@/components/CompareBar'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Rentopia — Duy Legacy Ventures | NYC Luxury Rentals' },
      { name: 'description', content: 'Premium NYC rental listings curated by Duy Legacy Ventures LLC, a Rentopia affiliate. Find your perfect home in Brooklyn, Manhattan, Queens & beyond.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AppProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
          <CompareBar />
        </AppProvider>
        <Scripts />
      </body>
    </html>
  )
}
