import { useState } from "react";
import Chapter from "../components/Chapter";
import Reveal from "../components/Reveal";
import RankedBars, { type RankedRow } from "../components/charts/RankedBars";
import { data } from "../data/dataset";
import { money, num, pct, prettyMcc } from "../lib/format";

const k = data.kpis;
const shortLabel = (raw: string) => prettyMcc(raw);

export default function Categories() {
  const [mode, setMode] = useState<"spend" | "count">("spend");

  const ranked = [...data.categories].sort((a, b) => (mode === "spend" ? b.spend - a.spend : b.count - a.count));
  const rows: RankedRow[] = ranked.slice(0, 12).map((c) => ({
    label: shortLabel(c.name),
    value: mode === "spend" ? c.spend : c.count,
    share: mode === "spend" ? c.share : c.count / k.purchases,
    meta: mode === "spend" ? `${num(c.count)} swipes · avg ${money(c.avgTicket, 0)}` : `avg swipe ${money(c.avgTicket, 0)}`,
  }));
  const top = data.categories[0];
  const tailShare = (data.categoryTotals.tailSpend / k.netSpend) * 100;

  return (
    <Chapter id="categories" fig="Fig. 03" railTitle="What the money bought">
      <Reveal>
        <div className="chapter-lead">
          <div>
            <h2 className="section-title" id="categories-title">
              No single category runs the <em>budget</em>.
            </h2>
          </div>
          <p className="lede">
            Merchant category codes sort every swipe into one of 350 buckets. The largest — dental,
            laboratory and medical equipment — takes {pct(top.share * 100)} of the year's spending. This
            is not an institution with one dominant expense line; it is an institution buying a little
            of everything, constantly.
          </p>
        </div>
      </Reveal>

      <Reveal delay={60}>
        <RankedBars
          rows={rows}
          denominator={mode === "spend" ? k.netSpend : k.purchases}
          mode={mode}
          onModeChange={() => setMode(mode === "spend" ? "count" : "spend")}
          modeLabel={["Dollars", "Swipes"]}
        />
      </Reveal>

      <Reveal delay={80}>
        <div className="split split--wide-left">
          <div className="stack">
            <div className="callout">
              <span className="callout-label">The tail is the story</span>
              <p>
                Beyond the eighteen categories shown here sit {data.categoryTotals.tailCount} more.
                Together they account for <strong>{pct(tailShare)}</strong> of net spend —{" "}
                {money(data.categoryTotals.tailSpend)} — more than every category in the ranked list
                combined. Concentration in this dataset appears in the cards, not the categories.
              </p>
            </div>
            <div className="callout">
              <span className="callout-label">Travel, in two lines</span>
              <p>
                Air travel ({num(data.travel.airCount)} swipes, {money(data.travel.airTravel)}) and room
                charges ({num(data.travel.roomCount)} swipes, {money(data.travel.roomCharges)}) add up to{" "}
                <strong>{money(data.travel.spend)}</strong>, or {pct(data.travel.share * 100)} of all
                spending. Most of that is booked directly with hotels and airlines as "general purchase"
                rather than through a travel agency record.
              </p>
            </div>
          </div>

          <div className="stack">
            <div className="aside-fact">
              <b>7.4%</b>
              The share of net spend held by the largest of 350 merchant categories. A flat distribution
              like this usually signals genuine operational breadth rather than a concentrated
              procurement strategy.
            </div>
            <div className="aside-fact">
              <b>{num(top.count)}</b>
              Swipes in that top category, averaging {money(top.avgTicket)} each — the "hospital
              equipment and supplies" bucket behaves like a steady stream of lab and clinic purchases.
            </div>
            <p className="body-copy">
              Category codes are assigned by the card network based on the merchant's business, not on
              the purpose of the purchase. A laptop bought at a bookstore lands in "book stores"; a
              conference lunch lands in "eating places." Read the ranking as a description of{" "}
              <em>where</em> money went, not <em>why</em>.
            </p>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
