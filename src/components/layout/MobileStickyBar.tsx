import { Phone, MessageCircle, Send } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n/LanguageProvider";

export function MobileStickyBar() {
  const { t } = useT();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        <a
          href="tel:+918863803119"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-foreground active:bg-secondary"
        >
          <Phone className="h-5 w-5 text-primary" /> {t.mobile.call}
        </a>
        <a
          href="https://wa.me/918863803119?text=Hi%20Goswami%20Capital%2C%20I%27d%20like%20a%20free%20consultation"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 border-x border-border py-2.5 text-xs font-medium text-foreground active:bg-secondary"
        >
          <MessageCircle className="h-5 w-5 text-success" /> {t.mobile.whatsapp}
        </a>
        <Link
          to="/contact"
          className="flex min-h-[56px] flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-accent-foreground bg-gradient-accent active:opacity-90"
        >
          <Send className="h-5 w-5" /> {t.mobile.enquire}
        </Link>
      </div>
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/918863803119?text=Hi%20Goswami%20Capital%2C%20I%27d%20like%20a%20free%20consultation"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow animate-pulse-soft md:flex"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
