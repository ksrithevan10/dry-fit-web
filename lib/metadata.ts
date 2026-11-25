import type { Metadata } from "next";

type PageMeta = {
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
};

/**
 * Per-page metadata with a canonical URL and Open Graph tags. The base URL
 * comes from `metadataBase` in app/layout.tsx.
 */
export function pageMetadata({ title, description, path }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { card: "summary_large_image", title, description },
  };
}
