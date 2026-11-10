import { useMemo, useState } from "react";
import type { MonthPoint } from "../../data/dataset";
import { useInView } from "../../lib/hooks";
import { money, moneyCompact, num } from "../../lib/format";
import Tooltip from "./Tooltip";

const W = 900;
const H = 340;
const M = { top: 30, right: 18, bottom: 36, left: 62 };

type Metric = "spend" | "count";

const niceStep = (raw: number) => {
  const exp = Math.floor(Math.log10(raw));
  const f = raw / 10 ** exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * 10 ** exp;
};

export default function MonthlyChart({ monthly }: { monthly: MonthPoint[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [metric, setMetric] = useState<Metric>("spend");
  const [hover, setHover] = useState<number | null>(null);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const values = useMemo(
    () => monthly.map((d) => (metric === "spend" ? d.spend : d.count)),
    [monthly, metric],
  );

  const peak = Math.max(...values);
  const step = niceStep(peak / 4);
  const top = Math.ceil((peak * 1.06) / step) * step;
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const band = plotW / monthly.length;
  const barW = band * 0.46;
  const baseY = M.top + plotH;
  const fmt = (v: number) => (metric === "spend" ? moneyCompact(v) : num(Math.round(v)));

  return (
    <div className="chart" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Monthly net spend</h3>
          <p className="chart-sub">Net of refunds · January to December 2014</p>
        </div>
        <div className="chart-toggle" role="group" aria-label="Chart metric">
          <button
            type="button"
            className={metric === "spend" ? "is-on" : ""}
            onClick={() => setMetric("spend")}
          >
            Dollars
          </button>
          <button
            type="button"
            className={metric === "count" ? "is-on" : ""}
            onClick={() => setMetric("count")}
          >
            Swipes
          </button>
        </div>
      </div>

      <div className="chart-canvas">
        <svg viewBox={`0 0 ${W} ${H}`} className={inView ? "is-in" : ""} role="img" aria-label="Monthly totals">
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={M.left}
                x2={W - M.right}
                y1={baseY - (t / top) * plotH}
                y2={baseY - (t / top) * plotH}
                className="grid-line"
              />
              <text x={M.left - 12} y={baseY - (t / top) * plotH + 4} className="axis-text" textAnchor="end">
                {fmt(t)}
              </text>
            </g>
          ))}

          <line
            x1={M.left}
            x2={W - M.right}
            y1={baseY - (avg / top) * plotH}
            y2={baseY - (avg / top) * plotH}
            className="avg-line"
          />
          <text
            x={W - M.right - 2}
            y={baseY - (avg / top) * plotH - 9}
            textAnchor="end"
            className="axis-text axis-text--accent"
          >
            avg {fmt(avg)}
          </text>

          {monthly.map((d, i) => {
            const v = values[i];
            const h = (v / top) * plotH;
            const x = M.left + i * band + (band - barW) / 2;
            const isHover = hover === i;
            return (
              <g key={d.label}>
                <rect
                  className="bar"
                  x={x}
                  y={baseY - h}
                  width={barW}
                  height={h}
                  fill={isHover ? "#8adcfd" : "rgba(56,189,248,0.72)"}
                  style={{ transitionDelay: `${i * 45}ms` }}
                />
                <text
                  x={M.left + i * band + band / 2}
                  y={baseY + 22}
                  className={`axis-text ${isHover ? "axis-text--strong" : ""}`}
                  textAnchor="middle"
                >
                  {d.label}
                </text>
                <rect
                  x={M.left + i * band}
                  y={M.top}
                  width={band}
                  height={plotH}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
              </g>
            );
          })}

          <line x1={M.left} x2={W - M.right} y1={baseY} y2={baseY} className="axis-line" />
        </svg>

        {hover !== null ? (
          <Tooltip left={((M.left + hover * band + band / 2) / W) * 100}>
            <span className="tip-label">{monthly[hover].label} 2014</span>
            <span className="tip-value mono">{money(monthly[hover].spend)}</span>
            <span className="tip-row mono">{num(monthly[hover].count)} swipes</span>
            <span className="tip-row mono">{num(monthly[hover].cardholders)} cardholders</span>
            <span className="tip-row mono">avg swipe {money(monthly[hover].avgTicket, 2)}</span>
          </Tooltip>
        ) : null}
      </div>

      <p className="chart-foot">
        April is the high-water mark at {money(monthly[3].spend)}; spending slides 31% into December.
      </p>
    </div>
  );
}
