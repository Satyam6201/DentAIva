"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";
import { useBookAppointment, useUserAppointments } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES, formatAppointmentDate, getSafeAvatarUrl } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import {
  CalendarIcon,
  ClockIcon,
  PrinterIcon,
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
                appointmentDate: formatAppointmentDate(appointment.date),
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

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* HEADER STRIP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide uppercase mb-2">
                <CalendarIcon className="size-3.5" />
                Hospital Scheduling
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Book Clinical Consultation
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Select an attending dental surgeon, choose your preferred slot, and receive instant confirmation.
              </p>
            </div>

            <Link href="/records">
              <Button variant="outline" size="sm" className="h-9 text-xs rounded-xl border-primary/30 shrink-0 self-start sm:self-auto">
                <PrinterIcon className="size-3.5 mr-1.5 text-primary" />
                Print Clinic Passes
              </Button>
            </Link>
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

          {/* EXISTING SCHEDULED APPOINTMENTS */}
          {userAppointments.length > 0 && (
            <div className="pt-6 border-t border-border/70 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                    <CalendarIcon className="size-4 text-primary" />
                    Your Scheduled Visits
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Active clinic appointments and attending specialists
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
                      className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-4 shadow-xs space-y-3 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-xl overflow-hidden bg-primary/10 relative shrink-0 border border-primary/20">
                          <Image
                            src={safeDoctorAvatar}
                            alt={appointment.doctorName}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="font-bold text-sm text-foreground truncate">
                            {appointment.doctorName}
                          </p>
                          <p className="text-primary font-medium text-xs truncate">
                            {appointment.reason || "General Consultation"}
                          </p>
                        </div>
                        <Badge
                          className={
                            appointment.status === "COMPLETED"
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px]"
                              : "bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px]"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="p-2.5 bg-muted/20 rounded-xl space-y-1 text-xs font-mono">
                        <div className="flex items-center text-muted-foreground">
                          <CalendarIcon className="size-3 text-primary mr-1.5" />
                          <span>{formatAppointmentDate(appointment.date, "EEE, MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <ClockIcon className="size-3 text-primary mr-1.5" />
                          <span>{appointment.time} (Local Time)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <Link href="/records">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <PrinterIcon className="size-3 mr-1" />
                            Print Pass
                          </Button>
                        </Link>
                        <span className="text-[11px] text-muted-foreground">
                          Floor 1 &bull; Reception A
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
            appointmentDate: formatAppointmentDate(bookedAppointment.date),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}
    </>
  );
}

export default AppointmentsPage;
