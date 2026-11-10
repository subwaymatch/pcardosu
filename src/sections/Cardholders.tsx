import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import ParetoChart from "../components/charts/ParetoChart";
import Heatmap from "../components/charts/Heatmap";
import { data } from "../data/dataset";
import { money, num, pct } from "../lib/format";

const c = data.concentration;

export default function Cardholders() {
  const top = data.cardholders.slice(0, 10);

  return (
    <Chapter id="cardholders" fig="Fig. 04" railTitle="Who holds the cards">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="cardholders-title">
              Two thousand cards, and a <em>steep ladder</em>.
            </h2>
          </div>
          <p className="lede">
            2,009 people hold a purchase card. Half of them will never spend more than $5,960 in a year;
            the busiest card runs {num(c.topSpenderCount)} transactions and {money(c.topSpenderSpend)}.
            The distribution of spending is not gentle — it is a long ramp with a short, bright head.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <ParetoChart pareto={data.pareto} />
      </Reveal>

      <Reveal delay={80}>
        <div className="mini-stats">
          <div className="mini-stat">
            <span>Top 10 cards</span>
            <b>{pct(c.top10Pct)}</b>
          </div>
          <div className="mini-stat">
            <span>Top 10% of cards</span>
            <b>{pct(c.top10pctOfPeopleShare)}</b>
          </div>
          <div className="mini-stat">
            <span>Median card</span>
            <b>{money(c.medianCardholderSpend)}</b>
          </div>
          <div className="mini-stat">
            <span>Under $10k spent</span>
            <b>{num(c.cardholdersUnder10k)}</b>
          </div>
          <div className="mini-stat">
            <span>Under $1k spent</span>
            <b>{num(c.cardholdersUnder1k)}</b>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <Heatmap names={data.heatmap.names} months={data.heatmap.months} values={data.heatmap.values} />
      </Reveal>

      <Reveal delay={80}>
        <div className="split split--wide-left">
          <div className="table-wrap">
            <table className="table">
              <caption>Ten largest cardholders by net spend</caption>
              <thead>
                <tr>
                  <th className="rank">#</th>
                  <th>Cardholder</th>
                  <th style={{ textAlign: "right" }}>Net spend</th>
                  <th style={{ textAlign: "right" }}>Swipes</th>
                  <th style={{ textAlign: "right" }}>Avg swipe</th>
                  <th style={{ textAlign: "right" }}>Share</th>
                </tr>
              </thead>
              <tbody>
                {top.map((h, i) => (
                  <tr key={h.name}>
                    <td className="rank">{String(i + 1).padStart(2, "0")}</td>
                    <td className="who">{h.name}</td>
                    <td className="num">{money(h.spend)}</td>
                    <td className="num">{num(h.count)}</td>
                    <td className="num">{money(h.avgTicket, 0)}</td>
                    <td className="num">{pct(h.share * 100, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stack">
            <div className="aside-fact">
              <b>{num(c.topSpenderCount)}</b>
              Swipes on the single busiest card — nearly ten transactions for every weekday of the year.
              Its {money(c.topSpenderSpend)} is 4.8% of all program spending on its own.
            </div>
            <div className="callout">
              <span className="callout-label">Reading the ladder</span>
              <p>
                The top 10% of cardholders carry more than half the dollars, but they are not
                necessarily spending more freely: their average swipe is often close to the program
                median. Volume, not extravagance, separates the top of this distribution from the
                bottom.
              </p>
            </div>
            <p className="body-copy">
              Cardholder identifiers are abbreviated name tokens as published in the extract
              ("hines, g"). They are shown here without further masking to keep the published record
              traceable; no attempt is made to attach them to individuals, departments or job titles.
            </p>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
