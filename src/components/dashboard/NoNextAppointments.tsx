import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

function NoNextAppointments() {
  return (
    <Card className="border border-border/80 bg-card rounded-2xl shadow-xs flex flex-col justify-between">
      <CardHeader className="p-5 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
          <CalendarIcon className="size-4 text-primary" />
          Next Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="text-center py-6 text-muted-foreground">
          <div className="size-12 bg-muted/40 rounded-2xl flex items-center justify-center mx-auto mb-3 text-muted-foreground">
            <CalendarIcon className="size-6 opacity-60" />
          </div>
          <p className="text-xs font-medium text-foreground mb-1">No Upcoming Appointments</p>
          <p className="text-[11px] text-muted-foreground mb-4">You have no clinical visits scheduled at this time.</p>
          <Link href="/appointments" className="block">
            <Button size="sm" variant="outline" className="w-full text-xs h-8.5 rounded-xl border-border hover:bg-muted">
              Schedule Next Visit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoNextAppointments;
