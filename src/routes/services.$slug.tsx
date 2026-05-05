import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, CheckCircle2, Clock, FileCheck, ShieldCheck,
  ChevronDown, AlertTriangle, Lightbulb, TrendingUp,
  Phone, Star, Users, Award,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { getServiceBySlug } from "@/api/services";
import { useT } from "@/i18n/LanguageProvider";
import * as Icons from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const service = await getServiceBySlug({ data: { slug: params.slug } });
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service | Goswami Capital" }] };
    return {
      meta: [
        { title: `${s.name} — ${s.tagline} | Goswami Capital` },
        { name: "description", content: s.benefit },
        { property: "og:title", content: `${s.name} — Goswami Capital` },
        { property: "og:description", content: s.benefit },
        { property: "og:type", content: "website" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.benefit,
            category: s.category,
            areaServed: "IN",
            provider: { "@type": "Organization", name: "Goswami Capital" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://goswamicapital.in/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://goswamicapital.in/services" },
              { "@type": "ListItem", position: 3, name: s.name },
            ],
          }),
        },
      ],
    };
  },
  errorComponent: ({ error }) => (
    <div className="container-tight py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => <NotFound />,
  component: ServiceDetail,
});


/* ── per-category educational content ─────────────────────────────────────── */
interface HowItWorksStep { step: string; title: string; desc: string; }
interface FAQ { q: string; a: string; }
interface ServiceContent {
  overview: string;
  howItWorks: HowItWorksStep[];
  benefits: string[];
  watchOut: string[];
  tip: string;
  faqs: FAQ[];
}

