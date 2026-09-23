import styles from "./IntroCurtain.module.css";

/**
 * Įžanga-parašas (~2,4 s): vienu brūkšniu išsirašo „ML“ monograma, jos uodega virsta
 * kylančia augimo kreive, parašas išblunka, o fonas ištirpsta ir atidengia hero.
 *
 * Tik CSS – veikia ir be JS. Mažas įterptas skriptas prieš piešimą paslepia įžangą,
 * jei per šį apsilankymą ji jau buvo parodyta (sessionStorage). Globali klasė
 * `ml-intro-seen` leidžia puslapiui atsisakyti įžangai skirtos delsos.
 *
 * TODO: kai bus tikras Mariaus parašas (SVG), pakeisti SIGNATURE kelią.
 */
const SIGNATURE =
  "M290 390 C300 330 318 250 332 222 C338 210 346 214 348 228 C354 280 360 330 366 352 " +
  "C370 330 384 260 398 224 C404 210 413 213 414 228 C418 290 420 340 428 372 " +
  "C434 392 452 388 466 360 C486 316 510 240 520 196 C526 170 508 162 498 182 " +
  "C484 214 478 300 470 360 C464 400 440 412 430 398 C422 386 446 378 480 384 " +
  "C530 392 580 404 620 398";

// Uodega prasideda ten, kur baigiasi parašas, ir kyla į viršų su nedideliais „rinkos“ svyravimais.
const TAIL =
  "M620 398 C680 392 700 362 740 366 S800 332 832 336 S884 280 914 286 S960 214 986 196 S1030 104 1070 40";

export default function IntroCurtain({ label }: { label: string }) {
  const script = `try{var k="ml-intro-13b";if(sessionStorage.getItem(k)){document.documentElement.classList.add("${styles.seen}","ml-intro-seen")}else{sessionStorage.setItem(k,"1")}}catch(e){}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className={styles.curtain} aria-hidden="true">
        <svg className={styles.svg} viewBox="180 20 880 460" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="intro-tail" x1="620" y1="398" x2="1070" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="currentColor" stopOpacity="1" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path className={styles.sig} d={SIGNATURE} pathLength={1} />
          <path className={styles.tail} d={TAIL} pathLength={1} stroke="url(#intro-tail)" />
          <circle className={styles.head} cx="1070" cy="40" r="5" />
        </svg>
        <p className={styles.label}>{label}</p>
      </div>
    </>
  );
}
