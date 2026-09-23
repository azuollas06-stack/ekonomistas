import type { Metadata } from "next";
import ConsultantPage from "@/components/variants/ConsultantPage";

export const metadata: Metadata = { title: "Kryptis 10 – Konsultanto su tamsiu hero | Marius Lencevičius" };

/** 03 kryptis + 05 krypties hero + atsiliepimai. */
export default function Design10() {
  return <ConsultantPage current={10} heroStyle="dark" withTestimonials />;
}