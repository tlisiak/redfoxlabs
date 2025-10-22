import { MapPin, Newspaper, TrendingUp, Zap } from "lucide-react";

const TrustSection = () => {
  const companies = [
    { name: "The Washington Post", icon: Newspaper },
    { name: "Arcadia", subtitle: "Unicorn Startup", icon: TrendingUp },
    { name: "Inspire Clean Energy", subtitle: "Successful Exit", icon: Zap }
  ];

  return (
    <section className="bg-background py-16 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Bay Area Local */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-fox/10 text-red-fox px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Bay Area Local</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Deep roots in our community, from San Francisco to San Jose
          </p>
        </div>

        {/* Trusted By */}
        <div className="text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted By Companies Including
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {companies.map((company, index) => {
              const Icon = company.icon;
              return (
                <div 
                  key={index}
                  className="bg-secondary rounded-lg p-6 border border-border"
                >
                  <Icon className="w-8 h-8 text-red-fox mx-auto mb-3" />
                  <p className="font-semibold text-foreground text-lg">
                    {company.name}
                  </p>
                  {company.subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {company.subtitle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
