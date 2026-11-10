import { useState } from "react";
import { useInView } from "../../lib/hooks";
import { money, moneyCompact, num, pct } from "../../lib/format";

export interface RankedRow {
  label: string;
  value: number;
  share: number;
  meta?: string;
}

interface Props {
  rows: RankedRow[];
  denominator: number;
  mode?: "spend" | "count";
  onModeChange?: () => void;
  modeLabel?: [string, string];
}

export default function RankedBars({
  rows,
  denominator,
  mode = "spend",
  onModeChange,
  modeLabel = ["Dollars", "Swipes"],
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hover, setHover] = useState<number | null>(null);
  const top = Math.max(...rows.map((r) => r.value));

  return (
    <div className="ranked" ref={ref}>
      <div className="ranked-head mono">
        <span />
        <span>Merchant</span>
        <span />
        <span className="ranked-num-h">{mode === "spend" ? "Net spend" : "Swipes"}</span>
        <span className="ranked-share-h">Share</span>
        {onModeChange ? (
          <button type="button" className="ranked-toggle" onClick={onModeChange}>
            {mode === "spend" ? modeLabel[1] : modeLabel[0]} view →
          </button>
        ) : (
          <span />
        )}
      </div>

      {rows.map((r, i) => {
        const width = (r.value / top) * 100;
        const isHover = hover === i;
        return (
          <div
            key={r.label}
            className={`ranked-row ${isHover ? "is-hover" : ""}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="ranked-rank mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="ranked-name">
              {r.label}
              {r.meta ? <em className="ranked-meta">{r.meta}</em> : null}
            </span>
            <span className="ranked-track">
              <i
                style={{
                  width: inView ? `${Math.max(width, 1.2)}%` : "0%",
                  transitionDelay: `${i * 45}ms`,
                }}
              />
            </span>
            <span className="ranked-value mono">{mode === "spend" ? money(r.value) : num(r.value)}</span>
            <span className="ranked-share mono">{pct(r.share * 100)}</span>
            <span />
          </div>
        );
      })}

      <div className="ranked-foot mono">
        <span>Ranked by {mode === "spend" ? "net spend" : "transaction count"}</span>
        <span>Basis · {moneyCompact(denominator)}</span>
      </div>
    </div>
  );
}
