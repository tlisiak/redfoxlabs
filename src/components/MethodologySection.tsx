import { GraduationCap, Key, MessageSquare, RefreshCw } from "lucide-react";
import foxMascot from "@/assets/redfox-mascot.png";

const MethodologySection = () => {
  const principles = [
    {
      icon: GraduationCap,
      title: "We teach you",
      description: "You'll understand your own website"
    },
    {
      icon: Key,
      title: "No lock-in",
      description: "You own everything."
    },
    {
      icon: MessageSquare,
      title: "Plain English",
      description: "No fancy jargon, no confusion. Just clear education tailored for you."
    },
    {
      icon: RefreshCw,
      title: "Easy to update",
      description: "Built so you can make changes yourself, whenever you need."
    }
  ];

  return (
    <section id="approach" className="py-20 sm:py-28 px-4 bg-background paper-texture">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <img 
            src={foxMascot} 
            alt="Red Fox Labs mascot" 
            className="w-20 h-20 mx-auto mb-6"
          />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our approach
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Technology should empower you, not confuse you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div 
                key={index}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-red-fox/10 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 text-red-fox" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
