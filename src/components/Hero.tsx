import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";

const Hero = () => {
  return (
    <section className="bg-background paper-texture py-12 sm:py-16 px-4" id="hero">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-fox">
            Red Fox Labs
          </p>
        </div>

        {/* Main Hero Content */}
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Your small business deserves a smarter website.
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We design and build fast, affordable websites that attract customers—complete with SEO, analytics, and hands-on guidance so you actually learn how to make it work for you.
          </p>

          {/* Value Props */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-sm text-muted-foreground mb-2">One-time investment</p>
              <p className="text-lg font-semibold text-foreground">No subscriptions</p>
            </div>
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-sm text-muted-foreground mb-2">You own it</p>
              <p className="text-lg font-semibold text-foreground">Full control</p>
            </div>
          </div>

          {/* Trust Bullets */}
          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium">Fast setup</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="font-medium">Transparent pricing</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="font-medium">SEO that brings calls</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="font-medium">You own your site</span>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <ContactModal>
              <Button 
                size="lg" 
                variant="red-fox"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Book a free 15-min audit
              </Button>
            </ContactModal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

