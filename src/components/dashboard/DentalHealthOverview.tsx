import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HeartPulseIcon, MessageSquareIcon, StethoscopeIcon, ArrowRightIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

async function DentalHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  const memberSince = user?.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "Active";

  return (
    <Card className="lg:col-span-2 border border-border/80 bg-card/90 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          <HeartPulseIcon className="size-5 text-primary" />
          Clinical Care Summary
        </CardTitle>
        <CardDescription className="text-xs">
          Your dental treatment progression and hospital visit history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/20 rounded-2xl border border-border/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-green-400 mb-1">
              {appointmentStats.completedAppointments}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Completed Visits</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-2xl border border-border/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary mb-1">
              {appointmentStats.totalAppointments}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Total Scheduled</div>
          </div>
          <div className="text-center p-4 bg-muted/20 rounded-2xl border border-border/60">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground mb-1">
              {memberSince}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Patient Since</div>
          </div>
        </div>

        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent rounded-2xl border border-primary/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="size-11 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 border border-primary/30">
                <StethoscopeIcon className="size-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-foreground">Need specialized dental care?</h4>
                <p className="text-xs text-muted-foreground">
                  Access 8 hospital departments or consult our 24/7 AI voice assistant for triage.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="w-full text-xs h-9 border-primary/30 hover:bg-primary/10">
                  Departments
                </Button>
              </Link>
              <Link href="/appointments" className="w-full sm:w-auto">
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs h-9 px-4 shadow-sm">
                  Book Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;