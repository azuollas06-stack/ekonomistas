import type { Metadata } from "next";
import ConsultantPro from "@/components/variants/ConsultantPro";

export const metadata: Metadata = { title: "Kryptis 11 – Konsultanto su judančiomis kortelėmis | Marius Lencevičius" };

/**
 * 03 struktūra + 05 hero + slenkant „suvažiuojančios“ paslaugų kortelės (iš 08) + atsiliepimai.
 * Švaresnė, profesionalesnė versija su subtiliomis animacijomis (ConsultantPro).
 */
export default function Design11() {
  return <ConsultantPro current={11} />;
}
