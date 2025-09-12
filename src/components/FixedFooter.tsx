import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MarkdownContent from "./MarkdownContent";

// Import content as strings (in a real app, you'd fetch these)
const whatWeDoContent = `# What We Do

## Modern Websites
Custom sites that you can understand, update, and truly own. No tech jargon.

## Smart Analytics  
Know your customers better with simple, actionable insights.

## "Teaching You to Fish"
When we're done, **you don't need me anymore**. You'll have the tools and knowledge to succeed independently.`;

const whyUsContent = `# Why Us?

## Enterprise Experience
Built products for startups turned Unicorn (Arcadia), successful exits (Inspire Clean Energy), and The Washington Post.

## Bay Area Local
Deep roots in our community, from San Francisco to San Jose.

## Modern Tech, Human Touch
Enterprise-level expertise with a **personal, caring approach**.

## Fair & Transparent
No hidden fees, no ongoing subscriptions. You pay once, you own it.

## Genuinely Care
Your success is my success. I'm invested in your growth.

## Community First
Supporting local small businesses means **strengthening our community** together.`;

const FixedFooter = () => {
  const buttonClasses = "px-4 py-2 font-semibold transition-all duration-300";

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
              <MarkdownContent content={whatWeDoContent} />
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
              <MarkdownContent content={whyUsContent} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </footer>
  );
};

export default FixedFooter;