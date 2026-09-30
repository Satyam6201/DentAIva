import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, CheckCircle2, TrendingUp } from "lucide-react";

interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

function AdminStats({
  activeDoctors,
  totalDoctors,
  completedAppointments,
  totalAppointments,
}: AdminStatsProps) {
  const completionRate =
    totalAppointments > 0
      ? Math.round((completedAppointments / totalAppointments) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <Card className="border border-border/80 bg-card/90 shadow-sm hover:border-primary/40 transition-all">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total Doctors
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground mt-1">
                {totalDoctors}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                On medical hospital roster
              </div>
            </div>
            <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary">
              <Users className="size-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/80 bg-card/90 shadow-sm hover:border-green-500/40 transition-all">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Active On-Duty
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-green-400 mt-1">
                {activeDoctors}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Available for bookings
              </div>
            </div>
            <div className="size-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20 text-green-400">
              <UserCheck className="size-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/80 bg-card/90 shadow-sm hover:border-primary/40 transition-all">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total Visits
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-foreground mt-1">
                {totalAppointments}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1">
                Scheduled consultations
              </div>
            </div>
            <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 text-primary">
              <Calendar className="size-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/80 bg-card/90 shadow-sm hover:border-blue-500/40 transition-all">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Completed ({completionRate}%)
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-400 mt-1">
                {completedAppointments}
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="size-3 text-green-400" />
                <span>Successful care delivery</span>
              </div>
            </div>
            <div className="size-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 text-blue-400">
              <CheckCircle2 className="size-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminStats;