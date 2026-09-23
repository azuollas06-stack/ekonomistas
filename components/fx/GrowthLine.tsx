"use client";

import { useEffect, useRef } from "react";

// Deterministinė „augimo“ kreivė: tendencija į dešinę su nedideliais svyravimais.
function buildPath() {
  const pts: [number, number][] = [];
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647 - 0.5;
  };
  for (let y = 0; y <= 1000; y += 40) {
    const trend = 8 + 80 * Math.pow(y / 1000, 1.5);
    pts.push([Math.max(4, Math.min(96, trend + rand() * 14)), y]);
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const my = (y0 + y1) / 2;
    d += ` C${x0.toFixed(1)},${my} ${x1.toFixed(1)},${my} ${x1.toFixed(1)},${y1}`;
  }
  return d;
}
const PATH = buildPath();

type Props = { className?: string; lineClassName?: string; trackClassName?: string };

/**
 * Kreivė, kuri „piešiasi“ slenkant per tėvinį konteinerį.
 * Taip pat pažymi [data-node] elementus atributu data-active, kai kreivė juos pasiekia.
 */
export default function GrowthLine({ className, lineClassName, trackClassName }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const line = lineRef.current;
    const host = svg?.parentElement?.parentElement;
    if (!svg || !line || !host) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(host.querySelectorAll<HTMLElement>("[data-node]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.65 - r.top) / r.height));
      // „Piešimas“ – atkerpame dar nenueitą kreivės dalį nuo apačios.
      line.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(2)}% 0)`;
      for (const n of nodes) {
        n.dataset.active = String(reduce || n.getBoundingClientRect().top < vh * 0.65);
      }
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

  const layer = { position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" } as const;
  return (
    <div className={className} aria-hidden="true">
      <svg ref={svgRef} style={layer} viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d={PATH} className={trackClassName} vectorEffect="non-scaling-stroke" fill="none" />
      </svg>
      <svg ref={lineRef} style={layer} viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path d={PATH} className={lineClassName} vectorEffect="non-scaling-stroke" fill="none" />
      </svg>
    </div>
  );
}
