import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck, Clock, Star } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Goswami Capital — Free Consultation in 30 Minutes" },
      { name: "description", content: "Talk to a certified financial or legal advisor. Free 15-minute consultation. We respond within 30 minutes." },
      { property: "og:title", content: "Contact Goswami Capital" },
      { property: "og:description", content: "Get a free consultation. Response in 30 minutes." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useT();
  return (
    <section className="container-wide py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t.contact.eyebrow}</span>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t.contact.h1a} <span className="text-gradient-primary">{t.contact.h1b}</span>
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">{t.contact.sub}</p>

          <div className="mt-8 space-y-4">
            <a href="tel:+918863803119" className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-primary/30 hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary"><Phone className="h-5 w-5" /></span>
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.callUs}</p>
                <p className="font-semibold">+91-8863803119</p>
              </div>
            </a>
            <a href="https://wa.me/918863803119" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-primary/30 hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success"><MessageCircle className="h-5 w-5" /></span>
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.waLabel}</p>
                <p className="font-semibold">{t.contact.waSub}</p>
              </div>
            </a>
            <a href="mailto:goswamicapital@gmail.com" className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition hover:border-primary/30 hover:shadow-soft">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent"><Mail className="h-5 w-5" /></span>
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.emailLabel}</p>
                <p className="font-semibold">goswamicapital@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground"><MapPin className="h-5 w-5" /></span>
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.visitLabel}</p>
                <p className="font-semibold">{t.contact.visitVal}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground"><Clock className="h-5 w-5" /></span>
              <div>
                <p className="text-xs text-muted-foreground">{t.contact.timingLabel}</p>
                <p className="font-semibold">{t.contact.timingVal}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl bg-secondary p-3"><Clock className="mx-auto h-4 w-4 text-primary" /><p className="mt-1 font-medium">{t.contact.badge1}</p></div>
            <div className="rounded-xl bg-secondary p-3"><ShieldCheck className="mx-auto h-4 w-4 text-primary" /><p className="mt-1 font-medium">{t.contact.badge2}</p></div>
            <div className="rounded-xl bg-secondary p-3"><Star className="mx-auto h-4 w-4 fill-accent text-accent" /><p className="mt-1 font-medium">{t.contact.badge3}</p></div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl border border-border bg-surface p-7 shadow-elevated md:p-9">
            <h2 className="font-display text-xl font-semibold">{t.contact.formH}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.contact.formSub}</p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
