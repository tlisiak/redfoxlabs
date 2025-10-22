import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ContactModal from "./ContactModal";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Why Us", href: "/#why-us" },
  ];

  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    const active = isActive(href);
    const baseClasses = mobile 
      ? "block py-2 text-lg" 
      : "text-foreground hover:text-red-fox transition-colors";
    const activeClasses = active ? "text-red-fox font-semibold" : "";
    
    return (
      <a 
        href={href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        {label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-brown-outline/20">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl sm:text-2xl text-red-fox hover:opacity-90 transition-opacity">
          Red Fox Labs
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          
          <ContactModal>
            <button className="text-foreground hover:text-red-fox transition-colors">
              Contact
            </button>
          </ContactModal>

          <ContactModal>
            <Button variant="red-fox" size="sm">
              Book a free audit
            </Button>
          </ContactModal>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} mobile />
              ))}
              
              <ContactModal>
                <button 
                  className="block py-2 text-lg text-left hover:text-red-fox transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </button>
              </ContactModal>

              <ContactModal>
                <Button 
                  variant="red-fox" 
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Book a free audit
                </Button>
              </ContactModal>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
