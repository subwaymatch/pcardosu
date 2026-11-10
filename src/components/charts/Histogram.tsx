import { useState } from "react";
import { useInView } from "../../lib/hooks";
import { money, moneyCompact, num } from "../../lib/format";
import Tooltip from "./Tooltip";

interface Bin {
  label: string;
  low: number;
  high: number;
  count: number;
  spend: number;
}

const W = 900;
const H = 300;
const M = { top: 26, right: 18, bottom: 46, left: 52 };

export default function Histogram({ bins, median }: { bins: Bin[]; median: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [hover, setHover] = useState<number | null>(null);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const maxLog = Math.log10(Math.max(...bins.map((b) => b.count)) + 1);
  const band = plotW / bins.length;
  const barW = band * 0.62;
  const baseY = M.top + plotH;

  const medianIndex = Math.min(
    bins.findIndex((b) => median >= b.low && median < b.high),
    bins.length - 1,
  );
  const medianX = M.left + medianIndex * band + band * (0.9);

  return (
    <div className="chart" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">How big is a swipe?</h3>
          <p className="chart-sub">Purchase count per size band · log scale, refunds excluded</p>
        </div>
        <span className="mono chart-badge">Median · {money(median, 2)}</span>
      </div>

      <div className="chart-canvas">
        <svg viewBox={`0 0 ${W} ${H}`} className={inView ? "is-in" : ""} role="img" aria-label="Transaction size histogram">
          {[1, 10, 100, 1000, 10000].map((t) => {
            const y = baseY - (Math.log10(t + 1) / maxLog) * plotH;
            return (
              <g key={t}>
                <line x1={M.left} x2={W - M.right} y1={y} y2={y} className="grid-line" />
                <text x={M.left - 10} y={y + 4} className="axis-text" textAnchor="end">
                  {t >= 1000 ? `${t / 1000}k` : t}
                </text>
              </g>
            );
          })}

          {bins.map((b, i) => {
            const h = (Math.log10(b.count + 1) / maxLog) * plotH;
            const x = M.left + i * band + (band - barW) / 2;
            return (
              <g key={b.label}>
                <rect
                  className="bar"
                  x={x}
                  y={baseY - h}
                  width={barW}
                  height={h}
                  fill={hover === i ? "#7dd3fc" : "rgba(56,189,248,0.74)"}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
                <text
                  x={M.left + i * band + band / 2}
                  y={baseY + 20}
                  className="axis-text axis-text--small"
                  textAnchor="middle"
                >
                  {b.high === 100000 ? `$${b.low / 1000}k+` : b.low >= 1000 ? `${b.low / 1000}k` : `$${b.low}`}
                </text>
              </g>
            );
          })}

          <line x1={medianX} x2={medianX} y1={M.top - 6} y2={baseY} className="mark-line mark-line--accent" />
          <text x={medianX + 8} y={M.top + 4} className="axis-text axis-text--accent">
            median
          </text>
          <line x1={M.left} x2={W - M.right} y1={baseY} y2={baseY} className="axis-line" />
        </svg>

        {hover !== null ? (
          <Tooltip left={((M.left + hover * band + band / 2) / W) * 100}>
            <span className="tip-label">
              {bins[hover].low === 0 ? `Under $${bins[hover].high}` : `$${bins[hover].low}–${bins[hover].high}`}
            </span>
            <span className="tip-value mono">{num(bins[hover].count)}</span>
            <span className="tip-row mono">purchases</span>
            <span className="tip-row mono">{moneyCompact(bins[hover].spend)} of spend</span>
          </Tooltip>
        ) : null}
      </div>
      <p className="chart-foot">
        The most crowded band is $50–$100, holding 17.5% of all swipes — yet it accounts for just 4% of
        dollars. Small swipes dominate the count; large ones dominate the money.
      </p>
    </div>
  );
}
