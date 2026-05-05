import { createServerFn } from "@tanstack/react-start";
import { sql } from "../db";
import { verifyAdmin } from "./auth";

// Types
export interface ServiceEntry {
  id: number;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  benefit: string;
  processing_time: string;
  compliance_rate: string;
  success_rate: string;
  eligibility: string;
  documents: string[]; // JSON array of strings
  icon_name: string;
}

export type UpsertServiceInput = Omit<ServiceEntry, "id">;

// Get all services (Public & Admin usage)
export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  const result = await sql<ServiceEntry[]>`
    SELECT * FROM services ORDER BY category, name
  `;
  return result;
});

// Get a single service by slug (Public usage)
export const getServiceBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const result = await sql<ServiceEntry[]>`
      SELECT * FROM services WHERE slug = ${data.slug} LIMIT 1
    `;
    return result[0] || null;
  });

// Upsert a service (Admin usage)
export const upsertService = createServerFn({ method: "POST" })
  .inputValidator((data: UpsertServiceInput & { token: string }) => data)
  .handler(async ({ data }) => {
    verifyAdmin(data.token);
    const documentsJson = JSON.stringify(data.documents);
    
    const result = await sql<ServiceEntry[]>`
      INSERT INTO services (
        slug, name, category, tagline, benefit, processing_time, 
        compliance_rate, success_rate, eligibility, documents, icon_name, updated_at
      )
      VALUES (
        ${data.slug}, ${data.name}, ${data.category}, ${data.tagline}, 
        ${data.benefit}, ${data.processing_time}, ${data.compliance_rate}, 
        ${data.success_rate}, ${data.eligibility}, ${documentsJson}::jsonb, 
        ${data.icon_name}, CURRENT_TIMESTAMP
      )
      ON CONFLICT (slug) 
      DO UPDATE SET 
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        tagline = EXCLUDED.tagline,
        benefit = EXCLUDED.benefit,
        processing_time = EXCLUDED.processing_time,
        compliance_rate = EXCLUDED.compliance_rate,
        success_rate = EXCLUDED.success_rate,
        eligibility = EXCLUDED.eligibility,
        documents = EXCLUDED.documents,
        icon_name = EXCLUDED.icon_name,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    return result[0];
  });

// Delete a service (Admin usage)
export const deleteService = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string; token: string }) => data)
  .handler(async ({ data }) => {
    verifyAdmin(data.token);
    await sql`DELETE FROM services WHERE slug = ${data.slug}`;
    return { success: true };
  });
