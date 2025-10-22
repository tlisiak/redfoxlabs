import { Globe, MapPin, Wrench, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ContactModal from "@/components/ContactModal";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      title: "Web Design",
      description: "Custom, mobile-responsive websites built to convert visitors into customers. Fast, modern, and optimized for search engines.",
      icon: Globe,
      link: "/web-design",
      features: ["Mobile-first design", "SEO optimized", "Fast loading", "Easy to update"],
    },
    {
      title: "Local SEO",
      description: "Rank higher on Google in the Bay Area. Google Business Profile optimization, review management, and local citations.",
      icon: MapPin,
      link: "/local-seo",
      features: ["Google Business Profile", "Local rankings", "Review strategy", "Citation building"],
    },
    {
      title: "Site Care",
      description: "Keep your website running smoothly with monitoring, backups, updates, and support when you need it.",
      icon: Wrench,
      link: "/site-care",
      features: ["Uptime monitoring", "Regular backups", "Security updates", "Technical support"],
    },
    {
      title: "Analytics",
      description: "Simple, actionable data dashboards that help you understand your customers and make better decisions.",
      icon: BarChart3,
      link: "/analytics",
      features: ["Traffic insights", "Conversion tracking", "Custom reports", "Easy to understand"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-background paper-texture py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Web Services for Bay Area Small Businesses
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Everything you need to build your online presence and attract more customers. 
            No subscriptions, no surprises—just great work at fair prices.
          </p>
          <ContactModal>
            <Button variant="red-fox" size="lg">
              Book a free 15-min audit
            </Button>
          </ContactModal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 px-4 bg-warm-beige">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.link}
                  to={service.link}
                  className="block"
                >
                  <div className="bg-card rounded-xl p-8 border border-brown-outline/20 hover-lift h-full transition-all hover:border-red-fox/40">
                    <div className="w-14 h-14 bg-red-fox/10 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-red-fox" />
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <div className="w-1.5 h-1.5 bg-red-fox rounded-full shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="text-red-fox font-semibold flex items-center gap-2">
                      Learn more →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            All Services Include
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="font-semibold text-foreground mb-2">No Subscriptions</p>
              <p className="text-sm text-muted-foreground">One-time investment, you own it</p>
            </div>
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="font-semibold text-foreground mb-2">Bay Area Local</p>
              <p className="text-sm text-muted-foreground">Personal service, quick response</p>
            </div>
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="font-semibold text-foreground mb-2">Training Included</p>
              <p className="text-sm text-muted-foreground">Learn to manage it yourself</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default Services;
