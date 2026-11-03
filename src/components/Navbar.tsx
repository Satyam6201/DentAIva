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
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border px-4 py-1.5 text-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
              Emergency Care
            </span>
            <span className="text-muted-foreground hidden sm:inline">
              Trauma Desk:
            </span>
            <a
              href="tel:18004336824"
              className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <PhoneCallIcon className="size-3 text-red-500" />
              +1 (800) 433-6824
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground hidden md:inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              Clinic Hours: 08:00 AM – 08:00 PM
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsTriageOpen(true)}
              className="h-6 px-2.5 text-[11px] font-medium border-red-500/30 text-red-500 hover:bg-red-500/10 rounded flex items-center gap-1"
            >
              <AlertCircleIcon className="size-3" />
              Triage Guide
            </Button>
          </div>
        </div>
      </div>

      <nav className="fixed top-8 left-0 right-0 z-40 px-4 sm:px-6 py-2 border-b border-border bg-background/95 backdrop-blur-md h-16">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="DentAIva Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold tracking-tight text-base hidden sm:inline text-foreground">
                DentAIva
                <span className="text-muted-foreground text-[10px] font-medium ml-1.5 px-1.5 py-0.5 rounded bg-muted border border-border">
                  CLINIC
                </span>
              </span>
            </Link>

            <div className="hidden xl:flex items-center gap-6">
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

            <div className="hidden md:flex xl:hidden items-center gap-4">
              {navLinks.slice(0, 5).map((link) => {
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
          </div>

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

        {mobileMenuOpen && (
          <div className="xl:hidden fixed top-[96px] left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border p-4 shadow-lg animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 p-2.5 rounded text-xs font-medium transition-colors ${
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

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTriageOpen(true);
                }}
                className="w-full text-xs font-medium flex items-center justify-center gap-2 border-red-500/30 text-red-500"
              >
                <AlertCircleIcon className="size-3.5" />
                Emergency Triage Guide
              </Button>
            </div>
          </div>
        )}
      </nav>

      <EmergencyTriageModal
        open={isTriageOpen}
        onOpenChange={setIsTriageOpen}
      />
    </>
  );
}

export default Navbar;
