# DentAIva 🦷 — AI-Powered Dental Practice Management

DentAIva is a modern SaaS platform designed to revolutionize dental clinic operations. It combines a high-performance **Next.js** frontend with an **AI Voice Assistant** to automate patient interactions, bookings, and billing.

![DentAIva Hero Section]

## 🚀 Features

### 🎙️ AI Voice Agent (Powered by Vapi)
* **24/7 Virtual Receptionist**: A real-time voice agent that answers dental queries and assists in booking.
* **Instant Advice**: Provides personalized care recommendations based on user input.

### 📅 Smart Appointment System
* **3-Step Booking Flow**: Seamless UX for selecting a Dentist → Service & Time → Confirmation.
* **Real-time Availability**: Managed via PostgreSQL to prevent double bookings.

### 🔐 Secure Authentication & SaaS Features
* **Clerk Auth**: Secure login via Google, GitHub, or Email with 6-digit verification.
* **Subscription Tiers**: Free and Pro plans with smart logic to handle mid-cycle upgrades.
* **Automated Billing**: Integrated invoice generation sent directly via email.

### 📊 Admin Dashboard
* **Practice Overview**: Monitor total doctors, active sessions, and appointment success rates.
* **Management Tools**: Full CRUD functionality to manage doctor profiles and schedules.

## 🛠️ Tech Stack

| Layer              | Technology                                                         |
|--------------------|--------------------------------------------------------------------|
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, Shadcn UI                   |
| **Backend** | Next.js Server Actions, Prisma ORM                                 |
| **Database** | PostgreSQL (Neon DB)                                               |
| **Authentication** | Clerk                                                              |
| **AI / Voice** | Vapi AI                                                            |
| **Email** | Resend (React Email)                                               |
| **State Management**| TanStack Query (React Query)                                      |
| **Deployment** | Sevalla / Vercel                                                   |

## 📁 Project Structure

```text
├── components/          # Reusable Shadcn & Custom UI components
├── prisma/             # Database schema & migrations
├── src/
│   ├── app/            # Next.js App Router (Pages & API Routes)
│   ├── hooks/          # Custom TanStack Query hooks
│   ├── lib/            # Shared utilities (Prisma client, Resend config)
├── .env                # Environment variables (Clerk, Neon, Resend, Vapi)
└── public/             # Static assets (Hero images, logos)
