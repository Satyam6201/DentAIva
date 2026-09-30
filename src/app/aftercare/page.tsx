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
  InfoIcon,
  HelpCircleIcon,
  ArrowRightIcon,
  FlameIcon,
} from "lucide-react";
import Link from "next/link";
import EmergencyTriageModal from "@/components/emergency/EmergencyTriageModal";

interface AftercareGuide {
  id: string;
  title: string;
  category: string;
  badgeColor: string;
  icon: string;
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
    title: "Tooth Extraction & Wisdom Teeth Surgery",
    category: "Oral Surgery",
    badgeColor: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: "🦷",
    summary:
      "Crucial guidelines to facilitate blood clot formation and prevent painful Dry Socket (Alveolar Osteitis).",
    doList: [
      "Keep firm, continuous pressure on the gauze pad for 30–45 minutes post-op.",
      "Apply ice packs to the outside of your cheek (15 min on / 15 min off) for the first 24 hours.",
      "Consume cool, soft foods like Greek yogurt, smoothies (spoon-fed), and lukewarm soups.",
      "Take prescribed pain relievers and antibiotics exactly as instructed by your surgeon.",
      "Begin gentle warm salt water rinses (1/2 tsp salt in 8 oz water) starting 24 hours AFTER surgery.",
    ],
    dontList: [
      "DO NOT drink through a straw for at least 7 days (suction dislodges blood clots).",
      "DO NOT forcefully spit or rinse vigorously during the first 24 hours.",
      "DO NOT smoke, vape, or use tobacco products for at least 72 hours.",
      "DO NOT consume piping hot, spicy, or crunchy foods (chips, nuts, seeds).",
      "DO NOT perform heavy lifting or strenuous exercise for 3 to 4 days.",
    ],
    timeline: [
      {
        day: "Day 1 (0–24 Hours)",
        milestone: "Clot Formation & Bleeding Control",
        instructions:
          "Rest with head elevated. Oozing is normal; bite on a damp black tea bag if bleeding persists. Ice cheek continuously.",
      },
      {
        day: "Day 2–3 (24–72 Hours)",
        milestone: "Peak Swelling & Pain Management",
        instructions:
          "Swelling usually peaks around 48 hours. Switch from ice to warm moist compress. Begin warm salt water rinses 4 times daily.",
      },
      {
        day: "Day 4–7",
        milestone: "Tissue Healing & Gradual Diet Transition",
        instructions:
          "Pain should noticeably decrease. Gradually reintroduce soft solid foods (scrambled eggs, pasta). Continue gentle oral hygiene.",
      },
    ],
  },
  {
    id: "root-canal",
    title: "Root Canal Therapy (Endodontics)",
    category: "Endodontics",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: "🔬",
    summary:
      "Care instructions following pulp cleaning to protect the temporary filling and soothe periodontal ligament soreness.",
    doList: [
      "Avoid chewing or biting on the treated tooth until your permanent crown is seated.",
      "Take over-the-counter anti-inflammatories (e.g. Ibuprofen 400-600mg) for natural periapical ligament tenderness.",
      "Continue brushing and flossing around the tooth gently.",
      "Schedule your permanent crown placement within 2–4 weeks to prevent tooth fracture.",
    ],
    dontList: [
      "DO NOT eat hard, sticky, or chewy foods (caramels, ice, hard crusts).",
      "DO NOT chew on that side while local numbness is still active (risk of cheek/tongue bite).",
      "DO NOT ignore severe throbbing pain that worsens after 3 days.",
    ],
    timeline: [
      {
        day: "Day 1 (First 24 Hours)",
        milestone: "Numbness & Initial Tenderness",
        instructions:
          "Numbness will wear off in 2–4 hours. A bruised sensation when biting is normal as the bone heals.",
      },
      {
        day: "Day 2–5",
        milestone: "Periapical Ligament Recovery",
        instructions:
          "Tenderness when tapping the tooth subsides. Keep the temporary filling clean.",
      },
      {
        day: "Within 3 Weeks",
        milestone: "Permanent Crown Restoration",
        instructions:
          "The hollowed tooth requires a permanent porcelain crown to prevent bacterial re-infection and structural cracking.",
      },
    ],
  },
  {
    id: "implants",
    title: "Dental Implant & Bone Graft Recovery",
    category: "Implantology",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: "💎",
    summary:
      "Ensuring successful osseointegration (bone fusion) and gum cuff healing around the titanium fixture.",
    doList: [
      "Rinse with prescribed Chlorhexidine Gluconate 0.12% oral rinse twice daily without vigorous swishing.",
      "Maintain a strictly soft diet for 7–10 days post-surgery.",
      "Keep head elevated on two pillows during sleep for the first two nights.",
      "Complete the entire cycle of prescribed antibiotics even if you feel completely fine.",
    ],
    dontList: [
      "DO NOT touch, probe, or press your tongue against the implant site or surgical sutures.",
      "DO NOT wear any removable temporary denture without explicit clearance from the surgeon.",
      "DO NOT brush directly over the surgical stitches for the first 3 days (brush adjacent teeth gently).",
      "DO NOT smoke—smoking increases dental implant failure rates by up to 300%.",
    ],
    timeline: [
      {
        day: "Day 1–3",
        milestone: "Soft Tissue Hemostasis",
        instructions:
          "Minor oozing and gum swelling. Use ice packs on outer jaw. Avoid pressure on surgical site.",
      },
      {
        day: "Week 1–2",
        milestone: "Suture Removal or Dissolution",
        instructions:
          "Sutures dissolve or are removed at follow-up. Gums pink up and seal around healing abutment.",
      },
      {
        day: "Month 2–4",
        milestone: "Osseointegration (Bone Fusion)",
        instructions:
          "Titanium microscopic fusion with jawbone progresses. Final 3D scan and crown fabrication scheduled.",
      },
    ],
  },
  {
    id: "whitening",
    title: "Philips Zoom! Laser Teeth Whitening",
    category: "Cosmetic",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: "✨",
    summary:
      "Strict 48-hour 'White Diet' rules to prevent staining porous enamel and strategies for temporary sensitivity.",
    doList: [
      "Follow the strict 'White Diet' for 48 hours: Milk, water, plain yogurt, white rice, skinless chicken breast, cauliflower.",
      "Brush with potassium nitrate desensitizing toothpaste (Sensodyne) twice daily.",
      "Drink plenty of room-temperature water to rehydrate enamel tubules.",
    ],
    dontList: [
      "DO NOT drink coffee, tea, red wine, dark sodas, or fruit juices for 48 hours.",
      "DO NOT eat staining foods: tomato sauce, mustard, ketchup, berries, soy sauce, curries.",
      "DO NOT consume ice-cold or scalding hot liquids if transient 'zingers' (nerve pulses) occur.",
      "DO NOT use tobacco products for at least 48 hours.",
    ],
    timeline: [
      {
        day: "First 24 Hours",
        milestone: "Enamel Tubule Dehydration & Sensitivity",
        instructions:
          "Transient sharp zings can occur as teeth rehydrate. Take Ibuprofen if required.",
      },
      {
        day: "Day 2 (24–48 Hours)",
        milestone: "Enamel Remineralization",
        instructions:
          "Enamel re-hardens with salivary minerals. Continue avoiding chromogenic (staining) foods.",
      },
      {
        day: "Day 3+",
        milestone: "Stable Aesthetic Shade",
        instructions:
          "Final bright shade stabilizes. Normal diet can resume. Floss daily to maintain luminosity.",
      },
    ],
  },
];