const categoryContent: Record<string, ServiceContent> = {
  Loans: {
    overview:
      "A loan is a sum of money borrowed from a bank or NBFC that you repay in monthly instalments (EMIs) over an agreed tenure. The lender charges interest on the outstanding principal. Understanding how loans work helps you choose the right product, negotiate better rates, and avoid costly mistakes.",
    howItWorks: [
      { step: "01", title: "Application & KYC", desc: "Submit your application with identity, income, and address proof. The lender verifies your KYC documents." },
      { step: "02", title: "Credit Assessment", desc: "The lender checks your CIBIL score (ideally 750+), income stability, existing obligations, and repayment history." },
      { step: "03", title: "Sanction Letter", desc: "If approved, you receive a sanction letter stating the loan amount, interest rate, tenure, and EMI." },
      { step: "04", title: "Legal & Technical", desc: "For home or property loans, the lender verifies property documents and conducts a technical valuation." },
      { step: "05", title: "Disbursement", desc: "After signing the loan agreement, funds are transferred directly to your account or the seller/builder." },
    ],
    benefits: [
      "Immediate access to large funds without liquidating investments",
      "Flexible repayment tenures from 1 to 30 years",
      "Tax benefits on home loan interest (Section 24) and principal (Section 80C)",
      "Competitive rates when you compare across 30+ lenders",
      "Pre-payment and part-payment options to reduce interest burden",
    ],
    watchOut: [
      "Processing fees (0.5–2%) and prepayment charges can add up — always read the fine print",
      "Floating rates can rise with RBI repo rate hikes — factor in worst-case EMI",
      "Missing even one EMI damages your CIBIL score significantly",
      "Avoid over-borrowing — keep total EMIs under 40% of monthly income",
    ],
    tip: "A CIBIL score above 750 can get you rates 0.5–1% lower. Check and improve your score before applying — it takes just 3–6 months of disciplined repayment.",
    faqs: [
      { q: "What CIBIL score do I need?", a: "Most lenders require 700+. A score of 750+ gets you the best rates. Below 650, approval is difficult." },
      { q: "Can I prepay my loan?", a: "Yes. Floating-rate loans have zero prepayment charges per RBI rules. Fixed-rate loans may have a 2–4% charge." },
      { q: "How long does approval take?", a: "Personal and business loans: 24–72 hours. Home loans: 7–15 days including property verification." },
      { q: "What is the maximum loan amount?", a: "Depends on your income, credit profile, and the lender. Home loans go up to ₹5 Cr; personal loans up to ₹25 lakh." },
    ],
  },
  "Wealth Creation": {
    overview:
      "Wealth creation is the process of growing your money systematically over time through disciplined investing. Unlike saving (which just preserves money), investing puts your money to work — generating returns that beat inflation and compound over years. The key is starting early, staying consistent, and choosing instruments that match your risk appetite and goals.",
    howItWorks: [
      { step: "01", title: "Goal Setting", desc: "Define your financial goals — retirement, child's education, home purchase — with a target amount and timeline." },
      { step: "02", title: "Risk Profiling", desc: "Assess your risk tolerance (conservative, moderate, aggressive) to determine the right asset allocation." },
      { step: "03", title: "KYC & Account Setup", desc: "Complete your KYC (PAN + Aadhaar) and open a demat/investment account. Takes 24–48 hours." },
      { step: "04", title: "Portfolio Construction", desc: "Our advisors build a diversified portfolio across equity, debt, and hybrid instruments based on your profile." },
      { step: "05", title: "Monitor & Rebalance", desc: "Review performance quarterly. Rebalance annually to maintain target allocation as markets move." },
    ],
    benefits: [
      "Power of compounding — ₹5,000/month at 12% for 20 years grows to ₹49 lakh",
      "Rupee cost averaging through SIPs reduces market timing risk",
      "Tax-efficient instruments like ELSS save up to ₹46,800 in taxes annually",
      "Professional fund management without needing market expertise",
      "Liquidity — most mutual funds can be redeemed within 1–3 business days",
    ],
    watchOut: [
      "Past returns do not guarantee future performance — diversify across fund categories",
      "Stopping SIPs during market downturns is the most common wealth-destroying mistake",
      "Exit loads apply if you redeem within 1 year in most equity funds",
      "Avoid chasing last year's top-performing fund — consistency matters more",
    ],
    tip: "Start a SIP of even ₹500/month today. The difference between starting at 25 vs 35 is enormous — a 10-year head start can double your final corpus due to compounding.",
    faqs: [
      { q: "What is the minimum investment for a SIP?", a: "As low as ₹100/month in some funds. Most good funds start at ₹500/month." },
      { q: "Are mutual fund returns guaranteed?", a: "No. Equity mutual funds are market-linked. Debt funds are more stable but not guaranteed either." },
      { q: "How are mutual fund gains taxed?", a: "Equity funds held over 1 year: 10% LTCG above ₹1 lakh. Short-term (under 1 year): 15% STCG." },
      { q: "Can I pause or stop my SIP?", a: "Yes, anytime without penalty. You can pause for 1–3 months or stop permanently." },
    ],
  },
  Insurance: {
    overview:
      "Insurance is a contract where you pay a regular premium to an insurer, who in return promises to compensate you for specific financial losses — medical bills, death, vehicle damage, etc. It is not an investment; it is pure risk protection. The goal is to ensure that an unexpected event does not wipe out your savings or leave your family financially vulnerable.",
    howItWorks: [
      { step: "01", title: "Need Assessment", desc: "Calculate how much cover you need. For life insurance: 10–15x annual income. For health: minimum ₹5 lakh per person." },
      { step: "02", title: "Proposal & Medical", desc: "Fill the proposal form honestly. For life insurance above certain amounts, a medical examination is required." },
      { step: "03", title: "Underwriting", desc: "The insurer assesses your risk profile — age, health history, occupation, lifestyle — and decides the premium." },
      { step: "04", title: "Policy Issuance", desc: "Once approved, the policy document is issued. Review it carefully within the free-look period (15–30 days)." },
      { step: "05", title: "Claims", desc: "In case of a claim, notify the insurer immediately, submit required documents, and the claim is settled within 7–30 days." },
    ],
    benefits: [
      "Financial security for your family in case of death, illness, or accident",
      "Cashless hospitalisation at 10,000+ network hospitals across India",
      "Tax deductions — premiums under Section 80C (life) and 80D (health)",
      "No-claim bonus increases your health cover by 5–50% each claim-free year",
      "Riders (critical illness, accidental death) add targeted protection at low cost",
    ],
    watchOut: [
      "Never mix insurance with investment — ULIPs and endowment plans give poor returns on both",
      "Disclose all pre-existing conditions honestly — non-disclosure leads to claim rejection",
      "Check the claim settlement ratio of the insurer (aim for 95%+)",
      "Waiting periods (2–4 years) apply for pre-existing conditions in health insurance",
    ],
    tip: "Buy term insurance when you are young and healthy — a ₹1 Cr cover costs just ₹700–900/month at age 28. The same cover costs 3x more at age 40.",
    faqs: [
      { q: "How much life cover do I need?", a: "A thumb rule: 10–15 times your annual income. Also factor in outstanding loans and future goals." },
      { q: "What is a waiting period in health insurance?", a: "A period (usually 30 days to 4 years) during which certain conditions are not covered. Pre-existing diseases typically have a 2–4 year wait." },
      { q: "Can I port my health insurance?", a: "Yes. You can port to another insurer at renewal without losing your no-claim bonus or waiting period credits." },
      { q: "Is term insurance payout tax-free?", a: "Yes. Death benefit under term insurance is fully tax-free under Section 10(10D)." },
    ],
  },
  Accounting: {
    overview:
      "Accounting and tax services ensure your business stays financially organised, legally compliant, and tax-efficient. From bookkeeping and GST filing to income tax returns and audits — professional accounting frees you to focus on growing your business while experts handle the numbers and compliance deadlines.",
    howItWorks: [
      { step: "01", title: "Onboarding & Data Collection", desc: "Share your financial records, bank statements, invoices, and previous returns. We set up your accounting system." },
      { step: "02", title: "Bookkeeping & Reconciliation", desc: "All transactions are recorded, categorised, and reconciled monthly to give you a clear financial picture." },
      { step: "03", title: "GST Filing", desc: "Monthly/quarterly GSTR-1 and GSTR-3B filings, reconciliation with GSTR-2A, and annual GSTR-9 return." },
      { step: "04", title: "ITR Filing", desc: "Preparation and filing of Income Tax Returns for individuals, firms, LLPs, and companies before due dates." },
      { step: "05", title: "Audit & Compliance", desc: "Statutory audits, tax audits (if turnover exceeds threshold), and compliance with Companies Act requirements." },
    ],
    benefits: [
      "Avoid penalties — GST late fees start at ₹50/day; income tax penalties can be 50–200% of tax due",
      "Accurate financials improve your loan eligibility and investor confidence",
      "Tax planning reduces your liability legally — we identify every deduction you are entitled to",
      "Dedicated CA handles all notices and assessments from the Income Tax Department",
      "Real-time financial reports help you make better business decisions",
    ],
    watchOut: [
      "Missing GST filing deadlines attracts interest at 18% per annum on unpaid tax",
      "Incorrect ITR filing can trigger scrutiny assessments — always use a professional",
      "Keep all invoices and receipts for at least 7 years — the IT department can audit past years",
      "TDS deductions must be deposited by the 7th of the following month or penalties apply",
    ],
    tip: "File your ITR even if your income is below the taxable limit — it creates a financial record that banks and visa authorities rely on, and makes future loan applications smoother.",
    faqs: [
      { q: "Who needs a GST registration?", a: "Businesses with annual turnover above ₹40 lakh (goods) or ₹20 lakh (services). Mandatory for interstate supply regardless of turnover." },
      { q: "What is the due date for ITR filing?", a: "31st July for individuals and non-audit cases. 31st October for businesses requiring audit." },
      { q: "What is a tax audit?", a: "Mandatory for businesses with turnover above ₹1 Cr (or ₹10 Cr if 95%+ transactions are digital). Conducted by a Chartered Accountant." },
      { q: "Can you handle notices from the Income Tax Department?", a: "Yes. We represent you before the IT Department, draft responses, and attend hearings on your behalf." },
    ],
  },
  "Holiday Club": {
    overview:
      "Our Holiday Club gives you access to exclusive travel packages, discounted flight bookings, and curated holiday experiences — all managed by travel experts. Whether it is a family vacation, honeymoon, or corporate retreat, we handle everything from itinerary planning to visa assistance so you can travel stress-free.",
    howItWorks: [
      { step: "01", title: "Consultation", desc: "Share your destination, travel dates, budget, and preferences. Our travel expert designs a personalised itinerary." },
      { step: "02", title: "Package Customisation", desc: "Choose from pre-designed packages or build a custom trip. We compare flights, hotels, and activities for the best value." },
      { step: "03", title: "Booking & Confirmation", desc: "Once you approve the itinerary and cost, we book all components and send you a detailed confirmation." },
      { step: "04", title: "Visa & Documentation", desc: "We assist with visa applications, travel insurance, and all required documentation for international travel." },
      { step: "05", title: "Travel Support", desc: "24/7 support during your trip for any changes, emergencies, or assistance you need on the ground." },
    ],
    benefits: [
      "Exclusive member rates — up to 30% off on flights and hotels vs booking directly",
      "Curated itineraries by experienced travel planners — no research needed",
      "Group booking discounts for family trips and corporate travel",
      "Visa assistance for 50+ countries including Schengen, USA, and Southeast Asia",
      "Travel insurance included in premium packages for complete peace of mind",
    ],
    watchOut: [
      "Book at least 60–90 days in advance for international travel to get the best fares",
      "Always check visa processing times — some countries take 4–6 weeks",
      "Read cancellation and refund policies carefully before confirming",
      "Travel insurance is not optional — medical emergencies abroad can cost lakhs",
    ],
    tip: "Travelling in the shoulder season (just before or after peak season) can save 20–40% on the same itinerary while avoiding crowds. Ask our advisors for the best travel windows for your destination.",
    faqs: [
      { q: "Do you offer EMI for holiday packages?", a: "Yes. We offer no-cost EMI options on packages above ₹25,000 through partner banks and credit cards." },
      { q: "Can you arrange last-minute travel?", a: "Yes, though options are limited and prices higher. We recommend booking at least 2–4 weeks in advance." },
      { q: "Do you handle corporate travel?", a: "Yes. We manage end-to-end corporate travel including flights, hotels, ground transport, and expense reporting." },
      { q: "Is travel insurance mandatory?", a: "Not mandatory, but strongly recommended. International travel insurance starts at ₹500 for a week-long trip." },
    ],
  },
};

