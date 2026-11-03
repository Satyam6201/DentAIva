import { z } from "zod";

export const BookAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
  date: z
    .string()
    .min(1, "Appointment date is required")
    .regex(/^\d{4}-\d{2}-\d{2}/, "Date must be in YYYY-MM-DD format"),
  time: z
    .string()
    .min(1, "Appointment time is required")
    .regex(/^\d{1,2}:\d{2}$/, "Time must be in HH:mm format"),
  reason: z
    .string()
    .max(500, "Reason cannot exceed 500 characters")
    .optional()
    .transform((val) => val?.trim() || "General consultation"),
});

export const CreateDoctorSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid official email address").max(120),
  phone: z.string().trim().min(5, "Phone number is too short").max(30),
  speciality: z.string().trim().min(2, "Speciality is required").max(100),
  gender: z.enum(["MALE", "FEMALE"]),
  isActive: z.boolean().default(true),
});

export const UpdateDoctorSchema = CreateDoctorSchema.partial().extend({
  id: z.string().min(1, "Doctor ID is required"),
});

export const UpdateAppointmentStatusSchema = z.object({
  id: z.string().min(1, "Appointment ID is required"),
  status: z.enum(["CONFIRMED", "COMPLETED"]),
});

export const SendAppointmentEmailSchema = z.object({
  userEmail: z.string().trim().email("Invalid recipient email"),
  doctorName: z.string().trim().min(1, "Doctor name is required"),
  appointmentDate: z.string().trim().min(1, "Appointment date is required"),
  appointmentTime: z.string().trim().min(1, "Appointment time is required"),
  appointmentType: z.string().trim().optional(),
  duration: z.string().trim().optional(),
  price: z.string().trim().optional(),
});
