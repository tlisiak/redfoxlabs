import { Button } from "@/components/ui/button";
import DodgingFox from "@/components/DodgingFox";

interface HeroProps {
  onOpenModal: () => void;
}

const Hero = ({ onOpenModal }: HeroProps) => {
  return (
    <section className="flex-1 flex items-center justify-center bg-background px-4 py-16">
      <div className="flex flex-col items-center text-center gap-6 animate-fade-in">
        <DodgingFox onCatch={onOpenModal} />

        <h1 className="font-handwritten font-bold text-red-fox text-6xl sm:text-7xl lg:text-8xl leading-none">
          Red Fox Labs
        </h1>

        <Button
          size="lg"
          variant="organic"
          className="text-lg px-10 py-6"
          onClick={onOpenModal}
        >
          Let's build →
        </Button>
      </div>
    </section>
  );
};

export default Hero;
