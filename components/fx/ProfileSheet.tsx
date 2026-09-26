"use client";

import { useId, useRef, type CSSProperties, type MouseEvent } from "react";
import Photo from "@/components/shared/Photo";
import { brand, cta, finalCta, profileSheet as p } from "@/content/site";
import { goToForm, useModalDialog } from "./useModalDialog";
import s from "./ProfileSheet.module.css";

const order = (i: number): CSSProperties => ({ ["--i" as string]: i });

/**
 * „Plačiau apie mane“: mygtukas ir konsultanto „faktų lapas“.
 * Kompiuteryje panelė įslysta iš dešinės, telefone – iš apačios.
 */
export default function ProfileSheet({ className }: { className?: string }) {
  const { ref, open: show, close, backdrop } = useModalDialog();
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const open = () => {
    show();
    scrollRef.current?.scrollTo(0, 0);
  };

  const toContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    close(() => goToForm(cta.href));
  };

  const storyStart = p.facts.length + 2;

  return (
    <>
      <button type="button" className={`${s.trigger} ${className ?? ""}`} onClick={open} aria-haspopup="dialog">
        <span className={s.doc} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={s.triggerText}>
          <span className={s.triggerTitle}>{p.open}</span>
          <span className={s.triggerHint}>{p.openHint}</span>
        </span>
        <span className={s.triggerGo} aria-hidden="true">
          →
        </span>
      </button>

      <dialog ref={ref} className={s.sheet} aria-labelledby={titleId} {...backdrop}>
        <div ref={scrollRef} className={s.scroll}>
          <header className={s.bar}>
            <p className={s.kicker}>{p.kicker}</p>
            <button type="button" className={s.close} onClick={() => close()}>
              <span className="sr-only">{p.close}</span>
              <span className={s.x} aria-hidden="true" />
            </button>
          </header>

          <div className={s.body}>
            <div className={`${s.person} ${s.item}`} style={order(0)}>
              <Photo name="portrait" className={s.avatar} sizes="96px" position="50% 16%" reveal={false} />
              <div>
                <h2 id={titleId} className={s.name}>
                  {brand.name}
                </h2>
                <p className={s.role}>{brand.role}</p>
              </div>
            </div>

            <dl className={s.facts}>
              {p.facts.map((f, i) => (
                <div key={f.label} className={s.item} style={order(i + 1)}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
              <div className={s.item} style={order(p.facts.length + 1)}>
                <dt>{p.notesLabel}</dt>
                <dd>
                  <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
                    {brand.instagram.handle}
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> (atsidaro naujame lange)</span>
                  </a>
                </dd>
              </div>
            </dl>

            {p.story.map((block, b) => (
              <section key={block.title} className={`${s.block} ${s.item}`} style={order(storyStart + b)}>
                <h3 className={s.blockTitle}>
                  <span>{String(b + 1).padStart(2, "0")}</span>
                  {block.title}
                </h3>
                {block.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                {block.points && (
                  <ul role="list" className={s.points}>
                    {block.points.map((pt) => (
                      <li key={pt.title}>
                        <b>{pt.title}</b>
                        <span>{pt.body}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className={`${s.cta} ${s.item}`} style={order(storyStart + p.story.length)}>
              <p className={s.ctaTitle}>{finalCta.title}</p>
              <a href={cta.href} className={s.ctaBtn} onClick={toContact}>
                {cta.introUpper}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
