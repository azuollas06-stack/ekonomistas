import Link from "next/link";
import styles from "./DesignSwitcher.module.css";

export const DESIGNS = [
  { slug: "design-01", name: "Minimalistinė" },
  { slug: "design-02", name: "Leidinio" },
  { slug: "design-03", name: "Moderni konsultanto" },
  { slug: "design-04", name: "Asmeninis prekės ženklas" },
  { slug: "design-05", name: "Tamsi premium" },
] as const;

/** Peržiūros įrankis klientui – galutinėje svetainėje nebus. */
export default function DesignSwitcher({ current }: { current: number }) {
  const total = DESIGNS.length;
  const prev = DESIGNS[(current - 2 + total) % total];
  const next = DESIGNS[current % total];
  return (
    <nav className={styles.root} aria-label="Dizaino krypčių peržiūra">
      <Link href={`/${prev.slug}`} className={styles.arrow} aria-label={`Ankstesnė kryptis: ${prev.name}`}>
        ←
      </Link>
      <Link href="/" className={styles.label}>
        Kryptis {String(current).padStart(2, "0")}
        <span aria-hidden="true"> / </span>
        <span className="sr-only"> iš </span>
        {String(total).padStart(2, "0")}
      </Link>
      <Link href={`/${next.slug}`} className={styles.arrow} aria-label={`Kita kryptis: ${next.name}`}>
        →
      </Link>
    </nav>
  );
}
