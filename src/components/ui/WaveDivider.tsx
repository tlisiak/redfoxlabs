import { cn } from "@/lib/utils";

interface WaveDividerProps {
  colorVar: 'background' | 'warm-beige' | 'red-fox';
  className?: string;
}

export const WaveDivider = ({ colorVar, className }: WaveDividerProps) => {
  const d = "M0,24 C160,64 320,0 480,24 C640,48 800,0 960,24 C1120,48 1280,0 1440,24 L1440,128 L0,128 Z";

  return (
    <div 
      className={cn(
        "absolute top-0 left-1/2 -ml-[50vw] w-screen h-[64px] sm:h-[80px] z-10",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <path 
          d={d} 
          style={{ fill: `hsl(var(--${colorVar}))` }}
          shapeRendering="geometricPrecision" 
        />
      </svg>
    </div>
  );
};
