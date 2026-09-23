import type { CSSProperties } from "react";
import {
  brand,
  nav,
  cta,
  hero,
  problem,
  guidedPath,
  servicesIntro,
  services,
  process,
  introCall,
  about,
  portfolioCompare,
  planPreview,
  calculator,
  notes,
  faq,
  finalCta,
  footer,
  testimonials,
  sampleTestimonials,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import MobileNav from "@/components/shared/MobileNav";
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import CountUp from "@/components/fx/CountUp";
import ScrollHeader from "@/components/fx/ScrollHeader";
import IntroCurtain from "@/components/fx/IntroCurtain";
import Magnetic from "@/components/fx/Magnetic";
import ScrollWords from "@/components/fx/ScrollWords";
import GuidedPath from "@/components/fx/GuidedPath";
import HorizontalSteps from "@/components/fx/HorizontalSteps";
import PlanPreview from "@/components/fx/PlanPreview";
import ReviewCarousel from "@/components/fx/ReviewCarousel";
import PortfolioCompare from "@/components/fx/PortfolioCompare";
import s from "./ConsultantSignature.module.css";

const FACTS = [
  { key: "patirtis", value: <CountUp to={5} suffix="+" />, label: "metų patirtis investavimo srityje" },
  { key: "issilavinimas", value: "Ekonomika", label: "išsilavinimas" },
  { key: "licencija", value: "BFAA", label: "investavimo konsultanto (IA) licencija" },
  { key: "nepriklausomas", value: "Nepriklausomas", label: "nesusietas su viena platforma" },
];
const PRINCIPLES = ["Ilgalaikis investavimas", "Diversifikacija", "Nepriklausomumas", "Individualus planas", "Aiškumas", "ETF", "Rizikos valdymas"];

const delay = (i: number, step = 90): CSSProperties => ({ ["--d" as string]: `${i * step}ms` });

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden="true">
      →
    </span>
  );
}

/** Plona „augimo“ linija hero'je – dekoratyvi, be skaičių ir be jokių grąžos teiginių. */
function GrowthStroke({ className, id }: { className?: string; id: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
        <defs>
          <linearGradient id={id} x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.25" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          pathLength={1}
          d="M0 360 C 90 350, 140 330, 200 336 S 300 300, 360 306 S 450 262, 520 270 S 610 236, 660 246 S 760 196, 820 204 S 910 150, 980 150 S 1080 96, 1200 60"
          stroke={`url(#${id})`}
        />
      </svg>
      {/* taškas atskiru elementu, kad nesiištemptų kartu su SVG */}
      <span className={s.strokeDot} />
    </div>
  );
}

