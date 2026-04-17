'use client'
import { useContext } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TimelineContext } from '@/app/layout'
import { Phone, MessageSquare, Video, Clock } from 'lucide-react'

const eventMeta = {
    call: { label: 'Call', icon: Phone, color: 'bg-emerald-100 text-emerald-700' },
    text: { label: 'Text', icon: MessageSquare, color: 'bg-blue-100 text-blue-700' },
    video: { label: 'Video', icon: Video, color: 'bg-violet-100 text-violet-700' },
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    })
}

export default function TimelinePage() {
    const { entries } = useContext(TimelineContext)

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <div style={{ background: '#1e5c4e' }} className="text-white py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="text-3xl font-bold mb-2">
                        Timeline
                    </h1>
                    <p className="text-sm text-white/80 max-w-2xl">
                        Track every call, text, and video interaction in one place. Your most recent friend check-ins appear first.
                    </p>
                </div>
            </div>

            <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
                {entries.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-14 text-center shadow-sm">
                        <div className="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-4xl">
                            <Clock />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">No timeline entries yet</h2>
                        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
                            Log a call, text, or video from a friend's detail page and it will appear here instantly.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {entries.map(entry => {
                            const meta = eventMeta[entry.type] || {}
                            const Icon = meta.icon || Clock
                            return (
                                <div key={entry.id} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${meta.color}`}>
                                                <Icon size={22} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">{meta.label} with <span className="font-semibold text-gray-900">{entry.friendName}</span></p>
                                                <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400">{formatDate(entry.date)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
