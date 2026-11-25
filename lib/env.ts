/**
 * Public environment values. Server-only secrets are read where they are used
 * (see lib/ and app/quote) and never imported into client components.
 */

/** Base URL for canonical links, the sitemap and Open Graph images. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dry-fit.com"
).replace(/\/$/, "");
