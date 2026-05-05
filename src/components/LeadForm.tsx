import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { z } from "zod";
import { useT } from "@/i18n/LanguageProvider";

const SERVICES = [
  "Home Loan",
  "Business Loan",
  "Personal Loan",
  "Loan Against Property",
  "Company Registration",
  "GST & Tax",
  "Legal Drafting",
  "Health Insurance",
  "Term Insurance",
  "ITR Filing",
  "Trademark",
  "Other",
];

const WA_NUMBER = "918863803119";

export function LeadForm({
  defaultService,
  compact = false,
}: {
  defaultService?: string;
  compact?: boolean;
}) {
  const { t } = useT();

  // Build schema with localized error messages
  const schema = z.object({
    name: z.string().trim().min(2, t.lead.nameErr).max(80),
    phone: z.string().trim().regex(/^[6-9]\d{9}$/, t.lead.phoneErr),
    service: z.string().min(1, t.lead.serviceErr).max(80),
    message: z.string().trim().max(500, t.lead.msgErr).optional().or(z.literal("")),
    consent: z.literal(true, { message: t.lead.consentErr }),
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: defaultService ?? "",
    message: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const buildWhatsAppText = () =>
    encodeURIComponent(
      `Hi Goswami Capital,\nName: ${form.name}\nPhone: +91 ${form.phone}\nService: ${form.service}${
        form.message ? `\nMessage: ${form.message}` : ""
      }`,
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.company.trim() !== "") {
      setStatus("success");
      return;
    }
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("loading");

    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppText()}`, "_blank", "noopener");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-success/10 p-8 text-center animate-scale-in">
        <CheckCircle2 className="h-12 w-12 text-success" />
        <h3 className="font-display text-xl font-semibold">
          {t.lead.thankYou}{form.name ? `, ${form.name.split(" ")[0]}` : ""}!
        </h3>
        <p className="text-sm text-muted-foreground">{t.lead.successMsg}</p>
        <Button variant="accent" onClick={openWhatsApp} className="mt-2">
          <MessageCircle className="h-4 w-4" /> {t.lead.continueWA}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`space-y-4 ${compact ? "" : ""}`} noValidate aria-label="Free consultation enquiry">
      <div aria-hidden="true" className="absolute left-[-10000px] h-0 w-0 overflow-hidden">
        <label>
          Company (leave empty)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </label>
      </div>

      <div>
        <label htmlFor="lf-name" className="mb-1.5 block text-xs font-medium text-foreground/80">{t.lead.name}</label>
        <input
          id="lf-name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={80}
          autoComplete="name"
          placeholder={t.lead.namePh}
          className="w-full rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="lf-phone" className="mb-1.5 block text-xs font-medium text-foreground/80">{t.lead.phone}</label>
        <div className="flex">
          <span className="inline-flex items-center rounded-l-lg border border-r-0 border-input bg-secondary px-3 text-sm text-muted-foreground">+91</span>
          <input
            id="lf-phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder={t.lead.phonePh}
            className="w-full rounded-r-lg border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            aria-invalid={!!errors.phone}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="lf-service" className="mb-1.5 block text-xs font-medium text-foreground/80">{t.lead.service}</label>
        <select
          id="lf-service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          aria-invalid={!!errors.service}
        >
          <option value="">{t.lead.selectService}</option>
          {SERVICES.map((s) => <option key={s}>{s}</option>)}
        </select>
        {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
      </div>

      {!compact && (
        <div>
          <label htmlFor="lf-msg" className="mb-1.5 block text-xs font-medium text-foreground/80">{t.lead.msg}</label>
          <textarea
            id="lf-msg"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={3}
            maxLength={500}
            placeholder={t.lead.msgPh}
            className="w-full resize-none rounded-lg border border-input bg-surface px-3.5 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[var(--color-primary)]"
          aria-invalid={!!errors.consent}
        />
        <span>{t.lead.consent}</span>
      </label>
      {errors.consent && <p className="-mt-2 text-xs text-destructive">{errors.consent}</p>}

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> {t.lead.submitting}</>
        ) : (
          t.lead.submit
        )}
      </Button>

      {status === "error" && (
        <div className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
          {t.lead.errorMsg}{" "}
          <button type="button" onClick={openWhatsApp} className="font-semibold underline">
            {t.lead.waInstead}
          </button>{" "}
          {t.lead.waInsteadTail}
        </div>
      )}

      <p className="text-center text-[11px] text-muted-foreground">{t.common.noSpam}</p>
    </form>
  );
}
