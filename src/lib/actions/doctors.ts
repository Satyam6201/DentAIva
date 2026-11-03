"use server";

import { Gender, Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar, getSafeAvatarUrl } from "../utils";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../auth";
import { CreateDoctorSchema, UpdateDoctorSchema } from "../validations";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: { appointments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      imageUrl: getSafeAvatarUrl(doctor.imageUrl, doctor.name, doctor.gender),
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw new Error("Failed to fetch doctors list");
  }
}

interface CreateDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

/**
 * Creates a new clinical doctor profile.
 * Protected: Requires Administrator privileges.
 */
export async function createDoctor(input: CreateDoctorInput) {
  try {
    await requireAdmin();

    const validated = CreateDoctorSchema.parse(input);

    const doctor = await prisma.doctor.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        speciality: validated.speciality,
        gender: validated.gender,
        isActive: validated.isActive,
        imageUrl: generateAvatar(validated.name, validated.gender),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/appointments");
    revalidatePath("/services");

    return doctor;
  } catch (error: any) {
    console.error("Error creating doctor:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("A doctor with this email address already exists.");
    }

    throw new Error(error.message || "Failed to create doctor profile");
  }
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {
  id: string;
}

/**
 * Updates an existing doctor's profile.
 * Protected: Requires Administrator privileges.
 */
export async function updateDoctor(input: UpdateDoctorInput) {
  try {
    await requireAdmin();

    const validated = UpdateDoctorSchema.parse(input);

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: validated.id },
      select: { id: true, email: true },
    });

    if (!currentDoctor) {
      throw new Error("Doctor not found");
    }

    // If email is changing, verify no conflicting doctor exists
    if (validated.email && validated.email !== currentDoctor.email) {
      const existing = await prisma.doctor.findUnique({
        where: { email: validated.email },
        select: { id: true },
      });

      if (existing) {
        throw new Error("A doctor with this email address already exists.");
      }
    }

    const doctor = await prisma.doctor.update({
      where: { id: validated.id },
      data: {
        ...(validated.name && { name: validated.name }),
        ...(validated.email && { email: validated.email }),
        ...(validated.phone && { phone: validated.phone }),
        ...(validated.speciality && { speciality: validated.speciality }),
        ...(validated.gender && { gender: validated.gender }),
        ...(validated.isActive !== undefined && { isActive: validated.isActive }),
      },
    });

    revalidatePath("/admin");
    revalidatePath("/appointments");
    revalidatePath("/services");

    return doctor;
  } catch (error: any) {
    console.error("Error updating doctor:", error);
    throw new Error(error.message || "Failed to update doctor profile");
  }
}

/**
 * Fetches only active doctors for the appointment scheduling interface.
 * Uses the @@index([isActive]) index for high concurrency performance.
 */
export async function getAvailableDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { appointments: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      imageUrl: getSafeAvatarUrl(doctor.imageUrl, doctor.name, doctor.gender),
      appointmentCount: doctor._count.appointments,
    }));
  } catch (error) {
    console.error("Error fetching available doctors:", error);
    throw new Error("Failed to fetch available doctors");
  }
}
