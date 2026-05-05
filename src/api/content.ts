import { createServerFn } from "@tanstack/react-start";
import { sql } from "../db";
import { verifyAdmin } from "./auth";
import { translateText } from "./translate";

// Types
export interface PageContent {
  id: number;
  page_slug: string;
  section_key: string;
  language: string;
  content_value: string;
}

export interface UpsertContentInput {
  page_slug: string;
  section_key: string;
  language: string;
  content_value: string;
}

// Get all content (Admin usage)
export const getAllContent = createServerFn({ method: "GET" }).handler(async () => {
  const result = await sql<PageContent[]>`
    SELECT * FROM page_content ORDER BY page_slug, section_key, language
  `;
  return result;
});

export const getPageContent = createServerFn({ method: "GET" })
  .inputValidator((data: { page_slug: string; language?: string }) => data)
  .handler(async ({ data }) => {
    const lang = data.language || "en";
    const result = await sql<PageContent[]>`
      SELECT * FROM page_content 
      WHERE page_slug = ${data.page_slug} AND language = ${lang}
    `;
    
    // Convert array to key-value map for easy frontend consumption
    return result.reduce((acc, item) => {
      acc[item.section_key] = item.content_value;
      return acc;
    }, {} as Record<string, string>);
  });

// Upsert content (Admin usage)
export const upsertContent = createServerFn({ method: "POST" })
  .inputValidator((data: UpsertContentInput & { token: string }) => data)
  .handler(async ({ data }) => {
    verifyAdmin(data.token);
    const result = await sql<PageContent[]>`
      INSERT INTO page_content (page_slug, section_key, language, content_value, updated_at)
      VALUES (${data.page_slug}, ${data.section_key}, ${data.language}, ${data.content_value}, CURRENT_TIMESTAMP)
      ON CONFLICT (page_slug, section_key, language) 
      DO UPDATE SET 
        content_value = EXCLUDED.content_value,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    return result[0];
  });

// Delete content (Admin usage)
export const deleteContent = createServerFn({ method: "POST" })
  .inputValidator((data: { id: number; token: string }) => data)
  .handler(async ({ data }) => {
    verifyAdmin(data.token);
    await sql`DELETE FROM page_content WHERE id = ${data.id}`;
    return { success: true };
  });

// Upsert content with auto-translation (Admin usage)
export const upsertWithTranslation = createServerFn({ method: "POST" })
  .inputValidator((data: { 
    page_slug: string; 
    section_key: string; 
    sourceLang: "en" | "hi"; 
    content_value: string; 
    autoTranslate: boolean;
    token: string;
  }) => data)
  .handler(async ({ data }) => {
    verifyAdmin(data.token);
    
    const { page_slug, section_key, sourceLang, content_value, autoTranslate } = data;
    const targetLang = sourceLang === "en" ? "hi" : "en";
    
    // Save the source language content
    const sourceResult = await sql<PageContent[]>`
      INSERT INTO page_content (page_slug, section_key, language, content_value, updated_at)
      VALUES (${page_slug}, ${section_key}, ${sourceLang}, ${content_value}, CURRENT_TIMESTAMP)
      ON CONFLICT (page_slug, section_key, language) 
      DO UPDATE SET 
        content_value = EXCLUDED.content_value,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    
    let translatedResult: PageContent | null = null;
    
    // If auto-translate is enabled, translate and save the target language
    if (autoTranslate && content_value.trim()) {
      try {
        const translation = await translateText({ 
          data: { 
            text: content_value, 
            from: sourceLang, 
            to: targetLang 
          } 
        });
        
        if (translation.translatedText && !translation.error) {
          const targetResult = await sql<PageContent[]>`
            INSERT INTO page_content (page_slug, section_key, language, content_value, updated_at)
            VALUES (${page_slug}, ${section_key}, ${targetLang}, ${translation.translatedText}, CURRENT_TIMESTAMP)
            ON CONFLICT (page_slug, section_key, language) 
            DO UPDATE SET 
              content_value = EXCLUDED.content_value,
              updated_at = CURRENT_TIMESTAMP
            RETURNING *
          `;
          translatedResult = targetResult[0];
        }
      } catch (err) {
        console.error("Auto-translation failed:", err);
      }
    }
    
    return {
      source: sourceResult[0],
      translated: translatedResult,
      success: true,
    };
  });
