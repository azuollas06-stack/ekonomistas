import type { Metadata } from "next";
import {
  brand,
  nav,
  cta,
  hero,
  problem,
  situationPicker,
  servicesIntro,
  services,
  process,
  introCall,
  about,
  xray,
  calculator,
  notes,
  faq,
  finalCta,
  footer,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import MobileNav from "@/components/shared/MobileNav";
import SituationPicker from "@/components/shared/SituationPicker";
import PortfolioXray from "@/components/shared/PortfolioXray";
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 03 – Moderni konsultanto | Marius Lencevičius" };

// Faktų juosta – tik kliento pateikti teiginiai.
const FACTS = [
  { value: "5+", label: "metų patirtis investavimo srityje" },
  { value: "Ekonomikos", label: "išsilavinimas" },
  { value: "BFAA", label: "investavimo konsultanto (IA) licencija" },
  { value: "Nepriklausomas", label: "nesusietas su viena investavimo platforma" },
];

export default function Design03() {
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.header}>
        <div className={s.headerInner}>
          <a href="#pagrindinis" className={s.brand}>
            <span className={s.mark} aria-hidden="true">
              ML
            </span>
            <span className={s.brandText}>
              <span className={s.brandName}>{brand.name}</span>
              <span className={s.brandRole}>{brand.role}</span>
            </span>
          </a>
          <nav aria-label="Pagrindinė navigacija" className={s.nav}>
            <ul role="list">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <a href={cta.href} className={`${s.btn} ${s.headerBtn}`}>
            {cta.primary}
          </a>
          <MobileNav links={nav} ctaLabel={cta.intro} ctaHref={cta.href} panelClassName={s.mobilePanel} />
        </div>
      </header>

      <main id="turinys">
        {/* HERO */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroText}>
            <p className={s.eyebrow}>{brand.role}</p>
            <h1 id="hero-title" className={s.heroTitle}>
              {brand.tagline}
            </h1>
            <p className={s.heroLead}>{hero.lead}</p>
            <p className={s.heroBody}>{hero.body}</p>
            <div className={s.actions}>
              <a href={cta.href} className={s.btn}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.btnOutline}>
                {cta.primary}
              </a>
            </div>
          </div>
          <div className={s.heroMedia}>
            <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 40vw, 100vw" priority reveal={false} />
            <div className={s.nameCard}>
              <p className={s.nameCardName}>{brand.name}</p>
              <p className={s.nameCardRole}>{brand.role}</p>
            </div>
          </div>
        </section>

        {/* FAKTAI */}
        <section aria-label="Kompetencija" className={s.facts}>
          <dl>
            {FACTS.map((f) => (
              <div key={f.value}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* PROBLEMA + KUR ESATE */}
        <section className={s.section} aria-labelledby="problem-title">
          <div className={s.split}>
            <h2 id="problem-title" className={s.h2}>
              {problem.title}
            </h2>
            <div className={s.stack}>
              <p>{problem.body}</p>
              <p className={s.muted}>{problem.bridge}</p>
            </div>
          </div>
          <div className={s.pickerWrap} data-reveal>
            <h3 className={s.h3}>{situationPicker.title}</h3>
            <p className={s.muted}>{situationPicker.lead}</p>
            <SituationPicker services={services} moreLabel={cta.more} layout="row" className={s.picker} />
          </div>
        </section>

        {/* PASLAUGOS */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.sectionHead}>
            <p className={s.eyebrow}>Paslaugos</p>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p className={s.muted}>{servicesIntro.body}</p>
          </div>
          <ul role="list" className={s.cards}>
            {services.map((svc) => (
              <li key={svc.id} className={s.card} data-reveal>
                <p className={s.cardKicker}>{svc.situation}</p>
                <h3 className={s.cardTitle}>{svc.title}</h3>
                <p className={s.cardText}>{svc.short}</p>
                <a href={svc.href} className={s.cardLink}>
                  {cta.more}
                  <span className="sr-only">: {svc.title}</span>
                  <span aria-hidden="true"> →</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* PROCESAS */}
        <section className={s.section} aria-labelledby="process-title">
          <div className={s.sectionHead}>
            <p className={s.eyebrow}>Procesas</p>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
          </div>
          <ol role="list" className={s.stepper}>
            {process.steps.map((step) => (
              <li key={step.n} data-reveal>
                <span className={s.stepDot} aria-hidden="true">
                  {step.n}
                </span>
                <h3 className={s.stepTitle}>
                  <span className="sr-only">{step.n}. </span>
                  {step.title}
                </h3>
                <p className={s.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* POKALBIS */}
        <section className={s.section} aria-labelledby="intro-title">
          <div className={s.introBox}>
            <div className={s.introDark}>
              <p className={s.eyebrowLight}>{introCall.eyebrow}</p>
              <h2 id="intro-title" className={s.introTitle}>
                {introCall.title}
              </h2>
              <p className={s.introLead}>{introCall.lead}</p>
              {introCall.body.map((p) => (
                <p key={p} className={s.introP}>
                  {p}
                </p>
              ))}
            </div>
            <div className={s.introLight}>
              <p className={s.h3}>{introCall.listTitle}</p>
              <ul role="list" className={s.checks}>
                {introCall.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <p className={s.introNote}>{introCall.note}</p>
              <a href={cta.href} className={`${s.btn} ${s.btnUpper}`}>
                {cta.introUpper}
              </a>
            </div>
          </div>
        </section>

        {/* APIE */}
        <section id="apie" className={s.section} aria-labelledby="about-title">
          <div className={s.about}>
            <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 960px) 40vw, 100vw" position="50% 25%" />
            <div>
              <p className={s.eyebrow}>{about.title}</p>
              <h2 id="about-title" className={s.h2}>
                Aiškumas prieš sprendimą
              </h2>
              <div className={s.stack}>
                <p className={s.aboutLead}>{about.paragraphs[0]}</p>
                <p className={s.muted}>{about.paragraphs[3]}</p>
                <p className={s.muted}>{about.paragraphs[4]}</p>
              </div>
              <ul role="list" className={s.principles}>
                {about.principles.map((p) => (
                  <li key={p.title}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ĮRANKIAI: X-RAY */}
        <section className={s.section} aria-labelledby="xray-title">
          <div className={s.toolRow}>
            <div className={s.toolText}>
              <p className={s.eyebrow}>Portfelio peržiūra</p>
              <h2 id="xray-title" className={s.h2}>
                {xray.title}
              </h2>
              <p className={s.muted}>{xray.lead}</p>
            </div>
            <PortfolioXray className={s.panel} />
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={s.sectionHead}>
            <p className={s.eyebrow}>{calculator.title}</p>
            <h2 id="calc-title" className={s.h2}>
              Kiek galėtų sukaupti reguliarumas?
            </h2>
            <p className={s.muted}>{calculator.lead}</p>
          </div>
          <div className={s.panelPad}>
            <CalculatorTeaser />
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.section} aria-labelledby="notes-title">
          <div className={s.sectionHeadRow}>
            <div>
              <p className={s.eyebrow}>{brand.instagram.handle}</p>
              <h2 id="notes-title" className={s.h2}>
                {notes.title}
              </h2>
              <p className={s.muted}>{notes.lead}</p>
            </div>
            <a href={brand.instagram.url} className={s.btnOutline} target="_blank" rel="noopener noreferrer">
              {notes.follow}
              <span className="sr-only"> (atsidaro naujame lange)</span>
            </a>
          </div>
          <ul role="list" className={s.noteGrid}>
            {notes.topics.map((n) => (
              <li key={n.title} data-reveal>
                <p className={s.cardKicker}>{n.tag}</p>
                <p className={s.noteTitle}>{n.title}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* DUK */}
        <section className={s.section} aria-labelledby="faq-title">
          <div className={s.faq}>
            <div>
              <p className={s.eyebrow}>DUK</p>
              <h2 id="faq-title" className={s.h2}>
                {faq.title}
              </h2>
            </div>
            <div className={s.faqList}>
              {faq.items.map((item) => (
                <details key={item.q} className={s.faqItem}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="kontaktai" className={s.finalWrap} aria-labelledby="final-title">
          <div className={s.final}>
            <div>
              <h2 id="final-title" className={s.finalTitle}>
                {finalCta.title}
              </h2>
              <p className={s.finalBody}>{finalCta.body}</p>
            </div>
            <div className={s.finalActions}>
              <a href={cta.href} className={`${s.btn} ${s.btnLight}`}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.btnGhost}>
                {cta.primary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div>
            <p className={s.footerName}>{brand.name}</p>
            <p>{brand.role}</p>
          </div>
          <div>
            <p className={s.footerHead}>Navigacija</p>
            <ul role="list">
              {nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.footerHead}>Sekite</p>
            <ul role="list">
              <li>
                <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
                  Instagram {brand.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className={s.footerHead}>Teisinė informacija</p>
            <ul role="list">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
              <li>
                <ConsentButton className={s.linkButton} />
              </li>
            </ul>
          </div>
        </div>
        <div className={s.footerBottom}>
          <p>{footer.disclaimer}</p>
          <p>
            © {footer.year} {brand.name}
          </p>
        </div>
      </footer>

      <DesignSwitcher current={3} />
    </div>
  );
}
