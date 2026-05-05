import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Mail, HandshakeIcon, Users, PhoneCall, FileSearch, ArrowRight, Sparkles, FileText, TrendingUp, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { ServiceCard } from "@/components/ServiceCard";
import { EMICalculator } from "@/components/EMICalculator";
import { Reveal } from "@/components/Reveal";
import { categoryMeta, services, type ServiceCategory } from "@/data/services";
import { TeamSlider } from "@/components/TeamSlider";
import { teamMembers } from "@/data/team";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { useT } from "@/i18n/LanguageProvider";

// FAQs are also used in JSON-LD (English) for SEO consistency.
const FAQS_EN = [
  { q: "Is the consultation really free?", a: "Yes. Your initial 15-minute consultation with our advisor is 100% free, with no obligation. We only earn when you choose to proceed and a service is delivered." },
  { q: "How fast can I get a loan approved?", a: "Most personal and business loans are approved within 24–72 hours. Home loans typically take 5–7 days depending on property verification." },
  { q: "Are my documents and data safe?", a: "Absolutely. We are ISO 27001 compliant. Your data is encrypted in transit and at rest, and shared only with the lender or authority you authorise." },
  { q: "Do you charge any upfront fees?", a: "No upfront fees for consultation or eligibility checks. Service charges, where applicable, are transparently shared before you proceed." },
  { q: "Which cities do you operate in?", a: "We serve clients across India digitally, with on-ground teams in Mumbai, Delhi, Bengaluru, Hyderabad, Pune, and Ahmedabad." },
];

const FAQS_HI = [
  { q: "क्या परामर्श वाकई मुफ़्त है?", a: "हाँ। हमारे सलाहकार के साथ आपका शुरुआती 15-मिनट का परामर्श 100% मुफ़्त है, कोई बाध्यता नहीं। हम तभी कमाते हैं जब आप आगे बढ़ने का निर्णय लेते हैं और सेवा दी जाती है।" },
  { q: "लोन कितनी जल्दी स्वीकृत हो सकता है?", a: "अधिकांश पर्सनल और बिज़नेस लोन 24–72 घंटों में स्वीकृत होते हैं। होम लोन में आमतौर पर 5–7 दिन लगते हैं (प्रॉपर्टी सत्यापन पर निर्भर)।" },
  { q: "क्या मेरे दस्तावेज़ और डेटा सुरक्षित हैं?", a: "बिल्कुल। हम ISO 27001 अनुपालक हैं। आपका डेटा एन्क्रिप्टेड है और केवल आपके द्वारा अधिकृत ऋणदाता या प्राधिकरण के साथ साझा किया जाता है।" },
  { q: "क्या कोई अग्रिम शुल्क लगता है?", a: "परामर्श या पात्रता जाँच के लिए कोई अग्रिम शुल्क नहीं। जहाँ लागू हो, सेवा शुल्क पारदर्शी रूप से पहले बताए जाते हैं।" },
  { q: "आप किन शहरों में सेवाएँ देते हैं?", a: "हम पूरे भारत में डिजिटल रूप से सेवा देते हैं, और मुंबई, दिल्ली, बेंगलुरु, हैदराबाद, पुणे और अहमदाबाद में ऑन-ग्राउंड टीमें हैं।" },
];

const TESTIMONIALS_EN = [
  { name: "Priya Sharma", city: "Mumbai", text: "Got my home loan approved in 36 hours with the lowest rate I had been quoted. Their team handled every paper.", initials: "PS", color: "from-rose-400 to-pink-600" },
  { name: "Arjun Mehta", city: "Bengaluru", text: "Company registration was painless. They explained every step and delivered in 6 days flat.", initials: "AM", color: "from-emerald-400 to-teal-600" },
  { name: "Neha Reddy", city: "Hyderabad", text: "Switched my health insurance through Goswami — saved ₹18,000/year and got better cover. Highly recommended.", initials: "NR", color: "from-amber-400 to-orange-600" },
];

const TESTIMONIALS_HI = [
  { name: "प्रिया शर्मा", city: "मुंबई", text: "मेरा होम लोन 36 घंटों में मंजूर हो गया, सबसे कम ब्याज दर पर। उनकी टीम ने हर कागजी काम संभाला।", initials: "पश", color: "from-rose-400 to-pink-600" },
  { name: "अर्जुन मेहता", city: "बेंगलुरु", text: "कंपनी रजिस्ट्रेशन बिल्कुल आसान था। उन्होंने हर चरण समझाया और 6 दिन में काम पूरा किया।", initials: "अम", color: "from-emerald-400 to-teal-600" },
  { name: "नेहा रेड्डी", city: "हैदराबाद", text: "गोस्वामी के जरिए हेल्थ इंश्योरेंस बदला — सालाना ₹18,000 बचाए और बेहतर कवर मिला। अत्यधिक अनुशंसित।", initials: "नर", color: "from-amber-400 to-orange-600" },
];

export const Route = createFileRoute("/")({
  component: Component,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0F6E56" },
      { name: "format-detection", content: "telephone=yes" },
      { title: "Goswami Capital — Trusted Financial & Legal Partner in India" },
      {
        name: "description",
        content:
          "Loans, legal, insurance & documentation — handled by certified experts. 5,000+ happy clients, 98% success rate, 24-hour approvals.",
      },
      { property: "og:title", content: "Goswami Capital — Financial & Legal Services" },
      { property: "og:description", content: "Premium financial & legal advisory for individuals and businesses across India." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Goswami Capital",
          url: "https://goswamicapital.in",
          logo: "https://goswamicapital.in/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-8863803119",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        }),
      },
    ],
  }),
});

