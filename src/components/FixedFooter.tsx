import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MarkdownContent from "./MarkdownContent";
import ContactModal from "./ContactModal";
import whatWeDoContent from "@/content/what-we-do.md?raw";
import whyUsContent from "@/content/why-us.md?raw";

const FixedFooter = () => {
  return (
    <footer className="fixed top-0 sm:bottom-0 sm:top-auto left-0 right-0 z-50 p-4">
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        <ContactModal>
          <Button variant="red-fox" size="lg">
            Let's Chat
          </Button>
        </ContactModal>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg">
              What We Do
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background/95 backdrop-blur-sm border-border/50 max-w-2xl max-h-[80vh] overflow-y-auto [&>button]:text-red-fox [&>button]:hover:text-red-fox-hover">
            <DialogHeader>
              <DialogTitle className="text-red-fox text-2xl font-bold">What We Do</DialogTitle>
              <DialogDescription className="text-red-fox/80">
                Learn about our services and approach
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <MarkdownContent content={whatWeDoContent} />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="red-fox" size="lg">
              Why Us?
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background/95 backdrop-blur-sm border-border/50 max-w-2xl max-h-[80vh] overflow-y-auto [&>button]:text-red-fox [&>button]:hover:text-red-fox-hover">
            <DialogHeader>
              <DialogTitle className="text-red-fox text-2xl font-bold">Why Us?</DialogTitle>
              <DialogDescription className="text-red-fox/80">
                Discover what makes us different
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <MarkdownContent content={whyUsContent} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};

export default FixedFooter;