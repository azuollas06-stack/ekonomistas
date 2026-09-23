/**
 * Slapukų sutikimo sistemos VIETA. Šiame etape nieko nesaugoma ir neįkeliama.
 * Vėliau čia bus prijungtas profesionalus Consent Management sprendimas (CMP).
 *
 * Principas: analitiniai ir rinkodaros skriptai įkeliami TIK gavus sutikimą.
 */
export type ConsentCategory = "necessary" | "analytics" | "marketing" | "preferences";

export type ConsentState = Record<ConsentCategory, boolean>;

export const defaultConsent: ConsentState = {
  necessary: true, // būtini – visada įjungti
  analytics: false,
  marketing: false,
  preferences: false,
};

export const CONSENT_OPEN_EVENT = "consent:open-preferences";

/** Atidaro slapukų nustatymus (kol kas – tik įvykis būsimam CMP). */
export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
