"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

type Props = { children: ReactNode; strength?: number; className?: string };

/** Elementas lengvai „pritraukiamas“ prie žymeklio (tik pelei; lietimui ir reduced motion – nieko). */
export default function Magnetic({ children, strength = 0.28, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (e: PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      className={className}
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ display: "inline-flex", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </span>
  );
}
