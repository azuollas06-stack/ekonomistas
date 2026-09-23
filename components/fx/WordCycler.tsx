"use client";

import { useEffect, useState } from "react";
import styles from "./WordCycler.module.css";

type Props = { words: string[]; interval?: number; className?: string };

/** Žodžiai keičiasi „lizdo“ animacija. Ekrano skaitytuvams ir su reduced motion – paskutinis žodis. */
export default function WordCycler({ words, interval = 1900, className }: Props) {
  const last = words.length - 1;
  const [i, setI] = useState(last);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setI(0);
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`${styles.slot} ${className ?? ""}`}>
      <span className="sr-only">{words[last]}</span>
      <span key={i} className={styles.word} aria-hidden="true">
        {words[i]}
      </span>
    </span>
  );
}
