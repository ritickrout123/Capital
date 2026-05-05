import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, FileCheck, ShieldCheck } from "lucide-react";
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

function NotFound() {
  const { t } = useT();
  return (
    <div className="container-tight py-24 text-center">
      <h1 className="font-display text-3xl font-bold">{t.detail.notFound}</h1>
      <Link to="/services" className="mt-4 inline-block text-primary">{t.detail.viewAll}</Link>
    </div>
  );
}

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = (Icons as any)[service.icon_name] || Icons.Briefcase;
  const { t } = useT();

  return (
    <>
      <section className="bg-hero-glow">
        <div className="container-wide py-12 md:py-16">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> {t.detail.back}
          </Link>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                <Icon className="h-3.5 w-3.5" /> {service.category}
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{service.name}</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{service.tagline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">{t.common.applyNow}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+918863803119">📞 {t.common.talkToExpert}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide grid gap-10 py-16 lg:grid-cols-[1fr_400px]">
        <article className="space-y-10">
          <div>
            <h2 className="font-display text-2xl font-bold">{t.detail.why}</h2>
            <p className="mt-3 text-muted-foreground">{service.benefit}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <Clock className="h-6 w-6 text-primary" />
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t.detail.processing}</p>
              <p className="mt-1 font-semibold">{service.processing_time}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t.detail.compliance}</p>
              <p className="mt-1 font-semibold">{t.detail.complianceVal}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5">
              <FileCheck className="h-6 w-6 text-primary" />
              <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{t.detail.success}</p>
              <p className="mt-1 font-semibold">{t.detail.successVal}</p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold">{t.detail.eligibility}</h2>
            <p className="mt-3 text-muted-foreground">{service.eligibility}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold">{t.detail.docs}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.documents.map((d) => (
                <li key={d} className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold">{t.detail.applyFor} {service.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{t.detail.freeConsult30}</p>
            <div className="mt-4">
              <LeadForm defaultService={service.name} compact />
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
