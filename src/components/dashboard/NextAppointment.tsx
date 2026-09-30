import { getUserAppointments } from "@/lib/actions/appointments";
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import NoNextAppointments from "./NoNextAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon, PrinterIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

async function NextAppointment() {
  const appointments = await getUserAppointments();

  // filter for upcoming CONFIRMED appointments only (today or future)
  const upcomingAppointments =
    appointments?.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      const today = new Date();
      const isUpcoming = isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
      return isUpcoming && appointment.status === "CONFIRMED";
    }) || [];

  const nextAppointment = upcomingAppointments[0];

  if (!nextAppointment) return <NoNextAppointments />;

  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
  const isToday = isSameDay(appointmentDate, new Date());

  return (
    <Card className="border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base font-bold">
            <span className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-primary" />
              Next Scheduled Visit
            </span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/15 rounded-full border border-primary/25">
              <div className="size-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-semibold text-primary font-mono uppercase">
                {isToday ? "Today" : "Upcoming"}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border/50">
              <div className="size-8 bg-primary/15 rounded-lg flex items-center justify-center shrink-0">
                <UserIcon className="size-4 text-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-xs text-foreground truncate">{nextAppointment.doctorName}</p>
                <p className="text-[11px] text-muted-foreground truncate">{nextAppointment.reason || "General Consultation"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border/50">
              <div className="size-8 bg-primary/15 rounded-lg flex items-center justify-center shrink-0">
                <CalendarIcon className="size-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-xs text-foreground">{formattedDate}</p>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {isToday ? "Clinic check-in today" : format(appointmentDate, "EEEE")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border/50">
              <div className="size-8 bg-primary/15 rounded-lg flex items-center justify-center shrink-0">
                <ClockIcon className="size-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-xs text-foreground font-mono">{nextAppointment.time}</p>
                <p className="text-[10px] text-muted-foreground">Floor 1 • Reception A</p>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="p-6 pt-0 space-y-3">
        <Link href="/records" className="block w-full">
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white text-xs h-9 rounded-xl shadow-sm">
            <PrinterIcon className="size-3.5 mr-1.5" />
            Print Official Clinic Pass
          </Button>
        </Link>

        {upcomingAppointments.length > 1 && (
          <p className="text-[11px] text-center text-muted-foreground font-mono">
            +{upcomingAppointments.length - 1} more scheduled appointment
            {upcomingAppointments.length > 2 ? "s" : ""}
          </p>
        )}
      </div>
    </Card>
  );
}

export default NextAppointment;