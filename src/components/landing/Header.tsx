import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-full">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="DentAIva Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-base tracking-tight text-foreground flex items-center gap-1.5">
            DentAIva
            <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              CLINIC
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <Link href="/services" className="hover:text-foreground transition-colors">
            Departments
          </Link>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#what-to-ask" className="hover:text-foreground transition-colors">
            AI Triage
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="text-xs h-8 px-3 text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs h-8 px-3.5 rounded-lg shadow-xs font-semibold">
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
}

export default Header;
