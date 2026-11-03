import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 px-4 sm:px-6 outline-hidden z-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-4">
          <ZapIcon className="size-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">Simple Process</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
          Three Steps to Better Dental Health
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From AI symptom analysis to booking hospital specialists, care is accessible and stress-free.
        </p>
      </div>

      {/* 3 STEPS */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* STEP 1 */}
        <div className="relative group bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-6 shadow-xs transition-all">
          <div className="size-7 bg-primary text-white text-xs font-bold rounded-lg flex items-center justify-center mb-4">
            1
          </div>

          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Image src="/audio.png" alt="Voice Consultation" width={28} height={28} className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold mb-2 text-foreground">Ask Questions</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Speak directly with our AI dental voice assistant about pain, swelling, procedures, and oral health tips.
          </p>

          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">
              24/7 Available
            </span>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">
              Instant Triage
            </span>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="relative group bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-6 shadow-xs transition-all">
          <div className="size-7 bg-primary text-white text-xs font-bold rounded-lg flex items-center justify-center mb-4">
            2
          </div>

          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Image src="/brain.png" alt="Clinical AI" width={28} height={28} className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold mb-2 text-foreground">Get Clinical Guidance</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Receive personalized home care advice, medication directions, and emergency classification.
          </p>

          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">
              Hospital Protocols
            </span>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">
              Pain Management
            </span>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="relative group bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-6 shadow-xs transition-all">
          <div className="size-7 bg-primary text-white text-xs font-bold rounded-lg flex items-center justify-center mb-4">
            3
          </div>

          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
            <Image src="/calendar.png" alt="Book Appointment" width={28} height={28} className="w-7 h-7" />
          </div>

          <h3 className="text-lg font-bold mb-2 text-foreground">Book In-Clinic Visit</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            Schedule with verified dental specialists, receive automated confirmation emails, and get clinic passes.
          </p>

          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">
              Board Certified
            </span>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[11px] font-medium rounded-full">
              Instant Confirmation
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <SignUpButton mode="modal">
          <Button size="lg" className="h-10 px-6 text-xs font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xs">
            Get Started Now
            <ArrowRightIcon className="ml-1.5 size-4" />
          </Button>
        </SignUpButton>
      </div>
    </section>
  );
}

export default HowItWorks;
