import { useMemo, useState } from "react";
import { useInView } from "../../lib/hooks";
import { pct } from "../../lib/format";
import Tooltip from "./Tooltip";

interface Point {
  rank: number;
  pctOfCardholders: number;
  cumShare: number;
}

const W = 900;
const H = 380;
const M = { top: 34, right: 26, bottom: 48, left: 56 };

const MARKERS = [
  { rank: 10, label: "10 cards", note: "17.0%" },
  { rank: 100, label: "100 cards", note: "42.2%" },
  { rank: 152, label: "152 cards", note: "50.0%" },
  { rank: 201, label: "top 10%", note: "56.0%" },
];

export default function ParetoChart({ pareto }: { pareto: Point[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [hover, setHover] = useState<number | null>(null);

  const plotW = W - M.left - M.right;
  const plotH = H - M.top - M.bottom;
  const lo = 0.04;
  const hi = 100;
  const lx = (p: number) =>
    M.left +
    ((Math.log10(Math.max(p, lo)) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * plotW;
  const ly = (v: number) => M.top + plotH - (v / 100) * plotH;

  const points = useMemo(
    () => pareto.filter((p) => p.pctOfCardholders >= lo).sort((a, b) => a.rank - b.rank),
    [pareto],
  );

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${lx(p.pctOfCardholders).toFixed(2)},${ly(p.cumShare).toFixed(2)}`)
    .join(" ");
  const area = `${line} L${lx(points[points.length - 1].pctOfCardholders)},${M.top + plotH} L${lx(
    points[0].pctOfCardholders,
  )},${M.top + plotH} Z`;

  const xTicks = [0.1, 0.5, 1, 5, 10, 50, 100];

  const nearest = (clientX: number, target: SVGSVGElement) => {
    const rect = target.getBoundingClientRect();
    const xv = ((clientX - rect.left) / rect.width) * W;
    let best = 0;
    let bestDist = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(lx(p.pctOfCardholders) - xv);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };

  const hoverPoint = hover !== null ? points[hover] : null;

  return (
    <div className="chart" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Cardholders, ranked by dollars</h3>
          <p className="chart-sub">Cumulative share of spend · log scale across people</p>
        </div>
        <span className="mono chart-badge">2,009 cards</span>
      </div>

      <div className="chart-canvas">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={inView ? "is-in" : ""}
          role="img"
          aria-label="Cumulative spend share by cardholder rank"
          onMouseMove={(e) => setHover(nearest(e.clientX, e.currentTarget))}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="paretoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 25, 50, 75, 100].map((t) => (
            <g key={t}>
              <line x1={M.left} x2={W - M.right} y1={ly(t)} y2={ly(t)} className="grid-line" />
              <text x={M.left - 12} y={ly(t) + 4} className="axis-text" textAnchor="end">
                {t}%
              </text>
            </g>
          ))}

          <line x1={lx(lo)} y1={ly(0)} x2={lx(hi)} y2={ly(100)} className="equality-line" />
          <text x={lx(30)} y={ly(30) + 18} className="axis-text axis-text--dim" textAnchor="middle">
            if spending were equal
          </text>

          <path d={area} fill="url(#paretoFill)" className="area-fade" />
          <path
            d={line}
            className="pareto-line"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: inView ? 0 : 1 }}
          />

          {MARKERS.map((m) => {
            const p = points.find((pt) => pt.rank === m.rank);
            if (!p) return null;
            return (
              <g key={m.rank}>
                <line
                  x1={lx(p.pctOfCardholders)}
                  x2={lx(p.pctOfCardholders)}
                  y1={ly(p.cumShare)}
                  y2={M.top + plotH}
                  className="mark-line"
                />
                <circle cx={lx(p.pctOfCardholders)} cy={ly(p.cumShare)} r={4} className="pareto-dot" />
              </g>
            );
          })}

          {xTicks.map((t) => (
            <text key={t} x={lx(t)} y={M.top + plotH + 24} className="axis-text" textAnchor="middle">
              {t}%
            </text>
          ))}
          <text x={M.left + plotW / 2} y={H - 6} className="axis-text axis-text--dim" textAnchor="middle">
            share of cardholders, smallest to largest
          </text>

          <line x1={M.left} x2={W - M.right} y1={M.top + plotH} y2={M.top + plotH} className="axis-line" />

          {hoverPoint ? (
            <circle
              cx={lx(hoverPoint.pctOfCardholders)}
              cy={ly(hoverPoint.cumShare)}
              r={5}
              className="pareto-dot pareto-dot--live"
            />
          ) : null}
        </svg>

        {hoverPoint ? (
          <Tooltip left={(lx(hoverPoint.pctOfCardholders) / W) * 100}>
            <span className="tip-label">
              Rank {hoverPoint.rank} of 2,009 · {hoverPoint.pctOfCardholders}% of cards
            </span>
            <span className="tip-value mono">{pct(hoverPoint.cumShare)}</span>
            <span className="tip-row mono">of all card dollars</span>
          </Tooltip>
        ) : null}
      </div>

      <div className="pareto-notes">
        {MARKERS.map((m) => (
          <div className="pareto-note" key={m.rank}>
            <span className="mono">{m.label}</span>
            <b className="mono">{m.note}</b>
            <em>of all card spend</em>
          </div>
        ))}
      </div>

      <p className="chart-foot">
        Ten cardholders account for 17% of the year's dollars. Half of all card spend sits with just 152
        cards — 7.6% of the 2,009 people holding one.
      </p>
    </div>
  );
}
