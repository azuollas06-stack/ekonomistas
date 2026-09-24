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
  "design-06": "Tamsiai žalia ir laimo. Augimo kreivė piešiasi slenkant, braukiamos kortelės, lipni CTA juosta.",
  "design-07": "Kaip mobilioji programėlė: bento plytelės, apatinė navigacija, iššokantis „Kur esate šiandien?“ lapas.",
  "design-08": "Drąsi judanti tipografija: besikeičiantis žodis, bėganti eilutė, viena ant kitos kraunamos kortelės.",
  "design-09": "Tamsi aurora, stiklinės kortelės, švytintys kraštai ir 3D pakrypimas.",
  "design-10": "03 kryptis su tamsiu 05 hero (nuotrauka ir tekstas) ir atsiliepimų skiltimi.",
  "design-11": "Švaresnė 10 versija: slenkant „suvažiuojančios“ paslaugų kortelės, plona tipografija ir subtilios animacijos.",
  "design-12": "09 aurora ir stiklas, bet prekės ženklo spalvomis: tamsus fonas, šviesus kreminis tekstas.",
  "design-13": "11 pagrindas su parašo detalėmis: įžanga, augimo linija, 3 klausimų kelias, plano pavyzdys, portfelis prieš ir po.",
  "design-14": "Patikimumo versija: mažiau teksto, 200 000 €+ valdomų investicijų, licencija ir patirtis pirmame ekrane, ramios animacijos.",
};

export default function Index() {
  return (
    <main className={s.main}>
      <header className={s.head}>
        <p className={s.kicker}>{brand.name} · pagrindinio puslapio dizaino kryptys</p>
        <h1 className={s.title}>Pasirinkite kryptį</h1>
        <p className={s.lead}>
          Visi variantai naudoja tą patį turinį. 01–05 laikosi prekės ženklo spalvų ir ramaus stiliaus, 06–09 – laisvesni
          eksperimentai su kitomis spalvomis ir daugiau animacijų, kurti pirmiausia telefonui.
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
