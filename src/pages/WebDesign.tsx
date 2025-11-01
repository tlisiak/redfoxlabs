import { Smartphone, Zap, Search, Edit3, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ContactModal from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { createServiceSchema, createBreadcrumbSchema, createFAQSchema } from "@/utils/structuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WebDesign = () => {
  const deliverables = [
    { icon: Smartphone, title: "Mobile-First Design", description: "Looks perfect on phones, tablets, and desktops" },
    { icon: Zap, title: "Fast Loading", description: "Optimized for speed and performance" },
    { icon: Search, title: "SEO Ready", description: "Built to rank well on Google from day one" },
    { icon: Edit3, title: "Easy to Update", description: "You can make changes without calling us" },
    { icon: CheckCircle, title: "Clean Code", description: "Modern, maintainable, and scalable" },
    { icon: Clock, title: "Quick Turnaround", description: "Typically 2-3 weeks from start to launch" },
  ];

  const serviceSchema = createServiceSchema({
    name: "Web Design",
    description: "Custom small business websites built for North Bay businesses. Fast, mobile-friendly, and designed to convert visitors into customers.",
    url: "https://redfoxlabs.com/web-design"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://redfoxlabs.com/" },
    { name: "Services", url: "https://redfoxlabs.com/services" },
    { name: "Web Design", url: "https://redfoxlabs.com/web-design" }
  ]);

  const faqSchema = createFAQSchema([
    {
      question: "How long does it take to build a website?",
      answer: "Typically 2-3 weeks from our first conversation to launch. This includes time for feedback, revisions, and testing. Rush projects are available if you have an urgent deadline."
    },
    {
      question: "How much does a website cost?",
      answer: "Projects typically start around $2,500-$5,000 depending on complexity and features. No hidden fees, no subscriptions. You pay once, you own it."
    },
    {
      question: "Can I update the website myself?",
      answer: "Absolutely! Part of my process is teaching you how to manage your own site. I build sites to be easy to update, and I provide training and documentation so you're never dependent on me for simple changes."
    },
    {
      question: "Do you provide hosting?",
      answer: "I recommend reliable hosting providers and can help you set it up, but you'll own the hosting account directly. This means you're never locked in with me and have full control over your site."
    }
  ]);

  const relatedServices = [
    { title: "Local SEO", description: "Get found by customers in your area", link: "/local-seo" },
    { title: "Analytics", description: "Understand your website visitors", link: "/analytics" },
    { title: "Site Care", description: "Keep your site running smoothly", link: "/site-care" },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="North Bay Web Design for Small Businesses | Red Fox Labs"
        description="Custom, mobile-responsive websites for Marin & Sonoma County small businesses. Fast loading, SEO optimized, and built to convert. Book a free audit today."
        canonicalUrl="https://redfoxlabs.com/web-design"
        schemaData={{
          "@context": "https://schema.org",
          "@graph": [serviceSchema, breadcrumbSchema, faqSchema]
        }}
      />
      <Header />

      {/* Hero */}
      <section className="bg-warm-beige paper-texture py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            North Bay Web Design That Converts Visitors Into Customers
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            Custom websites built for small businesses. Fast, mobile-friendly, and designed 
            to help you grow. No templates, no subscriptions—just great work.
          </p>
          <ContactModal>
            <Button variant="red-fox" size="lg" className="text-lg px-8 py-6">
              Get your free audit
            </Button>
          </ContactModal>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            What You Get
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Every website includes everything you need to succeed online
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

      {/* Process */}
      <section className="bg-warm-beige py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            Our 4-Step Process
          </h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Discovery", description: "We start with a conversation about your business, goals, and customers. What makes you unique? Who are you trying to reach? What do you want your website to do?" },
              { step: "2", title: "Design", description: "I create mockups and wireframes based on what we discussed. You give feedback, we iterate, and we don't move forward until you're excited about the direction." },
              { step: "3", title: "Build & Optimize", description: "I build your site using modern tools and best practices. Everything is tested on multiple devices and optimized for speed and search engines." },
              { step: "4", title: "Launch & Train", description: "Your site goes live! I teach you how to make updates, answer any questions, and provide documentation so you can manage it independently." },
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
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="1" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                How long does it take to build a website?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Typically 2-3 weeks from our first conversation to launch. This includes time for feedback, 
                revisions, and testing. Rush projects are available if you have an urgent deadline.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                How much does a website cost?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Projects typically start around $2,500-$5,000 depending on complexity and features. 
                No hidden fees, no subscriptions. You pay once, you own it. I'll give you a clear quote 
                after our free audit call.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Can I update the website myself?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Absolutely! Part of my process is teaching you how to manage your own site. I build 
                sites to be easy to update, and I provide training and documentation so you're never 
                dependent on me for simple changes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Do you provide hosting?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                I recommend reliable hosting providers and can help you set it up, but you'll own the 
                hosting account directly. This means you're never locked in with me and have full control 
                over your site.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-warm-beige py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Related Services
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

export default WebDesign;
