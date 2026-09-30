"use client";

import { useState } from "react";
import { useGetAppointments, useUpdateAppointmentStatus } from "@/hooks/use-appointment";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar, SearchIcon, CheckCircle2Icon, ClockIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function RecentAppointments() {
  const { data: appointments = [] } = useGetAppointments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();
  const [search, setSearch] = useState("");

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    const newStatus = appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";
    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs">
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      (apt.patientEmail && apt.patientEmail.toLowerCase().includes(search.toLowerCase())) ||
      (apt.reason && apt.reason.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Card className="border border-border/80 bg-card/90 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Calendar className="size-5 text-primary" />
            Hospital Appointment Queue
          </CardTitle>
          <CardDescription className="text-xs">
            Monitor and manage clinical consultations across all doctors
          </CardDescription>
        </div>

        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search patient, doctor, or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs bg-muted/20 border-border/70 rounded-xl"
          />
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-2xl border border-border/70 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="text-xs font-semibold">Patient</TableHead>
                <TableHead className="text-xs font-semibold">Attending Doctor</TableHead>
                <TableHead className="text-xs font-semibold">Date & Time</TableHead>
                <TableHead className="text-xs font-semibold">Reason / Procedure</TableHead>
                <TableHead className="text-xs font-semibold">Status (Click to Toggle)</TableHead>
                <TableHead className="text-right text-xs font-semibold">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAppointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                    No appointments found matching search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div>
                        <div className="font-semibold text-xs text-foreground">
                          {appointment.patientName}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">
                          {appointment.patientEmail}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-xs text-foreground">
                      {appointment.doctorName}
                    </TableCell>

                    <TableCell>
                      <div className="text-xs font-mono">
                        <div className="font-medium text-foreground">
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <ClockIcon className="size-3" />
                          {appointment.time}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {appointment.reason || "General Consultation"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleAppointmentStatus(appointment.id)}
                        className="h-7 px-2 hover:bg-transparent"
                      >
                        {getStatusBadge(appointment.status)}
                      </Button>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAppointmentStatus(appointment.id)}
                        className="text-[11px] h-7 px-2.5 border-primary/30 hover:bg-primary/10"
                      >
                        Toggle Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentAppointments;