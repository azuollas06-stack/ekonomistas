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
  testimonials,
  faq,
  finalCta,
  footer,
} from "@/content/site";
import Photo from "@/components/shared/Photo";
import MobileNav from "@/components/shared/MobileNav";
import SituationPicker from "@/components/shared/SituationPicker";
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 04 – Asmeninis prekės ženklas | Marius Lencevičius" };

export default function Design04() {
  const story = about.paragraphs;
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
          {cta.intro}
        </a>
        <MobileNav links={nav} ctaLabel={cta.intro} ctaHref={cta.href} panelClassName={s.mobilePanel} />
      </header>

      <main id="turinys">
        {/* HERO – Marius yra veidas */}
        <section id="pagrindinis" className={s.hero} aria-labelledby="hero-title">
          <Photo name="portrait" className={s.heroPhoto} sizes="(min-width: 960px) 55vw, 100vw" priority reveal={false} position="50% 22%" />
          <div className={s.heroPanel}>
            <p className={s.hello}>Labas, aš Marius.</p>
            <h1 id="hero-title" className={s.heroTitle}>
              {brand.tagline}
            </h1>
            <p className={s.heroRole}>
              {brand.name} · {brand.role}
            </p>
            <p className={s.heroLead}>{hero.lead}</p>
            <p className={s.heroBody}>{hero.body}</p>
            <div className={s.actions}>
              <a href={cta.href} className={s.btn}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.link}>
                {cta.primary}
              </a>
            </div>
            <ul role="list" className={s.creds} aria-label="Kompetencija">
              {credentials.map((c) => (
                <li key={c.key}>{c.label}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ISTORIJA – „Apie mane“ pirmame plane */}
        <section id="apie" className={s.story} aria-labelledby="about-title">
          <div className={s.storyMedia}>
            <Photo name="desk" className={s.storyPhoto} sizes="(min-width: 960px) 42vw, 100vw" position="50% 25%" />
          </div>
          <div className={s.storyText}>
            <p className={s.label}>{about.title}</p>
            <h2 id="about-title" className={s.storyTitle}>
              {story[0]}
            </h2>
            <div className={s.storyBody}>
              <p>{story[1]}</p>
              <p>{story[2]}</p>
              <p className={s.storyEm}>{story[3]}</p>
              <p>{story[4]}</p>
              <p>{story[5]}</p>
              <p>{story[6]}</p>
              <p>{story[7]}</p>
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
        </section>

        {/* CITATA */}
        <section className={s.quoteBand} aria-label="Citata">
          <figure className={s.quote}>
            <blockquote data-reveal>
              <p>„{about.pullQuote}“</p>
            </blockquote>
            <figcaption>— {brand.name}</figcaption>
          </figure>
        </section>

        {/* PROBLEMA */}
        <section className={s.problem} aria-labelledby="problem-title">
          <h2 id="problem-title" className={s.h2}>
            {problem.title}
          </h2>
          <div className={s.problemText}>
            <p>{problem.body}</p>
            <p className={s.muted}>{problem.bridge}</p>
          </div>
        </section>

        {/* PASLAUGOS per „Kur esate šiandien?“ */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.sectionHead}>
            <p className={s.label}>Kur esate šiandien?</p>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p className={s.muted}>{servicesIntro.body}</p>
          </div>
          <SituationPicker services={services} moreLabel={cta.more} layout="list" className={s.picker} />
        </section>

        {/* PROCESAS */}
        <section className={s.processWrap} aria-labelledby="process-title">
          <Photo name="workspace" className={s.processPhoto} sizes="100vw" position="60% 78%" />
          <div className={s.processInner}>
            <p className={s.label}>Kaip dirbame kartu</p>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
            <ol role="list" className={s.steps}>
              {process.steps.map((step) => (
                <li key={step.n} data-reveal>
                  <span className={s.stepN} aria-hidden="true">
                    {step.n}
                  </span>
                  <h3>
                    <span className="sr-only">{step.n}. </span>
                    {step.title}
                  </h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* POKALBIS – laiško forma */}
        <section className={s.section} aria-labelledby="intro-title">
          <div className={s.letter}>
            <div className={s.letterHead}>
              <Photo name="portrait" className={s.avatar} sizes="96px" position="50% 18%" reveal={false} />
              <div>
                <p className={s.label}>{introCall.eyebrow}</p>
                <h2 id="intro-title" className={s.letterTitle}>
                  {introCall.title}
                </h2>
              </div>
            </div>
            <div className={s.letterBody}>
              <p className={s.letterLead}>{introCall.lead}</p>
              {introCall.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p className={s.letterListTitle}>{introCall.listTitle}</p>
              <ul role="list" className={s.letterList}>
                {introCall.list.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <p className={s.signoff}>
                {introCall.note} <span>— Marius</span>
              </p>
              <a href={cta.href} className={`${s.btn} ${s.btnUpper}`}>
                {cta.introUpper}
              </a>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className={s.section} aria-labelledby="proof-title">
          <div className={s.sectionHead}>
            <p className={s.label}>Atsiliepimai</p>
            <h2 id="proof-title" className={s.h2}>
              Ką sako klientai
            </h2>
          </div>
          <ul role="list" className={s.proof}>
            {testimonials.length > 0
              ? testimonials.map((t) => (
                  <li key={t.name}>
                    <blockquote>
                      <p>„{t.quote}“</p>
                    </blockquote>
                    <p className={s.proofName}>{t.name}</p>
                  </li>
                ))
              : [1, 2, 3].map((n) => (
                  <li key={n} className={s.proofEmpty}>
                    <p className={s.proofMark} aria-hidden="true">
                      „
                    </p>
                    <p>Vieta kliento atsiliepimui. Bus pridėta tik gavus tikrą atsiliepimą ir kliento sutikimą jį skelbti.</p>
                  </li>
                ))}
          </ul>
          <div className={s.instaRow}>
            <div>
              <p className={s.label}>{notes.title}</p>
              <p className={s.instaHandle}>{brand.instagram.handle}</p>
              <p className={s.muted}>{notes.lead}</p>
            </div>
            <ul role="list" className={s.instaTopics}>
              {notes.topics.map((n) => (
                <li key={n.title}>
                  <span>{n.tag}</span>
                  {n.title}
                </li>
              ))}
            </ul>
            <a href={brand.instagram.url} className={s.link} target="_blank" rel="noopener noreferrer">
              {notes.follow}
              <span className="sr-only"> (atsidaro naujame lange)</span>
            </a>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.calcBand} aria-labelledby="calc-title">
          <div className={s.calcInner}>
            <div className={s.sectionHead}>
              <p className={s.label}>{calculator.title}</p>
              <h2 id="calc-title" className={s.h2}>
                Pažiūrėkime, ką gali laikas
              </h2>
              <p className={s.muted}>{calculator.lead}</p>
            </div>
            <CalculatorTeaser />
          </div>
        </section>

        {/* DUK */}
        <section className={s.section} aria-labelledby="faq-title">
          <div className={s.faq}>
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
          </div>
        </section>

        {/* CTA */}
        <section id="kontaktai" className={s.final} aria-labelledby="final-title">
          <Photo name="desk" className={s.finalPhoto} sizes="(min-width: 960px) 40vw, 100vw" position="50% 25%" />
          <div className={s.finalText}>
            <h2 id="final-title" className={s.finalTitle}>
              {finalCta.title}
            </h2>
            <p>{finalCta.body}</p>
            <div className={s.actions}>
              <a href={cta.href} className={`${s.btn} ${s.btnLight}`}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.linkLight}>
                {cta.primary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div>
          <p className={s.footerName}>{brand.name}</p>
          <p className={s.muted}>{brand.role}</p>
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
        <p className={s.disclaimer}>{footer.disclaimer}</p>
        <p className={s.disclaimer}>
          © {footer.year} {brand.name}
        </p>
      </footer>

      <DesignSwitcher current={4} />
    </div>
  );
}
