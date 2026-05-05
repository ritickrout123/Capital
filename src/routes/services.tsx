import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { categoryMeta, type ServiceCategory } from "@/data/services";
import { getServices } from "@/api/services";
import { z } from "zod";
import { useT } from "@/i18n/LanguageProvider";

const searchSchema = z.object({
  category: z.enum(["Loans", "Legal", "Insurance", "Documentation"]).optional(),
});

export const Route = createFileRoute("/services")({
  validateSearch: searchSchema,
  loader: async () => {
    return await getServices();
  },
  head: () => ({
    meta: [
      { title: "All Services — Loans, Legal, Insurance & Tax | Goswami Capital" },
      { name: "description", content: "Browse 12+ expert-led financial and legal services. Filter by Loans, Legal, Insurance or Documentation." },
      { property: "og:title", content: "Our Services — Goswami Capital" },
      { property: "og:description", content: "Loans, legal, insurance and documentation services from India's trusted advisors." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t } = useT();
  const services = Route.useLoaderData();
  const search = Route.useSearch();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<ServiceCategory | "All">(search.category ?? "All");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat = cat === "All" || s.category === cat;
      const matchQ = query === "" || (s.name + s.tagline + s.benefit).toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [cat, query]);

  const catLabel = (c: ServiceCategory | "All") => {
    if (c === "All") return t.home.catAll;
    if (c === "Loans") return t.home.catLoans;
    if (c === "Legal") return t.home.catLegal;
    if (c === "Insurance") return t.home.catInsurance;
    return t.home.catDocumentation;
  };

  return (
    <>
      <section className="bg-hero-glow">
        <div className="container-wide py-16 text-center md:py-20">
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {t.services.h1a} <span className="text-gradient-primary">{t.services.h1b}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t.services.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-wide py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.services.searchPh}
              className="w-full rounded-full border border-input bg-surface py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", ...Object.keys(categoryMeta)] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c as ServiceCategory | "All")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  cat === c
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-surface text-foreground/70 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {catLabel(c as ServiceCategory | "All")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            {t.services.none} <Link to="/contact" className="font-medium text-primary">{t.services.talkInstead}</Link>
          </p>
        )}
      </section>
    </>
  );
}
