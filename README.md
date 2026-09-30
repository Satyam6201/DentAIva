<img width="1280" height="720" alt="screenshot-for-readme" src="https://github.com/user-attachments/assets/eabb064d-fb59-4d66-9a9d-29a90774a1c7" />

# 🦷 DentAIva — AI-Powered Dental Hospital & Clinic SaaS

> **DentAIva** is an enterprise-grade, full-stack **Dental Hospital Management Platform** built to streamline patient care, electronic health records (EHR), automated appointment scheduling, 24/7 dental emergency triage, post-operative aftercare, and real-time AI voice consultations.

---

## ✨ Highlights

- 🏥 **Hospital-Grade Patient Portal**: Modern medical UI with glassmorphism, responsive navigation, and hospital accreditation badges.
- 🚨 **24/7 Emergency Triage & Trauma Desk**: Interactive symptom severity classifier (Levels 1–3) with clinical first-aid guides and direct hotline dialing (`+1 800-433-6824`).
- 🩺 **Specialized Departments Catalog (`/services`)**: 8 specialized dental departments (Oral Surgery, Orthodontics, Endodontics, Implants, Periodontics, Pediatric, Cosmetic, and Emergency Trauma).
- 📋 **Patient Health Vault & EHR (`/records`)**: Digital Patient ID card, drug allergy warnings, systemic medical condition alerts, active prescription schedules, and verified clinical history.
- 🖨️ **Printable Official Clinic Pass**: Hospital-grade printable pass with barcode, QR verification placeholder, attending doctor signature line, and pre-visit clinical checklist.
- 🩹 **Post-Operative Aftercare Hub (`/aftercare`)**: Procedure-specific recovery protocols (extractions, root canals, implants, whitening), day-by-day milestone timelines, and interactive healing checklists.
- 🗣️ **AI Voice Dental Assistant (`/voice`)**: Real-time voice consultation powered by **Vapi AI** (*Riley* persona) with audio waveforms and live transcripts.
- 📅 **3-Step Smart Booking Flow (`/appointments`)**: Dynamic slot selection with real-time double-booking prevention backed by PostgreSQL.
- 📩 **Automated Confirmation Emails**: Responsive HTML email templates dispatched via **React Email + Resend**.
- 📊 **Practice Management Portal (`/admin`)**: Real-time stats, doctor CRUD operations, and one-click appointment status toggles (`CONFIRMED` ↔ `COMPLETED`).
- 🔐 **Authentication & Subscriptions**: Multi-method login via **Clerk** with subscription tier gating (`ai_basic` & `ai_pro`) and `<PricingTable />`.

---

## 🚀 Key Features

### 🚨 24/7 Dental Trauma & Emergency Triage
* **Interactive Triage Modal**: Classifies dental emergencies into:
  - **Level 1 (Critical)**: Knocked-out teeth, uncontrolled bleeding, severe facial swelling.
  - **Level 2 (Urgent)**: Acute severe toothache, periapical abscess, broken tooth.
  - **Level 3 (Moderate)**: Lost filling, broken crown, mild sensitivity.
* **Clinical First-Aid Guides**: Step-by-step instructions on tooth preservation (milk/saline), cold compress protocols, and analgesics precautions.
* **Direct Hotline Integration**: One-tap dialing to the trauma desk with immediate emergency appointment shortcuts.

### 🩺 Specialized Hospital Departments (`/services`)
* **Department Catalog**: Detailed breakdown of 8 clinical divisions with lead specialists, board credentials, common procedures, recovery windows, anesthesia options, and transparent pricing.
* **Pre-Procedure Preparation**: Actionable patient preparation checklists (fasting requirements, escort planning, medication hold guidelines).
* **Search & Specialty Filter**: Instant filtering across procedures, fees, and departments.

