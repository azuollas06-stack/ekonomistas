/**
 * Visas pagrindinio puslapio turinys vienoje vietoje.
 * Visi 5 dizaino variantai naudoja tuos pačius duomenis – keičiasi tik pateikimas.
 *
 * TEISINĖ PASTABA: čia naudojami tik kliento pateikti teiginiai.
 * Nepridėkite teiginių apie licencijas, garantijas ar grąžą be kliento patvirtinimo.
 */

export const brand = {
  name: "Marius Lencevičius",
  firstName: "Marius",
  role: "Nepriklausomas investavimo konsultantas",
  tagline: "Investuoti gali kiekvienas.",
  instagram: {
    handle: "@ekonomistouzrasai",
    url: "https://www.instagram.com/ekonomistouzrasai/",
  },
  // TODO: klientas turi pateikti kontaktus. Kol nėra – nerodome išgalvotų.
  email: null as string | null,
  phone: null as string | null,
} as const;

export const nav = [
  { label: "Pagrindinis", href: "#pagrindinis" },
  { label: "Apie mane", href: "#apie" },
  { label: "Paslaugos", href: "#paslaugos" },
  { label: "Skaičiuoklė", href: "#skaiciuokle" },
  { label: "Kontaktai", href: "#kontaktai" },
] as const;

export const cta = {
  primary: "Registruotis konsultacijai",
  intro: "Nemokamas įvadinis pokalbis",
  introUpper: "Susitarti dėl nemokamo pokalbio",
  more: "Sužinoti daugiau",
  // Būsima registracijos sistema. Šiame etape – inkaras į kontaktų sekciją.
  href: "#kontaktai",
} as const;

export const hero = {
  lead: "Padedu žmonėms pradėti investuoti, susidėlioti individualią investavimo strategiją ir protingai valdyti savo investicijas.",
  body: "Investavimo sprendimus pritaikau individualiai – atsižvelgiant į žmogaus finansinę situaciją, tikslus, investavimo laikotarpį ir rizikos toleranciją.",
};

export const credentials = [
  { key: "patirtis", value: "5+", short: "metų patirtis", label: "5+ metų patirtis investavimo srityje" },
  { key: "issilavinimas", value: "Ekonomika", short: "išsilavinimas", label: "Ekonomikos išsilavinimas" },
  { key: "licencija", value: "BFAA", short: "investavimo konsultanto (IA) licencija", label: "BFAA investavimo konsultanto (IA) licencija" },
] as const;

export const problem = {
  title: "Norite investuoti, bet nežinote, nuo ko pradėti?",
  body: "Galbūt apie investavimą galvojate jau kurį laiką, tačiau vis atidėliojate, nes trūksta žinių, kyla per daug klausimų arba tiesiog nežinote, koks sprendimas būtų tinkamas būtent jums.",
  bridge: "Trumpas nemokamas pokalbis – galimybė susipažinti, papasakoti apie savo situaciją ir suprasti, nuo ko galėtumėte pradėti.",
};

export type Service = {
  id: string;
  title: string;
  /** Trumpas tekstas kortelėms */
  short: string;
  /** Pilnas kliento pateiktas tekstas */
  full: string;
  /** Situacija „Kur esate šiandien?“ sekcijai */
  situation: string;
  href: string;
};

export const servicesIntro = {
  title: "Kuo galiu jums padėti?",
  body: "Kiekvieno žmogaus finansinė situacija, tikslai ir galimybės yra skirtingi. Todėl investavimo sprendimai turėtų būti pritaikyti jums, o ne vienodi visiems.",
};

/**
 * Paslaugos. Penktą paslaugą pridėkite tiesiog kaip naują objektą šiame masyve –
 * visi variantai (sąrašai, tinkleliai, „Kur esate šiandien?“) prisitaikys automatiškai.
 */
