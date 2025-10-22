import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";
import ContentSectionModal from "./ContentSectionModal";

const FixedFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-background via-background/95 to-background/0 backdrop-blur-sm">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        <ContactModal>
          <Button variant="red-fox" size="lg" className="text-sm sm:text-base px-4 sm:px-6">
            Let's Chat
          </Button>
        </ContactModal>
        
        <ContentSectionModal
          sectionKey="what_we_do"
          title="What We Do"
          description="Learn about our services and approach"
        >
          <Button variant="red-fox" size="lg" className="text-sm sm:text-base px-4 sm:px-6">
            What We Do
          </Button>
        </ContentSectionModal>

        <ContentSectionModal
          sectionKey="why_us"
          title="Why Us?"
          description="Discover what makes us different"
        >
          <Button variant="red-fox" size="lg" className="text-sm sm:text-base px-4 sm:px-6">
            Why Us?
          </Button>
        </ContentSectionModal>
      </div>
    </footer>
  );
};

export default FixedFooter;