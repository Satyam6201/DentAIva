import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanStackProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DentAIva – AI Voice Dental Assistant & Hospital SaaS",
  description:
    "Enterprise-grade dental clinic & hospital SaaS with 24/7 emergency triage, smart booking, electronic health records, post-op aftercare, and real-time AI voice consultations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#e78a53",
            colorBackground: "#f3f4f6",
            colorText: "#111827",
            colorTextSecondary: "#6b7280",
            colorInputBackground: "#f3f4f6",
          },
        }}
      >
        <html lang="en">
          <body className="font-sans antialiased dark">
            <UserSync />
            <Toaster />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </TanStackProvider>
  );
}
