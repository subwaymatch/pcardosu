import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import { data } from "../data/dataset";
import { money, num, prettyMcc } from "../lib/format";

const top = data.outliers;
const max = Math.max(...top.map((o) => o.amount));
const bigCount = 33;

export default function Outliers() {
  return (
    <Chapter id="outliers" fig="Fig. 08" railTitle="The outliers">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="outliers-title">
              Thirty-three swipes <em>above $5,000</em>.
            </h2>
          </div>
          <p className="lede">
            The extreme end of the file is small enough to read one row at a time. Only {bigCount}{" "}
            transactions clear $5,000, and the fifteen largest are dominated by two things universities
            buy in bulk: hotel rooms for conferences, and equipment. A single elevator service contract at{" "}
            {money(29731.61)} tops the year.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <>
          <div className="table-wrap outlier-table-wrap">
            <table className="table outlier-table">
              <caption>Fifteen largest transactions of 2014</caption>
              <thead>
                <tr>
                  <th className="rank">#</th>
                  <th>Date</th>
                  <th>Cardholder</th>
                  <th>Vendor</th>
                  <th>Merchant category</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {top.map((o, i) => (
                  <tr key={`${o.date}-${o.vendor}-${i}`}>
                    <td className="rank">{String(i + 1).padStart(2, "0")}</td>
                    <td className="num" style={{ textAlign: "left", color: "var(--muted)" }}>
                      {o.date}
                    </td>
                    <td className="who">{o.name}</td>
                    <td>
                      <span className="vendor-cell">
                        {o.vendor}
                        <i style={{ width: `${(o.amount / max) * 100}%` }} />
                      </span>
                    </td>
                    <td className="sub">{prettyMcc(o.mcc)}</td>
                    <td className="num">{money(o.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ol className="outlier-cards">
            {top.map((o, i) => (
              <li key={`${o.date}-${o.vendor}-m${i}`}>
                <div className="outlier-card-top">
                  <span className="mono outlier-card-rank">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mono outlier-card-amount">{money(o.amount)}</span>
                </div>
                <p className="outlier-card-vendor">{o.vendor}</p>
                <p className="mono outlier-card-meta">
                  {o.name} · {o.date}
                </p>
                <p className="outlier-card-cat">{prettyMcc(o.mcc)}</p>
              </li>
            ))}
          </ol>
        </>
      </Reveal>

      <Reveal delay={80}>
        <div className="split">
          <div className="callout">
            <span className="callout-label">Conferences, not chaos</span>
            <p>
              Seven of the fifteen largest rows are hotel folios — Manhattan, Boston, Arlington, Dallas —
              many of them well above typical nightly rates because a single charge covers a room block,
              not a room. Two cardholders account for ten of the fifteen transactions on this list.
            </p>
          </div>
          <div className="callout">
            <span className="callout-label">What is missing</span>
            <p>
              No row in the file exceeds $30,000 and the fifteen largest total{" "}
              {money(top.reduce((a, o) => a + o.amount, 0))} between them. For a program moving $33.5
              million, the tail is orderly: anything above the card limit moves through other channels
              entirely.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <p className="body-copy">
          Read as an audit sample, this list is unremarkable in the best sense: no category, vendor or
          card stands out as structurally anomalous. The largest amounts sit where a university's largest
          routine commitments sit — travel, equipment, and specialized services. The {num(bigCount)} rows
          above $5,000 out of {num(data.kpis.transactions)} account for 1.1% of spend.
        </p>
      </Reveal>
    </Chapter>
  );
}
