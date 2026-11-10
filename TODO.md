# PCard 2014 — delivery outcomes

## 1. Analysis pipeline from the supplied extract
- [x] Every figure on the site is derived from `PCard-OSU-2014.csv` (116,031 rows) with no rows dropped and no amounts adjusted.
- [x] Aggregates published as `public/analysis.json`: totals, monthly and daily series, categories, cardholder Pareto and heatmap, vendor concentration and frequency buckets, size histogram and bands, percentiles, refunds, outliers, weekday rhythm, data-quality counts.
- [x] Gross purchases (112,240 rows, $34,133,593.60), refunds (3,791 rows, −$629,445.26) and net spend ($33,504,148.34) reconcile exactly.
- [x] Institution labelled Oklahoma State University, with a provenance note explaining the "OSU" file name and the Oklahoma vendor evidence.

## 2. Executive overview
- [x] Hero states net spend $33,504,148, 116,031 transactions, 2,009 cardholders, 17,508 vendors and the $99.97 median swipe.
- [x] Six headline statistics with count-up animation, each carrying a contextual note (gross vs. net, 318 swipes/day, 60% one-time vendors).
- [x] Three key findings: flat category portfolio, concentration among cards, small swipes vs. large dollars.
- [x] Ledger block reconciling gross purchases, refunds and net spend.

## 3. Monthly rhythm
- [x] Twelve-month net-spend bar chart, switchable between dollars and swipes, with hover detail (spend, swipes, cardholders, average ticket).
- [x] Average reference line and rounded axis ticks.
- [x] Peak (April, $3,162,984.96) and trough (December, $2,188,826.45) annotated, with the 30.8% decline stated.
- [x] Day-of-week distribution; weekend share of spend shown as 6.5%.
- [x] Busiest single day (May 22, $205,682.83) called out as a lodging cluster rather than a campus-wide surge.

## 4. Merchant-category analysis
- [x] Top twelve merchant categories ranked by net spend, toggleable to swipe volume.
- [x] Largest category (dental, lab and medical equipment) capped at 7.4%; flatness explained.
- [x] Long tail quantified: 332 further categories hold 51.1% of spend ($17.1M).
- [x] Travel broken out: air travel $561,547.58, room charges $1,605,548.45, combined 6.5% of spend.
- [x] Caveat that MCC codes describe the merchant, not the purpose of the purchase.

## 5. Cardholder concentration
- [x] Pareto curve on a log scale of people with markers at 10, 100, 152 and 201 cards, plus an equality reference line.
- [x] Concentration facts: top 10 cards 17.0%, top 10% of cards 56.0%, median card $5,959.78, 368 cards under $1,000.
- [x] Top-nine cardholder × month heatmap with hover readout.
- [x] Ten largest cardholders table (spend, swipes, average swipe, share) and the 3,510-swipe busiest card.

## 6. Vendor concentration
- [x] Top twelve vendors by net spend with swipe counts.
- [x] 17,508 vendors; 10,581 (60.4%) appear exactly once and still hold 14.1% of spend.
- [x] Top 100 vendors hold 30.3%; largest single vendor reaches only 1.3%.
- [x] Amazon's two merchant identifiers combined to $845,642 (2.5%) as a normalization caveat.
- [x] Frequency-bucket table from 1 transaction to 100+.

## 7. Transaction-size distribution
- [x] Log-scale histogram of purchase counts by size band with median marker and hover detail.
- [x] Percentile strip: P50 $99.97, P75 $296.70, P90 $715.40, P95 $1,221.95, P99 $3,047.02, P99.5 $3,929.61, P99.9 $4,950.00.
- [x] Band comparison of share-of-swipes against share-of-dollars (49% of swipes under $100 = 7% of dollars; 6.7% above $1,000 = 45% of dollars).
- [x] Top 1% of transactions (1,160 rows) carry 14.5% of spend.

## 8. Refunds and reversals
- [x] Monthly refund chart with hover detail, showing the flattest series in the file.
- [x] 3,791 credits, 3.27% of rows, −$629,445.26, −1.84% of gross, median −$47.61, largest −$6,266.53.
- [x] Six deepest refund categories with relative bars.
- [x] Stated limit that credits are unlinked rows, so gross and net figures are both reported.

## 9. Outliers
- [x] Fifteen largest transactions with date, cardholder, vendor, readable category and magnitude bar.
- [x] 33 rows above $5,000 (1.1% of spend); largest is $29,731.61.
- [x] Interpretation: seven of fifteen are hotel folios, two cardholders account for ten of fifteen.

## 10. Methodological notes
- [x] Scope, definitions (net/gross/refunds/cardholder/vendor/category), rounding treatment.
- [x] Data-quality counts: 65.5% "general purchase", 130 blank descriptions, 5,809 same-day posts, 133-day maximum lag, no duplicate IDs.
- [x] Field-by-field dictionary for all nine columns.
- [x] Limitations: merchant-level categories, unnormalized vendor strings, no department attribution, unlinked refunds, no procurement judgement.
- [x] Provenance note on the OSU label and downloadable aggregate JSON.

## 11. Presentation and responsiveness
- [x] Narrative chapter structure with sticky figure rails, section index, reading-progress bar and active-chapter navigation.
- [x] Scroll reveals, chart draw-in animations and count-ups, all disabled under `prefers-reduced-motion`.
- [x] Layouts verified at 1440×900 desktop and 390×844 mobile, including table and heatmap behaviour.
- [x] Static build passes `tsc --noEmit` and `vite build`; route manifest served at `/manus-routes.json`.
