"use client";

import { useEffect, useState } from "react";
import styles from "./ReviewCarousel.module.css";

type Review = { quote: string; name: string; context?: string };
type Props = { reviews: Review[]; isSample?: boolean; interval?: number };

/** Atsiliepimų karuselė: didelė citata, automatinis keitimas su pauze, rodyklės ir taškai. */
export default function ReviewCarousel({ reviews, isSample, interval = 6500 }: Props) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const n = reviews.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || hover || n < 2) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), interval);
    return () => window.clearTimeout(id);
  }, [i, playing, hover, n, interval]);

  const go = (d: number) => {
    setPlaying(false);
    setI((v) => (v + d + n) % n);
  };
  const r = reviews[i];

  return (
    <div
      className={styles.root}
      role="region"
      aria-roledescription="karuselė"
      aria-label="Klientų atsiliepimai"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <span className={styles.mark} aria-hidden="true">
        „
      </span>
      <div className={styles.viewport} aria-live={playing ? "off" : "polite"}>
        <figure key={i} className={styles.slide} aria-roledescription="skaidrė" aria-label={`${i + 1} iš ${n}`}>
          <blockquote className={styles.quote}>
            <p>{r.quote}</p>
          </blockquote>
          <figcaption className={styles.who}>
            <span className={styles.avatar} aria-hidden="true">
              {r.name.charAt(0)}
            </span>
            <span>
              <b>{r.name}</b>
              {r.context && <span>{r.context}</span>}
            </span>
            {isSample && <span className={styles.badge}>Pavyzdys</span>}
          </figcaption>
        </figure>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {reviews.map((_, k) => (
            <button
              key={k}
              type="button"
              className={styles.dot}
              aria-label={`Atsiliepimas ${k + 1}`}
              aria-current={k === i}
              onClick={() => {
                setPlaying(false);
                setI(k);
              }}
            >
              <span data-run={k === i && playing && !hover} style={{ animationDuration: `${interval}ms` }} />
            </button>
          ))}
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Sustabdyti" : "Paleisti"}>
            {playing ? "❚❚" : "▶"}
          </button>
          <button type="button" onClick={() => go(-1)} aria-label="Ankstesnis atsiliepimas">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Kitas atsiliepimas">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
