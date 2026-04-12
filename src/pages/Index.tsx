import { useState } from "react";
import Hero from "@/components/Hero";
import BusinessTransformation from "@/components/BusinessTransformation";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero onOpenModal={() => setModalOpen(true)} />
      <BusinessTransformation onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
