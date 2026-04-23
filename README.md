# 🎾 Tennis Player Manager

A fullstack web application for managing professional tennis players, built with **Next.js 15**, **Prisma ORM**, and **PostgreSQL**. The app features user authentication with optional two-factor verification, full CRUD operations on player profiles, real-time data via WebSockets, interactive statistics dashboards, and an admin monitoring system.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [User Roles & Permissions](#user-roles--permissions)
- [Pages & Functionality](#pages--functionality)
- [API Endpoints](#api-endpoints)
- [WebSocket (Real-Time Updates)](#websocket-real-time-updates)
- [Monitoring Script](#monitoring-script)
- [Environment Variables](#environment-variables)

---

## Features

- **Authentication & Authorization** — Email/password login powered by NextAuth.js, with role-based access control (`USER` / `ADMIN`).
- **Two-Factor Authentication (2FA)** — Optional TOTP-based 2FA using Google Authenticator–compatible apps. Users can scan a QR code to set up their second factor.
- **Player CRUD** — Create, read, update, and delete tennis player profiles with server-side validation.
- **Player Cards with Ranking Tiers** — Players are displayed in ranked cards color-coded into Gold, Silver, and Bronze tiers.
- **Detail Page with Inline Editing** — View full player details, toggle edit mode to update fields, change the player image, and upload highlight videos.
- **Video Upload with Progress Bar** — Upload match/highlight videos per player, with a real-time progress indicator and in-browser playback + download.
- **Image Selector** — Pick from server-hosted images to set a player's profile picture.
- **Search & Sort** — Filter players by name and sort by ranking (ascending/descending) from the main page header.
- **Pagination** — Configurable number of players per page (3, 4, 5, or 6) with full pagination controls.
- **Statistics Dashboard** — Interactive Pie and Bar charts (Chart.js / Recharts) visualizing player data distributions.
- **Top Racket Brands** — A dedicated page ranking racket brands by the number of players using them.
- **Real-Time Player Generation (WebSocket)** — Start/stop a WebSocket server that periodically generates random players and broadcasts them to all connected clients, updating charts live.
- **Admin: Monitored Users Table** — Admins see a table of users who have been flagged by the background monitoring script for high activity.
- **Activity Logging** — Every ADD, UPDATE, and DELETE action is logged per user for auditing.
- **Background Monitoring Script** — A standalone script (`npm run monitor-script`) that runs every 2 minutes, flagging users with more than 20 actions in the last 24 hours.
- **Toast Notifications** — User-friendly feedback via `react-hot-toast` for validation errors and important events.
- **Seeded Demo Data** — Prisma seed script pre-populates the database with sample users, racket brands, and famous tennis players.

---

## Tech Stack

| Layer          | Technology                                                      |
| -------------- | --------------------------------------------------------------- |
| **Framework**  | [Next.js 15](https://nextjs.org/) (App Router)                  |
| **Language**   | TypeScript / JavaScript                                         |
| **Database**   | [PostgreSQL](https://www.postgresql.org/)                       |
| **ORM**        | [Prisma](https://www.prisma.io/)                                |
| **Auth**       | [NextAuth.js v4](https://next-auth.js.org/)                     |
| **2FA**        | [otplib](https://github.com/yeojz/otplib) + [qrcode](https://github.com/soldair/node-qrcode) |
| **Charts**     | [Chart.js](https://www.chartjs.org/) / [Recharts](https://recharts.org/) |
| **WebSocket**  | [ws](https://github.com/websockets/ws)                         |
| **Pagination** | [react-paginate](https://github.com/AdRoll/react-paginate)     |
| **Icons**      | [Bootstrap Icons](https://icons.getbootstrap.com/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Toasts**     | [react-hot-toast](https://react-hot-toast.com/)                |
| **Testing**    | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| **Fake Data**  | [@faker-js/faker](https://fakerjs.dev/)                        |

---

## Project Structure

```
tennis-app/
├── __tests__/                  # Jest test suites (API & frontend)
├── hooks/
│   └── usePlayerWebSocket.tsx  # Custom hook for WebSocket client
├── lib/
│   ├── prisma.ts               # Singleton Prisma client
│   └── websocket-server.js     # WebSocket server (player generation)
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Seed script for demo data
│   └── migrations/             # Prisma migration history
├── public/
│   └── images/                 # Static player images
├── scripts/
│   └── monitor.ts              # Background user monitoring script
├── src/
│   ├── app/
│   │   ├── page.tsx            # Main page (player list + sidebar)
│   │   ├── layout.tsx          # Root layout (SessionProvider, Toaster)
│   │   ├── login-page/         # Login page with 2FA support
│   │   ├── detail-page/[id]/   # Player detail + edit + video upload
│   │   ├── statistics-page/    # Charts dashboard
│   │   ├── top-rackets-page/   # Top racket brands ranking
│   │   ├── api/
│   │   │   ├── auth/           # NextAuth route + 2FA secret endpoint
│   │   │   ├── players/        # CRUD API for players
│   │   │   ├── top-rackets/    # Aggregated racket brand stats
│   │   │   ├── monitored-users/# Monitored users endpoint
│   │   │   ├── images/         # Image listing endpoint
│   │   │   ├── upload-video/   # Video upload endpoint
│   │   │   └── start-websocket/# WebSocket server control
│   │   ├── components/
│   │   │   ├── add-player-form/    # Modal form for adding a player
│   │   │   ├── main-menu/         # Sidebar navigation menu
│   │   │   ├── player-card/       # Individual player card
│   │   │   ├── players-list/      # Paginated player grid + header
│   │   │   ├── monitored-users-table/ # Admin-only monitored users
│   │   │   └── statistics-charts/ # Pie & Bar chart components
│   │   ├── services/
│   │   │   └── playersApi.tsx  # Client-side API helper functions
│   │   └── utils/
│   │       ├── generateRandomPlayer.js
│   │       ├── startGenerateRandomPlayers.js
│   │       └── getSecretByEmail.ts
│   ├── generated/prisma/       # Auto-generated Prisma client
│   └── types/                  # Shared TypeScript types
├── .env                        # Environment variables
├── jest.config.ts              # Jest configuration
├── next.config.js              # Next.js configuration (CORS headers)
├── package.json
└── tsconfig.json
```

---

## Prerequisites

Before running the project, make sure you have the following installed:

- **Node.js** ≥ 18
- **npm** ≥ 9 (comes with Node.js)
- **PostgreSQL** ≥ 14 — running locally or remotely

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/andreiu77/tennis-app.git
cd tennis-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root (or edit the existing one). The required variables are:

```env
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/Tennisdb"
NEXTAUTH_SECRET="<your-random-secret>"
NEXTAUTH_URL="http://localhost:3000"
```

> Replace `<user>`, `<password>`, and the database name with your actual PostgreSQL credentials.

---

## Database Setup

### 1. Create the PostgreSQL Database

```sql
CREATE DATABASE "Tennisdb";
```

### 2. Run Prisma Migrations

This creates the tables defined in `prisma/schema.prisma`:

```bash
npx prisma migrate dev
```

### 3. Generate the Prisma Client

```bash
npx prisma generate
```

### 4. Seed the Database (Optional)

Populate the database with demo users, racket brands, and players:

```bash
npx prisma db seed
```

**Seeded accounts:**

| Email               | Role    | 2FA Enabled |
| ------------------- | ------- | ----------- |
| `admin@example.com` | `ADMIN` | No          |
| `user@example.com`  | `USER`  | Yes         |

> ⚠️ The seed script uses placeholder password hashes. Replace them with real bcrypt hashes for production use.

---

## Running the Application

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to the login page if not authenticated.

### Production Build

```bash
npm run build
npm start
```

### Background Monitoring Script

In a separate terminal, start the monitoring script that flags users with excessive activity:

```bash
npm run monitor-script
```

This script checks every **2 minutes** for users with more than **20 logged actions** in the last 24 hours and adds them to the `MonitoredUser` table.

---

## Running Tests

The project includes both **API tests** and **frontend component tests** using Jest and React Testing Library.

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch
```

---

## User Roles & Permissions

| Feature                   | `USER` | `ADMIN` |
| ------------------------- | :----: | :-----: |
| Login / Logout            |   ✅   |   ✅    |
| Two-Factor Authentication |   ✅   |   ✅    |
| View own players          |   ✅   |   ✅    |
| Add / Edit / Delete players |  ✅  |   ✅    |
| View Statistics            |   ✅   |   ✅    |
| View Top Racket Brands     |   ✅   |   ✅    |
| Upload Videos              |   ✅   |   ✅    |
| View Monitored Users Table |   ❌   |   ✅    |

---

## Pages & Functionality

### 🔐 Login Page (`/login-page`)

- Enter email and password to authenticate.
- If the account has **2FA enabled**, the user is prompted for a TOTP code.
- Option to display a **QR code** for setting up Google Authenticator.

### 🏠 Main Page (`/`)

- **Sidebar Menu** — Quick-access icons for: Add Player, Statistics, Top Rackets, and Logout.
- **Search Bar** — Filter the player list by name in real-time.
- **Sort Dropdown** — Sort players by ranking (ascending or descending).
- **Player Cards** — Each card displays the player's image, name, ranking, country, and title count. Cards are color-coded into three tiers:
  - 🥇 **Gold** — Top third by ranking
  - 🥈 **Silver** — Middle third
  - 🥉 **Bronze** — Bottom third
- **Pagination** — Navigate between pages, with configurable items per page (3–6).
- **Add Player Modal** — A form to create a new player with fields for name, country, racket brand, birth date, ranking, titles, and handedness. Includes client-side and server-side validation.
- **Monitored Users Table** *(Admin only)* — Displays users flagged by the background monitoring script.

### 📝 Player Detail Page (`/detail-page/[id]`)

- Full player profile with image, name, handedness, and ATP ranking.
- **Inline Editing** — Click the edit icon to make fields editable; save changes with the Save button.
- **Image Selector** — Pick from a gallery of server-hosted images to update the player's photo.
- **Video Upload** — Upload a highlight video with a real-time progress bar. After upload, the video can be played in-browser or downloaded.
- **Validation Feedback** — Toast notifications for invalid racket brands and other errors.

### 📊 Statistics Page (`/statistics-page`)

- **Pie Chart** — Visualizes player distribution (e.g., by handedness or country).
- **Bar Chart** — Additional data visualization for player statistics.
- **WebSocket Controls** — Start/Stop buttons to activate real-time random player generation. New players appear in the charts as they are created.

### 🏆 Top Racket Brands Page (`/top-rackets-page`)

- Lists racket brands ranked by the number of players using each brand.
- Data is aggregated from all players in the database.

---

## API Endpoints

All API routes are under `/api/` and are implemented as Next.js Route Handlers.

### Players

| Method   | Endpoint            | Description                    | Auth Required |
| -------- | ------------------- | ------------------------------ | :-----------: |
| `GET`    | `/api/players`      | List all players for the authenticated user (supports `?q=` search and `?sort=` sorting) | ✅ |
| `POST`   | `/api/players`      | Create a new player            | ✅            |
| `GET`    | `/api/players/[id]` | Get a single player by ID      | ❌            |
| `PUT`    | `/api/players/[id]` | Update a player by ID          | ✅            |
| `DELETE` | `/api/players/[id]` | Delete a player by ID          | ✅            |

### Other

| Method   | Endpoint                | Description                              |
| -------- | ----------------------- | ---------------------------------------- |
| `GET`    | `/api/top-rackets`      | Get racket brands ranked by player count |
| `GET`    | `/api/monitored-users`  | Get flagged monitored users (Admin)      |
| `GET`    | `/api/images`           | List available player images             |
| `POST`   | `/api/upload-video/[id]`| Upload a video for a player              |
| `POST`   | `/api/start-websocket`  | Start the WebSocket server               |
| `DELETE` | `/api/start-websocket`  | Stop the WebSocket server                |
| `GET`    | `/api/auth/get-secret`  | Get 2FA secret for QR code generation    |

---

## WebSocket (Real-Time Updates)

The application includes a **WebSocket server** (running on `ws://localhost:3001`) that periodically generates random tennis players using Faker.js and broadcasts them to all connected clients.

**How it works:**

1. Navigate to the **Statistics Page**.
2. Click **"Start WebSocket Server"** to begin generating random players.
3. The charts update in real-time as new players are created.
4. Click **"Stop WebSocket Server"** to halt generation and disconnect clients.

The client-side connection is managed by the `usePlayerWebSocket` custom hook.

---

## Monitoring Script

The monitoring script (`scripts/monitor.ts`) is a standalone background process that:

1. Queries the `Log` table for users with **more than 20 actions** in the past **24 hours**.
2. Upserts matching users into the `MonitoredUser` table.
3. Repeats every **2 minutes**.

Admins can view flagged users from the **Monitored Users Table** on the main page.

```bash
npm run monitor-script
```

---

## Environment Variables

| Variable          | Description                                      | Example                                                    |
| ----------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| `DATABASE_URL`    | PostgreSQL connection string                     | `postgresql://postgres:password@localhost:5432/Tennisdb`   |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js session encryption    | *(generate with `openssl rand -base64 32`)*                |
| `NEXTAUTH_URL`    | Base URL of the application                      | `http://localhost:3000`                                    |
| `ALLOWED_ORIGIN`  | *(Optional)* CORS allowed origin for API routes  | `http://localhost:3000`                                    |

---

## License

This project is licensed under the [ISC License](./LICENSE).
