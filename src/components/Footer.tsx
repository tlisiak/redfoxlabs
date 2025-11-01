import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";

const Footer = () => {
  return (
    <footer className="bg-brown-outline text-cream py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Branding + NAP */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-cream">Red Fox Labs</h3>
            <p className="text-sm text-cream/90 mb-3">North Bay Web Design & SEO</p>
            <div className="space-y-2 text-sm text-cream/80">
              <p className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <span>Serving Marin & Sonoma Counties</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="shrink-0">📧</span>
                <span>hello@redfoxlabs.com</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-cream">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>
                <a href="/" className="hover:text-cream transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-cream transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-cream transition-colors">
                  Why Us
                </a>
              </li>
              <li>
                <ContactModal>
                  <button className="hover:text-cream transition-colors text-left">
                    Contact
                  </button>
                </ContactModal>
              </li>
            </ul>
          </div>

          {/* Column 3: Service Area */}
          <div>
            <h4 className="font-semibold mb-4 text-cream">Service Area</h4>
            <p className="text-sm text-cream/80 leading-relaxed">
              Proudly serving small businesses across Marin and Sonoma Counties—from San Rafael to Santa Rosa and everywhere in between.
            </p>
          </div>

          {/* Column 4: Mini CTA */}
          <div>
            <h4 className="font-semibold mb-4 text-cream">Get Started</h4>
            <p className="text-sm text-cream/80 mb-4">
              Ready to grow your business online?
            </p>
            <ContactModal>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-cream text-cream hover:bg-cream hover:text-brown-outline transition-colors"
              >
                Book your free audit →
              </Button>
            </ContactModal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/20 pt-6 text-center text-sm text-cream/70">
          <p>© {new Date().getFullYear()} Red Fox Labs LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
