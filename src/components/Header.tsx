import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ContactModal from "./ContactModal";
import { Link } from "react-router-dom";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import foxIcon from "@/assets/redfox-mascot.png";

const BOOKING_URL = "https://calendar.app.google/EbmpDAPos3eygmpr9";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleAnchorClick } = useSmoothScroll();

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-brown-outline/20">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-red-fox hover:opacity-90 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={foxIcon} alt="Red Fox Labs" className="h-8 w-8 sm:h-10 sm:w-10" />
          Red Fox Labs
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground hover:text-red-fox transition-colors"
              onClick={(e) => handleAnchorClick(e, link.href.replace('#', ''))}
            >
              {link.label}
            </a>
          ))}
          
          <ContactModal>
            <button className="text-foreground hover:text-red-fox transition-colors">
              Contact
            </button>
          </ContactModal>

          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="red-fox" size="sm">
              Book a call
            </Button>
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-lg hover:text-red-fox transition-colors"
                  onClick={(e) => {
                    handleAnchorClick(e, link.href.replace('#', ''));
                    setIsOpen(false);
                  }}
                >
                  {link.label}
                </a>
              ))}
              
              <ContactModal>
                <button 
                  className="block py-2 text-lg text-left hover:text-red-fox transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </button>
              </ContactModal>

              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="red-fox" 
                  className="w-full mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Book a call
                </Button>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
