import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full screen fox lab background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `url(/lovable-uploads/e3e2f15b-8783-4f7e-83c6-96fcdb4624b8.png)`
        }} 
      />
      
      {/* Glass morphism container for content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-12">
        <div 
          className="backdrop-blur-md rounded-2xl p-8 md:p-12 border border-glass shadow-glass"
          style={{
            backdropFilter: 'blur(10px)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
            boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/dc9972f7-dca5-4483-92b1-faeecbc9a92c.png" 
              alt="Red Fox Labs - Your friendly neighborhood web developer" 
              className="w-20 h-20 md:w-28 md:h-28 animate-fade-in drop-shadow-lg"
            />
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in text-foreground">
            <span className="text-red-fox drop-shadow-sm">Red Fox</span>{" "}
            <span className="text-primary drop-shadow-sm">Labs</span>
          </h1>
          
          <div className="w-20 h-1 bg-primary mx-auto mb-8 animate-scale-in rounded-full shadow-sm"></div>
          
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in font-light leading-relaxed drop-shadow-sm">
            Building digital solutions that Bay Area small businesses can actually own and manage.
          </p>
          
          <Button 
            variant="red-fox" 
            size="lg" 
            className="mb-8 px-8 py-4 text-lg font-semibold animate-fade-in shadow-glow hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="mailto:tommylisiak@gmail.com">
              Let's Chat About Your Project
            </a>
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70 animate-fade-in">
            <a 
              href="mailto:tommylisiak@gmail.com"
              className="hover:text-primary transition-colors story-link font-medium"
            >
              tommylisiak@gmail.com
            </a>
            <span className="hidden sm:block w-1 h-1 bg-foreground/40 rounded-full"></span>
            <a 
              href="https://tommylisiak.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors story-link font-medium"
            >
              tommylisiak.com
            </a>
            <span className="hidden sm:block w-1 h-1 bg-foreground/40 rounded-full"></span>
            <span className="font-medium">Bay Area, CA</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;