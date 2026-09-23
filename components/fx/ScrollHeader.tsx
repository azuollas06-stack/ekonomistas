"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; progressClassName?: string };

/**
 * Antraštė, kuri žino slinkimo būseną:
 * data-scrolled="true" praslinkus 24 px, o CSS kintamasis --progress (0–1) – kiek puslapio perskaityta.
 */
export default function ScrollHeader({ children, className, progressClassName }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.dataset.scrolled = String(window.scrollY > 24);
      el.style.setProperty("--progress", String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header ref={ref} className={className} data-scrolled="false">
      {children}
      <span className={progressClassName} aria-hidden="true" />
    </header>
  );
}
