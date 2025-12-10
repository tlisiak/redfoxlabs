import { Palette, Search, GraduationCap } from "lucide-react";
import { WaveDivider } from "@/components/ui/WaveDivider";

const ServicesSection = () => {
  const services = [
    {
      icon: Palette,
      title: "Strategy & Design",
      description: "Brand identity, website design, and visual systems that convert visitors into customers."
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      description: "Get found by the right people with search optimization and targeted marketing."
    },
    {
      icon: GraduationCap,
      title: "Analytics & Education",
      description: "Understand what's working and learn to manage your own digital presence."
    }
  ];
  
  return (
    <section id="services" className="relative py-20 sm:py-28 px-4 bg-warm-beige overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 right-0 w-40 h-40 bg-red-fox/5 blob animate-blob opacity-50" />
      <div className="absolute bottom-20 left-0 w-56 h-56 bg-accent/5 blob animate-blob opacity-40" style={{ animationDelay: '3s' }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="font-handwritten text-2xl text-red-fox mb-2">What we offer</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How we can help
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to compete online—without the price tag.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="card-organic bg-background p-8"
              >
                <div className="w-14 h-14 bg-red-fox/10 blob-sm flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-red-fox" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Wavy divider */}
      <WaveDivider color="hsl(var(--background))" className="mt-16" />
    </section>
  );
};

export default ServicesSection;
