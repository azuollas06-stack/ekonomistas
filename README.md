# Marius Lencevičius – pagrindinio puslapio dizaino kryptys

5 skirtingos pagrindinio puslapio kryptys, iš kurių klientas renkasi vizualinę kryptį.

| Maršrutas     | Kryptis                    |
| ------------- | -------------------------- |
| `/`           | Visų krypčių sąrašas       |
| `/design-01`  | Minimalistinė              |
| `/design-02`  | Leidinio (editorial)       |
| `/design-03`  | Moderni konsultanto        |
| `/design-04`  | Asmeninis prekės ženklas   |
| `/design-05`  | Tamsi premium              |
| `/design-06`  | Augimo kreivė (eksperimentinė, mobile-first) |
| `/design-07`  | Fintech programėlė (eksperimentinė, mobile-first) |
| `/design-08`  | Kinetinė tipografija (eksperimentinė, mobile-first) |
| `/design-09`  | Aurora / stiklas (eksperimentinė, mobile-first) |

06–09 naudoja laisvas spalvas ir daugiau animacijų. Animacijos – be bibliotekų (`components/fx/`):
CSS scroll-driven animacijos (su atsarginiu variantu senesnėms naršyklėms), `CountUp`, `WordCycler`,
`GrowthLine`, `Tilt`, `StickyCta`, `SituationSheet` (naršyklės `<dialog>`). Visur gerbiamas `prefers-reduced-motion`.

## Paleidimas

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (visi puslapiai statiniai)
```

Stack: Next.js 16 (App Router) + TypeScript + CSS Modules. Jokių UI / animacijų bibliotekų.

## Struktūra

- `content/site.ts` – **visas tekstas vienoje vietoje**. Visi 5 variantai naudoja tuos pačius duomenis.
- `app/design-0X/` – kiekvieno varianto `page.tsx` + `page.module.css`.
- `components/shared/` – bendri komponentai:
  - `Photo` – nuotrauka arba neutralus placeholderis
  - `SituationPicker` – „Kur esate šiandien?“ (WAI-ARIA tabs, klaviatūra)
  - `PortfolioXray` – statinis DEMONSTRACINIS portfelio pavyzdys
  - `CalculatorTeaser` – iliustracinė skaičiuoklė (ne prognozė)
  - `MobileNav`, `RevealObserver`, `ConsentButton`, `DesignSwitcher`
- `lib/consent.ts` – vieta būsimam slapukų sutikimo (CMP) sprendimui.
- `lib/forms/intro-call.ts` – būsimos registracijos formos serverio pusės validacija.

## Dažnos užduotys

**Pakeisti nuotraukas.** Dabar naudojamos kliento pateiktos pavyzdinės nuotraukos (su „PAVYZDIS“ ženklu).
Įkelkite tikras į `public/images/` tais pačiais pavadinimais arba pakeiskite `photos` objektą `content/site.ts`
(taip pat atnaujinkite `width`/`height`). `src: null` – rodomas placeholderis „Mariaus portretas“.

**Įjungti TT Commons Pro.** Įdėkite licencijuotus `.woff2` failus į `public/fonts/tt-commons-pro/` ir
atkomentuokite `@font-face` blokus `styles/fonts.css`. Kol failų nėra – naudojamas sisteminis šriftas.

**Pridėti 5-ą paslaugą.** Pridėkite naują objektą į `services` masyvą `content/site.ts` (su `situation` lauku).
Sąrašai, tinkleliai ir „Kur esate šiandien?“ prisitaikys automatiškai.

**Atsiliepimai.** `testimonials` masyvas tuščias – kryptyje 04 rodomos aiškiai pažymėtos vietos.
Pildyti tik tikrais atsiliepimais su kliento sutikimu.

## Laukia kliento patvirtinimo

- Kontaktai (el. paštas, telefonas) – `brand.email` / `brand.phone`.
- DUK atsakymai ir proceso aprašymai (parašyti neutraliai, be pažadų).
- „Investavimo užrašų“ temos – pakeisti tikrais Instagram įrašais.
- Teisinė veiklos apimtis: svetainėje naudojamas tik kliento pateiktas teiginys apie BFAA (IA) licenciją.

## Saugumas / privatumas (paruošta vėlesniam etapui)

- Jokių raktų frontend'e. Slapti kintamieji – tik be `NEXT_PUBLIC_` prefikso (žr. `.env.example`).
- Formų validacija – serveryje (`lib/forms/intro-call.ts`), renkami tik minimalūs duomenys.
- Bazinės saugumo antraštės – `next.config.ts`.
- `robots: noindex` – dizaino peržiūra neindeksuojama.
