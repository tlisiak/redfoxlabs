import { LucideIcon } from "lucide-react";

interface Deliverable {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  deliverables: Deliverable[];
  processTitle: string;
  processSteps: ProcessStep[];
  alternateBackground?: boolean;
}

const ServiceSection = ({
  id,
  title,
  subtitle,
  deliverables,
  processTitle,
  processSteps,
  alternateBackground = false,
}: ServiceSectionProps) => {
  return (
    <section id={id} className="scroll-mt-20">
      {/* Deliverables */}
      <div className={`py-16 sm:py-20 px-4 ${alternateBackground ? 'bg-warm-beige' : 'bg-background'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            {title}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className={`rounded-xl p-6 border border-brown-outline/20 ${alternateBackground ? 'bg-card' : 'bg-warm-beige'}`}
                >
                  <div className="w-12 h-12 bg-red-fox/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-red-fox" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className={`py-16 sm:py-20 px-4 ${alternateBackground ? 'bg-background' : 'bg-warm-beige'}`}>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-12">
            {processTitle}
          </h3>
          
          <div className="space-y-6">
            {processSteps.map((item) => (
              <div key={item.step} className={`rounded-xl p-6 sm:p-8 border border-brown-outline/20 ${alternateBackground ? 'bg-warm-beige' : 'bg-card'}`}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-fox/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-red-fox">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
