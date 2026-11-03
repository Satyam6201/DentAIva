<img width="1280" height="720" alt="screenshot-for-readme" src="https://github.com/user-attachments/assets/eabb064d-fb59-4d66-9a9d-29a90774a1c7" />

# 🦷 DentAIva — AI-Powered Dental Hospital & Clinic SaaS

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)
[![Vapi AI](https://img.shields.io/badge/Vapi_AI-Voice_Agent-FF5722?style=for-the-badge)](https://vapi.ai/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-000000?style=for-the-badge&logo=resend)](https://resend.com/)

> **DentAIva** is an enterprise-grade, full-stack **Dental Hospital Management Platform and SaaS** engineered to streamline patient care, electronic health records (EHR), dynamic double-booking-free scheduling, 24/7 dental trauma emergency triage, post-operative surgical aftercare, and real-time AI voice consultations.

---

## 📑 Table of Contents

- [✨ Highlights](#-highlights)
- [📊 System Architecture & How It Works](#-system-architecture--how-it-works)
  - [1. High-Level System Architecture](#1-high-level-system-architecture)
  - [2. End-to-End Patient Journey Workflow](#2-end-to-end-patient-journey-workflow)
  - [3. 3-Step Smart Booking & Email Dispatch Sequence](#3-3-step-smart-booking--email-dispatch-sequence)
  - [4. AI Voice Dental Consultation Architecture](#4-ai-voice-dental-consultation-architecture)
  - [5. Database Entity Relationship Diagram (ERD)](#5-database-entity-relationship-diagram-erd)
- [🚀 Core Features & Modules](#-core-features--modules)
  - [🚨 24/7 Dental Trauma & Emergency Triage](#-247-dental-trauma--emergency-triage)
  - [🩺 Specialized Hospital Departments (`/services`)](#-specialized-hospital-departments-services)
  - [📋 Patient Health Vault & EHR (`/records`)](#-patient-health-vault--ehr-records)
  - [🩹 Post-Operative Aftercare Hub (`/aftercare`)](#-post-operative-aftercare-hub-aftercare)
  - [📅 3-Step Smart Booking Engine (`/appointments`)](#-3-step-smart-booking-engine-appointments)
  - [🎙️ AI Voice Dental Assistant (`/voice`)](#-ai-voice-dental-assistant-voice)
  - [🛡️ Practice Management Portal (`/admin`)](#-practice-management-portal-admin)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started & Installation](#️-getting-started--installation)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository & Install Dependencies](#1-clone-repository--install-dependencies)
  - [2. Environment Variables Configuration](#2-environment-variables-configuration)
  - [3. Database Migration & Prisma Generation](#3-database-migration--prisma-generation)
  - [4. Run Local Development Server](#4-run-local-development-server)
- [📜 Available Scripts](#-available-scripts)
- [📄 License](#-license)

---

## ✨ Highlights

- 🏥 **Hospital-Grade Patient Portal**: Modern medical UI featuring glassmorphism, responsive navigation, clinic accreditation badges, and interactive triage.
- 🚨 **24/7 Emergency Triage & Trauma Desk**: Level 1–3 severity classifier with clinical first-aid protocols and direct hotline dialing (`+1 800-433-6824`).
- 🩺 **Specialized Departments Catalog (`/services`)**: 8 clinical divisions (Oral Surgery, Orthodontics, Endodontics, Implants, Periodontics, Pediatric, Cosmetic, and Emergency Trauma) with procedure checklists, preparation guidelines, and transparent fee schedules.
- 📋 **Patient Health Vault & EHR (`/records`)**: Digital Patient ID card, drug allergy registry (penicillin, latex, epinephrine, NSAIDs), active medication regimens, and chronological treatment history pulled from PostgreSQL.
- 🖨️ **Printable Official Clinic Pass**: Hospital-grade printable pass with appointment slip, barcode, QR verification placeholder, attending doctor signature line, and pre-visit clinical checklist.
- 🩹 **Post-Operative Aftercare Hub (`/aftercare`)**: Procedure-specific recovery guides (extractions, root canals, implants, whitening), day-by-day milestone timelines, and interactive healing checklists.
- 🗣️ **AI Voice Dental Assistant (`/voice`)**: Real-time voice consultation powered by **Vapi AI** (*Riley* persona) with audio waveforms and live conversational transcripts.
- 📅 **3-Step Smart Booking Flow (`/appointments`)**: Doctor search, specialty filter chips, dynamic 5-day slot selection, and real-time double-booking prevention backed by PostgreSQL.
- 👨‍⚕️ **Deterministic Clinical Avatar System**: Professional high-resolution doctor photography dynamically assigned and verified (`getSafeAvatarUrl()`) ensuring zero broken avatar links.
- 📩 **Automated Confirmation Emails**: Responsive HTML email templates dispatched via **React Email + Resend**.
- 📊 **Practice Management Portal (`/admin`)**: Role-protected dashboard with practice metrics, doctor CRUD operations, and one-click appointment status toggles (`CONFIRMED` ↔ `COMPLETED`).
- 🔐 **Authentication & Subscriptions**: Multi-method login via **Clerk** with subscription tier gating (`ai_basic` & `ai_pro`) and `<PricingTable />`.

---

## 📊 System Architecture & How It Works

### 1. High-Level System Architecture

The following diagram illustrates how clients, frontend layers, Next.js Server Actions, APIs, third-party microservices, and databases interact:

```mermaid
flowchart TD
    subgraph ClientLayer["🖥️ Client Layer (Browser)"]
        UserBrowser["Patient Portal & Dashboard\n(Next.js App Router)"]
        AdminBrowser["Practice Admin Dashboard\n(Role Protected)"]
        VoiceClient["Vapi Web Audio SDK\n(Microphone & Speakers)"]
    end

    subgraph SecurityMiddleware["🔐 Security & Auth Layer"]
        ClerkAuth["Clerk Authentication\nMiddleware & JWT Sessions"]
        RoleCheck["Admin Email Verification\n(ADMIN_EMAIL)"]
    end

    subgraph AppServer["⚡ DentAIva Application Server (Next.js 15)"]
        AppRouter["App Router Pages\n(/, /dashboard, /appointments, /records, /aftercare, /services, /admin, /voice)"]
        ServerActions["Server Actions\n(appointments.ts, doctors.ts, users.ts)"]
        EmailRoute["API Route\n(/api/send-appointment-email)"]
    end

    subgraph DatabaseLayer["🗄️ Database & Storage Layer"]
        PrismaORM["Prisma ORM 6 Client"]
        NeonDB[("Neon Serverless\nPostgreSQL Database")]
    end

    subgraph ExternalServices["🌐 External Cloud Services"]
        VapiCloud["Vapi AI Voice Cloud\n(Riley Dental Persona)"]
        ResendMail["Resend Email Service\n(React Email Templates)"]
    end

    UserBrowser -->|HTTPS / Next.js Pages| ClerkAuth
    AdminBrowser -->|HTTPS / Admin View| RoleCheck
    RoleCheck -->|Allow / Deny| AppRouter

    ClerkAuth -->|Verified Session| AppRouter
    AppRouter -->|Calls| ServerActions
    AppRouter -->|Triggers| EmailRoute

    ServerActions -->|Type-Safe Queries| PrismaORM
    PrismaORM -->|SQL Queries & Pooling| NeonDB

    EmailRoute -->|Dispatches HTML Template| ResendMail
    ResendMail -->|Delivers Confirmation Email| UserBrowser

    VoiceClient <-->|WebRTC / Bi-directional Audio| VapiCloud
```

---

### 2. End-to-End Patient Journey Workflow

This flowchart outlines the complete patient journey from landing on the website to booking appointments, consulting AI, reviewing medical records, and managing post-op aftercare:

```mermaid
flowchart LR
    Start(["Patient Visits DentAIva"]) --> AuthCheck{"Authenticated via Clerk?"}

    AuthCheck -- "No" --> Landing["Landing Page\n(Overview, Reviews, Pricing)"]
    AuthCheck -- "Yes" --> UserSync["UserSync Action\n(Synchronize Clerk with DB)"]
    UserSync --> Dashboard["Patient Dashboard"]

    Dashboard --> Choice{"Choose Action"}

    Choice -->|"Book Appointment"| BookFlow["3-Step Smart Booking\n(/appointments)"]
    Choice -->|"Dental Emergency"| TriageModal["24/7 Emergency Triage\n(Level 1, 2, 3 Triage)"]
    Choice -->|"AI Consultation"| PlanGate{"Has Active Pro Plan?"}
    Choice -->|"View EHR & Pass"| Records["Health Vault & EHR\n(/records)"]
    Choice -->|"Post-Op Recovery"| Aftercare["Aftercare Hub\n(/aftercare)"]
    Choice -->|"Browse Specialties"| Services["Departments Catalog\n(/services)"]

    PlanGate -- "Yes" --> VoiceRoom["AI Voice Assistant\n(/voice - Riley)"]
    PlanGate -- "No" --> UpgradePricing["Upgrade Billing Tier\n(/pro)"]

    TriageModal -->|"Level 1 Critical"| Hotline["Dial Direct Hotline\n+1 800-433-6824"]
    TriageModal -->|"Level 2/3"| BookFlow

    BookFlow --> SlotCheck["Select Active Doctor\n& Pick Open Slot (5-Day)"]
    SlotCheck --> ConfirmBooking["Persist Appointment\nStatus: CONFIRMED"]
    ConfirmBooking --> DispatchEmail["Trigger Resend\nConfirmation Email"]
    DispatchEmail --> PassGen["Generate Printable\nOfficial Clinic Pass"]
```

---

### 3. 3-Step Smart Booking & Email Dispatch Sequence

The sequence diagram below displays the real-time interaction between the patient, React components, Next.js Server Actions, PostgreSQL, and Resend:

```mermaid
sequenceDiagram
    autonumber
    actor Patient as 👤 Patient
    participant UI as 💻 Booking UI (/appointments)
    participant Action as ⚙️ Server Action (appointments.ts)
    participant DB as 🗄️ PostgreSQL (Neon / Prisma)
    participant API as 📬 Email API (/api/send-appointment-email)
    participant Resend as ✉️ Resend Service

    Patient->>UI: 1. Select Doctor & Specialty
    UI->>Action: getBookedTimeSlots(doctorId, date)
    Action->>DB: Query appointments where date = date and status in [CONFIRMED, COMPLETED]
    DB-->>Action: Return booked slots array
    Action-->>UI: Return occupied time slots
    UI-->>Patient: 2. Render available 30-min slots for next 5 days

    Patient->>UI: 3. Select Slot & Add Reason (e.g. Toothache)
    UI->>Action: bookAppointment({ doctorId, date, time, reason })
    Action->>DB: Verify user session & INSERT Appointment
    DB-->>Action: Return created Appointment object
    Action-->>UI: Return confirmed appointment payload

    UI->>API: POST /api/send-appointment-email with details
    API->>Resend: resend.emails.send(AppointmentConfirmationEmail)
    Resend-->>Patient: Deliver HTML confirmation email
    UI-->>Patient: Show Success Toast & Confirmation Modal
```

---

### 4. AI Voice Dental Consultation Architecture

DentAIva integrates **Vapi Web SDK** with a custom dental assistant configuration (*Riley*) to provide instant voice triage and guidance:

```mermaid
flowchart TD
    subgraph BrowserEnvironment["🌐 Client Browser"]
        UserMic["🎤 Patient Audio Input (Microphone)"]
        UserSpeaker["🔊 Assistant Audio Output (Speakers)"]
        Waveform["🌊 Real-Time Audio Visualizer"]
        TranscriptBox["📝 Live Conversational Transcript"]
    end

    subgraph ClientController["📦 DentAIva Voice Module (/voice)"]
        PlanGuard["Clerk Subscription Gate\n(ai_basic or ai_pro)"]
        VapiSDK["Vapi Web SDK Client\n(@vapi-ai/web)"]
    end

    subgraph VapiServer["☁️ Vapi AI Cloud Platform"]
        STT["Real-Time Speech-to-Text (Deepgram)"]
        LLM["Clinical Dental Brain (Riley Prompt)\n(LLM Analysis & Triage)"]
        TTS["Ultra-low Latency Text-to-Speech (Cartesia/11Labs)"]
    end

    PlanGuard -->|Pro Plan Verified| VapiSDK
    UserMic -->|WebRTC Audio Stream| VapiSDK
    VapiSDK -->|Bi-directional Audio| STT
    STT -->|Transcribed Text| LLM
    LLM -->|Clinical Response Tokens| TTS
    TTS -->|Synthesized Audio Stream| VapiSDK
    VapiSDK -->|Audio Playback| UserSpeaker
    VapiSDK -->|Audio Levels| Waveform
    VapiSDK -->|Transcript Delta Events| TranscriptBox
```

---

### 5. Database Entity Relationship Diagram (ERD)

The database schema is defined in `prisma/schema.prisma` and models users, doctors, and appointment reservations with referential integrity and cascade deletes:

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : "books"
    DOCTOR ||--o{ APPOINTMENT : "assigned_to"

    USER {
        string id PK "cuid()"
        string clerkId UK "Clerk Session ID"
        string email UK "User primary email"
        string firstName "Optional first name"
        string lastName "Optional last name"
        string phone "Optional phone number"
        datetime createdAt "Timestamp"
        datetime updatedAt "Timestamp"
    }

    DOCTOR {
        string id PK "cuid()"
        string name "Doctor Full Name"
        string email UK "Official Clinic Email"
        string phone "Contact Phone"
        string speciality "Clinical Speciality"
        string bio "Professional Biography"
        string imageUrl "Deterministic Avatar URL"
        Gender gender "MALE | FEMALE"
        boolean isActive "Default: true"
        datetime createdAt "Timestamp"
        datetime updatedAt "Timestamp"
    }

    APPOINTMENT {
        string id PK "cuid()"
        datetime date "Appointment Date"
        string time "Time slot (e.g. 14:30)"
        int duration "Duration in minutes (Default: 30)"
        AppointmentStatus status "CONFIRMED | COMPLETED"
        string notes "Clinical notes"
        string reason "Reason for consultation"
        datetime createdAt "Timestamp"
        datetime updatedAt "Timestamp"
        string userId FK "References USER.id (Cascade)"
        string doctorId FK "References DOCTOR.id (Cascade)"
    }
```

---

## 🚀 Core Features & Modules

### 🚨 24/7 Dental Trauma & Emergency Triage
- **Clinical Severity Classification**:
  - **Level 1 (Critical)**: Avulsed (knocked-out) permanent tooth, severe uncontrolled hemorrhage, expanding facial swelling with airway compromise.
  - **Level 2 (Urgent)**: Acute irreversible pulpitis, periapical abscess, tooth fracture exposing dental pulp.
  - **Level 3 (Moderate)**: Displaced restoration/crown, minor enamel chip, mild thermal sensitivity.
- **Actionable First-Aid Guides**: Instructions on transporting knocked-out teeth in cold milk or Hank's Balanced Salt Solution (HBSS), cold compression timing, and avoiding aspirin on open bleeding.
- **Emergency Hotline Quick-Dial**: One-tap dialing to the trauma response desk (`+1 800-433-6824`) with instant appointment booking shortcuts.

### 🩺 Specialized Hospital Departments (`/services`)
- **8 Clinical Divisions**:
  1. **Oral & Maxillofacial Surgery** (Complex extractions, wisdom teeth, jaw realignment)
  2. **Orthodontics & Dentofacial Orthopedics** (Clear aligners, self-ligating brackets)
  3. **Endodontics & Micro-Dentistry** (Rotary root canal therapy, apicoectomy)
  4. **Periodontics & Implantology** (Titanium implants, bone grafting, deep scaling)
  5. **Pediatric Dentistry** (Preventive fluoride varnish, sealants, interceptive ortho)
  6. **Cosmetic & Aesthetic Dentistry** (Laser whitening, porcelain veneers)
  7. **Restorative Dentistry** (Biocompatible composite fillings, onlays, crowns)
  8. **Trauma & 24/7 Emergency Care** (Immediate trauma stabilization)
- **Pre-Procedure Preparation**: Fasting windows, escort requirements for IV sedation, and blood-thinner hold advisories.

### 📋 Patient Medical Records & Health Vault (`/records`)
- **Digital Patient ID Card**: Displays official medical identification number, blood type, and emergency contacts.
- **Drug Allergy Warnings**: High-visibility clinical alert badges for penicillin, latex, epinephrine, and NSAID hypersensitivities.
- **Active Prescription Regimens**: Comprehensive tracker displaying dosage instructions, attending doctor signature, and remaining days.
- **Printable Official Clinic Pass**: Hospital-grade printable pass with barcode, QR code verification block, and doctor signature block for check-in verification.

### 🩹 Post-Operative Aftercare Hub (`/aftercare`)
- **Procedure-Specific Recovery Protocols**: Tailored instructions for extractions, surgical wisdom tooth removal, endodontic therapy, implants, and laser treatments.
- **Interactive Healing Checklist**: Check off post-op milestones (sterile gauze compression, ice pack 20-min cycles, salt water rinses, medication adherence).
- **Hospital Red Flag Warnings**: Clear clinical warnings on when to return immediately (fever > 101°F, persistent bleeding after 4 hours, difficulty swallowing).

### 📅 3-Step Smart Booking Engine (`/appointments`)
- **Step 1 - Select Doctor**: Filter clinic practitioners by department, read credentials, and view verified portraits.
- **Step 2 - Choose Slot**: Dynamic slot picker showing open 30-minute intervals across the upcoming 5 days, automatically disabling reserved slots.
- **Step 3 - Confirmation & Reason**: Provide reason for visit, review appointment summary, and confirm.
- **Automated Email Notifications**: Automatically dispatches a formatted HTML confirmation email via **Resend** with visit details and clinic instructions.

### 🎙️ AI Voice Dental Assistant (`/voice`)
- **Riley persona**: Configured with dental clinical knowledge to provide preliminary advice, preparation steps, and pricing guidance.
- **Subscription-Gated**: Requires an active `ai_basic` or `ai_pro` plan, enforced via Clerk server-side session checks.
- **Interactive UI**: Real-time waveform audio visualizer and live conversational transcript box.

### 🛡️ Practice Management Portal (`/admin`)
- **Role-Based Access**: Restricted to administrative email (`ADMIN_EMAIL`), automatically redirecting unauthorized users.
- **Practice Analytics**: Real-time counters for active doctors, total appointments, completed visits, and overall completion rate.
- **Doctor CRUD**: Onboard new doctors with automatic deterministic avatars, edit doctor profiles, and toggle active/inactive status.
- **Appointment Status Toggling**: Instant one-click toggle between `CONFIRMED` and `COMPLETED`.

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
|---|---|---|
| **Core Framework** | [Next.js 15.5.0](https://nextjs.org/) | React Server Components, App Router, Turbopack, and Server Actions |
| **UI Library** | [React 19.1.4](https://react.dev/) | Modern concurrent UI rendering |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end static type safety |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS styling |
| **Component Primitives** | [Radix UI](https://www.radix-ui.com/) | Accessible, unstyled UI primitives (Dialog, Tabs, Accordion, Dropdown) |
| **Icons & Notifications** | [Lucide React](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/) | Clean iconography and rich toast notifications |
| **Database** | [PostgreSQL (Neon)](https://neon.tech/) | Serverless cloud PostgreSQL with connection pooling |
| **ORM** | [Prisma ORM 6.16.2](https://www.prisma.io/) | Type-safe database queries and migrations |
| **Authentication & Billing**| [Clerk](https://clerk.com/) (`@clerk/nextjs`) | User authentication, session management, and subscription tier checks |
| **Voice AI** | [Vapi Web SDK](https://vapi.ai/) (`@vapi-ai/web`)| Low-latency real-time voice consultations |
| **Email Service** | [Resend](https://resend.com/) + `@react-email` | Transactional appointment confirmation emails |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) | Client-side caching and state management |
| **Code Quality** | [Biome 2.2.0](https://biomejs.dev/) | Ultra-fast linter and formatter |

---

## 📁 Project Structure

```text
dentaiva/
├── prisma/
│   └── schema.prisma                   # PostgreSQL database schema (User, Doctor, Appointment)
├── public/                             # Static public assets (logos, illustrations, icons)
├── src/
│   ├── app/                            # Next.js App Router routes
│   │   ├── admin/                      # Role-protected practice admin portal
│   │   ├── aftercare/                  # Post-operative recovery hub & healing checklists
│   │   ├── api/                        # API route handlers
│   │   │   └── send-appointment-email/ # Resend appointment confirmation endpoint
│   │   ├── appointments/               # 3-step dynamic booking engine
│   │   ├── dashboard/                  # Authenticated patient dashboard
│   │   ├── pro/                        # Clerk subscription upgrade & pricing tables
│   │   ├── records/                    # EHR health vault & printable clinic pass
│   │   ├── services/                   # 8 clinical departments & procedure catalog
│   │   ├── voice/                      # AI voice consultation room (subscription-gated)
│   │   ├── globals.css                 # Global theme definitions and Tailwind CSS v4 setup
│   │   ├── layout.tsx                  # Root layout (Clerk, React Query, Toaster)
│   │   └── page.tsx                    # Landing page (redirects authenticated users)
│   ├── components/                     # Modular React UI components
│   │   ├── admin/                      # Admin stats, doctor dialogs, appointment tables
│   │   ├── appointments/               # Doctor selection, slot picker, confirmation modal
│   │   ├── dashboard/                  # Upcoming appointment cards, health metrics
│   │   ├── emails/                     # React Email appointment confirmation templates
│   │   ├── emergency/                  # 24/7 Dental Emergency Triage & Trauma Desk modal
│   │   ├── landing/                    # Hero, Features, CTA, Header, Footer, Pricing
│   │   ├── providers/                  # TanStack Query client provider wrapper
│   │   ├── ui/                         # Reusable UI component library (Radix + Tailwind)
│   │   ├── voice/                      # Vapi voice visualizer, live transcript, call controls
│   │   ├── Navbar.tsx                  # Global navigation bar with emergency triage button
│   │   └── UserSync.tsx                # Auto-syncs Clerk session user with PostgreSQL
│   ├── hooks/                          # Custom React Query and UI hooks
│   │   ├── use-appointment.ts          # Hooks for booking, fetching, and updating appointments
│   │   ├── use-doctors.ts              # Hooks for querying and mutating doctor records
│   │   └── use-mobile.ts               # Responsive screen breakpoint detector
│   ├── lib/                            # Core utilities, API clients, and server actions
│   │   ├── actions/                    # Next.js Server Actions
│   │   │   ├── appointments.ts         # Appointment CRUD and conflict checking logic
│   │   │   ├── doctors.ts              # Doctor CRUD and deterministic avatar generator
│   │   │   └── users.ts                # Clerk to Prisma user synchronization
│   │   ├── prisma.ts                   # Singleton Prisma Client instance
│   │   ├── resend.ts                   # Singleton Resend Client instance
│   │   ├── utils.ts                    # Class merges, date helpers, safe avatar resolver
│   │   ├── vapi-prompt.ts              # AI assistant clinical prompt instructions
│   │   └── vapi.ts                     # Vapi Web SDK client initialization
│   └── middleware.ts                   # Clerk session and route protection middleware
├── biome.json                          # Biome linting and formatting configuration
├── components.json                     # Shadcn UI configuration
├── next.config.ts                      # Next.js configuration (remote image hostnames)
├── package.json                        # NPM project dependencies and scripts
├── postcss.config.mjs                  # PostCSS plugins
└── tsconfig.json                       # TypeScript compiler options
```

---

## ⚙️ Getting Started & Installation

### Prerequisites

Ensure you have the following installed on your development machine:
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **PostgreSQL Database**: [Neon](https://neon.tech/) serverless PostgreSQL or a local instance
- **Clerk Account**: For user authentication and subscription plans ([clerk.com](https://clerk.com))
- **Vapi Account**: For AI voice assistant credentials ([vapi.ai](https://vapi.ai))
- **Resend Account**: For transactional confirmation emails ([resend.com](https://resend.com))

---

### 1. Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/Satyam6201/DentAIva.git

# Navigate into the project directory
cd dentaiva

# Install dependencies
npm install
```

---

### 2. Environment Variables Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Populate the `.env` file with your credentials:

```env
# ==============================================================================
# Database Configuration (Neon Serverless PostgreSQL recommended)
# ==============================================================================
DATABASE_URL="postgresql://username:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ==============================================================================
# Clerk Authentication & Subscriptions
# ==============================================================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# ==============================================================================
# Practice Administration
# ==============================================================================
ADMIN_EMAIL="admin@yourdomain.com"

# ==============================================================================
# Vapi AI Voice Dental Assistant
# ==============================================================================
NEXT_PUBLIC_VAPI_API_KEY="your-vapi-public-key"
NEXT_PUBLIC_VAPI_ASSISTANT_ID="your-vapi-assistant-id"

# ==============================================================================
# Resend Transactional Email Service
# ==============================================================================
RESEND_API_KEY="re_..."

# ==============================================================================
# Application Base URL
# ==============================================================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

| Variable | Description | Where to Get |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string with SSL | [Neon Console](https://neon.tech/) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk client-side publishable key | [Clerk Dashboard](https://dashboard.clerk.com/) |
| `CLERK_SECRET_KEY` | Clerk server-side secret key | [Clerk Dashboard](https://dashboard.clerk.com/) |
| `ADMIN_EMAIL` | Email granted access to `/admin` dashboard | Your preferred admin email address |
| `NEXT_PUBLIC_VAPI_API_KEY` | Vapi Web SDK public API key | [Vapi Dashboard](https://dashboard.vapi.ai/) |
| `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Vapi Assistant ID for the dental persona | [Vapi Dashboard](https://dashboard.vapi.ai/) |
| `RESEND_API_KEY` | Resend API key for transactional emails | [Resend Dashboard](https://resend.com/api-keys) |
| `NEXT_PUBLIC_APP_URL` | Base application URL for redirects and emails | `http://localhost:3000` (Dev) |

---

### 3. Database Migration & Prisma Generation

Push the Prisma schema to your PostgreSQL database and generate the Prisma client:

```bash
# Push schema changes to Neon PostgreSQL
npx prisma db push

# Generate the Prisma Client
npx prisma generate
```

---

### 4. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server with Turbopack fast refresh. |
| `npm run build` | Builds the optimized production bundle with Turbopack. |
| `npm run start` | Boots the compiled Next.js production server. |
| `npm run lint` | Runs Biome to check code style, syntax, and typing errors. |
| `npm run format` | Runs Biome to automatically format and fix source files. |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
