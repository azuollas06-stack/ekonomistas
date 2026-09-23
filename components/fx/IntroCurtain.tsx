import styles from "./IntroCurtain.module.css";

/**
 * Trumpa įžanga (~1 s): monograma, plona linija, tada uždanga pakyla.
 * Tik CSS – veikia ir be JS. Mažas įterptas skriptas prieš piešimą paslepia ją,
 * jei per šį apsilankymą ji jau buvo parodyta (sessionStorage). Globali klasė `ml-intro-seen`
 * leidžia puslapiui atsisakyti įžangai skirtos delsos.
 */
export default function IntroCurtain({ monogram, label }: { monogram: string; label: string }) {
  const script = `try{var k="ml-intro-13";if(sessionStorage.getItem(k)){document.documentElement.classList.add("${styles.seen}","ml-intro-seen")}else{sessionStorage.setItem(k,"1")}}catch(e){}`;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className={styles.curtain} aria-hidden="true">
        <div className={styles.inner}>
          <span className={styles.mono}>{monogram}</span>
          <span className={styles.rule} />
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    </>
  );
}
