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
  AlertTriangleIcon,
  PhoneCallIcon,
  ClockIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  HeartPulseIcon,
  ShieldAlertIcon,
  MessageSquareIcon,
} from "lucide-react";
import Link from "next/link";

interface EmergencyTriageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type EmergencyCategory = "critical" | "urgent" | "moderate";

export default function EmergencyTriageModal({
  open,
  onOpenChange,
}: EmergencyTriageModalProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<EmergencyCategory>("critical");

  const triageData = {
    critical: {
      badge: "Level 1 - Immediate Trauma / Critical",
      badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
      title: "Knocked-Out Tooth / Severe Bleeding / Facial Swelling",
      description:
        "High urgency. Immediate clinical intervention required within 30–60 minutes to save the tooth or prevent airway obstruction.",
      protocols: [
        "Knocked-Out Tooth: Hold by the crown ONLY (never the root). Gently rinse with milk or saline if dirty. Do NOT scrub.",
        "Tooth Preservation: Try inserting tooth back into socket, or store submerged in cold whole milk or saliva in a clean container.",
        "Uncontrolled Bleeding: Bite firmly on a clean gauze pad or moistened black tea bag for 30 minutes without lifting.",
        "Facial Swelling: Apply cold compress to outside of cheek (15 min on / 15 min off). If swallowing or breathing is impaired, call 911 immediately.",
      ],
      recommendedAction: "Call Emergency Dental Trauma Hotline Immediately",
    },
    urgent: {
      badge: "Level 2 - Urgent Care",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      title: "Acute Severe Toothache / Abscess / Broken Tooth",
      description:
        "Moderate to severe pain, visible dental pulp, or localized gum boil. Same-day clinical treatment recommended.",
      protocols: [
        "Pain Relief: Rinse with lukewarm salt water (1/2 tsp salt in 8 oz water).",
        "Medication: Take Ibuprofen (400-600mg) as packaging directs if medically cleared. NEVER place an aspirin tablet directly on gums.",
        "Broken Tooth: Rinse mouth with warm water, save any tooth fragments in saline, apply orthodontic wax to sharp edges.",
        "Dental Abscess: Do not attempt to pop or squeeze a gum boil. Avoid hot beverages and chew on the unaffected side.",
      ],
      recommendedAction: "Book Same-Day Emergency Appointment",
    },
    moderate: {
      badge: "Level 3 - Semi-Urgent / Discomfort",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      title: "Lost Filling / Broken Crown / Mild Sensitivity",
      description:
        "Manageable pain or cosmetic disruption. Care needed within 24 to 48 hours to prevent further decay or nerve irritation.",
      protocols: [
        "Lost Crown: Coat inner crown with OTC dental cement or toothpaste and gently slip over the tooth to protect nerve.",
        "Lost Filling: Place temporary dental filling material (available at pharmacies) into cavity to block food debris.",
        "Temperature Sensitivity: Use sensitive toothpaste (potassium nitrate), avoid ice-cold or piping hot foods.",
        "Food Impaction: Gently use dental floss. Do not use toothpicks or sharp metal objects.",
      ],
      recommendedAction: "Consult AI Assistant or Schedule Next Available Visit",
    },
  };

  const current = triageData[selectedCategory];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-md border-border p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <ShieldAlertIcon className="size-5 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                24/7 Dental Emergency & Triage Guide
              </DialogTitle>
              <DialogDescription className="text-xs">
                Clinical triage protocols approved for instant dental trauma care
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-muted/40 rounded-xl mt-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("critical")}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === "critical"
                ? "bg-red-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Level 1: Critical
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("urgent")}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === "urgent"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Level 2: Urgent
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("moderate")}
            className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === "moderate"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Level 3: Moderate
          </button>
        </div>

        {/* Selected Protocol Details */}
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
            <div className="flex items-center justify-between">
              <Badge className={current.badgeColor} variant="outline">
                {current.badge}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <ClockIcon className="size-3.5" />
                <span>Critical Response Window</span>
              </div>
            </div>
            <h3 className="font-bold text-base text-foreground">
              {current.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <HeartPulseIcon className="size-4 text-primary" />
              Immediate Clinical First-Aid Steps
            </h4>
            <div className="space-y-2">
              {current.protocols.map((protocol, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-card border border-border/70 text-xs text-foreground"
                >
                  <CheckCircle2Icon className="size-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{protocol}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Hotline & Booking */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 via-primary/5 to-transparent border border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-medium text-red-400 flex items-center justify-center sm:justify-start gap-1">
                <AlertTriangleIcon className="size-3.5" />
                <span>Hospital Emergency Trauma Desk</span>
              </div>
              <div className="text-lg font-bold text-foreground font-mono">
                +1 (800) 433-6824
              </div>
              <div className="text-[11px] text-muted-foreground">
                Available 24 hours / 7 days a week including public holidays
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <a
                href="tel:18004336824"
                className="w-full sm:w-auto"
              >
                <Button
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md"
                >
                  <PhoneCallIcon className="size-3.5 mr-1.5" />
                  Call Hotline
                </Button>
              </a>

              <Link
                href="/appointments"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10 text-xs"
                >
                  Book Emergency Visit
                  <ArrowRightIcon className="size-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[11px] text-muted-foreground">
            <span>Hospital Registration No: DENT-TX-90210</span>
            <Link
              href="/voice"
              onClick={() => onOpenChange(false)}
              className="text-primary hover:underline flex items-center gap-1 font-medium"
            >
              <MessageSquareIcon className="size-3" />
              Speak to AI Dental Assistant
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
