import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  CalendarIcon,
  MicIcon,
  StarIcon,
  ShieldCheckIcon,
  PhoneCallIcon,
  StethoscopeIcon,
} from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-16">
      {/* GRID BG  */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <div className="size-1.5 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Hospital-Grade AI Dental Platform
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-foreground">
                  Comprehensive Dental Care with AI Precision
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  Connect 24/7 with our AI voice dental triage assistant, book appointments with board-certified dental surgeons across 8 clinical departments, and access digital electronic health records.
                </p>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs h-11 px-5 rounded-xl shadow-xs flex items-center justify-center gap-2">
                    <MicIcon className="size-4" />
                    Consult Voice AI
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary text-xs h-11 px-5 rounded-xl font-semibold flex items-center justify-center gap-2">
                    <CalendarIcon className="size-4 text-primary" />
                    Book Clinic Visit
                  </Button>
                </SignUpButton>
              </div>

              {/* HOSPITAL TRUST PILLS */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="size-3.5 text-primary" />
                  <span>Licensed Hospital Clinic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PhoneCallIcon className="size-3.5 text-red-500" />
                  <span>24/7 Trauma Desk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StethoscopeIcon className="size-3.5 text-primary" />
                  <span>8 Clinical Specialties</span>
                </div>
              </div>

              {/* USER TESTIMONIALS */}
              <div className="pt-4 border-t border-border/60">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2.5">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                      alt="Jessica Davis"
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover ring-2 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                      alt="Sam Miller"
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover ring-2 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                      alt="Anna Lopez"
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover ring-2 ring-background"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                      alt="Mike Rodriguez"
                      width={36}
                      height={36}
                      className="size-9 rounded-full object-cover ring-2 ring-background"
                    />
                  </div>

                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className="size-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="font-bold text-foreground">4.9/5 Rating</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Trusted by over <strong className="text-foreground">1,200+ patients</strong> this month
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT - HERO IMAGE */}
            <div className="relative flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-xl bg-card">
                <Image
                  src="/hero.png"
                  alt="DentAIva Dental Hospital AI"
                  width={540}
                  height={540}
                  priority
                  className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
