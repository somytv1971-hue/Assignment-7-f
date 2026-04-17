import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="text-8xl mb-6">🔍</div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem' }} className="font-bold text-gray-900 mb-3">
          404
        </h1>
        <p className="text-gray-500 mb-2 text-lg">Page not found</p>
        <p className="text-gray-400 text-sm mb-8 max-w-xs">
          Looks like this page doesn't exist. Maybe the friend moved away?
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors"
        >
          ← Back Home
        </Link>
      </div>
    </div>
  )
}
