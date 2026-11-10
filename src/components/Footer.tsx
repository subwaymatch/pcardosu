import { data } from "../data/dataset";
import { site } from "../site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <span className="eyebrow">End of report</span>
            <p className="footer-line display">
              116,031 swipes.
              <br />
              <em>$33.5 million.</em>
              <br />
              One year, accounted for.
            </p>
          </div>
          <div className="footer-meta">
            <div>
              <span className="mono footer-key">Dataset</span>
              <span>{site.dataset}</span>
            </div>
            <div>
              <span className="mono footer-key">Period</span>
              <span>January 1 – December 31, 2014</span>
            </div>
            <div>
              <span className="mono footer-key">Rows</span>
              <span>{data.meta.rows.toLocaleString("en-US")} transactions</span>
            </div>
            <div>
              <span className="mono footer-key">Prepared</span>
              <span>Independent analysis of the published extract</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom mono">
          <span>PCARD / 2014 — {site.institution}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
