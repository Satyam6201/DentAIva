import { useUpdateDoctor } from "@/hooks/use-doctors";
import {
  formatPhoneNumber,
  MALE_DOCTOR_AVATARS,
  FEMALE_DOCTOR_AVATARS,
} from "@/lib/utils";
import { Doctor, Gender } from "@prisma/client";
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
import { CheckIcon } from "lucide-react";

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

function EditDoctorDialog({ doctor, isOpen, onClose }: EditDoctorDialogProps) {
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);

  const updateDoctorMutation = useUpdateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    if (editingDoctor) {
      setEditingDoctor({ ...editingDoctor, phone: formattedPhoneNumber });
    }
  };

  const handleGenderChange = (value: Gender) => {
    if (!editingDoctor) return;
    const defaultAvatar =
      value === "FEMALE" ? FEMALE_DOCTOR_AVATARS[0] : MALE_DOCTOR_AVATARS[0];
    setEditingDoctor({
      ...editingDoctor,
      gender: value,
      imageUrl: defaultAvatar,
    });
  };

  const handleSave = () => {
    if (editingDoctor) {
      updateDoctorMutation.mutate(
        { ...editingDoctor },
        { onSuccess: handleClose }
      );
    }
  };

  const handleClose = () => {
    onClose();
    setEditingDoctor(null);
  };

  const currentAvatars =
    editingDoctor?.gender === "FEMALE"
      ? FEMALE_DOCTOR_AVATARS
      : MALE_DOCTOR_AVATARS;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogDescription>
            Update doctor credentials, clinical status, and unique avatar.
          </DialogDescription>
        </DialogHeader>

        {editingDoctor && (
          <div className="grid gap-4 py-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingDoctor.name}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="speciality">Speciality</Label>
                <Input
                  id="speciality"
                  value={editingDoctor.speciality}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      speciality: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingDoctor.email}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editingDoctor.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={editingDoctor.gender || ""}
                  onValueChange={(value) =>
                    handleGenderChange(value as Gender)
                  }
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingDoctor.isActive ? "active" : "inactive"}
                  onValueChange={(value) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      isActive: value === "active",
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Avatar Selector */}
            <div className="space-y-2 pt-1">
              <Label>Doctor Avatar (Select Unique Photo)</Label>
              <div className="grid grid-cols-4 gap-2.5">
                {currentAvatars.map((url, idx) => {
                  const isSelected = editingDoctor.imageUrl === url;
                  return (
                    <button
                      key={url}
                      type="button"
                      onClick={() =>
                        setEditingDoctor({ ...editingDoctor, imageUrl: url })
                      }
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/30 scale-102 shadow-xs"
                          : "border-border/60 hover:border-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={url}
                        alt={`Avatar ${idx + 1}`}
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
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90"
            disabled={updateDoctorMutation.isPending}
          >
            {updateDoctorMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDoctorDialog;
