'use client'
import { useContext } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Phone, MessageSquare, Video } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TimelineContext } from '@/app/layout'

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6']

export default function StatsPage() {
  const { entries } = useContext(TimelineContext)

  const counts = { call: 0, text: 0, video: 0 }
  entries.forEach(e => { if (counts[e.type] !== undefined) counts[e.type]++ })

  const chartData = [
    { name: 'Call', value: counts.call },
    { name: 'Text', value: counts.text },
    { name: 'Video', value: counts.video },
  ].filter(d => d.value > 0)

  const total = entries.length

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div style={{ background: '#1e5c4e' }} className="text-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem' }} className="font-bold mb-1">Friendship Analytics</h1>
          
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {total === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-gray-400 text-sm">No data yet. Start logging interactions!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4 text-sm">By Interaction Type</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} interactions`, n]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Stats List */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="font-semibold text-gray-800 mb-4 text-sm">Summary</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Total Interactions</span>
                    <span className="font-bold text-gray-900">{total}</span>
                  </div>
                  {[
                    { type: 'call', Icon: Phone, color: '#10b981', label: 'Calls' },
                    { type: 'text', Icon: MessageSquare, color: '#3b82f6', label: 'Texts' },
                    { type: 'video', Icon: Video, color: '#8b5cf6', label: 'Video Calls' },
                  ].map(({ type, Icon, color, label }) => (
                    <div key={type} className="flex items-center justify-between py-2 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <Icon size={14} color={color} />
                        <span className="text-sm text-gray-500">{label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: total ? `${(counts[type] / total) * 100}%` : '0%', background: color }}
                          />
                        </div>
                        <span className="font-semibold text-gray-800 text-sm w-4 text-right">{counts[type]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-sm text-emerald-700 font-medium mb-1">Keep it up! 🎉</p>
                <p className="text-xs text-emerald-600">
                  You've logged {total} interaction{total !== 1 ? 's' : ''} total. 
                  Staying consistent is the key to lasting friendships.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
