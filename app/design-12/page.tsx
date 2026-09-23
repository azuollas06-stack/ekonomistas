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
import CountUp from "@/components/fx/CountUp";
import Tilt from "@/components/fx/Tilt";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 12 – Aurora prekės ženklo spalvomis | Marius Lencevičius" };

export default function Design12() {
  return (
    <div className={s.page}>
      <div className={s.aurora} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.header}>
        <a href="#pagrindinis" className={s.logo}>
          <span className={s.orb} aria-hidden="true" />
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
          <p className={s.chip}>
            <span className={s.chipDot} aria-hidden="true" />
            {brand.role}
          </p>
          <h1 id="hero-title" className={s.heroTitle}>
            Investuoti gali <span className={s.gradText}>kiekvienas.</span>
          </h1>
          <p className={s.heroLead}>{hero.lead}</p>
          <div className={s.actions}>
            <a href={cta.href} className={s.btnGlow}>
              <span>{cta.intro}</span>
            </a>
            <a href={cta.href} className={s.btnGlass}>
              {cta.primary}
            </a>
          </div>

          <div className={s.heroVisual}>
            <div className={s.halo} aria-hidden="true" />
            <Tilt className={s.portraitCard} max={10}>
              <Photo name="portrait" className={s.portrait} sizes="(min-width: 900px) 30vw, 80vw" priority reveal={false} position="50% 18%" />
              <span className={s.shine} aria-hidden="true" />
              <p className={s.portraitName}>
                {brand.name}
                <span>{brand.role}</span>
              </p>
            </Tilt>
            <p className={`${s.float} ${s.f1}`}>
              <b>
                <CountUp to={5} suffix="+" />
              </b>{" "}
              metų patirtis
            </p>
            <p className={`${s.float} ${s.f2}`}>
              <b>BFAA</b> IA licencija
            </p>
            <p className={`${s.float} ${s.f3}`}>
              <b>Ekonomikos</b> išsilavinimas
            </p>
          </div>
          <p className={s.heroBody}>{hero.body}</p>
        </section>

        {/* PROBLEMA */}
        <section className={s.section} aria-labelledby="problem-title">
          <div className={`${s.glass} ${s.problem}`} data-reveal>
            <h2 id="problem-title" className={s.h2}>
              {problem.title}
            </h2>
            <p className={s.muted}>{problem.body}</p>
            <p className={s.bridge}>{problem.bridge}</p>
          </div>
        </section>

        {/* KUR ESATE ŠIANDIEN? */}
        <section className={s.section} aria-labelledby="picker-title">
          <div className={`${s.glass} ${s.pickerPanel}`}>
            <p className={s.kicker}>{situationPicker.lead}</p>
            <h2 id="picker-title" className={s.h2}>
              {situationPicker.title}
            </h2>
            <SituationPicker services={services} moreLabel={cta.more} layout="row" className={s.picker} />
          </div>
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
          <ul role="list" className={s.cards}>
            {services.map((svc) => (
              <li key={svc.id}>
                <Tilt className={s.card} max={6}>
                  <span className={s.spot} aria-hidden="true" />
                  <p className={s.cardKicker}>{svc.situation}</p>
                  <h3 className={s.cardTitle}>{svc.title}</h3>
                  <p className={s.cardText}>{svc.short}</p>
                  <a href={svc.href} className={s.cardLink}>
                    {cta.more}
                    <span className="sr-only">: {svc.title}</span> <span aria-hidden="true">→</span>
                  </a>
                </Tilt>
              </li>
            ))}
          </ul>
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
                <span className={s.tlDot} aria-hidden="true">
                  {step.n}
                </span>
                <div className={s.tlCard}>
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

        {/* X-RAY */}
        <section className={s.section} aria-labelledby="xray-title">
          <div className={s.head}>
            <p className={s.kicker}>Portfelio peržiūra</p>
            <h2 id="xray-title" className={s.h2}>
              {xray.title}
            </h2>
            <p className={s.muted}>{xray.lead}</p>
          </div>
          <PortfolioXray className={`${s.glass} ${s.xray}`} />
        </section>

        {/* POKALBIS */}
        <section className={s.section} aria-labelledby="intro-title">
          <div className={s.introBorder}>
            <div className={s.intro}>
              <p className={s.kicker}>{introCall.eyebrow}</p>
              <h2 id="intro-title" className={s.introTitle}>
                {introCall.title}
              </h2>
              <p className={s.introLead}>{introCall.lead}</p>
              {introCall.body.map((p) => (
                <p key={p} className={s.muted}>
                  {p}
                </p>
              ))}
              <ul role="list" className={s.introList}>
                {introCall.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <p className={s.introNote}>{introCall.note}</p>
              <a href={cta.href} className={s.btnGlow}>
                <span>{cta.introUpper}</span>
              </a>
            </div>
          </div>
        </section>

        {/* APIE */}
        <section id="apie" className={s.section} aria-labelledby="about-title">
          <div className={s.about}>
            <div className={s.aboutMedia}>
              <div className={s.halo} aria-hidden="true" />
              <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 900px) 40vw, 90vw" position="50% 25%" />
            </div>
            <div className={s.aboutText}>
              <p className={s.kicker}>{about.title}</p>
              <h2 id="about-title" className={s.h2}>
                <span className={s.gradText}>{about.pullQuote}</span>
              </h2>
              <p className={s.muted}>{about.paragraphs[0]}</p>
              <p className={s.muted}>{about.paragraphs[4]}</p>
              <p className={s.muted}>{about.paragraphs[7]}</p>
              <ul role="list" className={s.principles}>
                {about.principles.map((p) => (
                  <li key={p.title} className={s.glass}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={s.head}>
            <p className={s.kicker}>{calculator.title}</p>
            <h2 id="calc-title" className={s.h2}>
              Laikas + reguliarumas
            </h2>
            <p className={s.muted}>{calculator.lead}</p>
          </div>
          <div className={`${s.glass} ${s.calc}`}>
            <CalculatorTeaser />
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.section} aria-labelledby="notes-title">
          <div className={s.head}>
            <p className={s.kicker}>{brand.instagram.handle}</p>
            <h2 id="notes-title" className={s.h2}>
              {notes.title}
            </h2>
            <p className={s.muted}>{notes.lead}</p>
          </div>
          <ul role="list" className={s.notes}>
            {notes.topics.map((n) => (
              <li key={n.title} className={s.glass}>
                <span className={s.noteTag}>{n.tag}</span>
                {n.title}
              </li>
            ))}
          </ul>
          <a href={brand.instagram.url} className={s.btnGlass} target="_blank" rel="noopener noreferrer">
            {notes.follow}
            <span className="sr-only"> (atsidaro naujame lange)</span>
          </a>
        </section>

        {/* DUK */}
        <section className={s.section} aria-labelledby="faq-title">
          <div className={s.head}>
            <h2 id="faq-title" className={s.h2}>
              {faq.title}
            </h2>
          </div>
          <div className={s.faq}>
            {faq.items.map((item) => (
              <details key={item.q} className={`${s.glass} ${s.faqItem}`}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <h2 id="final-title" className={s.finalTitle}>
            <span className={s.gradText}>{finalCta.title}</span>
          </h2>
          <p className={s.muted}>{finalCta.body}</p>
          <div className={s.actions}>
            <a href={cta.href} className={s.btnGlow}>
              <span>{cta.intro}</span>
            </a>
            <a href={cta.href} className={s.btnGlass}>
              {cta.primary}
            </a>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p>
          <b>{brand.name}</b> · {brand.role}
        </p>
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
        <p className={s.small}>© {footer.year}</p>
      </footer>

      <DesignSwitcher current={12} />
    </div>
  );
}
