import { auth, currentUser } from "@clerk/nextjs/server";

/**
 * Ensures the caller is authenticated via Clerk.
 * Throws an Error if not signed in.
 */
export async function requireUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized: You must be signed in to perform this action.");
  }

  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized: User profile could not be retrieved.");
  }

  return { userId, user };
}

/**
 * Checks if a given email is the configured hospital admin email.
 */
export function isAdminEmail(email?: string | null): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail || !email) return false;
  return email.trim().toLowerCase() === adminEmail;
}

/**
 * Verifies that the current session belongs to the clinic administrator.
 * Throws an Error if not authenticated or not the admin.
 */
export async function requireAdmin() {
  const { user } = await requireUser();

  const userEmails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail) {
    console.error("ADMIN_EMAIL environment variable is not configured.");
    throw new Error("Forbidden: System administrator email is not configured.");
  }

  const hasAdminAccess = userEmails.includes(adminEmail);

  if (!hasAdminAccess) {
    throw new Error("Forbidden: You do not have administrator permissions.");
  }

  return user;
}
