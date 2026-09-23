import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand } from "@/content/site";
import RevealObserver from "@/components/shared/RevealObserver";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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
    <html lang="lt">
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
