import { useEffect, useRef, useState } from "react";
import { MessageCircle, Search, Wrench, PackageCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BusinessTransformationProps {
  onOpenModal: () => void;
}

const STEPS = [
  {
    number: "01",
    side: "left" as const,
    Icon: MessageCircle,
    label: "First 30 minutes, free",
    title: "We listen before we build",
    body: "Tell us what you have, what's broken, and where you want to go. No pitch deck, no hard sell — just an honest conversation about whether we're the right fit.",
  },
  {
    number: "02",
    side: "right" as const,
    Icon: Search,
    label: "Scoped, not guessed",
    title: "We map the work before touching code",
    body: "We audit your existing site, stack, and content — then hand you a plain-English breakdown of exactly what we'll do, in what order, and why.",
  },
  {
    number: "03",
    side: "left" as const,
    Icon: Wrench,
    label: "Built with receipts",
    title: "Every change is explained as it's made",
    body: "We build (or rebuild) your site with maintenance docs written alongside the code. By the time we're done, you understand what you have and how to use it.",
  },
  {
    number: "04",
    side: "right" as const,
    Icon: PackageCheck,
    label: "You own all of it",
    title: "Code, credentials, docs — yours",
    body: "We walk you through everything: the codebase, the hosting, the accounts. You leave with a recorded walkthrough and zero dependency on us to keep the lights on.",
  },
  {
    number: "05",
    side: "left" as const,
    Icon: RefreshCw,
    label: "Optional",
    title: "We stay if you want us to",
    body: "Need someone to handle updates, security patches, and new features? We offer lightweight monthly management — no long contracts, cancel any time.",
  },
];

const BusinessTransformation = ({ onOpenModal }: BusinessTransformationProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-background py-24 px-4 overflow-hidden"
    >
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <span className="font-handwritten text-2xl text-red-fox">how it works</span>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
          The process that earns your trust
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          No retainers, no black-box billing. You own everything we build — from day one.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* SVG dashed thread — desktop only */}
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full hidden md:block pointer-events-none"
          style={{ width: 2, overflow: "visible" }}
          aria-hidden="true"
        >
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="hsl(11 76% 49% / 0.25)"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeDashoffset={isVisible ? 0 : 800}
            className={isVisible ? "animate-draw-line" : ""}
            style={{ "--line-length": "800" } as React.CSSProperties}
          />
        </svg>

        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className={cn(
              "flex mb-12 md:mb-16",
              step.side === "left" ? "md:justify-start" : "md:justify-end"
            )}
          >
            {/* Card */}
            <div
              className={cn(
                "relative w-full md:w-[44%] bg-card rounded-3xl shadow-card p-8 hover-lift",
                !isVisible && "opacity-0",
                isVisible && step.side === "left" && "animate-slide-in-left",
                isVisible && step.side === "right" && "animate-slide-in-right"
              )}
              style={isVisible ? { animationDelay: `${i * 150}ms` } : undefined}
            >
              {/* Ghost number */}
              <span
                className="absolute -top-6 -left-4 font-handwritten leading-none select-none pointer-events-none"
                style={{ fontSize: "9rem", color: "hsl(11 76% 49% / 0.07)" }}
                aria-hidden="true"
              >
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-red-fox/10 text-red-fox flex items-center justify-center mb-4">
                <step.Icon size={22} />
              </div>

              {/* Overline label */}
              <p className="text-xs font-semibold uppercase tracking-widest text-red-fox mb-1">
                {step.label}
              </p>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>

              {/* Body */}
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 text-center flex flex-col items-center gap-4">
        <span className="font-handwritten text-3xl text-red-fox">ready to start?</span>
        <Button
          size="lg"
          variant="organic"
          className="text-lg px-10 py-6"
          onClick={onOpenModal}
        >
          Book your free consult →
        </Button>
        <p className="text-sm text-muted-foreground">
          No commitment required. First session is always on us.
        </p>
      </div>
    </section>
  );
};

export default BusinessTransformation;
