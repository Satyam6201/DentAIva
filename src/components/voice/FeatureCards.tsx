import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, ShieldCheckIcon, ClockIcon, SparklesIcon } from "lucide-react";

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-2 gap-5 mb-8">
      {/* HOW TO USE CARD */}
      <Card className="border border-border/80 bg-card rounded-2xl shadow-xs">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <MicIcon className="size-4 text-primary" />
            How to Use Voice Consultation
          </CardTitle>
          <CardDescription className="text-xs">
            Simple steps for an effective clinical audio consultation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>Click the floating microphone button to initiate the encrypted audio call.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>Speak clearly about your dental pain, bleeding, or procedure inquiries.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>Receive spoken guidance with real-time waveform visualizers and transcripts.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>End the call anytime; schedule an in-clinic visit if symptoms persist.</span>
          </div>
        </CardContent>
      </Card>

      {/* CLINICAL CAPABILITIES */}
      <Card className="border border-border/80 bg-card rounded-2xl shadow-xs">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <ShieldCheckIcon className="size-4 text-primary" />
            Clinical Guidance Scope
          </CardTitle>
          <CardDescription className="text-xs">
            Specialized conversational dental knowledge base
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2.5 p-2 bg-muted/20 rounded-lg">
            <ClockIcon className="size-4 text-primary shrink-0" />
            <span>24/7 emergency trauma classification & preliminary home first-aid</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 bg-muted/20 rounded-lg">
            <ShieldCheckIcon className="size-4 text-primary shrink-0" />
            <span>Post-operative aftercare directions (extractions, RCT, and implants)</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 bg-muted/20 rounded-lg">
            <SparklesIcon className="size-4 text-primary shrink-0" />
            <span>Transparent hospital department pricing and preparation protocols</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeatureCards;
