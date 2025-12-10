import { Palette, Globe, Search, BarChart3, Wrench } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Palette,
      title: "Brand Strategy",
      description: "Define your visual identity and message that resonates with customers."
    },
    {
      icon: Globe,
      title: "Website Design",
      description: "Fast, mobile-first sites built to convert visitors into customers."
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      description: "Get found by the right people searching for what you offer."
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Understand what's working with clear, actionable insights."
    },
    {
      icon: Wrench,
      title: "Ongoing Support",
      description: "Site care, updates, and help when you need it."
    }
  ];

  return (
    <section id="services" className="py-20 sm:py-28 px-4 bg-warm-beige">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How we can help
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to compete online—without the enterprise price tag.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="bg-background rounded-xl p-8 border border-brown-outline/10 hover:border-red-fox/30 transition-colors"
              >
                <div className="w-12 h-12 bg-red-fox/10 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-red-fox" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