function getContent(category: string): ServiceContent {
  return categoryContent[category] ?? categoryContent["Loans"];
}

/* ── FAQ accordion item ────────────────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-foreground hover:text-primary transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
      )}
    </div>
  );
}

/* ── Not found ─────────────────────────────────────────────────────────────── */
function NotFound() {
  const { t } = useT();
  return (
    <div className="container-tight py-24 text-center">
      <h1 className="font-display text-3xl font-bold">{t.detail.notFound}</h1>
      <Link to="/services" className="mt-4 inline-block text-primary">{t.detail.viewAll}</Link>
    </div>
  );
}

/* ── Main detail page ──────────────────────────────────────────────────────── */
function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = (Icons as any)[service.icon_name] || Icons.Briefcase;
  const { t } = useT();
  const content = getContent(service.category);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-glow">
        <div className="container-wide py-10 md:py-14">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary">{t.detail.back}</Link>
            <span>/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                <Icon className="h-3.5 w-3.5" /> {service.category}
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">{service.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5 text-sm shadow-soft">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{service.processing_time}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5 text-sm shadow-soft">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span className="font-medium">{t.detail.complianceVal}</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-surface border border-border px-4 py-2.5 text-sm shadow-soft">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="font-medium">{t.detail.successVal}</span>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {t.common.applyNow}
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+918863803119">
                    <Phone className="h-4 w-4 mr-1.5" /> {t.common.talkToExpert}
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust badges desktop */}
            <div className="hidden md:flex flex-col gap-3 min-w-[200px]">
              {[
                { icon: Users, label: "5,000+ clients served" },
                { icon: Star, label: "4.9/5 average rating" },
                { icon: Award, label: "8+ years experience" },
              ].map(({ icon: I, label }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl bg-surface border border-border px-4 py-3 text-sm shadow-soft">
                  <I className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two-column body */}
      <section className="container-wide py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">

          {/* LEFT: Educational content */}
          <article className="space-y-12 min-w-0">

            {/* Overview */}
            <div>
              <h2 className="font-display text-2xl font-bold">{t.detail.why}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{content.overview}</p>
              <div className="mt-4 rounded-xl border-l-4 border-primary bg-primary-soft p-4 text-sm">
                <p className="font-medium text-foreground">{service.benefit}</p>
              </div>
            </div>

            {/* How it works */}
            <div>
              <h2 className="font-display text-2xl font-bold">How it works</h2>
              <p className="mt-1 text-sm text-muted-foreground">Step-by-step process from application to completion</p>
              <ol className="mt-6 space-y-4">
                {content.howItWorks.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-primary-foreground shadow-soft">
                      {s.step}
                    </span>
                    <div className="pt-1">
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="font-display text-2xl font-bold">Key benefits</h2>
              <ul className="mt-4 space-y-3">
                {content.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm shadow-soft">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div>
              <h2 className="font-display text-2xl font-bold">{t.detail.eligibility}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{service.eligibility}</p>
            </div>

            {/* Documents */}
            <div>
              <h2 className="font-display text-2xl font-bold">{t.detail.docs}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3.5 text-sm shadow-soft">
                    <FileCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Watch out */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <h2 className="font-display text-lg font-bold text-amber-900">Things to watch out for</h2>
              </div>
              <ul className="space-y-2.5">
                {content.watchOut.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm text-amber-800">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro tip */}
            <div className="rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-accent" />
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Expert tip</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{content.tip}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-border bg-surface p-5 text-center shadow-soft">
                <Clock className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t.detail.processing}</p>
                <p className="mt-1 font-semibold text-sm">{service.processing_time}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5 text-center shadow-soft">
                <ShieldCheck className="mx-auto h-6 w-6 text-accent" />
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t.detail.compliance}</p>
                <p className="mt-1 font-semibold text-sm">{t.detail.complianceVal}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5 text-center shadow-soft">
                <TrendingUp className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t.detail.success}</p>
                <p className="mt-1 font-semibold text-sm">{t.detail.successVal}</p>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-4 rounded-2xl border border-border bg-surface px-6 shadow-soft">
                {content.faqs.map((f) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} />
                ))}
              </div>
            </div>

            {/* Mobile apply form */}
            <div id="apply-form" className="rounded-2xl border border-primary/30 bg-surface p-6 shadow-elevated lg:hidden">
              <h3 className="font-display text-xl font-bold">{t.detail.applyFor} {service.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.detail.freeConsult30}</p>
              <div className="mt-5">
                <LeadForm defaultService={service.name} compact />
              </div>
            </div>

          </article>

          {/* RIGHT: Sticky apply form */}
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-surface p-6 shadow-elevated">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="font-display text-lg font-bold">{t.detail.applyFor}</h3>
              </div>
              <p className="mb-1 font-semibold text-foreground">{service.name}</p>
              <p className="mb-5 text-xs text-muted-foreground">{t.detail.freeConsult30}</p>
              <LeadForm defaultService={service.name} compact />
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Prefer to talk?</p>
              <a
                href="tel:+918863803119"
                className="flex items-center gap-3 rounded-xl bg-accent-soft border border-accent/20 px-4 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 8863803119
              </a>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">Mon–Sun · 10 AM – 8 PM</p>
            </div>
          </aside>

        </div>
      </section>
    </>
  );
}
