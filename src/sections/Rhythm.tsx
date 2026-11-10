import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import MonthlyChart from "../components/charts/MonthlyChart";
import WeekdayChart from "../components/charts/WeekdayChart";
import { data } from "../data/dataset";
import { longDate, money, moneyCompact, num, pct } from "../lib/format";

const k = data.kpis;
const apr = data.monthly[3];
const dec = data.monthly[11];
const novDec = data.monthly[10].spend + data.monthly[11].spend;

export default function Rhythm() {
  return (
    <Chapter id="rhythm" fig="Fig. 02" railTitle="Spending rhythm across the year">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="rhythm-title">
              The year breathes with the <em>academic calendar</em>.
            </h2>
          </div>
          <p className="lede">
            Monthly spending sits in a narrow band for most of 2014 — then falls away sharply in the
            final two months. There is no June 30 spike, no fiscal-year-end scramble. What the series
            tracks instead is the rhythm of a campus: spring purchasing, a summer plateau, and a
            December wind-down.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <MonthlyChart monthly={data.monthly} />
      </Reveal>

      <Reveal delay={80}>
        <div className="split">
          <WeekdayChart weekday={data.weekday} />

          <div className="stack">
            <div className="callout">
              <span className="callout-label">Peak and trough</span>
              <p>
                April is the strongest month at <strong>{money(apr.spend)}</strong> across{" "}
                {num(apr.count)} swipes. December is the weakest at {money(dec.spend)} — a{" "}
                {pct(((apr.spend - dec.spend) / apr.spend) * 100)} drop from the April peak.
                November and December together hold {pct((novDec / k.netSpend) * 100)} of annual
                spending while representing 16.7% of the calendar.
              </p>
            </div>
            <div className="callout">
              <span className="callout-label">One loud day</span>
              <p>
                The busiest day of the year is {longDate(k.busiestDay)} at{" "}
                <strong>{money(k.busiestDayAmount)}</strong>, more than double the daily average. It is
                not a campus-wide surge: a handful of large lodging and conference bookings on that date
                carry the total.
              </p>
            </div>
            <div className="mini-stats">
              <div className="mini-stat">
                <span>Apr peak</span>
                <b>{moneyCompact(apr.spend)}</b>
              </div>
              <div className="mini-stat">
                <span>Dec trough</span>
                <b>{moneyCompact(dec.spend)}</b>
              </div>
              <div className="mini-stat">
                <span>Weekend share</span>
                <b>6.5%</b>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
