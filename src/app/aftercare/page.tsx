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
    summary: "Follow these home care instructions to protect the healing blood clot and prevent dry socket.",
    doList: [
      "Bite gently on the gauze pad for 30–45 minutes post-surgery.",
      "Apply ice packs to your cheek (15 min on / 15 min off) for the first 24 hours.",
      "Eat cool, soft foods such as yogurt, lukewarm soups, and smoothies.",
      "Begin gentle warm salt water rinses 24 hours after surgery.",
    ],
    dontList: [
      "Do not drink through a straw for 7 days (suction dislodges clots).",
      "Do not spit forcefully or rinse vigorously on day 1.",
      "Do not smoke or use tobacco for at least 72 hours.",
      "Do not engage in strenuous physical exercise for 3 to 4 days.",
    ],
    timeline: [
      {
        day: "Day 1 (0–24h)",
        milestone: "Clot Formation",
        instructions: "Rest with head elevated. Minor oozing is normal. Keep ice applied.",
      },
      {
        day: "Days 2–3",
        milestone: "Peak Swelling",
        instructions: "Switch to warm compresses. Begin warm salt water rinses 4 times daily.",
      },
      {
        day: "Days 4–7",
        milestone: "Healing",
        instructions: "Discomfort subsides. Gradually return to normal soft solid foods.",
      },
    ],
  },
  {
    id: "root-canal",
    title: "Root Canal Therapy",
    category: "Endodontics",
    icon: MicroscopeIcon,
    summary: "Care instructions to protect your temporary restoration and soothe periapical tenderness.",
    doList: [
      "Avoid chewing on the treated tooth until your permanent crown is placed.",
      "Take prescribed anti-inflammatories (such as Ibuprofen) as directed.",
      "Brush and floss gently around the tooth every day.",
      "Schedule your permanent crown within 2–4 weeks to prevent fracture.",
    ],
    dontList: [
      "Do not bite hard, sticky, or crunchy foods on that side.",
      "Do not chew while local anesthesia numbness is still active.",
      "Do not ignore severe throbbing pain that worsens after 3 days.",
      "Do not use toothpicks or sharp objects around the temporary seal.",
    ],
    timeline: [
      {
        day: "Day 1",
        milestone: "Numbness Fades",
        instructions: "Local anesthetic wears off in 2–4 hours. Bruised sensation is normal.",
      },
      {
        day: "Days 2–4",
        milestone: "Tenderness Subsides",
        instructions: "Bite soreness decreases. Keep the temporary filling clean.",
      },
      {
        day: "Week 2–3",
        milestone: "Permanent Crown",
        instructions: "Complete restoration with a crown to prevent bacterial re-infection.",
      },
    ],
  },
  {
    id: "implants",
    title: "Dental Implants & Bone Grafts",
    category: "Implantology",
    icon: ShieldCheckIcon,
    summary: "Guidelines to promote successful bone fusion (osseointegration) and soft tissue healing.",
    doList: [
      "Rinse gently with prescribed Chlorhexidine mouthwash twice daily.",
      "Maintain a soft-food diet for 7–10 days post-procedure.",
      "Sleep with your head elevated on pillows for the first 2 nights.",
      "Complete the entire course of prescribed antibiotics.",
    ],
    dontList: [
      "Do not touch or probe the surgical site with your tongue or fingers.",
      "Do not wear removable dentures without explicit surgeon approval.",
      "Do not smoke—tobacco significantly increases implant failure rates.",
      "Do not brush directly on surgical stitches for the first 3 days.",
    ],
    timeline: [
      {
        day: "Days 1–3",
        milestone: "Tissue Hemostasis",
        instructions: "Minor oozing and gum swelling. Use ice packs on outer jawline.",
      },
      {
        day: "Weeks 1–2",
        milestone: "Suture Check",
        instructions: "Sutures dissolve or are removed. Gums seal around healing abutment.",
      },
      {
        day: "Months 2–4",
        milestone: "Bone Fusion",
        instructions: "Titanium fuses with jawbone. 3D scan scheduled for crown design.",
      },
    ],
  },
  {
    id: "whitening",
    title: "Laser Teeth Whitening",
    category: "Cosmetics",
    icon: SparklesIcon,
    summary: "Strict 48-hour White Diet rules to protect porous enamel and eliminate sensitivity.",
    doList: [
      "Follow the White Diet for 48 hours: milk, water, rice, white fish, chicken.",
      "Use potassium nitrate desensitizing toothpaste (Sensodyne) twice daily.",
      "Drink room-temperature water to keep enamel tubules hydrated.",
      "Gently floss daily to maintain bright interproximal spaces.",
    ],
    dontList: [
      "Do not drink coffee, tea, red wine, or dark sodas for 48 hours.",
      "Do not consume staining foods (curries, tomato sauces, berries).",
      "Do not drink scalding or ice-cold liquids if sensitivity zingers occur.",
      "Do not use tobacco products for at least 48 hours.",
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
        <div className="max-w-5xl mx-auto space-y-8">
          {/* PAGE TITLE */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Post-Operative Recovery Guides
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Clear home care instructions, recovery milestones, and safety protocols prepared by our surgical team.
            </p>
          </div>

          {/* PROCEDURE TABS (CLEAN SEGMENTED CONTROL) */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1">
            {AFTERCARE_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedGuideId(guide.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedGuideId === guide.id
                    ? "bg-primary text-white font-semibold"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {guide.title}
              </button>
            ))}
          </div>

          {/* MAIN 2-COLUMN RECOVERY CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* LEFT 2 COLUMNS: SUMMARY & DO/DON'T LIST */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border border-border/80 bg-card rounded-xl shadow-xs">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                      <CurrentGuideIcon className="size-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-foreground">
                        {currentGuide.title}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {currentGuide.summary}
                      </p>
                    </div>
                  </div>

                  {/* DO & DON'T CLEAN COLUMNS (NO LOUD COLORED BOXES) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-border/50 text-xs">
                    {/* DO LIST */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-emerald-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
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

                    {/* DONT LIST */}
                    <div className="space-y-3">
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

              {/* TIMELINE MILESTONES (CLEAN HORIZONTAL STEPS) */}
              <Card className="border border-border/80 bg-card rounded-xl shadow-xs">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                    <ClockIcon className="size-3.5 text-primary" />
                    <span>Expected Recovery Milestones</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {currentGuide.timeline.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/20 rounded-lg border border-border/40 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary text-[11px] font-mono">{step.day}</span>
                          <span className="text-[10px] text-muted-foreground">{step.milestone}</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-tight">
                          {step.instructions}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: RECOVERY CHECKLIST & SUPPORT */}
            <div className="space-y-5">
              {/* INTERACTIVE CHECKLIST */}
              <Card className="border border-border/80 bg-card rounded-xl shadow-xs">
                <CardContent className="p-5 space-y-3 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <CheckCircle2Icon className="size-3.5 text-primary" />
                    <span>Daily Recovery Checklist</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Gauze pressure applied as instructed",
                      "Cold compress applied at 15-min intervals",
                      "Prescribed pain medication taken on schedule",
                      "Adequate room-temperature hydration",
                      "Gentle warm salt water rinse completed",
                    ].map((task, i) => {
                      const isChecked = !!checkedItems[`${currentGuide.id}-${i}`];
                      return (
                        <label
                          key={i}
                          className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                            isChecked
                              ? "bg-primary/5 border-primary/20 text-foreground"
                              : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCheck(`${currentGuide.id}-${i}`)}
                            className="mt-0.5 rounded border-primary accent-primary"
                          />
                          <span className={isChecked ? "line-through text-muted-foreground text-[11px]" : "text-[11px]"}>
                            {task}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* 24/7 SUPPORT & AI VOICE CARD */}
              <Card className="border border-primary/20 bg-card rounded-xl p-5 shadow-xs space-y-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MicIcon className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Have Recovery Questions?</h3>
                    <p className="text-[11px] text-muted-foreground">Talk to Riley, our AI assistant</p>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Unsure about bleeding, medication, or food? Get immediate voice guidance 24/7.
                </p>

                <Link href="/voice" className="block pt-1">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs h-8 rounded-lg flex items-center justify-center gap-1.5 font-medium">
                    Start Voice Consultation
                    <ArrowRightIcon className="size-3" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>

          {/* DIGNIFIED HOSPITAL RED-FLAG NOTICE (CLEAN, MUTED, NON-LOUD) */}
          <div className="p-4 rounded-xl border border-border/70 bg-muted/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <AlertCircleIcon className="size-4 text-red-500 shrink-0" />
              <span>
                <strong className="text-foreground">When to call immediately:</strong> Body temperature &gt; 101°F, bleeding that persists after 4 hours of gauze pressure, or difficulty swallowing.
              </span>
            </div>

            <a
              href="tel:18004336824"
              className="text-red-500 hover:underline font-mono font-semibold shrink-0 flex items-center gap-1"
            >
              <PhoneCallIcon className="size-3" />
              Hotline: +1 (800) 433-6824
            </a>
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
