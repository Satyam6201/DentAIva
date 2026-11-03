import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MicIcon, CalendarIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

function CTA() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-muted/10 via-background to-muted/5 border-t border-border/50">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <span className="size-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                24/7 Dental Platform
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
              Your Dental Health Journey Starts Here
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Join patients who rely on DentAIva for instant clinical triage, transparent pricing, and appointment scheduling.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <SignUpButton mode="modal">
                <Button className="h-10 px-5 text-xs font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xs flex items-center justify-center gap-2">
                  <MicIcon className="size-4" />
                  Try Voice Consultation
                </Button>
              </SignUpButton>

              <SignUpButton mode="modal">
                <Button variant="outline" className="h-10 px-5 text-xs font-semibold border-primary/30 hover:border-primary rounded-xl flex items-center justify-center gap-2">
                  <CalendarIcon className="size-4 text-primary" />
                  Book Clinic Visit
                </Button>
              </SignUpButton>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/cta.png"
                alt="DentAIva AI Clinical Assistant"
                width={260}
                height={260}
                className="w-64 h-auto object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
