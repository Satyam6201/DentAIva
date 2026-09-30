"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  MessageSquareIcon,
  CalendarIcon,
  StethoscopeIcon,
  FileTextIcon,
  HeartHandshakeIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EmergencyTriageModal from "@/components/emergency/EmergencyTriageModal";

export default function MainActions() {
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  return (
    <>
      {/* PRIMARY 2 HERO ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* AI Voice Assistant */}
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/40 bg-gradient-to-br from-card to-card/90">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <CardContent className="relative p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="size-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-primary/20">
                <Image src="/audio.png" alt="Voice AI" width={32} height={32} className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">AI Voice Assistant</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-mono font-semibold">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time voice consultation powered by Vapi AI
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-foreground">
              <div className="flex items-center gap-2.5">
                <div className="size-2 bg-primary rounded-full animate-pulse" />
                <span>24/7 instant dental triage & symptom guidance</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-2 bg-primary rounded-full" />
                <span>Immediate pain management advice & medication info</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-2 bg-primary rounded-full" />
                <span>Live speech wave visualizer and real-time transcript</span>
              </div>
            </div>

            <Link
              href="/voice"
              className={buttonVariants({
                variant: "default",
                className:
                  "w-full mt-6 bg-gradient-to-r from-primary to-primary/85 hover:from-primary/95 hover:to-primary text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-300 text-xs sm:text-sm",
              })}
            >
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              Start Voice Consultation
            </Link>
          </CardContent>
        </Card>

        {/* Book Appointment */}
        <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/40 bg-gradient-to-br from-card to-card/90">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <CardContent className="relative p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="size-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-primary/20">
                <Image src="/calendar.png" alt="Calendar" width={32} height={32} className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Book Clinic Appointment</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Schedule with board-certified hospital dentists
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-foreground">
              <div className="flex items-center gap-2.5">
                <div className="size-2 bg-primary rounded-full" />
                <span>3-step booking flow with real-time slot lock</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-2 bg-primary rounded-full" />
                <span>Instant automated HTML confirmation email via Resend</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="size-2 bg-primary rounded-full" />
                <span>Verified doctor ratings, profiles, and specialities</span>
              </div>
            </div>

            <Link href="/appointments">
              <Button
                variant="outline"
                className="w-full mt-6 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 font-semibold py-2.5 rounded-xl transition-all duration-300 text-xs sm:text-sm"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                Schedule In-Clinic Visit
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* HOSPITAL QUICK-ACCESS SUITE (3 PILLARS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* CLINICAL DEPARTMENTS */}
        <Link href="/services" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card/80 transition-all p-5 hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <StethoscopeIcon className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  Departments & Specialties
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  8 hospital dental specialties
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Explore Oral Surgery, Endodontics, Implants, Orthodontics, and pediatric care with preparation guides and transparent pricing.
            </p>
            <div className="mt-4 flex items-center text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Specialties</span>
              <ArrowRightIcon className="size-3.5 ml-1" />
            </div>
          </Card>
        </Link>

        {/* PATIENT HEALTH RECORDS */}
        <Link href="/records" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card/80 transition-all p-5 hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileTextIcon className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  Patient Health Records
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  EHR, allergies & prescriptions
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Access your digital patient card, drug allergy warnings, active antibiotic regimens, and printable official hospital clinic passes.
            </p>
            <div className="mt-4 flex items-center text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>Open Health Vault</span>
              <ArrowRightIcon className="size-3.5 ml-1" />
            </div>
          </Card>
        </Link>

        {/* POST-OP AFTERCARE & RECOVERY */}
        <Link href="/aftercare" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card/80 transition-all p-5 hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <HeartHandshakeIcon className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  Post-Op Aftercare Hub
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Interactive recovery checklists
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Step-by-step healing timelines, dry socket prevention, diet guidelines, and complication red flags for extractions, RCT, and implants.
            </p>
            <div className="mt-4 flex items-center text-xs text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Recovery Guides</span>
              <ArrowRightIcon className="size-3.5 ml-1" />
            </div>
          </Card>
        </Link>
      </div>

      {/* EMERGENCY TRIAGE MODAL */}
      <EmergencyTriageModal
        open={isTriageOpen}
        onOpenChange={setIsTriageOpen}
      />
    </>
  );
}