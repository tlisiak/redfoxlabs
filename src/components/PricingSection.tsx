import { Heart, DollarSign, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const PricingSection = () => {
  const benefits = [
    "Flat-fee pricing—no hourly surprises",
    "One-time investment, not subscriptions",
    "You own everything we build",
    "Training included so you're independent"
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 bg-warm-beige">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-fox/10 text-red-fox px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Our mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Fair pricing for small businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe every small business deserves access to the same quality tools and strategies the big companies use—without the big company budget.
          </p>
        </div>

        <div className="bg-background rounded-2xl p-8 sm:p-10 border border-brown-outline/20 mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <DollarSign className="w-8 h-8 text-red-fox" />
            <div>
              <p className="text-2xl font-bold text-foreground">Projects starting at $999</p>
              <p className="text-muted-foreground">Transparent, flat-fee pricing</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-8 inline-block text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-red-fox flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="red-fox" size="lg">
                Get a free quote
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
