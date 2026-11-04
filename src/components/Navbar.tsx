"use client";

import { UserButton } from "@clerk/nextjs";
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
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-md border-b border-border/80">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">

          <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="DentAIva Logo"
              width={30}
              height={30}
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
            />
            <span className="font-bold tracking-tight text-base sm:text-lg text-foreground flex items-center gap-1.5">
              DentAIva
              <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                CLINIC
              </span>
            </span>
          </Link>


          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>


          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsTriageOpen(true)}
              className="h-8 px-2.5 text-xs font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg flex items-center gap-1.5"
            >
              <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>Triage Guide</span>
            </Button>

            <Link href="/pro" className="hidden sm:inline-flex">
              <Button
                size="sm"
                variant="outline"
                className="h-8 px-2.5 text-xs font-medium border-primary/30 text-primary hover:bg-primary/10 rounded-lg flex items-center gap-1"
              >
                <CrownIcon className="size-3" />
                <span>Pro</span>
              </Button>
            </Link>

            <div className="flex items-center pl-1 border-l border-border/60">
              <UserButton afterSignOutUrl="/" />
            </div>


            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-1.5 h-8 w-8 text-foreground"
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
          <div className="md:hidden fixed top-16 left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border p-4 shadow-xl animate-in slide-in-from-top-2">
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
                    <Icon className="size-4 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/pro"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <CrownIcon className="size-4 text-primary" />
                <span>Pro Plan</span>
              </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <a
                href="tel:18004336824"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 font-medium"
              >
                <PhoneCallIcon className="size-3 text-red-500" />
                <span>+1 (800) 433-6824</span>
              </a>

              <Button
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTriageOpen(true);
                }}
                className="h-7 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-1"
              >
                <AlertCircleIcon className="size-3" />
                Triage
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
