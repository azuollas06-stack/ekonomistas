# Ekonomisto užrašai – Marius Lencevičius

Nepriklausomo investavimo konsultanto svetainės pagrindinis puslapis (`/`).
Iš 14 dizaino krypčių klientas pasirinko 11-ąją – kitos pašalintos (yra git istorijoje),
o seni adresai `/design-XX` nukreipiami į `/`.

## Paleidimas

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Stack: Next.js 16 (App Router) + TypeScript + CSS Modules. Jokių UI / animacijų bibliotekų.
Visur gerbiamas `prefers-reduced-motion`.

## Struktūra

- `content/site.ts` – **visas tekstas vienoje vietoje** (paslaugos, DUK, formos ir skaičiuoklės tekstai, ribos).
- `components/home/HomePage.tsx` – puslapis; tamsios ir šviesios sekcijos susilieja per `.blendToLight` / `.blendToDark`.
- `components/fx/`:
  - `GuidedPath` – „Raskime jums tinkamą pradžią“ (3 klausimai, niekas nesiunčiama)
  - `IntroForm` – registracija pokalbiui; paspaudus elementą su `data-topic`, situacija formoje parenkama automatiškai
  - `CalculatorSheet` + `Calculator` – skaičiuoklė atskirame lange, atsidaro tik iš meniu „Skaičiuoklė“ (arba `/#skaiciuokle`)
  - `useModalDialog` – natūralus `<dialog>` su animuotu uždarymu, fokuso ir slinkimo valdymu
  - `CountUp`, `ScrollHeader`
- `components/shared/` – `Photo`, `MobileNav`, `RevealObserver`, `ConsentButton`.
- `lib/forms/` – formos validacija (`intro-call.ts`) ir serverio veiksmas (`actions.ts`).
- `lib/consent.ts` – vieta būsimam slapukų sutikimo (CMP) sprendimui.

## Dažnos užduotys

**Prijungti formą.** `lib/forms/actions.ts` → vietoje TODO išsiųsti laišką (pvz. per Resend), kai klientas
pateiks el. paštą. Tada `introForm.preview*` tekstus `content/site.ts` pakeisti tikru patvirtinimu.

**Pakeisti nuotraukas.** Dabar naudojamos pavyzdinės nuotraukos (su „PAVYZDIS“ ženklu).
Įkelkite tikras į `public/images/` tais pačiais pavadinimais arba pakeiskite `photos` objektą `content/site.ts`.

**Įjungti TT Commons Pro.** Įdėkite licencijuotus `.woff2` failus į `public/fonts/tt-commons-pro/` ir
atkomentuokite `@font-face` blokus `styles/fonts.css`.

**Pridėti paslaugą.** Naujas objektas `services` masyve – kortelės, 3 klausimų kelias ir formos pasirinkimai prisitaikys.

**Atsiliepimai.** `testimonials` tuščias – rodomi aiškiai pažymėti pavyzdžiai. Pildyti tik tikrais, su kliento sutikimu.

## Prieš paleidžiant

- Forma: el. paštas, siuntimo paslauga, tikra privatumo politika (`footer.links`).
- Tikros nuotraukos, DUK atsakymų ir „Investavimo užrašų“ temų patvirtinimas.
- Skaičiuoklės ribos (grąža iki 25 %) ir užrašas „Uždirbta“ – kliento sprendimas; įspėjimas palikti.
- `app/layout.tsx` – pašalinti `robots: noindex`.

## Saugumas / privatumas

- Jokių raktų frontend'e. Slapti kintamieji – tik be `NEXT_PUBLIC_` prefikso (žr. `.env.example`).
- Formos validacija – ir naršyklėje, ir serveryje; renkama tik tai, ko reikia susisiekti.
- Bazinės saugumo antraštės – `next.config.ts`.
