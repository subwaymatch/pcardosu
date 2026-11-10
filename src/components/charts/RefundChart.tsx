import { useState } from "react";
import { useInView } from "../../lib/hooks";
import { money, moneyCompact, num } from "../../lib/format";
import Tooltip from "./Tooltip";

interface Month {
  label: string;
  amount: number;
  count: number;
}

const W = 900;
const H = 260;
const M = { top: 22, right: 18, bottom: 34, left: 56 };

export default function RefundChart({ months }: { months: Month[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [hover, setHover] = useState<number | null>(null);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const max = Math.max(...months.map((m) => Math.abs(m.amount))) * 1.18;
  const band = plotW / months.length;
  const barW = band * 0.5;
  const zeroY = M.top + 14;

  return (
    <div className="chart" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Refunds by month</h3>
          <p className="chart-sub">Credits that reduced net spend · 2014</p>
        </div>
        <span className="mono chart-badge">−$629,445</span>
      </div>

      <div className="chart-canvas">
        <svg viewBox={`0 0 ${W} ${H}`} className={inView ? "is-in" : ""} role="img" aria-label="Monthly refunds">
          <text x={M.left - 10} y={zeroY + 4} className="axis-text" textAnchor="end">
            $0
          </text>
          {[0.5, 1].map((f) => (
            <g key={f}>
              <line x1={M.left} x2={W - M.right} y1={zeroY + f * (plotH - 14)} y2={zeroY + f * (plotH - 14)} className="grid-line" />
              <text x={M.left - 10} y={zeroY + f * (plotH - 14) + 4} className="axis-text" textAnchor="end">
                {moneyCompact(-max * f)}
              </text>
            </g>
          ))}

          {months.map((m, i) => {
            const h = (Math.abs(m.amount) / max) * (plotH - 14);
            const x = M.left + i * band + (band - barW) / 2;
            return (
              <g key={m.label}>
                <rect
                  className="bar bar--down"
                  x={x}
                  y={zeroY}
                  width={barW}
                  height={h}
                  fill={hover === i ? "#ffb27a" : "rgba(255,159,90,0.8)"}
                  style={{ transitionDelay: `${i * 40}ms`, transformOrigin: `center ${zeroY}px` }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
                <text
                  x={M.left + i * band + band / 2}
                  y={H - 12}
                  className="axis-text axis-text--small"
                  textAnchor="middle"
                >
                  {m.label}
                </text>
              </g>
            );
          })}
          <line x1={M.left} x2={W - M.right} y1={zeroY} y2={zeroY} className="axis-line" />
        </svg>

        {hover !== null ? (
          <Tooltip left={((M.left + hover * band + band / 2) / W) * 100}>
            <span className="tip-label">{months[hover].label} 2014</span>
            <span className="tip-value mono">{money(months[hover].amount)}</span>
            <span className="tip-row mono">{num(months[hover].count)} refunds</span>
          </Tooltip>
        ) : null}
      </div>
      <p className="chart-foot">
        Refund volume is remarkably steady — roughly $35k to $63k every month — with April the heaviest
        and September the lightest.
      </p>
    </div>
  );
}
