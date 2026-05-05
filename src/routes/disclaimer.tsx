import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | Goswami Capital" },
      { name: "description", content: "Disclaimer for Goswami Capital." },
    ],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="container-tight py-16 md:py-24">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Disclaimer</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-10 space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground">General Disclaimer</h2>
            <p className="mt-3">Goswami Capital is an independent advisory firm and is not affiliated with the Reserve Bank of India (RBI), Securities and Exchange Board of India (SEBI), or any government body. All information provided on this website is for informational purposes only and does not constitute official legal, financial, or tax advice.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-foreground">Third-Party Services</h2>
            <p className="mt-3">Loan and insurance approvals are strictly subject to the terms and conditions of the respective lenders and insurers. Goswami Capital acts only as a facilitator and does not guarantee the approval of any loan or insurance application. Final interest rates, eligibility criteria, and processing fees are determined by our partner institutions based on their individual policies and your credit profile.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Accuracy of Information</h2>
            <p className="mt-3">While we strive to keep the information on our website up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">No Guarantee of Results</h2>
            <p className="mt-3">Past performance or success rates in loan approvals or legal cases do not guarantee future results. Every case is evaluated individually based on its own merits and current market conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">External Links</h2>
            <p className="mt-3">Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with Goswami Capital. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.</p>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
