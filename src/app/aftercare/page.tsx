"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HeartHandshakeIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClockIcon,
  PhoneCallIcon,
  ShieldAlertIcon,
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
    day: string;
    milestone: string;
    instructions: string;
  }[];
}

const AFTERCARE_GUIDES: AftercareGuide[] = [
  {
    id: "extraction",
    title: "Tooth Extraction & Wisdom Teeth",
    category: "Oral Surgery",
    icon: StethoscopeIcon,
    summary:
      "Essential guidelines to promote blood clotting and prevent painful dry socket complications.",
    doList: [
      "Keep firm pressure on the gauze pad for 30–45 minutes.",
      "Apply ice packs to cheek (15 min on / 15 min off) for the first 24 hours.",
      "Consume cool, soft foods (yogurt, smoothies, lukewarm soup).",
      "Begin gentle warm salt water rinses 24 hours AFTER surgery.",
    ],
    dontList: [
      "DO NOT drink through a straw for at least 7 days.",
      "DO NOT spit forcefully or rinse vigorously during the first 24 hours.",
      "DO NOT smoke, vape, or use tobacco for at least 72 hours.",
      "DO NOT engage in heavy exercise or lifting for 3 to 4 days.",
    ],
    timeline: [
      {
        day: "Day 1 (0–24h)",
        milestone: "Clot Formation",
        instructions: "Rest with head elevated. Minor oozing is normal. Keep ice applied.",
      },
      {
        day: "Day 2–3",
        milestone: "Peak Swelling",
        instructions: "Switch to warm moist compress. Begin warm salt water rinses 4x daily.",
      },
      {
        day: "Day 4–7",
        milestone: "Tissue Recovery",
        instructions: "Discomfort subsides. Gradually reintroduce soft solids like pasta.",
      },
    ],
  },
  {
    id: "root-canal",
    title: "Root Canal Therapy",
    category: "Endodontics",
    icon: MicroscopeIcon,
    summary:
      "Care instructions following pulp cleaning to protect the temporary seal and minimize tenderness.",
    doList: [
      "Avoid chewing on the treated tooth until your permanent crown is seated.",
      "Take prescribed anti-inflammatories (e.g. Ibuprofen) for ligament tenderness.",
      "Continue gentle daily brushing and flossing around the tooth.",
      "Schedule your permanent crown within 2–4 weeks to prevent fracture.",
    ],
    dontList: [
      "DO NOT chew hard, sticky, or crunchy foods on that side.",
      "DO NOT chew while local numbness is active to avoid biting tongue.",
      "DO NOT disregard throbbing pain that worsens after 3 days.",
    ],
    timeline: [
      {
        day: "Day 1",
        milestone: "Numbness Fades",
        instructions: "Local anesthetic wears off in 2–4 hours. Bruised sensation is expected.",
      },
      {
        day: "Day 2–4",
        milestone: "Tenderness Subsides",
        instructions: "Soreness upon tapping decreases. Keep temporary filling clean.",
      },
      {
        day: "Week 2–3",
        milestone: "Permanent Crown",
        instructions: "Complete restoration with permanent crown to prevent bacterial re-entry.",
      },
    ],
  },
  {
    id: "implants",
    title: "Dental Implants & Grafts",
    category: "Implantology",
    icon: ShieldCheckIcon,
    summary:
      "Protocol to ensure solid bone fusion (osseointegration) and soft tissue healing around the fixture.",
    doList: [
      "Rinse gently with prescribed Chlorhexidine mouthwash twice daily.",
      "Maintain a strictly soft diet for 7–10 days post-surgery.",
      "Sleep with head elevated on two pillows for the first 2 nights.",
      "Complete the entire cycle of prescribed antibiotic medications.",
    ],
    dontList: [
      "DO NOT touch or press tongue against the implant site or sutures.",
      "DO NOT wear removable dentures without explicit clearance.",
      "DO NOT smoke—smoking significantly increases implant failure rates.",
    ],
    timeline: [
      {
        day: "Day 1–3",
        milestone: "Hemostasis",
        instructions: "Minor oozing and gum swelling. Use ice packs on jawline.",
      },
      {
        day: "Week 1–2",
        milestone: "Suture Check",
        instructions: "Sutures dissolve or are removed. Gums seal around healing abutment.",
      },
      {
        day: "Month 2–4",
        milestone: "Osseointegration",
        instructions: "Titanium fuses with jawbone. 3D scan scheduled for crown design.",
      },
    ],
  },
  {
    id: "whitening",
    title: "Laser Teeth Whitening",
    category: "Cosmetics",
    icon: SparklesIcon,
    summary:
      "Strict 48-hour White Diet rules to protect porous enamel and eliminate temporary tooth sensitivity.",
    doList: [
      "Follow the White Diet for 48 hours: Milk, water, plain yogurt, rice, chicken.",
      "Use potassium nitrate desensitizing toothpaste (Sensodyne) twice daily.",
      "Drink room-temperature water to keep enamel tubules hydrated.",
    ],
    dontList: [
      "DO NOT drink coffee, tea, red wine, or dark sodas for 48 hours.",
      "DO NOT eat staining foods (curries, ketchup, tomato sauce, berries).",
      "DO NOT consume ice-cold liquids if transient nerve zingers occur.",
    ],
    timeline: [
      {
        day: "First 24h",
        milestone: "Sensitivity Peak",
        instructions: "Transient nerve zingers can occur. Mild analgesics help if needed.",
      },
      {
        day: "Day 2",
        milestone: "Remineralization",
        instructions: "Enamel re-hardens with salivary minerals. Continue White Diet.",
      },
      {
        day: "Day 3+",
        milestone: "Shade Stabilized",
        instructions: "Bright aesthetic shade locks in. Normal diet safely resumes.",
      },
    ],
  },
];

