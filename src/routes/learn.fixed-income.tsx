import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Landmark,
  Receipt,
  Building2,
  FileSignature,
  PiggyBank,
  Mailbox,
  ScrollText,
  Coins,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
export const Route = createFileRoute("/learn/fixed-income")({
  head: () => ({
    meta: [
      { title: "Fixed Income Securities — Complete Guide | Goswami Capital" },
      {
        name: "description",
        content:
          "Government Bonds, T-Bills, NCDs, FDs, PPF, RBI Floating Bonds, SGBs & Debt Mutual Funds — a complete fixed income guide by Goswami Capital.",
      },
      { property: "og:title", content: "Fixed Income Securities — Complete Guide" },
      {
        property: "og:description",
        content:
          "Fixed income, at a fixed time — understand all fixed income instruments easily.",
      },
      { name: "keywords", content: "Fixed Income, G-Secs, T-Bills, NCD, PPF, SGB, Debt Mutual Funds, Government Bonds India" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Fixed Income Securities — Complete Guide",
          inLanguage: "en-IN",
          author: { "@type": "Organization", name: "Goswami Capital" },
          publisher: {
            "@type": "Organization",
            name: "Goswami Capital",
            logo: { "@type": "ImageObject", url: "https://goswamicapital.in/logo.png" },
          },
        }),
      },
    ],
  }),
  component: FixedIncomePage,
});

const INVEST_LINK =
  "https://www.indiabonds.com/customer/register/?partner_code=IBP01107I00";

interface Instrument {
  num: string;
  icon: LucideIcon;
  title: string;
  bullets: string[];
  highlight: string;
  highlightTone: "success" | "warn" | "info";
}

const INSTRUMENTS = (t: any): Instrument[] => [
  {
    num: "1",
    icon: Landmark,
    title: t.learn.inst1T,
    bullets: [t.learn.inst1B1, t.learn.inst1B2, t.learn.inst1B3, t.learn.inst1B4, t.learn.inst1B5],
    highlight: t.learn.inst1H,
    highlightTone: "success",
  },
  {
    num: "2",
    icon: Receipt,
    title: t.learn.inst2T,
    bullets: [t.learn.inst2B1, t.learn.inst2B2, t.learn.inst2B3, t.learn.inst2B4],
    highlight: t.learn.inst2H,
    highlightTone: "info",
  },
  {
    num: "3",
    icon: Building2,
    title: t.learn.inst3T,
    bullets: [t.learn.inst3B1, t.learn.inst3B2, t.learn.inst3B3],
    highlight: t.learn.inst3H,
    highlightTone: "warn",
  },
  {
    num: "4",
    icon: FileSignature,
    title: t.learn.inst4T,
    bullets: [t.learn.inst4B1, t.learn.inst4B2, t.learn.inst4B3],
    highlight: t.learn.inst4H,
    highlightTone: "info",
  },
  {
    num: "5",
    icon: PiggyBank,
    title: t.learn.inst5T,
    bullets: [t.learn.inst5B1, t.learn.inst5B2, t.learn.inst5B3, t.learn.inst5B4],
    highlight: t.learn.inst5H,
    highlightTone: "success",
  },
  {
    num: "6",
    icon: Mailbox,
    title: t.learn.inst6T,
    bullets: [t.learn.inst6B1, t.learn.inst6B2, t.learn.inst6B3, t.learn.inst6B4],
    highlight: t.learn.inst6H,
    highlightTone: "success",
  },
  {
    num: "7",
    icon: ScrollText,
    title: t.learn.inst7T,
    bullets: [t.learn.inst7B1, t.learn.inst7B2, t.learn.inst7B3, t.learn.inst7B4],
    highlight: t.learn.inst7H,
    highlightTone: "info",
  },
  {
    num: "8",
    icon: Coins,
    title: t.learn.inst8T,
    bullets: [t.learn.inst8B1, t.learn.inst8B2, t.learn.inst8B3],
    highlight: t.learn.inst8H,
    highlightTone: "success",
  },
  {
    num: "9",
    icon: Briefcase,
    title: t.learn.inst9T,
    bullets: [t.learn.inst9B1, t.learn.inst9B2, t.learn.inst9B3, t.learn.inst9B4],
    highlight: t.learn.inst9H,
    highlightTone: "info",
  },
];

