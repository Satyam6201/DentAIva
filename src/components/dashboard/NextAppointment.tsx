import { getUserAppointments } from "@/lib/actions/appointments";
import { format, isSameDay, parseISO } from "date-fns";
import NoNextAppointments from "./NoNextAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon, PrinterIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

async function NextAppointment() {
  const appointments = await getUserAppointments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments =
    appointments?.filter((appointment) => {
      const parts = appointment.date.split("T")[0].split("-").map(Number);
      const appointmentDate = new Date(parts[0], parts[1] - 1, parts[2]);
      appointmentDate.setHours(0, 0, 0, 0);
      const isUpcoming = appointmentDate.getTime() >= today.getTime();
      return isUpcoming && appointment.status === "CONFIRMED";
    }) || [];

  const nextAppointment = upcomingAppointments[0];

  if (!nextAppointment) return <NoNextAppointments />;

  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
  const isToday = isSameDay(appointmentDate, new Date());

  return (
    <Card className="border border-primary/25 bg-card rounded-2xl shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="p-5 pb-3">
          <CardTitle className="flex items-center justify-between text-base font-bold text-foreground">
            <span className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-primary" />
              Next Scheduled Visit
            </span>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20">
              <span className="size-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-semibold text-primary font-mono uppercase">
                {isToday ? "Today" : "Upcoming"}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-3">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border/50">
            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 text-primary">
              <UserIcon className="size-4" />
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-xs text-foreground truncate">{nextAppointment.doctorName}</p>
              <p className="text-[11px] text-muted-foreground truncate">{nextAppointment.reason || "General Consultation"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border/50">
            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 text-primary">
              <CalendarIcon className="size-4" />
            </div>
            <div>
              <p className="font-semibold text-xs text-foreground">{formattedDate}</p>
              <p className="text-[10px] text-muted-foreground font-mono">
                {isToday ? "Check-in today" : format(appointmentDate, "EEEE")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/20 border border-border/50">
            <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 text-primary">
              <ClockIcon className="size-4" />
            </div>
            <div>
              <p className="font-semibold text-xs text-foreground font-mono">{nextAppointment.time}</p>
              <p className="text-[10px] text-muted-foreground">Main Clinic Reception</p>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="p-5 pt-0 space-y-2.5">
        <Link href="/records" className="block w-full">
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-9 rounded-xl shadow-xs">
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
