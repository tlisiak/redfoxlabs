import logoHorizontal from "@/assets/logo-horizontal.png";
import foxAnalytics from "@/assets/fox-analytics.png";

const Hero = () => {
  return (
    <section className="bg-background py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <img 
            src={logoHorizontal} 
            alt="Red Fox Labs" 
            className="w-64 sm:w-80 md:w-96 h-auto"
          />
        </div>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Enterprise Expertise<br />
              <span className="text-red-fox">Small Business Prices</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Built products for The Washington Post, unicorn startups, and successful exits. 
              Now bringing that expertise to Bay Area small businesses.
            </p>

            {/* Value Props */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto lg:mx-0">
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">One-Time Investment</p>
                <p className="text-lg font-semibold text-foreground">No Subscriptions</p>
              </div>
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <p className="text-sm text-muted-foreground mb-2">You Own It</p>
                <p className="text-lg font-semibold text-foreground">Full Control</p>
              </div>
            </div>
          </div>

          {/* Right Column - Fox Image */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src={foxAnalytics} 
              alt="Red Fox Labs mascot working on analytics" 
              className="w-full max-w-md lg:max-w-lg h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
