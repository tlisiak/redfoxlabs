import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="flex-1 flex items-center justify-center bg-background px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in">
          Product. Strategy. <span className="font-handwritten text-red-fox">Design.</span>
        </h1>

        <p
          className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-xl mx-auto animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          We build efficient digital products that just work. No fluff, no subscriptions.
        </p>

        <p
          className="text-sm text-muted-foreground mb-10 animate-fade-in"
          style={{ animationDelay: '0.15s' }}
        >
          One-time investment · You own everything
        </p>

        <div
          className="mb-12 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <Button
            size="lg"
            variant="organic"
            className="text-lg px-10 py-6"
            onClick={() => setModalOpen(true)}
          >
            Let's build →
          </Button>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Hero;
