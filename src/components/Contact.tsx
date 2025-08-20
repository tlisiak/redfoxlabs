import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-primary">Transform</span> Your Product?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Let's discuss how Red Fox Labs can accelerate your product success with strategic consulting 
            and proven leadership.
          </p>
          
          <Card className="bg-gradient-card border-border shadow-card max-w-2xl mx-auto mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Get Started Today</CardTitle>
              <CardDescription className="text-foreground">
                Schedule a consultation to explore how we can help achieve your product goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="flex-1">
                  Schedule Consultation
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Send a Message
                </Button>
              </div>
              
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Or connect with us directly:
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="secondary" size="sm">
                    LinkedIn
                  </Button>
                  <Button variant="secondary" size="sm">
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;