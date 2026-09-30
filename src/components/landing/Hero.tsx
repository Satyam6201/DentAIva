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
import Link from "next/link";

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16">
      {/* GRID BG  */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>

      {/* GRADIENT ORBS */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-8">
              <div className="space-y-5">
                {/* BADGE */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm shadow-sm">
                  <div className="size-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-semibold text-primary">
                    AI-Powered Dental Hospital Platform
                  </span>
                </div>

                {/* MAIN HEADING */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                    Hospital-Grade
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    Dental Care
                  </span>
                  <br />
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                    with AI Speed
                  </span>
                </h1>

                {/* SUBTITLE */}
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
                  Connect 24/7 with our AI voice dental triage assistant, book appointments with board-certified dental surgeons across 8 clinical departments, and access digital electronic health records.
                </p>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-1">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl text-sm h-12 px-6 rounded-xl">
                    <MicIcon className="mr-2 size-5" />
                    Talk to Voice AI
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-sm h-12 px-6 rounded-xl font-semibold">
                    <CalendarIcon className="mr-2 size-5 text-primary" />
                    Book Clinic Visit
                  </Button>
                </SignUpButton>
              </div>

              {/* HOSPITAL TRUST PILLS */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="size-4 text-primary" />
                  <span>Licensed Hospital Clinic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PhoneCallIcon className="size-4 text-red-400" />
                  <span>24/7 Emergency Trauma Desk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StethoscopeIcon className="size-4 text-primary" />
                  <span>8 Dental Specializations</span>
                </div>
              </div>

              {/* USER TESTIMONIALS */}
              <div className="pt-4 border-t border-border/60">
                <div className="flex items-center gap-5">
                  {/* USER AVATARS */}
                  <div className="flex -space-x-3">
                    <Image
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                      alt="Jessica Davis"
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover ring-2 ring-background shadow-sm"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                      alt="Sam Miller"
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover ring-2 ring-background shadow-sm"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
                      alt="Anna Lopez"
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover ring-2 ring-background shadow-sm"
                    />
                    <Image
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face"
                      alt="Mike Rodriguez"
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover ring-2 ring-background shadow-sm"
                    />
                  </div>

                  {/* RATING AND STATS */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} className="size-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-foreground">4.9/5 Rating</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Trusted by <span className="font-semibold text-foreground">1,200+ patients</span> this month
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT - HERO IMAGE */}
            <div className="relative lg:pl-8 flex justify-center">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card/50 backdrop-blur-sm">
                <Image
                  src="/hero.png"
                  alt="DentAIva Dental Hospital AI"
                  width={600}
                  height={600}
                  priority
                  className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
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