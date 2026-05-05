import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import { GoswamiBrand } from "@/components/GoswamiBrandLogo";

export function SiteFooter() {
  const { t } = useT();
  return (
    <footer className="mt-24 border-t border-border bg-surface-strong">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <GoswamiBrand size="sm" />
          <p className="mt-4 text-sm text-muted-foreground">{t.footer.intro}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t.footer.company}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">{t.footer.aboutUs}</Link></li>
            <li><Link to="/services" className="hover:text-primary">{t.footer.services}</Link></li>
            <li><Link to="/learn/fixed-income" className="hover:text-primary">{t.footer.learnFI}</Link></li>
            <li><Link to="/contact" className="hover:text-primary">{t.footer.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t.footer.servicesH}</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" search={{ category: "Loans" }} className="hover:text-primary">{t.footer.loans}</Link></li>
            <li><Link to="/services" search={{ category: "Legal" }} className="hover:text-primary">{t.footer.legal}</Link></li>
            <li><Link to="/services" search={{ category: "Insurance" }} className="hover:text-primary">{t.footer.insurance}</Link></li>
            <li><Link to="/services" search={{ category: "Documentation" }} className="hover:text-primary">{t.footer.documentation}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t.footer.reachUs}</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary shrink-0" /> +91-8863803119</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-primary shrink-0" /> goswamicapital@gmail.com</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary shrink-0" /> {t.contact.visitVal}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-wide space-y-3 py-5 text-xs text-muted-foreground">
          <p className="leading-relaxed text-muted-foreground/80">
            <strong className="text-foreground/80">{t.footer.disclaimerLabel}</strong> {t.footer.disclaimer}
          </p>
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>© {new Date().getFullYear()} Goswami Capital. {t.footer.rights}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link to="/privacy" className="hover:text-primary">{t.footer.privacy}</Link>
              <Link to="/terms" className="hover:text-primary">{t.footer.terms}</Link>
              <Link to="/disclaimer" className="hover:text-primary">{t.footer.disclaimerLink}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
