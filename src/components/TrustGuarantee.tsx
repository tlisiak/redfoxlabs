import { CheckCircle, Clock, Shield, Users } from "lucide-react";

const TrustGuarantee = () => {
  const process = [
    {
      step: "1",
      title: "Discover",
      description: "We learn about your business and goals",
      icon: Users,
    },
    {
      step: "2",
      title: "Design",
      description: "Create mockups & get your feedback",
      icon: CheckCircle,
    },
    {
      step: "3",
      title: "Build & Optimize",
      description: "Develop & test everything",
      icon: Shield,
    },
    {
      step: "4",
      title: "Launch & Train",
      description: "Go live & teach you to manage it",
      icon: Clock,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-warm-beige paper-texture">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-4">
          Why Businesses Trust Us
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Transparent process, clear deliverables, and a genuine commitment to your success
        </p>

        {/* Guarantee */}
        <div className="bg-card p-6 sm:p-8 rounded-xl border-2 border-red-fox/20 mb-12 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-fox/10 rounded-full flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-red-fox" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-red-fox mb-3">
                Our Guarantee
              </h3>
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                Flat fee, clear deliverables, no hidden costs. You'll know exactly 
                what you're getting before we start. If you're not happy, we make it right.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Process */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            Our Simple 4-Step Process
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step}
                  className="bg-card p-6 rounded-xl border border-brown-outline/20 hover-lift text-center"
                >
                  <div className="w-16 h-16 bg-red-fox/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-fox">{item.step}</span>
                  </div>
                  <Icon className="w-6 h-6 text-red-fox mx-auto mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="text-center bg-card p-6 sm:p-8 rounded-xl border border-brown-outline/20 max-w-2xl mx-auto">
          <Clock className="w-10 h-10 text-red-fox mx-auto mb-4" />
          <p className="text-lg sm:text-xl text-foreground">
            <strong className="text-red-fox">Typical timeline:</strong>{" "}
            2-3 weeks from kickoff to launch
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Rush projects available for urgent needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustGuarantee;
