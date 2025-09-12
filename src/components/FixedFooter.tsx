import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const WhatIDoContent = () => (
  <div className="space-y-4 text-left">
    <div>
      <h4 className="font-semibold text-red-fox mb-2">🌐 Modern Websites</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Custom sites that you can understand, update, and truly own. No tech jargon.
      </p>
    </div>
    
    <div>
      <h4 className="font-semibold text-red-fox mb-2">📊 Smart Analytics</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Know your customers better with simple, actionable insights.
      </p>
    </div>
    
    <div className="rounded-xl p-4 border highlight-red-fox">
      <h4 className="font-semibold text-red-fox mb-2">🎯 "Teaching You to Fish"</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        When we're done, <strong>you don't need me anymore</strong>. You'll have the tools and knowledge to succeed independently.
      </p>
    </div>
  </div>
);

const BackgroundContent = () => (
  <div className="space-y-4 text-left">
    <div>
      <h4 className="font-semibold text-red-fox mb-2">💼 Enterprise Experience</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Built products for startups turned Unicorn (Arcadia), successful exits (Inspire Clean Energy), and The Washington Post.
      </p>
    </div>
    
    <div>
      <h4 className="font-semibold text-red-fox mb-2">🏠 Bay Area Local</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Deep roots in our community, from San Francisco to San Jose.
      </p>
    </div>
    
    <div className="rounded-xl p-4 border highlight-primary">
      <h4 className="font-semibold text-primary mb-2">🎨 Modern Tech, Human Touch</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Enterprise-level expertise with a <strong>personal, caring approach</strong>.
      </p>
    </div>
  </div>
);

const WhyChooseMeContent = () => (
  <div className="space-y-4 text-left">
    <div>
      <h4 className="font-semibold text-red-fox mb-2">💰 Fair & Transparent</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        No hidden fees, no ongoing subscriptions. You pay once, you own it.
      </p>
    </div>
    
    <div>
      <h4 className="font-semibold text-red-fox mb-2">❤️ Genuinely Care</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Your success is my success. I'm invested in your growth.
      </p>
    </div>
    
    <div className="rounded-xl p-4 border highlight-accent">
      <h4 className="font-semibold text-accent mb-2">🤝 Community First</h4>
      <p className="text-sm text-red-fox/80 leading-relaxed">
        Supporting local small businesses means <strong>strengthening our community</strong> together.
      </p>
    </div>
  </div>
);

const FixedFooter = () => {
  const buttonClasses = "px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300";

  return (
    <footer className="fixed top-0 sm:bottom-0 sm:top-auto left-0 right-0 z-50 p-4">
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        <Button variant="red-fox" size="lg" className={buttonClasses} asChild>
          <a href="mailto:tommylisiak@gmail.com">
            Let's Chat
          </a>
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="red-fox" size="lg" className={buttonClasses}>
              What We Do
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] sheet-enhanced">
            <SheetHeader>
              <SheetTitle className="text-red-fox text-2xl font-bold">What We Do</SheetTitle>
            </SheetHeader>
            <div className="mt-6 px-2 sm:px-0">
              <WhatIDoContent />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="red-fox" size="lg" className={buttonClasses}>
              Background
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] sheet-enhanced">
            <SheetHeader>
              <SheetTitle className="text-primary text-2xl font-bold">Background</SheetTitle>
            </SheetHeader>
            <div className="mt-6 px-2 sm:px-0">
              <BackgroundContent />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="red-fox" size="lg" className={buttonClasses}>
              Why Us?
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px] sheet-enhanced">
            <SheetHeader>
              <SheetTitle className="text-accent text-2xl font-bold">Why Us?</SheetTitle>
            </SheetHeader>
            <div className="mt-6 px-2 sm:px-0">
              <WhyChooseMeContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </footer>
  );
};

export default FixedFooter;