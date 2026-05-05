import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageProvider";
const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const Slider = ({
  label, value, min, max, step, onChange, suffix,
}: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; suffix: string }) => (
  <div>
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <span className="rounded-md bg-primary-soft px-2.5 py-0.5 text-sm font-semibold text-primary">
        {suffix === "₹" ? fmt(value) : `${value} ${suffix}`}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label={label}
      className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--color-primary)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
    />
    <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
      <span>{suffix === "₹" ? fmt(min) : `${min} ${suffix}`}</span>
      <span>{suffix === "₹" ? fmt(max) : `${max} ${suffix}`}</span>
    </div>
  </div>
);

export function EMICalculator() {

  const { t } = useT();
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emiVal = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emiVal * n;
    return {
      emi: Math.round(emiVal),
      totalPayable: Math.round(total),
      totalInterest: Math.round(total - amount),
    };
  }, [amount, rate, years]);

  return (
    <div className="grid gap-8 rounded-3xl border border-border bg-surface p-6 shadow-soft md:grid-cols-2 md:p-10">
      <div className="space-y-6">
        <Slider label={t.emi.amount} value={amount} min={100000} max={10000000} step={50000} onChange={setAmount} suffix="₹" />
        <Slider label={t.emi.rate} value={rate} min={6} max={18} step={0.1} onChange={setRate} suffix="%" />
        <Slider label={t.emi.tenure} value={years} min={1} max={30} step={1} onChange={setYears} suffix={t.emi.years} />
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-gradient-primary p-6 text-primary-foreground">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/70">{t.emi.monthly}</p>
          <p className="mt-1 font-display text-4xl font-bold">{fmt(emi)}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5 text-sm">
          <div>
            <p className="text-primary-foreground/70">{t.emi.totalInt}</p>
            <p className="mt-0.5 font-semibold">{fmt(totalInterest)}</p>
          </div>
          <div>
            <p className="text-primary-foreground/70">{t.emi.totalPay}</p>
            <p className="mt-0.5 font-semibold">{fmt(totalPayable)}</p>
          </div>
        </div>
        <Button asChild variant="accent" size="lg" className="mt-6">
          <a href="/contact">{t.emi.cta}</a>
        </Button>
      </div>
    </div>
  );
}
