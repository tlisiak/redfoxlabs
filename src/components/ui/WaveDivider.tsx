import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  fromColor: string;
  toColor: string;
  variant?: 'wave' | 'flat';
  withShadow?: boolean;
  withNoise?: boolean;
}

export const WaveDivider = ({ 
  className, 
  flip = false, 
  fromColor,
  toColor,
  variant = 'wave',
  withShadow = true,
  withNoise = true
}: WaveDividerProps) => {
  const shadowId = `wave-shadow-${Math.random().toString(36).substr(2, 9)}`;
  
  if (variant === 'flat') {
    return (
      <div 
        className={cn("w-full h-[60px] md:h-[80px] relative", className)}
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`
        }}
      >
        {withNoise && (
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        )}
      </div>
    );
  }

  // Elegant smooth sine wave path - full width coverage
  const wavePath = "M0,64 C120,100 240,20 360,64 C480,108 600,20 720,64 C840,108 960,20 1080,64 C1200,108 1320,20 1440,64 L1440,128 L0,128 Z";

  return (
    <div 
      className={cn(
        "w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden leading-none h-[100px] md:h-[120px] lg:h-[140px]", 
        flip && "rotate-180", 
        className
      )}
    >
      <svg
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className="w-full h-full block"
        style={{ filter: withShadow ? `url(#${shadowId})` : undefined }}
      >
        <defs>
          {/* Subtle drop shadow filter */}
          {withShadow && (
            <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={toColor} floodOpacity="0.12" />
            </filter>
          )}
        </defs>
        
        {/* Solid color wave - no gradient */}
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
