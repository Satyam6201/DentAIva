import Navbar from "@/components/Navbar";
import { PricingTable } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CrownIcon, CheckCircle2Icon, ShieldCheckIcon, SparklesIcon, MicIcon } from "lucide-react";
import { redirect } from "next/navigation";

async function ProPage() {
  const user = await currentUser();

  if (!user) redirect("/");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* PRO HERO BANNER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/20 p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <div className="size-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Hospital Pro Membership
                  </span>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-2">
                    Unlock Unlimited AI Voice Dental Care
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Get continuous real-time voice consultations with Riley, priority appointment slots, instant digital prescriptions, and emergency trauma guidance.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2 text-xs text-foreground">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    <span>Unlimited Vapi Voice Calls</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    <span>Live Speech Transcripts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    <span>Cancel or Change Anytime</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center size-36 bg-gradient-to-br from-primary/25 to-primary/10 rounded-3xl border border-primary/25 shadow-xl shrink-0">
                <CrownIcon className="size-16 text-primary animate-pulse" />
              </div>
            </div>
          </div>

          {/* PRICING SECTION */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Select Your Care Membership Tier
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Secure subscription processed with bank-level encryption via Clerk Billing.
              </p>
            </div>

            <div className="rounded-3xl border border-border/80 bg-card/60 p-4 sm:p-8 backdrop-blur-md shadow-lg">
              <PricingTable />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProPage;
