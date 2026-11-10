import raw from "./analysis.json";

export interface Kpis {
  netSpend: number;
  grossSpend: number;
  refunds: number;
  transactions: number;
  purchases: number;
  refundCount: number;
  vendors: number;
  cardholders: number;
  categories: number;
  medianTicket: number;
  meanTicket: number;
  avgDailySpend: number;
  avgMonthlySpend: number;
  avgTicketPerCardholder: number;
  singleTxnVendors: number;
  peakMonth: string;
  peakMonthAmount: number;
  lowMonth: string;
  lowMonthAmount: number;
  busiestDay: string;
  busiestDayAmount: number;
  quietDays: number;
  top1pctTxnShare: number;
  top1pctTxnCount: number;
}

export interface MonthPoint {
  month: number;
  label: string;
  spend: number;
  count: number;
  cardholders: number;
  vendors: number;
  refunds: number;
  avgTicket: number;
}

export interface Category {
  name: string;
  spend: number;
  count: number;
  share: number;
  avgTicket: number;
}

export interface Cardholder {
  name: string;
  spend: number;
  count: number;
  avgTicket: number;
  share: number;
}

export interface Vendor {
  name: string;
  spend: number;
  count: number;
  share: number;
}

export interface Outlier {
  date: string;
  name: string;
  vendor: string;
  amount: number;
  mcc: string;
  description: string;
}

export interface Dataset {
  meta: {
    source: string;
    rows: number;
    year: number;
    dateRange: [string, string];
    note: string;
  };
  kpis: Kpis;
  monthly: MonthPoint[];
  daily: { date: string; spend: number; count: number }[];
  categories: Category[];
  categoryTotals: {
    top5Share: number;
    top10Share: number;
    tailCount: number;
    tailSpend: number;
    count: number;
  };
  cardholders: Cardholder[];
  pareto: { rank: number; pctOfCardholders: number; cumShare: number }[];
  concentration: {
    top10Pct: number;
    top50Pct: number;
    top100Pct: number;
    top10pctOfPeopleShare: number;
    medianCardholderSpend: number;
    cardholdersUnder10k: number;
    cardholdersUnder1k: number;
    topSpender: string;
    topSpenderSpend: number;
    topSpenderCount: number;
  };
  heatmap: { names: string[]; months: string[]; values: number[][] };
  vendors: Vendor[];
  vendorConcentration: {
    top10Pct: number;
    top50Pct: number;
    top100Pct: number;
    singleTxn: number;
    singleTxnShare: number;
    medianVendorSpend: number;
    total: number;
    totalSpend: number;
  };
  histogram: { label: string; low: number; high: number; count: number; spend: number }[];
  bands: { label: string; count: number; spend: number; share: number }[];
  vendorBuckets: { label: string; vendors: number; spend: number }[];
  cardholderBuckets: { label: string; people: number; spend: number }[];
  percentiles: { p: number; value: number }[];
  outliers: Outlier[];
  weekday: { day: string; spend: number; count: number }[];
  refundDrivers: { name: string; amount: number }[];
  refundMonthly: { label: string; amount: number; count: number }[];
  refundStats: {
    count: number;
    rate: number;
    total: number;
    grossOffset: number;
    median: number;
    largest: number;
  };
  travel: {
    spend: number;
    count: number;
    share: number;
    roomCharges: number;
    roomCount: number;
    airTravel: number;
    airCount: number;
  };
  quality: {
    blankDescriptions: number;
    genericDescription: number;
    genericShare: number;
    duplicateIds: number;
    sameDayPosts: number;
    avgPostLag: number;
    postLagMax: number;
    weekendCount: number;
  };
}

export const data = raw as unknown as Dataset;

export const chapters = [
  { id: "overview", fig: "Fig. 01", title: "The year at a glance" },
  { id: "rhythm", fig: "Fig. 02", title: "Spending rhythm" },
  { id: "categories", fig: "Fig. 03", title: "What the money bought" },
  { id: "cardholders", fig: "Fig. 04", title: "Who holds the cards" },
  { id: "vendors", fig: "Fig. 05", title: "Where the money goes" },
  { id: "anatomy", fig: "Fig. 06", title: "Anatomy of a swipe" },
  { id: "refunds", fig: "Fig. 07", title: "Refunds and reversals" },
  { id: "outliers", fig: "Fig. 08", title: "The outliers" },
  { id: "method", fig: "Appendix", title: "Method and limits" },
];
