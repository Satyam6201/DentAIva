import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { ClockIcon, ActivityIcon } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();

  const timeOfDay =
    new Date().getHours() < 12
      ? "morning"
      : new Date().getHours() < 18
      ? "afternoon"
      : "evening";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card/90 border border-border/80 rounded-2xl p-5 sm:p-6 mb-6 gap-4 shadow-xs">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-500/20 text-[11px] font-semibold">
          <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Clinic Open &bull; Accepting Appointments
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Good {timeOfDay}, {user?.firstName || "Patient"}!
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl leading-relaxed">
          Welcome to your dental health portal. View upcoming visits, review clinical records, and consult our AI voice assistant.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <ClockIcon className="size-3 text-primary" />
            <span>Hours: 08:00 AM – 08:00 PM</span>
          </div>
          <span>&bull;</span>
          <div className="flex items-center gap-1">
            <ActivityIcon className="size-3 text-red-500" />
            <span>24/7 Trauma Hotline: +1 (800) 433-6824</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border/50 shrink-0">
        <Image
          src="/logo.png"
          alt="DentAIva Hospital"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
        />
        <div className="text-left font-mono">
          <div className="text-xs font-bold text-foreground">DentAIva CLINIC</div>
          <div className="text-[10px] text-muted-foreground">Licence # DENT-TX</div>
        </div>
      </div>
    </div>
  );
}
