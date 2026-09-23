import type { Metadata } from "next";
import {
  brand,
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
import CalculatorTeaser from "@/components/shared/CalculatorTeaser";
import ConsentButton from "@/components/shared/ConsentButton";
import DesignSwitcher from "@/components/shared/DesignSwitcher";
import CountUp from "@/components/fx/CountUp";
import SituationSheet from "@/components/fx/SituationSheet";
import s from "./page.module.css";

export const metadata: Metadata = { title: "Kryptis 07 – Fintech programėlė | Marius Lencevičius" };

// Paprastos linijinės ikonos apatinei navigacijai.
const icon = {
  home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  chat: "M4 5h16v11H8l-4 4z",
};
function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" className={s.icon}>
      <path d={d} />
    </svg>
  );
}

// Spurgos diagrama iš demonstracinių duomenų (conic-gradient).
const DONUT_COLORS = ["#2f5bff", "#0e0e12", "#9db0ff", "#d9dee9"];
function donutGradient() {
  let acc = 0;
  return xray.assets
    .map((a, i) => {
      const from = acc;
      acc += a.value;
      return `${DONUT_COLORS[i]} ${from}% ${acc}%`;
    })
    .join(", ");
}

export default function Design07() {
  return (
    <div className={s.page}>
      <a className="skip-link" href="#turinys">
        Pereiti prie turinio
      </a>

      {/* VIRŠUTINĖ JUOSTA – kaip programėlėje */}
      <header className={s.appbar}>
        <a href="#pagrindinis" className={s.profile}>
          <Photo name="portrait" className={s.avatar} sizes="44px" position="50% 16%" reveal={false} />
          <span>
            <span className={s.hello}>{brand.name}</span>
            <span className={s.role}>{brand.role}</span>
          </span>
        </a>
        <a href={cta.href} className={s.appbarBtn}>
          Pokalbis
        </a>
      </header>

      <main id="turinys" className={s.main}>
        {/* BENTO – hero */}
        <section id="pagrindinis" className={s.bento} aria-labelledby="hero-title">
          <div className={`${s.tile} ${s.tileHero} ${s.pop}`}>
            <p className={s.badge}>
              <span className={s.live} aria-hidden="true" /> {cta.intro}
            </p>
            <h1 id="hero-title" className={s.heroTitle}>
              {brand.tagline}
            </h1>
            <p className={s.heroLead}>{hero.lead}</p>
            <div className={s.heroActions}>
              <a href={cta.href} className={s.btnWhite}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.btnOutlineLight}>
                {cta.primary}
              </a>
            </div>
            <svg className={s.spark} viewBox="0 0 200 60" aria-hidden="true">
              <path d="M0 52 L20 46 L35 49 L55 38 L70 41 L90 30 L105 33 L125 22 L140 25 L160 14 L175 16 L200 4" pathLength={1} />
            </svg>
          </div>

          <div className={`${s.tile} ${s.tilePhoto} ${s.pop}`}>
            <Photo name="portrait" className={s.photoFill} sizes="(min-width: 900px) 30vw, 50vw" priority reveal={false} position="50% 20%" />
          </div>

          <div className={`${s.tile} ${s.tileStat} ${s.pop}`}>
            <p className={s.statValue}>
              <CountUp to={5} suffix="+" />
            </p>
            <p className={s.statLabel}>metų patirtis investavimo srityje</p>
          </div>
          <div className={`${s.tile} ${s.tileStat} ${s.tileBlueSoft} ${s.pop}`}>
            <p className={s.statValue}>BFAA</p>
            <p className={s.statLabel}>investavimo konsultanto (IA) licencija</p>
          </div>
          <div className={`${s.tile} ${s.tileStat} ${s.tileWide} ${s.pop}`}>
            <p className={s.statValueSm}>Ekonomikos išsilavinimas</p>
            <p className={s.statLabel}>{hero.body}</p>
          </div>

          {/* KUR ESATE ŠIANDIEN? */}
          <div className={`${s.tile} ${s.tileDark} ${s.tileFull} ${s.pop}`}>
            <p className={s.kickerLight}>{situationPicker.lead}</p>
            <h2 className={s.tileTitle}>{situationPicker.title}</h2>
            <SituationSheet
              services={services}
              moreLabel={cta.more}
              ctaLabel={cta.intro}
              ctaHref={cta.href}
              listClassName={s.chips}
              chipClassName={s.chip}
            />
          </div>
        </section>

        {/* PROBLEMA */}
        <section className={s.section} aria-labelledby="problem-title">
          <div className={`${s.tile} ${s.pop}`}>
            <h2 id="problem-title" className={s.h2}>
              {problem.title}
            </h2>
            <p className={s.muted}>{problem.body}</p>
            <p className={s.note}>{problem.bridge}</p>
          </div>
        </section>

        {/* PASLAUGOS – programėlės sąrašas */}
        <section id="paslaugos" className={s.section} aria-labelledby="services-title">
          <div className={s.sectionHead}>
            <h2 id="services-title" className={s.h2}>
              {servicesIntro.title}
            </h2>
            <p className={s.muted}>{servicesIntro.body}</p>
          </div>
          <ul role="list" className={s.list}>
            {services.map((svc) => (
              <li key={svc.id} className={s.pop}>
                <a href={svc.href} className={s.row}>
                  <span className={s.rowIcon} aria-hidden="true">
                    {svc.title.charAt(0)}
                  </span>
                  <span className={s.rowText}>
                    <span className={s.rowTitle}>{svc.title}</span>
                    <span className={s.rowSub}>{svc.short}</span>
                  </span>
                  <span className={s.chev} aria-hidden="true">
                    ›
                  </span>
                  <span className="sr-only">{cta.more}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* PROCESAS – „istorijos“ */}
        <section className={s.section} aria-labelledby="process-title">
          <div className={s.sectionHead}>
            <h2 id="process-title" className={s.h2}>
              {process.title}
            </h2>
            <p className={s.muted}>5 žingsniai – braukite</p>
          </div>
          <ol role="list" className={s.stories}>
            {process.steps.map((step, i) => (
              <li key={step.n} className={s.story}>
                <span className={s.storyBars} aria-hidden="true">
                  {process.steps.map((_, j) => (
                    <span key={j} data-on={j <= i} />
                  ))}
                </span>
                <span className={s.storyN} aria-hidden="true">
                  {step.n}
                </span>
                <h3 className={s.storyTitle}>
                  <span className="sr-only">{step.n}. </span>
                  {step.title}
                </h3>
                <p className={s.storyBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* PORTFELIO PAVYZDYS – spurga */}
        <section className={s.section} aria-labelledby="xray-title">
          <div className={`${s.tile} ${s.donutTile} ${s.pop}`}>
            <div>
              <p className={s.demo}>{xray.badge}</p>
              <h2 id="xray-title" className={s.h2}>
                {xray.title}
              </h2>
              <p className={s.muted}>{xray.lead}</p>
            </div>
            <div className={s.donutWrap}>
              <div
                className={s.donut}
                style={{ ["--grad" as string]: donutGradient() }}
                role="img"
                aria-label={`Turto klasės: ${xray.assets.map((a) => `${a.label} ${a.value} %`).join(", ")}`}
              >
                <span className={s.donutCenter}>
                  <strong>{xray.metrics[0].value}</strong>
                  <span>pozicijos</span>
                </span>
              </div>
              <ul role="list" className={s.legend}>
                {xray.assets.map((a, i) => (
                  <li key={a.label}>
                    <span className={s.dot} style={{ background: DONUT_COLORS[i] }} aria-hidden="true" />
                    {a.label}
                    <b>{a.value} %</b>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.riskRow}>
              <span>{xray.risk.label}</span>
              <span className={s.riskBar} aria-hidden="true">
                <span style={{ width: `${(xray.risk.value / xray.risk.max) * 100}%` }} />
              </span>
              <b>{xray.risk.text}</b>
            </div>
            <p className={s.small}>{xray.disclaimer}</p>
          </div>
        </section>

        {/* POKALBIS */}
        <section className={s.section} aria-labelledby="intro-title">
          <div className={`${s.tile} ${s.tileDark} ${s.pop}`}>
            <p className={s.kickerLight}>{introCall.eyebrow}</p>
            <h2 id="intro-title" className={s.tileTitle}>
              {introCall.title}
            </h2>
            <p className={s.introLead}>{introCall.lead}</p>
            {introCall.body.map((p) => (
              <p key={p} className={s.introP}>
                {p}
              </p>
            ))}
            <ul role="list" className={s.checks}>
              {introCall.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
            <p className={s.introNote}>{introCall.note}</p>
            <a href={cta.href} className={s.btnBlue}>
              {cta.introUpper}
            </a>
          </div>
        </section>

        {/* APIE */}
        <section id="apie" className={s.section} aria-labelledby="about-title">
          <div className={`${s.tile} ${s.aboutTile} ${s.pop}`}>
            <Photo name="desk" className={s.aboutPhoto} sizes="(min-width: 900px) 40vw, 100vw" position="50% 25%" />
            <div className={s.aboutText}>
              <p className={s.demoPlain}>{about.title}</p>
              <h2 id="about-title" className={s.h2}>
                {about.pullQuote}
              </h2>
              <p className={s.muted}>{about.paragraphs[0]}</p>
              <p className={s.muted}>{about.paragraphs[4]}</p>
              <p className={s.muted}>{about.paragraphs[7]}</p>
              <ul role="list" className={s.tags}>
                {about.principles.map((p) => (
                  <li key={p.title}>{p.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SKAIČIUOKLĖ */}
        <section id="skaiciuokle" className={s.section} aria-labelledby="calc-title">
          <div className={`${s.tile} ${s.calcTile} ${s.pop}`}>
            <h2 id="calc-title" className={s.h2}>
              {calculator.title}
            </h2>
            <p className={s.muted}>{calculator.lead}</p>
            <div className={s.calc}>
              <CalculatorTeaser />
            </div>
          </div>
        </section>

        {/* UŽRAŠAI – „istorijų“ burbulai */}
        <section className={s.section} aria-labelledby="notes-title">
          <div className={s.sectionHead}>
            <h2 id="notes-title" className={s.h2}>
              {notes.title}
            </h2>
            <p className={s.muted}>{brand.instagram.handle}</p>
          </div>
          <ul role="list" className={s.bubbles}>
            {notes.topics.map((n) => (
              <li key={n.title}>
                <span className={s.ring} aria-hidden="true">
                  <span>{n.tag.slice(0, 3)}</span>
                </span>
                <span className={s.bubbleLabel}>{n.tag}</span>
              </li>
            ))}
          </ul>
          <ul role="list" className={s.noteList}>
            {notes.topics.map((n) => (
              <li key={n.title}>{n.title}</li>
            ))}
          </ul>
          <a href={brand.instagram.url} className={s.btnSoft} target="_blank" rel="noopener noreferrer">
            {notes.follow}
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
        <section id="kontaktai" className={s.section} aria-labelledby="final-title">
          <div className={`${s.tile} ${s.tileHero} ${s.pop}`}>
            <h2 id="final-title" className={s.heroTitle}>
              {finalCta.title}
            </h2>
            <p className={s.heroLead}>{finalCta.body}</p>
            <div className={s.heroActions}>
              <a href={cta.href} className={s.btnWhite}>
                {cta.intro}
              </a>
              <a href={cta.href} className={s.btnOutlineLight}>
                {cta.primary}
              </a>
            </div>
          </div>
        </section>

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
      </main>

      {/* APATINĖ NAVIGACIJA */}
      <nav className={s.tabbar} aria-label="Pagrindinė navigacija">
        <a href="#pagrindinis">
          <Icon d={icon.home} />
          Pagrindinis
        </a>
        <a href="#paslaugos">
          <Icon d={icon.grid} />
          Paslaugos
        </a>
        <a href={cta.href} className={s.tabMain}>
          <span className={s.tabMainIcon}>
            <Icon d={icon.chat} />
          </span>
          Pokalbis
        </a>
        <a href="#skaiciuokle">
          <Icon d={icon.chart} />
          Skaičiuoklė
        </a>
        <a href="#apie">
          <Icon d={icon.user} />
          Apie mane
        </a>
      </nav>

      <DesignSwitcher current={7} className={s.switcher} />
    </div>
  );
}
