import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CrownIcon, LockIcon } from "lucide-react";
import Link from "next/link";

function ProPlanRequired() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24 pb-16">
        <div className="max-w-xl mx-auto space-y-6">
          <Card className="border border-border/80 bg-card rounded-2xl shadow-xs overflow-hidden">
            <CardContent className="p-8 text-center space-y-5">
              <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary border border-primary/20">
                <LockIcon className="size-8 text-primary" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20 text-[11px] font-semibold text-primary uppercase tracking-wide">
                  <CrownIcon className="size-3" />
                  Membership Required
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Voice Assistant Access
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Voice consultations with Riley require an active AI Basic or AI Pro subscription plan.
                </p>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground max-w-sm mx-auto text-left pt-2">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  <span>24/7 unlimited real-time clinical audio calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  <span>Emergency trauma classification and first-aid tips</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  <span>Interactive audio waveforms and transcripts</span>
                </div>
              </div>

              <Link href="/pro" className="block pt-2">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-xs h-10 rounded-xl flex items-center justify-center gap-2 shadow-xs">
                  <CrownIcon className="size-4" />
                  View Membership Plans
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProPlanRequired;