export default function AftercarePage() {
  const [selectedGuideId, setSelectedGuideId] = useState<string>("extraction");
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  // Interactive recovery checklist states
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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* HEADER SECTION */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-background border border-primary/20 p-8 sm:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <HeartHandshakeIcon className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Hospital Post-Operative Care Portal
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Aftercare Instructions & Recovery Guides
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Clinically verified post-procedure instructions, milestone tracking, and complications guidance prepared by our dental surgeons to ensure rapid, painless healing.
                </p>
              </div>

              {/* EMERGENCY CALLOUT */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  onClick={() => setIsTriageOpen(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm h-11 px-5 rounded-xl shadow-md"
                >
                  <AlertTriangleIcon className="size-4 mr-2" />
                  Experiencing Complications?
                </Button>
              </div>
            </div>
          </div>

          {/* WARNING RED FLAGS CARD */}
          <Card className="border-2 border-red-500/40 bg-gradient-to-r from-red-500/10 via-card to-card p-6 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="size-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
                  <ShieldAlertIcon className="size-5 text-red-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                    When to Contact the Hospital Immediately (Red Flags)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Contact our 24/7 Trauma Desk if you experience: body temperature &gt; 101°F (38.3°C), active bright-red hemorrhage that doesn't slow with gauze pressure after 4 hours, swelling that spreads to your throat or eye, or difficulty breathing or swallowing.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <a href="tel:18004336824" className="w-full md:w-auto">
                  <Button
                    size="sm"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-10 px-4"
                  >
                    <PhoneCallIcon className="size-3.5 mr-2" />
                    Call Trauma Desk: +1 (800) 433-6824
                  </Button>
                </a>
              </div>
            </div>
          </Card>

          {/* PROCEDURE SELECTOR BUTTONS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/60">
            {AFTERCARE_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedGuideId(guide.id)}
                className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  selectedGuideId === guide.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{guide.icon}</span>
                <span>{guide.title}</span>
              </button>
            ))}
          </div>

          {/* ACTIVE GUIDE CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT 2 COLS: DO & DON'T LISTS */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{currentGuide.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {currentGuide.title}
                      </h2>
                      <Badge className={currentGuide.badgeColor} variant="outline">
                        {currentGuide.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentGuide.summary}
                </p>

                {/* DO & DON'T SPLIT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {/* WHAT TO DO */}
                  <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wide">
                      <CheckCircle2Icon className="size-4" />
                      <span>Essential Do's</span>
                    </div>
                    <ul className="space-y-2 text-xs text-foreground">
                      {currentGuide.doList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WHAT TO AVOID */}
                  <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wide">
                      <AlertTriangleIcon className="size-4" />
                      <span>Critical Don'ts (Avoid)</span>
                    </div>
                    <ul className="space-y-2 text-xs text-foreground">
                      {currentGuide.dontList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* RECOVERY MILESTONE TIMELINE */}
              <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ClockIcon className="size-5 text-primary" />
                  Day-by-Day Recovery Timeline
                </h3>

                <div className="space-y-4">
                  {currentGuide.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary text-sm">
                          {step.day}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {step.milestone}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed pt-1">
                        {step.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COL: INTERACTIVE RECOVERY CHECKLIST & SUPPORT */}
            <div className="space-y-6">
              {/* CHECKLIST */}
              <Card className="border border-border/80 bg-card/90 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    Interactive Healing Checklist
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Mark tasks complete as you progress through recovery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0 text-xs">
                  {[
                    "Biting gauze pressure applied for 45 min",
                    "Cold ice pack applied to cheek in 15-min intervals",
                    "Prescribed pain relief taken on schedule",
                    "Hydrated with room-temperature water (NO straws)",
                    "Soft food meal consumed without hot spices",
                    "Gently rested with head elevated on pillows",
                    "Warm salt water rinses completed (Day 2+)",
                  ].map((task, i) => {
                    const isChecked = !!checkedItems[`${currentGuide.id}-${i}`];
                    return (
                      <label
                        key={i}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
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

              {/* AI RECOVERY COMPANION CARD */}
              <Card className="border border-primary/20 bg-gradient-to-br from-primary/10 to-card p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-2xl bg-primary/20 flex items-center justify-center text-xl">
                    🎙️
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      Ask Riley (AI Dental Voice)
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Unsure if your healing is normal? Talk to Riley 24/7.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our Vapi AI Assistant can answer questions like "Is bleeding normal on day 2?" or "When can I drink warm coffee again?"
                </p>

                <Link href="/voice">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white text-xs font-semibold h-9 rounded-xl">
                    Launch Voice Consultation
                    <ArrowRightIcon className="size-3.5 ml-1.5" />
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
