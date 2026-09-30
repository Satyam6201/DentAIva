"use client";

import { useState } from "react";
import { useAvailableDoctors } from "@/hooks/use-doctors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  SearchIcon,
  ArrowRightIcon,
  StethoscopeIcon,
  CalendarCheckIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DoctorCardsLoading } from "./DoctorCardsLoading";
import { getSafeAvatarUrl } from "@/lib/utils";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  if (isLoading)
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Select Attending Dentist</h2>
          <p className="text-xs text-muted-foreground">
            Loading hospital specialists and real-time schedules...
          </p>
        </div>
        <DoctorCardsLoading />
      </div>
    );

  const specialties = [
    "all",
    ...Array.from(new Set(dentists.map((d) => d.speciality).filter(Boolean))),
  ];

  const filteredDentists = dentists.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.bio && d.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty =
      selectedSpecialty === "all" || d.speciality === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* SECTION HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <StethoscopeIcon className="size-6 text-primary" />
            Select Attending Dentist
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose from {dentists.length} board-certified specialists on duty at DentAIva Dental Hospital
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs bg-card border-border/80 rounded-xl"
          />
        </div>
      </div>

      {/* SPECIALTY FILTER CHIPS */}
      {specialties.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {specialties.map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedSpecialty === spec
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {spec === "all" ? "All Specialties" : spec}
            </button>
          ))}
        </div>
      )}

      {/* DOCTORS GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDentists.map((dentist) => {
          const isSelected = selectedDentistId === dentist.id;
          const safeAvatar = getSafeAvatarUrl(
            dentist.imageUrl,
            dentist.name,
            dentist.gender
          );

          return (
            <Card
              key={dentist.id}
              className={`cursor-pointer transition-all duration-300 relative overflow-hidden bg-card/90 backdrop-blur-sm border-2 ${
                isSelected
                  ? "border-primary shadow-lg ring-2 ring-primary/20 bg-primary/[0.03]"
                  : "border-border/80 hover:border-primary/40 hover:shadow-md"
              }`}
              onClick={() => onSelectDentist(dentist.id)}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 size-6 bg-primary rounded-full flex items-center justify-center text-white shadow-md animate-in zoom-in-50">
                  <CheckCircle2Icon className="size-4" />
                </div>
              )}

              <CardHeader className="pb-3 pt-5">
                <div className="flex items-start gap-4">
                  <div className="size-16 rounded-2xl overflow-hidden bg-primary/10 relative shrink-0 ring-2 ring-background border border-primary/20 shadow-sm">
                    <Image
                      src={safeAvatar}
                      alt={dentist.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 pr-6">
                    <CardTitle className="text-base font-bold text-foreground">
                      {dentist.name}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium text-xs mt-0.5">
                      {dentist.speciality || "General Dentistry"}
                    </CardDescription>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 bg-amber-500/10 px-1.5 py-0.5 rounded text-[11px] font-semibold text-amber-500 border border-amber-500/20">
                        <StarIcon className="size-3 fill-amber-400 text-amber-400" />
                        <span>4.9</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        ({dentist.appointmentCount} consultations)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0 text-xs">
                <p className="text-muted-foreground line-clamp-2 leading-relaxed text-[11px]">
                  {dentist.bio ||
                    "Experienced dental surgeon committed to painless modern dental procedures and oral health excellence."}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-border/50 text-[11px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="size-3.5 text-primary" />
                    <span>DentAIva Hospital • Main Clinic Wing</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PhoneIcon className="size-3.5 text-primary" />
                    <span>{dentist.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="text-[10px] flex items-center gap-1">
                    <ShieldCheckIcon className="size-3 text-primary" />
                    Board Certified
                  </Badge>

                  <span className="text-[11px] font-medium text-primary flex items-center gap-1">
                    <CalendarCheckIcon className="size-3" />
                    Available This Week
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDentists.length === 0 && (
        <div className="text-center py-12 bg-card border rounded-2xl space-y-2">
          <StethoscopeIcon className="size-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-semibold">No dentists found matching "{searchQuery}"</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedSpecialty("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {selectedDentistId && (
        <div className="flex justify-end pt-4">
          <Button
            onClick={onContinue}
            className="bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm px-6 h-11 rounded-xl shadow-md flex items-center gap-2"
          >
            <span>Proceed to Date & Time Slot</span>
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default DoctorSelectionStep;