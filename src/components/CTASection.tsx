import { Button } from "@/components/ui/button";
import foxMascot from "@/assets/redfox-mascot.png";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const CTASection = () => {
  return (
    <section className="relative bg-red-fox py-16 sm:py-24 px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 blob animate-blob opacity-60" />
      <div className="absolute bottom-10 right-20 w-56 h-56 bg-white/5 blob animate-blob opacity-40" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left text-white">
            <p className="font-handwritten text-2xl text-white/90 mb-3">Let's talk</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to transform your website?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
              Let's test what works for your business. No pressure, no sales pitch—just a genuine conversation about growth.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline-light"
                className="text-lg px-8 py-6 rounded-3xl hover:-translate-y-1.5 hover:scale-[1.03] transition-[transform] duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              >
                Book a free audit
              </Button>
            </a>
          </div>

          {/* Fox Mascot */}
          <div className="flex justify-center md:justify-end">
            <img 
              src={foxMascot} 
              alt="Red Fox Labs mascot" 
              width="256"
              height="256"
              loading="lazy"
              className="w-52 sm:w-72 h-auto animate-float drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
