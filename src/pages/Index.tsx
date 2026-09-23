import { useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
