"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileTextIcon,
  PrinterIcon,
  AlertTriangleIcon,
  HeartPulseIcon,
  PillIcon,
  PlusIcon,
  UserCheckIcon,
  PhoneCallIcon,
  ClockIcon,
  QrCodeIcon,
  XIcon,
  CalendarIcon,
  ActivityIcon,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useUserAppointments } from "@/hooks/use-appointment";
import { format } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  doctor: string;
  daysRemaining: number;
  purpose: string;
}

const DEFAULT_MEDICATIONS: Medication[] = [
  {
    id: "med-1",
    name: "Amoxicillin (Oral Capsule)",
    dosage: "500 mg",
    frequency: "Every 8 hours (Three times daily after meals)",
    doctor: "Dr. Marcus Vance (Oral Surgery)",
    daysRemaining: 4,
    purpose: "Prophylactic post-surgical antibacterial coverage",
  },
  {
    id: "med-2",
    name: "Ibuprofen (Anti-inflammatory)",
    dosage: "600 mg",
    frequency: "Every 6 hours as needed for discomfort",
    doctor: "Dr. Alexander Thorne (Endodontics)",
    daysRemaining: 2,
    purpose: "Periapical pain and swelling management",
  },
  {
    id: "med-3",
    name: "Chlorhexidine Gluconate 0.12%",
    dosage: "15 ml oral rinse",
    frequency: "Twice daily after tooth brushing (Do not swallow)",
    doctor: "Dr. Rachel Kim (Periodontics)",
    daysRemaining: 10,
    purpose: "Antiseptic plaque inhibition and gingival healing",
  },
];

