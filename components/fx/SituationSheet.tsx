"use client";

import { useRef, useState } from "react";
import type { Service } from "@/content/site";
import styles from "./SituationSheet.module.css";

type Props = {
  services: Service[];
  moreLabel: string;
  ctaLabel: string;
  ctaHref: string;
  /** Klasė pasirinkimų mygtukams (dizaino stilius) */
  chipClassName?: string;
  listClassName?: string;
};

/** „Kur esate šiandien?“ – pasirinkimas atidaro lapą iš apačios (mobile) / dialogą (desktop). */
export default function SituationSheet({ services, moreLabel, ctaLabel, ctaHref, chipClassName, listClassName }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);

  const open = (i: number) => {
    setActive(i);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();
  const s = services[active];

  return (
    <>
      <ul role="list" className={listClassName}>
        {services.map((svc, i) => (
          <li key={svc.id}>
            <button type="button" className={chipClassName} onClick={() => open(i)} aria-haspopup="dialog">
              {svc.situation}
              <span aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        className={styles.sheet}
        aria-labelledby="sheet-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className={styles.inner}>
          <span className={styles.grabber} aria-hidden="true" />
          <div className={styles.head}>
            <p className={styles.kicker}>Jūsų situacija</p>
            <button type="button" className={styles.close} onClick={close} aria-label="Uždaryti">
              ✕
            </button>
          </div>
          <div className={styles.tabs} role="group" aria-label="Pasirinkite situaciją">
            {services.map((svc, i) => (
              <button
                key={svc.id}
                type="button"
                className={styles.tab}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                {svc.situation}
              </button>
            ))}
          </div>
          <div key={s.id} className={styles.body} aria-live="polite">
            <p className={styles.kicker}>Jums tinkamiausia</p>
            <h3 id="sheet-title" className={styles.title}>
              {s.title}
            </h3>
            <p className={styles.text}>{s.full}</p>
          </div>
          <div className={styles.actions}>
            <a href={ctaHref} className={styles.primary} onClick={close}>
              {ctaLabel}
            </a>
            <a href={s.href} className={styles.secondary} onClick={close}>
              {moreLabel}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
