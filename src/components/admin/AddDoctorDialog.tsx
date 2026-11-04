import { useCreateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  formatPhoneNumber,
  MALE_DOCTOR_AVATARS,
  FEMALE_DOCTOR_AVATARS,
} from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    imageUrl: MALE_DOCTOR_AVATARS[0],
    isActive: true,
  });

  const createDoctorMutation = useCreateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleGenderChange = (value: Gender) => {
    const defaultAvatar =
      value === "FEMALE" ? FEMALE_DOCTOR_AVATARS[0] : MALE_DOCTOR_AVATARS[0];
    setNewDoctor({
      ...newDoctor,
      gender: value,
      imageUrl: defaultAvatar,
    });
  };

  const handleSave = () => {
    createDoctorMutation.mutate({ ...newDoctor }, { onSuccess: handleClose });
  };

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      imageUrl: MALE_DOCTOR_AVATARS[0],
      isActive: true,
    });
  };

  const currentAvatars =
    newDoctor.gender === "FEMALE"
      ? FEMALE_DOCTOR_AVATARS
      : MALE_DOCTOR_AVATARS;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>
            Add a new specialist to the clinical roster with a unique avatar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-name">Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                placeholder="Dr. John Smith"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-speciality">Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor.speciality}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, speciality: e.target.value })
                }
                placeholder="General Dentistry"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-email">Email *</Label>
              <Input
                id="new-email"
                type="email"
                value={newDoctor.email}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
                placeholder="doctor@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-phone">Phone</Label>
              <Input
                id="new-phone"
                value={newDoctor.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-gender">Gender</Label>
              <Select
                value={newDoctor.gender}
                onValueChange={(val) => handleGenderChange(val as Gender)}
              >
                <SelectTrigger id="new-gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-status">Status</Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger id="new-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Unique Avatar Selection */}
          <div className="space-y-2 pt-1">
            <Label>Select Unique Avatar Photo</Label>
            <div className="grid grid-cols-4 gap-2.5">
              {currentAvatars.map((url, idx) => {
                const isSelected = newDoctor.imageUrl === url;
                return (
                  <button
                    key={url}
                    type="button"
                    onClick={() =>
                      setNewDoctor({ ...newDoctor, imageUrl: url })
                    }
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/30 scale-102 shadow-xs"
                        : "border-border/60 hover:border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`Avatar option ${idx + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 size-4 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                        <CheckIcon className="size-2.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={
              !newDoctor.name ||
              !newDoctor.email ||
              !newDoctor.speciality ||
              createDoctorMutation.isPending
            }
          >
            {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddDoctorDialog;
