import { GraduationCap, Key, MessageSquare, RefreshCw, CheckCircle, DollarSign } from "lucide-react";
import foxMascot from "@/assets/redfox-mascot.png";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const WhyUsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
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
    <section id="why-us" className="relative bg-warm-beige overflow-visible">
      {/* Wave divider at top: Mission (cream) → WhyUs (warm-beige) */}
      <WaveDivider colorVar="warm-beige" />
      
      {/* Single ambient blob */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 blob animate-blob opacity-20" />
      
      {/* Content wrapper */}
      <div className="relative pt-16 sm:pt-20 pb-20 sm:pb-24 px-4">
        <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
          <div className={`text-center mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <img 
              src={foxMascot} 
              alt="Red Fox Labs mascot" 
              className="w-16 h-16 mx-auto mb-4 animate-float"
            />
            <p className="font-handwritten text-2xl text-red-fox mb-2">Our Philosophy</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Why Red Fox Labs
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Technology should empower you, not confuse you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {/* Left: Approach */}
            <div className="space-y-5">
              <p className={`font-handwritten text-xl text-red-fox mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>Our Approach</p>
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex gap-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${index * 80 + 150}ms` }}
                  >
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
            <div className={`card-organic bg-background p-6 sm:p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
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
      </div>
    </section>
  );
};

export default WhyUsSection;
