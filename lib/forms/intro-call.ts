/**
 * „Nemokamo įvadinio pokalbio“ registracijos formos schema.
 * Validacija turi vykti SERVERYJE (Server Action / Route Handler) – kliento pusės
 * patikra yra tik patogumui. Renkame tik tai, ko reikia susisiekti (vardas, telefonas, el. paštas):
 * jokių sąskaitų numerių, sumų, asmens kodų ar kitos jautrios finansinės informacijos.
 */
export type IntroCallInput = {
  name: string;
  phone: string;
  email: string;
  topic?: string; // pasirinkta situacija, pvz. „Noriu pradėti investuoti“
  message?: string;
  privacyAccepted: boolean;
};

export type FieldErrors = Partial<Record<keyof IntroCallInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** 8–15 skaitmenų, nebūtinai su „+“ priekyje (pvz. +37061234567 arba 861234567) */
const PHONE_RE = /^\+?\d{8,15}$/;

export function validateIntroCall(input: Partial<Record<keyof IntroCallInput, unknown>>) {
  const errors: FieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim() : "";
  // tarpai, brūkšneliai ir skliaustai leidžiami rašant, bet saugomas tik numeris
  const phone = typeof input.phone === "string" ? input.phone.replace(/[\s().-]/g, "") : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const topic = typeof input.topic === "string" ? input.topic.trim().slice(0, 120) : undefined;
  const message = typeof input.message === "string" ? input.message.trim() : undefined;

  // tvarka atitinka laukų tvarką formoje – pirma klaida gauna fokusą
  if (name.length < 2 || name.length > 80) errors.name = "Įrašykite vardą ir pavardę (2–80 simbolių).";
  if (!PHONE_RE.test(phone)) errors.phone = "Įrašykite teisingą telefono numerį, pvz. +370 600 00000.";
  if (!EMAIL_RE.test(email) || email.length > 160) errors.email = "Įrašykite teisingą el. pašto adresą.";
  if (message && message.length > 1500) errors.message = "Aprašymas per ilgas (daugiausia 1500 simbolių).";
  if (input.privacyAccepted !== true) errors.privacyAccepted = "Reikalingas sutikimas su privatumo politika.";

  const ok = Object.keys(errors).length === 0;
  return ok
    ? { ok: true as const, data: { name, phone, email, topic, message, privacyAccepted: true } satisfies IntroCallInput }
    : { ok: false as const, errors };
}
