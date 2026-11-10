import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import { data } from "../data/dataset";
import { num, pct } from "../lib/format";

const q = data.quality;

const fields = [
  ["transaction_id", "Unique identifier for the row. No duplicates in the file."],
  ["description", "Free-text merchant descriptor. Often generic; 130 rows are blank."],
  ["amount", "Signed dollar value. Negative rows are credits or refunds."],
  ["vendor", "Merchant name string as reported by the card network. Unnormalized."],
  ["transaction_date", "Date the purchase was made (all of 2014)."],
  ["posted_date", "Date the charge settled. Median lag about two days."],
  ["mcc", "Merchant category code description assigned by the network."],
  ["unique_name", "Abbreviated cardholder token, e.g. \"hines, g\"."],
  ["month", "Calendar month 1–12, derived from transaction_date."],
];

export default function Method() {
  return (
    <Chapter id="method" fig="Appendix" railTitle="Method, definitions and limits">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="method-title">
              How this was calculated — and what it <em>cannot</em> tell you.
            </h2>
          </div>
          <p className="lede">
            Everything on this site is a direct aggregate of the {num(data.meta.rows)} rows in{" "}
            {data.meta.source}. No rows were dropped, no amounts were adjusted, and no outliers were
            removed. Where the data is ambiguous, the ambiguity is described rather than corrected.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <div className="method-grid">
          <div className="method-card">
            <h3>Scope</h3>
            <p>
              One calendar year of purchase card activity, January 1 to December 31, 2014:{" "}
              {num(data.kpis.transactions)} transaction rows covering {num(data.kpis.cardholders)}{" "}
              cardholders and {num(data.kpis.vendors)} merchant-name strings. No other fiscal year,
              department file or general ledger extract is included.
            </p>
          </div>
          <div className="method-card">
            <h3>Definitions</h3>
            <ul>
              <li>Net spend = sum of all signed amounts, including credits.</li>
              <li>Gross spending = sum of positive rows only.</li>
              <li>Refunds = sum of negative rows only.</li>
              <li>Cardholder = distinct value of unique_name.</li>
              <li>Vendor = distinct value of vendor, before normalization.</li>
              <li>Category = merchant category code descriptor, as supplied.</li>
            </ul>
          </div>
          <div className="method-card">
            <h3>Treatment</h3>
            <p>
              Aggregation is exact; displayed figures are rounded (dollars to the nearest unit,
              percentages to one decimal unless shown otherwise). Percentile figures use all{" "}
              {num(data.kpis.transactions)} rows, including credits, which is why the 50th percentile
              reads $99.97 rather than a rounder number. Charts that exclude refunds say so.
            </p>
          </div>
          <div className="method-card">
            <h3>Data quality</h3>
            <ul>
              <li>
                {pct(q.genericShare)} of descriptions read only "general purchase" — {num(q.genericDescription)}{" "}
                rows — so spend cannot be classified by purpose.
              </li>
              <li>{q.blankDescriptions} descriptions are blank.</li>
              <li>{num(q.sameDayPosts)} rows posted the same day; the longest settlement lag is {q.postLagMax} days.</li>
              <li>No duplicate transaction identifiers.</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="fields">
          {fields.map(([name, desc]) => (
            <div className="field" key={name}>
              <code>{name}</code>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={90}>
        <div className="split">
          <div className="callout">
            <span className="callout-label">Limits of interpretation</span>
            <p>
              Category codes describe the merchant, not the purpose: a laptop bought at a bookstore is
              "book stores". Vendor strings are unnormalized, so the same supplier can appear under
              several names and the true number of distinct vendors is lower than{" "}
              {num(data.kpis.vendors)}. Cardholder tokens carry no department, unit or job title, so no
              organizational comparison is possible. Refunds are unlinked rows, not matched pairs.
              Nothing here supports a conclusion about whether any purchase was appropriate, necessary
              or well priced.
            </p>
          </div>
          <div className="callout">
            <span className="callout-label">Provenance note</span>
            <p>
              The extract is published as {data.meta.source} and presented here exactly as supplied. Its
              vendor mix is distinctively Oklahoman — Stillwater Milling, Oklahoma City Winnelson, the
              Oklahoma Department of Vocational-Technical Education — which places the institution in
              Stillwater, Oklahoma. The analysis is therefore labelled Oklahoma State University. If
              the file belongs to another institution sharing the same initials, only that label
              changes; no figure here does.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="stack">
          <p className="body-copy">
            The aggregate figures behind every chart are published as a single JSON file so the numbers
            can be checked, cited or reused without re-deriving them from the raw extract.
          </p>
          <div>
            <a className="download" href="/analysis.json" download="pcard-osu-2014-analysis.json">
              Download aggregate figures
              <span aria-hidden="true">↓</span>
              <span style={{ color: "var(--dim)" }}>· JSON, 52 KB</span>
            </a>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
