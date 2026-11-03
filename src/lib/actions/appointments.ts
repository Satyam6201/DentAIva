"use server";

import { prisma } from "../prisma";
import { AppointmentStatus, Prisma } from "@prisma/client";
import { getSafeAvatarUrl } from "../utils";
import { requireAdmin, requireUser } from "../auth";
import { BookAppointmentSchema, UpdateAppointmentStatusSchema } from "../validations";

interface AppointmentWithRelations {
  id: string;
  date: Date;
  time: string;
  duration: number;
  status: AppointmentStatus;
  notes: string | null;
  reason: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  doctorId: string;
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
  doctor: {
    name: string;
    imageUrl: string;
  };
}

function transformAppointment(appointment: AppointmentWithRelations) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim() || "Anonymous Patient",
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: getSafeAvatarUrl(appointment.doctor.imageUrl, appointment.doctor.name),
    date: appointment.date.toISOString().split("T")[0],
  };
}

/**
 * Normalizes any date string into a consistent UTC midnight timestamp.
 * Prevents timezone mismatches between client, server, and database.
 */
function normalizeDateToUtcMidnight(dateStr: string): Date {
  const cleanDate = dateStr.split("T")[0];
  return new Date(`${cleanDate}T00:00:00.000Z`);
}

/**
 * Fetch hospital appointments for practice administrators.
 * Protected: Requires Administrator privileges.
 * Scalable: Paginated to prevent memory exhaustion with large datasets.
 */
export async function getAppointments(limit: number = 100, offset: number = 0) {
  try {
    await requireAdmin();

    const safeLimit = Math.min(Math.max(1, limit), 200);
    const safeOffset = Math.max(0, offset);

    const appointments = await prisma.appointment.findMany({
      take: safeLimit,
      skip: safeOffset,
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    throw new Error(error.message || "Failed to fetch appointments");
  }
}

/**
 * High-performance aggregate statistics for the administrative dashboard.
 * Executes database-level COUNT queries instead of fetching raw rows into memory.
 */
export async function getAdminDashboardStats() {
  try {
    await requireAdmin();

    const [totalDoctors, activeDoctors, totalAppointments, completedAppointments] = await Promise.all([
      prisma.doctor.count(),
      prisma.doctor.count({ where: { isActive: true } }),
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
    ]);

    return {
      totalDoctors,
      activeDoctors,
      totalAppointments,
      completedAppointments,
    };
  } catch (error: any) {
    console.error("Error fetching admin stats:", error);
    throw new Error(error.message || "Failed to compute practice management statistics");
  }
}

/**
 * Fetch appointments belonging exclusively to the currently authenticated patient.
 */
export async function getUserAppointments() {
  try {
    const { userId } = await requireUser();

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return [];
    }

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error: any) {
    console.error("Error fetching user appointments:", error);
    throw new Error(error.message || "Failed to fetch user appointments");
  }
}

/**
 * Fetch count stats for the authenticated patient.
 */
export async function getUserAppointmentStats() {
  try {
    const { userId } = await requireUser();

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return { totalAppointments: 0, completedAppointments: 0 };

    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error("Error fetching user appointment stats:", error);
    return { totalAppointments: 0, completedAppointments: 0 };
  }
}

/**
 * Fetches already booked time slots for a specific doctor and date.
 * Relies on the @@index([doctorId, date]) index for millisecond performance.
 */
export async function getBookedTimeSlots(doctorId: string, date: string) {
  try {
    if (!doctorId || !date) return [];

    const normalizedDate = normalizeDateToUtcMidnight(date);

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: normalizedDate,
        status: {
          in: ["CONFIRMED", "COMPLETED"],
        },
      },
      select: { time: true },
    });

    return appointments.map((appointment) => appointment.time);
  } catch (error) {
    console.error("Error fetching booked time slots:", error);
    return [];
  }
}

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

/**
 * Books an appointment with double-booking prevention and concurrency safety.
 * Validates inputs, verifies doctor availability, checks existing slots,
 * and handles database unique constraint collisions gracefully.
 */
export async function bookAppointment(input: BookAppointmentInput) {
  try {
    const { userId, user: clerkUser } = await requireUser();

    // Validate inputs
    const validated = BookAppointmentSchema.parse(input);
    const normalizedDate = normalizeDateToUtcMidnight(validated.date);

    // Verify doctor exists and is accepting appointments
    const doctor = await prisma.doctor.findUnique({
      where: { id: validated.doctorId },
      select: { id: true, isActive: true, name: true },
    });

    if (!doctor) {
      throw new Error("The selected doctor could not be found.");
    }

    if (!doctor.isActive) {
      throw new Error("This doctor is currently not accepting new appointments.");
    }

    // Ensure database user record exists
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0]?.emailAddress || "patient@dentaiva.com",
        phone: clerkUser.phoneNumbers[0]?.phoneNumber || null,
      },
      create: {
        clerkId: userId,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0]?.emailAddress || "patient@dentaiva.com",
        phone: clerkUser.phoneNumbers[0]?.phoneNumber || null,
      },
    });

    // Check if slot is already occupied before attempting insert
    const existingSlot = await prisma.appointment.findFirst({
      where: {
        doctorId: validated.doctorId,
        date: normalizedDate,
        time: validated.time,
        status: { in: ["CONFIRMED", "COMPLETED"] },
      },
    });

    if (existingSlot) {
      throw new Error("This time slot has already been booked. Please choose an alternate slot.");
    }

    // Create appointment (Database composite unique constraint protects against concurrent race conditions)
    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: validated.doctorId,
        date: normalizedDate,
        time: validated.time,
        reason: validated.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(appointment);
  } catch (error: any) {
    console.error("Error booking appointment:", error);

    // Handle Prisma unique constraint collision (P2002) in case of parallel booking requests
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("This time slot was just booked by another patient. Please choose another time.");
    }

    throw new Error(error.message || "Failed to book appointment. Please try again.");
  }
}

/**
 * Updates an appointment's status (e.g. CONFIRMED <-> COMPLETED).
 * Protected: Requires Administrator privileges.
 */
export async function updateAppointmentStatus(input: { id: string; status: AppointmentStatus }) {
  try {
    await requireAdmin();

    const validated = UpdateAppointmentStatusSchema.parse(input);

    const appointment = await prisma.appointment.update({
      where: { id: validated.id },
      data: { status: validated.status },
    });

    return appointment;
  } catch (error: any) {
    console.error("Error updating appointment status:", error);
    throw new Error(error.message || "Failed to update appointment status");
  }
}
