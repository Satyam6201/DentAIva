"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquareIcon,
  CalendarIcon,
  StethoscopeIcon,
  FileTextIcon,
  HeartHandshakeIcon,
  ArrowRightIcon,
  MicIcon,
} from "lucide-react";
import Link from "next/link";

export default function MainActions() {
  return (
    <>
      {/* 2 PRIMARY HERO ACTIONS */}
      <div className="grid md:grid-cols-2 gap-5 mb-6">
        {/* AI VOICE ASSISTANT */}
        <Card className="border border-border/80 bg-card hover:border-primary/40 transition-all rounded-2xl shadow-xs flex flex-col justify-between">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <MicIcon className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">AI Voice Consultation</h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-semibold">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  24/7 spoken triage and symptom advice powered by Vapi
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                <span>Instant guidance for pain, swelling, and sensitivity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                <span>Live speech wave visualizer and real-time audio transcripts</span>
              </div>
            </div>

            <Link href="/voice" className="block pt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-xs h-9 rounded-xl flex items-center justify-center gap-1.5 shadow-xs">
                <MessageSquareIcon className="size-3.5" />
                Start Voice Consultation
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* BOOK APPOINTMENT */}
        <Card className="border border-border/80 bg-card hover:border-primary/40 transition-all rounded-2xl shadow-xs flex flex-col justify-between">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <CalendarIcon className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Book In-Clinic Visit</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Schedule with board-certified hospital specialists
                </p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                <span>3-step booking flow with real-time slot conflict check</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                <span>Automated confirmation email and printable clinical pass</span>
              </div>
            </div>

            <Link href="/appointments" className="block pt-2">
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary text-foreground font-medium text-xs h-9 rounded-xl flex items-center justify-center gap-1.5"
              >
                <CalendarIcon className="size-3.5 text-primary" />
                Schedule Appointment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 3 SECONDARY NAVIGATION PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link href="/services" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card p-4 rounded-xl transition-all shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <StethoscopeIcon className="size-4" />
              </div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                Departments & Specialties
              </h4>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
              Explore 8 hospital divisions including Oral Surgery, Orthodontics, and Endodontics.
            </p>
            <div className="mt-3 flex items-center text-[11px] text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Services</span>
              <ArrowRightIcon className="size-3 ml-1" />
            </div>
          </Card>
        </Link>

        <Link href="/records" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card p-4 rounded-xl transition-all shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileTextIcon className="size-4" />
              </div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                Health Records & EHR
              </h4>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
              Digital patient ID card, active prescriptions, drug allergies, and printable clinic passes.
            </p>
            <div className="mt-3 flex items-center text-[11px] text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>Open Health Vault</span>
              <ArrowRightIcon className="size-3 ml-1" />
            </div>
          </Card>
        </Link>

        <Link href="/aftercare" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card p-4 rounded-xl transition-all shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HeartHandshakeIcon className="size-4" />
              </div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                Post-Op Aftercare Hub
              </h4>
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
              Procedure recovery checklists, milestone timelines, and complication warnings.
            </p>
            <div className="mt-3 flex items-center text-[11px] text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Guidelines</span>
              <ArrowRightIcon className="size-3 ml-1" />
            </div>
          </Card>
        </Link>
      </div>
    </>
  );
}
