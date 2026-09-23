/**
 * Būsimos „Nemokamo įvadinio pokalbio“ registracijos formos schema.
 * Validacija turi vykti SERVERYJE (Server Action / Route Handler) – kliento pusės
 * patikra yra tik patogumui. Renkame tik minimaliai būtinus duomenis:
 * jokių sąskaitų numerių, sumų, asmens kodų ar kitos jautrios finansinės informacijos.
 */
export type IntroCallInput = {
  name: string;
  email: string;
  topic?: string; // pasirinkta situacija, pvz. „Noriu pradėti investuoti“
  message?: string;
  privacyAccepted: boolean;
};

export type FieldErrors = Partial<Record<keyof IntroCallInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateIntroCall(input: Partial<Record<keyof IntroCallInput, unknown>>) {
  const errors: FieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const topic = typeof input.topic === "string" ? input.topic.trim().slice(0, 120) : undefined;
  const message = typeof input.message === "string" ? input.message.trim() : undefined;

  if (name.length < 2 || name.length > 80) errors.name = "Įrašykite vardą (2–80 simbolių).";
  if (!EMAIL_RE.test(email) || email.length > 160) errors.email = "Įrašykite teisingą el. pašto adresą.";
  if (message && message.length > 1500) errors.message = "Žinutė per ilga (daugiausia 1500 simbolių).";
  if (input.privacyAccepted !== true) errors.privacyAccepted = "Reikalingas sutikimas su privatumo politika.";

  const ok = Object.keys(errors).length === 0;
  return ok
    ? { ok: true as const, data: { name, email, topic, message, privacyAccepted: true } satisfies IntroCallInput }
    : { ok: false as const, errors };
}
