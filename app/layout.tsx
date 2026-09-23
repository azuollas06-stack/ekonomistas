import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand } from "@/content/site";
import RevealObserver from "@/components/shared/RevealObserver";

/** Svetainės adresas: NEXT_PUBLIC_SITE_URL → Vercel domenas → localhost. Tuščia ar neteisinga reikšmė nenulaužia build'o. */
function siteUrl(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ];
  for (const value of candidates) {
    if (!value?.trim()) continue;
    try {
      return new URL(value.trim());
    } catch {
      // neteisingas adresas – bandome kitą
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: `${brand.name} – ${brand.role.toLowerCase()}`,
  description:
    "Padedu žmonėms pradėti investuoti, susidėlioti individualią investavimo strategiją ir protingai valdyti savo investicijas.",
  // Dizaino krypčių peržiūra neturi būti indeksuojama.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: 13 krypties įžangos skriptas prieš hidrataciją prideda klasę <html> elementui
    <html lang="lt" suppressHydrationWarning>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