export default function AftercarePage() {
  const [selectedGuideId, setSelectedGuideId] = useState<string>("extraction");
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentGuide =
    AFTERCARE_GUIDES.find((g) => g.id === selectedGuideId) ||
    AFTERCARE_GUIDES[0];
  const CurrentGuideIcon = currentGuide.icon;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* HEADER STRIP */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide uppercase mb-2">
                <HeartHandshakeIcon className="size-3.5" />
                Post-Operative Recovery
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Aftercare Guides & Healing Protocols
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Clinically verified recovery milestones, do's and don'ts, and red flag warnings.
              </p>
            </div>

            <Button
              onClick={() => setIsTriageOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs h-9 px-4 rounded-xl shadow-xs shrink-0 self-start md:self-auto"
            >
              <AlertTriangleIcon className="size-3.5 mr-1.5" />
              Complications Triage
            </Button>
          </div>

          {/* COMPACT RED FLAGS ALERT STRIP */}
          <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs">
              <ShieldAlertIcon className="size-4 text-red-500 shrink-0" />
              <span className="text-foreground">
                <strong className="text-red-500">Immediate hospital contact required if:</strong> Fever &gt; 101°F, continuous bleeding after 4 hours, or difficulty swallowing.
              </span>
            </div>
            <a
              href="tel:18004336824"
              className="text-xs font-mono font-bold text-red-500 hover:underline shrink-0 flex items-center gap-1"
            >
              <PhoneCallIcon className="size-3" />
              Trauma Hotline: +1 (800) 433-6824
            </a>
          </div>

          {/* PROCEDURE TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border/60">
            {AFTERCARE_GUIDES.map((guide) => {
              const GuideIcon = guide.icon;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setSelectedGuideId(guide.id)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                    selectedGuideId === guide.id
                      ? "bg-primary text-white shadow-xs font-semibold"
                      : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <GuideIcon className="size-3.5" />
                  <span>{guide.title}</span>
                </button>
              );
            })}
          </div>

          {/* BALANCED 2-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2 COLUMNS: DO'S, DON'TS & TIMELINE */}
            <div className="lg:col-span-2 space-y-6">
              {/* GUIDE DETAILS */}
              <Card className="border border-border/80 bg-card/90 rounded-2xl shadow-xs">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-primary">
                      <CurrentGuideIcon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground">
                        {currentGuide.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-0.5">
                        {currentGuide.summary}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* DO LIST */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-wide">
                        <CheckCircle2Icon className="size-3.5" />
                        <span>Recommended Do's</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-foreground">
                        {currentGuide.doList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DONT LIST */}
                    <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase tracking-wide">
                        <AlertTriangleIcon className="size-3.5" />
                        <span>Critical Don'ts (Avoid)</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-foreground">
                        {currentGuide.dontList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 leading-snug">
                            <span className="text-red-500 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* TIMELINE */}
              <Card className="border border-border/80 bg-card/90 rounded-2xl shadow-xs">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <ClockIcon className="size-4 text-primary" />
                    Recovery Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentGuide.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-muted/20 border border-border/50 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">{step.day}</span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                            {step.milestone}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-tight pt-1">
                          {step.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE CHECKLIST & AI VOICE */}
            <div className="space-y-6">
              {/* HEALING CHECKLIST */}
              <Card className="border border-border/80 bg-card/90 rounded-2xl shadow-xs">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    Healing Checklist
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Track your daily recovery progression
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 space-y-2 text-xs">
                  {[
                    "Gauze pressure applied as directed",
                    "Ice pack applied at 15-min intervals",
                    "Prescribed pain relief taken on schedule",
                    "Hydrated with water (no straws)",
                    "Soft meals eaten without hot spices",
                  ].map((task, i) => {
                    const isChecked = !!checkedItems[`${currentGuide.id}-${i}`];
                    return (
                      <label
                        key={i}
                        className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                          isChecked
                            ? "bg-primary/10 border-primary/30 text-foreground"
                            : "bg-muted/10 border-border/60 text-muted-foreground hover:bg-muted/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(`${currentGuide.id}-${i}`)}
                          className="mt-0.5 rounded border-primary accent-primary"
                        />
                        <span className={isChecked ? "line-through text-muted-foreground" : ""}>
                          {task}
                        </span>
                      </label>
                    );
                  })}
                </CardContent>
              </Card>

              {/* AI RECOVERY VOICE CARD */}
              <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-5 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                    <MicIcon className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      Ask Riley (AI Dental Voice)
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Instant audio answers for recovery questions
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Have questions about bleeding, medication, or food? Speak directly with Riley 24/7.
                </p>

                <Link href="/voice" className="block pt-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold h-8 rounded-xl flex items-center justify-center gap-1.5">
                    Start Voice Chat
                    <ArrowRightIcon className="size-3.5" />
                  </Button>
                </Link>
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
