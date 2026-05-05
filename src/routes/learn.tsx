import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import {
  BookOpen, PlayCircle, TrendingUp, Shield, Calculator,
  ChevronRight, Clock, Tag, ExternalLink, Youtube,
} from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — Finance, Investing & Tax Guides | Goswami Capital" },
      {
        name: "description",
        content:
          "Free guides, articles and video lessons on personal finance, investing, tax planning, loans and insurance — by Goswami Capital experts.",
      },
    ],
  }),
  component: LearnLayout,
});

// Layout wrapper: hub at /learn, child pages (e.g. /learn/fixed-income) via Outlet
function LearnLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/learn") return <Outlet />;
  return <LearnHub />;
}

/* ── Static article data ─────────────────────────────────────────────────── */
interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
  date: string;
  to: string;
  isExternal?: boolean;
}

const ARTICLES: Article[] = [
  {
    slug: "fixed-income",
    title: "Fixed Income Securities — Complete Guide",
    excerpt:
      "Government Bonds, T-Bills, NCDs, FDs, PPF, RBI Floating Bonds, SGBs & Debt Mutual Funds explained simply. Know what's right for you.",
    category: "Investing",
    readMin: 12,
    date: "Jan 2025",
    to: "/learn/fixed-income",
  },
  {
    slug: "cibil-score",
    title: "How to Improve Your CIBIL Score Fast",
    excerpt:
      "A score above 750 unlocks the best loan rates. Learn the 7 proven steps to boost your credit score in 3–6 months.",
    category: "Loans",
    readMin: 6,
    date: "Feb 2025",
    to: "/learn/fixed-income",   // placeholder — update when article exists
  },
  {
    slug: "term-insurance",
    title: "Why Term Insurance is the Only Life Cover You Need",
    excerpt:
      "ULIPs and endowment plans give poor returns. Here's why a pure term plan at ₹700/month beats every other option for most Indians.",
    category: "Insurance",
    readMin: 5,
    date: "Mar 2025",
    to: "/learn/fixed-income",
  },
  {
    slug: "sip-power",
    title: "The Power of SIP: How ₹5,000/month Becomes ₹1 Crore",
    excerpt:
      "Compounding is the 8th wonder of the world. See exactly how a small monthly SIP grows into life-changing wealth over 20 years.",
    category: "Investing",
    readMin: 7,
    date: "Mar 2025",
    to: "/learn/fixed-income",
  },
  {
    slug: "itr-guide",
    title: "ITR Filing Guide 2025 — Which Form, When & How",
    excerpt:
      "ITR-1, ITR-2, ITR-3 or ITR-4? Salaried, freelancer or business owner — find the right form and avoid common mistakes.",
    category: "Tax",
    readMin: 8,
    date: "Apr 2025",
    to: "/learn/fixed-income",
  },
  {
    slug: "home-loan-tips",
    title: "7 Things to Check Before Taking a Home Loan",
    excerpt:
      "Processing fees, prepayment charges, floating vs fixed rates — know what to negotiate before you sign the loan agreement.",
    category: "Loans",
    readMin: 6,
    date: "Apr 2025",
    to: "/learn/fixed-income",
  },
];

/* ── YouTube video data ──────────────────────────────────────────────────── */
interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
}

const VIDEOS: Video[] = [
  {
    id: "dQw4w9WgXcQ",   // replace with real Goswami Capital video IDs
    title: "What is Fixed Income? Explained in 5 Minutes",
    description: "G-Secs, FDs, PPF, NCDs — understand every fixed income instrument in plain Hindi.",
    category: "Investing",
    duration: "5:12",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "How to Start a SIP — Step by Step",
    description: "Open your account, choose the right fund, and set up your first SIP in under 10 minutes.",
    category: "Investing",
    duration: "8:45",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Home Loan Process Explained",
    description: "From application to disbursement — everything you need to know before applying for a home loan.",
    category: "Loans",
    duration: "11:20",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Term Insurance vs ULIP — Which is Better?",
    description: "We compare pure term plans vs ULIPs on cost, returns, and protection. The answer might surprise you.",
    category: "Insurance",
    duration: "7:30",
  },
];

