import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";
import foxIcon from "@/assets/redfox-mascot.png";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="flex-1 flex items-center justify-center bg-background px-4 py-16">
      {/* Logo lockup — fox mascot + wordmark + CTA as one contained unit */}
      <div className="flex flex-col items-center text-center gap-5 animate-fade-in">
        <img
          src={foxIcon}
          alt="Red Fox Labs"
          className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-lg hover:animate-wiggle"
        />

        <span className="font-handwritten text-red-fox text-6xl sm:text-7xl lg:text-8xl leading-none">
          Red Fox Labs
        </span>

        <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl">
          The details most studios skip are the ones we obsess over.
        </p>

        <Button
          size="lg"
          variant="organic"
          className="text-lg px-10 py-6 mt-2"
          onClick={() => setModalOpen(true)}
        >
          Let's build →
        </Button>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Hero;
