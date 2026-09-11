/**
 * Canonical origin, used for `metadataBase`, the sitemap, robots.txt and the
 * absolute URL in the Open Graph card.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this one. Cloudflare Workers does not expose
 *      the deployed URL as an environment variable, so it has to be provided.
 *   2. URL / VERCEL_URL — injected automatically by Netlify and Vercel.
 *   3. localhost — development only.
 *
 * It must be present at **build** time, not run time: `NEXT_PUBLIC_*` values are
 * inlined into the bundle by the compiler. On Cloudflare that means a *build*
 * variable, not a runtime one under "Variables and Secrets" — a runtime value
 * arrives too late and is silently ignored.
 *
 * Prefer hardcoding `FALLBACK` below over fighting environment variables if the
 * domain is never going to change.
 */

const FALLBACK = "http://localhost:3000";

const resolved =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  FALLBACK;

export const siteUrl = resolved.replace(/\/$/, "");

/** True when we fell back to localhost — i.e. the origin is wrong. */
export const siteUrlIsPlaceholder = siteUrl === FALLBACK;

/**
 * Getting this wrong produces a site that looks fine but shares a broken link
 * preview, so say so during the production build rather than letting it ship
 * quietly.
 */
if (
  siteUrlIsPlaceholder &&
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE === "phase-production-build"
) {
  const where = process.env.WORKERS_CI
    ? 'Cloudflare → your Worker → Settings → Build → "Build variables and secrets"'
    : "your host's build environment";

  console.warn(
    [
      "",
      "  ⚠  NEXT_PUBLIC_SITE_URL is not set.",
      `     Falling back to ${FALLBACK}, so canonical URLs, sitemap.xml and the`,
      "     Open Graph image will all point at localhost.",
      "",
      `     Set it in ${where},`,
      "     or hardcode FALLBACK in lib/site.ts.",
      "",
    ].join("\n"),
  );
}
