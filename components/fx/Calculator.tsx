"use client";

import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { calculator } from "@/content/site";
import styles from "./Calculator.module.css";

const eur = new Intl.NumberFormat("lt-LT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("lt-LT", { notation: "compact", maximumFractionDigits: 1 });
const percent = (v: number) => `${String(v).replace(".", ",")} %`;

type Key = "initial" | "monthly" | "rate";
type Field = {
  key: Key;
  label: string;
  /** slankiklio reikšmės – „patogūs“ žingsniai, kad ir mažas, ir dideles sumas būtų lengva nustatyti */
  ticks: number[];
  format: (v: number) => string;
  /** reikšmė redaguojant ranka (be tūkstančių tarpų ir ženklų) */
  raw: (v: number) => string;
  /** ranka įvestos reikšmės apribojimas ir apvalinimas */
  clamp: (v: number) => number;
};

/** 0–1 000 kas 10 €, iki 10 000 kas 100 €, iki 100 000 kas 1 000 €, toliau kas 5 000 €. */
function moneyTicks(max: number) {
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += v < 1000 ? 10 : v < 10000 ? 100 : v < 100000 ? 1000 : 5000) ticks.push(v);
  if (ticks[ticks.length - 1] !== max) ticks.push(max);
  return ticks;
}
const range = (max: number, step: number) => Array.from({ length: Math.round(max / step) + 1 }, (_, i) => i * step);
const limit = (max: number, precision: number) => (v: number) => Math.min(max, Math.max(0, Math.round(v * precision) / precision));

const FIELDS: Field[] = [
  {
    key: "initial",
    label: "Pradinė suma",
    ticks: moneyTicks(calculator.initialMax),
    format: eur.format,
    raw: String,
    clamp: limit(calculator.initialMax, 1),
  },
  {
    key: "monthly",
    label: "Mėnesinė investicija",
    ticks: moneyTicks(calculator.monthlyMax),
    format: eur.format,
    raw: String,
    clamp: limit(calculator.monthlyMax, 1),
  },
  {
    key: "rate",
    label: calculator.rateLabel,
    ticks: range(calculator.rateMax, 0.5),
    format: percent,
    raw: (v) => String(v).replace(".", ","),
    clamp: limit(calculator.rateMax, 10),
  },
];
const YEAR_PRESETS = [5, 10, 20, 30];

/** Artimiausios slankiklio padalos indeksas (ranka įvesta suma gali būti tarp padalų). */
function nearest(ticks: number[], v: number) {
  let lo = 0;
  let hi = ticks.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (ticks[mid] < v) lo = mid + 1;
    else hi = mid;
  }
  return lo > 0 && v - ticks[lo - 1] < ticks[lo] - v ? lo - 1 : lo;
}

function parseNumber(text: string) {
  const n = Number.parseFloat(text.replace(/[^\d,.]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

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

/** Reikšmė, kurią galima ir perskaityti, ir paspaudus įvesti ranka. */
function ValueInput({ field, value, onCommit }: { field: Field; value: number; onCommit: (v: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  const cancelled = useRef(false);

  const commit = () => {
    const n = draft === null || cancelled.current ? null : parseNumber(draft);
    cancelled.current = false;
    setDraft(null);
    if (n !== null) onCommit(field.clamp(n));
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      spellCheck={false}
      className={styles.valueInput}
      aria-label={`${field.label}: įveskite reikšmę`}
      value={draft ?? field.format(value)}
      onFocus={(e) => {
        setDraft(field.raw(value));
        const el = e.currentTarget;
        requestAnimationFrame(() => el.select());
      }}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          // atšaukia tik įvedimą – langas neužsidaro
          e.preventDefault();
          e.stopPropagation();
          cancelled.current = true;
          e.currentTarget.blur();
        }
      }}
    />
  );
}

const W = 640;
const H = 260;
const TOP = 18;

/**
 * Iliustracinė sudėtinių palūkanų skaičiuoklė: animuotas rezultatas, investuota ir uždirbta dalis,
 * „vedžiojimas“ per grafiką, slankikliai su patogiais žingsniais ir ranka įvedamos reikšmės.
 * Tai NĖRA prognozė – grąža pastovi ir pasirenkama vartotojo.
 */
export default function Calculator() {
  const [v, setV] = useState(calculator.defaults);
  const [scrub, setScrub] = useState<number | null>(null);
  const id = useId();
  // SVG url(#…) nuorodai – tik saugūs simboliai (useId gali grąžinti „:“ ar „«»“)
  const gradId = `calc-grad-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const set = (key: keyof typeof v, value: number) => setV((s) => ({ ...s, [key]: value }));

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
  // šrifto dydis pagal galutinio skaičiaus ilgį – ir milijardai telpa vienoje eilutėje
  const totalChars = eur.format(Math.round(shown.value)).length;

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
          <span className={styles.year}>Po {shownYear} m.</span>
        </div>
        <p className={styles.total} aria-live="polite" style={{ ["--chars" as string]: totalChars } as CSSProperties}>
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
            <dd>
              {eur.format(Math.round(growth))}
              <span className={styles.share}>{Math.round(100 - paidShare)} %</span>
            </dd>
          </div>
        </dl>

        {/* GRAFIKAS */}
        <div className={styles.chartWrap}>
          {/* .plot – tik grafiko plotas (be ašies), kad žymeklio % sutaptų su linija */}
          <div className={styles.plot}>
            <span className={styles.scale} aria-hidden="true">
              {compact.format(max)} €
            </span>
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
        {/* telefone – lipni suvestinė, kad keičiant reikšmes rezultatas būtų matomas */}
        <div className={styles.mini} aria-hidden="true">
          <span>Po {v.years} m.</span>
          <b>{eur.format(Math.round(total))}</b>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldHead}>
            <span className={styles.fieldLabel} id={`${id}-years-label`}>
              Investavimo laikotarpis
            </span>
            <output className={styles.value}>{v.years} m.</output>
          </div>
          <div className={styles.presets} role="group" aria-labelledby={`${id}-years-label`}>
            {YEAR_PRESETS.map((yr) => (
              <button key={yr} type="button" aria-pressed={v.years === yr} onClick={() => set("years", yr)}>
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
            onChange={(e) => set("years", Number(e.target.value))}
            style={{ ["--p" as string]: `${((v.years - 1) / 39) * 100}%` } as CSSProperties}
          />
        </div>

        {FIELDS.map((f) => {
          const i = nearest(f.ticks, v[f.key]);
          const top = f.ticks.length - 1;
          return (
            <div key={f.key} className={styles.field}>
              <div className={styles.fieldHead}>
                <label htmlFor={`${id}-${f.key}`} className={styles.fieldLabel}>
                  {f.label}
                </label>
                <ValueInput field={f} value={v[f.key]} onCommit={(n) => set(f.key, n)} />
              </div>
              <input
                id={`${id}-${f.key}`}
                type="range"
                min={0}
                max={top}
                step={1}
                value={i}
                aria-valuetext={f.format(v[f.key])}
                onChange={(e) => set(f.key, f.ticks[Number(e.target.value)])}
                style={{ ["--p" as string]: `${(i / top) * 100}%` } as CSSProperties}
              />
            </div>
          );
        })}
        <p className={styles.disclaimer}>{calculator.disclaimer}</p>
      </div>
    </div>
  );
}
