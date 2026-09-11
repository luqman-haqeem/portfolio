import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

/**
 * The page is prerendered with six-hour time-based revalidation (see
 * `export const revalidate` in app/page.tsx), which needs two of OpenNext's
 * three cache components:
 *
 *   incrementalCache — R2 holds the rendered page between revalidations.
 *   queue           — a Durable Object dedupes and runs revalidations in the
 *                     background, so no visitor ever waits on GitHub.
 *
 * The third component, a tag cache, exists only for *on-demand* revalidation
 * via `revalidateTag` / `revalidatePath`. This app never calls either, so it is
 * deliberately left out — that saves a D1 database and its table migration.
 */
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
});
