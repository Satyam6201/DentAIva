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
  PillIcon,
  PlusIcon,
  UserCheckIcon,
  ClockIcon,
  XIcon,
  CalendarIcon,
  ActivityIcon,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useUserAppointments } from "@/hooks/use-appointment";
import { format } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

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
    name: "Amoxicillin",
    dosage: "500 mg",
    frequency: "Every 8 hours with meals",
    doctor: "Dr. Marcus Vance",
    daysRemaining: 4,
    purpose: "Prophylactic post-surgical antibacterial coverage",
  },
  {
    id: "med-2",
    name: "Ibuprofen",
    dosage: "600 mg",
    frequency: "Every 6 hours as needed",
    doctor: "Dr. Alexander Thorne",
    daysRemaining: 2,
    purpose: "Pain and inflammation relief",
  },
  {
    id: "med-3",
    name: "Chlorhexidine 0.12%",
    dosage: "15 ml oral rinse",
    frequency: "Twice daily after brushing",
    doctor: "Dr. Rachel Kim",
    daysRemaining: 10,
    purpose: "Antiseptic plaque control and gum healing",
  },
];

export default function RecordsPage() {
  const { user } = useUser();
  const { data: appointments = [], isLoading: appointmentsLoading } =
    useUserAppointments();

  const [bloodType] = useState("O+ Positive");
  const [emergencyContact] = useState({
    name: "Eleanor Vance",
    relationship: "Spouse",
    phone: "+1 (555) 321-7890",
  });

  const [allergies, setAllergies] = useState<string[]>([
    "Penicillin (Mild Rash)",
    "Latex (Skin Sensitivity)",
    "Epinephrine (Tachycardia)",
  ]);
  const [newAllergy, setNewAllergy] = useState("");

  const [conditions, setConditions] = useState<string[]>([
    "Mild Hypertension (Controlled)",
    "Seasonal Rhinitis",
  ]);
  const [newCondition, setNewCondition] = useState("");

  const [medications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
  const [selectedAppointmentForPass, setSelectedAppointmentForPass] =
    useState<any>(null);

  useEffect(() => {
    try {
      const savedAllergies = localStorage.getItem("dentaiva_allergies");
      if (savedAllergies) setAllergies(JSON.parse(savedAllergies));

      const savedConditions = localStorage.getItem("dentaiva_conditions");
      if (savedConditions) setConditions(JSON.parse(savedConditions));
    } catch (e) {
      console.error("Local storage error", e);
    }
  }, []);

  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    const updated = [...allergies, newAllergy.trim()];
    setAllergies(updated);
    localStorage.setItem("dentaiva_allergies", JSON.stringify(updated));
    setNewAllergy("");
    toast.success("Medical allergy recorded");
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
    toast.success("Condition recorded");
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

      <main className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* HEADER STRIP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide uppercase mb-2">
                <FileTextIcon className="size-3.5" />
                Electronic Health Records
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Patient Health Vault & Records
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Verified clinical history, active prescriptions, allergies, and printable hospital visit pass.
              </p>
            </div>

            <Button
              onClick={() => handlePrint()}
              className="bg-primary hover:bg-primary/90 text-white font-medium text-xs h-9 px-4 rounded-xl shadow-xs shrink-0 self-start sm:self-auto"
            >
              <PrinterIcon className="size-3.5 mr-1.5" />
              Print Clinic Pass
            </Button>
          </div>

          {/* TOP 2-CARD GRID: PROFILE & MEDICAL ALERTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* DIGITAL PATIENT CARD */}
            <Card className="border border-border/80 bg-card/90 rounded-2xl shadow-xs">
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <UserCheckIcon className="size-4 text-primary" />
                    Patient ID Card
                  </CardTitle>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    VERIFIED
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs">
                <div className="flex items-center gap-3 py-1 border-b border-border/40">
                  <div className="size-11 rounded-full overflow-hidden bg-primary/10 relative shrink-0">
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
                  <div className="overflow-hidden">
                    <div className="font-bold text-sm text-foreground truncate">
                      {patientName}
                    </div>
                    <div className="text-muted-foreground text-[11px] font-mono truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px]">PATIENT ID</span>
                    <span className="font-bold text-foreground">{patientId}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px]">BLOOD TYPE</span>
                    <span className="font-bold text-red-500">{bloodType}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/40 text-[11px]">
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

            {/* MEDICAL ALERTS & CONDITIONS */}
            <Card className="border border-red-500/30 bg-card/90 rounded-2xl shadow-xs md:col-span-2">
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-500">
                    <AlertTriangleIcon className="size-4" />
                    Medical Alerts & Drug Allergies
                  </CardTitle>
                  <Badge variant="outline" className="text-[10px] text-red-500 border-red-500/30">
                    Clinical Priority
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Recorded sensitivities checked before prescribing medications or administering local anesthesia
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3.5 text-xs">
                {/* ALLERGIES */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Known Allergies ({allergies.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {allergies.map((allergy, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"
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

                  <div className="flex gap-2 pt-1 max-w-md">
                    <Input
                      placeholder="Add allergy (e.g. Sulfa, NSAIDs)..."
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addAllergy()}
                      className="h-8 text-xs bg-muted/20"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addAllergy}
                      className="h-8 px-2.5 text-xs shrink-0"
                    >
                      <PlusIcon className="size-3.5 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* SYSTEMIC CONDITIONS */}
                <div className="space-y-1.5 pt-2 border-t border-border/40">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Medical Conditions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {conditions.map((cond, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      >
                        {cond}
                        <button
                          type="button"
                          onClick={() => removeCondition(idx)}
                          className="hover:text-foreground"
                          title="Remove condition"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-1 max-w-md">
                    <Input
                      placeholder="Add condition (e.g. Hypertension)..."
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addCondition()}
                      className="h-8 text-xs bg-muted/20"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addCondition}
                      className="h-8 px-2.5 text-xs shrink-0"
                    >
                      <PlusIcon className="size-3.5 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ACTIVE PRESCRIPTIONS */}
          <Card className="border border-border/80 bg-card/90 rounded-2xl shadow-xs">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <PillIcon className="size-4 text-primary" />
                    Active Dental Prescriptions
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Current medications prescribed by attending dental surgeons
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  {medications.length} Regimens
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className="p-3.5 rounded-xl bg-muted/20 border border-border/50 space-y-2 text-xs flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-foreground text-sm">
                          {med.name}
                        </span>
                        <Badge variant="outline" className="text-[10px] font-mono shrink-0">
                          {med.dosage}
                        </Badge>
                      </div>
                      <p className="text-xs text-primary font-medium">
                        {med.frequency}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-tight">
                        {med.purpose}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">{med.doctor}</span>
                      <span className="font-mono text-xs text-amber-500 font-semibold">
                        {med.daysRemaining}d left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CLINICAL TREATMENT HISTORY */}
          <Card className="border border-border/80 bg-card/90 rounded-2xl shadow-xs">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <ActivityIcon className="size-4 text-primary" />
                    Verified Treatment History
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Completed and scheduled clinical hospital appointments
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  {appointments.length} Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              {appointmentsLoading ? (
                <div className="text-center py-8 text-muted-foreground text-xs">
                  Loading verified clinic records...
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8 bg-muted/10 rounded-xl border space-y-2">
                  <CalendarIcon className="size-8 text-muted-foreground mx-auto" />
                  <p className="text-xs text-muted-foreground">
                    No clinical appointments recorded yet.
                  </p>
                  <Link href="/appointments">
                    <Button size="sm" className="bg-primary text-white text-xs h-8">
                      Schedule Consultation
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 rounded-xl bg-card border border-border/70 hover:border-primary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-full overflow-hidden bg-primary/10 relative shrink-0">
                          {appointment.doctorImageUrl ? (
                            <img
                              src={appointment.doctorImageUrl}
                              alt={appointment.doctorName}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="size-full flex items-center justify-center font-bold text-primary text-xs">
                              DR
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">
                              {appointment.doctorName}
                            </span>
                            <Badge
                              className={
                                appointment.status === "COMPLETED"
                                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] py-0"
                                  : "bg-blue-500/10 text-blue-500 border-blue-500/20 text-[10px] py-0"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {appointment.reason || "General Consultation"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-4">
                        <div className="text-left md:text-right font-mono text-[11px]">
                          <div className="font-semibold text-foreground">
                            {format(new Date(appointment.date), "EEE, MMM d, yyyy")}
                          </div>
                          <div className="text-muted-foreground flex items-center md:justify-end gap-1">
                            <ClockIcon className="size-3" />
                            {appointment.time}
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePrint(appointment)}
                          className="text-xs h-7 px-2.5 border-primary/30"
                        >
                          <PrinterIcon className="size-3 mr-1" />
                          Pass
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* PRINTABLE HOSPITAL CLINIC PASS */}
        <div className="hidden print:block print:p-8 print:bg-white print:text-black">
          <div className="border-2 border-black p-6 rounded-xl max-w-xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div>
                <h1 className="text-xl font-bold tracking-wide uppercase">
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
                <span className="text-xs font-mono font-bold px-2 py-0.5 border border-black rounded">
                  OFFICIAL PASS
                </span>
                <div className="text-[10px] text-gray-500 mt-1">
                  Issued: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-0.5">
                <span className="text-gray-500 text-[10px] block">PATIENT NAME</span>
                <strong className="text-sm block">{patientName}</strong>
                <span className="text-gray-600 font-mono text-[11px]">
                  ID: {patientId} | Blood: {bloodType}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-gray-500 text-[10px] block">ATTENDING DENTIST</span>
                <strong className="text-sm block">
                  {selectedAppointmentForPass?.doctorName || "Dr. Marcus Vance, DDS"}
                </strong>
                <span className="text-gray-600 text-[11px]">
                  Board Certified Specialist
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-gray-100 rounded border border-gray-300 grid grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-gray-500 text-[10px] block">DATE</span>
                <strong>
                  {selectedAppointmentForPass
                    ? format(new Date(selectedAppointmentForPass.date), "EEEE, MMM d, yyyy")
                    : new Date().toLocaleDateString()}
                </strong>
              </div>
              <div>
                <span className="text-gray-500 text-[10px] block">TIME</span>
                <strong>
                  {selectedAppointmentForPass?.time || "10:00 AM"}
                </strong>
              </div>
            </div>

            <div className="p-2.5 border border-red-500 rounded text-xs space-y-0.5">
              <span className="font-bold text-red-600 block uppercase text-[10px]">
                Medical Alerts / Drug Allergies
              </span>
              <p className="text-gray-700">
                {allergies.join(", ") || "No known drug allergies reported."}
              </p>
            </div>

            <div className="pt-4 border-t border-black flex items-center justify-between text-xs">
              <div>
                <div className="w-40 border-b border-black mb-1"></div>
                <span className="text-[10px] text-gray-600">Surgeon Signature</span>
              </div>
              <div className="text-right font-mono text-[10px] text-gray-500">
                <div>BARCODE: *DEN-{patientId.replace(/[^0-9]/g, "")}*</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
