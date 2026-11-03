import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { SendAppointmentEmailSchema } from "@/lib/validations";
import { isAdminEmail } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// In-memory rate limiting map: userId -> [timestamp1, timestamp2, ...]
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5;      // Max 5 emails per minute per user
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];
  
  // Filter out timestamps outside the current window
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(identifier, recentTimestamps);
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. Authenticate caller
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: You must be logged in to send appointment notifications." },
        { status: 401 }
      );
    }

    // 2. Enforce per-user rate limit to prevent email spam / quota exhaustion
    if (!checkRateLimit(user.id)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another confirmation." },
        { status: 429 }
      );
    }

    // 3. Parse and validate request body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const validation = SendAppointmentEmailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = validation.data;

    // 4. Ensure user can only trigger confirmation emails for their own registered email or is an admin
    const sessionEmails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
    const isOwner = sessionEmails.includes(userEmail.toLowerCase());
    const isAdmin = user.emailAddresses.some((e) => isAdminEmail(e.emailAddress));

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden: You cannot dispatch notifications to unauthorized email addresses." },
        { status: 403 }
      );
    }

    // 5. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "DentAiva <onboarding@resend.dev>",
      to: [userEmail],
      subject: `Appointment Confirmation with ${doctorName} - DentAiva`,
      react: AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType: appointmentType || "General Consultation",
        duration: duration || "30 min",
        price: price || "$75",
      }),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to dispatch email notification via Resend service" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: "Appointment confirmation email dispatched successfully", emailId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unhandled error in send-appointment-email route:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while processing email request." },
      { status: 500 }
    );
  }
}
