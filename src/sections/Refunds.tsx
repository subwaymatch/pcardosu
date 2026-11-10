import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import RefundChart from "../components/charts/RefundChart";
import { data } from "../data/dataset";
import { money, num, pct, prettyMcc } from "../lib/format";

const r = data.refundStats;
const k = data.kpis;
const maxDriver = Math.max(...data.refundDrivers.map((d) => Math.abs(d.amount)));

export default function Refunds() {
  return (
    <Chapter id="refunds" fig="Fig. 07" railTitle="Refunds and reversals">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="refunds-title">
              Three thousand seven hundred credits, <em>all but invisible</em>.
            </h2>
          </div>
          <p className="lede">
            {pct(r.rate)} of the file — {num(r.count)} rows — carries a negative amount. Totaled, they
            subtract {money(Math.abs(r.total))} from gross spending, or {pct(Math.abs(r.grossOffset))} of
            gross. These are not reversals of specific large purchases; the median credit is{" "}
            {money(Math.abs(r.median), 2)}, small enough to be a returned item or a corrected charge.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <RefundChart months={data.refundMonthly} />
      </Reveal>

      <Reveal delay={70}>
        <div className="split">
          <div className="stack">
            <div className="mini-stats">
              <div className="mini-stat">
                <span>Net effect</span>
                <b>−{money(Math.abs(r.total))}</b>
              </div>
              <div className="mini-stat">
                <span>Share of gross</span>
                <b>−{pct(Math.abs(r.grossOffset), 2)}</b>
              </div>
              <div className="mini-stat">
                <span>Median credit</span>
                <b>−{money(Math.abs(r.median), 2)}</b>
              </div>
              <div className="mini-stat">
                <span>Largest credit</span>
                <b>−{money(Math.abs(r.largest))}</b>
              </div>
            </div>
            <div className="drivers">
              <span className="card-label">Deepest refund categories</span>
              {data.refundDrivers.map((d) => (
                <div className="driver" key={d.name}>
                  <span>{prettyMcc(d.name)}</span>
                  <span className="mono" style={{ textAlign: "right", color: "var(--ember)" }}>
                    {money(d.amount)}
                  </span>
                  <div className="driver-track">
                    <i style={{ width: `${(Math.abs(d.amount) / maxDriver) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stack">
            <div className="callout">
              <span className="callout-label">Steady, not seasonal</span>
              <p>
                Refunds arrive at $35k to $63k a month with no meaningful seasonal spike — the flattest
                series in this analysis. Whatever drives returns in a university purchasing system, it
                is tied to routine procurement rather than the academic calendar.
              </p>
            </div>
            <div className="callout">
              <span className="callout-label">A reporting limit</span>
              <p>
                Credits are separate rows, not linked to the purchase that generated them. Their effect
                on net spend is exact at the program level, but no attempt can be made here to net
                individual refunds against specific transactions. Gross figures are provided throughout
                for that reason.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <p className="body-copy">
          The program's net figure of {money(k.netSpend)} is therefore a sum of {num(k.purchases)} debits
          and {num(k.refundCount)} credits, with the credits concentrated in the same categories that
          produce the largest purchases: medical and lab equipment, industrial supplies, electrical
          parts.
        </p>
      </Reveal>
    </Chapter>
  );
}
