import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ServiceEntry } from "@/api/services";
import { useT } from "@/i18n/LanguageProvider";
import * as Icons from "lucide-react";

export function ServiceCard({ service }: { service: ServiceEntry }) {
  const Icon = (Icons as any)[service.icon_name] || Icons.Briefcase;
  const { t } = useT();

  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
          {service.category}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{service.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{service.tagline}</p>
      <div className="mt-4 rounded-lg bg-secondary/60 p-3 text-xs">
        <p className="font-medium text-foreground/70">{t.card.eligibility}</p>
        <p className="mt-0.5 text-muted-foreground">{service.eligibility}</p>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs font-medium text-success">{service.processing_time}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80">
          {t.card.apply} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
