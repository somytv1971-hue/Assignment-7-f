'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Clock, BarChart2 } from 'lucide-react'

const links = [
  { href: '/', label: 'Home', Icon: Home },
  { href: '/timeline', label: 'Timeline', Icon: Clock },
  { href: '/stats', label: 'Stats', Icon: BarChart2 },
]

export default function Navbar() {
  const path = usePathname()
  const isFriendDetail = path.startsWith('/friends/')

  return (
    <nav style={{ background: '#1e5c4e' }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span
            style={{ fontFamily: 'Playfair Display, serif', color: 'white', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}
          >
            KeenKeeper
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, Icon }) => {
            const isActive = href === '/' ? (path === '/' || isFriendDetail) : path === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
