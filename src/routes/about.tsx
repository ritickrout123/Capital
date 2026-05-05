import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Heart, ShieldCheck, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { teamMembers } from "@/data/team";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — 15+ Years of Trust | Goswami Capital" },
      { name: "description", content: "Goswami Capital is India's premium financial & legal advisory firm with 5,000+ clients, 15+ years of experience and a 4.9/5 rating." },
      { property: "og:title", content: "About Goswami Capital" },
      { property: "og:description", content: "5,000+ clients · 15+ years · India's trusted financial & legal advisory." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useT();
  const VALUES = [
    { icon: ShieldCheck, title: t.about.val1T, desc: t.about.val1D },
    { icon: Heart, title: t.about.val2T, desc: t.about.val2D },
    { icon: Target, title: t.about.val3T, desc: t.about.val3D },
  ];
  const STATS = [
    { value: "5,000+", label: t.about.statClients },
    { value: "15+", label: t.about.statYears },
    { value: "₹1,200Cr+", label: t.about.statLoans },
    { value: "4.9/5", label: t.about.statRating },
  ];

  return (
    <>
      <section className="bg-hero-glow">
        <div className="container-tight py-16 text-center md:py-24">
          <Reveal>
            {/* <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> {t.about.badge}
            </span> */}
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t.about.h1a} <span className="text-gradient-primary">{t.about.h1b}</span>{t.about.h1c} <span className="text-gradient-accent">{t.about.h1d}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">{t.about.sub}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-wide py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-surface p-7 text-center shadow-soft">
                <p className="font-display text-3xl font-bold text-gradient-primary sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-tight py-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.about.missionH}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.about.missionP}</p>
        </Reveal>
      </section>

      <section className="bg-surface-strong py-20">
        <div className="container-wide">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.about.valuesH}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-border bg-surface p-7 shadow-soft">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t.about.teamEy}</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{t.about.teamH}</h2>
            <p className="mt-4 text-muted-foreground">{t.about.teamP}</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Award className="h-4 w-4 text-accent" /> {t.about.teamBul1}</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> {t.about.teamBul2}</li>
              <li className="flex items-center gap-2"><Users className="h-4 w-4 text-success" /> {t.about.teamBul3}</li>
            </ul>
            <div className="mt-7">
              <Button asChild variant="hero" size="lg"><Link to="/contact">{t.about.teamCta}</Link></Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-primary p-10 text-white shadow-elevated">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
              <div className="relative flex h-full flex-col justify-end">
                <p className="font-display text-2xl font-semibold leading-tight text-white drop-shadow-lg">{t.about.quote}</p>
                <p className="mt-4 text-sm text-white/90 drop-shadow-md">{t.about.quoteBy}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="container-wide py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-muted-foreground">Get to know the experts behind Goswami Capital</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Reveal key={member.id} delay={index * 100}>
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallbackIcon = parent.querySelector('.about-team-fallback') as HTMLElement;
                          if (fallbackIcon) {
                            fallbackIcon.style.display = 'flex';
                          }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center about-team-fallback" style={{display: 'none'}}>
                    <Users className="w-12 h-12 text-white/50" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {member.linkedin && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 text-primary hover:bg-primary/10"
                        asChild
                      >
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </Button>
                    )}
                    {member.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/20 text-primary hover:bg-primary/10"
                        asChild
                      >
                        <a href={`mailto:${member.email}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default function About() {
  return <AboutPage />;
}
