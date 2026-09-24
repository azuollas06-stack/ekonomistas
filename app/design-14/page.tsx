import type { Metadata } from "next";
import ConsultantTrust from "@/components/variants/ConsultantTrust";

export const metadata: Metadata = { title: "Kryptis 14 – Patikimumo versija | Marius Lencevičius" };

/** Mažiau teksto, aiškūs faktai (valdomos investicijos, licencija, patirtis) ir ramios animacijos. */
export default function Design14() {
  return <ConsultantTrust current={14} />;
}
