"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Service } from "@/content/site";
import styles from "./SituationPicker.module.css";

type Props = {
  services: Service[];
  moreLabel: string;
  /** "list" – vertikalus pasirinkimų stulpelis; "row" – horizontali eilė */
  layout?: "list" | "row";
  className?: string;
};

/** „Kur esate šiandien?“ – subtilus situacijos pasirinkimas (WAI-ARIA tabs šablonas). */
export default function SituationPicker({ services, moreLabel, layout = "list", className }: Props) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = services.length - 1;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  const s = services[active];

  return (
    <div className={`${styles.root} ${className ?? ""}`} data-layout={layout}>
      <div
        role="tablist"
        aria-label="Jūsų situacija"
        aria-orientation={layout === "list" ? "vertical" : "horizontal"}
        className={styles.tabs}
      >
        {services.map((svc, i) => (
          <button
            key={svc.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${base}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={styles.tabDot} aria-hidden="true" />
            {svc.situation}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${active}`} className={styles.panel} tabIndex={0}>
        <div key={s.id} className={styles.panelInner}>
          <p className={styles.kicker}>Jums tinkamiausia</p>
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.body}>{s.full}</p>
          <a className={styles.link} href={s.href}>
            {moreLabel}
            <span aria-hidden="true"> →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
