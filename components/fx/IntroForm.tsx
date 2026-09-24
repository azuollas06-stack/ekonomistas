"use client";

import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { submitIntroCall, type IntroCallState } from "@/lib/forms/actions";
import { validateIntroCall, type FieldErrors } from "@/lib/forms/intro-call";
import { introForm as t, services, footer } from "@/content/site";
import s from "./IntroForm.module.css";

type Key = keyof FieldErrors;

const INITIAL: IntroCallState = { status: "idle" };
/** formos lauko vardas ↔ klaidos raktas */
const FIELD: Record<Key, string> = { name: "name", email: "email", topic: "topic", message: "message", privacyAccepted: "privacy" };
const KEY: Record<string, Key> = { name: "name", email: "email", topic: "topic", message: "message", privacy: "privacyAccepted" };

function validate(form: HTMLFormElement) {
  const fd = new FormData(form);
  return validateIntroCall({
    name: fd.get("name"),
    email: fd.get("email"),
    topic: fd.get("topic"),
    message: fd.get("message"),
    privacyAccepted: fd.get("privacy") === "on",
  });
}

/**
 * Registracija nemokamam įvadiniam pokalbiui.
 * Ta pati patikra vyksta ir naršyklėje (patogumui), ir serveryje (lib/forms/actions.ts).
 * Paspaudus elementą su [data-topic] (pvz. paslaugą), situacija formoje parenkama automatiškai.
 */
export default function IntroForm() {
  const [state, formAction, pending] = useActionState(submitIntroCall, INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [ack, setAck] = useState(0);
  const topicRef = useRef<HTMLSelectElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const done = state.status === "preview" && state.at !== ack;

  // serverio klaidos – jei naršyklės patikra buvo apeita
  useEffect(() => {
    if (state.status === "error") setErrors(state.errors);
  }, [state]);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const topic = (e.target as Element | null)?.closest<HTMLElement>("[data-topic]")?.dataset.topic;
      if (topic && topicRef.current) topicRef.current.value = topic;
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const result = validate(e.currentTarget);
    if (result.ok) {
      setErrors({});
      return;
    }
    e.preventDefault(); // serverio veiksmas nekviečiamas, įvesti duomenys lieka
    setErrors(result.errors);
    const first = Object.keys(result.errors)[0] as Key;
    e.currentTarget.querySelector<HTMLElement>(`[name="${FIELD[first]}"]`)?.focus();
  };

  // pataisius lauką, jo klaida dingsta
  const onChange = (e: FormEvent<HTMLFormElement>) => {
    const key = KEY[(e.target as HTMLInputElement).name];
    if (!key || !errors[key]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const fieldId = (k: Key) => `${id}-${FIELD[k]}`;
  const errId = (k: Key) => `${fieldId(k)}-err`;
  const described = (k: Key, ...extra: string[]) => [errors[k] ? errId(k) : "", ...extra].filter(Boolean).join(" ") || undefined;
  const invalid = (k: Key) => (errors[k] ? true : undefined);
  const error = (k: Key) =>
    errors[k] ? (
      <p id={errId(k)} className={s.error}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className={s.root}>
      <p className="sr-only" aria-live="polite">
        {done ? `${t.previewTitle} ${t.previewBody}` : ""}
      </p>

      {done ? (
        <div ref={doneRef} className={s.done} tabIndex={-1}>
          <span className={s.doneIcon} aria-hidden="true" />
          <p className={s.doneTitle}>{t.previewTitle}</p>
          <p className={s.doneBody}>{t.previewBody}</p>
          <button type="button" className={s.again} onClick={() => setAck(state.at)}>
            {t.again}
          </button>
        </div>
      ) : (
        <form className={s.form} action={formAction} onSubmit={onSubmit} onChange={onChange} noValidate>
          <p className={s.title}>{t.title}</p>

          <div className={s.field}>
            <label htmlFor={fieldId("name")}>{t.name}</label>
            <input
              id={fieldId("name")}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              required
              aria-invalid={invalid("name")}
              aria-describedby={described("name")}
            />
            {error("name")}
          </div>

          <div className={s.field}>
            <label htmlFor={fieldId("email")}>{t.email}</label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={160}
              required
              aria-invalid={invalid("email")}
              aria-describedby={described("email")}
            />
            {error("email")}
          </div>

          <div className={s.field}>
            <label htmlFor={fieldId("topic")}>{t.topic}</label>
            <select ref={topicRef} id={fieldId("topic")} name="topic" defaultValue="">
              <option value="">{t.topicPlaceholder}</option>
              {services.map((svc) => (
                <option key={svc.id} value={svc.situation}>
                  {svc.situation}
                </option>
              ))}
              <option value={t.topicOther}>{t.topicOther}</option>
            </select>
          </div>

          <div className={s.field}>
            <label htmlFor={fieldId("message")}>
              {t.message} <span className={s.optional}>({t.optional})</span>
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={3}
              maxLength={1500}
              aria-invalid={invalid("message")}
              aria-describedby={described("message", `${fieldId("message")}-hint`)}
            />
            <p id={`${fieldId("message")}-hint`} className={s.hint}>
              {t.messageHint}
            </p>
            {error("message")}
          </div>

          <div className={s.check}>
            <input
              id={fieldId("privacyAccepted")}
              name="privacy"
              type="checkbox"
              required
              aria-invalid={invalid("privacyAccepted")}
              aria-describedby={described("privacyAccepted")}
            />
            <label htmlFor={fieldId("privacyAccepted")}>
              {t.privacy} <a href={footer.links[0].href}>{t.privacyLink}</a>
            </label>
            {error("privacyAccepted")}
          </div>

          {/* laukas botams – žmonės jo nemato */}
          <div className={s.trap} aria-hidden="true">
            <label>
              Svetainė <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <button type="submit" className={s.submit} disabled={pending}>
            {pending ? t.pending : t.submit}
            <span className={s.submitArrow} aria-hidden="true">
              →
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
