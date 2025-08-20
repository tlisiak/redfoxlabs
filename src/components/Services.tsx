import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Product Strategy",
    description: "Define your product vision, roadmap, and go-to-market strategy with data-driven insights.",
    features: ["Market Analysis", "User Research", "Competitive Intelligence", "Strategic Planning"]
  },
  {
    title: "Product Leadership",
    description: "Scale your product organization with proven frameworks and leadership coaching.",
    features: ["Team Building", "Process Optimization", "Stakeholder Alignment", "Performance Metrics"]
  },
  {
    title: "Innovation Advisory",
    description: "Navigate emerging technologies and build sustainable, future-ready products.",
    features: ["Technology Assessment", "Innovation Framework", "Sustainability Focus", "Climate Tech Expertise"]
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How We <span className="text-primary">Accelerate</span> Your Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive product consulting services designed to transform your vision into market-leading solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-smooth">
              <CardHeader>
                <CardTitle className="text-xl text-primary mb-2">{service.title}</CardTitle>
                <CardDescription className="text-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="red-fox" size="lg">
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;