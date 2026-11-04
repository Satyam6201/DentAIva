"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2Icon,
  ClockIcon,
  PhoneCallIcon,
  AlertCircleIcon,
  ArrowRightIcon,
  StethoscopeIcon,
  MicroscopeIcon,
  ShieldCheckIcon,
  SparklesIcon,
  MicIcon,
} from "lucide-react";
import Link from "next/link";
import EmergencyTriageModal from "@/components/emergency/EmergencyTriageModal";

interface AftercareGuide {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  summary: string;
  doList: string[];
  dontList: string[];
  timeline: {
    phase: string;
    milestone: string;
    instructions: string;
  }[];
}

const AFTERCARE_GUIDES: AftercareGuide[] = [
  {
    id: "extraction",
    title: "Tooth Extraction",
    category: "Oral Surgery",
    icon: StethoscopeIcon,
    summary: "Protect the healing blood clot to prevent dry socket and ensure rapid healing.",
    doList: [
      "Bite gently on sterile gauze for 30–45 minutes following surgery.",
      "Apply cold compresses to cheek in 15-minute intervals for the first 24 hours.",
      "Eat soft, cool foods such as yogurt, lukewarm soups, and smoothies.",
      "Begin gentle warm salt water rinses after the first 24 hours.",
    ],
    dontList: [
      "Do not drink through a straw or create oral suction for 7 days.",
      "Do not spit forcefully or rinse vigorously during the first 24 hours.",
      "Do not smoke or use tobacco products for at least 72 hours.",
      "Do not engage in strenuous physical exercise for 3 to 4 days.",
    ],
    timeline: [
      {
        phase: "Day 1",
        milestone: "Clot Formation",
        instructions: "Rest with head elevated. Minor oozing is normal; keep firm gauze pressure.",
      },
      {
        phase: "Days 2–3",
        milestone: "Swelling Peak",
        instructions: "Switch to warm compresses and start gentle salt water rinses 3 times daily.",
      },
      {
        phase: "Days 4–7",
        milestone: "Tissue Repair",
        instructions: "Discomfort subsides substantially. Gradually reintroduce soft solid foods.",
      },
    ],
  },
  {
    id: "root-canal",
    title: "Root Canal Therapy",
    category: "Endodontics",
    icon: MicroscopeIcon,
    summary: "Safeguard the temporary seal and soothe periapical tissue tenderness.",
    doList: [
      "Chew on the opposite side until your permanent restoration is placed.",
      "Take prescribed or approved anti-inflammatory medication on schedule.",
      "Brush and floss gently around the treated tooth every day.",
      "Schedule your permanent crown placement within 2 to 4 weeks.",
    ],
    dontList: [
      "Do not chew hard, crunchy, or sticky foods on the treated side.",
      "Do not eat until local anesthesia numbness has completely worn off.",
      "Do not ignore severe pain or swelling that persists past 3 days.",
      "Do not probe or pick at the temporary filling material.",
    ],
    timeline: [
      {
        phase: "Day 1",
        milestone: "Numbness Wears Off",
        instructions: "Anesthesia subsides in 2–4 hours. A mild bruised sensation is expected.",
      },
      {
        phase: "Days 2–4",
        milestone: "Tenderness Eases",
        instructions: "Bite sensitivity steadily decreases. Keep the temporary restoration clean.",
      },
      {
        phase: "Weeks 2–3",
        milestone: "Permanent Crown",
        instructions: "Complete final crown placement to prevent tooth fracture or re-infection.",
      },
    ],
  },
  {
    id: "implants",
    title: "Dental Implants",
    category: "Implantology",
    icon: ShieldCheckIcon,
    summary: "Promote bone integration and soft tissue healing around the surgical site.",
    doList: [
      "Rinse gently with prescribed antibacterial mouthwash twice daily.",
      "Maintain a nutritious, soft-food diet for 7 to 10 days post-procedure.",
      "Sleep with your head elevated on pillows for the first 2 nights.",
      "Complete the full course of any prescribed antibiotics.",
    ],
    dontList: [
      "Do not touch, probe, or disturb the implant site with tongue or fingers.",
      "Do not wear removable dental appliances without explicit clinician approval.",
      "Do not smoke or vape—nicotine significantly impairs osseointegration.",
      "Do not brush directly over fresh surgical sutures for the first 3 days.",
    ],
    timeline: [
      {
        phase: "Days 1–3",
        milestone: "Hemostasis",
        instructions: "Minor oozing and jaw tenderness. Apply ice packs to reduce swelling.",
      },
      {
        phase: "Weeks 1–2",
        milestone: "Soft Tissue Seal",
        instructions: "Sutures dissolve or are removed. Gums seal securely around the abutment.",
      },
      {
        phase: "Months 2–4",
        milestone: "Osseointegration",
        instructions: "Titanium post integrates with jawbone before final porcelain crown delivery.",
      },
    ],
  },
  {
    id: "whitening",
    title: "Teeth Whitening",
    category: "Cosmetics",
    icon: SparklesIcon,
    summary: "Strict 48-hour White Diet protocol to protect porous enamel and preserve shade.",
    doList: [
      "Follow the White Diet for 48 hours: water, milk, rice, poultry, and white fish.",
      "Use potassium nitrate desensitizing toothpaste twice daily.",
      "Drink water at room temperature to prevent sudden thermal shock.",
      "Floss daily to keep enamel surfaces clean and plaque-free.",
    ],
    dontList: [
      "Do not consume staining liquids: coffee, dark tea, red wine, or colas for 48h.",
      "Do not eat pigmented foods like tomato sauce, soy sauce, or berries.",
      "Do not drink boiling or freezing liquids if sensitivity zingers occur.",
      "Do not use tobacco products for a minimum of 48 hours.",
    ],
    timeline: [
      {
        phase: "Hours 0–24",
        milestone: "Peak Sensitivity",
        instructions: "Transient nerve sensations may occur. Mild analgesics provide relief.",
      },
      {
        phase: "Day 2",
        milestone: "Remineralization",
        instructions: "Salivary minerals re-harden enamel tubules. Continue White Diet.",
      },
      {
        phase: "Day 3+",
        milestone: "Shade Stabilized",
        instructions: "Enamel pores close completely. Resume normal dietary habits safely.",
      },
    ],
  },
];

