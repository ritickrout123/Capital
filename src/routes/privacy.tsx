import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Goswami Capital" },
      { name: "description", content: "Privacy Policy for Goswami Capital." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container-tight py-16 md:py-24">
      <Reveal>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-10 space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
            <p className="mt-3">At Goswami Capital, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
            <p className="mt-3">We may collect personal identification information including, but not limited to, your name, email address, phone number, and financial information necessary to provide our loan, legal, and insurance advisory services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Process your applications with partner banks and NBFCs</li>
              <li>Communicate with you regarding your inquiries</li>
              <li>Improve our website and customer service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Data Protection</h2>
            <p className="mt-3">We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Third-Party Disclosure</h2>
            <p className="mt-3">We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Contact Us</h2>
            <p className="mt-3">If there are any questions regarding this privacy policy, you may contact us using the information on our contact page.</p>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