/** 13 kryptis: 11 pagrindas + „parašo“ detalės (įžanga, augimo linija, 3 klausimų kelias, plano pavyzdys, palyginimas). */
export default function ConsultantSignature({ current }: { current: number }) {
  const reviews = testimonials.length > 0 ? testimonials : sampleTestimonials;
  const isSample = testimonials.length === 0;

  return (
    <div className={s.page}>
      <IntroCurtain monogram="ML" label={brand.name} />

      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <ScrollHeader className={s.header} progressClassName={s.progress}>
        <div className={s.headerInner}>
          <a href="#pagrindinis" className={s.brand}>
            <span className={s.mark} aria-hidden="true">
              ML
            </span>
            <span className={s.brandName}>{brand.name}</span>
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
        </div>
      </ScrollHeader>

      <main id="turinys">
        {/* HERO */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroMedia}>
            <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 55vw, 100vw" priority reveal={false} position="50% 20%" />
          </div>
          <GrowthStroke className={s.stroke} id="gs-hero" />
          <div className={s.heroText}>
            <p className={`${s.kicker} ${s.in}`} style={delay(0, 110)}>
              <span className={s.live} aria-hidden="true" />
              {brand.role}
            </p>
            <h1 id="hero-title" className={s.heroTitle}>
              <span className={s.line}>
                <span style={delay(1, 110)}>Investuoti gali</span>
              </span>
              <span className={s.line}>
                <em style={delay(2, 110)}>kiekvienas.</em>
              </span>
            </h1>
            <p className={`${s.heroLead} ${s.in}`} style={delay(4, 110)}>
              {hero.lead}
            </p>
            <p className={`${s.heroBody} ${s.in}`} style={delay(5, 110)}>
              {hero.body}
            </p>
            <div className={`${s.actions} ${s.in}`} style={delay(6, 110)}>
              <Magnetic>
                <a href={cta.href} className={s.btnLight}>
                  {cta.intro}
                  <Arrow />
                </a>
              </Magnetic>
              <a href={cta.href} className={s.btnGhostLight}>
                {cta.primary}
              </a>
            </div>
          </div>
          <ul role="list" className={s.facts} aria-label="Kompetencija">
            {FACTS.map((f, i) => (
              <li key={f.key} className={s.in} style={delay(7 + i, 110)}>
                <span className={s.factValue}>{f.value}</span>
                <span className={s.factLabel}>{f.label}</span>
              </li>
            ))}
          </ul>
          <span className={s.scrollHint} aria-hidden="true">
            <span />
          </span>
        </section>

        {/* PRINCIPŲ JUOSTA */}
        <div className={s.ribbon} aria-hidden="true">
          <div className={s.ribbonTrack}>
            {[...PRINCIPLES, ...PRINCIPLES].map((p, i) => (
              <span key={i}>
                {p}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        {/* ĮŽANGA – žodžiai užsidega slenkant */}
        <section className={s.section} aria-labelledby="problem-title">
          <p className={s.eyebrow}>Įžanga</p>
          <h2 id="problem-title" className={s.statementTitle}>
            {problem.title}
          </h2>
          <ScrollWords text={problem.body} className={s.scrollText} />
          <p className={s.bridge} data-reveal>
            <span className={s.bridgeDot} aria-hidden="true" />
            {problem.bridge}
          </p>
        </section>

        {/* 3 KLAUSIMŲ KELIAS */}
        <section className={s.section} aria-labelledby="path-title">
          <div className={s.split}>
            <div className={s.splitText}>
              <p className={s.eyebrow}>Jūsų situacija</p>
              <h2 id="path-title" className={s.h2} data-reveal>
                {guidedPath.title}
              </h2>
              <p className={s.lead} data-reveal>
                {guidedPath.lead}
              </p>
            </div>
            <div data-reveal>
              <GuidedPath />
            </div>
          </div>
        </section>

        {/* PASLAUGOS */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.head}>
            <p className={s.eyebrow}>Paslaugos</p>
            <h2 id="services-title" className={s.h2} data-reveal>
              {servicesIntro.title}
            </h2>
            <p className={s.lead} data-reveal>
              {servicesIntro.body}
            </p>
          </div>
          <ul role="list" className={s.stack}>
            {services.map((svc, i) => (
              <li key={svc.id} className={s.stackCard} style={{ ["--i" as string]: i, ["--n" as string]: services.length }}>
                <span className={s.stackGlow} aria-hidden="true" />
                <div className={s.stackInner}>
                  <div className={s.stackTop}>
                    <span className={s.stackSituation}>„{svc.situation}“</span>
                    <span className={s.stackCount} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={s.stackTitle}>{svc.title}</h3>
                  <p className={s.stackText}>{svc.full}</p>
                  <a href={svc.href} className={s.stackLink}>
                    {cta.more}
                    <span className="sr-only">: {svc.title}</span>
                    <Arrow />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* PROCESAS – horizontalus kompiuteryje */}
        <section className={s.processSection} aria-labelledby="process-title">
          <HorizontalSteps
            steps={process.steps}
            heading={
              <div>
                <p className={s.eyebrow}>Procesas</p>
                <h2 id="process-title" className={s.h2}>
                  {process.title}
                </h2>
              </div>
            }
            finalCard={
              <>
                <p className={s.finalCardKicker}>Pirmas žingsnis</p>
                <p className={s.finalCardTitle}>{cta.intro}</p>
                <a href={cta.href} className={s.btnLight}>
                  {cta.introUpper}
                  <Arrow />
                </a>
              </>
            }
          />
        </section>

        {/* POKALBIS */}
        <section className={s.intro} aria-labelledby="intro-title">
          <div className={s.introInner}>
            <div>
              <p className={s.eyebrowLight} data-reveal>
                {introCall.eyebrow}
              </p>
              <h2 id="intro-title" className={s.introTitle} data-reveal>
                {introCall.title}
              </h2>
              <p className={s.introLead} data-reveal>
                {introCall.lead}
              </p>
            </div>
            <div className={s.introBody}>
              {introCall.body.map((p, i) => (
                <p key={p} data-reveal style={delay(i)}>
                  {p}
                </p>
              ))}
              <p className={s.introListTitle}>{introCall.listTitle}</p>
              <ul role="list" className={s.introList}>
                {introCall.list.map((li, i) => (
                  <li key={li} data-reveal style={delay(i)}>
                    {li}
                  </li>
                ))}
              </ul>
              <p className={s.introNote}>{introCall.note}</p>
              <Magnetic>
                <a href={cta.href} className={s.btnLight}>
                  {cta.introUpper}
                  <Arrow />
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* PLANO PAVYZDYS */}
        <section className={s.section} aria-labelledby="plan-title">
          <div className={s.split}>
            <div className={s.splitText}>
              <p className={s.eyebrow}>Rezultatas</p>
              <h2 id="plan-title" className={s.h2} data-reveal>
                {planPreview.title}
              </h2>
              <p className={s.lead} data-reveal>
                {planPreview.lead}
              </p>
            </div>
            <PlanPreview />
          </div>
        </section>

        {/* APIE */}
        <section id="apie" className={s.section} aria-labelledby="about-title">
          <div className={s.about}>
            <div className={s.aboutMedia}>
              <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 960px) 40vw, 100vw" position="50% 25%" />
              <p className={s.aboutTag}>
                <span className={s.live} aria-hidden="true" />
                {brand.name}
              </p>
            </div>
            <div className={s.aboutText}>
              <p className={s.eyebrow}>{about.title}</p>
              <h2 id="about-title" className={s.h2} data-reveal>
                Aiškumas prieš sprendimą
              </h2>
              <p className={s.aboutLead} data-reveal>
                {about.paragraphs[0]}
              </p>
              <blockquote className={s.pull} data-reveal>
                <p>{about.pullQuote}</p>
              </blockquote>
              <p className={s.muted} data-reveal>
                {about.paragraphs[4]}
              </p>
              <p className={s.muted} data-reveal>
                {about.paragraphs[7]}
              </p>
              <ul role="list" className={s.principles}>
                {about.principles.map((p, i) => (
                  <li key={p.title} data-reveal style={delay(i)}>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ATSILIEPIMAI */}
        <section className={s.section} aria-labelledby="reviews-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow}>Atsiliepimai</p>
              <h2 id="reviews-title" className={s.h2} data-reveal>
                Ką sako klientai
              </h2>
            </div>
            {isSample && (
              <p className={s.sampleNote}>
                <span className={s.badge}>Pavyzdys</span> Tekstai pavyzdiniai – bus pakeisti tikrais atsiliepimais.
              </p>
            )}
          </div>
          <div data-reveal>
            <ReviewCarousel reviews={reviews} isSample={isSample} />
          </div>
        </section>

        {/* PORTFELIO PALYGINIMAS */}
        <section className={s.section} aria-labelledby="compare-title">
          <div className={s.toolRow}>
            <div className={s.toolText}>
              <p className={s.eyebrow}>Portfelio peržiūra</p>
              <h2 id="compare-title" className={s.h2} data-reveal>
                {portfolioCompare.title}
              </h2>
              <p className={s.muted} data-reveal>
                {portfolioCompare.lead}
              </p>
            </div>
            <div data-reveal>
              <PortfolioCompare />
            </div>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={s.head}>
            <p className={s.eyebrow}>{calculator.title}</p>
            <h2 id="calc-title" className={s.h2} data-reveal>
              Kiek galėtų sukaupti reguliarumas?
            </h2>
            <p className={s.lead} data-reveal>
              {calculator.lead}
            </p>
          </div>
          <div className={s.calc} data-reveal>
            <CalculatorTeaser />
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.section} aria-labelledby="notes-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow}>{brand.instagram.handle}</p>
              <h2 id="notes-title" className={s.h2} data-reveal>
                {notes.title}
              </h2>
              <p className={s.muted}>{notes.lead}</p>
            </div>
            <a href={brand.instagram.url} className={s.textLink} target="_blank" rel="noopener noreferrer">
              {notes.follow}
              <Arrow />
              <span className="sr-only"> (atsidaro naujame lange)</span>
            </a>
          </div>
          <ul role="list" className={s.notes}>
            {notes.topics.map((n, i) => (
              <li key={n.title} data-reveal style={delay(i)}>
                <span className={s.noteIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={s.noteTag}>{n.tag}</span>
                <span className={s.noteTitle}>{n.title}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* DUK */}
        <section className={s.section} aria-labelledby="faq-title">
          <div className={s.faq}>
            <div>
              <p className={s.eyebrow}>DUK</p>
              <h2 id="faq-title" className={s.h2} data-reveal>
                {faq.title}
              </h2>
            </div>
            <div className={s.faqList}>
              {faq.items.map((item) => (
                <details key={item.q} className={s.faqItem}>
                  <summary>{item.q}</summary>
                  <div className={s.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <GrowthStroke className={s.finalStroke} id="gs-final" />
          <div className={s.finalInner}>
            <p className={s.eyebrowLight}>{introCall.eyebrow}</p>
            <h2 id="final-title" className={s.finalTitle} data-reveal>
              {finalCta.title}
            </h2>
            <p className={s.finalBody} data-reveal>
              {finalCta.body}
            </p>
            <div className={s.actions} data-reveal>
              <Magnetic>
                <a href={cta.href} className={s.btnLight}>
                  {cta.intro}
                  <Arrow />
                </a>
              </Magnetic>
              <a href={cta.href} className={s.btnGhostLight}>
                {cta.primary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.bigName} aria-hidden="true">
          {brand.name}
        </p>
        <div className={s.footerInner}>
          <div>
            <p className={s.footerName}>{brand.name}</p>
            <p>{brand.role}</p>
          </div>
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
            <li>
              <a href="#pagrindinis" className={s.toTop}>
                Į viršų <span aria-hidden="true">↑</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={s.footerBottom}>
          <p>{footer.disclaimer}</p>
          <p>
            © {footer.year} {brand.name}
          </p>
        </div>
      </footer>

      <DesignSwitcher current={current} />
    </div>
  );
}
