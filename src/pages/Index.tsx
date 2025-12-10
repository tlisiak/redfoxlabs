import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import MissionSection from "@/components/MissionSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, []);
  return <div className="min-h-screen">
      <Header />
      <Hero />
      <ServicesSection />
      <WhyUsSection />
      <MissionSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>;
};
export default Index;