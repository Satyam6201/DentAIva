import Navbar from "@/components/Navbar";
import { PricingTable } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CrownIcon, CheckCircle2Icon } from "lucide-react";
import { redirect } from "next/navigation";

async function ProPage() {
  const user = await currentUser();

  if (!user) redirect("/");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-card border border-border/80 rounded-2xl p-5 sm:p-6 gap-4 shadow-xs">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20 text-[11px] font-semibold text-primary uppercase tracking-wide">
                <CrownIcon className="size-3.5 text-primary" />
                Membership Tier
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Unlock Unlimited AI Voice Dental Care
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Real-time voice consultations with Riley, symptom triage, medication advice, and interactive audio transcripts.
              </p>

              <div className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2Icon className="size-3.5 text-primary" />
                  <span>Unlimited Voice Consultations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2Icon className="size-3.5 text-primary" />
                  <span>Real-Time Speech Transcripts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2Icon className="size-3.5 text-primary" />
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center size-14 bg-primary/10 rounded-xl border border-primary/20 text-primary shrink-0">
              <CrownIcon className="size-7 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Choose Your Plan
              </h2>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Secure subscriptions handled with bank-level encryption via Clerk.
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-6 shadow-xs">
              <PricingTable />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProPage;
