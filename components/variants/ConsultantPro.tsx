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
  introForm,
  about,
  notes,
  faq,
  finalCta,
  footer,
  testimonials,
  sampleTestimonials,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import MobileNav from "@/components/shared/MobileNav";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import CountUp from "@/components/fx/CountUp";
import ScrollHeader from "@/components/fx/ScrollHeader";
import GuidedPath from "@/components/fx/GuidedPath";
import IntroForm from "@/components/fx/IntroForm";
import CalculatorSheet from "@/components/fx/CalculatorSheet";
import s from "./ConsultantPro.module.css";

// Kompetencijos – tik kliento pateikti teiginiai.
const FACTS = [
  { key: "patirtis", value: <CountUp to={5} suffix="+" />, label: "metų patirtis investavimo srityje" },
  { key: "issilavinimas", value: "Ekonomika", label: "išsilavinimas" },
  { key: "licencija", value: "BFAA", label: "investavimo konsultanto (IA) licencija" },
  { key: "nepriklausomas", value: "Nepriklausomas", label: "nesusietas su viena platforma" },
];

/** Laiptuoto atsiradimo delsa (globalus [data-reveal] naudoja --d). */
const delay = (i: number, step = 90): CSSProperties => ({ ["--d" as string]: `${i * step}ms` });

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden="true">
      →
    </span>
  );
}

/**
 * 11 kryptis (kliento pasirinkta): 03 struktūra + 05 hero, švaresnė ir su subtiliomis animacijomis.
 * Kliento pakeitimai: „Ekonomisto užrašai“ antraštėje, 3 klausimų kelias (iš 13), registracijos forma
 * (kaip 14), skaičiuoklė tik iš meniu, be portfelio peržiūros.
 */
export default function ConsultantPro({ current }: { current: number }) {
  const reviews = testimonials.length > 0 ? testimonials : sampleTestimonials;
  const isSample = testimonials.length === 0;

  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <ScrollHeader className={s.header} progressClassName={s.progress}>
        <div className={s.headerInner}>
          <a href="#pagrindinis" className={s.brand}>
            {brand.siteName}
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
          <div className={s.heroText}>
            <p className={`${s.kicker} ${s.in}`}>{brand.role}</p>
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
              <a href={cta.href} className={s.btnLight}>
                {cta.intro}
                <Arrow />
              </a>
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
        </section>

        {/* ĮŽANGA */}
        <section className={s.section} aria-labelledby="problem-title">
          <div className={s.statement}>
            <p className={s.eyebrow} data-reveal>
              Įžanga
            </p>
            <h2 id="problem-title" className={s.statementTitle} data-reveal>
              {problem.title}
            </h2>
            <div className={s.statementText}>
              <p data-reveal>{problem.body}</p>
              <p data-reveal style={delay(1)} className={s.muted}>
                {problem.bridge}
              </p>
            </div>
          </div>
        </section>

        {/* 3 KLAUSIMŲ KELIAS (iš 13 krypties) */}
        <section className={s.section} aria-labelledby="path-title">
          <div className={s.toolRow}>
            <div className={s.toolText}>
              <p className={s.eyebrow}>Trys klausimai</p>
              <h2 id="path-title" className={s.h2} data-reveal>
                {guidedPath.title}
              </h2>
              <p className={s.muted} data-reveal>
                {guidedPath.lead}
              </p>
            </div>
            <div data-reveal>
              <GuidedPath />
            </div>
          </div>
        </section>

        {/* PASLAUGOS – kortelės kraunasi viena ant kitos */}
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
                <div className={s.stackInner}>
                  <div className={s.stackTop}>
                    <span className={s.stackSituation}>{svc.situation}</span>
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

        {/* PROCESAS */}
        <section className={s.section} aria-labelledby="process-title">
          <div className={s.head}>
            <p className={s.eyebrow}>Procesas</p>
            <h2 id="process-title" className={s.h2} data-reveal>
              {process.title}
            </h2>
          </div>
          <ol role="list" className={s.steps}>
            {process.steps.map((step, i) => (
              <li key={step.n} data-reveal style={delay(i, 110)}>
                <span className={s.stepN} aria-hidden="true">
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

        {/* POKALBIS – tamsi juosta */}
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
              <a href={cta.href} className={s.btnLight}>
                {cta.introUpper}
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* APIE */}
        <section id="apie" className={s.section} aria-labelledby="about-title">
          <div className={s.about}>
            <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 960px) 40vw, 100vw" position="50% 25%" />
            <div className={s.aboutText}>
              <p className={s.eyebrow}>{about.title}</p>
              <h2 id="about-title" className={s.h2} data-reveal>
                Aiškumas prieš sprendimą
              </h2>
              <p className={s.aboutLead} data-reveal>
                {about.paragraphs[0]}
              </p>
              <p className={s.muted} data-reveal>
                {about.paragraphs[3]}
              </p>
              <p className={s.muted} data-reveal>
                {about.paragraphs[4]}
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
          <ul role="list" className={s.reviews}>
            {reviews.map((t, i) => (
              <li key={i} className={s.review} data-reveal style={delay(i, 120)}>
                <blockquote className={s.quote}>
                  <p>{t.quote}</p>
                </blockquote>
                <p className={s.who}>
                  <b>{t.name}</b>
                  {t.context && <span> · {t.context}</span>}
                  {isSample && <span className={s.badge}>Pavyzdys</span>}
                </p>
              </li>
            ))}
          </ul>
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

        {/* KONTAKTAI: registracija pokalbiui (kaip 14 kryptyje) */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <div className={s.finalInner}>
            <div className={s.finalText}>
              <p className={s.eyebrowLight}>{introCall.eyebrow}</p>
              <h2 id="final-title" className={s.finalTitle} data-reveal>
                {finalCta.title}
              </h2>
              <p className={s.finalBody} data-reveal>
                {finalCta.body}
              </p>
              <ul role="list" className={s.finalPoints} data-reveal>
                <li>Nemokamai</li>
                <li>{introCall.note.replace(".", "")}</li>
                <li>Nepriklausomai</li>
              </ul>
              <p className={s.finalAlt} data-reveal>
                {introForm.alt}{" "}
                <a href={brand.instagram.url} target="_blank" rel="noopener noreferrer">
                  {brand.instagram.handle}
                  <span className="sr-only"> (atsidaro naujame lange)</span>
                </a>
              </p>
            </div>
            <div data-reveal>
              <IntroForm />
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
            © {footer.year} {brand.name}
          </p>
        </div>
      </footer>

      {/* skaičiuoklė puslapyje nerodoma – atsidaro tik paspaudus „Skaičiuoklė“ meniu */}
      <CalculatorSheet />

      <DesignSwitcher current={current} />
    </div>
  );
}
