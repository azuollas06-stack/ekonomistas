import type { Metadata } from "next";
import ConsultantPage from "@/components/variants/ConsultantPage";

export const metadata: Metadata = { title: "Kryptis 11 – Konsultanto su judančiomis kortelėmis | Marius Lencevičius" };

/** 03 kryptis + 05 krypties hero + paslaugų kortelės, kurios kraunasi slenkant (iš 08) + atsiliepimai. */
export default function Design11() {
  return <ConsultantPage current={11} heroStyle="dark" servicesLayout="stack" withTestimonials />;
}