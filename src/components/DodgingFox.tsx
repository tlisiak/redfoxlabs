import { useCallback, useEffect, useRef, useState } from "react";
import foxIcon from "@/assets/redfox-mascot.png";

interface DodgingFoxProps {
  onCatch: () => void;
}

// How close (px from the fox's center) the cursor can get before it bolts
const FLEE_RADIUS = 130;
// How far it jumps per dodge
const JUMP = 220;
// Keep this much space between the fox and the viewport edge
const EDGE = 16;

/**
 * Fox mascot that sits still on load, then scampers away from the cursor
 * as it gets close. Catch it (click) and it opens the contact modal.
 */
const DodgingFox = ({ onCatch }: DodgingFoxProps) => {
  // The wrapper never moves, so it marks the fox's home spot. Measuring the
  // fox itself mid-transition would give its animated position, not its target.
  const homeRef = useRef<HTMLSpanElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  const move = useCallback((x: number, y: number) => {
    offset.current = { x, y };
    setPos({ x, y });
    setDodges((d) => d + 1);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = homeRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 + offset.current.x;
      const cy = rect.top + rect.height / 2 + offset.current.y;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.hypot(dx, dy);
      if (dist > FLEE_RADIUS) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const halfW = rect.width / 2 + EDGE;
      const halfH = rect.height / 2 + EDGE;
      const inBounds = (x: number, y: number) =>
        x >= halfW && x <= vw - halfW && y >= halfH && y <= vh - halfH;

      // Run directly away from the cursor, with a bit of randomness so it
      // doesn't feel mechanical
      const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.9;
      let nx = cx + Math.cos(angle) * JUMP;
      let ny = cy + Math.sin(angle) * JUMP;

      // Cornered: teleport somewhere random that's well clear of the cursor
      if (!inBounds(nx, ny)) {
        for (let i = 0; i < 20; i++) {
          const rx = halfW + Math.random() * (vw - halfW * 2);
          const ry = halfH + Math.random() * (vh - halfH * 2);
          if (Math.hypot(rx - e.clientX, ry - e.clientY) > FLEE_RADIUS * 2) {
            nx = rx;
            ny = ry;
            break;
          }
        }
        nx = Math.min(Math.max(nx, halfW), vw - halfW);
        ny = Math.min(Math.max(ny, halfH), vh - halfH);
      }

      move(offset.current.x + (nx - cx), offset.current.y + (ny - cy));
    };

    // Layout shifts on resize would strand the fox off-screen; send it home
    const onResize = () => move(0, 0);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, [move]);

  return (
    <span ref={homeRef} className="inline-block">
      <button
        type="button"
        onClick={onCatch}
        aria-label="Red Fox Labs — get in touch"
        className="relative z-10 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/40"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <img
          // Re-keying replays the wiggle on every dodge
          key={dodges}
          src={foxIcon}
          alt=""
          draggable={false}
          className={`w-36 h-36 sm:w-44 sm:h-44 drop-shadow-lg select-none ${dodges ? "animate-dodge" : ""}`}
        />
      </button>
    </span>
  );
};

export default DodgingFox;
