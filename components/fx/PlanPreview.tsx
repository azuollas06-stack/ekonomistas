import { planPreview, brand } from "@/content/site";
import styles from "./PlanPreview.module.css";

/**
 * DEMONSTRACINIS plano pavyzdys: trys „lapai“, kurie slenkant išsiskleidžia vėduokle
 * (CSS scroll-driven; be palaikymo – iškart išskleisti).
 */
export default function PlanPreview() {
  return (
    <figure className={styles.root} aria-label={`${planPreview.title}. ${planPreview.disclaimer}`}>
      <div className={styles.deck}>
        {planPreview.pages.map((p, i) => (
          <div key={p.title} className={styles.sheet} style={{ ["--i" as string]: i }}>
            <div className={styles.sheetHead}>
              <span className={styles.mono} aria-hidden="true">
                ML
              </span>
              <span className={styles.docTitle}>Investavimo planas</span>
              <span className={styles.page}>
                {i + 1}/{planPreview.pages.length}
              </span>
            </div>
            <p className={styles.sheetTitle}>{p.title}</p>
            {"rows" in p && p.rows && (
              <ul role="list" className={styles.rows}>
                {p.rows.map((r) => (
                  <li key={r}>
                    <span className={styles.tick} aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            )}
            {"bars" in p && p.bars && (
              <ul role="list" className={styles.bars}>
                {p.bars.map((b) => (
                  <li key={b.label}>
                    <span className={styles.barLabel}>
                      {b.label}
                      <b>{b.value} %</b>
                    </span>
                    <span className={styles.barTrack}>
                      <span style={{ width: `${b.value}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.lines} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className={styles.sign}>{brand.name}</p>
          </div>
        ))}
        <span className={styles.badge}>{planPreview.badge}</span>
      </div>
      <figcaption className={styles.caption}>{planPreview.disclaimer}</figcaption>
    </figure>
  );
}
