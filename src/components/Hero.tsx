import { Button } from "@/components/ui/button";
import DodgingFox from "@/components/DodgingFox";

interface HeroProps {
  onOpenModal: () => void;
}

const Hero = ({ onOpenModal }: HeroProps) => {
  return (
    <section className="flex-1 flex items-center justify-center bg-background px-4 py-16 [@media(max-height:700px)]:pt-40 lg:pt-48">
      <div className="relative flex flex-col items-center text-center gap-6 animate-fade-in">
        {/* The fox floats above the wordmark instead of taking up space, so
            the wordmark + CTA are what gets centered. On laptops the section's
            extra top padding offsets the footer, landing them dead center on
            screen; on phones they sit a bit higher, centered in the beige area
            (short phones get extra top padding so the fox has headroom). */}
        <div className="absolute bottom-full mb-6">
          <DodgingFox onCatch={onOpenModal} />
        </div>

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
