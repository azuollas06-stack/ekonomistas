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
  xray,
  calculator,
  notes,
  faq,
  finalCta,
  footer,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import MobileNav from "@/components/shared/MobileNav";
import PortfolioXray from "@/components/shared/PortfolioXray";
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 05 – Tamsi premium | Marius Lencevičius" };

export default function Design05() {
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.header}>
        <nav aria-label="Pagrindinė navigacija" className={s.nav}>
          <ul role="list">
            {nav.slice(1, 4).map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#pagrindinis" className={s.wordmark}>
          {brand.name}
        </a>
        <div className={s.headerRight}>
          <a href="#kontaktai" className={s.navLink}>
            Kontaktai
          </a>
          <a href={cta.href} className={s.headerCta}>
            {cta.primary}
          </a>
        </div>
        <MobileNav
          links={nav}
          ctaLabel={cta.intro}
          ctaHref={cta.href}
          buttonClassName={s.menuBtn}
          panelClassName={s.mobilePanel}
        />
      </header>

      <main id="turinys">
        {/* HERO */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroMedia}>
            <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 55vw, 100vw" priority reveal={false} position="50% 20%" />
          </div>
          <div className={s.heroText}>
            <p className={s.kicker}>{brand.role}</p>
            <h1 id="hero-title" className={s.heroTitle}>
              Investuoti gali <em>kiekvienas.</em>
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
          <ul role="list" className={s.heroCreds} aria-label="Kompetencija">
            {credentials.map((c) => (
              <li key={c.key}>
                <span className={s.credValue}>{c.value}</span>
                <span className={s.credLabel}>{c.short}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PROBLEMA */}
        <section className={s.problem} aria-labelledby="problem-title">
          <h2 id="problem-title" className={s.problemTitle} data-reveal>
            {problem.title}
          </h2>
          <p className={s.problemBody}>{problem.body}</p>
          <p className={s.problemBridge}>{problem.bridge}</p>
        </section>

        {/* PASLAUGOS */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.head}>
            <p className={s.kicker}>Paslaugos</p>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p className={s.muted}>{servicesIntro.body}</p>
          </div>
          <ul role="list" className={s.services}>
            {services.map((svc) => (
              <li key={svc.id} data-reveal>
                <a href={svc.href} className={s.service}>
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

        {/* X-RAY */}
        <section className={s.section} aria-labelledby="xray-title">
          <div className={s.xrayRow}>
            <div>
              <p className={s.kicker}>Portfelio peržiūra</p>
              <h2 id="xray-title" className={s.h2}>
                {xray.title}
              </h2>
              <p className={s.muted}>{xray.lead}</p>
            </div>
            <PortfolioXray className={s.xray} />
          </div>
        </section>

        {/* PROCESAS */}
        <section className={s.section} aria-labelledby="process-title">
          <div className={s.head}>
            <p className={s.kicker}>Procesas</p>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
          </div>
          <ol role="list" className={s.timeline}>
            {process.steps.map((step) => (
              <li key={step.n} data-reveal>
                <span className={s.tlN} aria-hidden="true">
                  {step.n}
                </span>
                <h3 className={s.tlTitle}>
                  <span className="sr-only">{step.n}. </span>
                  {step.title}
                </h3>
                <p className={s.tlBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* POKALBIS – šviesus intarpas */}
        <section className={s.intro} aria-labelledby="intro-title">
          <div className={s.introInner}>
            <div>
              <p className={s.introKicker}>{introCall.eyebrow}</p>
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
              <ol role="list" className={s.introList}>
                {introCall.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ol>
              <p className={s.introNote}>{introCall.note}</p>
              <a href={cta.href} className={s.btnDark}>
                {cta.introUpper}
              </a>
            </div>
          </div>
        </section>

        {/* APIE */}
        <section id="apie" className={s.about} aria-labelledby="about-title">
          <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 960px) 45vw, 100vw" position="50% 25%" />
          <div className={s.aboutText}>
            <p className={s.kicker}>{about.title}</p>
            <h2 id="about-title" className={s.h2}>
              {about.pullQuote}
            </h2>
            <p className={s.aboutLead}>{about.paragraphs[0]}</p>
            <p className={s.muted}>{about.paragraphs[2]}</p>
            <p className={s.muted}>{about.paragraphs[4]}</p>
            <p className={s.muted}>{about.paragraphs[7]}</p>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={s.head}>
            <p className={s.kicker}>{calculator.title}</p>
            <h2 id="calc-title" className={s.h2}>
              Laikas – svarbiausias kintamasis
            </h2>
            <p className={s.muted}>{calculator.lead}</p>
          </div>
          <div className={s.calc}>
            <CalculatorTeaser />
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.section} aria-labelledby="notes-title">
          <div className={s.notesRow}>
            <div>
              <p className={s.kicker}>{brand.instagram.handle}</p>
              <h2 id="notes-title" className={s.h2}>
                {notes.title}
              </h2>
              <p className={s.muted}>{notes.lead}</p>
              <a href={brand.instagram.url} className={s.textLink} target="_blank" rel="noopener noreferrer">
                {notes.follow}
                <span className="sr-only"> (atsidaro naujame lange)</span>
              </a>
            </div>
            <ul role="list" className={s.notes}>
              {notes.topics.map((n) => (
                <li key={n.title} data-reveal>
                  <span className={s.noteTag}>{n.tag}</span>
                  <span className={s.noteTitle}>{n.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DUK */}
        <section className={s.section} aria-labelledby="faq-title">
          <div className={s.head}>
            <p className={s.kicker}>DUK</p>
            <h2 id="faq-title" className={s.h2}>
              {faq.title}
            </h2>
          </div>
          <div className={s.faq}>
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
          <p className={s.kicker}>{brand.name}</p>
          <h2 id="final-title" className={s.finalTitle} data-reveal>
            {finalCta.title}
          </h2>
          <p className={s.muted}>{finalCta.body}</p>
          <div className={`${s.actions} ${s.center}`}>
            <a href={cta.href} className={s.btn}>
              {cta.intro}
            </a>
            <a href={cta.href} className={s.btnOutline}>
              {cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.footerTop}>
          <p className={s.footerName}>{brand.name}</p>
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
        </div>
        <div className={s.footerBottom}>
          <p>{footer.disclaimer}</p>
          <p>
            © {footer.year} · {brand.role}
          </p>
        </div>
      </footer>

      <DesignSwitcher current={5} />
    </div>
  );
}
