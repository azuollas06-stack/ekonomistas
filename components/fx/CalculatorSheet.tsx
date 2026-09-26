"use client";

import { useEffect, useId } from "react";
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import { calculator, cta } from "@/content/site";
import { goToForm, useModalDialog } from "./useModalDialog";
import s from "./CalculatorSheet.module.css";

/**
 * Skaičiuoklė atskirame lange (11 kryptis): puslapyje jos nėra, ji atsidaro tik paspaudus
 * nuorodą į `hash` (meniu „Skaičiuoklė“ – ir kompiuterio, ir telefono) arba atėjus su tuo adresu.
 */
export default function CalculatorSheet({ hash = "#skaiciuokle" }: { hash?: string }) {
  const { ref, open, close, backdrop } = useModalDialog();
  const titleId = useId();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // naujame skirtuke atidaryti leidžiame įprastai
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target as Element | null)?.closest(`a[href="${hash}"]`)) return;
      e.preventDefault();
      open();
    };
    document.addEventListener("click", onClick);
    if (window.location.hash === hash) open();
    return () => document.removeEventListener("click", onClick);
  }, [hash, open]);

  return (
    <dialog ref={ref} className={s.sheet} aria-labelledby={titleId} {...backdrop}>
      <div className={s.scroll}>
        <header className={s.bar}>
          <p className={s.kicker}>{calculator.title}</p>
          <button type="button" className={s.close} onClick={() => close()}>
            <span className="sr-only">{calculator.close}</span>
            <span className={s.x} aria-hidden="true" />
          </button>
        </header>

        <div className={s.body}>
          <div className={s.head}>
            <h2 id={titleId} className={s.title}>
              {calculator.question}
            </h2>
            <p className={s.lead}>{calculator.lead}</p>
          </div>

          <div className={s.card}>
            <CalculatorTeaser />
          </div>

          <div className={s.foot}>
            <p>{calculator.ctaLead}</p>
            <a
              href={cta.href}
              className={s.cta}
              onClick={(e) => {
                e.preventDefault();
                close(() => goToForm(cta.href));
              }}
            >
              {cta.intro}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