/* ── Category colours ────────────────────────────────────────────────────── */
const CAT_STYLE: Record<string, string> = {
  Investing: "bg-accent-soft text-accent border-accent/20",
  Loans:     "bg-primary-soft text-primary border-primary/20",
  Insurance: "bg-blue-50 text-blue-700 border-blue-200",
  Tax:       "bg-amber-50 text-amber-700 border-amber-200",
};

const CAT_ICON: Record<string, React.ElementType> = {
  Investing: TrendingUp,
  Loans:     BookOpen,
  Insurance: Shield,
  Tax:       Calculator,
};

function CategoryBadge({ cat }: { cat: string }) {
  const style = CAT_STYLE[cat] ?? "bg-secondary text-secondary-foreground border-border";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style}`}>
      {cat}
    </span>
  );
}

/* ── Embedded YouTube player ─────────────────────────────────────────────── */
function VideoCard({ video }: { video: Video }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      {/* Thumbnail with play overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <CategoryBadge cat={video.category} />
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" /> {video.duration}
          </span>
        </div>
        <h3 className="mt-3 font-display text-base font-semibold leading-snug">{video.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{video.description}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
        >
          Watch on YouTube <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

/* ── Article card ────────────────────────────────────────────────────────── */
function ArticleCard({ article }: { article: Article }) {
  const Icon = CAT_ICON[article.category] ?? BookOpen;
  return (
    <Link
      to={article.to as any}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
    >
      <div className="flex items-center justify-between gap-2">
        <CategoryBadge cat={article.category} />
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock className="h-3 w-3" /> {article.readMin} min read
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
        {article.excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-[11px] text-muted-foreground">{article.date}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Read <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/* ── Topic filter tabs ───────────────────────────────────────────────────── */
const TOPICS = ["All", "Investing", "Loans", "Insurance", "Tax"] as const;
type Topic = (typeof TOPICS)[number];

/* ── Page ────────────────────────────────────────────────────────────────── */
import { useState } from "react";

function LearnHub() {
  const [topic, setTopic] = useState<Topic>("All");

  const filteredArticles = topic === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === topic);

  const filteredVideos = topic === "All"
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === topic);

  return (
    <>
      {/* Hero */}
      <section className="bg-hero-glow">
        <div className="container-wide py-16 text-center md:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <BookOpen className="h-3.5 w-3.5" /> Knowledge Centre
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Learn Finance,{" "}
              <span className="text-gradient-primary">Simplified</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Free guides, articles and video lessons on investing, loans, tax planning and insurance — written by our certified advisors in plain language.
            </p>
          </Reveal>

          {/* Topic filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {TOPICS.map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  topic === t
                    ? "bg-gradient-primary text-primary-foreground shadow-soft"
                    : "border border-border bg-surface text-foreground/70 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="container-wide py-12">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold">Articles & Guides</h2>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {filteredArticles.length}
            </span>
          </div>
        </Reveal>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 60}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">No articles in this category yet — check back soon.</p>
        )}
      </section>

      {/* Videos */}
      <section className="container-wide py-12 border-t border-border">
        <Reveal>
          <div className="flex items-center gap-3 mb-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <h2 className="font-display text-2xl font-bold">Video Lessons</h2>
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {filteredVideos.length}
            </span>
          </div>
          <p className="mb-8 text-sm text-muted-foreground">
            Watch on this page or{" "}
            <a
              href="https://www.youtube.com/@GoswamCapital"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              subscribe on YouTube <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </Reveal>

        {filteredVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {filteredVideos.map((v, i) => (
              <Reveal key={v.id + i} delay={i * 60}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">No videos in this category yet.</p>
        )}
      </section>

      {/* CTA */}
      <section className="container-wide py-12 pb-20">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-border bg-surface p-6 text-center md:flex-row md:p-8 md:text-left">
            <div>
              <p className="font-display text-xl font-semibold">Have a question not covered here?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Talk to a certified advisor — free, no obligation, response in 30 minutes.
              </p>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
