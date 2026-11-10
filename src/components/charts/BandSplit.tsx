import { useInView } from "../../lib/hooks";
import { moneyCompact, num } from "../../lib/format";

interface Band {
  label: string;
  count: number;
  spend: number;
  share: number;
}

export default function BandSplit({
  bands,
  purchases,
  gross,
}: {
  bands: Band[];
  purchases: number;
  gross: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const rows = bands.filter((b) => b.spend > 0);
  const share = (v: number) => (v > 0 && v < 0.1 ? "<0.1%" : `${v.toFixed(1)}%`);
  const scale = 72; // shared axis headroom for both series

  return (
    <div className="bandsplit" ref={ref}>
      <div className="chart-head">
        <div>
          <h3 className="chart-title">Where the count is, where the money is</h3>
          <p className="chart-sub">
            Each band's share of all swipes against its share of all dollars · common scale
          </p>
        </div>
        <div className="bandsplit-legend mono">
          <span>
            <i className="key key--accent" /> Swipes
          </span>
          <span>
            <i className="key key--ember" /> Dollars
          </span>
        </div>
      </div>

      <div className="bandsplit-rows">
        {rows.map((b, i) => {
          const countShare = (b.count / purchases) * 100;
          const dollarShare = (b.spend / gross) * 100;
          return (
            <div className="bandsplit-row" key={b.label}>
              <span className="bandsplit-label mono">{b.label}</span>
              <div className="bandsplit-bars">
                <div className="bandsplit-bar">
                  <span
                    className="bandsplit-fill key--accent-bg"
                    style={{
                      width: inView ? `${(countShare / scale) * 100}%` : "0%",
                      transitionDelay: `${i * 70}ms`,
                    }}
                  />
                  <b className="mono">{share(countShare)}</b>
                  <em className="mono">{num(b.count)} swipes</em>
                </div>
                <div className="bandsplit-bar">
                  <span
                    className="bandsplit-fill key--ember-bg"
                    style={{
                      width: inView ? `${(dollarShare / scale) * 100}%` : "0%",
                      transitionDelay: `${i * 70 + 90}ms`,
                    }}
                  />
                  <b className="mono">{share(dollarShare)}</b>
                  <em className="mono">{moneyCompact(b.spend)}</em>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="chart-foot">
        Swipes under $100 are 49% of all transactions but only 7% of dollars. The 6.7% of transactions
        above $1,000 carry 45% of the money.
      </p>
    </div>
  );
}
