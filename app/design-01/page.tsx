import type { Metadata } from "next";
import {
  brand,
  nav,
  cta,
  hero,
  credentials,
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
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 01 – Minimalistinė | Marius Lencevičius" };

export default function Design01() {
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.header}>
        <a href="#pagrindinis" className={s.wordmark}>
          {brand.name}
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
        <a href={cta.href} className={s.headerCta}>
          {cta.primary}
        </a>
        <MobileNav links={nav} ctaLabel={cta.intro} ctaHref={cta.href} panelClassName={s.mobilePanel} />
      </header>

      <main id="turinys">
        {/* HERO */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroText}>
            <p className={s.eyebrow}>
              {brand.name} <span aria-hidden="true">·</span> {brand.role}
            </p>
            <h1 id="hero-title" className={s.heroTitle}>
              Investuoti
              <br /> gali
              <br /> kiekvienas.
            </h1>
            <p className={s.heroLead}>{hero.lead}</p>
            <p className={s.heroBody}>{hero.body}</p>
            <div className={s.heroActions}>
              <a href={cta.href} className={s.btn}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.textLink}>
                {cta.primary}
              </a>
            </div>
          </div>
          <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 42vw, 100vw" priority reveal={false} />
        </section>

        {/* KOMPETENCIJA */}
        <section aria-label="Kompetencija" className={s.creds}>
          <ul role="list">
            {credentials.map((c) => (
              <li key={c.key}>{c.label}</li>
            ))}
          </ul>
        </section>

        {/* PROBLEMA */}
        <section className={s.problem} aria-labelledby="problem-title">
          <h2 id="problem-title" className={s.h2} data-reveal>
            {problem.title}
          </h2>
          <div className={s.problemText} data-reveal>
            <p>{problem.body}</p>
            <p className={s.problemBridge}>{problem.bridge}</p>
          </div>
        </section>

        {/* PASLAUGOS */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.sectionHead}>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p className={s.sectionLead}>{servicesIntro.body}</p>
          </div>
          <ul role="list" className={s.services}>
            {services.map((svc) => (
              <li key={svc.id} data-reveal>
                <a href={svc.href} className={s.serviceRow}>
                  <h3 className={s.serviceTitle}>{svc.title}</h3>
                  <p className={s.serviceText}>{svc.short}</p>
                  <span className={s.serviceMore}>
                    {cta.more}
                    <span aria-hidden="true" className={s.arrow}>
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* PROCESAS */}
        <section className={s.section} aria-labelledby="process-title">
          <div className={s.sectionHead}>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
          </div>
          <ol role="list" className={s.process}>
            {process.steps.map((step) => (
              <li key={step.n} data-reveal>
                <span className={s.stepN}>{step.n}</span>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* NEMOKAMAS POKALBIS */}
        <section id="pokalbis" className={s.intro} aria-labelledby="intro-title">
          <div className={s.introInner}>
            <div>
              <p className={s.eyebrow}>{introCall.eyebrow}</p>
              <h2 id="intro-title" className={s.introTitle}>
                {introCall.title}
              </h2>
              <p className={s.introLead}>{introCall.lead}</p>
            </div>
            <div className={s.introBody}>
              {introCall.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className={s.introListTitle}>{introCall.listTitle}</p>
              <ul role="list" className={s.dashList}>
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
        <section id="apie" className={s.about} aria-labelledby="about-title">
          <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 960px) 38vw, 100vw" position="50% 25%" />
          <div className={s.aboutText}>
            <h2 id="about-title" className={s.h2}>
              {about.title}
            </h2>
            <p className={s.aboutLead}>{about.paragraphs[0]}</p>
            {[about.paragraphs[2], about.paragraphs[4], about.paragraphs[7]].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={s.sectionHead}>
            <h2 id="calc-title" className={s.h2}>
              {calculator.title}
            </h2>
            <p className={s.sectionLead}>{calculator.lead}</p>
          </div>
          <CalculatorTeaser />
        </section>

        {/* UŽRAŠAI */}
        <section className={s.section} aria-labelledby="notes-title">
          <div className={s.sectionHead}>
            <h2 id="notes-title" className={s.h2}>
              {notes.title}
            </h2>
            <p className={s.sectionLead}>{notes.lead}</p>
          </div>
          <ul role="list" className={s.notes}>
            {notes.topics.map((n) => (
              <li key={n.title} data-reveal>
                <span className={s.noteTag}>{n.tag}</span>
                <span className={s.noteTitle}>{n.title}</span>
              </li>
            ))}
          </ul>
          <a href={brand.instagram.url} className={s.textLink} target="_blank" rel="noopener noreferrer">
            {notes.follow} {brand.instagram.handle}
            <span className="sr-only"> (atsidaro naujame lange)</span>
          </a>
        </section>

        {/* DUK */}
        <section className={`${s.section} ${s.faq}`} aria-labelledby="faq-title">
          <h2 id="faq-title" className={s.h2}>
            {faq.title}
          </h2>
          <div className={s.faqList}>
            {faq.items.map((item) => (
              <details key={item.q} className={s.faqItem}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* GALUTINIS CTA */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <h2 id="final-title" className={s.finalTitle} data-reveal>
            {finalCta.title}
          </h2>
          <p className={s.finalBody}>{finalCta.body}</p>
          <div className={s.heroActions}>
            <a href={cta.href} className={s.btn}>
              {cta.intro}
            </a>
            <a href={cta.href} className={s.textLink}>
              {cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerTop}>
          <div>
            <p className={s.footerName}>{brand.name}</p>
            <p className={s.footerRole}>{brand.role}</p>
          </div>
          <ul role="list" className={s.footerLinks}>
            <li>
              <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram {brand.instagram.handle}
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
        </div>
        <p className={s.disclaimer}>{footer.disclaimer}</p>
        <p className={s.copy}>
          © {footer.year} {brand.name}
        </p>
      </footer>

      <DesignSwitcher current={1} />
    </div>
  );
}
