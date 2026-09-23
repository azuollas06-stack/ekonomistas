import Link from "next/link";
import { brand } from "@/content/site";
import { DESIGNS } from "@/components/shared/DesignSwitcher";
import s from "./page.module.css";

const NOTES: Record<string, string> = {
  "design-01": "Šviesu, daug erdvės, viena didelė nuotrauka ir stipri tipografija. Beveik jokių kortelių.",
  "design-02": "Žurnalo logika: asimetrija, plonos linijos, didelės antraštės ir redakcinis ritmas.",
  "design-03": "Aiškus tinklelis, skaičiai ir struktūra. Labiau korporatyvu, bet asmeniška.",
  "design-04": "Marius – svetainės veidas: didelės nuotraukos, istorija ir „Apie mane“ pirmame plane.",
  "design-05": "Tamsi, rami privačios bankininkystės estetika su didele fotografija.",
};

export default function Index() {
  return (
    <main className={s.main}>
      <header className={s.head}>
        <p className={s.kicker}>{brand.name} · pagrindinio puslapio dizaino kryptys</p>
        <h1 className={s.title}>Pasirinkite kryptį</h1>
        <p className={s.lead}>
          Visi penki variantai naudoja tą patį turinį ir prekės ženklą. Skiriasi išdėstymas, tipografija, nuotraukų
          panaudojimas ir bendras charakteris.
        </p>
      </header>
      <ol role="list" className={s.list}>
        {DESIGNS.map((d, i) => (
          <li key={d.slug}>
            <Link href={`/${d.slug}`} className={s.item}>
              <span className={s.n}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.name}>{d.name}</span>
              <span className={s.note}>{NOTES[d.slug]}</span>
              <span className={s.go} aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className={s.foot}>Nuotraukos – laikini pavyzdžiai. Šriftas TT Commons Pro bus prijungtas gavus licencijuotus failus.</p>
    </main>
  );
}
