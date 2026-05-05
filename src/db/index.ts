import postgres from "postgres";
import net from "node:net";

// The hardcoded IP for c-6.us-east-1.aws.neon.tech (found via dig @8.8.8.8)
const NEON_IP = "35.173.20.131"; 
const NEON_HOST = "ep-autumn-cake-anw2fz6e-pooler.c-6.us-east-1.aws.neon.tech";

const rawConnectionString = process.env.DATABASE_URL || `postgresql://neondb_owner:npg_9ZAUWQSYkwK8@${NEON_HOST}/neondb?sslmode=require`;
// Clean the string (remove quotes or trailing semicolons that might have slipped in)
const connectionString = rawConnectionString.replace(/['";]/g, "").trim();

// Create a single global connection pool
export const sql = postgres(connectionString, {
  host: NEON_IP, // Bypass DNS lookup by using the direct IP
  ssl: {
    servername: NEON_HOST, // Crucial: Provide the hostname for Neon's SNI routing
    rejectUnauthorized: false, // Neon uses self-signed/dynamic certs often
  },
  onnotice: () => {},
});

// Helper function to initialize database tables if they don't exist
export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS page_content (
      id SERIAL PRIMARY KEY,
      page_slug VARCHAR(255) NOT NULL,
      section_key VARCHAR(255) NOT NULL,
      language VARCHAR(10) DEFAULT 'en',
      content_value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(page_slug, section_key, language)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      tagline TEXT NOT NULL,
      benefit TEXT NOT NULL,
      processing_time VARCHAR(100),
      compliance_rate VARCHAR(100),
      success_rate VARCHAR(100),
      eligibility TEXT,
      documents JSONB,
      icon_name VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}
