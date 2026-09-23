import { xray } from "@/content/site";
import styles from "./PortfolioXray.module.css";

type Segment = { label: string; value: number };

// Tonų skalė iš vienos prekės ženklo spalvos – be papildomų atspalvių.
const TONES = [1, 0.62, 0.36, 0.16];

function StackedBar({ title, data }: { title: string; data: Segment[] }) {
  const summary = data.map((d) => `${d.label} ${d.value} %`).join(", ");
  return (
    <div className={styles.group}>
      <p className={styles.groupTitle}>{title}</p>
      <div className={styles.bar} role="img" aria-label={`${title}: ${summary}`}>
        {data.map((d, i) => (
          <span
            key={d.label}
            className={styles.seg}
            style={{ flexBasis: `${d.value}%`, opacity: TONES[i % TONES.length] }}
          />
        ))}
      </div>
      <ul role="list" className={styles.legend}>
        {data.map((d, i) => (
          <li key={d.label}>
            <span className={styles.swatch} style={{ opacity: TONES[i % TONES.length] }} aria-hidden="true" />
            <span className={styles.legendLabel}>{d.label}</span>
            <span className={styles.legendValue}>{d.value} %</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Statinis portfelio „rentgeno“ pavyzdys. Tik demonstracija – jokios rekomendacijos logikos. */
export default function PortfolioXray({ className }: { className?: string }) {
  return (
    <figure className={`${styles.root} ${className ?? ""}`} aria-labelledby="xray-caption">
      <div className={styles.head}>
        <span className={styles.badge}>{xray.badge}</span>
        <span className={styles.headNote}>Portfelio struktūra</span>
      </div>

      <div className={styles.grid}>
        <StackedBar title="Turto klasės" data={xray.assets} />
        <StackedBar title="Regionai" data={xray.regions} />
      </div>

      <dl className={styles.metrics}>
        {xray.metrics.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
        <div>
          <dt>{xray.risk.label}</dt>
          <dd className={styles.risk}>
            <span className={styles.riskScale} aria-hidden="true">
              {Array.from({ length: xray.risk.max }, (_, i) => (
                <span key={i} data-on={i < xray.risk.value} />
              ))}
            </span>
            <span>
              {xray.risk.text}
              <span className="sr-only">
                {" "}
                ({xray.risk.value} iš {xray.risk.max})
              </span>
            </span>
          </dd>
        </div>
      </dl>

      <div className={styles.findings}>
        <p className={styles.groupTitle}>Pastebėjimai</p>
        <ul role="list">
          {xray.findings.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      <figcaption id="xray-caption" className={styles.caption}>
        <strong>{xray.badge}.</strong> {xray.disclaimer}
      </figcaption>
    </figure>
  );
}
