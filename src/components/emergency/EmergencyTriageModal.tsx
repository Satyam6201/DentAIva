"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PhoneIcon,
  ClockIcon,
  CheckCircle2Icon,
  ShieldAlertIcon,
  ArrowRightIcon,
  MicIcon,
} from "lucide-react";
import Link from "next/link";

interface EmergencyTriageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EmergencyCategory = "critical" | "urgent" | "moderate";

interface TriageTier {
  id: EmergencyCategory;
  label: string;
  badge: string;
  badgeColor: string;
  activeColor: string;
  timeWindow: string;
  title: string;
  summary: string;
  steps: { action: string; detail: string }[];
}

const TRIAGE_TIERS: Record<EmergencyCategory, TriageTier> = {
  critical: {
    id: "critical",
    label: "Critical",
    badge: "Level 1: Immediate Trauma",
    badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
    activeColor: "bg-red-600 text-white shadow-xs",
    timeWindow: "Within 30–60 minutes",
    title: "Knocked-Out Tooth, Trauma, or Severe Bleeding",
    summary:
      "Rapid intervention required to preserve permanent teeth and prevent complications.",
    steps: [
      {
        action: "Handle Crown Only",
        detail: "Never touch the root. Rinse gently with milk or saline if dirty; do not scrub.",
      },
      {
        action: "Preserve Tooth",
        detail: "Attempt reinserting into the socket, or submerge in cold milk or clean saliva.",
      },
      {
        action: "Firm Pressure",
        detail: "Bite down on sterile gauze or a moist tea bag continuously for 20 minutes.",
      },
      {
        action: "Monitor Breathing",
        detail: "If swelling impairs swallowing or airflow, contact 911 immediately.",
      },
    ],
  },
  urgent: {
    id: "urgent",
    label: "Urgent",
    badge: "Level 2: Urgent Care",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    activeColor: "bg-amber-600 text-white shadow-xs",
    timeWindow: "Same-Day (12–24h)",
    title: "Acute Severe Toothache, Abscess, or Pulp Exposure",
    summary:
      "Intense throbbing pain, localized swelling, or broken teeth needing same-day evaluation.",
    steps: [
      {
        action: "Warm Salt Rinse",
        detail: "Rinse mouth with warm water (1/2 tsp salt in 8 oz water) to clear debris.",
      },
      {
        action: "Pain Management",
        detail: "Take approved oral pain medication. Never apply aspirin directly to gums.",
      },
      {
        action: "Protect Exposed Nerve",
        detail: "Cover sharp edges or cavity openings with dental wax or sugar-free gum.",
      },
      {
        action: "Cold Compress",
        detail: "Apply ice pack to the outer cheek in 15-minute intervals to reduce pain.",
      },
    ],
  },
  moderate: {
    id: "moderate",
    label: "Moderate",
    badge: "Level 3: Semi-Urgent",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
    activeColor: "bg-primary text-primary-foreground shadow-xs",
    timeWindow: "24–48 Hours",
    title: "Lost Filling, Dislodged Crown, or Chipped Tooth",
    summary:
      "Manageable discomfort or cosmetic fractures requiring routine clinical restoration.",
    steps: [
      {
        action: "Temporary Seal",
        detail: "Place over-the-counter dental cement or temporary filling into cavity opening.",
      },
      {
        action: "Secure Loose Crown",
        detail: "Coat interior with toothpaste or temporary cement and slip gently over tooth.",
      },
      {
        action: "Avoid Triggers",
        detail: "Avoid hot, cold, acidic, or crunchy foods on the affected side.",
      },
      {
        action: "Gentle Floss",
        detail: "Carefully floss around the area to dislodge food particles without pulling.",
      },
    ],
  },
};

export default function EmergencyTriageModal({
  open,
  onOpenChange,
}: EmergencyTriageModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<EmergencyCategory>("critical");

  const current = TRIAGE_TIERS[selectedCategory];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl bg-card border-border/80 p-5 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-1.5 pb-1">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
              <ShieldAlertIcon className="size-5 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight">
                Dental Emergency Triage
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Clinical first-aid protocols for immediate dental trauma and acute pain
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-muted/30 border border-border/60 rounded-xl">
          {(["critical", "urgent", "moderate"] as EmergencyCategory[]).map(
            (category) => {
              const tier = TRIAGE_TIERS[category];
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all duration-200 select-none ${
                    isActive
                      ? tier.activeColor
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  {tier.label}
                </button>
              );
            }
          )}
        </div>

        {/* Selected Protocol Content with Smooth Fade-in */}
        <div
          key={selectedCategory}
          className="space-y-3.5 animate-in fade-in-50 slide-in-from-bottom-1 duration-200"
        >
          {/* Header Card */}
          <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <Badge className={current.badgeColor} variant="outline">
                {current.badge}
              </Badge>
              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                <ClockIcon className="size-3 text-muted-foreground" />
                Response: {current.timeWindow}
              </span>
            </div>
            <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
              {current.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {current.summary}
            </p>
          </div>

          {/* First-Aid Steps */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Immediate Clinical First-Aid Steps
            </p>
            <div className="space-y-1.5">
              {current.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-card border border-border/60 text-xs"
                >
                  <CheckCircle2Icon className="size-3.5 text-primary shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-semibold text-foreground">
                      {step.action}:{" "}
                    </span>
                    <span className="text-muted-foreground">{step.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Hotline & Actions */}
          <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/15 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left space-y-0.5">
              <div className="text-[11px] font-semibold text-red-500">
                24/7 Dental Trauma Hotline
              </div>
              <div className="text-base font-bold font-mono text-foreground">
                +1 (800) 433-6824
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="tel:18004336824"
                className="flex-1 sm:flex-initial"
              >
                <Button
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-xs h-8.5 px-3.5"
                >
                  <PhoneIcon className="size-3.5 mr-1.5" />
                  Call Now
                </Button>
              </a>

              <Link
                href="/appointments"
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:flex-initial"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs h-8.5 px-3.5 border-border hover:bg-muted"
                >
                  Book Slot
                  <ArrowRightIcon className="size-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[11px] text-muted-foreground">
            <span>Hospital Triage ID: DENT-TX-90210</span>
            <Link
              href="/voice"
              onClick={() => onOpenChange(false)}
              className="text-primary hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <MicIcon className="size-3" />
              Speak to AI Assistant
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
