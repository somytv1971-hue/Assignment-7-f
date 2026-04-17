'use client'
import { useEffect, useState } from 'react'
import { UserPlus, Users, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FriendCard from '@/components/FriendCard'

export default function HomePage() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/friends.json')
      .then(r => r.json())
      .then(data => {
        setFriends(data)
        setLoading(false)
      })
  }, [])

  const overdue = friends.filter(f => f.status === 'overdue').length
  const almostDue = friends.filter(f => f.status === 'almost due').length
  const onTrack = friends.filter(f => f.status === 'on-track').length

  const summaryCards = [
    { label: 'Total Friends', value: friends.length, Icon: Users, color: '#1e5c4e', bg: '#f0fdf4' },
    { label: 'On Track ', value: onTrack, Icon: CheckCircle, color: '#166534', bg: '#f0fdf4' },
    { label: 'Almost Due', value: almostDue, Icon: Clock, color: '#92400e', bg: '#fffbeb' },
    { label: 'Interactions This Month', value: overdue, Icon: AlertCircle, color: '#991b1b', bg: '#fef2f2' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Banner */}
      <section style={{ background: '#1e5c4e' }} className="text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700 }} className="mb-3">
            Friends to keep close in your life
          </h1>
          <p className="text-white/70 text-base mb-8 max-w-lg mx-auto">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the
            relationships that matter most.
          </p>
          <button
            className="inline-flex items-center gap-2 bg-white text-emerald-800 font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-md text-sm"
            onClick={() => alert('Coming soon!')}
          >
            <UserPlus size={16} />
            Add a Friend
          </button>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {summaryCards.map(({ label, value, Icon, color, bg }) => (
              <div key={label} className="rounded-2xl p-4 text-left" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <Icon size={20} color="rgba(255,255,255,0.8)" className="mb-2" />
                <div className="text-2xl font-bold text-white">{loading ? '—' : value}</div>
                <div className="text-white/60 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Friends Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }} className="font-semibold text-gray-900">
            Your Friends
          </h2>
          <span className="text-sm text-gray-400">{friends.length} people</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="spinner" />
            <p className="text-gray-400 text-sm">Loading your friends…</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {friends.map((friend, i) => (
              <div key={friend.id} className="fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <FriendCard friend={friend} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
