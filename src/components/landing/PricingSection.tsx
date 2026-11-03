import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircle2Icon } from "lucide-react";

function PricingSection() {
  return (
    <section id="pricing" className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="size-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              Transparent Pricing
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Simple Plans for Every Patient
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Free clinic scheduling forever, with optional membership tiers for unlimited AI voice consultations.
          </p>
        </div>

        {/* 3 PRICING CARDS */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {/* FREE PLAN */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Free</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-extrabold text-foreground font-mono">$0</span>
                  <span className="text-xs text-muted-foreground">/ month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Essential clinic appointment booking
                </p>
              </div>

              <SignUpButton mode="modal">
                <Button variant="outline" className="w-full text-xs h-9 rounded-xl font-semibold">
                  Get Started Free
                </Button>
              </SignUpButton>

              <div className="space-y-2.5 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Unlimited in-clinic appointment booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Access to all 8 specialty departments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Digital Patient ID card & print pass</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Automated confirmation email notices</span>
                </div>
              </div>
            </div>
          </div>

          {/* BASIC PLAN (FEATURED) */}
          <div className="bg-card border-2 border-primary/40 rounded-2xl p-6 shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                Most Popular
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">AI Basic</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-extrabold text-primary font-mono">$9</span>
                  <span className="text-xs text-muted-foreground">/ month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  10 AI voice calls + appointment booking
                </p>
              </div>

              <SignUpButton mode="modal">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs h-9 rounded-xl font-semibold shadow-xs">
                  Subscribe to AI Basic
                </Button>
              </SignUpButton>

              <div className="space-y-2.5 pt-2 text-xs text-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Everything in Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>10 AI voice consultations per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Emergency symptom triage & medication advice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Live audio transcripts and call history</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRO PLAN */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">AI Pro</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-extrabold text-foreground font-mono">$19</span>
                  <span className="text-xs text-muted-foreground">/ month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Unlimited AI dental consultations
                </p>
              </div>

              <SignUpButton mode="modal">
                <Button variant="outline" className="w-full text-xs h-9 rounded-xl font-semibold border-primary/30 hover:border-primary">
                  Subscribe to AI Pro
                </Button>
              </SignUpButton>

              <div className="space-y-2.5 pt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Everything in AI Basic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Unlimited 24/7 AI voice calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Priority access to new specialty features</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-primary shrink-0" />
                  <span>Continuous post-operative recovery monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
