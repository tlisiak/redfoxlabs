import { MapPin, Star, FileText, TrendingUp, Search, Target } from "lucide-react";
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

const LocalSEO = () => {
  const deliverables = [
    { icon: MapPin, title: "Google Business Profile", description: "Optimized profile that shows up in local searches" },
    { icon: Star, title: "Review Strategy", description: "System to get more 5-star reviews from happy customers" },
    { icon: FileText, title: "Local Citations", description: "Your business listed in directories across the web" },
    { icon: TrendingUp, title: "Ranking Improvements", description: "Track your progress in local search results" },
    { icon: Search, title: "Keyword Research", description: "Find what your customers are actually searching for" },
    { icon: Target, title: "On-Page SEO", description: "Optimize your website content for local searches" },
  ];

  const serviceSchema = createServiceSchema({
    name: "Local SEO",
    description: "Google Business Profile optimization and local search engine optimization for North Bay small businesses in Marin and Sonoma Counties.",
    url: "https://redfoxlabs.com/local-seo"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://redfoxlabs.com/" },
    { name: "Services", url: "https://redfoxlabs.com/services" },
    { name: "Local SEO", url: "https://redfoxlabs.com/local-seo" }
  ]);

  const faqSchema = createFAQSchema([
    {
      question: "How long until I see results?",
      answer: "Google Business Profile improvements can show results in 2-4 weeks. Overall ranking improvements typically take 2-3 months. SEO is a marathon, not a sprint, but the results are worth it and compound over time."
    },
    {
      question: "Do I need ongoing SEO services?",
      answer: "I set everything up and teach you how to maintain it yourself. Some businesses prefer ongoing help, but it's not required. I design my SEO work to be sustainable without constant paid support."
    },
    {
      question: "What if I don't have a website yet?",
      answer: "That's fine! I can start with your Google Business Profile and local citations, then build you a website later. Or we can do both together. Having a website definitely helps, but it's not required to get started with local SEO."
    }
  ]);

  const relatedServices = [
    { title: "Web Design", description: "Build a website that ranks well", link: "/web-design" },
    { title: "Analytics", description: "Track your local search performance", link: "/analytics" },
    { title: "Site Care", description: "Keep your SEO working long-term", link: "/site-care" },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="North Bay Local SEO Services | Marin & Sonoma County | Red Fox Labs"
        description="Rank higher on Google in Marin and Sonoma Counties. Google Business Profile optimization, review management, and local SEO for North Bay small businesses."
        canonicalUrl="https://redfoxlabs.com/local-seo"
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
            Get Found by North Bay Customers Searching for Your Services
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            Local SEO helps you show up when people search for businesses like yours 
            in Marin County, Sonoma County, and across the North Bay. More visibility = more customers.
          </p>
          <ContactModal>
            <Button variant="red-fox" size="lg" className="text-lg px-8 py-6">
              Get your free SEO audit
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
            Everything you need to dominate local search in the North Bay
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
            How It Works
          </h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Audit", description: "I analyze your current online presence, check where you rank for important keywords, and identify opportunities to improve your visibility in local search." },
              { step: "2", title: "Optimize", description: "Set up or improve your Google Business Profile, ensure your business info is consistent across the web, and optimize your website content for local searches." },
              { step: "3", title: "Build", description: "Get your business listed in relevant directories, create a system for collecting reviews, and build local citations that help you rank higher." },
              { step: "4", title: "Monitor & Improve", description: "Track your rankings, analyze what's working, and continuously refine your strategy. I teach you how to maintain and improve your local SEO over time." },
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
                How long until I see results?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Google Business Profile improvements can show results in 2-4 weeks. Overall ranking 
                improvements typically take 2-3 months. SEO is a marathon, not a sprint, but the results 
                are worth it and compound over time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Do I need ongoing SEO services?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                I set everything up and teach you how to maintain it yourself. Some businesses prefer 
                ongoing help, but it's not required. I design my SEO work to be sustainable without 
                constant paid support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                What if I don't have a website yet?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                That's fine! I can start with your Google Business Profile and local citations, then 
                build you a website later. Or we can do both together. Having a website definitely helps, 
                but it's not required to get started with local SEO.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4" className="bg-warm-beige rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                How do you handle negative reviews?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                I'll teach you how to respond professionally to all reviews, including negative ones. 
                A good response to a negative review can actually improve your reputation. I also help 
                you set up systems to prevent negative reviews by catching issues early.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-warm-beige py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Services That Work Great Together
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

export default LocalSEO;
