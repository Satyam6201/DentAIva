<img width="1280" height="720" alt="screenshot-for-readme" src="https://github.com/user-attachments/assets/eabb064d-fb59-4d66-9a9d-29a90774a1c7" />

# 🦷 DentAIva — AI-Powered Dental Practice Management

> **DentAIva** is a modern, full-stack **AI-Powered Dental SaaS Platform** built to help clinics streamline patient interactions, automate appointment scheduling, manage doctor profiles, and provide 24/7 AI-guided dental consultations.

---

## ✨ Highlights

- 🏠 **Modern Patient & Admin Experience**: Built with Next.js 15 App Router, Tailwind CSS v4, and Radix UI.
- 🗣️ **AI Voice Dental Assistant**: Real-time voice consultation powered by **Vapi AI** (*Riley* persona).
- 🎙️ **Audio Wave Visualizer & Live Transcript**: Interactive audio waveforms and message streaming.
- 📅 **3-Step Smart Booking Flow**: Dentist Selection → Date/Time Slot Selection → Confirmation.
- 🚫 **Double-Booking Prevention**: Dynamic availability checking backed by PostgreSQL.
- 📩 **Automated Confirmation Emails**: Responsive HTML templates using **React Email + Resend**.
- 🔐 **Clerk Authentication**: Google, GitHub, and Email OTP verification.
- 💳 **Subscription Tiers & Gating**: Pro plan verification for AI consultations (`ai_basic` & `ai_pro`) with Clerk `<PricingTable />`.
- 📊 **Practice Management Portal**: Real-time stats, doctor CRUD operations, and one-click appointment status toggles (`CONFIRMED` ↔ `COMPLETED`).
- 🤖 **Dynamic Doctor Avatars**: Auto-generated avatars based on doctor name and gender.

---

## 🚀 Key Features

### 🎙️ AI Voice Dental Assistant (Powered by Vapi)
* **Real-time Voice Consultations**: Interactive voice agent (*Riley*) advising on symptoms, home remedies, procedure expectations, and pricing.
* **Audio Wave Visualizer & Live Transcript**: Visual feedback when the assistant speaks or listens, accompanied by live conversational transcripts.
* **Subscription-Gated Access**: Restricted to active Pro members (`ai_basic` or `ai_pro` tiers) via Clerk plan checks.

### 📅 Smart Appointment Booking Flow
* **3-Step Guided Booking**:
  1. **Select Doctor**: Filter through active clinic dentists with photos, specialties, and bios.
  2. **Select Date & Time**: Dynamic slot selection across the next 5 days with automatic exclusion of booked slots.
  3. **Confirmation & Booking**: Instant database persistence with toast notifications.
* **Automated Email Confirmations**: Triggers responsive HTML emails via Resend and `@react-email/components` upon booking.

### 📊 Patient Dashboard
* **Next Appointment Tracking**: Instant glance at upcoming visits with dynamic status badges ("Today" / "Upcoming").
* **Dental Health Metrics**: Track total bookings, completed visits, and account tenure.
* **Quick Actions**: One-click navigation to voice consultations, booking steps, and plan upgrades.

### 🛡️ Administrative Portal
* **Role-Based Protection**: Protected via server-side verification against configured `ADMIN_EMAIL`.
* **Doctor Profile Management**: Full CRUD operations to add, edit, and toggle active/inactive statuses for doctors.
* **Appointment Tracking**: Live table of all clinic appointments with one-click status toggling (`CONFIRMED` ↔ `COMPLETED`).
* **Practice Analytics**: Real-time counter cards for active doctors, total appointments, and completed visits.

