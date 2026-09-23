"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = { children: ReactNode; className?: string; max?: number };

/**
 * 3D pakrypimas pagal žymeklį / pirštą. Nustato CSS kintamuosius:
 * --rx, --ry (laipsniai) ir --mx, --my (šviesos taško pozicija %). Stilius – dizaino CSS.
 */
export default function Tilt({ children, className, max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={reset} onPointerUp={reset}>
      {children}
    </div>
  );
}
