"use client";

import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EditIcon, MailIcon, PhoneIcon, PlusIcon, StethoscopeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import { Doctor } from "@prisma/client";
import EditDoctorDialog from "./EditDoctorDialog";
import { getSafeAvatarUrl } from "@/lib/utils";

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Card className="mb-12 border border-border/80 bg-card/90 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <StethoscopeIcon className="size-5 text-primary" />
              Doctors & Specialists Roster
            </CardTitle>
            <CardDescription className="text-xs">
              Manage doctor credentials, clinical availability, and view appointment load
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white font-medium text-xs rounded-xl shadow-md h-9"
          >
            <PlusIcon className="mr-1.5 size-4" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {doctors.map((doctor) => {
              const safeAvatar = getSafeAvatarUrl(
                doctor.imageUrl,
                doctor.name,
                doctor.gender
              );

              return (
                <div
                  key={doctor.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/20 hover:bg-muted/30 rounded-2xl border border-border/60 gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl overflow-hidden bg-primary/10 relative shrink-0 ring-2 ring-background border border-primary/20">
                      <Image
                        src={safeAvatar}
                        alt={doctor.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="font-bold text-sm text-foreground">
                        {doctor.name}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span className="text-primary font-medium">
                          {doctor.speciality}
                        </span>
                        <span className="px-2 py-0.5 bg-muted rounded text-[10px] font-mono">
                          {doctor.gender === "MALE" ? "Male" : "Female"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1 font-mono">
                          <MailIcon className="size-3 text-primary" />
                          {doctor.email}
                        </div>
                        <div className="flex items-center gap-1 font-mono">
                          <PhoneIcon className="size-3 text-primary" />
                          {doctor.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <div className="font-mono font-bold text-primary text-sm">
                        {doctor.appointmentCount}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Booked Visits
                      </div>
                    </div>

                    {doctor.isActive ? (
                      <Badge className="bg-green-500/10 text-green-400 border border-green-500/30 text-xs">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Inactive
                      </Badge>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 px-3 text-xs border-primary/30 hover:bg-primary/10"
                      onClick={() => handleEditDoctor(doctor)}
                    >
                      <EditIcon className="size-3.5 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}

export default DoctorsManagement;