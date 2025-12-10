import { Heart, Building2, GraduationCap, TrendingUp } from "lucide-react";
import { WaveDivider } from "@/components/ui/WaveDivider";

const MissionSection = () => {
  const stats = [
    { value: "81%", label: "of consumers research online before buying" },
    { value: "88%", label: "of local searchers visit or call within 24 hours" },
    { value: "31%", label: "of shoppers avoid businesses without websites" },
  ];

  return (
    <section id="mission" className="relative py-20 sm:py-28 px-4 bg-background paper-texture overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-48 h-48 bg-red-fox/5 blob animate-blob opacity-60" />
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-warm-beige/60 blob animate-blob opacity-50" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-handwritten text-2xl text-red-fox mb-2">The Mission</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why I Do This
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Turning 8+ years of enterprise experience into tools that help local businesses thrive.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 mb-16">
          {/* Left: Experience */}
          <div className="card-organic bg-background p-8">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-fox/10 blob-sm flex items-center justify-center">
                <Building2 className="w-6 h-6 text-red-fox" />
              </div>
              Where I Come From
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I've spent 8+ years helping build products for companies large and small—from implementing new technology at Fortune 500 companies to working with universities and key innovators to secure funding using AI.
              </p>
              <p>
                Along the way, I've helped serve <span className="text-foreground font-medium">600+ publishers</span>, power platforms with <span className="text-foreground font-medium">100,000+ users</span>, and contribute to products that secured <span className="text-foreground font-medium">$10M+ in funding</span>.
              </p>
            </div>
          </div>

          {/* Right: Mission */}
          <div className="card-organic bg-background p-8">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-fox/10 blob-sm flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-fox" />
              </div>
              Why Small Business
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I want to turn around and devote my time to helping small businesses compete in an ever-growing tech-focused world.
              </p>
              <p>
                Even if you run a small restaurant, having a functional web presence can be the difference between thriving and just surviving. Whether it's displaying menus, managing stock lists, or enabling online ordering—a solid presence helps grab customers <em>and</em> gets you referenced on Google, Yelp, and even AI assistants like ChatGPT.
              </p>
            </div>
          </div>
        </div>

        {/* Community Callout */}
        <div className="card-organic bg-warm-beige p-6 sm:p-8 mb-14">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-red-fox/10 blob-sm flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-red-fox" />
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-2 text-lg">Small businesses are vital to local communities</h4>
              <p className="text-muted-foreground leading-relaxed">
                They need to compete with large companies who have limitless funding and dedicated tech teams. Even small changes—a faster website, better SEO, clearer messaging—can make a world of difference. That's where I come in.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <p className="font-handwritten text-xl text-red-fox mb-6 flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Why Web Presence Matters
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card-organic bg-cream p-6">
                <p className="text-3xl sm:text-4xl font-bold text-red-fox mb-2 font-handwritten">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-foreground font-medium text-lg">
          Small businesses deserve enterprise-level tools at fair prices.
        </p>
      </div>
      
      {/* Wavy divider */}
      <WaveDivider color="hsl(35 38% 90%)" className="mt-16" />
    </section>
  );
};

export default MissionSection;
