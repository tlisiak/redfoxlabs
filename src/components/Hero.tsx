const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Bay Area Web Development
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Modern websites and smart analytics for local businesses. 
            Enterprise experience with a personal touch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;