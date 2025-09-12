import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MarkdownContent from "./MarkdownContent";
import whatWeDoContent from "@/content/what-we-do.md?raw";
import whyUsContent from "@/content/why-us.md?raw";

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