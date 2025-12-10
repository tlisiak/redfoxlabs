import { GraduationCap, Key, MessageSquare, RefreshCw, CheckCircle, DollarSign } from "lucide-react";
import foxMascot from "@/assets/redfox-mascot.png";
import { WaveDivider } from "@/components/ui/WaveDivider";

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
    <section id="why-us" className="relative py-20 sm:py-28 px-4 bg-warm-beige overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-red-fox/5 blob animate-blob opacity-50" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/5 blob animate-blob opacity-40" style={{ animationDelay: '4s' }} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <img 
            src={foxMascot} 
            alt="Red Fox Labs mascot" 
            className="w-20 h-20 mx-auto mb-5 animate-wiggle"
          />
          <p className="font-handwritten text-2xl text-red-fox mb-2">Our Philosophy</p>
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
            <p className="font-handwritten text-xl text-red-fox mb-4">Our Approach</p>
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="flex gap-4 hover-bounce">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-fox/10 blob-sm flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-fox" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-lg">
                      {principle.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Pricing */}
          <div className="card-organic bg-background p-6 sm:p-8">
            <p className="font-handwritten text-xl text-red-fox mb-4">Fair Pricing</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-red-fox/10 blob-sm flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-red-fox" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Projects from $999</p>
                <p className="text-muted-foreground">Transparent, flat-fee pricing</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-fox/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-red-fox" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wavy divider */}
      <WaveDivider color="hsl(var(--background))" className="mt-8" />
    </section>
  );
};

export default WhyUsSection;
