import { useState } from "react";
import { useInView } from "../../lib/hooks";
import { money, moneyCompact } from "../../lib/format";

interface Props {
  names: string[];
  months: string[];
  values: number[][];
}

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

export default function Heatmap({ names, months, values }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const [cell, setCell] = useState<{ row: number; col: number } | null>(null);
  const max = Math.max(...values.flat().filter((v) => v > 0));

  const color = (v: number) => {
    if (v < 0) return `rgba(242,112,127,${Math.min(0.16 + (Math.abs(v) / max) * 0.5, 0.7)})`;
    if (v === 0) return "rgba(255,255,255,0.045)";
    const t = Math.pow(v / max, 0.62);
    return `rgb(${lerp(14, 56, t)},${lerp(26, 189, t)},${lerp(40, 248, t)})`;
  };

  const readout = cell
    ? `${names[cell.row]} · ${months[cell.col]} · ${money(values[cell.row][cell.col])}`
    : "Hover a cell to inspect a cardholder-month";

  return (
    <div className="heat-block" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Top nine cards, month by month</h3>
          <p className="chart-sub">Net spend per cardholder · darker cells mean quieter months</p>
        </div>
        <div className="heat-scale mono" aria-hidden="true">
          <span>$0</span>
          <i />
          <span>{moneyCompact(max)}</span>
        </div>
      </div>

      <div className="heat" style={{ gridTemplateColumns: `minmax(88px, 128px) repeat(${months.length}, minmax(0, 1fr))` }}>
        <span />
        {months.map((m) => (
          <span key={m} className="heat-month mono">
            {m}
          </span>
        ))}

        {names.map((n, r) => (
          <div key={n} className="heat-row">
            <span className="heat-name mono">{n}</span>
            {months.map((m, c) => (
              <span
                key={`${n}-${m}`}
                className={`heat-cell ${inView ? "is-in" : ""} ${
                  cell && cell.row === r && cell.col === c ? "is-active" : ""
                }`}
                style={{
                  background: inView ? color(values[r][c]) : "rgba(255,255,255,0.03)",
                  transitionDelay: `${(r * 12 + c) * 8}ms`,
                }}
                onMouseEnter={() => setCell({ row: r, col: c })}
                onMouseLeave={() => setCell(null)}
                title={`${n} · ${m} · ${money(values[r][c])}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="heat-readout mono">{readout}</div>
      <p className="chart-foot">
        Cards do not switch on and off arbitrarily: purchases cluster around department purchasing
        cycles and summer conference season, then drop after June for some and after November for others.
      </p>
    </div>
  );
}
