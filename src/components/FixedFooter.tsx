import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const FixedFooter = () => {
  const modalStyle = {
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
    boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
  };

  const WhatIDoContent = () => (
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
  );

  const BackgroundContent = () => (
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
  );

  const WhyChooseMeContent = () => (
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
  );

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        <Button variant="red-fox" size="lg" className="px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300" asChild>
          <a href="mailto:tommylisiak@gmail.com">
            Let's Chat
          </a>
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg" className="px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300">
              🌐 What I Do
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-md border border-glass shadow-glass" style={modalStyle}>
            <DialogHeader>
              <DialogTitle className="text-red-fox text-2xl font-bold drop-shadow-sm">What I Do</DialogTitle>
            </DialogHeader>
            <WhatIDoContent />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg" className="px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300">
              💼 My Background
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-md border border-glass shadow-glass" style={modalStyle}>
            <DialogHeader>
              <DialogTitle className="text-primary text-2xl font-bold drop-shadow-sm">My Background</DialogTitle>
            </DialogHeader>
            <BackgroundContent />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg" className="px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300">
              🤝 Why Choose Me
            </Button>
          </DialogTrigger>
          <DialogContent className="backdrop-blur-md border border-glass shadow-glass" style={modalStyle}>
            <DialogHeader>
              <DialogTitle className="text-accent text-2xl font-bold drop-shadow-sm">Why Choose Me</DialogTitle>
            </DialogHeader>
            <WhyChooseMeContent />
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};

export default FixedFooter;