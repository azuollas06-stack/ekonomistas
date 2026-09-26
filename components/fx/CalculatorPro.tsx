"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { calculator } from "@/content/site";
import styles from "./CalculatorPro.module.css";

const eur = new Intl.NumberFormat("lt-LT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

type Key = "initial" | "monthly" | "years" | "rate";
const FIELDS: { key: Key; label: string; min: number; max: number; step: number; format: (v: number) => string }[] = [
  { key: "initial", label: "Pradinė suma", min: 0, max: 50000, step: 500, format: eur.format },
  { key: "monthly", label: "Mėnesinė investicija", min: 0, max: 2000, step: 25, format: eur.format },
  { key: "rate", label: calculator.rateLabel, min: 0, max: calculator.rateMax, step: 0.5, format: (v) => `${String(v).replace(".", ",")} %` },
];
const YEAR_PRESETS = [5, 10, 20, 30];

/** Sklandžiai „priskaičiuojantis“ skaičius. */
function useTween(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = a + (target - a) * (1 - Math.pow(1 - t, 3));
      setValue(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const W = 640;
const H = 260;
const TOP = 18;

/**
 * Iliustracinė skaičiuoklė (13 kryptis): animuotas rezultatas, grafikas su įnešta suma ir prieaugiu,
 * „vedžiojimas“ per metus, greiti laikotarpio pasirinkimai. Tai NĖRA prognozė.
 */
export default function CalculatorPro() {
  const [v, setV] = useState(calculator.defaults);
  const [scrub, setScrub] = useState<number | null>(null);
  const id = useId();
  // SVG url(#…) nuorodai – tik saugūs simboliai (useId gali grąžinti „:“ ar „«»“)
  const gradId = `calc-grad-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const series = useMemo(() => {
    const r = v.rate / 100 / 12;
    const pts: { value: number; paid: number }[] = [];
    let value = v.initial;
    for (let y = 0; y <= v.years; y++) {
      pts.push({ value, paid: v.initial + v.monthly * 12 * y });
      for (let m = 0; m < 12; m++) value = value * (1 + r) + v.monthly;
    }
    return pts;
  }, [v]);

  const last = series[series.length - 1];
  const shown = scrub !== null ? series[scrub] : last;
  const shownYear = scrub !== null ? scrub : v.years;
  const total = useTween(shown.value);
  const paidT = useTween(shown.paid);
  const growth = Math.max(0, shown.value - shown.paid);
  const paidShare = shown.value > 0 ? Math.min(100, (shown.paid / shown.value) * 100) : 100;

  // Grafiko keliai
  const max = Math.max(1, ...series.map((p) => p.value));
  const x = (i: number) => (series.length === 1 ? 0 : (i / (series.length - 1)) * W);
  const y = (n: number) => H - (n / max) * (H - TOP);
  // Catmull-Rom → Bezier: sklandi kreivė per visus taškus, be „laiptelių“.
  const smooth = (vals: number[]) => {
    const p = vals.map((n, i) => [x(i), y(n)] as const);
    const f = (n: number) => n.toFixed(1);
    let d = `M${f(p[0][0])},${f(p[0][1])}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] ?? p[i];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[i + 2] ?? p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  };
  const valueLine = smooth(series.map((p) => p.value));
  const paidLine = smooth(series.map((p) => p.paid));
  const valueArea = `${valueLine} L${W},${H} L0,${H} Z`;
  const paidArea = `${paidLine} L${W},${H} L0,${H} Z`;
  const dStyle = (d: string) => ({ d: `path("${d}")` }) as CSSProperties;

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setScrub(Math.round(t * (series.length - 1)));
  };
  const markerI = scrub ?? series.length - 1;
  const mid = Math.round(v.years / 2);

  return (
    <div className={styles.root}>
      {/* REZULTATAS */}
      <div className={styles.result}>
        <div className={styles.resultHead}>
          <span className={styles.badge}>{calculator.badge}</span>
          <span className={styles.year}>{scrub !== null ? `Po ${shownYear} m.` : `Po ${v.years} m.`}</span>
        </div>
        <p className={styles.total} aria-live="polite">
          <span className="sr-only">Iliustracinė vertė po {shownYear} m.: </span>
          {eur.format(Math.round(total))}
        </p>
        <div className={styles.split} aria-hidden="true">
          <span style={{ width: `${paidShare}%` }} />
          <span style={{ width: `${100 - paidShare}%` }} />
        </div>
        <dl className={styles.legend}>
          <div>
            <dt>
              <i className={styles.keyPaid} /> {calculator.paidLabel}
            </dt>
            <dd>{eur.format(Math.round(paidT))}</dd>
          </div>
          <div>
            <dt>
              <i className={styles.keyGrowth} /> {calculator.growthLabel}
            </dt>
            <dd>{eur.format(Math.round(growth))}</dd>
          </div>
        </dl>

        {/* GRAFIKAS */}
        <div className={styles.chartWrap}>
          {/* .plot – tik grafiko plotas (be ašies), kad žymeklio % sutaptų su linija */}
          <div className={styles.plot}>
          <svg
            className={styles.chart}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            onPointerMove={onMove}
            onPointerDown={onMove}
            onPointerLeave={() => setScrub(null)}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.32" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
              <line key={g} x1="0" x2={W} y1={TOP + (H - TOP) * g} y2={TOP + (H - TOP) * g} className={styles.grid} />
            ))}
            <path className={styles.valueArea} d={valueArea} style={dStyle(valueArea)} fill={`url(#${gradId})`} />
            <path className={styles.paidArea} d={paidArea} style={dStyle(paidArea)} />
            <path className={styles.valueLine} d={valueLine} style={dStyle(valueLine)} vectorEffect="non-scaling-stroke" />
            <path className={styles.paidLine} d={paidLine} style={dStyle(paidLine)} vectorEffect="non-scaling-stroke" />
            {scrub !== null && (
              <line x1={x(markerI)} x2={x(markerI)} y1={TOP - 8} y2={H} className={styles.cursor} vectorEffect="non-scaling-stroke" />
            )}
          </svg>
          <span
            className={styles.marker}
            style={{ left: `${(x(markerI) / W) * 100}%`, top: `${(y(series[markerI].value) / H) * 100}%` }}
            aria-hidden="true"
          />
          </div>
          <div className={styles.axis} aria-hidden="true">
            <span>0 m.</span>
            <span>{mid} m.</span>
            <span>{v.years} m.</span>
          </div>
        </div>
        <p className={styles.hint} aria-hidden="true">
          Vedžiokite per grafiką, kad pamatytumėte bet kurių metų vertę.
        </p>
      </div>

      {/* VALDYMAS */}
      <div className={styles.controls}>
        <div className={styles.field}>
          <span className={styles.fieldLabel} id={`${id}-years-label`}>
            Investavimo laikotarpis
          </span>
          <div className={styles.presets} role="group" aria-labelledby={`${id}-years-label`}>
            {YEAR_PRESETS.map((yr) => (
              <button key={yr} type="button" aria-pressed={v.years === yr} onClick={() => setV((s) => ({ ...s, years: yr }))}>
                {yr} m.
              </button>
            ))}
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={v.years}
            aria-labelledby={`${id}-years-label`}
            aria-valuetext={`${v.years} m.`}
            onChange={(e) => setV((s) => ({ ...s, years: Number(e.target.value) }))}
            style={{ ["--p" as string]: `${((v.years - 1) / 39) * 100}%` } as CSSProperties}
          />
        </div>
        {FIELDS.map((f) => (
          <div key={f.key} className={styles.field}>
            <div className={styles.fieldHead}>
              <label htmlFor={`${id}-${f.key}`} className={styles.fieldLabel}>
                {f.label}
              </label>
              <output htmlFor={`${id}-${f.key}`} className={styles.value}>
                {f.format(v[f.key])}
              </output>
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
              style={{ ["--p" as string]: `${((v[f.key] - f.min) / (f.max - f.min)) * 100}%` } as CSSProperties}
            />
          </div>
        ))}
        <p className={styles.disclaimer}>{calculator.disclaimer}</p>
      </div>
    </div>
  );
}
