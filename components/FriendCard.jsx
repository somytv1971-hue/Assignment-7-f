import Link from 'next/link'
import Image from 'next/image'

export function statusClass(status) {
  if (status === 'overdue') return 'status-overdue'
  if (status === 'almost due') return 'status-almost-due'
  return 'status-on-track'
}

export function statusLabel(status) {
  if (status === 'overdue') return '🔴 Overdue'
  if (status === 'almost due') return '🟡 Almost Due'
  return '🟢 On Track'
}

export default function FriendCard({ friend }) {
  return (
    <Link href={`/friends/${friend.id}`}>
      <div
        className="card-hover bg-white rounded-2xl overflow-hidden cursor-pointer"
        style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      >
        <div className="relative h-36 bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center">
          <Image
            src={friend.picture}
            alt={friend.name}
            width={80}
            height={80}
            className="rounded-full border-4 border-white shadow-md"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4 text-center flex flex-col items-center">
          <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{friend.name}</h3>
          <p className="text-xs text-gray-500 mb-3">
            {friend.days_since_contact} days ago
          </p>
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {friend.tags.map(tag => (
              <span key={tag} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusClass(friend.status)}`}>
            {statusLabel(friend.status)}
          </span>
        </div>
      </div>
    </Link>
  )
}
