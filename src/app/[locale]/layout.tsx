import { Cairo, Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/providers'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
})
const cairo = Cairo({ 
  subsets: ['arabic'], 
  variable: '--font-cairo',
  display: 'swap'
})

export const metadata = {
  title: 'Noble Drip - Enterprise Coffee Platform',
  description: 'Your trusted partner for premium coffee in Egypt',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  const isRTL = locale === 'ar'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} ${isRTL ? 'font-arabic' : 'font-sans'} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </Providers>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}