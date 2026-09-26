import { useCallback, useEffect, useRef, type MouseEvent, type PointerEvent } from "react";

function lockScroll(on: boolean) {
  const html = document.documentElement;
  // gutter lieka – puslapis nepašoka, kai dingsta slinkties juosta
  html.style.scrollbarGutter = on ? "stable" : "";
  html.style.overflow = on ? "hidden" : "";
}

/** Nuveda prie formos (pvz. „#kontaktai“) ir pažymi pirmą matomą jos lauką. */
export function goToForm(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  // React formoje prideda ir paslėptų laukų – jų praleidžiame
  target
    ?.querySelector<HTMLElement>('input:not([type="hidden"]):not([tabindex="-1"]), select, textarea')
    ?.focus({ preventScroll: true });
}

/**
 * Natūralus modalinis <dialog>: fokusas lieka viduje, Esc ir paspaudimas šalia uždaro, puslapis už jo nejuda.
 * Uždarant palaukiama CSS animacijos, kai elementas turi data-closing="true".
 */
export function useModalDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const stopClosing = useRef<(() => void) | null>(null);
  const downOnBackdrop = useRef(false);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d) return;
    lockScroll(true);
    if (!d.open) d.showModal();
  }, []);

  /** Uždarymas su animacija; `after` – kas daroma iškart po uždarymo. */
  const close = useCallback((after?: () => void) => {
    const d = ref.current;
    if (!d?.open || stopClosing.current) return;
    d.dataset.closing = "true";
    const stop = () => {
      window.clearTimeout(timer);
      d.removeEventListener("animationend", onEnd);
      delete d.dataset.closing;
      stopClosing.current = null;
    };
    const finish = () => {
      stop();
      d.close();
      lockScroll(false);
      after?.();
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target === d && !e.pseudoElement) finish();
    };
    const timer = window.setTimeout(finish, 520);
    d.addEventListener("animationend", onEnd);
    stopClosing.current = stop;
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    // Esc: vietoj staigaus uždarymo – animuotas
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    // bet koks uždarymas (ir naršyklės priverstinis) atrakina puslapį
    const onClose = () => {
      stopClosing.current?.();
      lockScroll(false);
    };
    d.addEventListener("cancel", onCancel);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("close", onClose);
      lockScroll(false);
    };
  }, [close]);

  /** Paspaudimas ant fono uždaro, bet ne tada, kai pelė nuspausta viduje ir atleista ant fono. */
  const backdrop = {
    onPointerDown: (e: PointerEvent<HTMLDialogElement>) => {
      downOnBackdrop.current = e.target === e.currentTarget;
    },
    onClick: (e: MouseEvent<HTMLDialogElement>) => {
      if (downOnBackdrop.current && e.target === e.currentTarget) close();
      downOnBackdrop.current = false;
    },
  };

  return { ref, open, close, backdrop };
}
