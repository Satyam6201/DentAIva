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
    <div className="space-y-5 mb-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="border border-border/80 bg-card hover:border-primary/40 transition-all rounded-2xl shadow-xs flex flex-col justify-between">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <MicIcon className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-foreground">AI Voice Consultation</h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-semibold">
                    PRO
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Real-time spoken triage and immediate clinical dental guidance available 24/7.
                </p>
              </div>
            </div>

            <Link href="/voice" className="block pt-1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs h-9 rounded-xl flex items-center justify-center gap-1.5 shadow-xs">
                <MessageSquareIcon className="size-3.5" />
                Start Voice Consultation
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-border/80 bg-card hover:border-primary/40 transition-all rounded-2xl shadow-xs flex flex-col justify-between">
          <CardContent className="p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 border border-primary/20">
                <CalendarIcon className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground">Schedule In-Clinic Visit</h2>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Book directly with board-certified hospital specialists with live conflict checking.
                </p>
              </div>
            </div>

            <Link href="/appointments" className="block pt-1">
              <Button
                variant="outline"
                className="w-full border-border hover:bg-muted text-foreground font-medium text-xs h-9 rounded-xl flex items-center justify-center gap-1.5"
              >
                <CalendarIcon className="size-3.5 text-primary" />
                Book Appointment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/services" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card p-4 rounded-xl transition-all shadow-xs">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <StethoscopeIcon className="size-4" />
              </div>
              <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                Departments & Services
              </h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              Explore specialized hospital care across oral surgery, orthodontics, and restorative clinics.
            </p>
            <div className="mt-2.5 flex items-center text-[11px] text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Services</span>
              <ArrowRightIcon className="size-3 ml-1" />
            </div>
          </Card>
        </Link>

        <Link href="/records" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card p-4 rounded-xl transition-all shadow-xs">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileTextIcon className="size-4" />
              </div>
              <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                Health Records & Pass
              </h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              Review digital clinical records, active treatment plans, and printable appointment passes.
            </p>
            <div className="mt-2.5 flex items-center text-[11px] text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>Open Records</span>
              <ArrowRightIcon className="size-3 ml-1" />
            </div>
          </Card>
        </Link>

        <Link href="/aftercare" className="block group">
          <Card className="h-full border border-border/80 hover:border-primary/40 bg-card p-4 rounded-xl transition-all shadow-xs">
            <div className="flex items-center gap-3 mb-1.5">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HeartHandshakeIcon className="size-4" />
              </div>
              <h3 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                Recovery Guidelines
              </h3>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
              Step-by-step post-op home care, recovery milestones, and emergency red-flag protocols.
            </p>
            <div className="mt-2.5 flex items-center text-[11px] text-primary font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Protocols</span>
              <ArrowRightIcon className="size-3 ml-1" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
