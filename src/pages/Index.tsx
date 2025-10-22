import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import TrustSection from "@/components/TrustSection";
import TrustGuarantee from "@/components/TrustGuarantee";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <section id="services">
        <ServicesOverview />
      </section>
      <section id="why-us">
        <TrustSection />
      </section>
      <TrustGuarantee />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