function Component() {
  const { t, lang } = useT();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "all">("all");
  
  // Convert client-side services to ServiceEntry format
  const convertedServices = services.map(service => ({
    id: 0, // Mock ID for client-side data
    slug: service.slug,
    name: service.name,
    category: service.category,
    tagline: service.tagline,
    benefit: service.benefit,
    processing_time: service.processingTime,
    compliance_rate: "98%", // Mock data
    success_rate: "98%", // Mock data
    eligibility: service.eligibility,
    documents: service.documents,
    icon_name: service.icon?.name ? service.icon.name.replace(/[A-Z]/g, letter => letter.toLowerCase()) : 'briefcase' // Safe fallback
  }));
  
  const filteredServices = activeCategory === "all" 
    ? convertedServices 
    : convertedServices.filter(service => service.category === activeCategory);
  const testimonials = lang === "en" ? TESTIMONIALS_EN : TESTIMONIALS_HI;
  const faqs = lang === "en" ? FAQS_EN : FAQS_HI;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Financial services background" className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Reveal>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
              {t.home.h1a} <span className="text-yellow-400">{t.home.h1b}</span>{t.home.h1c}
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 max-w-4xl mx-auto leading-relaxed text-white/95 drop-shadow-md">
              {t.home.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold border-2 border-yellow-500"
                asChild
              >
                <Link to="/contact">
                  {t.common.talkToAdvisor}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
                asChild
              >
                <Link to="/services">
                  {t.home.explore}
                  <FileSearch className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services & Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {t.home.servicesEy}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.home.servicesP}
              </p>
            </div>
          </Reveal>

          {/* Stats Grid */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
              <div className="space-y-2">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <div className="text-3xl font-bold text-foreground">5,000+</div>
                <div className="text-sm text-muted-foreground">{t.home.clients5k}</div>
              </div>
              <div className="space-y-2">
                <Award className="h-8 w-8 mx-auto text-primary" />
                <div className="text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">{t.home.rating}</div>
              </div>
              <div className="space-y-2">
                <ShieldCheck className="h-8 w-8 mx-auto text-primary" />
                <div className="text-3xl font-bold text-foreground">24h</div>
                <div className="text-sm text-muted-foreground">{t.home.why1}</div>
              </div>
              <div className="space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-primary" />
                <div className="text-3xl font-bold text-foreground">₹500Cr+</div>
                <div className="text-sm text-muted-foreground">{t.home.why4}</div>
              </div>
            </div>
          </Reveal>

          {/* Category Filter */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {t.home.catAll}
              </button>
              {(Object.keys(categoryMeta) as ServiceCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {categoryMeta[category].label} {
  category === 'Loans' ? t.home.catLoans :
  category === 'Wealth Creation' ? 'Wealth Creation' :
  category === 'Insurance' ? t.home.catInsurance :
  category === 'Accounting' ? 'Accounting' :
  category === 'Holiday Club' ? 'Holiday Club' :
  t.home.catAll
}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service, index) => (
              <Reveal key={service.slug} delay={0.1 * (index % 6)}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services" className="text-lg px-8 py-4">
                {t.common.viewAll}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {t.home.testEy}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.home.testH}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={0.1 * index}>
                <div className="bg-gradient-to-br from-background to-secondary/20 p-6 rounded-2xl border border-border shadow-soft hover:shadow-glow transition-all duration-300">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold mb-4`}>
                    {testimonial.initials}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.city}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our dedicated team of financial experts is here to guide you on your journey to financial freedom
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {teamMembers.slice(0, 6).map((member, index) => (
                  <div key={member.id} className="text-center group cursor-pointer" onClick={() => {
                    // Scroll to team slider when clicked
                    const sliderElement = document.querySelector('.team-slider-container');
                    sliderElement?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <div className="aspect-square rounded-xl overflow-hidden shadow-lg mb-4 group-hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallbackIcon = parent.querySelector('.team-fallback') as HTMLElement;
                              if (fallbackIcon) {
                                fallbackIcon.style.display = 'flex';
                              }
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center team-fallback" style={{display: 'none'}}>
                        <Users className="w-8 h-8 text-white/50" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="team-slider-container">
              <TeamSlider teamMembers={teamMembers} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder Spotlight Section */}
      {/* <section className="py-16 bg-gradient-to-br from-primary/5 to-primary text-white">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Our Visionary Leader
                  </h2>
                  <p className="text-xl text-white/90 mb-6">
                    P D Goswami - Founder & CEO
                  </p>
                </div>
              </div>
              <div className="relative order-1 md:order-2">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="P D Goswami - Founder & CEO"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallbackIcon = parent.querySelector('.founder-fallback') as HTMLElement;
                          if (fallbackIcon) {
                            fallbackIcon.style.display = 'flex';
                          }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center founder-fallback" style={{display: 'none'}}>
                    <Users className="w-16 h-16 text-white/50" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* EMI Calculator Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {t.home.toolsEy}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.home.toolsP}
                </p>
              </div>
              <EMICalculator />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {t.home.faqEy}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t.home.faqH}
                </p>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <Reveal key={index} delay={0.1 * index}>
                    <AccordionItem value={`item-${index}`} className="bg-background border border-border rounded-xl px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </Reveal>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
              {t.home.ctaH}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/95 drop-shadow-md">
              {t.home.ctaP}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-yellow-400 text-black hover:bg-yellow-300 text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold border-2 border-yellow-500"
                asChild
              >
                <Link to="/contact">
                  {t.common.getFreeConsult}
                  <PhoneCall className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl font-semibold"
                asChild
              >
                <Link to="/about">
                  {t.header.about}
                  <HandshakeIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-4 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <LeadForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
