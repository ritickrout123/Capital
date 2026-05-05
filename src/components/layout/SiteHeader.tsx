import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageProvider";
import { GoswamiBrand } from "@/components/GoswamiBrandLogo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t, lang, setLang } = useT();

  const links = [
    { to: "/", label: t.header.home },
    { to: "/services", label: t.header.services },
    { to: "/learn", label: t.header.learn },
    { to: "/about", label: t.header.about },
    { to: "/contact", label: t.header.contact },
  ];

  const LangToggle = ({ className = "" }: { className?: string }) => (
    <div
      role="group"
      aria-label={t.header.languageLabel}
      className={`inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-semibold ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        aria-pressed={lang === "hi"}
      >
        हिं
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <GoswamiBrand tagline={t.header.tagline} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangToggle />
          <a
            href="tel:+918863803119"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" /> +91-8863803119
          </a>
          <Button asChild size="sm" variant="hero">
            <Link to="/contact">{t.common.freeConsult}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="container-wide flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="hero" className="mt-2">
              <Link to="/contact" onClick={() => setOpen(false)}>{t.common.getFreeConsult}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
