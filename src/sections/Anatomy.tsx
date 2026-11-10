import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import Histogram from "../components/charts/Histogram";
import BandSplit from "../components/charts/BandSplit";
import { data } from "../data/dataset";
import { money, moneyCompact, num, pct } from "../lib/format";

const k = data.kpis;

export default function Anatomy() {
  return (
    <Chapter id="anatomy" fig="Fig. 06" railTitle="Anatomy of a swipe">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="anatomy-title">
              The average swipe is $289. The <em>typical</em> one is $100.
            </h2>
          </div>
          <p className="lede">
            Averages mislead here. Half of all transactions are below {money(k.medianTicket, 2)} — a
            textbook, a box of gloves, a working lunch — while a thin band of large purchases pushes the
            mean up to {money(k.meanTicket, 2)}. The 1,160 largest transactions, just 1% of the file,
            account for {pct(k.top1pctTxnShare * 100)} of the dollars.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <Histogram bins={data.histogram} median={k.medianTicket} />
      </Reveal>

      <Reveal delay={80}>
        <div className="stack">
          <div className="mini-stats">
            {data.percentiles.map((p) => (
              <div className="mini-stat" key={p.p}>
                <span>P{p.p}</span>
                <b>{money(p.value, p.value < 1000 ? 2 : 0)}</b>
              </div>
            ))}
          </div>
          <BandSplit bands={data.bands} purchases={k.purchases} gross={k.grossSpend} />
        </div>
      </Reveal>

      <Reveal delay={90}>
        <p className="body-copy">
          The distribution has a hard practical ceiling: {num(data.bands[4].count + data.bands[5].count)}{" "}
          transactions above $2,500, and only {num(data.bands[5].count)} above $5,000. Above that line,
          purchases are no longer routine consumption — they are equipment, contracted services, or
          travel booked in bulk. {moneyCompact(data.bands[5].spend)} of spending sits in that top slice.
        </p>
      </Reveal>
    </Chapter>
  );
}
