"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Photo from "@/components/shared/Photo";
import styles from "./SignatureNav.module.css";

type Link = { label: string; href: string };
type Props = {
  links: ReadonlyArray<Link>;
  ctaLabel: string;
  ctaHref: string;
  desktopCtaLabel: string;
  name: string;
  role: string;
  instagram: { handle: string; url: string };
};

/**
 * 13 krypties navigacija.
 * Kompiuteris: nuorodos su slankiojančiu žymekliu po aktyvia sekcija (scroll spy) ir po užvesta nuoroda.
 * Telefonas: pilno ekrano tamsus meniu, atsiveriantis apskritimu nuo mygtuko.
 */
export default function SignatureNav({ links, ctaLabel, ctaHref, desktopCtaLabel, name, role, instagram }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const deskLinks = links.filter((l) => l.href !== "#pagrindinis");

  // Scroll spy: kuri sekcija dabar ekrano viduryje.
  useEffect(() => {
    const targets = deskLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Žymeklio padėtis: užvesta nuoroda, kitaip – aktyvi sekcija.
  const measure = useCallback(() => {
    const list = listRef.current;
    const key = hover ?? active;
    if (!list || !key) return setIndicator(null);
    const a = list.querySelector<HTMLAnchorElement>(`a[href="${key}"]`);
    if (!a) return setIndicator(null);
    setIndicator({ x: a.offsetLeft, w: a.offsetWidth });
  }, [hover, active]);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Atidarymas: apskritimo centras – mygtuko vieta; slinkimo užraktas; Escape; fokusas.
  const setOrigin = () => {
    const b = toggleRef.current?.getBoundingClientRect();
    const p = panelRef.current;
    if (!b || !p) return;
    p.style.setProperty("--ox", `${b.left + b.width / 2}px`);
    p.style.setProperty("--oy", `${b.top + b.height / 2}px`);
  };
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav aria-label="Pagrindinė navigacija" className={styles.desk}>
        <ul role="list" ref={listRef} onMouseLeave={() => setHover(null)}>
          {deskLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? "location" : undefined}
                data-active={active === l.href}
                onMouseEnter={() => setHover(l.href)}
                onFocus={() => setHover(l.href)}
                onBlur={() => setHover(null)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <span
          className={styles.indicator}
          aria-hidden="true"
          style={
            indicator
              ? ({ ["--x" as string]: `${indicator.x}px`, ["--w" as string]: `${indicator.w}px`, opacity: 1 } as CSSProperties)
              : { opacity: 0 }
          }
        />
      </nav>
      <a href={ctaHref} className={styles.deskCta}>
        {desktopCtaLabel}
      </a>

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          setOrigin();
          setOpen((v) => !v);
        }}
      >
        <span className="sr-only">{open ? "Uždaryti meniu" : "Atidaryti meniu"}</span>
        <span className={styles.bars} data-open={open} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className={styles.panel}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
        inert={!open}
      >
        <div className={styles.panelInner}>
          <ul role="list" className={styles.links}>
            {links.map((l, i) => (
              <li key={l.href} style={{ ["--i" as string]: i } as CSSProperties}>
                <a href={l.href} onClick={close} data-active={active === l.href}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.label}>{l.label}</span>
                  <span className={styles.go} aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.foot} style={{ ["--i" as string]: links.length } as CSSProperties}>
            <div className={styles.person}>
              <Photo name="portrait" className={styles.avatar} sizes="56px" position="50% 16%" reveal={false} />
              <span>
                <b>{name}</b>
                <span>{role}</span>
              </span>
            </div>
            <a href={ctaHref} className={styles.cta} onClick={close}>
              {ctaLabel} <span aria-hidden="true">→</span>
            </a>
            <a href={instagram.url} className={styles.insta} target="_blank" rel="noopener noreferrer">
              Instagram {instagram.handle}
              <span className="sr-only"> (atsidaro naujame lange)</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
