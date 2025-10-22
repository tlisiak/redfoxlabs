import { Button } from "@/components/ui/button";
import ContactModal from "./ContactModal";
import ContentSectionModal from "./ContentSectionModal";

const FixedFooter = () => {
  return (
    <footer className="fixed top-0 sm:bottom-0 sm:top-auto left-0 right-0 z-50 p-4">
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        <ContactModal>
          <Button variant="red-fox" size="lg">
            Let's Chat
          </Button>
        </ContactModal>
        
        <ContentSectionModal
          sectionKey="what_we_do"
          title="What We Do"
          description="Learn about our services and approach"
        >
          <Button variant="red-fox" size="lg">
            What We Do
          </Button>
        </ContentSectionModal>

        <ContentSectionModal
          sectionKey="why_us"
          title="Why Us?"
          description="Discover what makes us different"
        >
          <Button variant="red-fox" size="lg">
            Why Us?
          </Button>
        </ContentSectionModal>
      </div>
    </footer>
  );
};

export default FixedFooter;