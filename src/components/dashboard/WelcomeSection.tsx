import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { ShieldCheckIcon, ClockIcon, ActivityIcon } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();

  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-gradient-to-br from-primary/15 via-primary/5 to-background rounded-3xl p-6 sm:p-8 border border-primary/20 mb-8 overflow-hidden gap-6">
      <div className="space-y-4 max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            <div className="size-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-primary">
              Clinic Open & Accepting Patients
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted/40 rounded-full border text-[11px] text-muted-foreground">
            <ShieldCheckIcon className="size-3 text-primary" />
            <span>Hospital Licence # DENT-TX-90210</span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
              ? "afternoon"
              : "evening"}
            , {user?.firstName || "Patient"}!
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Welcome to DentAIva Dental Hospital. Manage your upcoming consultations, view electronic health records, active prescriptions, and access 24/7 AI-guided triage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="size-3.5 text-primary" />
            <span>Today's Hours: 08:00 AM – 08:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ActivityIcon className="size-3.5 text-red-400" />
            <span>24/7 Emergency Trauma Desk Active</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/20 shrink-0">
        <Image
          src="/logo.png"
          alt="DentAIva Hospital"
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
        />
        <span className="text-[11px] font-mono font-bold text-primary mt-2">
          DentAIva HEALTH
        </span>
      </div>
    </div>
  );
}