export const services: Service[] = [
  {
    id: "konsultacija",
    title: "Investavimo konsultacija",
    short: "Įvertinsime jūsų situaciją, tikslus ir galimybes bei aptarsime jums tinkamus investavimo sprendimus.",
    full: "Norite pradėti investuoti, tačiau nežinote, nuo ko pradėti? Konsultacijos metu įvertinsime jūsų situaciją, tikslus ir galimybes bei aptarsime jums tinkamus investavimo sprendimus.",
    situation: "Noriu pradėti investuoti",
    href: "#kontaktai",
  },
  {
    id: "portfelis",
    title: "Investicijų portfelio valdymas",
    short: "Padėsiu suformuoti ir valdyti diversifikuotą portfelį pagal jūsų tikslus ir rizikos toleranciją.",
    full: "Jau investuojate arba norite investavimą patikėti profesionalui? Galiu padėti suformuoti ir valdyti diversifikuotą investicijų portfelį, atsižvelgiant į jūsų tikslus ir rizikos toleranciją.",
    situation: "Jau turiu investicijų",
    href: "#kontaktai",
  },
  {
    id: "vaikui",
    title: "Investavimas vaiko ateičiai",
    short: "Padėsiu įvertinti galimybes ir susidėlioti ilgalaikį kaupimo planą vaiko ateičiai.",
    full: "Norite pradėti kaupti ir investuoti vaiko ateičiai, tačiau nežinote, kokį sprendimą pasirinkti? Padėsiu įvertinti galimybes ir susidėlioti ilgalaikį planą.",
    situation: "Noriu kaupti vaiko ateičiai",
    href: "#kontaktai",
  },
  {
    id: "verslui",
    title: "Investavimo sprendimai verslui",
    short: "Įvertinsime, kaip įdarbinti laisvas įmonės lėšas pagal verslo tikslus, laikotarpį ir riziką.",
    full: "Įmonė turi laisvų lėšų, kurias norėtumėte įdarbinti? Padėsiu įvertinti investavimo galimybes ir pasirinkti sprendimus, atsižvelgiant į verslo tikslus, laikotarpį ir riziką.",
    situation: "Įmonė turi laisvų lėšų",
    href: "#kontaktai",
  },
];

export const process = {
  title: "Kaip vyksta darbas",
  steps: [
    { n: "01", title: "Susipažįstame", body: "Trumpas pokalbis apie jūsų situaciją, tikslus ir klausimus." },
    { n: "02", title: "Įvertiname situaciją", body: "Aptariame finansinę padėtį, investavimo laikotarpį ir požiūrį į riziką." },
    { n: "03", title: "Susidėliojame strategiją", body: "Individualus planas: lėšų paskirstymas, diversifikacija ir tinkamos platformos." },
    { n: "04", title: "Priimame sprendimus", body: "Paaiškinu pasirinkimus ir jų kainą – sprendimą priimate suprasdami, ką ir kodėl darote." },
    { n: "05", title: "Peržiūrime ir koreguojame", body: "Keičiantis tikslams ar gyvenimo situacijai, strategiją periodiškai peržiūrime." },
  ],
};

export const introCall = {
  eyebrow: "Nemokamas įvadinis pokalbis",
  title: "Pradėkime nuo pokalbio",
  lead: "Dar nesate tikri, ar jums reikia investavimo konsultacijos?",
  body: [
    "Susitarkime trumpam nemokamam įvadiniam pokalbiui.",
    "Papasakosite apie savo situaciją, tikslus ir klausimus, o aš paaiškinsiu, kuo galėčiau jums padėti ir nuo ko būtų prasminga pradėti.",
  ],
  listTitle: "Pokalbio metu:",
  list: [
    "trumpai aptarsime jūsų situaciją",
    "išsiaiškinsime, ko ieškote",
    "atsakysiu į pirmuosius klausimus",
    "aptarsime, ar jums būtų naudinga išsamesnė konsultacija",
  ],
  note: "Jokio įsipareigojimo.",
};

