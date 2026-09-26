"use client";

import { useEffect, useRef, useState } from "react";
import { guidedPath, services, cta } from "@/content/site";
import styles from "./GuidedPath.module.css";

type Answers = { service?: number; horizon?: number; experience?: number };

/**
 * „Raskime jums tinkamą pradžią“ – 3 klausimai → tinkamiausia paslauga.
 * Viskas vyksta tik naršyklėje: jokių užklausų, jokio saugojimo.
 */
export default function GuidedPath() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const prevStep = useRef(step);

  // Perėjus į kitą žingsnį – fokusas į klausimą (klaviatūrai ir ekrano skaitytuvams).
  // Lyginame su ankstesniu žingsniu, kad įkeliant puslapį (ir React StrictMode dvigubame paleidime)
  // fokusas nebūtų perkeltas ir puslapis nenušoktų žemyn.
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const questions = [
    { key: "service" as const, question: "Kur esate šiandien?", options: services.map((s) => ({ label: s.situation })) },
    { key: "horizon" as const, question: guidedPath.horizon.question, options: guidedPath.horizon.options },
    { key: "experience" as const, question: guidedPath.experience.question, options: guidedPath.experience.options },
  ];
  const total = questions.length;
  const done = step >= total;

  const choose = (i: number) => {
    const q = questions[step];
    setA((prev) => ({ ...prev, [q.key]: i }));
    setStep((s) => s + 1);
  };

  const svc = a.service !== undefined ? services[a.service] : undefined;
  const horizon = a.horizon !== undefined ? guidedPath.horizon.options[a.horizon] : undefined;
  const exp = a.experience !== undefined ? guidedPath.experience.options[a.experience] : undefined;

  return (
    <div className={styles.root}>
      <div className={styles.progress} aria-hidden="true">
        {questions.map((_, i) => (
          <span key={i} data-on={i < step || done} data-current={i === step} />
        ))}
      </div>

      <div key={step} className={styles.stage} aria-live="polite">
        {!done ? (
          <>
            <p className={styles.counter}>
              {step + 1} / {total}
            </p>
            <h3 ref={headingRef} tabIndex={-1} className={styles.question}>
              {questions[step].question}
            </h3>
            <ul role="list" className={styles.options}>
              {questions[step].options.map((o, i) => (
                <li key={o.label} style={{ ["--d" as string]: `${i * 60}ms` }}>
                  <button type="button" className={styles.option} onClick={() => choose(i)}>
                    <span className={styles.optionKey} aria-hidden="true">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {o.label}
                    <span className={styles.optionArrow} aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 && (
              <button type="button" className={styles.back} onClick={() => setStep((s) => s - 1)}>
                ← {guidedPath.back}
              </button>
            )}
          </>
        ) : (
          svc && (
            <div className={styles.result}>
              <p className={styles.counter}>{guidedPath.resultKicker}</p>
              <h3 ref={headingRef} tabIndex={-1} className={styles.resultTitle}>
                {svc.title}
              </h3>
              <p className={styles.resultText}>{svc.full}</p>
              <ul role="list" className={styles.notes}>
                {horizon && (
                  <li>
                    <b>{horizon.label}.</b> {horizon.note}
                  </li>
                )}
                {exp && (
                  <li>
                    <b>{exp.label}.</b> {exp.note}
                  </li>
                )}
              </ul>
              <div className={styles.actions}>
                {/* data-topic: jei puslapyje yra registracijos forma, situacija joje parenkama iš karto */}
                <a href={cta.href} className={styles.primary} data-topic={svc.situation}>
                  {cta.intro} <span aria-hidden="true">→</span>
                </a>
                <button
                  type="button"
                  className={styles.restart}
                  onClick={() => {
                    setA({});
                    setStep(0);
                  }}
                >
                  {guidedPath.restart}
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <p className={styles.privacy}>{guidedPath.privacy}</p>
    </div>
  );
}
