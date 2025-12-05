import { MapPin, Newspaper, TrendingUp, Zap } from "lucide-react";

const TrustSection = () => {
  const companies = [
    { 
      name: "The Washington Post", 
      subtitle: "Launched 3 new revenue producing products building Washington Post's advertising tech",
      icon: Newspaper 
    },
    { 
      name: "Arcadia", 
      subtitle: "Worked on data acquisition tools to help Arcadia jump from funded startup to $500M unicorn",
      icon: TrendingUp 
    },
    { 
      name: "Inspire Clean Energy", 
      subtitle: "Supported Inspire's entire marketing and web presence from website to landing pages and user experience. Led Inspire through multiple sales and managed teams of 10+",
      icon: Zap 
    }
  ];

  return (
    <section id="why-us" className="bg-background paper-texture py-16 sm:py-20 px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Bay Area Local */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-fox/10 text-red-fox px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">North Bay local</span>
          </div>
          <p className="text-lg text-muted-foreground">
            Deep roots in our community, from Marin to Sonoma
          </p>
        </div>

        {/* Trusted By */}
        <div className="text-center">
          <h2 className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by companies including
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {companies.map((company, index) => {
              const Icon = company.icon;
              return (
                <div 
                  key={index}
                  className="bg-cream rounded-lg p-6 border border-brown-outline/20"
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
