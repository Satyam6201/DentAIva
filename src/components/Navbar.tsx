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
    { href: "/records", label: "Health Records", icon: FileTextIcon },
    { href: "/aftercare", label: "Aftercare", icon: HeartHandshakeIcon },
    { href: "/voice", label: "AI Voice", icon: MicIcon },
    { href: "/pro", label: "Pro", icon: CrownIcon },
  ];

  return (
    <>
      {/* 24/7 HOSPITAL EMERGENCY TOP BANNER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-950/80 via-background to-background border-b border-red-500/20 px-4 py-1 text-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
              24/7 DENTAL EMERGENCY
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              Trauma Desk & Urgent Care:
            </span>
            <a
              href="tel:18004336824"
              className="font-mono font-semibold text-foreground hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <PhoneCallIcon className="size-3 text-red-400" />
              +1 (800) 433-6824
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground hidden md:inline">
              🟢 Clinic Open Today: 08:00 AM – 08:00 PM
            </span>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setIsTriageOpen(true)}
              className="h-6 px-2.5 text-[11px] font-medium bg-red-600/90 hover:bg-red-600 text-white rounded-full flex items-center gap-1 shadow-sm"
            >
              <AlertCircleIcon className="size-3" />
              Emergency Triage
            </Button>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="fixed top-7 left-0 right-0 z-40 px-4 sm:px-6 py-2 border-b border-border/50 bg-background/90 backdrop-blur-md h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          {/* LOGO & DESKTOP LINKS */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DentAIva Logo"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="font-bold tracking-tight text-lg hidden sm:inline bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                DentAIva<span className="text-primary text-xs font-mono ml-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">HOSPITAL</span>
              </span>
            </Link>

            <div className="hidden xl:flex items-center gap-5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* MEDIUM SCREEN LINKS */}
            <div className="hidden md:flex xl:hidden items-center gap-4">
              {navLinks.slice(0, 5).map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT SECTION: USER & MOBILE MENU */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-semibold text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>

            <UserButton />

            {/* MOBILE MENU TOGGLE */}
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden p-1.5 h-8 w-8"
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

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed top-[92px] left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/70 p-4 shadow-2xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border border-primary/20"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTriageOpen(true);
                }}
                className="w-full text-xs font-medium flex items-center justify-center gap-2"
              >
                <AlertCircleIcon className="size-3.5" />
                24/7 Emergency Triage Guide
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* EMERGENCY TRIAGE MODAL */}
      <EmergencyTriageModal
        open={isTriageOpen}
        onOpenChange={setIsTriageOpen}
      />
    </>
  );
}

export default Navbar;