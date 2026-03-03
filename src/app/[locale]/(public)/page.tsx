import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('common')

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 gradient-text">
          Noble Drip
        </h1>
        <p className="text-2xl text-gray-400 mb-8">
          Enterprise Coffee Platform
        </p>
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            🚀 Project is being set up...
          </p>
          <p className="text-sm text-gray-500">
            Super Admin: yuoseef01102@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}