import { Shield, Database, Zap, HeadphonesIcon, Lock, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ContactModal from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SiteCare = () => {
  const deliverables = [
    { icon: Shield, title: "Uptime Monitoring", description: "Get alerts if your site goes down (rare, but we're watching)" },
    { icon: Database, title: "Regular Backups", description: "Your site backed up automatically, just in case" },
    { icon: Lock, title: "Security Updates", description: "Keep your site safe from vulnerabilities" },
    { icon: RefreshCw, title: "Software Updates", description: "Keep everything running smoothly with latest versions" },
    { icon: HeadphonesIcon, title: "Technical Support", description: "Email support when you need help" },
    { icon: Zap, title: "Performance Checks", description: "Regular speed and performance optimization" },
  ];

  const relatedServices = [
    { title: "Web Design", description: "Build a site that's easy to maintain", link: "/web-design" },
    { title: "Analytics", description: "Monitor your site's performance", link: "/analytics" },
    { title: "Local SEO", description: "Keep your rankings strong", link: "/local-seo" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-warm-beige paper-texture py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Keep Your Website Running Smoothly Without the Stress
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            Focus on running your business while we handle backups, updates, monitoring, 
            and technical support. Affordable, straightforward site maintenance for North Bay small businesses.
          </p>
          <ContactModal>
            <Button variant="red-fox" size="lg" className="text-lg px-8 py-6">
              Learn about site care plans
            </Button>
          </ContactModal>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            What's Included
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to keep your site secure, fast, and reliable
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="bg-warm-beige rounded-xl p-6 border border-brown-outline/20"
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
      </section>

      {/* How It Works */}
      <section className="bg-warm-beige py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            How Site Care Works
          </h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Automated Monitoring", description: "I set up systems that watch your site 24/7. If anything goes wrong (site down, security issue, performance problem), I get an alert immediately." },
              { step: "2", title: "Regular Maintenance", description: "Every week, I check backups, apply security updates, and make sure everything is running smoothly. You don't have to think about it." },
              { step: "3", title: "Quick Response", description: "If something breaks or you need help, email me. I typically respond within a few hours during business days. Emergency issues get immediate attention." },
              { step: "4", title: "Monthly Reports", description: "You get a simple monthly report showing uptime, performance metrics, and any work I did on your site. Total transparency." },
            ].map((item) => (
              <div key={item.step} className="bg-card rounded-xl p-6 sm:p-8 border border-brown-outline/20">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-red-fox/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-red-fox">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            Common Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="1" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Do I need site care if my site is new?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Even new sites need backups and monitoring. Technology changes fast, and security 
                vulnerabilities can happen anytime. It's much better to prevent problems than fix 
                them after they happen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                What happens if my site goes down?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                I get an immediate alert and start investigating. Most issues can be fixed quickly. 
                If it's a hosting problem, I contact your host. If it's a code issue, I fix it. 
                You'll be updated throughout the process.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Can you work on sites you didn't build?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! I maintain sites built by other developers all the time. I'll do an initial audit 
                to understand how everything works, then take over the maintenance from there.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                How much does site care cost?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Plans typically start around $100-200/month depending on your site's complexity and 
                what you need. No long-term contracts—cancel anytime if you're not happy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-warm-beige py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Other Ways We Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link
                key={service.link}
                to={service.link}
                className="block bg-card rounded-xl p-6 border border-brown-outline/20 hover-lift hover:border-red-fox/40 transition-all"
              >
                <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <span className="text-red-fox font-semibold">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default SiteCare;