export const about = {
  title: "Apie mane",
  paragraphs: [
    "Į investavimo sritį atėjau supratęs, kad daugeliui žmonių investuoti trukdo ne susidomėjimo stoka, o aiškios informacijos ir krypties trūkumas.",
    "Kai pasirinkimų daug, o informacija dažnai prieštaringa, pradėti gali būti sudėtinga.",
    "Todėl siekiu investavimo procesą padaryti aiškesnį, suprantamesnį ir pritaikytą individualiai situacijai.",
    "Todėl mano tikslas – padėti žmogui ne tik investuoti, bet ir suprasti savo finansinius sprendimus.",
    "Investavimo srityje esu daugiau nei 5 metus. Esu baigęs ekonomikos studijas, turiu BFAA (Baltic Financial Advisors Association) investavimo konsultanto (IA) licenciją.",
    "Savo darbe vadovaujuosi ilgalaikio investavimo ir diversifikacijos principais.",
    "Kiekvienam klientui ieškau individualaus sprendimo, atsižvelgdamas į jo finansinę situaciją, tikslus, galimybes ir rizikos toleranciją.",
    "Kadangi nesu susietas su viena konkrečia investavimo platforma, klientui galiu pristatyti skirtingų bankų ir brokerių sprendimus bei jų įkainius ir padėti įvertinti, kuris pasirinkimas jo situacijoje būtų tinkamiausias.",
  ],
  pullQuote: "Mano tikslas – padėti žmogui ne tik investuoti, bet ir suprasti savo finansinius sprendimus.",
  principles: [
    { title: "Ilgalaikis investavimas", body: "Sprendimai vertinami metų, o ne savaičių perspektyvoje." },
    { title: "Diversifikacija", body: "Rizika paskirstoma tarp turto klasių, regionų ir sektorių." },
    { title: "Nepriklausomumas", body: "Nesu susietas su viena platforma – lyginame skirtingų bankų ir brokerių sprendimus bei įkainius." },
  ],
};

export const situationPicker = {
  title: "Kur esate šiandien?",
  lead: "Pasirinkite, kas geriausiai apibūdina jūsų situaciją.",
};

/** DEMONSTRACINIAI duomenys – ne reali rekomendacija ir ne reali kliento informacija. */
export const xray = {
  title: "Kaip atrodo portfelio peržiūra",
  lead: "Konsultacijos metu esamą ar planuojamą portfelį išskaidome į sudedamąsias dalis: kur investuota, kiek diversifikuota ir kokia rizika prisiimama.",
  badge: "Demonstracinis pavyzdys",
  disclaimer: "Duomenys išgalvoti ir skirti tik iliustracijai. Tai nėra investavimo rekomendacija.",
  assets: [
    { label: "Akcijų ETF", value: 55 },
    { label: "Obligacijų ETF", value: 30 },
    { label: "Pavienės akcijos", value: 10 },
    { label: "Grynieji pinigai", value: 5 },
  ],
  regions: [
    { label: "Šiaurės Amerika", value: 52 },
    { label: "Europa", value: 26 },
    { label: "Azija ir Ramusis vandenynas", value: 12 },
    { label: "Besivystančios rinkos", value: 10 },
  ],
  metrics: [
    { label: "Pozicijų skaičius", value: "7" },
    { label: "Didžiausia pozicija", value: "32 %" },
    { label: "Vid. metinis išlaidų koef.", value: "0,21 %" },
  ],
  risk: { label: "Rizikos lygis", value: 3, max: 5, text: "Vidutinė" },
  findings: [
    "Didesnė dalis investicijų – vieno regiono rinkose.",
    "Pavienių akcijų dalis didina koncentracijos riziką.",
    "Išlaidų lygis – palyginti žemas.",
  ],
};

/**
 * „Kelias iki pokalbio“ – 3 klausimai. Atsakymai niekur nesiunčiami ir nesaugomi;
 * jie tik parenka paslaugą ir bendro pobūdžio paaiškinimą (ne investavimo rekomendaciją).
 */