export default function RecordsPage() {
  const { user, isLoaded } = useUser();
  const { data: appointments = [], isLoading: appointmentsLoading } =
    useUserAppointments();

  const printAreaRef = useRef<HTMLDivElement>(null);

  // Patient profile states
  const [bloodType, setBloodType] = useState("O+ Positive");
  const [emergencyContact, setEmergencyContact] = useState({
    name: "Eleanor Vance",
    relationship: "Spouse",
    phone: "+1 (555) 321-7890",
  });

  const [allergies, setAllergies] = useState<string[]>([
    "Penicillin (Mild Rash)",
    "Latex (Skin Irritation)",
    "Epinephrine (Tachycardia sensitivity)",
  ]);
  const [newAllergy, setNewAllergy] = useState("");

  const [conditions, setConditions] = useState<string[]>([
    "Mild Hypertension (Controlled)",
    "Seasonal Rhinitis",
  ]);
  const [newCondition, setNewCondition] = useState("");

  const [medications, setMedications] =
    useState<Medication[]>(DEFAULT_MEDICATIONS);
  const [selectedAppointmentForPass, setSelectedAppointmentForPass] =
    useState<any>(null);

  // Load saved health card data from local storage if available
  useEffect(() => {
    try {
      const savedAllergies = localStorage.getItem("dentaiva_allergies");
      if (savedAllergies) setAllergies(JSON.parse(savedAllergies));

      const savedConditions = localStorage.getItem("dentaiva_conditions");
      if (savedConditions) setConditions(JSON.parse(savedConditions));

      const savedBlood = localStorage.getItem("dentaiva_blood_type");
      if (savedBlood) setBloodType(savedBlood);
    } catch (e) {
      console.error("Local storage load error", e);
    }
  }, []);

  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    const updated = [...allergies, newAllergy.trim()];
    setAllergies(updated);
    localStorage.setItem("dentaiva_allergies", JSON.stringify(updated));
    setNewAllergy("");
    toast.success("Medical allergy added to health record");
  };

  const removeAllergy = (index: number) => {
    const updated = allergies.filter((_, i) => i !== index);
    setAllergies(updated);
    localStorage.setItem("dentaiva_allergies", JSON.stringify(updated));
    toast.info("Allergy removed");
  };

  const addCondition = () => {
    if (!newCondition.trim()) return;
    const updated = [...conditions, newCondition.trim()];
    setConditions(updated);
    localStorage.setItem("dentaiva_conditions", JSON.stringify(updated));
    setNewCondition("");
    toast.success("Clinical medical condition recorded");
  };

  const removeCondition = (index: number) => {
    const updated = conditions.filter((_, i) => i !== index);
    setConditions(updated);
    localStorage.setItem("dentaiva_conditions", JSON.stringify(updated));
    toast.info("Condition removed");
  };

  const handlePrint = (appointment?: any) => {
    if (appointment) {
      setSelectedAppointmentForPass(appointment);
    } else if (appointments.length > 0) {
      setSelectedAppointmentForPass(appointments[0]);
    }
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const patientName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Patient"
    : "Patient";

  const patientId = user ? `PID-${user.id.slice(-6).toUpperCase()}` : "PID-DEN9021";

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
                  <FileTextIcon className="size-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    Hospital Electronic Health Records (EHR)
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Patient Health Vault & Dental Records
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Confidential electronic dental health profile detailing verified procedure logs, active prescriptions, drug allergies, emergency contacts, and digital clinical visit passes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  onClick={() => handlePrint()}
                  className="bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm h-11 px-5 rounded-xl shadow-md"
                >
                  <PrinterIcon className="size-4 mr-2" />
                  Print Official Clinic Pass
                </Button>
              </div>
            </div>
          </div>

          {/* PATIENT VITAL CARD GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DIGITAL PATIENT CARD */}
            <Card className="border border-border/80 bg-gradient-to-br from-card to-card/90 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <UserCheckIcon className="size-4 text-primary" />
                    Digital Patient ID Card
                  </CardTitle>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    VERIFIED
                  </span>
                </div>
                <CardDescription className="text-xs">
                  DentAIva Clinical Network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0 text-xs">
                <div className="flex items-center gap-3 py-2 border-b border-border/50">
                  <div className="size-12 rounded-full overflow-hidden bg-primary/10 relative shrink-0">
                    {user?.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        alt={patientName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-primary">
                        {patientName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">
                      {patientName}
                    </div>
                    <div className="text-muted-foreground text-[11px] font-mono">
                      {user?.emailAddresses?.[0]?.emailAddress}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">PATIENT ID</span>
                    <span className="font-bold text-foreground">{patientId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">BLOOD GROUP</span>
                    <span className="font-bold text-red-400">{bloodType}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/50 text-[11px]">
                  <span className="text-muted-foreground block text-[10px]">EMERGENCY CONTACT</span>
                  <div className="font-medium text-foreground">
                    {emergencyContact.name} ({emergencyContact.relationship})
                  </div>
                  <div className="text-muted-foreground font-mono">
                    {emergencyContact.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ALLERGIES & CLINICAL ALERTS */}
            <Card className="border border-red-500/30 bg-card/90 shadow-sm md:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-red-400">
                    <AlertTriangleIcon className="size-4 text-red-500" />
                    Medical Alerts & Drug Allergies
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px] text-red-400 border-red-500/30">
                    High Clinical Priority
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Alerts attending dentists before prescribing antibiotics or administering local anesthetics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0 text-xs">
                {/* ALLERGIES LIST */}
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    Known Allergies ({allergies.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {allergies.map((allergy, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30"
                      >
                        {allergy}
                        <button
                          type="button"
                          onClick={() => removeAllergy(idx)}
                          className="hover:text-white"
                          title="Remove allergy"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Input
                      placeholder="Add allergy (e.g. Sulfa, NSAIDs, Codeine)..."
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                      className="h-8 text-xs bg-muted/30 max-w-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addAllergy}
                      className="h-8 px-2 text-xs"
                    >
                      <PlusIcon className="size-3.5 mr-1" />
                      Add Alert
                    </Button>
                  </div>
                </div>

                {/* SYSTEMIC CONDITIONS */}
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    Systemic Medical Conditions:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {conditions.map((cond, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      >
                        {cond}
                        <button
                          type="button"
                          onClick={() => removeCondition(idx)}
                          className="hover:text-white"
                          title="Remove condition"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Input
                      placeholder="Add condition (e.g. Diabetes, Heart Valve, Bleeding Disorder)..."
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCondition()}
                      className="h-8 text-xs bg-muted/30 max-w-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addCondition}
                      className="h-8 px-2 text-xs"
                    >
                      <PlusIcon className="size-3.5 mr-1" />
                      Add Condition
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ACTIVE PRESCRIPTIONS & MEDICATIONS */}
          <Card className="border border-border/80 bg-card/90 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <PillIcon className="size-5 text-primary" />
                    Active Dental Prescriptions & Medication Schedule
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Current antibiotic, antiseptic, and analgesic regimens prescribed by attending dental surgeons
                  </CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                  {medications.length} Active Regimens
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className="p-4 rounded-2xl bg-muted/20 border border-border/70 space-y-3 relative flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-sm text-foreground">
                          {med.name}
                        </span>
                        <Badge variant="outline" className="text-[10px] shrink-0 font-mono">
                          {med.dosage}
                        </Badge>
                      </div>
                      <p className="text-xs text-primary font-medium">
                        {med.frequency}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Purpose: {med.purpose}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{med.doctor}</span>
                      <span className="font-mono text-xs text-amber-400 font-semibold">
                        {med.daysRemaining} days left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* VERIFIED CLINICAL TREATMENT & APPOINTMENT HISTORY */}
          <Card className="border border-border/80 bg-card/90 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <ActivityIcon className="size-5 text-primary" />
                    Verified Clinical Treatment History
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Complete chronology of dental visits, attending specialists, and procedure outcomes
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  {appointments.length} Total Records
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {appointmentsLoading ? (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  Loading verified clinic records...
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-12 bg-muted/10 rounded-2xl border space-y-3">
                  <CalendarIcon className="size-10 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    No clinical appointments recorded yet.
                  </p>
                  <a href="/appointments">
                    <Button size="sm" className="bg-primary text-white text-xs">
                      Schedule First Hospital Consultation
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-2xl bg-card border border-border/70 hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-11 rounded-full overflow-hidden bg-primary/10 relative shrink-0">
                          {appointment.doctorImageUrl ? (
                            <img
                              src={appointment.doctorImageUrl}
                              alt={appointment.doctorName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center font-bold text-primary">
                              DR
                            </div>
                          )}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-foreground">
                              {appointment.doctorName}
                            </span>
                            <Badge
                              className={
                                appointment.status === "COMPLETED"
                                  ? "bg-green-500/10 text-green-400 border-green-500/30 text-[10px]"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/30 text-[10px]"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="text-muted-foreground">
                            Procedure / Reason:{" "}
                            <span className="text-foreground font-medium">
                              {appointment.reason || "General Consultation"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <div className="text-left md:text-right font-mono">
                          <div className="font-semibold text-foreground">
                            {format(new Date(appointment.date), "EEEE, MMM d, yyyy")}
                          </div>
                          <div className="text-muted-foreground text-[11px] flex items-center md:justify-end gap-1">
                            <ClockIcon className="size-3" />
                            {appointment.time} (Local Clinic Time)
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrint(appointment)}
                          className="text-xs h-8 px-3 border-primary/30 hover:bg-primary/10"
                        >
                          <PrinterIcon className="size-3.5 mr-1" />
                          Print Pass
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* PRINTABLE HOSPITAL CLINIC PASS (HIDDEN ON SCREEN, VISIBLE ON PRINT) */}
        <div className="hidden print:block print:p-8 print:bg-white print:text-black">
          <div className="border-4 border-black p-8 rounded-2xl max-w-2xl mx-auto space-y-6">
            {/* HOSPITAL HEADER */}
            <div className="flex items-center justify-between border-b-2 border-black pb-4">
              <div>
                <h1 className="text-2xl font-black tracking-wider uppercase">
                  DentAIva Dental Hospital
                </h1>
                <p className="text-xs text-gray-600">
                  Department of Oral Surgery & Clinical Dental Practice
                </p>
                <p className="text-[10px] text-gray-500">
                  Licence # DENT-TX-90210 • Emergency Desk: +1 (800) 433-6824
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold px-2 py-1 border border-black rounded">
                  OFFICIAL CLINIC PASS
                </span>
                <div className="text-[10px] text-gray-500 mt-1">
                  Issued: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* PATIENT & APPOINTMENT DETAILS */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-gray-500 text-[10px] block">PATIENT NAME</span>
                <strong className="text-sm block">{patientName}</strong>
                <span className="text-gray-600 font-mono text-[11px]">
                  ID: {patientId} | Blood: {bloodType}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-500 text-[10px] block">ATTENDING DENTIST</span>
                <strong className="text-sm block">
                  {selectedAppointmentForPass?.doctorName || "Dr. Marcus Vance, DDS"}
                </strong>
                <span className="text-gray-600 text-[11px]">
                  Board Certified Specialist
                </span>
              </div>
            </div>

            <div className="p-3 bg-gray-100 rounded-lg border border-gray-300 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-gray-500 text-[10px] block">SCHEDULED DATE</span>
                <strong>
                  {selectedAppointmentForPass
                    ? format(new Date(selectedAppointmentForPass.date), "EEEE, MMMM d, yyyy")
                    : new Date().toLocaleDateString()}
                </strong>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] block">SCHEDULED TIME</span>
                <strong>
                  {selectedAppointmentForPass?.time || "10:00 AM"}
                </strong>
              </div>
            </div>

            {/* CLINICAL ALLERGIES WARNING */}
            <div className="p-3 border-2 border-dashed border-red-500 rounded-lg text-xs space-y-1">
              <span className="font-bold text-red-600 block uppercase">
                ⚠️ Medical Alerts / Drug Allergies
              </span>
              <p className="text-gray-700">
                {allergies.join(", ") || "No known drug allergies reported."}
              </p>
            </div>

            {/* PRE-VISIT INSTRUCTIONS */}
            <div className="space-y-1 text-xs">
              <span className="font-bold block uppercase tracking-wide">
                Patient Pre-Visit Instructions:
              </span>
              <ul className="list-disc pl-5 space-y-0.5 text-gray-700 text-[11px]">
                <li>Please arrive 15 minutes before your scheduled appointment time.</li>
                <li>Bring a valid photo government ID and your insurance card if applicable.</li>
                <li>Present this pass at the ground floor check-in reception desk.</li>
              </ul>
            </div>

            {/* SIGNATURE & BARCODE */}
            <div className="pt-6 border-t-2 border-black flex items-center justify-between text-xs">
              <div>
                <div className="w-48 border-b border-black mb-1"></div>
                <span className="text-[10px] text-gray-600">Attending Dental Surgeon Signature</span>
              </div>
              <div className="text-right font-mono text-[10px] text-gray-500">
                <div>BARCODE: *DEN-{patientId.replace(/[^0-9]/g, "")}*</div>
                <div>SECURE VERIFICATION TOKEN: OK</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
