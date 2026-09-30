"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  StethoscopeIcon,
  SearchIcon,
  ClockIcon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  CalendarIcon,
  SparklesIcon,
  AlertTriangleIcon,
  PhoneCallIcon,
  HeartPulseIcon,
  UserCheckIcon,
  ArrowRightIcon,
} from "lucide-react";
import Link from "next/link";
import EmergencyTriageModal from "@/components/emergency/EmergencyTriageModal";

interface Department {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  leadSpecialist: string;
  qualification: string;
  description: string;
  procedures: {
    name: string;
    duration: string;
    price: string;
    recovery: string;
    anesthesia: string;
  }[];
  prepGuidelines: string[];
  insuranceCovered: boolean;
  emergencyAvailable: boolean;
}

const DEPARTMENTS: Department[] = [
  {
    id: "oral-surgery",
    name: "Oral & Maxillofacial Surgery",
    shortName: "Oral Surgery",
    icon: "🏥",
    leadSpecialist: "Dr. Marcus Vance",
    qualification: "DDS, FACS, Board Certified Oral Surgeon (15+ yrs exp)",
    description:
      "Advanced surgical care for impacted wisdom teeth, complex extractions, corrective jaw surgery, facial trauma reconstruction, and pre-prosthetic bone grafts.",
    procedures: [
      {
        name: "Surgical Wisdom Tooth Extraction",
        duration: "45–60 min",
        price: "$250 - $400",
        recovery: "3–5 days",
        anesthesia: "IV Sedation / Local",
      },
      {
        name: "Alveolar Bone Grafting",
        duration: "60 min",
        price: "$450 - $800",
        recovery: "1–2 weeks",
        anesthesia: "Local + Nitrous Oxide",
      },
      {
        name: "Cyst Enucleation & Biopsy",
        duration: "45 min",
        price: "$300 - $600",
        recovery: "3–7 days",
        anesthesia: "Local Anesthesia",
      },
    ],
    prepGuidelines: [
      "Fasting required for 6–8 hours prior if undergoing IV sedation.",
      "Arrange an adult escort for post-procedure transport home.",
      "Avoid blood-thinning OTC medication like Aspirin 48h prior.",
    ],
    insuranceCovered: true,
    emergencyAvailable: true,
  },
  {
    id: "orthodontics",
    name: "Orthodontics & Dentofacial Orthopedics",
    shortName: "Orthodontics",
    icon: "😁",
    leadSpecialist: "Dr. Elena Rostova",
    qualification: "DMD, MS Orthodontics, Harvard Dental Alumni",
    description:
      "Comprehensive smile alignment using cutting-edge 3D intraoral scanning, Invisalign® clear aligners, ceramic braces, and pediatric interceptive jaw guidance.",
    procedures: [
      {
        name: "Invisalign® Full Alignment Consultation",
        duration: "45 min",
        price: "$100 (Credited to plan)",
        recovery: "Zero downtime",
        anesthesia: "None required",
      },
      {
        name: "Ceramic / Metal Bracket Installation",
        duration: "90 min",
        price: "$2,800 - $4,500",
        recovery: "2–3 days mild ache",
        anesthesia: "None required",
      },
      {
        name: "Palatal Expander & Interceptive Ortho",
        duration: "45 min",
        price: "$950 - $1,600",
        recovery: "1–2 days adaptation",
        anesthesia: "None required",
      },
    ],
    prepGuidelines: [
      "Perform thorough brushing and flossing before your scan.",
      "Bring any existing dental retainers, mouthguards, or night guards.",
    ],
    insuranceCovered: true,
    emergencyAvailable: false,
  },
  {
    id: "endodontics",
    name: "Endodontics & Root Canal Therapy",
    shortName: "Endodontics",
    icon: "🔬",
    leadSpecialist: "Dr. Alexander Thorne",
    qualification: "DDS, Endodontic Specialist, AAE Member",
    description:
      "Painless single-visit root canal treatments utilizing 3D CBCT imaging, surgical operative microscopes, and gentle laser canal disinfection.",
    procedures: [
      {
        name: "Molar Microscopic Root Canal Therapy",
        duration: "60–75 min",
        price: "$650 - $950",
        recovery: "24–48 hours",
        anesthesia: "Advanced Local Block",
      },
      {
        name: "Anterior / Premolar Root Canal",
        duration: "45–60 min",
        price: "$450 - $700",
        recovery: "24 hours",
        anesthesia: "Local Anesthesia",
      },
      {
        name: "Endodontic Retreatment & Apicoectomy",
        duration: "90 min",
        price: "$800 - $1,200",
        recovery: "2–4 days",
        anesthesia: "Local + Oral Sedation",
      },
    ],
    prepGuidelines: [
      "Eat a regular meal before your appointment as numbness will last 3–4 hours.",
      "Continue prescribed blood pressure medications unless explicitly directed otherwise.",
    ],
    insuranceCovered: true,
    emergencyAvailable: true,
  },
  {
    id: "implantology",
    name: "Prosthodontics & Dental Implants",
    shortName: "Implants & Crowns",
    icon: "💎",
    leadSpecialist: "Dr. Jonathan Hayes",
    qualification: "FACP, Board Certified Prosthodontist",
    description:
      "Permanent dental restoration with medical-grade titanium and zirconia implants, full-arch All-on-4 rehabilitation, and same-day CEREC porcelain crowns.",
    procedures: [
      {
        name: "Single Titanium Implant Placement",
        duration: "60 min",
        price: "$1,200 - $1,800",
        recovery: "2–3 days",
        anesthesia: "Local + Nitrous Oxide",
      },
      {
        name: "CEREC Same-Day Zirconia Crown",
        duration: "90 min",
        price: "$750 - $1,100",
        recovery: "Immediate",
        anesthesia: "Local Anesthesia",
      },
      {
        name: "All-on-4 Full Arch Consultation & 3D Plan",
        duration: "60 min",
        price: "$150",
        recovery: "None (Diagnostic)",
        anesthesia: "None",
      },
    ],
    prepGuidelines: [
      "Have a list of current medications and supplements ready.",
      "Inform the surgeon if you take bisphosphonates or blood thinners.",
    ],
    insuranceCovered: true,
    emergencyAvailable: false,
  },
  {
    id: "periodontics",
    name: "Periodontics & Gum Disease Care",
    shortName: "Periodontics",
    icon: "🌿",
    leadSpecialist: "Dr. Rachel Kim",
    qualification: "DDS, Board Certified Periodontist, AAP Member",
    description:
      "Advanced treatment for bleeding gums, gingivitis, and severe periodontitis using LANAP laser regeneration, deep ultrasonic scaling, and soft tissue grafting.",
    procedures: [
      {
        name: "Full Mouth Ultrasonic Scaling & Root Planing",
        duration: "60–90 min",
        price: "$280 - $450",
        recovery: "24–48 hours",
        anesthesia: "Topical + Local Numbing",
      },
      {
        name: "Laser Periodontal Pocket Therapy",
        duration: "45 min",
        price: "$350 - $600",
        recovery: "Immediate",
        anesthesia: "Local Anesthesia",
      },
      {
        name: "Connective Tissue Gum Graft",
        duration: "75 min",
        price: "$600 - $1,100",
        recovery: "5–7 days",
        anesthesia: "Local + Nitrous Oxide",
      },
    ],
    prepGuidelines: [
      "Brush and floss gently on the day of treatment.",
      "Plan on consuming cool, soft foods for the first 24 hours.",
    ],
    insuranceCovered: true,
    emergencyAvailable: false,
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry (Kids Care)",
    shortName: "Pediatric",
    icon: "🧸",
    leadSpecialist: "Dr. Maya Patel",
    qualification: "BDS, MSD Pediatric Dental Specialist",
    description:
      "Compassionate, fear-free dental visits for infants, children, and teenagers. Offering gentle checkups, dental sealants, fluoride treatments, and nitrous oxide sedation.",
    procedures: [
      {
        name: "Child Gentle Exam + Fluoride Varnish",
        duration: "30 min",
        price: "$95 - $140",
        recovery: "Immediate",
        anesthesia: "None required",
      },
      {
        name: "Molar Dental Sealants (Per Tooth)",
        duration: "20 min",
        price: "$45 - $70",
        recovery: "Immediate",
        anesthesia: "None required",
      },
      {
        name: "Pediatric Sedation Restoration",
        duration: "45 min",
        price: "$180 - $350",
        recovery: "2–4 hours",
        anesthesia: "Laughing Gas (Nitrous)",
      },
    ],
    prepGuidelines: [
      "Avoid heavy meals 2 hours before pediatric nitrous oxide visits.",
      "Use positive, encouraging words with your child—never use words like 'shot' or 'needle'.",
    ],
    insuranceCovered: true,
    emergencyAvailable: true,
  },
  {
    id: "cosmetic",
    name: "Cosmetic & Aesthetic Dentistry",
    shortName: "Cosmetic",
    icon: "✨",
    leadSpecialist: "Dr. Julian Sterling",
    qualification: "DDS, AACD Accredited Cosmetic Dentist",
    description:
      "Transformative aesthetic smile designs including Philips Zoom! in-office laser whitening, hand-crafted porcelain veneers, and composite bonding.",
    procedures: [
      {
        name: "Philips Zoom! In-Office Laser Teeth Whitening",
        duration: "60 min",
        price: "$350 - $500",
        recovery: "Immediate",
        anesthesia: "None required",
      },
      {
        name: "Custom Handcrafted Porcelain Veneer (Per Unit)",
        duration: "75 min",
        price: "$900 - $1,500",
        recovery: "1–2 days",
        anesthesia: "Local Anesthesia",
      },
      {
        name: "Composite Aesthetic Edge Bonding",
        duration: "45 min",
        price: "$180 - $320",
        recovery: "Immediate",
        anesthesia: "None or Minimal Local",
      },
    ],
    prepGuidelines: [
      "Complete a professional dental cleaning within 3 months prior to whitening.",
      "Avoid coffee, red wine, and tobacco for 48 hours post-whitening.",
    ],
    insuranceCovered: false,
    emergencyAvailable: false,
  },
  {
    id: "emergency-dept",
    name: "24/7 Dental Trauma & Emergency Care",
    shortName: "Emergency Trauma",
    icon: "🚨",
    leadSpecialist: "Dr. Liam O'Connor",
    qualification: "DDS, Emergency Dental & Trauma Specialist",
    description:
      "Round-the-clock emergency team ready for knocked-out teeth, acute dental abscesses, continuous bleeding, fractured jaws, and severe dental trauma.",
    procedures: [
      {
        name: "Immediate Tooth Re-Implantation & Splinting",
        duration: "45 min",
        price: "$300 - $550",
        recovery: "2–3 weeks",
        anesthesia: "Local Anesthetic Block",
      },
      {
        name: "Emergency Pulp Extirpation (Pain Relief)",
        duration: "30–45 min",
        price: "$200 - $350",
        recovery: "24 hours",
        anesthesia: "Deep Local Block",
      },
      {
        name: "Incision & Drainage of Acute Abscess",
        duration: "30 min",
        price: "$250 - $400",
        recovery: "2–3 days",
        anesthesia: "Local Anesthesia",
      },
    ],
    prepGuidelines: [
      "If tooth is knocked out, keep it submerged in milk and arrive within 60 minutes.",
      "Call our direct trauma hotline: +1 (800) 433-6824 for immediate instructions en route.",
    ],
    insuranceCovered: true,
    emergencyAvailable: true,
  },
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeptId, setSelectedDeptId] = useState<string>("all");
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  const filteredDepartments = DEPARTMENTS.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.procedures.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDept =
      selectedDeptId === "all" || dept.id === selectedDeptId;
    return matchesSearch && matchesDept;
  });

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
                  <StethoscopeIcon className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Hospital Clinical Departments
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Comprehensive Dental Departments & Specializations
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  DentAIva features 8 dedicated specialty departments staffed by board-certified dental surgeons, prosthodontists, endodontists, and pediatric specialists with hospital-grade sterilization protocols.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-foreground bg-card/80 px-3 py-1.5 rounded-lg border">
                    <ShieldCheckIcon className="size-4 text-primary" />
                    <span>Board Certified Specialists</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground bg-card/80 px-3 py-1.5 rounded-lg border">
                    <ClockIcon className="size-4 text-primary" />
                    <span>Same-Day Emergency Slots</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground bg-card/80 px-3 py-1.5 rounded-lg border">
                    <CheckCircle2Icon className="size-4 text-primary" />
                    <span>Transparent Pricing & Insurance</span>
                  </div>
                </div>
              </div>

              {/* EMERGENCY CALLOUT CARD */}
              <div className="w-full lg:w-72 bg-card/90 border border-red-500/30 rounded-2xl p-5 shadow-lg space-y-3 shrink-0">
                <div className="flex items-center gap-2 text-red-500 font-semibold text-xs uppercase">
                  <AlertTriangleIcon className="size-4" />
                  <span>Trauma & Urgent Care</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Severe pain, bleeding, or knocked-out tooth? Our emergency trauma team is on standby 24/7.
                </p>
                <Button
                  onClick={() => setIsTriageOpen(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold h-9 shadow-md"
                >
                  <HeartPulseIcon className="size-3.5 mr-1.5" />
                  Emergency Triage Guide
                </Button>
                <a
                  href="tel:18004336824"
                  className="block text-center text-xs font-mono font-bold text-foreground hover:text-red-400"
                >
                  Hotline: +1 (800) 433-6824
                </a>
              </div>
            </div>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-96">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search procedures (e.g. Root Canal, Wisdom, Whitening)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 bg-card border-border/70 rounded-xl text-sm"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedDeptId("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedDeptId === "all"
                      ? "bg-primary text-white shadow-sm"
                      : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Specializations ({DEPARTMENTS.length})
                </button>
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedDeptId === dept.id
                        ? "bg-primary text-white shadow-sm"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {dept.icon} {dept.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* DEPARTMENTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredDepartments.map((dept) => (
              <Card
                key={dept.id}
                className="border border-border/80 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <CardHeader className="space-y-3 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl p-2 bg-primary/10 rounded-2xl border border-primary/20">
                        {dept.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-foreground">
                          {dept.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[11px] font-normal">
                            <UserCheckIcon className="size-3 mr-1 text-primary" />
                            {dept.leadSpecialist}
                          </Badge>
                          {dept.emergencyAvailable && (
                            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">
                              24/7 On-Call
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {dept.description}
                  </p>
                  <p className="text-[11px] text-primary/80 font-mono">
                    {dept.qualification}
                  </p>
                </CardHeader>

                <CardContent className="space-y-5 pt-0">
                  {/* PROCEDURES TABLE */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Common Clinical Procedures & Fees
                    </h4>
                    <div className="space-y-2">
                      {dept.procedures.map((proc, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                        >
                          <div className="space-y-0.5">
                            <span className="font-semibold text-foreground">
                              {proc.name}
                            </span>
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <ClockIcon className="size-3" />
                                {proc.duration}
                              </span>
                              <span>• Anesthesia: {proc.anesthesia}</span>
                              <span>• Recovery: {proc.recovery}</span>
                            </div>
                          </div>
                          <div className="text-right sm:shrink-0 font-mono font-bold text-primary text-sm">
                            {proc.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PREPARATION GUIDELINES */}
                  <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/10 space-y-1.5">
                    <div className="text-[11px] font-semibold text-primary flex items-center gap-1">
                      <SparklesIcon className="size-3.5" />
                      <span>Pre-Procedure Preparation Protocol</span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      {dept.prepGuidelines.map((guideline, gIdx) => (
                        <li key={gIdx} className="flex items-start gap-1.5">
                          <span className="text-primary font-bold">•</span>
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ACTION BAR */}
                  <div className="pt-2 flex items-center justify-between border-t border-border/60">
                    <div className="text-[11px] text-muted-foreground">
                      {dept.insuranceCovered ? (
                        <span className="text-green-500 font-medium">
                          ✓ Eligible for PPO Insurance Claims
                        </span>
                      ) : (
                        <span>Self-Pay / Flexible Installments</span>
                      )}
                    </div>

                    <Link href="/appointments">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white font-medium text-xs rounded-xl"
                      >
                        <CalendarIcon className="size-3.5 mr-1.5" />
                        Book This Department
                        <ArrowRightIcon className="size-3.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-16 bg-card border rounded-2xl space-y-3">
              <StethoscopeIcon className="size-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold">No specialized procedures found</h3>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords like "extraction", "crown", or "implants".
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDeptId("all");
                }}
              >
                Clear Search & Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <EmergencyTriageModal
        open={isTriageOpen}
        onOpenChange={setIsTriageOpen}
      />
    </>
  );
}