export const guidedPath = {
  title: "Raskime jums tinkamą pradžią",
  lead: "Trys trumpi klausimai – ir matysite, nuo ko būtų prasminga pradėti pokalbį.",
  privacy: "Atsakymai niekur nesiunčiami ir nesaugomi.",
  horizon: {
    question: "Kokiam laikotarpiui planuojate?",
    options: [
      { id: "short", label: "Iki 3 metų", note: "Trumpesniam laikotarpiui ypač svarbus rizikos valdymas ir lėšų prieinamumas." },
      { id: "mid", label: "3–10 metų", note: "Vidutiniam laikotarpiui dažnai ieškoma balanso tarp augimo ir stabilumo." },
      { id: "long", label: "Daugiau nei 10 metų", note: "Ilgas laikotarpis leidžia labiau remtis reguliarumu ir diversifikacija." },
    ],
  },
  experience: {
    question: "Kiek patirties turite investuojant?",
    options: [
      { id: "none", label: "Dar neinvestavau", note: "Viską paaiškinsiu nuo pagrindų – išankstinių žinių nereikia." },
      { id: "some", label: "Šiek tiek bandžiau", note: "Pradėsime nuo to, ką jau žinote, ir aiškiai sudėliosime likusius dalykus." },
      { id: "regular", label: "Investuoju reguliariai", note: "Galėsime kartu peržiūrėti esamą portfelį ir jo struktūrą." },
    ],
  },
  resultKicker: "Jums tinkamiausia pradžia",
  restart: "Pradėti iš naujo",
  back: "Atgal",
};

/** DEMONSTRACINIS portfelio palyginimas „prieš / po“ – išgalvoti duomenys, ne rezultatų pažadas. */
export const portfolioCompare = {
  title: "Ką reiškia struktūruotas portfelis",
  lead: "Pavyzdys, kaip konsultacijos metu gali pasikeisti požiūris į tą patį portfelį: kas jame yra, kiek jis diversifikuotas ir kokia rizika prisiimama.",
  badge: "Demonstracinis pavyzdys",
  disclaimer:
    "Duomenys išgalvoti ir skirti tik iliustracijai. Tai nėra rezultatų pažadas ar investavimo rekomendacija – sprendimai priklauso nuo jūsų tikslų ir rizikos tolerancijos.",
  states: {
    before: {
      label: "Prieš konsultaciją",
      assets: [
        { label: "Pavienės akcijos", value: 62 },
        { label: "Akcijų ETF", value: 18 },
        { label: "Obligacijų ETF", value: 0 },
        { label: "Grynieji pinigai", value: 20 },
      ],
      regions: [
        { label: "Šiaurės Amerika", value: 84 },
        { label: "Europa", value: 11 },
        { label: "Kiti regionai", value: 5 },
      ],
      metrics: [
        { label: "Pozicijų", value: "3" },
        { label: "Didžiausia pozicija", value: "41 %" },
        { label: "Vid. išlaidų koef.", value: "0,74 %" },
      ],
      risk: { value: 4, text: "Aukšta" },
      note: "Didelė dalis – keliose pavienėse akcijose ir viename regione.",
    },
    after: {
      label: "Po konsultacijos",
      assets: [
        { label: "Pavienės akcijos", value: 10 },
        { label: "Akcijų ETF", value: 55 },
        { label: "Obligacijų ETF", value: 30 },
        { label: "Grynieji pinigai", value: 5 },
      ],
      regions: [
        { label: "Šiaurės Amerika", value: 55 },
        { label: "Europa", value: 27 },
        { label: "Kiti regionai", value: 18 },
      ],
      metrics: [
        { label: "Pozicijų", value: "7" },
        { label: "Didžiausia pozicija", value: "32 %" },
        { label: "Vid. išlaidų koef.", value: "0,21 %" },
      ],
      risk: { value: 3, text: "Vidutinė" },
      note: "Rizika paskirstyta tarp turto klasių ir regionų pagal pasirinktą profilį.",
    },
  },
};

/**
 * DEMONSTRACINIS konsultacijos plano pavyzdys.
 * TODO: patvirtinti su klientu, ar po konsultacijos pateikiamas rašytinis planas ir kokios formos.
 */
