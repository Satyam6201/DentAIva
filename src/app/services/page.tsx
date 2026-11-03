"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AlertTriangleIcon,
  HeartPulseIcon,
  UserCheckIcon,
  ArrowRightIcon,
  SmileIcon,
  MicroscopeIcon,
  ActivityIcon,
  SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import EmergencyTriageModal from "@/components/emergency/EmergencyTriageModal";

interface Department {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  leadSpecialist: string;
  description: string;
  procedures: {
    name: string;
    duration: string;
    price: string;
  }[];
  prepTip: string;
  emergencyAvailable?: boolean;
}

const DEPARTMENTS: Department[] = [
  {
    id: "oral-surgery",
    name: "Oral & Maxillofacial Surgery",
    shortName: "Oral Surgery",
    icon: StethoscopeIcon,
    leadSpecialist: "Dr. Marcus Vance, DDS",
    description:
      "Impacted wisdom tooth extractions, jaw reconstruction, and bone grafting with IV sedation options.",
    procedures: [
      { name: "Wisdom Tooth Extraction", duration: "45 min", price: "$250–$400" },
      { name: "Alveolar Bone Graft", duration: "60 min", price: "$450–$800" },
      { name: "Surgical Biopsy & Cyst Care", duration: "45 min", price: "$300–$600" },
    ],
    prepTip: "Fasting required for 6–8 hours prior if undergoing sedation.",
    emergencyAvailable: true,
  },
  {
    id: "orthodontics",
    name: "Orthodontics & Clear Aligners",
    shortName: "Orthodontics",
    icon: SmileIcon,
    leadSpecialist: "Dr. Elena Rostova, DMD",
    description:
      "Modern smile alignment with Invisalign® clear aligners, ceramic braces, and pediatric jaw guidance.",
    procedures: [
      { name: "Invisalign® 3D Scan & Consultation", duration: "45 min", price: "$100" },
      { name: "Ceramic / Metal Bracket Installation", duration: "90 min", price: "$2,800–$4,500" },
      { name: "Palatal Expander & Early Ortho", duration: "45 min", price: "$950–$1,600" },
    ],
    prepTip: "Bring any existing retainers or night guards to your visit.",
  },
  {
    id: "endodontics",
    name: "Endodontics & Root Canal Care",
    shortName: "Endodontics",
    icon: MicroscopeIcon,
    leadSpecialist: "Dr. Alexander Thorne, DDS",
    description:
      "Painless single-visit root canal treatments utilizing 3D CBCT imaging and operative microscopes.",
    procedures: [
      { name: "Microscopic Molar Root Canal", duration: "60 min", price: "$650–$950" },
      { name: "Anterior Tooth Root Canal", duration: "45 min", price: "$450–$700" },
      { name: "Endodontic Retreatment", duration: "90 min", price: "$800–$1,200" },
    ],
    prepTip: "Eat a regular meal before arrival; local numbness lasts 3–4 hours.",
    emergencyAvailable: true,
  },
  {
    id: "implantology",
    name: "Dental Implants & Prosthodontics",
    shortName: "Implants",
    icon: ShieldCheckIcon,
    leadSpecialist: "Dr. Jonathan Hayes, FACP",
    description:
      "Permanent tooth restoration with titanium implants, full-arch restorations, and same-day crowns.",
    procedures: [
      { name: "Single Titanium Implant Placement", duration: "60 min", price: "$1,200–$1,800" },
      { name: "CEREC Same-Day Zirconia Crown", duration: "90 min", price: "$750–$1,100" },
      { name: "All-on-4 Full Arch Consultation", duration: "60 min", price: "$150" },
    ],
    prepTip: "Inform your surgeon if taking blood thinners or bone medications.",
  },
  {
    id: "periodontics",
    name: "Periodontics & Gum Therapy",
    shortName: "Periodontics",
    icon: ActivityIcon,
    leadSpecialist: "Dr. Rachel Kim, DDS",
    description:
      "Advanced care for bleeding gums, gingivitis, and periodontitis with laser pocket therapy and scaling.",
    procedures: [
      { name: "Ultrasonic Deep Scaling & Root Planing", duration: "60 min", price: "$280–$450" },
      { name: "Laser Periodontal Pocket Therapy", duration: "45 min", price: "$350–$600" },
      { name: "Soft Tissue Gum Grafting", duration: "75 min", price: "$600–$1,100" },
    ],
    prepTip: "Plan to consume cool, soft foods for 24 hours post-treatment.",
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry (Kids)",
    shortName: "Pediatric",
    icon: HeartPulseIcon,
    leadSpecialist: "Dr. Maya Patel, BDS",
    description:
      "Gentle, stress-free dental visits for infants and children, featuring protective sealants and nitrous oxide.",
    procedures: [
      { name: "Child Gentle Exam + Fluoride", duration: "30 min", price: "$95–$140" },
      { name: "Molar Dental Sealants (Per Tooth)", duration: "20 min", price: "$45–$70" },
      { name: "Pediatric Restorative Care", duration: "45 min", price: "$180–$350" },
    ],
    prepTip: "Avoid heavy meals for 2 hours prior to laughing gas sedation.",
    emergencyAvailable: true,
  },
  {
    id: "cosmetic",
    name: "Cosmetic & Smile Aesthetics",
    shortName: "Cosmetic",
    icon: SparklesIcon,
    leadSpecialist: "Dr. Julian Sterling, DDS",
    description:
      "Aesthetic smile designs including in-office laser whitening, porcelain veneers, and composite bonding.",
    procedures: [
      { name: "Philips Zoom! Laser Whitening", duration: "60 min", price: "$350–$500" },
      { name: "Porcelain Veneer (Per Tooth)", duration: "75 min", price: "$900–$1,500" },
      { name: "Composite Edge Bonding", duration: "45 min", price: "$180–$320" },
    ],
    prepTip: "Avoid coffee, tea, and red wine for 48 hours post-whitening.",
  },
  {
    id: "emergency-dept",
    name: "Trauma & Urgent Dental Care",
    shortName: "Emergency",
    icon: AlertTriangleIcon,
    leadSpecialist: "Dr. Liam O'Connor, DDS",
    description:
      "Round-the-clock emergency care for knocked-out teeth, acute infections, oral trauma, and severe pain.",
    procedures: [
      { name: "Tooth Re-Implantation & Splint", duration: "45 min", price: "$300–$550" },
      { name: "Emergency Pulp Pain Relief", duration: "30 min", price: "$200–$350" },
      { name: "Acute Abscess Drainage", duration: "30 min", price: "$250–$400" },
    ],
    prepTip: "Submerge knocked-out teeth in cold milk and arrive within 60 minutes.",
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

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* HEADER STRIP */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide uppercase mb-2">
                <StethoscopeIcon className="size-3.5" />
                Hospital Specialties
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Clinical Departments & Services
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                8 board-certified specialty divisions with transparent pricing and online booking.
              </p>
            </div>

            {/* QUICK EMERGENCY ALERT BUTTON */}
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTriageOpen(true)}
                className="h-9 px-3.5 text-xs font-semibold border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-xl flex items-center gap-2"
              >
                <AlertTriangleIcon className="size-3.5" />
                Emergency Triage
              </Button>
              <Link href="/appointments">
                <Button size="sm" className="h-9 px-4 text-xs font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xs">
                  <CalendarIcon className="size-3.5 mr-1.5" />
                  Book Visit
                </Button>
              </Link>
            </div>
          </div>

          {/* SEARCH & HORIZONTAL FILTER BAR */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative w-full sm:w-80">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search procedures or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 bg-card border-border/70 rounded-xl text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedDeptId("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedDeptId === "all"
                    ? "bg-primary text-white shadow-xs font-semibold"
                    : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({DEPARTMENTS.length})
              </button>
              {DEPARTMENTS.map((dept) => {
                const DeptIcon = dept.icon;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedDeptId === dept.id
                        ? "bg-primary text-white shadow-xs font-semibold"
                        : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <DeptIcon className="size-3.5" />
                    <span>{dept.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BALANCED 3-COLUMN DEPARTMENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => {
              const DeptIcon = dept.icon;
              return (
                <Card
                  key={dept.id}
                  className="border border-border/80 bg-card/90 hover:border-primary/40 transition-all duration-200 shadow-xs flex flex-col justify-between rounded-2xl"
                >
                  <CardHeader className="space-y-2.5 p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-primary shrink-0">
                          <DeptIcon className="size-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-bold text-foreground leading-tight">
                            {dept.name}
                          </CardTitle>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                            <UserCheckIcon className="size-3 text-primary" />
                            <span>{dept.leadSpecialist}</span>
                          </div>
                        </div>
                      </div>

                      {dept.emergencyAvailable && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px] shrink-0 font-medium">
                          24/7 On-Call
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {dept.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4 p-5 pt-0">
                    {/* COMPACT PROCEDURES LIST */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Featured Procedures
                      </div>
                      <div className="space-y-1.5">
                        {dept.procedures.map((proc, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-lg bg-muted/20 border border-border/40 flex items-center justify-between text-xs gap-2"
                          >
                            <span className="font-medium text-foreground truncate">
                              {proc.name}
                            </span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-0.5">
                                <ClockIcon className="size-2.5" />
                                {proc.duration}
                              </span>
                              <span className="text-xs font-mono font-bold text-primary">
                                {proc.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PREP NOTE */}
                    <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/10 text-[11px] text-muted-foreground flex items-start gap-1.5">
                      <CheckCircle2Icon className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-tight">{dept.prepTip}</span>
                    </div>

                    {/* ACTION BUTTON */}
                    <Link href="/appointments" className="block pt-1">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-xs h-8 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        Book {dept.shortName}
                        <ArrowRightIcon className="size-3.5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-12 bg-card border rounded-2xl space-y-3">
              <StethoscopeIcon className="size-8 text-muted-foreground mx-auto" />
              <h3 className="text-sm font-semibold">No specialized procedures found</h3>
              <p className="text-xs text-muted-foreground">
                Try searching for "extraction", "root canal", or "implants".
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDeptId("all");
                }}
                className="text-xs h-8"
              >
                Clear Search
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
