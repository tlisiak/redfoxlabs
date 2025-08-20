import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Led by <span className="text-primary">Proven Expertise</span>
          </h2>
          
          <div className="mb-12">
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Red Fox Labs is founded on a passion for building products that matter. With deep experience 
              in product leadership and a commitment to sustainability, we help teams navigate complex 
              challenges and deliver impactful solutions.
            </p>
            
            <p className="text-lg text-foreground mb-8">
              Currently serving as <span className="text-primary font-semibold">Head of Product at Scout</span>, 
              building AI-powered tools for socially responsible businesses to access non-dilutive funding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Products Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Climate Focused</div>
            </div>
          </div>
          
          <Button variant="outline" size="lg">
            Learn More About Our Approach
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;