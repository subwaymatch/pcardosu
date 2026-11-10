import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import RankedBars, { type RankedRow } from "../components/charts/RankedBars";
import { data } from "../data/dataset";
import { money, moneyCompact, num, pct } from "../lib/format";

const vc = data.vendorConcentration;
const k = data.kpis;

const shortVendor = (v: string) => {
  const s = v.replace(/\s+/g, " ").trim();
  return s.length > 30 ? `${s.slice(0, 29)}…` : s;
};

export default function Vendors() {
  const rows: RankedRow[] = data.vendors.slice(0, 12).map((v) => ({
    label: shortVendor(v.name),
    value: v.spend,
    share: v.share,
    meta: `${num(v.count)} swipes`,
  }));

  const amazon = data.vendors
    .filter((v) => v.name.startsWith("amazon"))
    .reduce((a, v) => a + v.spend, 0);

  return (
    <Chapter id="vendors" fig="Fig. 05" railTitle="Where the money goes">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="vendors-title">
              Seventeen thousand merchants, <em>most of them once</em>.
            </h2>
          </div>
          <p className="lede">
            The program's vendor list is enormous and thin. {num(vc.singleTxn)} merchants —{" "}
            {pct((vc.singleTxn / vc.total) * 100)} of all vendors — appear exactly once. At the other
            end, a few supply relationships absorb a disproportionate share of the year, and they are
            almost entirely ordinary: office supplies, lab reagents, hardware, printing.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <RankedBars rows={rows} denominator={k.netSpend} mode="spend" />
      </Reveal>

      <Reveal delay={80}>
        <div className="split">
          <div className="stack">
            <div className="callout">
              <span className="callout-label">The long tail is real</span>
              <p>
                {num(vc.singleTxn)} single-transaction vendors still account for{" "}
                <strong>{pct(vc.singleTxnShare)}</strong> of net spend —{" "}
                {moneyCompact(data.vendorBuckets[0].spend)} spread across thousands of one-off suppliers,
                at a median of {money(vc.medianVendorSpend)} per single-swipe vendor. Meanwhile the top
                100 vendors hold {pct(vc.top100Pct)} of the dollars.
              </p>
            </div>
            <div className="callout">
              <span className="callout-label">Amazon, split in two</span>
              <p>
                No vendor dominates: the largest single merchant, Amazon, reaches just 1.3% of spending.
                Combine its two merchant identifiers — <em>amazon.com</em> and{" "}
                <em>amazon mktplace pmts</em> — and the pair reaches <strong>{money(amazon)}</strong>, or{" "}
                {pct((amazon / k.netSpend) * 100)} of the year. Vendor strings are unnormalized, so even
                this figure is a floor.
              </p>
            </div>
          </div>

          <div className="stack">
            <div className="mini-stats">
              <div className="mini-stat">
                <span>Vendors</span>
                <b>{num(vc.total)}</b>
              </div>
              <div className="mini-stat">
                <span>Median vendor</span>
                <b>{money(vc.medianVendorSpend)}</b>
              </div>
              <div className="mini-stat">
                <span>Top 10 share</span>
                <b>{pct(vc.top10Pct)}</b>
              </div>
              <div className="mini-stat">
                <span>Single-swipe</span>
                <b>{pct((vc.singleTxn / vc.total) * 100)}</b>
              </div>
            </div>
            <div className="table-wrap">
              <table className="table">
                <caption>Vendors grouped by transaction frequency</caption>
                <thead>
                  <tr>
                    <th>Swipes per vendor</th>
                    <th style={{ textAlign: "right" }}>Vendors</th>
                    <th style={{ textAlign: "right" }}>Spend</th>
                    <th style={{ textAlign: "right" }}>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {data.vendorBuckets.map((b) => (
                    <tr key={b.label}>
                      <td className="who">{b.label}</td>
                      <td className="num">{num(b.vendors)}</td>
                      <td className="num">{moneyCompact(b.spend)}</td>
                      <td className="num">{pct((b.spend / k.netSpend) * 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
