"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

/**
 * Synchronizes Clerk session user with PostgreSQL database.
 * Uses upsert to guarantee idempotency and avoid duplicate key crashes.
 */
export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return null;

    const primaryEmail =
      user.emailAddresses[0]?.emailAddress || `${user.id}@patient.dentaiva.com`;

    // Check if user exists by clerkId
    const existingByClerkId = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (existingByClerkId) {
      // Update names and contact details if changed
      return await prisma.user.update({
        where: { id: existingByClerkId.id },
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: primaryEmail,
          phone: user.phoneNumbers[0]?.phoneNumber || existingByClerkId.phone,
        },
      });
    }

    // Check if a record with the same email exists from a previous signup
    const existingByEmail = await prisma.user.findUnique({
      where: { email: primaryEmail },
    });

    if (existingByEmail) {
      // Associate existing record with the new clerkId
      return await prisma.user.update({
        where: { id: existingByEmail.id },
        data: {
          clerkId: user.id,
          firstName: user.firstName || existingByEmail.firstName,
          lastName: user.lastName || existingByEmail.lastName,
          phone: user.phoneNumbers[0]?.phoneNumber || existingByEmail.phone,
        },
      });
    }

    // Create new patient record
    return await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: primaryEmail,
        phone: user.phoneNumbers[0]?.phoneNumber || null,
      },
    });
  } catch (error) {
    console.error("Error in syncUser server action:", error);
    return null;
  }
}
