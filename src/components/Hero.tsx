const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in text-foreground">
            Building digital solutions that Bay Area small businesses can actually own and manage.
          </h1>
          
          <div className="w-20 h-1 bg-primary mx-auto mb-8 animate-scale-in rounded-full shadow-sm"></div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-foreground/70 animate-fade-in">
            <a href="mailto:tommylisiak@gmail.com" className="hover:text-primary transition-colors story-link font-medium">
              tommylisiak@gmail.com
            </a>
            <span className="hidden sm:block w-1 h-1 bg-foreground/40 rounded-full"></span>
            <a href="https://tommylisiak.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors story-link font-medium">
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