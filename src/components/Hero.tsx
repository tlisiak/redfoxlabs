import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import mascot from "@/assets/redfox-mascot.png";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const Hero = () => {
  return (
    <section className="relative bg-background paper-texture pt-24 sm:pt-32 pb-0 px-4 overflow-hidden" id="hero">
      {/* Floating blob shapes */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-fox/10 blob animate-blob opacity-60" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-accent/10 blob animate-blob opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-warm-beige/50 blob-sm animate-blob opacity-50" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Fox mascot */}
        <div className="flex justify-center mb-8">
          <img 
            src={mascot} 
            alt="Red Fox Labs mascot" 
            className="w-24 h-24 sm:w-32 sm:h-32 animate-bounce-soft"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
          Websites that <span className="font-handwritten text-red-fox text-5xl sm:text-6xl lg:text-7xl">actually</span> work.
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
              variant="organic"
              className="text-lg px-10 py-6"
            >
              Book a free call
            </Button>
          </a>
        </div>

        {/* Trust line */}
        <p className="text-sm text-muted-foreground mb-16">
          One-time investment · No subscriptions · You own everything
        </p>
      </div>
      
      {/* Wavy divider */}
      <WaveDivider color="hsl(35 38% 90%)" />
    </section>
  );
};

export default Hero;
