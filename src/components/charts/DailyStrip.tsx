import { useInView } from "../../lib/hooks";
import { dateLabel, money, moneyCompact } from "../../lib/format";

interface Props {
  daily: { date: string; spend: number; count: number }[];
  height?: number;
  showAxis?: boolean;
  interactive?: boolean;
}

const W = 1000;
const MONTH_STARTS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export default function DailyStrip({ daily, height = 120, showAxis = true, interactive = false }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const max = Math.max(...daily.map((d) => d.spend));
  const min = Math.min(0, ...daily.map((d) => d.spend));
  const span = max - min;
  const gap = 0.9;
  const barW = W / daily.length - gap;
  const peakIndex = daily.reduce((best, d, i) => (d.spend > daily[best].spend ? i : best), 0);
  const plotH = height - (showAxis ? 18 : 0);
  const zeroY = plotH - ((0 - min) / span) * plotH;

  return (
    <div className={`strip ${interactive ? "strip--interactive" : ""}`} ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Daily net spend across 2014"
        style={{ height }}
      >
        {showAxis
          ? MONTH_STARTS.map((m) => {
              const idx = daily.findIndex((d) => d.date.slice(5, 7) === m);
              const x = (idx / daily.length) * W;
              return (
                <line
                  key={m}
                  x1={x}
                  x2={x}
                  y1={0}
                  y2={plotH}
                  stroke="rgba(255,255,255,0.07)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })
          : null}

        {daily.map((d, i) => {
          const h = Math.max(((d.spend - Math.max(min, 0)) / span) * plotH, 1.2);
          const isPeak = i === peakIndex;
          return (
            <rect
              key={d.date}
              className="strip-bar"
              x={i * (barW + gap)}
              y={d.spend >= 0 ? zeroY - h : zeroY}
              width={barW}
              height={h}
              fill={isPeak ? "#38bdf8" : "rgba(56,189,248,0.5)"}
              style={{
                transformOrigin: `${i * (barW + gap) + barW / 2}px ${zeroY}px`,
                transitionDelay: `${Math.min(i * 1.1, 420)}ms`,
                transform: inView ? "scaleY(1)" : "scaleY(0)",
              }}
            >
              {interactive ? <title>{`${d.date} · ${money(d.spend)}`}</title> : null}
            </rect>
          );
        })}
      </svg>

      {showAxis ? (
        <div className="strip-axis mono" aria-hidden="true">
          {MONTH_LABELS.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      ) : null}

      <div className="strip-caption mono">
        <span>Daily net spend · 365 days</span>
        <span>
          Peak {dateLabel(daily[peakIndex].date)} · {moneyCompact(daily[peakIndex].spend)}
        </span>
      </div>
    </div>
  );
}
