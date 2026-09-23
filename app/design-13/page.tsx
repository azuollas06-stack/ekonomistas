import type { Metadata } from "next";
import ConsultantSignature from "@/components/variants/ConsultantSignature";

export const metadata: Metadata = { title: "Kryptis 13 – Parašo versija | Marius Lencevičius" };

/** 11 krypties pagrindas + parašo detalės, kurios išskiria svetainę. */
export default function Design13() {
  return <ConsultantSignature current={13} />;
}
