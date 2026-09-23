"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./MobileNav.module.css";

type Props = {
  links: ReadonlyArray<{ label: string; href: string }>;
  ctaLabel: string;
  ctaHref: string;
  /** Papildoma klasė mygtukui (spalvos, pozicija) */
  buttonClassName?: string;
  /** Papildoma klasė skydeliui (tema per CSS kintamuosius) */
  panelClassName?: string;
};

export default function MobileNav({ links, ctaLabel, ctaHref, buttonClassName, panelClassName }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.toggle} ${buttonClassName ?? ""}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bars} aria-hidden="true" data-open={open} />
        {open ? "Uždaryti" : "Meniu"}
      </button>
      <div
        ref={panelRef}
        id={id}
        className={`${styles.panel} ${panelClassName ?? ""}`}
        data-open={open}
        hidden={!open}
      >
        <nav aria-label="Mobilioji navigacija">
          <ul role="list" className={styles.list}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className={styles.cta} href={ctaHref} onClick={() => setOpen(false)}>
          {ctaLabel}
        </a>
      </div>
    </>
  );
}
