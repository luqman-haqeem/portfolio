import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

/**
 * Gives `next dev` access to local Cloudflare bindings (R2, Durable Objects)
 * through Miniflare.
 *
 * Guarded to development on purpose: the production build never reads a
 * binding — it only fetches the GitHub API — so there is no reason to boot
 * Miniflare during `next build` in CI.
 */
if (process.env.NODE_ENV === "development") {
  void import("@opennextjs/cloudflare").then((m) =>
    m.initOpenNextCloudflareForDev(),
  );
}
