# Noble Drip - Bug Fix TODO

## Steps to Complete

- [x] 1. Fix `src/components/layout/Header.tsx` - Add missing `Separator` import
- [x] 2. Fix `src/app/globals.css` - Replace Tailwind v3 directives with v4 syntax + add `electric-blue` color
- [x] 3. Fix `src/i18n/request.ts` - Update to next-intl v4 API (`requestLocale`)
- [x] 4. Fix `src/i18n.ts` - Update to next-intl v4 API (`requestLocale`)
- [x] 5. Fix `src/app/[locale]/layout.tsx` - Update `params` to be a Promise (Next.js 15)
- [x] 6. Fix `src/app/api/auth/register/route.ts` - Add required fields + fix affiliate status
- [x] 7. Create `src/types/next-auth.d.ts` - Add type declarations for extended NextAuth types