### 📋 Patient Medical Records & Health Vault (`/records`)
* **Digital Patient ID Card**: Patient ID, verified blood group, and emergency contact details.
* **Drug Allergies & Clinical Alerts**: Interactive management for penicillin, latex, epinephrine, and NSAID alerts.
* **Active Medication Regimen**: Antibiotic, analgesic, and antiseptic prescription tracker with dosage, attending doctor, and days remaining.
* **Verified Treatment History**: Chronological visit history pulled live from PostgreSQL via Prisma.
* **Printable Clinic Pass**: Formatted printable pass with barcode, appointment slip, and attending doctor signature block.

### 🩹 Post-Operative Aftercare Hub (`/aftercare`)
* **Procedure Recovery Guides**: Detailed Do's and Don'ts for extractions, wisdom teeth surgery, root canal therapy, dental implants, and laser whitening.
* **Interactive Healing Checklist**: Check off post-op tasks (gauze pressure, ice packs, medication adherence, warm salt water rinses).
* **Hospital Red Flags Warning**: Clear guidance on when to seek urgent care (fever > 101°F, persistent bleeding, swelling spreading to throat).

### 🎙️ AI Voice Dental Assistant (Powered by Vapi)
* **Real-time Voice Consultations**: Interactive voice agent (*Riley*) advising on symptoms, care tips, procedure expectations, and pricing.
* **Audio Wave Visualizer & Live Transcript**: Real-time conversational transcripts with voice wave animations.
* **Subscription-Gated Access**: Restricted to active Pro members (`ai_basic` or `ai_pro` tiers) via Clerk plan checks.

### 📅 Smart Appointment Booking Flow
* **3-Step Guided Booking**:
  1. **Select Doctor**: Filter through active clinic dentists with photos, specialties, and bios.
  2. **Select Date & Time**: Dynamic slot selection across the next 5 days with automatic exclusion of booked slots.
  3. **Confirmation & Booking**: Instant database persistence with toast notifications.
* **Automated Email Confirmations**: Triggers responsive HTML emails via Resend and `@react-email/components` upon booking.

### 🛡️ Administrative Portal
* **Role-Based Protection**: Protected via server-side verification against configured `ADMIN_EMAIL`.
* **Doctor Profile Management**: Full CRUD operations to add, edit, and toggle active/inactive statuses for doctors.
* **Appointment Tracking**: Live table of all clinic appointments with one-click status toggling (`CONFIRMED` ↔ `COMPLETED`).
* **Practice Analytics**: Real-time counter cards for active doctors, total appointments, and completed visits.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack, Server Actions) |
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
│   │   ├── aftercare/              # Post-op recovery hub & interactive checklists
│   │   ├── api/                    # API Route Handlers
│   │   │   └── send-appointment-email/
│   │   │       └── route.ts        # Resend email notification endpoint
│   │   ├── appointments/           # 3-step booking flow page
│   │   ├── dashboard/              # Authenticated user dashboard
│   │   ├── pro/                    # Subscription upgrade & Clerk PricingTable
│   │   ├── records/                # Patient health records, EHR & printable clinic pass
│   │   ├── services/               # Clinical departments & specialty catalog
│   │   ├── voice/                  # Voice consultation room (subscription-gated)
│   │   ├── globals.css             # Theme definitions & Tailwind CSS setup
│   │   ├── layout.tsx              # Root layout (Clerk, React Query, Toaster)
│   │   └── page.tsx                # Marketing landing page (redirects auth users)
│   ├── components/                 # React UI components
│   │   ├── admin/                  # Admin stats, doctor dialogs & appointment tables
│   │   ├── appointments/           # Step components (Doctor, Time, Confirmation modal)
│   │   ├── dashboard/              # Next appointment cards, practice summary stats, quick actions
│   │   ├── emails/                 # React Email appointment templates
│   │   ├── emergency/              # 24/7 Emergency Triage & Trauma Desk modal
│   │   ├── landing/                # Hero, CTA, Header, Footer, Pricing, How It Works
│   │   ├── providers/              # TanStack Query client provider
│   │   ├── ui/                     # Shadcn / Radix UI component library
│   │   ├── voice/                  # Vapi voice widget, visualizers, gated banner
│   │   ├── Navbar.tsx              # Global navigation bar with 24/7 Emergency hotline
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
