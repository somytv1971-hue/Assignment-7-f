'use client'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Phone, MessageSquare, Video, Archive, Trash2, AlarmClock, Edit2, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TimelineContext } from '@/app/layout'
import { statusClass, statusLabel } from '@/components/FriendCard'

export default function FriendDetailPage() {
  const { id } = useParams()
  const [friend, setFriend] = useState(null)
  const { addEntry } = useContext(TimelineContext)

  useEffect(() => {
    fetch('/data/friends.json')
      .then(r => r.json())
      .then(data => {
        const f = data.find(f => f.id === parseInt(id))
        setFriend(f)
      })
  }, [id])

  const handleCheckIn = (type) => {
    addEntry(type, friend.name)
    const labels = { call: '📞 Call logged', text: '💬 Text logged', video: '📹 Video logged' }
    toast.success(`${labels[type]} with ${friend.name}!`)
  }

  if (!friend) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="spinner" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Sub-header */}
      <div style={{ background: '#1e5c4e' }} className="text-white py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-white/60 text-xs">Friend Details</p>
            <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-xl font-bold">{friend.name}</h1>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-[300px_1fr] gap-6">

          {/* Left Column */}
          <div className="space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <Image
                src={friend.picture}
                alt={friend.name}
                width={96}
                height={96}
                className="rounded-full mx-auto mb-3 border-4 border-emerald-100"
                style={{ objectFit: 'cover' }}
              />
              <h2 className="font-bold text-gray-900 text-lg mb-1">{friend.name}</h2>
              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${statusClass(friend.status)}`}>
                {statusLabel(friend.status)}
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {friend.tags.map(tag => (
                  <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{friend.bio}</p>
              <p className="text-xs text-gray-400">✉️ {friend.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
              <button className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors text-sm font-medium">
                <AlarmClock size={15} /> Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                <Archive items-center size={15} /> Archive
              </button>
              <button className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors text-sm font-medium">
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Days Since Contact', value: friend.days_since_contact },
                { label: 'Goal (days)', value: friend.goal },
                { label: 'Next Due Date', value: friend.next_due_date },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-xl p-4 shadow-sm text-center">
                  <div className="text-xl font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-400 mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Relationship Goal */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 text-sm">Relationship Goal</h3>
                <button className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100">
                  <Edit2 size={11} /> Edit
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Contact every <span className="font-semibold text-gray-800">{friend.goal} days</span>. 
                You've been in contact {friend.days_since_contact} days ago.
              </p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (friend.days_since_contact / friend.goal) * 100)}%`,
                    background: friend.status === 'overdue' ? '#ef4444' : friend.status === 'almost due' ? '#f59e0b' : '#10b981',
                  }}
                />
              </div>
            </div>

            {/* Quick Check-In */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 text-sm mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn('call')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-emerald-100 hover:bg-emerald-50 hover:border-emerald-300 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center transition-colors">
                    <Phone size={18} className="text-emerald-700" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Call</span>
                </button>
                <button
                  onClick={() => handleCheckIn('text')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-blue-100 hover:bg-blue-50 hover:border-blue-300 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                    <MessageSquare size={18} className="text-blue-700" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Text</span>
                </button>
                <button
                  onClick={() => handleCheckIn('video')}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-violet-100 hover:bg-violet-50 hover:border-violet-300 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center transition-colors">
                    <Video size={18} className="text-violet-700" />
                  </div>
                  <span className="text-xs font-medium text-gray-600">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
