import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative h-[55vh] md:h-[60vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/dc9972f7-dca5-4483-92b1-faeecbc9a92c.png" 
            alt="Red Fox Labs - Your friendly neighborhood web developer" 
            className="w-20 h-20 md:w-28 md:h-28 animate-fade-in drop-shadow-glow"
          />
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-red-fox">Red Fox</span>{" "}
          <span className="text-primary">Labs</span>
        </h1>
        
        <div className="w-20 h-1 bg-gradient-accent mx-auto mb-8 animate-scale-in rounded-full"></div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in font-light leading-relaxed">
          Your friendly neighborhood web developer.<br />
          <span className="text-lg md:text-xl">Building digital solutions that Bay Area small businesses can actually own and manage.</span>
        </p>
        
        <Button 
          variant="red-fox" 
          size="lg" 
          className="mb-8 px-8 py-4 text-lg font-semibold animate-fade-in shadow-glow"
          asChild
        >
          <a href="mailto:hello@tommylisiak.com">
            Let's Chat About Your Project
          </a>
        </Button>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in">
          <a 
            href="mailto:hello@tommylisiak.com"
            className="hover:text-primary transition-colors story-link"
          >
            hello@tommylisiak.com
          </a>
          <span className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></span>
          <a 
            href="https://tommylisiak.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors story-link"
          >
            tommylisiak.com
          </a>
          <span className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></span>
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