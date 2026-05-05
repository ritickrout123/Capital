import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Goswami Capital" },
      { name: "description", content: "Terms of Service for Goswami Capital." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container-tight py-16 md:py-24">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-10 space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-3">By accessing and using the Goswami Capital website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-foreground">2. Service Description</h2>
            <p className="mt-3">Goswami Capital provides financial and legal advisory services, acting as an intermediary between clients and various financial institutions, banks, and NBFCs. We assist in loan processing, insurance, and legal documentation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. User Responsibilities</h2>
            <p className="mt-3">You agree to provide accurate, current, and complete information during the application process and to update such information to keep it accurate, current, and complete. Providing false information may result in the rejection of your application.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Intellectual Property</h2>
            <p className="mt-3">All content included on this site, such as text, graphics, logos, images, and software, is the property of Goswami Capital or its content suppliers and protected by international copyright laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
            <p className="mt-3">Goswami Capital shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use our services or for cost of procurement of substitute services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Modifications to Service</h2>
            <p className="mt-3">We reserve the right at any time to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice.</p>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
