import logoHorizontal from "@/assets/logo-horizontal.png";
import foxAnalytics from "@/assets/fox-analytics.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-28 sm:pb-32 px-4 pt-8 sm:pt-4">
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Logo Section */}
        <div className="flex justify-center mb-8 sm:mb-12 pt-6 sm:pt-0">
          <img 
            src={logoHorizontal} 
            alt="Red Fox Labs" 
            className="w-64 sm:w-80 md:w-96 h-auto animate-fade-in"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-fox leading-tight">
              Enterprise Expertise<br />
              <span className="text-red-fox/80">Small Business Prices</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-red-fox/90 leading-relaxed max-w-xl mx-auto md:mx-0">
              Built products for The Washington Post, unicorn startups, and successful exits. 
              Now bringing that expertise to Bay Area small businesses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <div className="bg-red-fox/10 backdrop-blur-sm rounded-lg p-4 border border-red-fox/20">
                <p className="text-sm text-red-fox/70 mb-1">One-Time Investment</p>
                <p className="text-lg font-semibold text-red-fox">No Subscriptions</p>
              </div>
              <div className="bg-red-fox/10 backdrop-blur-sm rounded-lg p-4 border border-red-fox/20">
                <p className="text-sm text-red-fox/70 mb-1">You Own It</p>
                <p className="text-lg font-semibold text-red-fox">Full Control</p>
              </div>
            </div>
          </div>

          {/* Right Column - Fox Image */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <img 
              src={foxAnalytics} 
              alt="Red Fox Labs mascot working on analytics" 
              className="w-full max-w-md h-auto animate-float"
            />
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-red-fox/60 mb-4">TRUSTED BY COMPANIES INCLUDING</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-red-fox/50 font-semibold text-sm sm:text-base">
            <span>The Washington Post</span>
            <span className="hidden sm:inline">•</span>
            <span>Arcadia (Unicorn)</span>
            <span className="hidden sm:inline">•</span>
            <span>Inspire Clean Energy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;