import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  toColor: string;
  variant?: 'wave' | 'flat';
  withShadow?: boolean;
  withNoise?: boolean;
}

export const WaveDivider = ({ 
  className, 
  flip = false, 
  toColor,
  variant = 'wave',
  withShadow = false,
  withNoise = true
}: WaveDividerProps) => {
  
  if (variant === 'flat') {
    return (
      <div 
        className={cn("w-full h-[60px] md:h-[80px] relative", className)}
        style={{ background: toColor }}
      >
        {withNoise && (
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        )}
      </div>
    );
  }

  // Wave path that fills from wavy top edge down to bottom
  // The wave curves between y=20 and y=60, then fills solid to y=128
  const wavePath = "M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1200,70 1320,10 1440,40 L1440,128 L0,128 Z";

  return (
    <div 
      className={cn(
        "w-screen relative left-1/2 -ml-[50vw] overflow-hidden leading-none h-[80px] md:h-[100px] lg:h-[120px]", 
        flip && "rotate-180", 
        className
      )}
    >
      <svg
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path 
          d={wavePath} 
          fill={toColor}
        />
      </svg>
      
      {/* Noise texture overlay for organic feel */}
      {withNoise && (
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
      )}
    </div>
  );
};
