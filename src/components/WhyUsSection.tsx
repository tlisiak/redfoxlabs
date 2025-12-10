import { GraduationCap, Key, MessageSquare, RefreshCw, CheckCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import foxMascot from "@/assets/redfox-mascot.png";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const WhyUsSection = () => {
  const principles = [
    {
      icon: GraduationCap,
      title: "We teach you",
      description: "You'll understand your own website"
    },
    {
      icon: Key,
      title: "No lock-in",
      description: "You own everything we build"
    },
    {
      icon: MessageSquare,
      title: "Plain English",
      description: "No jargon, just clear guidance"
    },
    {
      icon: RefreshCw,
      title: "Easy to update",
      description: "Make changes yourself, anytime"
    }
  ];

  const benefits = [
    "Flat-fee pricing—no hourly surprises",
    "One-time investment, not subscriptions",
    "Training included so you're independent"
  ];

  return (
    <section id="why-us" className="py-20 sm:py-28 px-4 bg-warm-beige">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <img 
            src={foxMascot} 
            alt="Red Fox Labs mascot" 
            className="w-16 h-16 mx-auto mb-5"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Why Red Fox Labs
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Technology should empower you, not confuse you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-12">
          {/* Left: Approach */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-red-fox uppercase tracking-wide mb-4">Our Approach</h3>
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-fox/10 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-red-fox" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {principle.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Pricing */}
          <div className="bg-background rounded-2xl p-6 sm:p-8 border border-brown-outline/20">
            <h3 className="text-sm font-semibold text-red-fox uppercase tracking-wide mb-4">Fair Pricing</h3>
            
            <div className="flex items-center gap-3 mb-5">
              <DollarSign className="w-7 h-7 text-red-fox" />
              <div>
                <p className="text-xl font-bold text-foreground">Projects from $999</p>
                <p className="text-sm text-muted-foreground">Transparent, flat-fee pricing</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-red-fox flex-shrink-0" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="red-fox" size="lg">
              Get a free quote
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
