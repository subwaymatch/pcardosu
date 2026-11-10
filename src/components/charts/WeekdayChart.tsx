import { useState } from "react";
import { useInView } from "../../lib/hooks";
import { money, moneyCompact, num } from "../../lib/format";

interface Props {
  weekday: { day: string; spend: number; count: number }[];
}

export default function WeekdayChart({ weekday: days }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...days.map((d) => d.spend));
  const total = days.reduce((a, d) => a + d.spend, 0);

  return (
    <div className="week-chart" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">By day of week</h3>
          <p className="chart-sub">Share of net spend · Monday to Sunday</p>
        </div>
        <span className="mono chart-badge">Weekend · {(100 * (days[5].spend + days[6].spend) / total).toFixed(1)}%</span>
      </div>

      <div className="week-bars">
        {days.map((d, i) => {
          const h = (d.spend / max) * 100;
          const isHover = hover === d.day;
          return (
            <div
              key={d.day}
              className={`week-col ${isHover ? "is-hover" : ""}`}
              onMouseEnter={() => setHover(d.day)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="week-val mono">{isHover ? moneyCompact(d.spend) : ""}</span>
              <div className="week-track">
                <i
                  style={{
                    height: inView ? `${h}%` : "0%",
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
              </div>
              <span className="week-day mono">{d.day}</span>
            </div>
          );
        })}
      </div>
      <p className="chart-foot">
        Wednesday carries the heaviest load at {money(days[2].spend)} across {num(days[2].count)} swipes.
        Saturdays and Sundays together account for just 6.5% of annual dollars.
      </p>
    </div>
  );
}
