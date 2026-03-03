import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const locales = ['ar', 'en']
const defaultLocale = 'ar'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip proxy for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(request)
  }

  // Apply i18n middleware
  const response = intlMiddleware(request)

  // Check if it's a dashboard route
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/ar/dashboard') || pathname.startsWith('/en/dashboard')) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

    if (!token) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role-based redirects
    const role = token.role as string
    const locale = pathname.startsWith('/en') ? 'en' : 'ar'

    if (pathname === `/dashboard` || pathname === `/${locale}/dashboard`) {
      // Redirect to role-specific dashboard
      let redirectPath = '/dashboard/customer'
      if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
        redirectPath = '/dashboard/admin'
      } else if (role === 'SUPPLIER') {
        redirectPath = '/dashboard/supplier'
      } else if (role === 'AFFILIATE') {
        redirectPath = '/dashboard/affiliate'
      }

      return NextResponse.redirect(new URL(`/${locale}${redirectPath}`, request.url))
    }

    // Check role permissions
    if (pathname.includes('/admin') && role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
    if (pathname.includes('/supplier') && role !== 'SUPPLIER') {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
    if (pathname.includes('/customer') && role !== 'CUSTOMER') {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
    if (pathname.includes('/affiliate') && role !== 'AFFILIATE') {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
