import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesOverview />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
