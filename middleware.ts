import createMiddleware from 'next-intl/middleware'

const locales = ['ar', 'en']
const defaultLocale = 'ar'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}
