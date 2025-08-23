import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
const Hero = () => {
  return (
    <header className="relative h-[25vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }} />
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src="/lovable-uploads/dc9972f7-dca5-4483-92b1-faeecbc9a92c.png" 
            alt="Red Fox Labs Logo" 
            className="w-16 h-16"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-red-fox">Red Fox</span>{" "}
              <span className="text-primary">Labs</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Empowering Bay Area Small Businesses with Modern Web Solutions
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <a 
            href="mailto:hello@tommylisiak.com"
            className="hover:text-primary transition-colors"
          >
            hello@tommylisiak.com
          </a>
          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
          <a 
            href="https://tommylisiak.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            tommylisiak.com
          </a>
          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
          <span>Bay Area, CA</span>
        </div>
      </div>
    </header>
  );
};
export default Hero;