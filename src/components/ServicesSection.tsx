import { Palette, Search, GraduationCap } from "lucide-react";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
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
    <section id="services" className="relative bg-warm-beige overflow-visible">
      {/* Wave divider at top: Hero (cream) → Services (warm-beige) */}
      <WaveDivider colorVar="warm-beige" />
      
      {/* Single ambient blob */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-red-fox/5 blob animate-blob opacity-25" />
      
      {/* Content wrapper */}
      <div className="relative pt-16 sm:pt-20 pb-0 px-4">
        <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-handwritten text-2xl text-red-fox mb-2">What we offer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How we can help
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everything you need to compete online—without the price tag.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className={`card-organic bg-background p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
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
      </div>
    </section>
  );
};

export default ServicesSection;
