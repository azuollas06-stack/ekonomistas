"use client";

import { openConsentPreferences } from "@/lib/consent";

export default function ConsentButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentPreferences}>
      Slapukų nustatymai
    </button>
  );
}
