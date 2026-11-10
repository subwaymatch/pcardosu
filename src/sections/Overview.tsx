import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import Stat from "../components/Stat";
import { data } from "../data/dataset";
import { money, moneyCompact, num, pct } from "../lib/format";

const k = data.kpis;

export default function Overview() {
  return (
    <Chapter id="overview" fig="Fig. 01" railTitle="The year at a glance">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="overview-title">
              Thirty-three million dollars, spent in <em>116,031 increments</em>.
            </h2>
          </div>
          <p className="lede">
            The university's purchase card is the smallest unit of institutional buying: a single
            swipe, a single receipt. Added up across a year they become a portrait of how a large
            public university actually operates — from a five-dollar box of lab gloves to a{" "}
            {money(29731.61)} elevator service contract.
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="stat-grid">
          <Stat
            label="Net spend"
            value={k.netSpend}
            format={(v) => money(v)}
            note={`Gross ${moneyCompact(k.grossSpend)} less ${moneyCompact(Math.abs(k.refunds))} in refunds`}
            accent
            size="lg"
          />
          <Stat
            label="Transactions"
            value={k.transactions}
            format={(v) => num(Math.round(v))}
            note="Roughly 318 swipes on an average day"
          />
          <Stat
            label="Cardholders"
            value={k.cardholders}
            format={(v) => num(Math.round(v))}
            note="Median annual spend of $5,960 per card"
          />
          <Stat
            label="Vendors"
            value={k.vendors}
            format={(v) => num(Math.round(v))}
            note="60% of them appear exactly once"
          />
          <Stat
            label="Median swipe"
            value={k.medianTicket}
            format={(v) => money(v, 2)}
            note={`Mean of ${money(k.meanTicket, 2)} pulled up by the tail`}
          />
          <Stat
            label="Merchant categories"
            value={k.categories}
            format={(v) => num(Math.round(v))}
            note="Largest holds just 7.4% of spend"
          />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="takeaways">
          <div className="takeaway">
            <span className="takeaway-index">01</span>
            <h3>A flat portfolio, not a few big buckets</h3>
            <p>
              Across 350 merchant categories, none exceeds 7.4% of spending. The 332 smallest
              categories together account for {pct((data.categoryTotals.tailSpend / k.netSpend) * 100)} of
              the dollars.
            </p>
          </div>
          <div className="takeaway">
            <span className="takeaway-index">02</span>
            <h3>Concentration hides in the cards</h3>
            <p>
              Ten of the 2,009 cards carry {pct(data.concentration.top10Pct)} of all spending; the top
              tenth of cardholders carry {pct(data.concentration.top10pctOfPeopleShare)}.
            </p>
          </div>
          <div className="takeaway">
            <span className="takeaway-index">03</span>
            <h3>Small swipes, large money</h3>
            <p>
              Purchases under $100 are 49% of all swipes but 7% of the dollars. The 6.7% above $1,000
              carry 45%.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="split split--wide-left">
          <div className="ledger">
            <div className="ledger-row">
              <span>Gross purchases · 112,240 rows</span>
              <b>{money(k.grossSpend)}</b>
            </div>
            <div className="ledger-row">
              <span>Refunds and credits · 3,791 rows</span>
              <b>−{money(Math.abs(k.refunds))}</b>
            </div>
            <div className="ledger-row">
              <span>Transactions · 116,031 rows</span>
              <b>{money(k.netSpend)}</b>
            </div>
            <div className="ledger-row ledger-row--total">
              <span>Net spend · 2014</span>
              <b>{money(k.netSpend)}</b>
            </div>
          </div>

          <div className="stack">
            <div className="aside-fact">
              <b>{money(k.avgDailySpend)}</b>
              Average net spend per calendar day, including weekends, holidays and the quiet weeks
              between semesters.
            </div>
            <div className="aside-fact">
              <b>{num(k.purchases)} / {num(k.refundCount)}</b>
              Purchases versus refunds. For every 30 swipes the program records, one comes back as a
              credit.
            </div>
            <div className="aside-fact">
              <b>{money(16677)}</b>
              Average annual spend per cardholder — about {money(1390)} a month, though that average is
              a poor description of any single card.
            </div>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
