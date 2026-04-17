import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="text-7xl mb-6">🔍</div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem' }} className="font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-500 mb-6">This page doesn't exist</p>
      <Link href="/" className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-800 transition-colors">
        ← Back Home
      </Link>
    </div>
  )
}
