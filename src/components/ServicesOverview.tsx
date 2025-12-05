import { Sparkles, Target, GraduationCap } from "lucide-react";
import foxLogo from "@/assets/redfox-mascot.png";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const ServicesOverview = () => {
  const services = [
    {
      icon: Sparkles,
      title: "Our Services",
      description: "Web design, local SEO, analytics, and site care for North Bay small businesses",
      href: "#web-design",
    },
    {
      icon: Target,
      title: "Why Choose Us?",
      description: "Enterprise experience with a personal touch, fair pricing, and genuine care for your success",
      href: "#why-us",
    },
    {
      icon: GraduationCap,
      title: "Ready to Start?",
      description: "Let's chat about your project and how we can help your business grow",
      href: BOOKING_URL,
      external: true,
    }
  ];

  return (
    <section className="bg-warm-beige paper-texture py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src={foxLogo} 
              alt="Red Fox Labs mascot"
              width="96"
              height="96"
              loading="lazy"
              className="w-24 h-24 animate-float"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How we can help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-level solutions designed for small businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <a 
                key={index} 
                href={service.href}
                target={service.external ? "_blank" : undefined}
                rel={service.external ? "noopener noreferrer" : undefined}
                className="block"
              >
                <div className="bg-card rounded-xl p-8 border border-brown-outline/20 hover-lift cursor-pointer transition-all hover:border-red-fox/40 h-full">
                  <div className="w-14 h-14 bg-red-fox/10 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-red-fox" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
