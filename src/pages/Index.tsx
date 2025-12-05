import { Smartphone, Zap, Search, Edit3, CheckCircle, Clock, MapPin, Star, FileText, TrendingUp, Target, Shield, Database, Lock, RefreshCw, HeadphonesIcon, BarChart3, Users, Eye, MousePointer } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ServiceSection from "@/components/ServiceSection";
import TrustSection from "@/components/TrustSection";
import TrustGuarantee from "@/components/TrustGuarantee";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  // Web Design content
  const webDesignDeliverables = [
    { icon: Smartphone, title: "Mobile-First Design", description: "Looks perfect on phones, tablets, and desktops" },
    { icon: Zap, title: "Fast Loading", description: "Optimized for speed and performance" },
    { icon: Search, title: "SEO Ready", description: "Built to rank well on Google from day one" },
    { icon: Edit3, title: "Easy to Update", description: "You can make changes without calling us" },
    { icon: CheckCircle, title: "Clean Code", description: "Modern, maintainable, and scalable" },
    { icon: Clock, title: "Quick Turnaround", description: "Typically 2-3 weeks from start to launch" },
  ];

  const webDesignProcess = [
    { step: "1", title: "Discovery", description: "We start with a conversation about your business, goals, and customers. What makes you unique? Who are you trying to reach?" },
    { step: "2", title: "Design", description: "I create mockups based on what we discussed. You give feedback, we iterate, and we don't move forward until you're excited." },
    { step: "3", title: "Build & Optimize", description: "I build your site using modern tools and best practices. Everything is tested on multiple devices and optimized for speed." },
    { step: "4", title: "Launch & Train", description: "Your site goes live! I teach you how to make updates and provide documentation so you can manage it independently." },
  ];

  // Local SEO content
  const localSeoDeliverables = [
    { icon: MapPin, title: "Google Business Profile", description: "Optimized profile that shows up in local searches" },
    { icon: Star, title: "Review Strategy", description: "System to get more 5-star reviews from happy customers" },
    { icon: FileText, title: "Local Citations", description: "Your business listed in directories across the web" },
    { icon: TrendingUp, title: "Ranking Improvements", description: "Track your progress in local search results" },
    { icon: Search, title: "Keyword Research", description: "Find what your customers are actually searching for" },
    { icon: Target, title: "On-Page SEO", description: "Optimize your website content for local searches" },
  ];

  const localSeoProcess = [
    { step: "1", title: "Audit", description: "I analyze your current online presence, check where you rank for important keywords, and identify opportunities to improve." },
    { step: "2", title: "Optimize", description: "Set up or improve your Google Business Profile, ensure your business info is consistent across the web." },
    { step: "3", title: "Build", description: "Get your business listed in relevant directories, create a system for collecting reviews, and build local citations." },
    { step: "4", title: "Monitor", description: "Track your rankings, analyze what's working, and continuously refine your strategy." },
  ];

  // Site Care content
  const siteCareDeliverables = [
    { icon: Shield, title: "Uptime Monitoring", description: "Get alerts if your site goes down (rare, but we're watching)" },
    { icon: Database, title: "Regular Backups", description: "Your site backed up automatically, just in case" },
    { icon: Lock, title: "Security Updates", description: "Keep your site safe from vulnerabilities" },
    { icon: RefreshCw, title: "Software Updates", description: "Keep everything running smoothly with latest versions" },
    { icon: HeadphonesIcon, title: "Technical Support", description: "Email support when you need help" },
    { icon: Zap, title: "Performance Checks", description: "Regular speed and performance optimization" },
  ];

  const siteCareProcess = [
    { step: "1", title: "Automated Monitoring", description: "I set up systems that watch your site 24/7. If anything goes wrong, I get an alert immediately." },
    { step: "2", title: "Regular Maintenance", description: "Every week, I check backups, apply security updates, and make sure everything is running smoothly." },
    { step: "3", title: "Quick Response", description: "If something breaks or you need help, email me. I typically respond within a few hours during business days." },
    { step: "4", title: "Monthly Reports", description: "You get a simple monthly report showing uptime, performance metrics, and any work I did. Total transparency." },
  ];

  // Analytics content
  const analyticsDeliverables = [
    { icon: Users, title: "Visitor Tracking", description: "See who's visiting your site and where they come from" },
    { icon: Eye, title: "Page Performance", description: "Know which pages are getting the most attention" },
    { icon: MousePointer, title: "Conversion Tracking", description: "Track form submissions, calls, and other actions" },
    { icon: TrendingUp, title: "Traffic Trends", description: "Understand how your traffic changes over time" },
    { icon: Target, title: "Goal Tracking", description: "Set and measure specific business objectives" },
    { icon: BarChart3, title: "Simple Reports", description: "Easy-to-understand dashboards, no data science degree needed" },
  ];

  const analyticsProcess = [
    { step: "1", title: "Define Your Goals", description: "What do you want to know? More phone calls? More form submissions? We start by understanding what success looks like." },
    { step: "2", title: "Install Tracking", description: "I set up Google Analytics (or another tool) and configure it properly. Most people set this up wrong—I make sure it's right." },
    { step: "3", title: "Create Your Dashboard", description: "I build a simple dashboard that shows you the metrics that matter. No overwhelming graphs—just insights you need." },
    { step: "4", title: "Train You", description: "I teach you how to read your data and what to look for. You'll get a simple checklist for reviewing analytics regularly." },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      <section id="services">
        <ServicesOverview />
      </section>

      <ServiceSection
        id="web-design"
        title="Web Design"
        subtitle="Custom websites built for small businesses. Fast, mobile-friendly, and designed to help you grow."
        deliverables={webDesignDeliverables}
        processTitle="Our 4-Step Process"
        processSteps={webDesignProcess}
      />

      <ServiceSection
        id="local-seo"
        title="Local SEO"
        subtitle="Get found by customers in Marin County, Sonoma County, and across the North Bay."
        deliverables={localSeoDeliverables}
        processTitle="How It Works"
        processSteps={localSeoProcess}
        alternateBackground
      />

      <ServiceSection
        id="site-care"
        title="Site Care"
        subtitle="Focus on running your business while we handle backups, updates, monitoring, and technical support."
        deliverables={siteCareDeliverables}
        processTitle="How Site Care Works"
        processSteps={siteCareProcess}
      />

      <ServiceSection
        id="analytics"
        title="Analytics"
        subtitle="Stop guessing and start knowing. See what's working on your website in plain English."
        deliverables={analyticsDeliverables}
        processTitle="How We Set It Up"
        processSteps={analyticsProcess}
        alternateBackground
      />

      <section id="why-us">
        <TrustSection />
      </section>
      
      <TrustGuarantee />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
