import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['ar', 'en']

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from the request (next-intl v4 API)
  const locale = await requestLocale

  if (!locale || !locales.includes(locale)) notFound()

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Africa/Cairo',
    now: new Date(),
  }
})
