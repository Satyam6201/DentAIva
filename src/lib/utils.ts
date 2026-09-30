import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MALE_DOCTOR_AVATARS = [
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=256&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=256&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=256&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=256&auto=format&fit=crop&q=80",
];

export const FEMALE_DOCTOR_AVATARS = [
  "https://images.unsplash.com/photo-1594824813596-f94e24eb2913?w=256&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=256&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=256&auto=format&fit=crop&q=80",
];

export function generateAvatar(name: string, gender: "MALE" | "FEMALE" = "MALE") {
  const hash = Math.abs(
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  );
  if (gender === "FEMALE") {
    return FEMALE_DOCTOR_AVATARS[hash % FEMALE_DOCTOR_AVATARS.length];
  }
  return MALE_DOCTOR_AVATARS[hash % MALE_DOCTOR_AVATARS.length];
}

export function getSafeAvatarUrl(
  url?: string | null,
  name: string = "Doctor",
  gender: "MALE" | "FEMALE" = "MALE"
) {
  if (!url || url.includes("iran.liara") || url.includes("avatar.iran")) {
    return generateAvatar(name, gender);
  }
  return url;
}

// phone formatting function for US numbers
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};

export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$90" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$75" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$150" },
];