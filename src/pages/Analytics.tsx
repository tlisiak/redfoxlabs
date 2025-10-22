import { BarChart3, Target, TrendingUp, Users, Eye, MousePointer } from "lucide-react";
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

const Analytics = () => {
  const deliverables = [
    { icon: Users, title: "Visitor Tracking", description: "See who's visiting your site and where they come from" },
    { icon: Eye, title: "Page Performance", description: "Know which pages are getting the most attention" },
    { icon: MousePointer, title: "Conversion Tracking", description: "Track form submissions, calls, and other actions" },
    { icon: TrendingUp, title: "Traffic Trends", description: "Understand how your traffic changes over time" },
    { icon: Target, title: "Goal Tracking", description: "Set and measure specific business objectives" },
    { icon: BarChart3, title: "Simple Reports", description: "Easy-to-understand dashboards, no data science degree needed" },
  ];

  const relatedServices = [
    { title: "Web Design", description: "Build a site that's easy to track", link: "/web-design" },
    { title: "Local SEO", description: "Monitor your search rankings", link: "/local-seo" },
    { title: "Site Care", description: "Track performance over time", link: "/site-care" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-warm-beige paper-texture py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Understand Your Customers With Simple, Actionable Data
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            Stop guessing and start knowing. See what's working on your website, where visitors 
            come from, and what makes them contact you. All in plain English.
          </p>
          <ContactModal>
            <Button variant="red-fox" size="lg" className="text-lg px-8 py-6">
              Set up your analytics
            </Button>
          </ContactModal>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
            What You'll Track
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            The data that actually matters for your small business
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
            How We Set It Up
          </h2>
          
          <div className="space-y-6">
            {[
              { step: "1", title: "Define Your Goals", description: "What do you want to know? More phone calls? More form submissions? More people finding specific services? We start by understanding what success looks like for your business." },
              { step: "2", title: "Install Tracking", description: "I set up Google Analytics (or another tool if you prefer) and configure it properly. Most people set this up wrong—I make sure it's tracking the right things the right way." },
              { step: "3", title: "Create Your Dashboard", description: "I build a simple dashboard that shows you the metrics that matter. No overwhelming graphs or confusing jargon—just the insights you need to make decisions." },
              { step: "4", title: "Train You", description: "I teach you how to read your data and what to look for. You'll get a simple checklist for reviewing your analytics regularly and knowing when to take action." },
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

      {/* Real Examples */}
      <section className="py-16 bg-background px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What You'll Learn
          </h2>
          <div className="space-y-4">
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-foreground leading-relaxed">
                <strong className="text-red-fox">Example:</strong> "Your Google Business Profile 
                is getting 200 views per month, but only 5 people are clicking to your website. 
                Let's improve your profile photos and description to increase that click rate."
              </p>
            </div>
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-foreground leading-relaxed">
                <strong className="text-red-fox">Example:</strong> "Your 'Services' page gets 100 
                visitors per month, but only 3 fill out the contact form. Let's test a simpler form 
                or add a phone number to make it easier for people to reach you."
              </p>
            </div>
            <div className="bg-warm-beige rounded-lg p-6 border border-brown-outline/20">
              <p className="text-foreground leading-relaxed">
                <strong className="text-red-fox">Example:</strong> "Most of your traffic comes from 
                'San Francisco plumber' searches. Let's create more content targeting that keyword to 
                bring in even more relevant visitors."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-4 bg-warm-beige">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            Common Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="1" className="bg-card rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Is Google Analytics free?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! Google Analytics is free for small businesses. You only pay me to set it up 
                correctly and teach you how to use it. There are also privacy-focused alternatives 
                we can use if you prefer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="2" className="bg-card rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                How often should I check my analytics?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Once a month is plenty for most small businesses. I'll give you a simple checklist 
                of what to look at each month. If you run ads or have seasonal business, you might 
                want to check weekly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="3" className="bg-card rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                What if I don't understand the data?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                That's exactly why I create simple dashboards and provide training. I explain 
                everything in plain English, and you can always email me with questions. I'm here 
                to make data accessible, not confusing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="4" className="bg-card rounded-lg px-6 border border-brown-outline/20">
              <AccordionTrigger className="text-left font-semibold text-foreground">
                Can you track phone calls?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! We can set up call tracking so you know which marketing efforts are generating 
                phone calls. This is especially useful for service businesses where most customers 
                prefer to call rather than fill out a form.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related Services */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Pair Analytics With
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <Link
                key={service.link}
                to={service.link}
                className="block bg-warm-beige rounded-xl p-6 border border-brown-outline/20 hover-lift hover:border-red-fox/40 transition-all"
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

export default Analytics;
