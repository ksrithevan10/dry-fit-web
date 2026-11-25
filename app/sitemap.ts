import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { areaHref, site } from "@/content/site";
import { siteUrl } from "@/lib/env";

/** Every public page. Unpublished areas are left out until they have pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/dry-fitting",
    ...services.map((service) => service.href),
    "/kitchens-we-fit",
    "/reviews",
    "/areas",
    ...site.areas.filter((area) => area.published).map(areaHref),
    "/about",
    "/contact",
    "/quote",
    "/privacy",
    "/terms",
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
