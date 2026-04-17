export default function Footer() {
  return (
    <footer style={{ background: '#1e5c4e' }} className="mt-16 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-8 mb-10 text-center">
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 700 }} className="mb-2">
              KeenKeeper
            </h2>
            <p className="text-white/60 ">
              Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            {[
              { href: '#', label: 'Facebook', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              )},
              { href: '#', label: 'Twitter/X', icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              )},
              { href: '#', label: 'Instagram', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              )},
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/50 text-xs">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="gap-11 space-x-3 flex text-white/50 text-xs">
          <button>Privacy Policy</button>
          <button> Terms of Service</button>
          <button>Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
