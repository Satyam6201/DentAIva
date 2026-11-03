"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  CalendarIcon,
  CrownIcon,
  HomeIcon,
  MicIcon,
  StethoscopeIcon,
  FileTextIcon,
  HeartHandshakeIcon,
  AlertCircleIcon,
  PhoneCallIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import EmergencyTriageModal from "./emergency/EmergencyTriageModal";

function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTriageOpen, setIsTriageOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/appointments", label: "Appointments", icon: CalendarIcon },
    { href: "/services", label: "Departments", icon: StethoscopeIcon },
    { href: "/records", label: "Records", icon: FileTextIcon },
    { href: "/aftercare", label: "Aftercare", icon: HeartHandshakeIcon },
    { href: "/voice", label: "AI Voice", icon: MicIcon },
    { href: "/pro", label: "Pro", icon: CrownIcon },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="DentAIva Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold tracking-tight text-base text-foreground flex items-center gap-1.5">
              DentAIva
              <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                CLINIC
              </span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* EMERGENCY TRIAGE BUTTON */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsTriageOpen(true)}
              className="h-8 px-2.5 sm:px-3 text-xs font-semibold border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-1.5"
            >
              <span className="size-2 rounded-full bg-red-500 animate-pulse" />
              <span className="hidden sm:inline">Emergency</span> Triage
            </Button>

            {/* USER PROFILE INFO */}
            {user && (
              <div className="hidden xl:flex flex-col items-end text-right leading-tight">
                <span className="text-xs font-semibold text-foreground truncate max-w-[140px]">
                  {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "Patient"}
                </span>
                <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            )}

            <UserButton afterSignOutUrl="/" />

            {/* MOBILE MENU TOGGLE BUTTON */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-1.5 h-8 w-8 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border p-4 shadow-xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-border/80 flex flex-col gap-2">
              <a
                href="tel:18004336824"
                className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground py-1"
              >
                <PhoneCallIcon className="size-3 text-red-500" />
                Trauma Hotline: +1 (800) 433-6824
              </a>
              <Button
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTriageOpen(true);
                }}
                className="w-full h-8 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center gap-1.5"
              >
                <AlertCircleIcon className="size-3.5" />
                Open Emergency Triage Guide
              </Button>
            </div>
          </div>
        )}
      </header>

      <EmergencyTriageModal
        open={isTriageOpen}
        onOpenChange={setIsTriageOpen}
      />
    </>
  );
}

export default Navbar;
