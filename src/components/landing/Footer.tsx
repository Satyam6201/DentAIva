import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t bg-muted/20 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="DentAIva Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-bold text-sm tracking-tight text-foreground">DentAIva</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hospital-grade dental management and real-time AI clinical triage platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Departments
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-3">
              Patient Care
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/appointments" className="hover:text-foreground transition-colors">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/aftercare" className="hover:text-foreground transition-colors">
                  Recovery Guides
                </Link>
              </li>
              <li>
                <Link href="/records" className="hover:text-foreground transition-colors">
                  Health Records
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-3">
              Emergency
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a href="tel:18004336824" className="hover:text-red-500 font-medium transition-colors">
                  Hotline: +1 (800) 433-6824
                </a>
              </li>
              <li>
                <span className="text-[11px] text-muted-foreground">
                  24/7 Trauma Desk Active
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground gap-2">
          <p>&copy; {new Date().getFullYear()} DentAIva Hospital Platform. All rights reserved.</p>
          <p>Licence # DENT-TX-90210 &bull; Board Certified Practice</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
