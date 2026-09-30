"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";
import { useBookAppointment, useUserAppointments } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES, getSafeAvatarUrl } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarIcon,
  ClockIcon,
  ShieldCheckIcon,
  PrinterIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  StethoscopeIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

function AppointmentsPage() {
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDentistId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          setBookedAppointment(appointment);

          try {
            const emailResponse = await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(new Date(appointment.date), "EEEE, MMMM d, yyyy"),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });

            if (!emailResponse.ok) console.error("Failed to send confirmation email");
          } catch (error) {
            console.error("Error sending confirmation email:", error);
          }

          setShowConfirmationModal(true);
          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) => toast.error(`Failed to book appointment: ${error.message}`),
      }
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* HEADER SECTION */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/20 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <CalendarIcon className="size-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Hospital Booking System
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Book Clinical Consultation
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Schedule an in-person diagnostic or procedure visit with verified dentists
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/records">
                  <Button variant="outline" size="sm" className="h-9 text-xs rounded-xl border-primary/30">
                    <PrinterIcon className="size-3.5 mr-1.5 text-primary" />
                    Print Clinic Passes
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <ProgressSteps currentStep={currentStep} />

          {currentStep === 1 && (
            <DoctorSelectionStep
              selectedDentistId={selectedDentistId}
              onContinue={() => setCurrentStep(2)}
              onSelectDentist={handleSelectDentist}
            />
          )}

          {currentStep === 2 && selectedDentistId && (
            <TimeSelectionStep
              selectedDentistId={selectedDentistId}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedType={selectedType}
              onBack={() => setCurrentStep(1)}
              onContinue={() => setCurrentStep(3)}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              onTypeChange={setSelectedType}
            />
          )}

          {currentStep === 3 && selectedDentistId && (
            <BookingConfirmationStep
              selectedDentistId={selectedDentistId}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedType={selectedType}
              isBooking={bookAppointmentMutation.isPending}
              onBack={() => setCurrentStep(2)}
              onModify={() => setCurrentStep(2)}
              onConfirm={handleBookAppointment}
            />
          )}

          {/* SHOW EXISTING APPOINTMENTS FOR THE CURRENT USER */}
          {userAppointments.length > 0 && (
            <div className="pt-8 border-t border-border/70 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CalendarIcon className="size-5 text-primary" />
                    Your Scheduled Hospital Visits
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Confirmed appointments and attending dental specialists
                  </p>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  {userAppointments.length} Active
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userAppointments.map((appointment) => {
                  const safeDoctorAvatar = getSafeAvatarUrl(
                    appointment.doctorImageUrl,
                    appointment.doctorName
                  );

                  return (
                    <div
                      key={appointment.id}
                      className="bg-card/90 border border-border/80 hover:border-primary/40 rounded-2xl p-5 shadow-sm space-y-4 transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-12 rounded-xl overflow-hidden bg-primary/10 relative shrink-0 border border-primary/20">
                          <Image
                            src={safeDoctorAvatar}
                            alt={appointment.doctorName}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-foreground">
                            {appointment.doctorName}
                          </p>
                          <p className="text-primary font-medium text-xs">
                            {appointment.reason || "General Consultation"}
                          </p>
                        </div>
                        <Badge
                          className={
                            appointment.status === "COMPLETED"
                              ? "bg-green-500/10 text-green-400 border border-green-500/30 text-[10px]"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/30 text-[10px]"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="p-3 bg-muted/20 rounded-xl space-y-1.5 text-xs font-mono">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon className="size-3.5 text-primary" />
                            {format(new Date(appointment.date), "EEEE, MMM d, yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <ClockIcon className="size-3.5 text-primary" />
                            {appointment.time} (Local Time)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <Link href="/records">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <PrinterIcon className="size-3.5 mr-1" />
                            Print Pass
                          </Button>
                        </Link>
                        <span className="text-[11px] text-muted-foreground">
                          Floor 1 • Reception A
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          appointmentDetails={{
            doctorName: bookedAppointment.doctorName,
            appointmentDate: format(new Date(bookedAppointment.date), "EEEE, MMMM d, yyyy"),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}
    </>
  );
}

export default AppointmentsPage;