### 🔐 Authentication & Monetization
* **Clerk Authentication**: Multi-method authentication (Google, GitHub, Email OTP).
* **Automatic Database Sync**: User profiles are synchronized from Clerk directly to PostgreSQL using server actions.
* **Clerk Pricing Table**: Embedded plan upgrades and subscription management on `/pro`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack, Server Actions) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/), Sonner Toast |
| **Database & ORM** | [PostgreSQL (Neon DB)](https://neon.tech/), [Prisma ORM 6](https://www.prisma.io/) |
| **Authentication & Billing** | [Clerk](https://clerk.com/) (`@clerk/nextjs`) |
| **AI / Voice Integration** | [Vapi Web SDK](https://vapi.ai/) (`@vapi-ai/web`) |
| **Email Service** | [Resend](https://resend.com/) + `@react-email/components` |
| **Data Fetching & Caching** | [TanStack React Query v5](https://tanstack.com/query) |
| **Linter & Formatter** | [Biome](https://biomejs.dev/) |

---

## 📁 Project Structure

```text
dentaiva/
├── prisma/
│   └── schema.prisma               # Prisma schema (User, Doctor, Appointment models)
├── public/                         # Static assets (logos, feature illustrations, hero assets)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── admin/                  # Admin dashboard & client views (role-protected)
│   │   │   ├── AdminDashboardClient.tsx
│   │   │   └── page.tsx
│   │   ├── api/                    # API Route Handlers
│   │   │   └── send-appointment-email/
│   │   │       └── route.ts        # Resend email notification endpoint
│   │   ├── appointments/           # 3-step booking flow page
│   │   │   └── page.tsx
│   │   ├── dashboard/              # Authenticated user dashboard
│   │   │   └── page.tsx
│   │   ├── pro/                    # Subscription upgrade & Clerk PricingTable
│   │   │   └── page.tsx
│   │   ├── voice/                  # Voice consultation room (subscription-gated)
│   │   │   └── page.tsx
│   │   ├── globals.css             # Theme definitions & Tailwind CSS setup
│   │   ├── layout.tsx              # Root layout (Clerk, React Query, Toaster)
│   │   └── page.tsx                # Marketing landing page (redirects auth users)
│   ├── components/                 # React UI components
│   │   ├── admin/                  # Admin stats, doctor dialogs & appointment tables
│   │   ├── appointments/           # Step components (Doctor, Time, Confirmation modal)
│   │   ├── dashboard/              # Next appointment cards & practice summary stats
│   │   ├── emails/                 # React Email appointment templates
│   │   ├── landing/                # Hero, CTA, Header, Footer, Pricing, How It Works
│   │   ├── providers/              # TanStack Query client provider
│   │   ├── ui/                     # Shadcn / Radix UI component library
│   │   ├── voice/                  # Vapi voice widget, visualizers, gated banner
│   │   ├── Navbar.tsx              # Global navigation bar with Clerk UserButton
│   │   └── UserSync.tsx            # Synchronizes Clerk session user with PostgreSQL
│   ├── hooks/                      # Custom React Query hooks
│   │   ├── use-appointment.ts      # Hooks for booking and querying appointments
│   │   ├── use-doctors.ts          # Hooks for doctors query and mutations
│   │   └── use-mobile.ts           # Responsive screen breakpoint hook
│   ├── lib/                        # Core utilities & service clients
│   │   ├── actions/                # Next.js Server Actions
│   │   │   ├── appointments.ts     # Appointment CRUD & slot checking
│   │   │   ├── doctors.ts          # Doctor CRUD & availability logic
│   │   │   └── users.ts            # User synchronization logic
│   │   ├── prisma.ts               # Singleton Prisma client instance
│   │   ├── resend.ts               # Resend client instance
│   │   ├── utils.ts                # Tailwind merge, date helpers, appointment types
│   │   ├── vapi-prompt.ts          # AI assistant prompt & conversation instructions
│   │   └── vapi.ts                 # Vapi web client instance
│   └── middleware.ts               # Clerk authentication route middleware
├── biome.json                      # Biome linting and formatting configuration
├── components.json                 # Shadcn UI configuration
├── next.config.ts                  # Next.js configuration (remote image hostnames)
├── package.json                    # Project dependencies and npm scripts
├── postcss.config.mjs              # PostCSS plugins
└── tsconfig.json                   # TypeScript configuration
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **PostgreSQL Database**: [Neon](https://neon.tech/) or local PostgreSQL
- **Clerk Account**: For user authentication and subscription plans
- **Vapi Account**: For voice assistant web credentials
- **Resend Account**: For transactional emails

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/Satyam6201/DentAIva.git
cd dentaiva
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory and configure the following variables:

```env
# PostgreSQL Database (Neon DB recommended)
DATABASE_URL="postgresql://username:password@ep-sample-pooler.us-east-2.aws.neon.tech/dentaiva?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Admin Access Control
ADMIN_EMAIL="admin@yourdomain.com"

# Vapi AI Voice Assistant
NEXT_PUBLIC_VAPI_API_KEY="your-vapi-public-key"
NEXT_PUBLIC_VAPI_ASSISTANT_ID="your-vapi-assistant-id"

# Resend Email Service
RESEND_API_KEY="re_..."
```

### 4. Database Setup & Migrations

Push the Prisma schema to your PostgreSQL database and generate the Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server with Turbopack. |
| `npm run build` | Builds the application for production using Turbopack. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs Biome to check code style and errors. |
| `npm run format` | Runs Biome to automatically format source code. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
