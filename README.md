# MovieTicket — MERN-Lite Movie Booking App

> A full-stack movie ticket booking application built with **React + Node.js + Express**.  
> Data persistence via JSON flat-file (no MongoDB required for demo).

---

## startup

```bash
# 1. Install all dependencies (first time only)
npm run install:all

# 2. Start both servers simultaneously
npm run dev
```

- **Frontend (React/Vite)**: http://localhost:5173  
- **Backend (Express)**: http://localhost:5000  
- **API Health Check**: http://localhost:5000/api/health

---

## Architecture

```
movie-booking-project/
├── package.json          ← Root: concurrently startup scripts
├── server/               ← Node.js + Express backend
│   ├── server.js         ← Entry point (ES modules)
│   ├── data/
│   │   ├── movies.js     ← Movie seed data (source of truth)
│   │   └── db.json       ← Persistent store (users, bookings, showtimes)
│   ├── routes/
│   │   ├── movies.js     ← GET /api/movies (search + genre filter)
│   │   ├── auth.js       ← POST /api/auth/signup | /login
│   │   ├── bookings.js   ← POST/GET /api/bookings
│   │   └── showtimes.js  ← GET /api/showtimes/:id/:date/:time/seats
│   ├── middleware/
│   │   └── auth.js       ← JWT verification middleware
│   └── utils/
│       └── db.js         ← JSON read/write utility
└── react-app/            ← React + Vite frontend
    ├── vite.config.js    ← Proxy: /api → http://localhost:5000
    └── src/
        ├── services/api.js        ← All fetch() calls to backend
        ├── context/AuthContext.jsx ← JWT + user state
        └── pages/
            ├── Home.jsx           ← Hero + featured movies
            ├── Movies.jsx         ← Browse + search + genre filter
            ├── MovieDetails.jsx   ← Film detail page
            ├── Booking.jsx        ← Seat selection (live from server)
            ├── Confirmation.jsx   ← Booking confirmed + email
            ├── MyBookings.jsx     ← Booking history dashboard
            ├── Login.jsx
            └── Signup.jsx
```

---

## USP — What Makes This Different

###  Real-Time Server-Side Seat Locking
Unlike a standard clone:
- **Seat availability is fetched from the server** for each showtime
- When you book seats, they are **immediately locked** in `db.json`
- Open the same movie + showtime in another browser — those seats appear as booked
- **Zero double-bookings** — conflict detection on every booking POST

### Other Differentiators
| Feature | Basic Clone | This App |
|---|---|---|
| Auth | Fake / localStorage only | Real bcrypt + JWT |
| Passwords | Plain text | bcryptjs hashed |
| Seat data | Hardcoded in frontend | Server per-showtime |
| Booking history | None | `/my-bookings` dashboard |
| Search | Title only | Title + Genre + Cast |
| Genre filter | None | Dynamic filter chips |
| UI | Basic | Premium dark design system |

---

## 🔌 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | — | Server health |
| GET | `/api/movies` | — | All movies (search, genre, status params) |
| GET | `/api/movies/now-showing` | — | Now playing |
| GET | `/api/movies/upcoming` | — | Coming soon |
| GET | `/api/movies/genres` | — | All genres |
| GET | `/api/movies/:id` | — | Single movie |
| POST | `/api/auth/signup` | — | Register user |
| POST | `/api/auth/login` | — | Login + get JWT |
| GET | `/api/showtimes/:movieId/:date/:time/seats` | — | Booked seats for showtime |
| POST | `/api/bookings` | 🔐 JWT | Create booking |
| GET | `/api/bookings/my` | 🔐 JWT | My booking history |

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, React Router v7, Vite 8 |
| Backend | Node.js, Express 4 |
| Auth | bcryptjs + JSON Web Tokens |
| Persistence | JSON flat-file (no MongoDB) |
| Styling | Vanilla CSS (Inter font, glassmorphism) |
| Email | EmailJS |
| Dev Tools | concurrently, node --watch |

---

## Email Confirmation
EmailJS is pre-configured. Booking confirmations are sent automatically on successful booking. Check `Confirmation.jsx` for service/template IDs.

---
