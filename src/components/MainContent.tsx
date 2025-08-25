import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const MainContent = () => {
  return <main className="flex-1 container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* What I Do */}
        <Card className="bg-gradient-card border-red-fox/20 shadow-card transition-smooth hover:shadow-glow rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-red-fox text-xl font-bold">What I Do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-2">🌐 Modern Websites</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Custom sites that you can understand, update, and truly own. No tech jargon.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">📊 Smart Analytics</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Know your customers better with simple, actionable insights.
                </p>
              </div>
              
              <div className="bg-red-fox/10 rounded-xl p-4 border border-red-fox/20">
                <h4 className="font-semibold text-red-fox mb-2">🎯 "Teaching You to Fish"</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When we're done, <strong>you don't need me anymore</strong>. You'll have the tools and knowledge to succeed independently.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Background */}
        <Card className="bg-gradient-card border-primary/20 shadow-card transition-smooth hover:shadow-glow rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-primary text-xl font-bold">My Background</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-2">💼 Enterprise Experience</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Built products for startups turned Unicorn (Arcadia), successful exits (Inspire Clean Energy), and The Washington Post.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">🏠 Bay Area Local</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Deep roots in our community, from San Francisco to San Jose.
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">🎨 Modern Tech, Human Touch</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enterprise-level expertise with a <strong>personal, caring approach</strong>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Me */}
        <Card className="bg-gradient-card border-accent/20 shadow-card transition-smooth hover:shadow-glow rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-accent text-xl font-bold">Why Choose Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-foreground mb-2">💰 Fair & Transparent</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No hidden fees, no ongoing subscriptions. You pay once, you own it.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">❤️ Genuinely Care</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your success is my success. I'm invested in your growth.
                </p>
              </div>
              
              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                <h4 className="font-semibold text-accent mb-2">🤝 Community First</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Supporting local small businesses means <strong>strengthening our community</strong> together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>;
};
export default MainContent;