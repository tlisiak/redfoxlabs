import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{
      backgroundImage: `url(${heroImage})`
    }} />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">
            <span className="text-red-fox">Red Fox</span>{" "}
            <span className="text-primary">Labs</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-accent mx-auto mb-6"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Expert product consulting for ambitious teams building the future.
          <br />
          <span className="text-primary">Strategic guidance. Proven results.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="min-w-48">
            Start Your Project
          </Button>
          
        </div>
      </div>
      
      {/* Subtle animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-red-fox rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary rounded-full animate-pulse opacity-80 delay-500"></div>
    </section>;
};
export default Hero;