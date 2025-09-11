import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogPortal,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FixedFooter = () => {
  const modalStyle = {
    backdropFilter: 'blur(10px)',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))',
    boxShadow: '0 8px 32px 0 rgba(51, 38, 24, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
  };

  // Custom DialogContent without overlay
  const CustomDialogContent = ({ className, children, ...props }: any) => (
    <DialogPortal>
      <DialogPrimitive.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg backdrop-blur-md border border-glass shadow-glass",
          className
        )}
        style={modalStyle}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none text-white hover:text-white/80">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );

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
          <CustomDialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-fox text-2xl font-bold drop-shadow-sm">What I Do</DialogTitle>
            </DialogHeader>
            <WhatIDoContent />
          </CustomDialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg" className="px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300">
              💼 My Background
            </Button>
          </DialogTrigger>
          <CustomDialogContent>
            <DialogHeader>
              <DialogTitle className="text-primary text-2xl font-bold drop-shadow-sm">My Background</DialogTitle>
            </DialogHeader>
            <BackgroundContent />
          </CustomDialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg" className="px-4 py-2 font-semibold shadow-glow hover:shadow-xl transition-all duration-300">
              🤝 Why Choose Me
            </Button>
          </DialogTrigger>
          <CustomDialogContent>
            <DialogHeader>
              <DialogTitle className="text-accent text-2xl font-bold drop-shadow-sm">Why Choose Me</DialogTitle>
            </DialogHeader>
            <WhyChooseMeContent />
          </CustomDialogContent>
        </Dialog>
      </div>
    </footer>
  );
};

export default FixedFooter;