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

export const metadata: Metadata = { title: "Kryptis 02 – Leidinio | Marius Lencevičius" };

/** Rubrika kairėje paraštėje – kaip žurnalo skilties pavadinimas. */
function Rubric({ children }: { children: React.ReactNode }) {
  return <p className={s.rubric}>{children}</p>;
}

export default function Design02() {
  const [first, ...rest] = about.paragraphs;
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      <header className={s.masthead}>
        <div className={s.mastRow}>
          <a href="#pagrindinis" className={s.wordmark}>
            {brand.name}
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
          <a href={cta.href} className={s.mastCta}>
            {cta.primary}
          </a>
          <MobileNav links={nav} ctaLabel={cta.intro} ctaHref={cta.href} panelClassName={s.mobilePanel} />
        </div>
      </header>

      <main id="turinys">
        {/* HERO – žurnalo atvartas */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <p className={s.heroKicker}>{brand.role}</p>
          <h1 id="hero-title" className={s.heroTitle}>
            Investuoti gali
            <br />
            <span className={s.heroIndent}>kiekvienas.</span>
          </h1>

          <div className={s.spread}>
            <aside className={s.facts} aria-label="Kompetencija">
              <p className={s.factsTitle}>Trumpai</p>
              <ul role="list">
                {credentials.map((c) => (
                  <li key={c.key}>{c.label}</li>
                ))}
              </ul>
            </aside>

            <div className={s.heroCopy}>
              <p className={s.dropcap}>{hero.lead}</p>
              <p className={s.heroBody}>{hero.body}</p>
              <div className={s.actions}>
                <a href={cta.href} className={s.btn}>
                  {cta.intro}
                </a>
                <a href={cta.href} className={s.link}>
                  {cta.primary} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <figure className={s.heroFigure}>
              <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 30vw, 100vw" priority reveal={false} />
              <figcaption>
                {brand.name} – {brand.role.toLowerCase()}.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ĮŽANGA */}
        <section className={s.row} aria-labelledby="problem-title">
          <Rubric>Įžanga</Rubric>
          <div className={s.problem}>
            <h2 id="problem-title" className={s.problemTitle} data-reveal>
              {problem.title}
            </h2>
            <div className={s.problemCols}>
              <p>{problem.body}</p>
              <p className={s.problemBridge}>{problem.bridge}</p>
            </div>
          </div>
        </section>

        {/* PASLAUGOS */}
        <section id="paslaugos" className={s.row} aria-labelledby="services-title">
          <Rubric>Paslaugos</Rubric>
          <div>
            <div className={s.headPair}>
              <h2 id="services-title" className={s.h2}>
                {servicesIntro.title}
              </h2>
              <p className={s.muted}>{servicesIntro.body}</p>
            </div>
            <div className={s.services}>
              {services.map((svc) => (
                <article key={svc.id} className={s.service} data-reveal>
                  <h3 className={s.serviceTitle}>{svc.title}</h3>
                  <p className={s.muted}>{svc.short}</p>
                  <a href={svc.href} className={s.link}>
                    {cta.more}
                    <span className="sr-only">: {svc.title}</span> <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESAS */}
        <section className={s.row} aria-labelledby="process-title">
          <Rubric>Procesas</Rubric>
          <div>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
            <ol role="list" className={s.timeline}>
              {process.steps.map((step) => (
                <li key={step.n} data-reveal>
                  <span className={s.timelineN} aria-hidden="true">
                    {step.n}
                  </span>
                  <div>
                    <h3 className={s.timelineTitle}>
                      <span className="sr-only">{step.n}. </span>
                      {step.title}
                    </h3>
                    <p className={s.muted}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* POKALBIS */}
        <section className={s.intro} aria-labelledby="intro-title">
          <div className={s.introInner}>
            <div>
              <p className={s.introKicker}>{introCall.eyebrow}</p>
              <h2 id="intro-title" className={s.introTitle}>
                {introCall.title}
              </h2>
            </div>
            <div className={s.introBody}>
              <p className={s.introLead}>{introCall.lead}</p>
              {introCall.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className={s.introList}>
              <p className={s.factsTitle}>{introCall.listTitle}</p>
              <ul role="list">
                {introCall.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <p className={s.introNote}>{introCall.note}</p>
              <a href={cta.href} className={`${s.btn} ${s.btnLight}`}>
                {cta.introUpper}
              </a>
            </div>
          </div>
        </section>

        {/* APIE – ilgas straipsnis */}
        <section id="apie" className={s.row} aria-labelledby="about-title">
          <Rubric>Apie mane</Rubric>
          <article className={s.article}>
            <h2 id="about-title" className={s.articleTitle}>
              Kodėl investavimas turi būti suprantamas
            </h2>
            <figure className={s.articleFigure}>
              <Photo name="desk" className={s.articlePhoto} sizes="(min-width: 960px) 60vw, 100vw" position="50% 30%" />
              <figcaption>{about.title}: Marius Lencevičius savo darbo vietoje.</figcaption>
            </figure>
            <div className={s.articleBody}>
              <p className={s.articleLead}>{first}</p>
              {rest.slice(0, 3).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <blockquote className={s.pull}>
                <p>{about.pullQuote}</p>
              </blockquote>
              {rest.slice(3).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
        </section>

        {/* X-RAY */}
        <section className={s.row} aria-labelledby="xray-title">
          <Rubric>Pavyzdys</Rubric>
          <div className={s.figureRow}>
            <div>
              <h2 id="xray-title" className={s.h2}>
                {xray.title}
              </h2>
              <p className={s.muted}>{xray.lead}</p>
            </div>
            <PortfolioXray className={s.xray} />
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.row} aria-labelledby="calc-title">
          <Rubric>Skaičiuoklė</Rubric>
          <div>
            <div className={s.headPair}>
              <h2 id="calc-title" className={s.h2}>
                Laikas ir reguliarumas
              </h2>
              <p className={s.muted}>{calculator.lead}</p>
            </div>
            <CalculatorTeaser />
          </div>
        </section>

        {/* UŽRAŠAI */}
        <section className={s.row} aria-labelledby="notes-title">
          <Rubric>Užrašai</Rubric>
          <div>
            <div className={s.headPair}>
              <h2 id="notes-title" className={s.h2}>
                {notes.title}
              </h2>
              <p className={s.muted}>{notes.lead}</p>
            </div>
            <ul role="list" className={s.notes}>
              {notes.topics.map((n) => (
                <li key={n.title} data-reveal>
                  <p className={s.noteTag}>{n.tag}</p>
                  <p className={s.noteTitle}>{n.title}</p>
                </li>
              ))}
            </ul>
            <a href={brand.instagram.url} className={s.link} target="_blank" rel="noopener noreferrer">
              {notes.follow} {brand.instagram.handle} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (atsidaro naujame lange)</span>
            </a>
          </div>
        </section>

        {/* DUK – kaip interviu */}
        <section className={s.row} aria-labelledby="faq-title">
          <Rubric>Klausimai</Rubric>
          <div>
            <h2 id="faq-title" className={s.h2}>
              {faq.title}
            </h2>
            <dl className={s.qa}>
              {faq.items.map((item) => (
                <div key={item.q} data-reveal>
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <h2 id="final-title" className={s.finalTitle}>
            {finalCta.title}
          </h2>
          <div className={s.finalSide}>
            <p>{finalCta.body}</p>
            <div className={s.actions}>
              <a href={cta.href} className={s.btn}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.link}>
                {cta.primary} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <p className={s.footerName}>{brand.name}</p>
        <div className={s.footerGrid}>
          <p>{brand.role}</p>
          <ul role="list">
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
          <p className={s.disclaimer}>{footer.disclaimer}</p>
          <p>
            © {footer.year} {brand.name}
          </p>
        </div>
      </footer>

      <DesignSwitcher current={2} />
    </div>
  );
}
