import logoHorizontal from "@/assets/logo-horizontal.png";
import foxAnalytics from "@/assets/fox-analytics.png";
import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";

const Hero = () => {
  return (
    <section className="bg-background paper-texture py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-red-fox">
            Red Fox Labs
          </h1>
        </div>

        {/* Main Hero Content */}
        <div className="space-y-8 text-center lg:text-left max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Enterprise Expertise<br />
            <span className="text-red-fox">Small Business Prices</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Small businesses with professional websites generate 50% more leads and grow 3x faster than competitors. Let's make that happen for you.
          </p>

          {/* Value Props */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-sm text-muted-foreground mb-2">One-time investment</p>
              <p className="text-lg font-semibold text-foreground">No subscriptions</p>
            </div>
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-sm text-muted-foreground mb-2">You own it</p>
              <p className="text-lg font-semibold text-foreground">Full control</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center lg:justify-start">
            <ContactModal>
              <Button 
                size="lg" 
                variant="red-fox"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Let's chat
              </Button>
            </ContactModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

