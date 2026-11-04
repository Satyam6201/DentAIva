import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { HeartPulseIcon } from "lucide-react";
import { format } from "date-fns";

async function DentalHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  const memberSince = user?.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "Active";

  return (
    <Card className="lg:col-span-2 border border-border/80 bg-card rounded-2xl shadow-xs">
      <CardHeader className="p-5 sm:p-6 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
          <HeartPulseIcon className="size-4 text-primary" />
          Care Summary & Activity
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Your dental treatment progression and clinical visit history
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 pt-0">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 sm:p-4 bg-muted/20 rounded-xl border border-border/50">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-0.5">
              {appointmentStats.completedAppointments}
            </div>
            <div className="text-[11px] text-muted-foreground font-medium">Completed Visits</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-muted/20 rounded-xl border border-border/50">
            <div className="text-xl sm:text-2xl font-bold font-mono text-primary mb-0.5">
              {appointmentStats.totalAppointments}
            </div>
            <div className="text-[11px] text-muted-foreground font-medium">Total Scheduled</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-muted/20 rounded-xl border border-border/50">
            <div className="text-xl sm:text-2xl font-bold font-mono text-foreground mb-0.5">
              {memberSince}
            </div>
            <div className="text-[11px] text-muted-foreground font-medium">Patient Since</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;
