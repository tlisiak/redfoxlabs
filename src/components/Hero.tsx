import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
type Section = 'main' | 'whatido' | 'background' | 'whychoose';
const Hero = () => {
  const [activeSection, setActiveSection] = useState<Section>('main');
  const cardStyle = {
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
    boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
  };
  const renderMainView = () => <>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-foreground">
          <span className="text-red-fox drop-shadow-sm">Red Fox</span>{" "}
          <span className="text-primary drop-shadow-sm">Labs</span>
        </h1>
        
        <div className="w-20 h-1 bg-primary mx-auto mb-6 animate-scale-in rounded-full shadow-sm"></div>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-fade-in font-light leading-relaxed drop-shadow-sm">
          Building digital solutions that Bay Area small businesses can actually own and manage.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70 animate-fade-in mb-12">
          <a href="mailto:tommylisiak@gmail.com" className="hover:text-primary transition-colors story-link font-medium">
            tommylisiak@gmail.com
          </a>
          <span className="hidden sm:block w-1 h-1 bg-foreground/40 rounded-full"></span>
          <a href="https://tommylisiak.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors story-link font-medium">
            tommylisiak.com
          </a>
          <span className="hidden sm:block w-1 h-1 bg-foreground/40 rounded-full"></span>
          <span className="font-medium">Bay Area, CA</span>
        </div>
      </div>

      <div className="border-t border-white/20 pt-8">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <Button variant="red-fox" size="lg" className="px-6 py-3 font-semibold shadow-glow hover:shadow-xl transition-all duration-300" asChild>
            <a href="mailto:tommylisiak@gmail.com">
              Let's Chat About Your Project
            </a>
          </Button>
          
          <Button variant="default" size="lg" onClick={() => setActiveSection('whatido')} className="px-6 py-3 font-semibold transition-all duration-300">
            🌐 What I Do
          </Button>
          
          <Button variant="secondary" size="lg" onClick={() => setActiveSection('background')} className="px-6 py-3 font-semibold transition-all duration-300">
            💼 My Background
          </Button>
          
          <Button variant="hero" size="lg" onClick={() => setActiveSection('whychoose')} className="px-6 py-3 font-semibold transition-all duration-300">
            🤝 Why Choose Me
          </Button>
        </div>
      </div>
    </>;
  const renderWhatIDo = () => <>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setActiveSection('main')} className="hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-red-fox text-2xl font-bold drop-shadow-sm">What I Do</h2>
      </div>
      <div className="space-y-4 text-left">
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
        
        <div className="rounded-xl p-4 border" style={{
        background: 'linear-gradient(135deg, rgba(213, 77, 39, 0.15), rgba(213, 77, 39, 0.08))',
        borderColor: 'rgba(213, 77, 39, 0.3)'
      }}>
          <h4 className="font-semibold text-red-fox mb-2 drop-shadow-sm">🎯 "Teaching You to Fish"</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            When we're done, <strong>you don't need me anymore</strong>. You'll have the tools and knowledge to succeed independently.
          </p>
        </div>
      </div>
    </>;
  const renderBackground = () => <>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setActiveSection('main')} className="hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-primary text-2xl font-bold drop-shadow-sm">My Background</h2>
      </div>
      <div className="space-y-4 text-left">
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
        
        <div className="rounded-xl p-4 border" style={{
        background: 'linear-gradient(135deg, rgba(191, 109, 56, 0.15), rgba(191, 109, 56, 0.08))',
        borderColor: 'rgba(191, 109, 56, 0.3)'
      }}>
          <h4 className="font-semibold text-primary mb-2 drop-shadow-sm">🎨 Modern Tech, Human Touch</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Enterprise-level expertise with a <strong>personal, caring approach</strong>.
          </p>
        </div>
      </div>
    </>;
  const renderWhyChooseMe = () => <>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => setActiveSection('main')} className="hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-accent text-2xl font-bold drop-shadow-sm">Why Choose Me</h2>
      </div>
      <div className="space-y-4 text-left">
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
        
        <div className="rounded-xl p-4 border" style={{
        background: 'linear-gradient(135deg, rgba(237, 176, 89, 0.15), rgba(237, 176, 89, 0.08))',
        borderColor: 'rgba(237, 176, 89, 0.3)'
      }}>
          <h4 className="font-semibold text-accent mb-2 drop-shadow-sm">🤝 Community First</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Supporting local small businesses means <strong>strengthening our community</strong> together.
          </p>
        </div>
      </div>
    </>;
  const renderContent = () => {
    switch (activeSection) {
      case 'whatido':
        return renderWhatIDo();
      case 'background':
        return renderBackground();
      case 'whychoose':
        return renderWhyChooseMe();
      default:
        return renderMainView();
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="backdrop-blur-md rounded-2xl p-8 md:p-12 border border-glass shadow-glass min-h-[600px] flex flex-col justify-center" style={cardStyle}>
          {renderContent()}
        </div>
      </div>
    </section>;
};
export default Hero;