export const planPreview = {
  title: "Kaip gali atrodyti jūsų planas",
  lead: "Konsultacijos esmė – aiškumas. Pavyzdys, kaip gali būti susisteminti jūsų tikslai, sprendimai ir tolesni žingsniai.",
  badge: "Pavyzdys",
  disclaimer: "Demonstracinis pavyzdys – tikslus turinys ir forma priklauso nuo jūsų situacijos.",
  pages: [
    {
      title: "Situacijos santrauka",
      rows: ["Tikslas: kaupti ilgalaikiam tikslui", "Laikotarpis: daugiau nei 10 metų", "Rizikos tolerancija: vidutinė"],
    },
    {
      title: "Lėšų paskirstymas",
      bars: [
        { label: "Akcijų ETF", value: 60 },
        { label: "Obligacijų ETF", value: 30 },
        { label: "Grynieji", value: 10 },
      ],
    },
    {
      title: "Tolesni žingsniai",
      rows: ["Pasirinkti platformą pagal įkainius", "Nustatyti reguliarią investiciją", "Peržiūrėti strategiją kas 12 mėn."],
    },
  ],
};

export const calculator = {
  title: "Skaičiuoklė",
  lead: "Pažiūrėkite, kaip laikas ir reguliarumas gali paveikti sukauptą sumą.",
  badge: "Iliustracinis skaičiavimas",
  disclaimer:
    "Skaičiavimas iliustracinis. Hipotetinė grąža nėra prognozė ar pažadas – realūs rezultatai gali skirtis, o investicijų vertė gali ir kristi.",
  defaults: { initial: 1000, monthly: 100, years: 15, rate: 5 },
  link: "Atidaryti skaičiuoklę",
};

export const notes = {
  title: "Investavimo užrašai",
  lead: "Edukacinis turinys apie investavimą, ETF, ekonomiką ir finansinį raštingumą – Instagram paskyroje.",
  // TODO: pakeisti tikrais įrašais iš Instagram (pavadinimas + nuoroda).
  topics: [
    { tag: "ETF", title: "Kas yra ETF ir kodėl juos renkasi ilgalaikiai investuotojai" },
    { tag: "Pasyvus investavimas", title: "Kodėl reguliarumas dažnai svarbesnis už tobulą momentą" },
    { tag: "Ekonomika", title: "Infliacija ir santaupos: ką verta žinoti" },
    { tag: "Pagrindai", title: "Rizika ir grąža – paprastai apie svarbiausią ryšį" },
  ],
  follow: "Sekti Instagram",
};

/**
 * Klientų atsiliepimai. Kol nėra tikrų atsiliepimų su klientų sutikimu – masyvas tuščias,
 * o dizaine rodomos aiškiai pažymėtos vietos. Atsiliepimų NEIŠGALVOJAME.
 */
export const testimonials: { quote: string; name: string; context?: string }[] = [];

/**
 * PAVYZDINIAI atsiliepimai – tik dizaino peržiūrai, visada rodomi su žyme „Pavyzdys“.
 * Tai NE tikri klientai. Prieš publikuojant pakeisti tikrais (`testimonials`) arba pašalinti.
 */
export const sampleTestimonials = [
  {
    quote:
      "Apie investavimą galvojau kelerius metus, bet vis atidėdavau. Po pokalbio pagaliau supratau, nuo ko pradėti ir kodėl būtent taip.",
    name: "Klientė",
    context: "Pradedanti investuotoja",
  },
  {
    quote:
      "Turėjau kelis atsitiktinai pasirinktus ETF ir nežinojau, ar portfelis subalansuotas. Dabar suprantu, ką turiu ir kodėl.",
    name: "Klientas",
    context: "Jau investuojantis",
  },
  {
    quote:
      "Norėjome pradėti kaupti vaikui, bet pasiklydome pasiūlymuose. Viskas buvo paaiškinta paprastai ir be jokio spaudimo.",
    name: "Tėvai",
    context: "Kaupia vaiko ateičiai",
  },
];

