<img width="1280" height="720" alt="screenshot-for-readme" src="https://github.com/user-attachments/assets/eabb064d-fb59-4d66-9a9d-29a90774a1c7" /> 
## 🦷 DentAiva – AI Dentist SaaS (2025)

> **DentAiva** is a modern **AI-Powered Dentist SaaS Platform** built to help dental clinics manage doctors, appointments, patients, and notifications with automation and AI assistance.

---

## ✨ Highlights

🏠 **Modern Landing Page** with gradients & images  
🔐 **Authentication via Clerk** (Google, GitHub, Email & Password)  
🔑 **Email Verification** (6-digit OTP)  
📅 **Appointment Booking System**  
🦷 **3-Step Booking Flow** (Dentist → Service & Time → Confirm)  
📩 **Email Notifications** for bookings (Resend)  
📊 **Admin Dashboard** for managing appointments  
🗣️ **AI Voice Agent** powered by Vapi *(Pro plans only)*  
💳 **Subscription Payments** with Clerk *(Free + 2 Paid Plans)*  
🧾 **Automatic Invoices** sent via email  
💸 **Smart Subscription Upgrades** (pay only the difference)  
📂 **PostgreSQL** for data persistence  
🎨 **Styling** with Tailwind CSS + Shadcn UI  
⚡ **Data Fetching** with TanStack Query  
🤖 **CodeRabbit** for PR optimizations  
🧑‍💻 **Git & GitHub Workflow** (branches, PRs, merges)  
🚀 **Deployment on Sevalla** *(free-tier friendly)*  

---

## 🚀 Live Features

### 👨‍⚕️ Doctor Management
- Add / Edit / Activate / Deactivate doctors
- Doctor profiles with specialization & availability
- Avatar generation for doctors & patients

### 📅 Appointment System
- Book, reschedule, cancel appointments
- Appointment status tracking (Pending / Completed)
- Real-time availability handling

### 🤖 AI Assistance
- AI-powered dental assistant UI
- Smart appointment flow
- Future-ready AI integrations

### 📧 Email Notifications
- Appointment confirmation emails
- Professional HTML email templates
- Powered by **React Email + Resend**

### 🔐 Authentication & Roles
- Secure authentication using **Clerk**
- Role-based dashboards (Admin / Doctor / Patient)

### 📊 Admin Dashboard
- Total doctors
- Active doctors
- Total appointments
- Completed appointments
- Beautiful analytics cards

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React.js**
- 🔺 **Next.js (App Router)**
- 🎨 **Tailwind CSS**
- 🧠 **TypeScript**
- 🧩 **Lucide Icons**

### Backend / APIs
- 🌐 **Next.js API Routes**
- 🔐 **Clerk Authentication**
- 📩 **Resend (Email Service)**

### Email System
- ✉️ **@react-email/components**
- 🎨 Custom HTML email templates
- Email-safe image hosting

### Data & State
- 🔁 Custom React Hooks
- 📡 API-based data fetching

---

## 🖼️ Image & Asset Handling

- Next.js Image Optimization
- Remote images allowed via `next.config.ts`
- Public assets served from `/public`
- Email-safe absolute image URLs

---

## 📁 Project File Structure

```bash
DENTAVIA/
├── .clerk/                     # Clerk auth metadata
├── .next/                      # Next.js build output
├── node_modules/               # Dependencies
├── prisma/                     # Prisma schema & migrations
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/              # Admin routes
│   │   ├── api/                # API routes
│   │   ├── appointments/       # Appointment pages
│   │   ├── dashboard/          # User dashboard
│   │   ├── pro/                # Pro subscription pages
│   │   ├── voice/              # AI Voice (Vapi) pages
│   │   ├── favicon.ico
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   │
│   ├── components/             # Reusable UI components
│   │   ├── admin/              # Admin UI components
│   │   ├── appointments/       # Booking components
│   │   ├── dashboard/          # Dashboard widgets
│   │   ├── emails/             # React Email templates
│   │   ├── landing/            # Landing page sections
│   │   ├── providers/          # Context providers
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── voice/              # Voice agent components
│   │   ├── Navbar.tsx
│   │   └── UserSync.tsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-appointment.ts
│   │   ├── use-doctors.ts
│   │   └── use-mobile.ts
│   │
│   ├── lib/                    # Core utilities & services
│   │   ├── actions/            # Server actions
│   │   ├── prisma.ts           # Prisma client
│   │   ├── resend.ts           # Email (Resend) config
│   │   ├── utils.ts            # Helper functions
│   │   ├── vapi-prompt.ts      # Vapi AI prompts
│   │   ├── vapi.ts             # Vapi client
│   │   └── middleware.ts       # App middleware
│
├── .env                        # Environment variables
└── package.json
```


---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key

RESEND_API_KEY=your_resend_key

```

---

# 📦Installation & Setup
```
# Install dependencies
npm install

# Run development server
npm run dev
```
---

# App will run on:
```
http://localhost:3000
```
---

# 📧 Email Preview (React Email)
```
npx react-email preview
