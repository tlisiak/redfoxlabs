import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-beige px-4">
      <div className="text-center max-w-lg">
        {/* Fun 404 graphic */}
        <div className="text-8xl mb-6 animate-fade-in">🦊</div>
        
        <h1 className="text-4xl sm:text-5xl font-bold text-red-fox mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-xl text-foreground mb-8 leading-relaxed">
          Looks like this fox went down the wrong trail. Let's get you back on track!
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="red-fox" size="lg" asChild>
            <a href="/">Go Home</a>
          </Button>
          <ContactModal>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </ContactModal>
        </div>

        {/* Popular links */}
        <div className="text-sm text-muted-foreground">
          <p className="mb-3 font-medium">Looking for something specific?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/#services" className="hover:text-red-fox transition-colors">
              Services
            </a>
            <span className="text-muted-foreground/50">•</span>
            <a href="/#why-us" className="hover:text-red-fox transition-colors">
              Why Us
            </a>
            <span className="text-muted-foreground/50">•</span>
            <ContactModal>
              <button className="hover:text-red-fox transition-colors">
                Contact
              </button>
            </ContactModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
