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
import CountUp from "@/components/fx/CountUp";
import GrowthLine from "@/components/fx/GrowthLine";
import StickyCta from "@/components/fx/StickyCta";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 06 – Augimo kreivė | Marius Lencevičius" };

function Node({ children }: { children: React.ReactNode }) {
  return (
    <p className={s.node} data-node>
      <span className={s.nodeDot} aria-hidden="true" />
      {children}
    </p>
  );
}

export default function Design06() {
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.header}>
        <a href="#pagrindinis" className={s.logo}>
          <span className={s.logoMark} aria-hidden="true">
            ↗
          </span>
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
            <p className={`${s.chip} ${s.in1}`}>{brand.role}</p>
            <h1 id="hero-title" className={`${s.heroTitle} ${s.in2}`}>
              Investuoti gali{" "}
              <span className={s.hl}>
                kiekvienas.
                <svg className={s.squiggle} viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M2 14 C 40 4, 70 18, 110 10 S 180 2, 220 11 S 280 16, 298 6" pathLength={1} />
                </svg>
              </span>
            </h1>
            <p className={`${s.heroLead} ${s.in3}`}>{hero.lead}</p>
            <div className={`${s.heroActions} ${s.in4}`}>
              <a href={cta.href} className={s.btn}>
                {cta.intro} <span aria-hidden="true">→</span>
              </a>
              <a href={cta.href} className={s.btnGhost}>
                {cta.primary}
              </a>
            </div>
          </div>

          <div className={`${s.arch} ${s.in3}`}>
            <Photo name="portrait" className={s.archPhoto} sizes="(min-width: 900px) 40vw, 90vw" priority reveal={false} position="50% 18%" />
            <p className={s.archTag}>
              <span className={s.pulse} aria-hidden="true" />
              {brand.name}
            </p>
          </div>

          <dl className={`${s.stats} ${s.in4}`}>
            <div>
              <dt>
                <CountUp to={5} suffix="+" />
              </dt>
              <dd>metų patirtis investavimo srityje</dd>
            </div>
            <div>
              <dt>BFAA</dt>
              <dd>investavimo konsultanto (IA) licencija</dd>
            </div>
            <div>
              <dt>Ekonomika</dt>
              <dd>išsilavinimas</dd>
            </div>
          </dl>
        </section>

        {/* KELIONĖ – kreivė piešiasi slenkant */}
        <div className={s.journey}>
          <GrowthLine className={s.line} lineClassName={s.linePath} trackClassName={s.lineTrack} />

          <section className={s.block} aria-labelledby="problem-title">
            <Node>Pradžia</Node>
            <h2 id="problem-title" className={s.h2}>
              {problem.title}
            </h2>
            <p className={s.muted}>{problem.body}</p>
            <p className={s.callout}>{problem.bridge}</p>
          </section>

          <section id="paslaugos" className={s.block} aria-labelledby="services-title">
            <Node>Paslaugos</Node>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p className={s.muted}>{servicesIntro.body}</p>
            <p className={s.swipeHint} aria-hidden="true">
              Braukite <span>→</span>
            </p>
            <ul role="list" className={s.carousel} aria-label="Paslaugos">
              {services.map((svc, i) => (
                <li key={svc.id} className={s.card}>
                  <span className={s.cardNo} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}/{String(services.length).padStart(2, "0")}
                  </span>
                  <p className={s.cardSituation}>„{svc.situation}“</p>
                  <h3 className={s.cardTitle}>{svc.title}</h3>
                  <p className={s.cardText}>{svc.short}</p>
                  <a href={svc.href} className={s.cardLink}>
                    {cta.more}
                    <span className="sr-only">: {svc.title}</span>
                    <span aria-hidden="true" className={s.cardArrow}>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={s.block} aria-labelledby="process-title">
            <Node>Procesas</Node>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
            <ol role="list" className={s.steps}>
              {process.steps.map((step) => (
                <li key={step.n} data-reveal>
                  <span className={s.stepN} aria-hidden="true">
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

          <section className={s.block} aria-labelledby="xray-title">
            <Node>Portfelio peržiūra</Node>
            <h2 id="xray-title" className={s.h2}>
              {xray.title}
            </h2>
            <p className={s.muted}>{xray.lead}</p>
            <PortfolioXray className={s.xray} />
          </section>

          <section id="skaiciuokle" className={s.block} aria-labelledby="calc-title">
            <Node>{calculator.title}</Node>
            <h2 id="calc-title" className={s.h2}>
              Kreivė, kurią piešia laikas
            </h2>
            <p className={s.muted}>{calculator.lead}</p>
            <div className={s.calc}>
              <CalculatorTeaser />
            </div>
          </section>
        </div>

        {/* POKALBIS – laimo blokas */}
        <section className={s.intro} aria-labelledby="intro-title">
          <p className={s.introKicker}>{introCall.eyebrow}</p>
          <h2 id="intro-title" className={s.introTitle}>
            {introCall.title}
          </h2>
          <p className={s.introLead}>{introCall.lead}</p>
          {introCall.body.map((p) => (
            <p key={p} className={s.introP}>
              {p}
            </p>
          ))}
          <ul role="list" className={s.introList}>
            {introCall.list.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
          <p className={s.introNote}>{introCall.note}</p>
          <a href={cta.href} className={s.btnDark}>
            {cta.introUpper}
          </a>
        </section>

        {/* APIE */}
        <section id="apie" className={s.about} aria-labelledby="about-title">
          <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 900px) 40vw, 100vw" position="50% 25%" />
          <div className={s.aboutText}>
            <p className={s.chip}>{about.title}</p>
            <h2 id="about-title" className={s.h2}>
              {about.pullQuote}
            </h2>
            <p className={s.muted}>{about.paragraphs[0]}</p>
            <p className={s.muted}>{about.paragraphs[4]}</p>
            <p className={s.muted}>{about.paragraphs[7]}</p>
            <ul role="list" className={s.pills}>
              {about.principles.map((p) => (
                <li key={p.title}>{p.title}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.section} aria-labelledby="notes-title">
          <h2 id="notes-title" className={s.h2}>
            {notes.title}
          </h2>
          <p className={s.muted}>{notes.lead}</p>
          <ul role="list" className={s.noteRail}>
            {notes.topics.map((n) => (
              <li key={n.title}>
                <span className={s.noteTag}>#{n.tag}</span>
                <span>{n.title}</span>
              </li>
            ))}
          </ul>
          <a href={brand.instagram.url} className={s.btnGhost} target="_blank" rel="noopener noreferrer">
            {notes.follow} {brand.instagram.handle}
            <span className="sr-only"> (atsidaro naujame lange)</span>
          </a>
        </section>

        {/* DUK */}
        <section className={s.section} aria-labelledby="faq-title">
          <h2 id="faq-title" className={s.h2}>
            {faq.title}
          </h2>
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
          <h2 id="final-title" className={s.finalTitle}>
            {finalCta.title}
          </h2>
          <p className={s.muted}>{finalCta.body}</p>
          <div className={s.heroActions}>
            <a href={cta.href} className={s.btn}>
              {cta.intro} <span aria-hidden="true">→</span>
            </a>
            <a href={cta.href} className={s.btnGhost}>
              {cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footerName}>{brand.name}</p>
        <p className={s.muted}>{brand.role}</p>
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
      </footer>

      <StickyCta className={s.sticky}>
        <a href={cta.href} className={s.stickyBtn}>
          <span>{cta.intro}</span>
          <span aria-hidden="true">→</span>
        </a>
      </StickyCta>

      <DesignSwitcher current={6} className={s.switcher} />
    </div>
  );
}
