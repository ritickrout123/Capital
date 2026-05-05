import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Calculator, TrendingUp, Landmark, Shield, PiggyBank,
  ArrowRight, Info,
} from "lucide-react";

/* ─── formatters ─────────────────────────────────────────────────────────── */
const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n);

const pct = (n: number) => `${n.toFixed(1)}%`;

/* ─── shared sub-components ─────────────────────────────────────────────── */
function Slider({
  label, value, min, max, step, onChange, display, hint,
}: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (n: number) => void; display: string; hint?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <span className="rounded-md bg-primary-soft px-2.5 py-0.5 text-sm font-semibold text-primary">
          {display}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--color-primary)]
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
      />
      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{min}</span>
        {hint && <span className="text-primary/70 text-center">{hint}</span>}
        <span>{max}</span>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${
      highlight ? "bg-primary text-primary-foreground" : "bg-secondary/60"
    }`}>
      <span className={`text-sm ${highlight ? "font-bold" : "text-muted-foreground"}`}>{label}</span>
      <span className={`font-bold ${highlight ? "text-lg" : ""}`}>{value}</span>
    </div>
  );
}

function Bar({ a, b, aLabel, bLabel }: { a: number; b: number; aLabel: string; bLabel: string }) {
  const total = a + b;
  const aPct = total > 0 ? Math.round((a / total) * 100) : 50;
  return (
    <div>
      <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
        <span>{aLabel} {aPct}%</span>
        <span>{bLabel} {100 - aPct}%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-secondary overflow-hidden flex">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${aPct}%` }} />
        <div className="h-full bg-accent flex-1" />
      </div>
    </div>
  );
}

function Hint({ children, color = "primary" }: { children: React.ReactNode; color?: string }) {
  const cls = color === "amber"
    ? "bg-amber-50 border-amber-200 text-amber-700"
    : color === "blue"
    ? "bg-blue-50 border-blue-200 text-blue-700"
    : color === "emerald"
    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
    : "bg-accent-soft border-accent/20 text-accent";
  return (
    <div className={`rounded-xl border p-3 text-xs flex gap-2 ${cls}`}>
      <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

/* ─── 1. EMI ─────────────────────────────────────────────────────────────── */
function EMICalc() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = e * n;
    return { emi: Math.round(e), totalPayable: Math.round(total), totalInterest: Math.round(total - amount) };
  }, [amount, rate, years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <Slider label="Loan Amount" value={amount} min={100000} max={10000000} step={50000}
          onChange={setAmount} display={inr(amount)} />
        <Slider label="Interest Rate (p.a.)" value={rate} min={6} max={20} step={0.1}
          onChange={setRate} display={pct(rate)} hint="Home loan rates: 8.4–9.5%" />
        <Slider label="Tenure" value={years} min={1} max={30} step={1}
          onChange={setYears} display={`${years} yrs`} />
      </div>
      <div className="space-y-3">
        <Row label="Monthly EMI" value={inr(emi)} highlight />
        <Row label="Principal" value={inr(amount)} />
        <Row label="Total Interest" value={inr(totalInterest)} />
        <Row label="Total Payable" value={inr(totalPayable)} />
        <Bar a={amount} b={totalInterest} aLabel="Principal" bLabel="Interest" />
        <Button asChild variant="hero" className="w-full mt-1">
          <Link to="/contact">Check My Eligibility <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ─── 2. SIP ─────────────────────────────────────────────────────────────── */
function SIPCalc() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, returns, corpus } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const inv = monthly * n;
    return { invested: Math.round(inv), returns: Math.round(fv - inv), corpus: Math.round(fv) };
  }, [monthly, rate, years]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <Slider label="Monthly SIP" value={monthly} min={500} max={100000} step={500}
          onChange={setMonthly} display={inr(monthly)} hint="Start with ₹500/month" />
        <Slider label="Expected Return (p.a.)" value={rate} min={6} max={20} step={0.5}
          onChange={setRate} display={pct(rate)} hint="Equity MF avg: 12–15%" />
        <Slider label="Investment Period" value={years} min={1} max={40} step={1}
          onChange={setYears} display={`${years} yrs`} />
        <Hint color="default">
          Mutual fund returns are market-linked and not guaranteed.
        </Hint>
      </div>
      <div className="space-y-3">
        <Row label="Total Corpus" value={inr(corpus)} highlight />
        <Row label="Amount Invested" value={inr(invested)} />
        <Row label="Estimated Returns" value={inr(returns)} />
        <Row label="Return on Investment" value={`${Math.round((returns / invested) * 100)}%`} />
        <Bar a={invested} b={returns} aLabel="Invested" bLabel="Returns" />
        <Button asChild className="w-full mt-1 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/services/$slug" params={{ slug: "sip-investment" }}>Start a SIP <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ─── 3. FD ──────────────────────────────────────────────────────────────── */
function FDCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);

  const { maturity, interest, effectiveRate } = useMemo(() => {
    const r = rate / 100;
    const mat = principal * Math.pow(1 + r / freq, freq * years);
    const eff = (Math.pow(1 + r / freq, freq) - 1) * 100;
    return { maturity: Math.round(mat), interest: Math.round(mat - principal), effectiveRate: eff };
  }, [principal, rate, years, freq]);

  const freqOpts = [
    { label: "Monthly", value: 12 },
    { label: "Quarterly", value: 4 },
    { label: "Half-yearly", value: 2 },
    { label: "Yearly", value: 1 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <Slider label="Principal" value={principal} min={10000} max={5000000} step={10000}
          onChange={setPrincipal} display={inr(principal)} />
        <Slider label="Interest Rate (p.a.)" value={rate} min={4} max={9} step={0.05}
          onChange={setRate} display={pct(rate)} hint="Senior citizens get +0.5%" />
        <Slider label="Tenure" value={years} min={1} max={10} step={1}
          onChange={setYears} display={`${years} yrs`} />
        <div>
          <p className="text-sm font-medium text-foreground/80 mb-2">Compounding</p>
          <div className="grid grid-cols-2 gap-2">
            {freqOpts.map((f) => (
              <button key={f.value} onClick={() => setFreq(f.value)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                  freq === f.value
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
                }`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Row label="Maturity Amount" value={inr(maturity)} highlight />
        <Row label="Principal" value={inr(principal)} />
        <Row label="Interest Earned" value={inr(interest)} />
        <Row label="Effective Annual Rate" value={pct(effectiveRate)} />
        <Hint color="amber">Interest above ₹40,000/yr is subject to TDS at 10%.</Hint>
        <Button asChild variant="outline" className="w-full mt-1 border-amber-300 text-amber-700 hover:bg-amber-50">
          <Link to="/services/$slug" params={{ slug: "fixed-deposits" }}>Open an FD <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ─── 4. Income Tax ──────────────────────────────────────────────────────── */
function TaxCalc() {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [hra, setHra] = useState(120000);
  const [sec80c, setSec80c] = useState(150000);
  const [nps, setNps] = useState(50000);

  const { tax, cess, totalTax, effectiveRate, takeHome } = useMemo(() => {
    let taxable = income;
    let t = 0;
    if (regime === "new") {
      taxable = Math.max(0, income - 75000);
      if (taxable <= 400000) t = 0;
      else if (taxable <= 800000) t = (taxable - 400000) * 0.05;
      else if (taxable <= 1200000) t = 20000 + (taxable - 800000) * 0.10;
      else if (taxable <= 1600000) t = 60000 + (taxable - 1200000) * 0.15;
      else if (taxable <= 2000000) t = 120000 + (taxable - 1600000) * 0.20;
      else if (taxable <= 2400000) t = 200000 + (taxable - 2000000) * 0.25;
      else t = 300000 + (taxable - 2400000) * 0.30;
      if (taxable <= 1200000) t = 0;
    } else {
      const ded = Math.min(sec80c, 150000) + Math.min(nps, 50000) + Math.min(hra, 200000) + 50000;
      taxable = Math.max(0, income - ded);
      if (taxable <= 250000) t = 0;
      else if (taxable <= 500000) t = (taxable - 250000) * 0.05;
      else if (taxable <= 1000000) t = 12500 + (taxable - 500000) * 0.20;
      else t = 112500 + (taxable - 1000000) * 0.30;
      if (taxable <= 500000) t = 0;
    }
    const c = t * 0.04;
    const total = Math.round(t + c);
    return { tax: Math.round(t), cess: Math.round(c), totalTax: total, effectiveRate: income > 0 ? (total / income) * 100 : 0, takeHome: income - total };
  }, [income, regime, hra, sec80c, nps]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <Slider label="Annual Income (CTC)" value={income} min={300000} max={5000000} step={50000}
          onChange={setIncome} display={inr(income)} />
        <div>
          <p className="text-sm font-medium text-foreground/80 mb-2">Tax Regime</p>
          <div className="grid grid-cols-2 gap-2">
            {(["new", "old"] as const).map((r) => (
              <button key={r} onClick={() => setRegime(r)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all ${
                  regime === r
                    ? "border-blue-400 bg-blue-50 text-blue-700"
                    : "border-border bg-secondary text-muted-foreground hover:border-blue-300"
                }`}>
                {r === "new" ? "New Regime" : "Old Regime"}
              </button>
            ))}
          </div>
          {regime === "new" && (
            <p className="mt-2 text-[11px] text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
              ✅ Zero tax up to ₹12 lakh (FY 2025-26)
            </p>
          )}
        </div>
        {regime === "old" && (
          <>
            <Slider label="HRA Exemption" value={hra} min={0} max={300000} step={5000}
              onChange={setHra} display={inr(hra)} />
            <Slider label="Section 80C" value={sec80c} min={0} max={150000} step={5000}
              onChange={setSec80c} display={inr(sec80c)} hint="Max ₹1.5 lakh" />
            <Slider label="NPS 80CCD(1B)" value={nps} min={0} max={50000} step={5000}
              onChange={setNps} display={inr(nps)} hint="Extra ₹50k deduction" />
          </>
        )}
      </div>
      <div className="space-y-3">
        <Row label="Total Tax Payable" value={inr(totalTax)} highlight />
        <Row label="Income Tax" value={inr(tax)} />
        <Row label="Cess (4%)" value={inr(cess)} />
        <Row label="Effective Tax Rate" value={pct(effectiveRate)} />
        <Row label="In-hand Annual" value={inr(takeHome)} />
        <Hint color="blue">Estimate only. Surcharge & professional tax may apply.</Hint>
        <Button asChild variant="outline" className="w-full mt-1 border-blue-300 text-blue-700 hover:bg-blue-50">
          <Link to="/services/$slug" params={{ slug: "tax-consulting" }}>Talk to a Tax Expert <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ─── 5. Insurance ───────────────────────────────────────────────────────── */
function InsuranceCalc() {
  const [annualIncome, setAnnualIncome] = useState(800000);
  const [age, setAge] = useState(30);
  const [loans, setLoans] = useState(2000000);
  const [dependents, setDependents] = useState(2);

  const { recommendedCover, estimatedPremium, coverMultiple } = useMemo(() => {
    const yearsToRetire = Math.max(0, 60 - age);
    const hlv = annualIncome * yearsToRetire;
    const cover = Math.ceil((hlv + loans + dependents * 500000) / 1000000) * 1000000;
    const ratePerLakh = age < 30 ? 8 : age < 40 ? 11 : age < 50 ? 18 : 30;
    const premium = Math.round((cover / 100000) * ratePerLakh);
    return { recommendedCover: cover, estimatedPremium: premium, coverMultiple: Math.round(cover / annualIncome) };
  }, [annualIncome, age, loans, dependents]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-5">
        <Slider label="Annual Income" value={annualIncome} min={300000} max={5000000} step={50000}
          onChange={setAnnualIncome} display={inr(annualIncome)} />
        <Slider label="Your Age" value={age} min={18} max={55} step={1}
          onChange={setAge} display={`${age} yrs`} hint="Buy early — premiums rise with age" />
        <Slider label="Outstanding Loans" value={loans} min={0} max={10000000} step={100000}
          onChange={setLoans} display={inr(loans)} hint="Home loan, car loan, etc." />
        <Slider label="Dependents" value={dependents} min={0} max={6} step={1}
          onChange={setDependents} display={`${dependents}`} hint="Spouse, children, parents" />
      </div>
      <div className="space-y-3">
        <Row label="Recommended Cover" value={inr(recommendedCover)} highlight />
        <Row label="Cover Multiple" value={`${coverMultiple}× income`} />
        <Row label="Est. Annual Premium" value={inr(estimatedPremium)} />
        <Row label="Est. Monthly Premium" value={inr(Math.round(estimatedPremium / 12))} />
        <Hint color="emerald">Indicative for healthy non-smoker. Actual premium varies.</Hint>
        <Button asChild variant="outline" className="w-full mt-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
          <Link to="/services/$slug" params={{ slug: "term-insurance" }}>Get Best Term Plan <ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

/* ─── Tab config ─────────────────────────────────────────────────────────── */
type CalcId = "emi" | "sip" | "fd" | "tax" | "insurance";

const TABS: { id: CalcId; label: string; icon: React.ElementType; accent: string }[] = [
  { id: "emi",       label: "Loan EMI",     icon: Calculator, accent: "text-primary   bg-primary-soft   border-primary/30"   },
  { id: "sip",       label: "SIP Returns",  icon: TrendingUp, accent: "text-accent    bg-accent-soft    border-accent/30"    },
  { id: "fd",        label: "FD Maturity",  icon: PiggyBank,  accent: "text-amber-700 bg-amber-50       border-amber-200"    },
  { id: "tax",       label: "Income Tax",   icon: Landmark,   accent: "text-blue-700  bg-blue-50        border-blue-200"     },
  { id: "insurance", label: "Insurance",    icon: Shield,     accent: "text-emerald-700 bg-emerald-50   border-emerald-200"  },
];

/* ─── Exported component ─────────────────────────────────────────────────── */
export function HomeCalculator() {
  const [active, setActive] = useState<CalcId>("emi");
  const tab = TABS.find((t) => t.id === active)!;
  const Icon = tab.icon;

  return (
    <div className="rounded-3xl border border-border bg-surface shadow-soft overflow-hidden">
      {/* Tab bar — icon+label on desktop, icon-only on mobile, no visible scrollbar */}
      <div className="flex overflow-x-auto border-b border-border bg-secondary/30 scrollbar-none">
        <style>{`.calc-tabs::-webkit-scrollbar{display:none}`}</style>
        {TABS.map(({ id, label, icon: TabIcon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex flex-1 flex-shrink-0 flex-col items-center gap-1 px-3 py-3 text-xs font-semibold transition-all border-b-2 sm:flex-row sm:gap-2 sm:px-5 sm:py-3.5 sm:text-sm ${
              active === id
                ? "border-primary text-primary bg-surface"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <TabIcon className="h-4 w-4 flex-shrink-0" />
            <span className="hidden xs:inline sm:inline leading-tight text-center">{label}</span>
            {/* Mobile: show abbreviated label */}
            <span className="xs:hidden sm:hidden leading-tight text-center text-[10px]">
              {label.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Active calculator */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold mb-6 ${tab.accent}`}>
          <Icon className="h-3.5 w-3.5" />
          {tab.label} Calculator
        </div>

        {active === "emi"       && <EMICalc />}
        {active === "sip"       && <SIPCalc />}
        {active === "fd"        && <FDCalc />}
        {active === "tax"       && <TaxCalc />}
        {active === "insurance" && <InsuranceCalc />}
      </div>
    </div>
  );
}
