import type { CSSProperties } from "react";
import {
  brand,
  nav,
  cta,
  hero,
  aum,
  servicesIntro,
  services,
  process,
  introCall,
  about,
  calculator,
  faq,
  finalCta,
  footer,
  testimonials,
  sampleTestimonials,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import SignatureNav from "@/components/fx/SignatureNav";
import CalculatorPro from "@/components/fx/CalculatorPro";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import CountUp from "@/components/fx/CountUp";
import ScrollHeader from "@/components/fx/ScrollHeader";
import s from "./ConsultantTrust.module.css";

const TRUST = [
  { key: "patirtis", value: <CountUp to={5} suffix="+" />, label: "metai investavimo srityje" },
  { key: "licencija", value: "BFAA", label: "investavimo konsultanto (IA) licencija" },
  { key: "issilavinimas", value: "Ekonomika", label: "išsilavinimas" },
  { key: "nepriklausomas", value: "Nepriklausomas", label: "nesusietas su viena platforma" },
];

const delay = (i: number, step = 90): CSSProperties => ({ ["--d" as string]: `${i * step}ms` });

function Arrow() {
  return (
    <span className={s.arrow} aria-hidden="true">
      →
    </span>
  );
}

/** Rami kylanti linija kortelėje – dekoratyvi, be ašių ir skaičių. */
function Spark() {
  return (
    <svg className={s.spark} viewBox="0 0 120 36" aria-hidden="true" preserveAspectRatio="none">
      <path pathLength={1} d="M1 33 C 14 31, 20 26, 30 27 S 46 20, 56 21 S 72 13, 82 14 S 100 6, 119 3" />
    </svg>
  );
}

/** 14 kryptis: patikimumo versija – mažiau teksto, aiškūs faktai, ramios animacijos. */
export default function ConsultantTrust({ current }: { current: number }) {
  const reviews = (testimonials.length > 0 ? testimonials : sampleTestimonials).slice(0, 3);
  const isSample = testimonials.length === 0;

  return (
    <div className={s.page}>
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
          <SignatureNav
            links={nav}
            ctaLabel={cta.intro}
            ctaHref={cta.href}
            desktopCtaLabel={cta.primary}
            name={brand.name}
            role={brand.role}
            instagram={brand.instagram}
          />
        </div>
      </ScrollHeader>

      <main id="turinys">
        {/* HERO */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <p className={`${s.kicker} ${s.in}`} style={delay(0, 120)}>
                <span className={s.seal} aria-hidden="true" />
                {brand.role}
              </p>
              <h1 id="hero-title" className={s.heroTitle}>
                <span className={s.line}>
                  <span style={delay(1, 120)}>Investuoti gali</span>
                </span>
                <span className={s.line}>
                  <em style={delay(2, 120)}>kiekvienas.</em>
                </span>
              </h1>
              <p className={`${s.heroLead} ${s.in}`} style={delay(4, 120)}>
                {hero.lead}
              </p>
              <div className={`${s.actions} ${s.in}`} style={delay(5, 120)}>
                <a href={cta.href} className={s.btnLight}>
                  {cta.intro}
                  <Arrow />
                </a>
                <a href="#paslaugos" className={s.linkLight}>
                  {servicesIntro.title}
                </a>
              </div>
              <p className={`${s.assure} ${s.in}`} style={delay(6, 120)}>
                {introCall.note} Pokalbis nemokamas.
              </p>
            </div>

            <div className={s.heroMedia}>
              <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 42vw, 100vw" priority reveal={false} position="50% 18%" />
              <div className={s.statCard}>
                <p className={s.statValue}>
                  <CountUp to={aum.thousands} suffix={aum.suffix} duration={2000} />
                </p>
                <p className={s.statLabel}>
                  <span className={s.live} aria-hidden="true" />
                  {aum.label}
                </p>
                <Spark />
              </div>
            </div>
          </div>

          {/* PASITIKĖJIMO JUOSTA */}
          <ul role="list" className={s.trust} aria-label="Faktai">
            {TRUST.map((t, i) => (
              <li key={t.key} className={s.in} style={delay(7 + i, 110)}>
                <span className={s.trustValue}>{t.value}</span>
                <span className={s.trustLabel}>{t.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* PASLAUGOS */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow}>Paslaugos</p>
              <h2 id="services-title" className={s.h2} data-reveal>
                {servicesIntro.title}
              </h2>
            </div>
            <p className={s.lead} data-reveal>
              Sprendimai pritaikyti jums, o ne vienodi visiems.
            </p>
          </div>
          <ul role="list" className={s.services}>
            {services.map((svc, i) => (
              <li key={svc.id} data-reveal style={delay(i)}>
                <a href={svc.href} className={s.service}>
                  <span className={s.serviceN} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={s.serviceTitle}>{svc.title}</span>
                  <span className={s.serviceText}>{svc.short}</span>
                  <span className={s.serviceGo} aria-hidden="true">
                    →
                  </span>
                </a>
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
          <ol role="list" className={s.steps} data-reveal>
            {process.steps.map((st, i) => (
              <li key={st.n} style={delay(i, 140)}>
                <span className={s.stepDot} aria-hidden="true" />
                <span className={s.stepN}>{st.n}</span>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepText}>{st.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* APIE */}
        <section id="apie" className={s.section} aria-labelledby="about-title">
          <div className={s.about}>
            <div className={s.aboutMedia}>
              <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 960px) 38vw, 100vw" position="50% 25%" />
            </div>
            <div className={s.aboutText}>
              <p className={s.eyebrow}>{about.title}</p>
              <h2 id="about-title" className={s.h2} data-reveal>
                Aiškumas prieš sprendimą
              </h2>
              <blockquote className={s.pull} data-reveal>
                <p>„{about.pullQuote}“</p>
                <footer>— {brand.name}</footer>
              </blockquote>
              <dl className={s.creds}>
                {[
                  ["Patirtis", "5+ metai investavimo srityje"],
                  ["Išsilavinimas", "Ekonomikos studijos"],
                  ["Licencija", "BFAA investavimo konsultanto (IA)"],
                  ["Principai", "Ilgalaikis investavimas ir diversifikacija"],
                ].map(([k, v], i) => (
                  <div key={k} data-reveal style={delay(i)}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={s.headRow}>
            <div>
              <p className={s.eyebrow}>{calculator.title}</p>
              <h2 id="calc-title" className={s.h2} data-reveal>
                Laikas ir reguliarumas
              </h2>
            </div>
            <p className={s.lead} data-reveal>
              {calculator.lead}
            </p>
          </div>
          <div data-reveal>
            <CalculatorPro />
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
                <span className={s.badge}>Pavyzdys</span> Bus pakeisti tikrais atsiliepimais.
              </p>
            )}
          </div>
          <ul role="list" className={s.reviews}>
            {reviews.map((r, i) => (
              <li key={r.quote} data-reveal style={delay(i, 120)}>
                <figure>
                  <blockquote>
                    <p>{r.quote}</p>
                  </blockquote>
                  <figcaption>
                    <b>{r.name}</b>
                    {r.context && <span>{r.context}</span>}
                  </figcaption>
                </figure>
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
          <div className={s.finalInner}>
            <p className={s.eyebrowLight}>{introCall.eyebrow}</p>
            <h2 id="final-title" className={s.finalTitle} data-reveal>
              {finalCta.title}
            </h2>
            <p className={s.finalBody} data-reveal>
              {finalCta.body}
            </p>
            <div className={s.actions} data-reveal>
              <a href={cta.href} className={s.btnLight}>
                {cta.introUpper}
                <Arrow />
              </a>
            </div>
            <ul role="list" className={s.finalPoints} data-reveal>
              <li>Nemokamai</li>
              <li>{introCall.note.replace(".", "")}</li>
              <li>Nepriklausomai</li>
            </ul>
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
                <span className="sr-only"> (atsidaro naujame lange)</span>
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

      <DesignSwitcher current={current} />
    </div>
  );
}
