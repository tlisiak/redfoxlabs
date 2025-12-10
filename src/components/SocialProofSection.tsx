import { Award, MapPin } from "lucide-react";

const SocialProofSection = () => {
  const stats = [
    { value: "600+", label: "Publishers Served" },
    { value: "100k+", label: "Users Powered" },
    { value: "3x", label: "Conversion Gains" },
    { value: "$10M+", label: "Funding Secured" },
  ];

  const companies = ["Washington Post", "Arcadia", "Inspire (Shell)", "Scout"];

  return (
    <section id="proof" className="py-16 sm:py-20 px-4 bg-background paper-texture">
      <div className="max-w-4xl mx-auto text-center">
        {/* Bay Area Badge */}
        <div className="inline-flex items-center gap-2 bg-red-fox/10 text-red-fox px-4 py-2 rounded-full mb-12">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">Bay Area based</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-red-fox mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Companies */}
        <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
          Experience from
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {companies.map((company, index) => (
            <span 
              key={index}
              className="bg-cream px-4 py-2 rounded-full text-sm font-medium text-foreground border border-brown-outline/10"
            >
              {company}
            </span>
          ))}
        </div>

        {/* Award Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
          <Award className="w-4 h-4" />
          <span className="text-sm font-medium">2021 Engineering Innovation Award</span>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
