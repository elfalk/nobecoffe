import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
const locales = ['ar', 'en'];

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the locale from the request (next-intl v4 API)
  const locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone: 'Africa/Cairo',
    now: new Date(),
  };
});
