import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/90 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="DentAIva Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <span className="font-bold text-lg tracking-tight">
            DentAIva<span className="text-primary text-xs font-mono ml-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">HOSPITAL</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium">
          <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
            Clinical Departments
          </Link>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#what-to-ask" className="text-muted-foreground hover:text-foreground transition-colors">
            AI Triage
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="text-xs h-9">
              Login
            </Button>
          </SignInButton>

          <SignUpButton mode="modal">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs h-9 px-4 rounded-xl shadow-sm">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
}

export default Header;