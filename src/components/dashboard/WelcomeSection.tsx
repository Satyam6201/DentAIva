import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { ClockIcon, ActivityIcon } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();

  const currentHour = new Date().getHours();
  const timeOfDay =
    currentHour < 12 ? "morning" : currentHour < 18 ? "afternoon" : "evening";

  const displayName = user?.firstName || "Patient";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card border border-border/80 rounded-2xl p-5 sm:p-6 mb-6 gap-4 shadow-xs">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20 text-[11px] font-semibold">
          <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Clinic Open &bull; Accepting Appointments
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Good {timeOfDay}, {displayName}
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
          Access your appointment calendar, treatment history, and AI voice consultations.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <ClockIcon className="size-3 text-primary" />
            <span>Clinic Hours: 08:00 AM – 08:00 PM</span>
          </div>
          <span className="text-border">&bull;</span>
          <div className="flex items-center gap-1">
            <ActivityIcon className="size-3 text-red-500" />
            <span>Emergency Desk: +1 (800) 433-6824</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-border/60 shrink-0">
        <Image
          src="/logo.png"
          alt="DentAIva"
          width={36}
          height={36}
          className="size-9 object-contain"
        />
        <div className="text-left font-mono">
          <div className="text-xs font-bold text-foreground tracking-wide">DentAIva</div>
          <div className="text-[10px] text-muted-foreground">Accredited Dental Clinic</div>
        </div>
      </div>
    </div>
  );
}
