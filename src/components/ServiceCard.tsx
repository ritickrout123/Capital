import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import type { ServiceEntry } from "@/api/services";
import { useT } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import * as Icons from "lucide-react";
import { useState } from "react";

export function ServiceCard({ service }: { service: ServiceEntry }) {
  const Icon = (Icons as any)[service.icon_name] || Icons.Briefcase;
  const { t } = useT();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const navigate = useNavigate();

  const handleQuickApply = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowApplyModal(true);
  };

  return (
    <>
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
          <button
            onClick={handleQuickApply}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {t.card.apply} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </Link>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-surface to-surface/95 border border-border shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute right-6 top-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-200 group"
            >
              <X className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground mb-4">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Apply for {service.name}</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get started with your application in minutes. Our experts will guide you through the entire process.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-success">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free consultation · No hidden charges
              </div>
            </div>
            
            {/* Service Info */}
            <div className="mb-6 p-4 rounded-2xl bg-primary-soft/50 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-primary/70">Service Details</span>
                <span className="px-2 py-0.5 bg-primary/20 rounded-full text-xs text-primary font-medium">
                  {service.category}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-1">{service.name}</h4>
              <p className="text-sm text-muted-foreground">{service.tagline}</p>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1 text-success">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {service.processing_time}
                </span>
                <span className="text-muted-foreground">Quick approval</span>
              </div>
            </div>
            
            {/* Application Form */}
            <div className="mb-6">
              <LeadForm defaultService={service.name} compact />
            </div>
            
            {/* Footer Actions */}
            <div className="space-y-3 pt-6 border-t border-border">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  setShowApplyModal(false);
                  navigate({ to: "/services/$slug", params: { slug: service.slug } });
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Full Details & Documents Required
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>📞 Call: +91 8863803119</span>
                <span>•</span>
                <span>✉️ Email: goswamicapital@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
