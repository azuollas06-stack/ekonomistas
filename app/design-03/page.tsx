import type { Metadata } from "next";
import ConsultantPage from "@/components/variants/ConsultantPage";

export const metadata: Metadata = { title: "Kryptis 03 – Moderni konsultanto | Marius Lencevičius" };

export default function Design03() {
  return <ConsultantPage current={3} />;
}