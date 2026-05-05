import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/data/services";

const SITE = "https://goswamicapital.in";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const staticUrls = ["/", "/services", "/about", "/contact"];
        const serviceUrls = services.map((s) => `/services/${s.slug}`);
        const all = [...staticUrls, ...serviceUrls];
        const today = new Date().toISOString().split("T")[0];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) =>
      `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === "/" ? "1.0" : "0.8"}</priority></url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
