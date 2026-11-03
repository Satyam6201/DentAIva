import { MessageSquareIcon } from "lucide-react";
import Image from "next/image";

function WhatToAsk() {
  return (
    <section id="what-to-ask" className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <MessageSquareIcon className="size-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              Conversational Dental AI
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Ask About Anything Dental
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From emergency pain advice to cost estimates and procedure preparation, Riley provides instant answers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: 3 CHAT QUESTION CARDS */}
          <div className="space-y-4">
            <div className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 shadow-xs transition-all">
              <div className="flex items-start gap-3.5">
                <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                  <MessageSquareIcon className="size-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="font-semibold text-sm text-foreground">
                    "My tooth hurts when I bite down. Is it an infection?"
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Riley explains likely periapical causes, gives home pain relief advice, and classifies urgency level.
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      Instant Triage
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      Pain Relief
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 shadow-xs transition-all">
              <div className="flex items-start gap-3.5">
                <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                  <MessageSquareIcon className="size-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="font-semibold text-sm text-foreground">
                    "How much does a dental implant or porcelain crown cost?"
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Access transparent fee ranges for hospital departments, insurance coverage eligibility, and self-pay installment options.
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      Cost Transparency
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      Insurance Info
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 shadow-xs transition-all">
              <div className="flex items-start gap-3.5">
                <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 text-primary">
                  <MessageSquareIcon className="size-4" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p className="font-semibold text-sm text-foreground">
                    "Is minor bleeding normal on day 2 after wisdom tooth extraction?"
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Get post-operative instructions on gauze pressure, red flag complications, and dry socket prevention.
                  </p>
                  <div className="flex gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      Post-Op Healing
                    </span>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      Dry Socket Guide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: ILLUSTRATION */}
          <div className="bg-card border border-border/80 rounded-2xl p-6 flex items-center justify-center shadow-xs">
            <Image
              src="/confused.png"
              alt="AI Dental Assistant Guidance"
              width={420}
              height={420}
              className="w-full max-w-sm h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatToAsk;
