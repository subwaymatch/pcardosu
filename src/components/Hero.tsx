import { data } from "../data/dataset";
import { site } from "../site";
import { useCountUp, useInView } from "../lib/hooks";
import { num } from "../lib/format";
import DailyStrip from "./charts/DailyStrip";

export default function Hero() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.05 });
  const spend = useCountUp(data.kpis.netSpend, inView, 1900);
  const txns = useCountUp(data.kpis.transactions, inView, 1600);
  const people = useCountUp(data.kpis.cardholders, inView, 1500);
  const vendors = useCountUp(data.kpis.vendors, inView, 1700);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="shell">
        <div className="hero-top">
          <span className="eyebrow">{site.short} purchase card program · Fiscal year 2014</span>
          <span className="hero-stamp mono">Source · {site.dataset}</span>
        </div>

        <h1 className="hero-title display">
          One year of campus purchasing,
          <br />
          <em>down to the last swipe.</em>
        </h1>

        <p className="lede hero-lede">
          Every purchase made on a university card in 2014 — {num(data.kpis.transactions)} rows —
          sorted, measured, and mapped. What follows is the shape of a year of institutional buying:
          where the money went, who spent it, and what the pattern says about how a large public
          university actually buys things.
        </p>

        <div className="hero-figure">
          <div className="hero-figure-main">
            <span className="hero-figure-label mono">Net spend · 2014</span>
            <div className="hero-amount mono">
              <span className="currency">$</span>
              {Math.round(spend).toLocaleString("en-US")}
            </div>
          </div>
          <dl className="hero-micro">
            <div>
              <dt>Transactions</dt>
              <dd className="mono">{num(Math.round(txns))}</dd>
            </div>
            <div>
              <dt>Cardholders</dt>
              <dd className="mono">{num(Math.round(people))}</dd>
            </div>
            <div>
              <dt>Vendors</dt>
              <dd className="mono">{num(Math.round(vendors))}</dd>
            </div>
            <div>
              <dt>Median swipe</dt>
              <dd className="mono">$99.97</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="hero-strip shell">
        <DailyStrip daily={data.daily} height={118} />
      </div>

      <div className="hero-foot shell mono">
        <span>↓ Scroll</span>
        <span className="hero-foot-hint">Nine figures, one dataset, no smoothing</span>
      </div>
    </section>
  );
}
