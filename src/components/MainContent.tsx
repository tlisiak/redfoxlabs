import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MainContent = () => {
  return (
    <main className="flex-1 container mx-auto px-6 py-4">
      <div className="grid md:grid-cols-3 gap-6 h-full">
        
        {/* Column 1: Services & Philosophy */}
        <Card className="bg-gradient-card border-red-fox/20 shadow-card hover-scale">
          <CardHeader>
            <CardTitle className="text-red-fox text-lg">Build Your Digital Foundation</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Web Development & Modern Tech Solutions
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Web Development Made Simple</h4>
                    <p className="text-xs text-muted-foreground">
                      Custom websites that you can actually understand and manage. No tech jargon, no ongoing dependency.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Analytics & AI Integration</h4>
                    <p className="text-xs text-muted-foreground">
                      Modern tools to find new customers and understand your audience - explained in plain English.
                    </p>
                  </div>
                  
                  <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                    <h4 className="font-semibold text-primary mb-1 text-sm">"Teaching You to Fish" Philosophy</h4>
                    <p className="text-xs text-muted-foreground">
                      When our project is done, <strong>you don't need me anymore</strong>. I build solutions you can own and manage independently.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Column 2: Experience & Credibility */}
        <Card className="bg-gradient-card border-primary/20 shadow-card hover-scale">
          <CardHeader>
            <CardTitle className="text-primary text-lg">Proven Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="experience" className="border-none">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Washington Post & Unicorn Company Background
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Enterprise-Level Expertise</h4>
                    <p className="text-xs text-muted-foreground">
                      Built products for major organizations and fast-growing startups. Enterprise-level expertise, small business approach.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Web Development Specialist</h4>
                    <p className="text-xs text-muted-foreground">
                      Modern websites, e-commerce platforms, and digital tools that actually help your business grow.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Bay Area Local Expert</h4>
                    <p className="text-xs text-muted-foreground">
                      Deep understanding of the local market, from San Francisco to San Jose. I know what works here.
                    </p>
                  </div>
                  
                  <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                    <p className="text-xs text-muted-foreground">
                      <strong>Making modern tech accessible</strong> to help you compete with the big players while staying true to your values.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Column 3: Community & Values */}
        <Card className="bg-gradient-card border-accent/20 shadow-card hover-scale">
          <CardHeader>
            <CardTitle className="text-accent text-lg">Community-Focused Values</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="values" className="border-none">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">
                  Fair Pricing & Community Investment
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Fair & Transparent Pricing</h4>
                    <p className="text-xs text-muted-foreground">
                      No hidden fees, no ongoing subscriptions. You pay for the work, you own the result.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Passionate About Helping People</h4>
                    <p className="text-xs text-muted-foreground">
                      I genuinely care about your success. Your growth is my success metric.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Bay Area Community Investment</h4>
                    <p className="text-xs text-muted-foreground">
                      Supporting local small businesses means supporting our community. Let's build something great together.
                    </p>
                  </div>
                  
                  <div className="bg-red-fox/10 rounded-lg p-3 border border-red-fox/20">
                    <h4 className="font-semibold text-red-fox mb-1 text-sm">Done = Independent</h4>
                    <p className="text-xs text-muted-foreground">
                      When I finish your project, you're <strong>completely independent</strong>. No vendor lock-in, no ongoing dependency.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Button 
              variant="red-fox" 
              size="sm" 
              className="w-full mt-4"
              asChild
            >
              <a href="mailto:hello@tommylisiak.com">
                Let's Build Together
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MainContent;