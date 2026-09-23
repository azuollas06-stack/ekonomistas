"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioCompare as pc } from "@/content/site";
import styles from "./PortfolioCompare.module.css";

type Key = keyof typeof pc.states;
const KEYS: Key[] = ["before", "after"];
const TONES = [1, 0.62, 0.36, 0.16];

// Komponento išorėje, kad perjungiant būseną React išlaikytų tuos pačius elementus ir plotis animuotųsi.
function Bar({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{title}</p>
      <div className={styles.bar} role="img" aria-label={`${title}: ${data.map((x) => `${x.label} ${x.value} %`).join(", ")}`}>
        {data.map((x, i) => (
          <span key={x.label} style={{ width: `${x.value}%`, opacity: TONES[i % TONES.length] }} />
        ))}
      </div>
      <ul role="list" className={styles.legend}>
        {data.map((x, i) => (
          <li key={x.label}>
            <span className={styles.swatch} style={{ opacity: TONES[i % TONES.length] }} aria-hidden="true" />
            {x.label}
            <b>{x.value} %</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Demonstracinis portfelio palyginimas „prieš / po“. Kai pasirodo ekrane – kartą pats persijungia į „po“. */
export default function PortfolioCompare() {
  const [state, setState] = useState<Key>("before");
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        t = window.setTimeout(() => {
          if (!touched.current) setState("after");
        }, 1400);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const d = pc.states[state];

  return (
    <div ref={ref} className={styles.root}>
      <div className={styles.top}>
        <span className={styles.badge}>{pc.badge}</span>
        <div className={styles.toggle} role="group" aria-label="Portfelio būsena">
          {KEYS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={state === k}
              onClick={() => {
                touched.current = true;
                setState(k);
              }}
            >
              {pc.states[k].label}
            </button>
          ))}
          <span className={styles.thumb} data-pos={state} aria-hidden="true" />
        </div>
      </div>

      <div className={styles.grid} aria-live="polite">
        <Bar title="Turto klasės" data={d.assets} />
        <Bar title="Regionai" data={d.regions} />
      </div>

      <dl className={styles.metrics}>
        {d.metrics.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd key={state + m.label}>{m.value}</dd>
          </div>
        ))}
        <div>
          <dt>Rizikos lygis</dt>
          <dd className={styles.risk}>
            <span aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} data-on={i < d.risk.value} />
              ))}
            </span>
            {d.risk.text}
          </dd>
        </div>
      </dl>
      <p key={state} className={styles.note}>
        {d.note}
      </p>
      <p className={styles.disclaimer}>{pc.disclaimer}</p>
    </div>
  );
}
