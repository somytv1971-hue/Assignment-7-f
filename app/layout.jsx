'use client'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { createContext, useContext, useState } from 'react'

export const TimelineContext = createContext(null)

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState([])

  const addEntry = (type, friendName) => {
    const icons = { call: '📞', text: '💬', video: '📹' }
    const titles = {
      call: `Call with ${friendName}`,
      text: `Text with ${friendName}`,
      video: `Video with ${friendName}`,
    }
    const newEntry = {
      id: Date.now(),
      type,
      title: titles[type],
      icon: icons[type],
      friendName,
      date: new Date().toISOString(),
    }
    setEntries(prev => [newEntry, ...prev])
  }

  return (
    <TimelineContext.Provider value={{ entries, addEntry }}>
      {children}
    </TimelineContext.Provider>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TimelineProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e5c4e',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                borderRadius: '10px',
              },
            }}
          />
        </TimelineProvider>
      </body>
    </html>
  )
}
