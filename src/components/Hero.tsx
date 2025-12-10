import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import mascot from "@/assets/redfox-mascot.png";
const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";
const Hero = () => {
  return <section className="relative bg-background pt-24 sm:pt-32 pb-0 px-4 overflow-visible" id="hero">
      {/* Single ambient blob */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-red-fox/5 blob animate-blob opacity-30" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Fox mascot */}
        <div className="flex justify-center mb-8">
          
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
          Websites that <span className="font-handwritten text-red-fox text-5xl sm:text-6xl lg:text-7xl">actually</span> work.
        </h1>
        
        {/* Subhead */}
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{
        animationDelay: '0.1s'
      }}>
          Strategy, design, and tech for Bay Area small businesses.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-12 animate-fade-in" style={{
        animationDelay: '0.2s'
      }}>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="organic" className="text-lg px-10 py-6">
              Book a free call
            </Button>
          </a>
        </div>

        {/* Trust line */}
        <p className="text-sm text-muted-foreground mb-12 animate-fade-in" style={{
        animationDelay: '0.3s'
      }}>
          One-time investment · No subscriptions · You own everything
        </p>
      </div>
      
      {/* Wave divider: Hero (cream) → Services (warm-beige) */}
      <WaveDivider toColor="hsl(35 38% 90%)" />
    </section>;
};
export default Hero;