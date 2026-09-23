import type { Metadata } from "next";
import {
  brand,
  nav,
  cta,
  hero,
  problem,
  servicesIntro,
  services,
  process,
  introCall,
  about,
  calculator,
  notes,
  faq,
  finalCta,
  footer,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import MobileNav from "@/components/shared/MobileNav";
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import WordCycler from "@/components/fx/WordCycler";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 08 – Kinetinė tipografija | Marius Lencevičius" };

const WHO = ["studentas.", "tėvai.", "verslas.", "pradedantysis.", "kiekvienas."];
const TICKER = ["ETF", "Diversifikacija", "Ilgalaikis investavimas", "Finansinis raštingumas", "Pasyvus investavimas", "Rizikos tolerancija"];

/** Bėganti eilutė (tik CSS). Turinys dubliuojamas, kad ciklas būtų vientisas. */
function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = items.map((t) => (
    <span key={t}>
      {t}
      <i aria-hidden="true">✦</i>
    </span>
  ));
  return (
    <div className={s.marquee} data-reverse={reverse} aria-hidden="true">
      <div className={s.marqueeTrack}>
        {row}
        {row}
      </div>
    </div>
  );
}

/** Tekstas, kurio žodžiai „užsidega“ slenkant (CSS scroll-driven; be palaikymo – iškart matomas). */
function ScrollWords({ text, className }: { text: string; className?: string }) {
  return (
    <p className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className={s.sw}>
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export default function Design08() {
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.header}>
        <a href="#pagrindinis" className={s.logo}>
          Marius L.
        </a>
        <nav aria-label="Pagrindinė navigacija" className={s.nav}>
          <ul role="list">
            {nav.slice(1).map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav links={nav} ctaLabel={cta.intro} ctaHref={cta.href} buttonClassName={s.menuBtn} panelClassName={s.mobilePanel} />
      </header>

      <main id="turinys">
        {/* HERO */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={s.heroTitle} aria-label={brand.tagline}>
            <span aria-hidden="true" className={s.l1}>
              Investuoti
            </span>
            <span aria-hidden="true" className={s.l2}>
              gali
            </span>
            <span aria-hidden="true" className={s.l3}>
              <WordCycler words={WHO} />
            </span>
          </h1>

          <div className={s.heroGrid}>
            <div className={s.sticker}>
              <Photo name="portrait" className={s.stickerPhoto} sizes="(min-width: 900px) 22vw, 60vw" priority reveal={false} position="50% 18%" />
              <a href={cta.href} className={s.badge} aria-label={cta.intro}>
                <svg viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <path id="circ08" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text>
                    <textPath href="#circ08">Nemokamas įvadinis pokalbis • Nemokamas įvadinis pokalbis •</textPath>
                  </text>
                </svg>
                <span className={s.badgeArrow} aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
            <div className={s.heroCopy}>
              <p className={s.who}>
                <b>{brand.name}</b>
                <br />
                {brand.role}
              </p>
              <p className={s.heroLead}>{hero.lead}</p>
              <p className={s.heroBody}>{hero.body}</p>
              <div className={s.actions}>
                <a href={cta.href} className={s.btn}>
                  {cta.intro}
                </a>
                <a href={cta.href} className={s.btnLine}>
                  {cta.primary}
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className={s.tickers}>
          <Marquee items={TICKER} />
          <Marquee items={["5+ metų patirtis", "Ekonomikos išsilavinimas", "BFAA investavimo konsultanto (IA) licencija", "Nepriklausomas"]} reverse />
        </div>

        {/* PROBLEMA */}
        <section className={s.problem} aria-labelledby="problem-title">
          <h2 id="problem-title" className={s.problemTitle}>
            {problem.title}
          </h2>
          <ScrollWords text={problem.body} className={s.scrollText} />
          <p className={s.problemBridge}>{problem.bridge}</p>
        </section>

        {/* PASLAUGOS – kortelės kraunasi viena ant kitos */}
        <section id="paslaugos" className={s.services} aria-labelledby="services-title">
          <div className={s.servicesHead}>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p>{servicesIntro.body}</p>
          </div>
          <ul role="list" className={s.stack}>
            {services.map((svc, i) => (
              <li key={svc.id} className={s.stackCard} style={{ ["--i" as string]: i }}>
                <p className={s.stackQuote}>„{svc.situation}“</p>
                <h3 className={s.stackTitle}>{svc.title}</h3>
                <p className={s.stackText}>{svc.full}</p>
                <a href={svc.href} className={s.stackLink}>
                  {cta.more}
                  <span className="sr-only">: {svc.title}</span> <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* PROCESAS */}
        <section className={s.process} aria-labelledby="process-title">
          <h2 id="process-title" className={s.h2}>
            {process.title}
          </h2>
          <ol role="list" className={s.steps}>
            {process.steps.map((step) => (
              <li key={step.n}>
                <span className={s.bigN} aria-hidden="true">
                  {step.n}
                </span>
                <div>
                  <h3>
                    <span className="sr-only">{step.n}. </span>
                    {step.title}
                  </h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* POKALBIS */}
        <section className={s.intro} aria-labelledby="intro-title">
          <p className={s.introKicker}>{introCall.eyebrow}</p>
          <h2 id="intro-title" className={s.introTitle}>
            {introCall.title}
          </h2>
          <p className={s.introLead}>{introCall.lead}</p>
          <div className={s.introCols}>
            <div className={s.introBody}>
              {introCall.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ol role="list" className={s.introList}>
              {introCall.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ol>
          </div>
          <p className={s.introNote}>{introCall.note}</p>
          <a href={cta.href} className={s.btnBig}>
            {cta.introUpper} <span aria-hidden="true">→</span>
          </a>
        </section>

        {/* APIE */}
        <section id="apie" className={s.about} aria-labelledby="about-title">
          <div className={s.duotone}>
            <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 900px) 45vw, 100vw" position="50% 25%" />
          </div>
          <div className={s.aboutText}>
            <h2 id="about-title" className={s.h2}>
              {about.title}
            </h2>
            <ScrollWords text={about.paragraphs[3]} className={s.aboutBig} />
            <p>{about.paragraphs[0]}</p>
            <p>{about.paragraphs[4]}</p>
            <p>{about.paragraphs[7]}</p>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.calcSection} aria-labelledby="calc-title">
          <h2 id="calc-title" className={s.h2}>
            {calculator.title}
          </h2>
          <p className={s.calcLead}>{calculator.lead}</p>
          <div className={s.calc}>
            <CalculatorTeaser />
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.notes} aria-labelledby="notes-title">
          <h2 id="notes-title" className={s.h2}>
            {notes.title}
          </h2>
          <ul role="list" className={s.noteList}>
            {notes.topics.map((n) => (
              <li key={n.title}>
                <span className={s.noteTag}>{n.tag}</span>
                <span className={s.noteTitle}>{n.title}</span>
              </li>
            ))}
          </ul>
          <a href={brand.instagram.url} className={s.btnLine} target="_blank" rel="noopener noreferrer">
            {notes.follow} {brand.instagram.handle}
            <span className="sr-only"> (atsidaro naujame lange)</span>
          </a>
        </section>

        {/* DUK */}
        <section className={s.faqSection} aria-labelledby="faq-title">
          <h2 id="faq-title" className={s.h2}>
            {faq.title}
          </h2>
          <div>
            {faq.items.map((item) => (
              <details key={item.q} className={s.faqItem}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <h2 id="final-title" className={s.finalTitle}>
            {finalCta.title}
          </h2>
          <p>{finalCta.body}</p>
          <div className={s.actions}>
            <a href={cta.href} className={s.btn}>
              {cta.intro}
            </a>
            <a href={cta.href} className={s.btnLine}>
              {cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <Marquee items={[brand.name, brand.tagline, brand.instagram.handle]} />
        <div className={s.footerInner}>
          <ul role="list" className={s.footerLinks}>
            <li>
              <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            {footer.links.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <ConsentButton className={s.linkButton} />
            </li>
          </ul>
          <p className={s.small}>{footer.disclaimer}</p>
          <p className={s.small}>
            © {footer.year} {brand.name}
          </p>
        </div>
      </footer>

      <DesignSwitcher current={8} />
    </div>
  );
}
