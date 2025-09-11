import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MainContent = () => {
  return (
    <main className="relative flex-1 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* What I Do */}
          <Card 
            className="rounded-2xl border border-glass shadow-glass transition-all duration-300 hover:shadow-xl"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
              boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-red-fox text-xl font-bold drop-shadow-sm">What I Do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 drop-shadow-sm">🌐 Modern Websites</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Custom sites that you can understand, update, and truly own. No tech jargon.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2 drop-shadow-sm">📊 Smart Analytics</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Know your customers better with simple, actionable insights.
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-4 border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(213, 77, 39, 0.15), rgba(213, 77, 39, 0.08))',
                    borderColor: 'rgba(213, 77, 39, 0.3)'
                  }}
                >
                  <h4 className="font-semibold text-red-fox mb-2 drop-shadow-sm">🎯 "Teaching You to Fish"</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    When we're done, <strong>you don't need me anymore</strong>. You'll have the tools and knowledge to succeed independently.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Background */}
          <Card 
            className="rounded-2xl border border-glass shadow-glass transition-all duration-300 hover:shadow-xl"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
              boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-primary text-xl font-bold drop-shadow-sm">My Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 drop-shadow-sm">💼 Enterprise Experience</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">Built products for startups turned Unicorn (Arcadia), successful exits (Inspire Clean Energy), and The Washington Post.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2 drop-shadow-sm">🏠 Bay Area Local</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Deep roots in our community, from San Francisco to San Jose.
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-4 border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(191, 109, 56, 0.15), rgba(191, 109, 56, 0.08))',
                    borderColor: 'rgba(191, 109, 56, 0.3)'
                  }}
                >
                  <h4 className="font-semibold text-primary mb-2 drop-shadow-sm">🎨 Modern Tech, Human Touch</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Enterprise-level expertise with a <strong>personal, caring approach</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose Me */}
          <Card 
            className="rounded-2xl border border-glass shadow-glass transition-all duration-300 hover:shadow-xl"
            style={{
              backdropFilter: 'blur(10px)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
              boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-accent text-xl font-bold drop-shadow-sm">Why Choose Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 drop-shadow-sm">💰 Fair & Transparent</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    No hidden fees, no ongoing subscriptions. You pay once, you own it.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2 drop-shadow-sm">❤️ Genuinely Care</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Your success is my success. I'm invested in your growth.
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-4 border"
                  style={{
                    background: 'linear-gradient(135deg, rgba(237, 176, 89, 0.15), rgba(237, 176, 89, 0.08))',
                    borderColor: 'rgba(237, 176, 89, 0.3)'
                  }}
                >
                  <h4 className="font-semibold text-accent mb-2 drop-shadow-sm">🤝 Community First</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Supporting local small businesses means <strong>strengthening our community</strong> together.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
export default MainContent;