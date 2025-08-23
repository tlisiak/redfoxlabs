import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
const Hero = () => {
  return (
    <section className="relative h-[40vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }} />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/dc9972f7-dca5-4483-92b1-faeecbc9a92c.png" 
            alt="Red Fox Labs Logo" 
            className="w-20 h-20 md:w-24 md:h-24 animate-fade-in"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          <span className="text-red-fox">Red Fox</span>{" "}
          <span className="text-primary">Labs</span>
        </h1>
        
        <div className="w-16 h-1 bg-gradient-accent mx-auto mb-6 animate-scale-in"></div>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-6 animate-fade-in">
          Empowering Bay Area Small Businesses with Modern Web Solutions
        </p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in">
          <a 
            href="mailto:hello@tommylisiak.com"
            className="hover:text-primary transition-colors story-link"
          >
            hello@tommylisiak.com
          </a>
          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
          <a 
            href="https://tommylisiak.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors story-link"
          >
            tommylisiak.com
          </a>
          <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
          <span>Bay Area, CA</span>
        </div>
      </div>
      
      {/* Subtle animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-red-fox rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary rounded-full animate-pulse opacity-80 delay-500"></div>
    </section>
  );
};
export default Hero;