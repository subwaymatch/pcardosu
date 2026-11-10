export const money = (n: number, digits = 0): string =>
  `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;

const trim = (v: string) => v.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");

export const moneyCompact = (n: number): string => {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${trim((abs / 1_000_000).toFixed(2))}M`;
  if (abs >= 1_000) return `${sign}$${trim((abs / 1_000).toFixed(abs >= 10_000 ? 0 : 1))}k`;
  return `${sign}$${Math.round(abs)}`;
};

export const num = (n: number): string => n.toLocaleString("en-US");

export const pct = (p: number, digits = 1): string => `${p.toFixed(digits)}%`;

export const signedPct = (p: number, digits = 1): string =>
  `${p > 0 ? "+" : p < 0 ? "−" : ""}${Math.abs(p).toFixed(digits)}%`;

export const dateLabel = (iso: string): string => {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const longDate = (iso: string): string => {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};

export const niceMcc = (label: string): string => {
  const clean = label.replace(/\s+/g, " ").trim();
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

const MCC_RULES: [RegExp, string][] = [
  [/^dental\/laboratory/, "Dental, lab & medical equipment"],
  [/^dirct marketing/, "Direct marketing"],
  [/^drugs, drug proprietaries/, "Drugs & pharmaceuticals"],
  [/^stationery, office supplies/, "Office supplies & printing"],
  [/^miscellaneous and specialty retail/, "Specialty retail"],
  [/^plumbing and heating/, "Plumbing & heating"],
  [/^commercial equipment/, "Commercial equipment"],
  [/^electrical parts/, "Electrical parts & equipment"],
  [/^eating places/, "Restaurants"],
  [/^grocery stores/, "Groceries & supermarkets"],
  [/^lodging/, "Lodging"],
  [/^membership organizations/, "Membership organizations"],
  [/^charitable and social/, "Charitable & social services"],
  [/^government services/, "Government services"],
  [/^professional services/, "Professional services"],
  [/^business services/, "Business services"],
  [/^industrial supplies/, "Industrial supplies"],
  [/^chemicals and allied/, "Chemicals"],
  [/^catalog merchants/, "Catalog merchants"],
  [/^electronics stores/, "Electronics"],
  [/^book stores/, "Book stores"],
  [/^schools and educational/, "Education"],
  [/^travel agencies/, "Travel agencies"],
  [/^airlines/, "Airlines"],
  [/^hotels/, "Hotels"],
  [/^office, school/, "Office & school supplies"],
  [/^computer network/, "Computer services"],
  [/^direct marketing/, "Direct marketing"],
  [/^courier services/, "Courier services"],
  [/^special trade contractors/, "Special trade contractors"],
  [/^auto/, "Automotive"],
  [/^variety stores/, "Variety stores"],
  [/^department stores/, "Department stores"],
  [/^hardware stores/, "Hardware stores"],
  [/^medical, dental/, "Medical & dental services"],
  [/^clothing/, "Clothing"],
  [/^furniture/, "Furniture"],
  [/^security/, "Security services"],
  [/^telecommunication/, "Telecommunications"],
  [/^utilities/, "Utilities"],
];

/** Merchant category codes are long and machine-like; this makes them readable. */
export const prettyMcc = (raw: string): string => {
  const s = raw.toLowerCase().replace(/\s+/g, " ").trim();
  for (const [re, label] of MCC_RULES) if (re.test(s)) return label;
  const cleaned = s
    .replace(/\s*--?not elsewhere classified/g, "")
    .replace(/ not elsewhere classified/g, "")
    .replace(/[,\s/-]+$/, "")
    .trim();
  const out = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return out.length > 40 ? `${out.slice(0, 38).replace(/[\s,/-]+$/, "")}…` : out;
};
