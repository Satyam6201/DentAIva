import { MicIcon } from "lucide-react";

function WelcomeSection() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card border border-border/80 rounded-2xl p-5 sm:p-6 mb-6 gap-4 shadow-xs">
      <div className="space-y-1.5 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20 text-[11px] font-semibold text-primary uppercase tracking-wide">
          <span className="size-1.5 bg-primary rounded-full animate-pulse" />
          Real-Time Voice Assistant
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          AI Voice Dental Consultation
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Talk to Riley, your AI dental assistant, using natural voice audio. Receive instant symptom guidance, medication advice, and procedure preparation steps.
        </p>
      </div>

      <div className="hidden lg:flex items-center justify-center size-14 bg-primary/10 rounded-xl border border-primary/20 text-primary shrink-0">
        <MicIcon className="size-7 text-primary" />
      </div>
    </div>
  );
}

export default WelcomeSection;
