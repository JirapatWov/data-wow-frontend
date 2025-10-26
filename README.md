# Concert Reservation System - Frontend

Next.js frontend application for the Concert Reservation System.

## Quick Start

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment Variables

Create `.env` file in root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api
```

### Step 3: Run Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Project Structure

```
app/
├── (site)/
│   ├── layout.tsx          # Main layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── layout.tsx              # Root layout
components/
├── admin/
│   ├── AdminPage.tsx       # Admin dashboard
│   ├── History.tsx         # Transaction history
│   └── Home.tsx            # Admin home
├── concert-detail/
│   ├── CreateCard.tsx      # Create concert form
│   └── DetailCard.tsx      # Concert details
├── sidebar/
│   └── SideBar.tsx         # Navigation sidebar
├── user/
│   ├── Home.tsx            # User home
│   ├── MyConcert.tsx       # User reservations
│   └── UserPage.tsx        # User dashboard
└── Card.tsx                # Reusable card component
stores/
└── base.ts                 # Zustand state management
utils/
└── format.ts               # Utility functions
```

## Architecture

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + TailwindCSS 4
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Language**: TypeScript

### Features

**Admin Features**:

- Create new concerts
- View all concerts
- Delete concerts
- View transaction history
- View statistics (total seats, reservations, cancellations)

**User Features**:

- Browse available concerts
- Reserve concerts
- Cancel reservations
- View personal reservations

## Libraries Used

### Core Dependencies

| Package          | Version | Purpose                         |
| ---------------- | ------- | ------------------------------- |
| `next`           | 16.0.0  | React framework with App Router |
| `react`          | 19.2.0  | UI library                      |
| `react-dom`      | 19.2.0  | React DOM renderer              |
| `axios`          | ^1.12.2 | HTTP client for API calls       |
| `zustand`        | ^5.0.8  | Lightweight state management    |
| `react-toastify` | ^11.0.5 | Toast notifications             |

### Development Dependencies

| Package                | Version | Purpose                        |
| ---------------------- | ------- | ------------------------------ |
| `typescript`           | ^5      | TypeScript language support    |
| `tailwindcss`          | ^4      | Utility-first CSS framework    |
| `@tailwindcss/postcss` | ^4      | PostCSS plugin for TailwindCSS |
| `eslint`               | ^9      | Code linting                   |
| `eslint-config-next`   | 16.0.0  | Next.js ESLint configuration   |
