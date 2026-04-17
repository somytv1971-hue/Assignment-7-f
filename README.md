# KeenKeeper 🌿

> Stay intentional about the relationships that matter most to you.

KeenKeeper is a personal relationship management app that helps you track when you last connected with your closest friends and reminds you when it's time to reach out again.

---

## 🛠 Technologies Used

| Technology | Purpose |
|------------|---------|
| **Next.js 14** (App Router) | Framework & routing |
| **React 18** | UI components & state |
| **Tailwind CSS** | Styling & responsiveness |
| **Recharts** | Analytics pie chart |
| **react-hot-toast** | Toast notifications |
| **Lucide React** | Icons |

---

## ✨ Key Features

1. **Friend Cards Dashboard** — View all your friends in a clean grid with status indicators (Overdue, Almost Due, On Track), days since last contact, and relationship tags.

2. **Quick Check-In Logging** — From any friend's detail page, log a Call, Text, or Video interaction in one click. Entries appear instantly in the Timeline and trigger a confirmation toast.

3. **Friendship Analytics** — The Stats page shows a Recharts pie chart breaking down your interaction history by type (Call / Text / Video), with progress bars and totals.

---

## 📁 Project Structure

```
keenkeeper/
├── app/
│   ├── layout.jsx          # Root layout + TimelineContext provider
│   ├── page.jsx            # Home (Dashboard)
│   ├── not-found.jsx       # 404 page
│   ├── friends/[id]/       # Friend detail dynamic route
│   ├── timeline/           # Timeline page
│   └── stats/              # Analytics page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── FriendCard.jsx
└── public/
    └── data/
        └── friends.json    # Friend profiles data
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📱 Responsive Design

Fully responsive across mobile (375px+), tablet (768px+), and desktop (1280px+) screen sizes.
