import { Button } from "@/components/ui/button";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const Hero = () => {
  return (
    <section className="bg-background paper-texture py-24 sm:py-32 px-4" id="hero">
      <div className="max-w-5xl mx-auto text-center">

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
          Websites that actually work.
        </h1>
        
        {/* Subhead */}
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Strategy, design, and tech for Bay Area small businesses.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              variant="red-fox"
              className="text-lg px-10 py-6 hover:scale-105 transition-transform"
            >
              Book a free call
            </Button>
          </a>
        </div>

        {/* Trust line */}
        <p className="text-sm text-muted-foreground">
          One-time investment · No subscriptions · You own everything
        </p>
      </div>
    </section>
  );
};

export default Hero;
