import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  color?: string;
  opacity?: number;
}

export const WaveDivider = ({ className, flip = false, color = "hsl(var(--background))", opacity = 1 }: WaveDividerProps) => {
  return (
    <div className={cn("w-full overflow-hidden leading-none", flip && "rotate-180", className)} style={{ opacity }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-6 md:h-8"
        style={{ fill: color }}
      >
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
      </svg>
    </div>
  );
};
