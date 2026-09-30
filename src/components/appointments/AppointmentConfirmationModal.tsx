"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  MailIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PrinterIcon,
  HeartHandshakeIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AppointmentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDetails: {
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    userEmail: string;
  };
}

export function AppointmentConfirmationModal({
  open,
  onOpenChange,
  appointmentDetails,
}: AppointmentConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border border-border">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20">
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          </div>

          <DialogTitle className="text-xl font-bold text-center">
            Appointment Confirmed!
          </DialogTitle>

          <DialogDescription className="text-center text-xs text-muted-foreground">
            Your hospital appointment slot has been secured in PostgreSQL
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Email Notification Section */}
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <Image
                src="/email-sent.png"
                alt="Email sent"
                width={90}
                height={90}
                className="mx-auto"
              />
            </div>

            <div className="text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-primary">
                <MailIcon className="h-3.5 w-3.5" />
                Confirmation & receipt sent to:
              </div>
              {appointmentDetails?.userEmail && (
                <p className="text-[11px] font-mono text-muted-foreground">
                  {appointmentDetails.userEmail}
                </p>
              )}
            </div>
          </div>

          {/* Appointment Summary */}
          {appointmentDetails && (
            <div className="bg-muted/30 rounded-2xl p-4 space-y-2.5 border border-border/60 text-xs">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">
                  Clinical Pass Summary
                </span>
                <span className="flex items-center gap-1 text-[10px] text-green-500 font-mono">
                  <ShieldCheckIcon className="size-3" />
                  VERIFIED SLOT
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <UserIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium text-foreground">
                    {appointmentDetails.doctorName}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">
                    {appointmentDetails.appointmentDate}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <ClockIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="text-muted-foreground">
                    {appointmentDetails.appointmentTime} (Local Clinic Time)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <Link href="/records" className="w-full" onClick={() => onOpenChange(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold h-10 rounded-xl">
                <PrinterIcon className="size-3.5 mr-2" />
                View & Print Official Clinic Pass
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/aftercare" className="w-full" onClick={() => onOpenChange(false)}>
                <Button variant="outline" className="w-full text-xs h-9 rounded-xl">
                  <HeartHandshakeIcon className="size-3.5 mr-1 text-primary" />
                  Aftercare Guides
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full text-xs h-9 rounded-xl"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          </div>

          {/* Additional Hospital Info */}
          <div className="text-center text-[11px] text-muted-foreground border-t border-border/50 pt-3 space-y-0.5">
            <p className="font-medium text-foreground">
              Please arrive 15 minutes early at Ground Floor Check-In.
            </p>
            <p>Need to reschedule? Call our Trauma & Scheduling Desk: +1 (800) 433-6824.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}