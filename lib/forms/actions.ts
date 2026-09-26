"use server";

import { validateIntroCall, type FieldErrors } from "./intro-call";

export type IntroCallState =
  | { status: "idle" }
  | { status: "error"; errors: FieldErrors }
  | { status: "preview"; at: number };

/**
 * „Nemokamo įvadinio pokalbio“ registracija. Validacija vyksta čia, serveryje.
 * TODO: prijungti pristatymą (pvz. el. laišką Mariui), kai klientas pateiks el. paštą.
 * Iki tol duomenys niekur nesiunčiami ir nesaugomi – grąžinama „peržiūros“ būsena.
 */
export async function submitIntroCall(_prev: IntroCallState, formData: FormData): Promise<IntroCallState> {
  // Paslėptas laukas botams: jei užpildytas, atsakome kaip įprastai, bet nieko nedarome.
  if (formData.get("website")) return { status: "preview", at: Date.now() };

  const result = validateIntroCall({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    topic: formData.get("topic"),
    message: formData.get("message"),
    privacyAccepted: formData.get("privacy") === "on",
  });
  if (!result.ok) return { status: "error", errors: result.errors };

  return { status: "preview", at: Date.now() };
}