const PERSONAS = (t: any) => [
  { emoji: "👴", title: t.learn.per1T, reco: t.learn.per1R },
  { emoji: "👩‍💼", title: t.learn.per2T, reco: t.learn.per2R },
  { emoji: "📈", title: t.learn.per3T, reco: t.learn.per3R },
  { emoji: "⚡", title: t.learn.per4T, reco: t.learn.per4R },
  { emoji: "🌟", title: t.learn.per5T, reco: t.learn.per5R },
];

function toneClasses(tone: Instrument["highlightTone"]) {
  switch (tone) {
    case "success":
      return "bg-success/10 text-success border-success/20";
    case "warn":
      return "bg-accent/10 text-accent border-accent/30";
    default:
      return "bg-primary-soft text-primary border-primary/20";
  }
}

function FixedIncomePage() {
  const { t } = useT();
  return (
    <>
      {/* HERO */}
      <section className="bg-hero-glow">
        <div className="container-tight py-16 text-center md:py-24">
          <Reveal>
            {/* <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t.learn.heroBadge}
            </span> */}
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t.learn.h1a} <span className="text-primary">{t.learn.h1b}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.learn.sub}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="hero" size="lg">
                <a href={INVEST_LINK} target="_blank" rel="noreferrer">
                  {t.learn.investBtn} <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">{t.learn.talkBtn}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT IS FIXED INCOME */}
      <section className="container-tight py-14 md:py-20">
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-soft md:p-12">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <TrendingUp className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {t.learn.whatIsH2}
                </h2>
                <p className="mt-3 leading-relaxed text-foreground/80">
                  {t.learn.whatIsP1}
                </p>
                <p className="mt-3 font-semibold text-primary">
                  {t.learn.whatIsP2}
                </p>
                <p className="mt-4 rounded-xl bg-primary-soft/60 p-4 text-sm italic text-foreground/80">
                  {t.learn.whatIsP3}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* INSTRUMENTS */}
      <section className="container-wide pb-14 md:pb-20">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t.learn.typesH2}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {t.learn.typesP}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INSTRUMENTS(t).map((it) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.num}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-glow">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                        #{it.num}
                      </p>
                      <h3 className="font-display text-lg font-semibold leading-tight">
                        {it.title}
                      </h3>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                    {it.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-5 rounded-lg border px-3 py-2 text-xs font-medium ${toneClasses(
                      it.highlightTone,
                    )}`}
                  >
                    {it.highlight}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* PERSONAS */}
      <section className="container-tight pb-14 md:pb-20">
        <Reveal>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-soft/60 to-surface p-8 md:p-12">
            <h2 className="text-center font-display text-3xl font-bold tracking-tight md:text-4xl">
              {t.learn.personasH2}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PERSONAS(t).map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-border bg-background p-5 shadow-soft"
                >
                  <p className="text-3xl">{p.emoji}</p>
                  <p className="mt-2 font-display text-base font-semibold">{p.title}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-primary">
                    <ArrowRight className="h-3.5 w-3.5" /> {p.reco}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* KEY TAKEAWAY */}
      <section className="container-tight pb-14 md:pb-20">
        <Reveal>
          <div className="rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-glow md:p-12">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 shrink-0 text-accent" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/70">
                  {t.learn.takeawayTag}
                </p>
                <p className="mt-3 font-display text-xl leading-relaxed md:text-2xl">
                  {t.learn.takeawayP1}
                </p>
                <p className="mt-4 text-sm text-primary-foreground/80">
                  {t.learn.takeawayP2}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg">
                <a href={INVEST_LINK} target="_blank" rel="noreferrer">
                  {t.learn.takeawayBtn1}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20"
              >
                <a
                  href="https://linktr.ee/goswamicpital"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.learn.takeawayBtn2}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA STRIP */}
      <section className="container-tight pb-20">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-surface p-6 text-center md:flex-row md:p-8 md:text-left">
            <div>
              <p className="font-display text-xl font-semibold">
                {t.learn.ctaH}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.learn.ctaP}
              </p>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">{t.learn.ctaBtn}</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
