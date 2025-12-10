import { Award, MapPin, Newspaper, Rocket, TrendingUp, Zap } from "lucide-react";

const TrustSection = () => {
  const companies = [
    { 
      name: "The Washington Post", 
      subtitle: "Built ad-tech platform for 600+ publishers. Won 2021 Engineering Innovation Award for web performance.",
      icon: Newspaper 
    },
    { 
      name: "Arcadia", 
      subtitle: "Reduced user verification from 9 days to 1 day. Built tools powering 100k+ users of clean energy programs.",
      icon: TrendingUp 
    },
    { 
      name: "Inspire (acquired by Shell)", 
      subtitle: "3x conversion improvement (5% → 15%). Cut site load time from 5s to 1.9s. Doubled user retention.",
      icon: Zap 
    },
    { 
      name: "Scout", 
      subtitle: "AI platform helping founders secure $10M+ in funding. 20x reduction in grant-prep time for 1k+ users.",
      icon: Rocket 
    }
  ];

  const stats = [
    { value: "600+", label: "Publishers Served" },
    { value: "100k+", label: "Users Powered" },
    { value: "3x", label: "Conversion Gains" },
    { value: "$10M+", label: "Funding Secured" },
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

        {/* By the Numbers */}
        <div className="mb-16">
          <h2 className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider text-center">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-4"
              >
                <p className="text-3xl sm:text-4xl font-bold text-red-fox mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted By */}
        <div className="text-center">
          <h2 className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by companies including
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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

          {/* Award Badge */}
          <div className="mt-8 inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">2021 Engineering Innovation Award – Washington Post</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
