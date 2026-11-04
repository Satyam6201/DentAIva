"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  StethoscopeIcon,
  SearchIcon,
  ArrowRightIcon,
  SmileIcon,
  MicroscopeIcon,
  ShieldCheckIcon,
  ActivityIcon,
  HeartPulseIcon,
  SparklesIcon,
  AlertTriangleIcon,
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
    price: string;
  }[];
  emergencyAvailable?: boolean;
}

const DEPARTMENTS: Department[] = [
  {
    id: "oral-surgery",
    name: "Oral & Maxillofacial Surgery",
    shortName: "Oral Surgery",
    icon: StethoscopeIcon,
    leadSpecialist: "Dr. Marcus Vance, DDS",
    description: "Wisdom teeth removal, complex extractions, jaw realignment, and surgical bone grafting.",
    procedures: [
      { name: "Surgical Wisdom Tooth Removal", price: "$250–$400" },
      { name: "Alveolar Bone Grafting", price: "$450–$800" },
      { name: "Biopsy & Soft Tissue Lesion Care", price: "$300–$600" },
    ],
    emergencyAvailable: true,
  },
  {
    id: "orthodontics",
    name: "Orthodontics & Clear Aligners",
    shortName: "Orthodontics",
    icon: SmileIcon,
    leadSpecialist: "Dr. Elena Rostova, DMD",
    description: "Invisalign® clear aligners, ceramic braces, and interceptive pediatric smile alignment.",
    procedures: [
      { name: "Invisalign® 3D Scan & Consultation", price: "$100" },
      { name: "Ceramic / Metal Bracket Placement", price: "$2,800–$4,500" },
      { name: "Palatal Expander & Early Guidance", price: "$950–$1,600" },
    ],
  },
  {
    id: "endodontics",
    name: "Endodontics & Root Canal Care",
    shortName: "Endodontics",
    icon: MicroscopeIcon,
    leadSpecialist: "Dr. Alexander Thorne, DDS",
    description: "Painless microscopic root canal treatments, apicoectomy, and restorative tooth preservation.",
    procedures: [
      { name: "Molar Microscopic Root Canal", price: "$650–$950" },
      { name: "Anterior Tooth Root Canal", price: "$450–$700" },
      { name: "Endodontic Retreatment", price: "$800–$1,200" },
    ],
    emergencyAvailable: true,
  },
  {
    id: "implantology",
    name: "Dental Implants & Prosthodontics",
    shortName: "Implants",
    icon: ShieldCheckIcon,
    leadSpecialist: "Dr. Jonathan Hayes, FACP",
    description: "Medical-grade titanium implants, All-on-4 full restorations, and same-day porcelain crowns.",
    procedures: [
      { name: "Single Titanium Implant Placement", price: "$1,200–$1,800" },
      { name: "CEREC Same-Day Zirconia Crown", price: "$750–$1,100" },
      { name: "All-on-4 Full Arch Consultation", price: "$150" },
    ],
  },
  {
    id: "periodontics",
    name: "Periodontics & Gum Therapy",
    shortName: "Periodontics",
    icon: ActivityIcon,
    leadSpecialist: "Dr. Rachel Kim, DDS",
    description: "Advanced gum disease treatment, ultrasonic deep scaling, and soft tissue regeneration.",
    procedures: [
      { name: "Deep Ultrasonic Scaling & Root Planing", price: "$280–$450" },
      { name: "Laser Periodontal Pocket Therapy", price: "$350–$600" },
      { name: "Connective Tissue Gum Grafting", price: "$600–$1,100" },
    ],
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry (Kids)",
    shortName: "Pediatric",
    icon: HeartPulseIcon,
    leadSpecialist: "Dr. Maya Patel, BDS",
    description: "Compassionate, gentle visits for children, preventive sealants, and nitrous oxide sedation.",
    procedures: [
      { name: "Gentle Child Exam & Fluoride", price: "$95–$140" },
      { name: "Protective Molar Sealants", price: "$45–$70" },
      { name: "Pediatric Sedation Restoration", price: "$180–$350" },
    ],
    emergencyAvailable: true,
  },
  {
    id: "cosmetic",
    name: "Cosmetic & Aesthetic Dentistry",
    shortName: "Cosmetic",
    icon: SparklesIcon,
    leadSpecialist: "Dr. Julian Sterling, DDS",
    description: "Philips Zoom! in-office laser whitening, handcrafted porcelain veneers, and composite bonding.",
    procedures: [
      { name: "Philips Zoom! Laser Teeth Whitening", price: "$350–$500" },
      { name: "Custom Porcelain Veneer", price: "$900–$1,500" },
      { name: "Composite Aesthetic Edge Bonding", price: "$180–$320" },
    ],
  },
  {
    id: "emergency-dept",
    name: "Dental Trauma & 24/7 Urgent Care",
    shortName: "Emergency",
    icon: AlertTriangleIcon,
    leadSpecialist: "Dr. Liam O'Connor, DDS",
    description: "Immediate triage and surgical care for knocked-out teeth, acute abscesses, and trauma.",
    procedures: [
      { name: "Tooth Re-Implantation & Splinting", price: "$300–$550" },
      { name: "Emergency Pulp Pain Relief", price: "$200–$350" },
      { name: "Acute Abscess Incision & Drainage", price: "$250–$400" },
    ],
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
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Clinical Departments & Specialties
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore our 8 specialized dental divisions, standard procedure fees, and schedule an appointment with a board-certified practitioner.
            </p>
          </div>


          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Search procedures or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 bg-card border-border/70 rounded-lg text-xs"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedDeptId("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedDeptId === "all"
                    ? "bg-primary text-white font-semibold"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All ({DEPARTMENTS.length})
              </button>
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedDeptId === dept.id
                      ? "bg-primary text-white font-semibold"
                      : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {dept.shortName}
                </button>
              ))}
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDepartments.map((dept) => {
              const DeptIcon = dept.icon;
              return (
                <Card
                  key={dept.id}
                  className="border border-border/80 bg-card rounded-xl hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between"
                >
                  <CardContent className="p-5 space-y-4">

                    <div className="flex items-start justify-between gap-3">
                      <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                        <DeptIcon className="size-5" />
                      </div>
                      {dept.emergencyAvailable && (
                        <span className="text-[10px] font-semibold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                          24/7 On-Call
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-foreground leading-tight">
                        {dept.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {dept.leadSpecialist}
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {dept.description}
                    </p>


                    <div className="pt-2 border-t border-border/50 space-y-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                        Common Procedures
                      </span>
                      <div className="space-y-1 text-xs">
                        {dept.procedures.map((proc, i) => (
                          <div key={i} className="flex items-center justify-between py-0.5">
                            <span className="text-foreground truncate max-w-[190px]">
                              {proc.name}
                            </span>
                            <span className="font-mono text-muted-foreground text-[11px] shrink-0 font-medium">
                              {proc.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>


                    <Link href="/appointments" className="block pt-2">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-medium text-xs h-8 rounded-lg flex items-center justify-center gap-1.5"
                      >
                        Book Consultation
                        <ArrowRightIcon className="size-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-12 bg-card border border-border/80 rounded-xl space-y-3">
              <StethoscopeIcon className="size-8 text-muted-foreground mx-auto" />
              <h3 className="text-sm font-semibold text-foreground">No departments match your search</h3>
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
                Reset Filters
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
