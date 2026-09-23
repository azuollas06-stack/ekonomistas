"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./HorizontalSteps.module.css";

type Step = { n: string; title: string; body: string };
type Props = { steps: Step[]; heading: ReactNode; finalCard?: ReactNode };

/**
 * Proceso žingsniai. Kompiuteryje sekcija „prisegama“, o vertikalus slinkimas stumia žingsnius horizontaliai.
 * Telefone ir su reduced motion – įprastas vertikalus sąrašas.
 */
export default function HorizontalSteps({ steps, heading, finalCard }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!wrap || !pin || !track) return;
    const mq = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    let distance = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) return;
      const r = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -r.top / scrollable)) : 0;
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
      pin.style.setProperty("--p", p.toFixed(3));
    };
    const layout = () => {
      if (!mq.matches) {
        wrap.style.height = "";
        track.style.transform = "";
        pin.style.removeProperty("--p");
        wrap.dataset.active = "false";
        return;
      }
      wrap.dataset.active = "true";
      distance = Math.max(0, track.scrollWidth - pin.clientWidth);
      wrap.style.height = `${window.innerHeight + distance}px`;
      update();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    mq.addEventListener("change", layout);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      mq.removeEventListener("change", layout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap} data-active="false">
      <div ref={pinRef} className={styles.pin}>
        <div className={styles.head}>
          {heading}
          <div className={styles.progress} aria-hidden="true">
            <span />
          </div>
        </div>
        <ol role="list" ref={trackRef} className={styles.track}>
          {steps.map((s) => (
            <li key={s.n} className={styles.card}>
              <span className={styles.n} aria-hidden="true">
                {s.n}
              </span>
              <h3 className={styles.title}>
                <span className="sr-only">{s.n}. </span>
                {s.title}
              </h3>
              <p className={styles.body}>{s.body}</p>
            </li>
          ))}
          {finalCard && <li className={`${styles.card} ${styles.final}`}>{finalCard}</li>}
        </ol>
      </div>
    </div>
  );
}