export default function AftercarePage() {
  const [selectedGuideId, setSelectedGuideId] = useState<string>("extraction");
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  const currentGuide =
    AFTERCARE_GUIDES.find((g) => g.id === selectedGuideId) ||
    AFTERCARE_GUIDES[0];
  const CurrentGuideIcon = currentGuide.icon;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Post-Operative Recovery Protocols
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Clinical home care instructions, recovery timelines, and safety guidelines prepared by our dental surgical team.
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1">
            {AFTERCARE_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedGuideId(guide.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap select-none ${
                  selectedGuideId === guide.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {guide.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 space-y-5">
              <Card className="border border-border/80 bg-card rounded-2xl shadow-xs">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <CurrentGuideIcon className="size-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-base sm:text-lg text-foreground">
                          {currentGuide.title}
                        </h2>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60">
                          {currentGuide.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {currentGuide.summary}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-border/60 text-xs">
                    <div className="space-y-2.5">
                      <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <CheckCircle2Icon className="size-3.5" />
                        Recommended Care
                      </h3>
                      <ul className="space-y-2 text-foreground">
                        {currentGuide.doList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="size-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="font-semibold text-red-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <AlertCircleIcon className="size-3.5" />
                        What to Avoid
                      </h3>
                      <ul className="space-y-2 text-foreground">
                        {currentGuide.dontList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/80 bg-card rounded-2xl shadow-xs">
                <CardContent className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <ClockIcon className="size-3.5 text-primary" />
                    <span>Expected Recovery Milestones</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentGuide.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/20 rounded-xl border border-border/50 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary text-[11px] font-mono">
                            {step.phase}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {step.milestone}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                          {step.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-5">
              <Card className="border border-primary/20 bg-card rounded-2xl p-5 shadow-xs space-y-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MicIcon className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Have Questions?</h3>
                    <p className="text-[11px] text-muted-foreground">Talk to Riley, our AI assistant</p>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Get real-time spoken guidance regarding bleeding, medication schedules, and dietary questions.
                </p>

                <Link href="/voice" className="block pt-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8.5 rounded-xl flex items-center justify-center gap-1.5 font-medium shadow-xs">
                    Start Voice Consultation
                    <ArrowRightIcon className="size-3" />
                  </Button>
                </Link>
              </Card>

              <Card className="border border-border/80 bg-card rounded-2xl p-5 shadow-xs space-y-3 text-xs">
                <div className="flex items-center gap-2 text-red-500 font-semibold">
                  <AlertCircleIcon className="size-4 shrink-0" />
                  <span>Immediate Medical Attention</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Contact our clinic or emergency services immediately if you experience body temperature above 101°F, bleeding unresponsive to 4 hours of pressure, or difficulty swallowing.
                </p>
                <div className="pt-1 flex flex-col gap-2">
                  <a
                    href="tel:18004336824"
                    className="w-full"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs h-8.5 rounded-xl border-red-500/30 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-1.5"
                    >
                      <PhoneCallIcon className="size-3" />
                      Hotline: +1 (800) 433-6824
                    </Button>
                  </a>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsTriageOpen(true)}
                    className="w-full text-xs h-8 text-muted-foreground hover:text-foreground"
                  >
                    Open Triage Guide
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <EmergencyTriageModal
        open={isTriageOpen}
        onOpenChange={setIsTriageOpen}
      />
    </>
  );
}