export const faq = {
  title: "Dažniausi klausimai",
  // TODO: atsakymus patvirtinti su klientu prieš publikuojant.
  items: [
    {
      q: "Ar įvadinis pokalbis tikrai nemokamas?",
      a: "Taip. Trumpas įvadinis pokalbis yra nemokamas ir nesukuria jokių įsipareigojimų. Jo tikslas – susipažinti ir suprasti, ar ir kaip galėčiau jums padėti.",
    },
    {
      q: "Kiek pinigų reikia, norint pradėti investuoti?",
      a: "Vienos visiems tinkamos sumos nėra. Svarbiau yra aiškus tikslas, investavimo laikotarpis ir reguliarumas. Konsultacijos metu įvertinsime, kokia suma būtų prasminga jūsų situacijoje.",
    },
    {
      q: "Ar reikia turėti investavimo žinių?",
      a: "Ne. Dalis žmonių tik pradeda domėtis investavimu. Viską paaiškinsiu suprantamai, kad sprendimus priimtumėte žinodami, ką darote ir kodėl.",
    },
    {
      q: "Ką reiškia „nepriklausomas“ konsultantas?",
      a: "Nesu susietas su viena konkrečia investavimo platforma, todėl galiu pristatyti skirtingų bankų ir brokerių sprendimus bei jų įkainius ir padėti įvertinti, kuris pasirinkimas jūsų situacijoje būtų tinkamiausias.",
    },
    {
      q: "Ar investuojant galima prarasti pinigų?",
      a: "Taip. Investavimas visada susijęs su rizika – investicijų vertė gali tiek kilti, tiek kristi, o praeities rezultatai negarantuoja ateities rezultatų. Todėl strategiją dėliojame atsižvelgdami į jūsų rizikos toleranciją ir laikotarpį.",
    },
    {
      q: "Kas vyksta po įvadinio pokalbio?",
      a: "Jei nuspręsime, kad išsamesnė konsultacija jums būtų naudinga, susitarsime dėl tolesnių žingsnių. Jei ne – turėsite aiškesnį supratimą, nuo ko galėtumėte pradėti.",
    },
  ],
};

export const finalCta = {
  title: "Pirmas žingsnis – pokalbis.",
  body: "Papasakokite apie savo situaciją ir kartu išsiaiškinsime, nuo ko būtų prasminga pradėti.",
};

export const footer = {
  disclaimer:
    "Svetainėje pateikta informacija yra bendro pobūdžio ir nėra individuali investavimo rekomendacija. Investavimas susijęs su rizika – investicijų vertė gali tiek kilti, tiek kristi.",
  links: [
    { label: "Privatumo politika", href: "#" },
    { label: "Slapukų politika", href: "#" },
  ],
  year: 2026,
};

/**
 * Nuotraukos. Kol kas naudojamos kliento pateiktos PAVYZDINĖS nuotraukos (su vandens ženklu).
 * Kai bus tikros nuotraukos – pakeiskite failus /public/images/ arba `src` čia.
 * Nustačius `src: null`, rodomas neutralus placeholderis su `placeholder` tekstu.
 */
export type PhotoKey = keyof typeof photos;
export const photos = {
  portrait: {
    src: "/images/marius-portretas.png" as string | null,
    width: 1168,
    height: 1346,
    alt: "Marius Lencevičius, nepriklausomas investavimo konsultantas, darbo kabinete",
    placeholder: "Mariaus portretas",
  },
  desk: {
    src: "/images/marius-prie-kompiuterio.png" as string | null,
    width: 1168,
    height: 1346,
    alt: "Marius Lencevičius dirba prie stalo su nešiojamu kompiuteriu",
    placeholder: "Marius darbe",
  },
  workspace: {
    src: "/images/mariaus-darbo-vieta.png" as string | null,
    width: 1536,
    height: 1024,
    alt: "Mariaus darbo vieta: knygos apie investavimą, užrašų knygelė ir kompiuteris",
    placeholder: "Darbo vieta",
  },
};
