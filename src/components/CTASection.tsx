import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";
import foxMascot from "@/assets/redfox-mascot.png";

const CTASection = () => {
  return (
    <section className="bg-red-fox py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to run your next experiment?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Let's test what works for your business. No pressure, no sales pitch—just a genuine conversation about growth.
            </p>
            <ContactModal>
              <Button 
                size="lg" 
                variant="outline-light"
                className="text-lg px-8 py-6 hover:scale-105 transition-transform"
              >
                Let's chat
              </Button>
            </ContactModal>
          </div>

          {/* Fox Mascot */}
          <div className="flex justify-center md:justify-end">
            <img 
              src={foxMascot} 
              alt="Red Fox Labs mascot" 
              className="w-48 sm:w-64 h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
