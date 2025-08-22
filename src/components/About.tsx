import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Strategic Product Leadership You Can Trust
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              With over a decade of experience in product strategy and development, 
              Red Fox Labs brings proven expertise to ambitious teams building the future.
            </p>
            <p className="text-muted-foreground mb-8">
              We've helped startups scale from MVP to market leadership and guided 
              established companies through digital transformation. Our strategic approach 
              combines data-driven insights with creative problem-solving to deliver 
              sustainable product success.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">10+ years product strategy experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">50+ successful product launches</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-foreground">Proven track record across industries</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-card rounded-2xl p-8 border border-red-fox/20 shadow-card backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Why Choose Red Fox Labs?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Strategic vision aligned with business goals</li>
                <li>• Data-driven decision making framework</li>
                <li>• Agile methodology and rapid iteration</li>
                <li>• Cross-functional team collaboration</li>
                <li>• Market-tested validation processes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;