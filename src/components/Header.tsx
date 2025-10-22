import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ChevronDown } from "lucide-react";
import ContactModal from "./ContactModal";
import { Link, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Why Us", href: "/#why-us" },
  ];

  const serviceLinks = [
    { label: "All Services", href: "/services" },
    { label: "Web Design", href: "/web-design" },
    { label: "Local SEO", href: "/local-seo" },
    { label: "Site Care", href: "/site-care" },
    { label: "Analytics", href: "/analytics" },
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
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-red-fox transition-colors focus:outline-none">
              Services
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-brown-outline/20 z-50">
              {serviceLinks.map((service) => (
                <DropdownMenuItem key={service.href} asChild>
                  <Link 
                    to={service.href}
                    className="cursor-pointer hover:text-red-fox"
                  >
                    {service.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
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
              
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-lg text-left hover:text-red-fox transition-colors">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 mt-2 flex flex-col gap-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.href}
                      to={service.href}
                      className="block py-2 text-base hover:text-red-fox transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.label}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
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
