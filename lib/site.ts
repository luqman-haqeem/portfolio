/**
 * Canonical origin for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL
 * on the host; Netlify's `URL` and Vercel's `VERCEL_URL` are picked up
 * automatically.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "http://localhost:3000"
).replace(/\/$/, "");
