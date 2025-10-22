import { Sparkles, Target, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContentSectionModal from "./ContentSectionModal";
import ContactModal from "./ContactModal";

const ServicesOverview = () => {
  const services = [
    {
      icon: Sparkles,
      title: "What We Do",
      description: "Modern websites, smart analytics, and teaching you to succeed independently",
      sectionKey: "what_we_do",
      modalTitle: "What We Do",
      modalDescription: "Learn about our services and approach"
    },
    {
      icon: Target,
      title: "Why Us?",
      description: "Enterprise experience with a personal touch, fair pricing, and genuine care",
      sectionKey: "why_us",
      modalTitle: "Why Us?",
      modalDescription: "Discover what makes us different"
    },
    {
      icon: GraduationCap,
      title: "Ready to Start?",
      description: "Let's chat about your project and how we can help your business grow",
      sectionKey: null,
      modalTitle: null,
      modalDescription: null
    }
  ];

  return (
    <section className="bg-secondary py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How We Can Help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-level solutions designed for small businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const card = (
              <div 
                key={index}
                className="bg-card rounded-xl p-8 border border-border hover-lift cursor-pointer transition-all"
              >
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
            );

            // Last card is contact CTA
            if (index === 2) {
              return (
                <ContactModal key={index}>
                  {card}
                </ContactModal>
              );
            }

            // Other cards open content modals
            return (
              <ContentSectionModal
                key={index}
                sectionKey={service.sectionKey!}
                title={service.modalTitle!}
                description={service.modalDescription!}
              >
                {card}
              </ContentSectionModal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
