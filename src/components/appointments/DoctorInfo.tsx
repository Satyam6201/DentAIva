import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";
import { getSafeAvatarUrl } from "@/lib/utils";
import { ShieldCheckIcon } from "lucide-react";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  const safeAvatar = getSafeAvatarUrl(doctor.imageUrl, doctor.name, doctor.gender);

  return (
    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-card border border-border/70 shadow-sm">
      <div className="size-12 rounded-xl overflow-hidden bg-primary/10 relative shrink-0 border border-primary/20">
        <Image
          src={safeAvatar}
          alt={doctor.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-sm text-foreground">{doctor.name}</h3>
          <ShieldCheckIcon className="size-3.5 text-primary" />
        </div>
        <p className="text-xs text-primary font-medium">
          {doctor.speciality || "General Dentistry"}
        </p>
        <p className="text-[10px] text-muted-foreground">
          DentAIva Hospital • Consultation Fee: $75–$150
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;