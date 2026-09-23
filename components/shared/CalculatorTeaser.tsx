"use client";

import { useId, useMemo, useState } from "react";
import { calculator } from "@/content/site";
import styles from "./CalculatorTeaser.module.css";

const eur = new Intl.NumberFormat("lt-LT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

type Field = {
  key: "initial" | "monthly" | "years" | "rate";
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
};

const FIELDS: Field[] = [
  { key: "initial", label: "Pradinė suma", min: 0, max: 50000, step: 500, format: eur.format },
  { key: "monthly", label: "Mėnesinė investicija", min: 0, max: 2000, step: 25, format: eur.format },
  { key: "years", label: "Investavimo laikotarpis", min: 1, max: 40, step: 1, format: (v) => `${v} m.` },
  { key: "rate", label: "Hipotetinė metinė grąža", min: 0, max: 10, step: 0.5, format: (v) => `${String(v).replace(".", ",")} %` },
];

/**
 * Skaičiuoklės teaseris: paprasta sudėtinių palūkanų iliustracija.
 * Tai NĖRA prognozė – grąža pastovi ir pasirinkta vartotojo.
 */
export default function CalculatorTeaser({ className }: { className?: string }) {
  const [v, setV] = useState(calculator.defaults);
  const id = useId();

  const series = useMemo(() => {
    const r = v.rate / 100 / 12;
    const points: { value: number; paid: number }[] = [];
    let value = v.initial;
    for (let y = 0; y <= v.years; y++) {
      points.push({ value, paid: v.initial + v.monthly * 12 * y });
      for (let m = 0; m < 12; m++) value = value * (1 + r) + v.monthly;
    }
    return points;
  }, [v]);

  const last = series[series.length - 1];
  const W = 600;
  const H = 220;
  const max = Math.max(1, ...series.map((p) => p.value));
  const x = (i: number) => (series.length === 1 ? 0 : (i / (series.length - 1)) * W);
  const y = (n: number) => H - (n / max) * (H - 8);
  const valueLine = series.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const paidLine = series.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.paid).toFixed(1)}`).join(" ");
  const area = `${valueLine} L${W},${H} L0,${H} Z`;

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <div className={styles.controls}>
        <p className={styles.badge}>{calculator.badge}</p>
        {FIELDS.map((f) => (
          <div key={f.key} className={styles.field}>
            <div className={styles.fieldHead}>
              <label htmlFor={`${id}-${f.key}`}>{f.label}</label>
              <output htmlFor={`${id}-${f.key}`}>{f.format(v[f.key])}</output>
            </div>
            <input
              id={`${id}-${f.key}`}
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={v[f.key]}
              aria-valuetext={f.format(v[f.key])}
              onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
              style={{ ["--p" as string]: `${((v[f.key] - f.min) / (f.max - f.min)) * 100}%` }}
            />
          </div>
        ))}
      </div>

      <div className={styles.result}>
        <div className={styles.summary} aria-live="polite">
          <div>
            <p className={styles.sumLabel}>Iliustracinė vertė po {v.years} m.</p>
            <p className={styles.sumValue}>{eur.format(last.value)}</p>
          </div>
          <dl className={styles.split}>
            <div>
              <dt>Įnešta</dt>
              <dd>{eur.format(last.paid)}</dd>
            </div>
            <div>
              <dt>Hipotetinis prieaugis</dt>
              <dd>{eur.format(Math.max(0, last.value - last.paid))}</dd>
            </div>
          </dl>
        </div>
        <svg className={styles.chart} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path d={area} className={styles.area} />
          <path d={valueLine} className={styles.line} vectorEffect="non-scaling-stroke" />
          <path d={paidLine} className={styles.paid} vectorEffect="non-scaling-stroke" />
        </svg>
        <div className={styles.chartLegend} aria-hidden="true">
          <span>
            <i className={styles.keyValue} /> Iliustracinė vertė
          </span>
          <span>
            <i className={styles.keyPaid} /> Įnešta suma
          </span>
        </div>
        <p className={styles.disclaimer}>{calculator.disclaimer}</p>
      </div>
    </div>
  );
}
