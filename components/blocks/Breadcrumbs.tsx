import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * Visible breadcrumb trail plus BreadcrumbList JSON-LD. Pass the trail after
 * "Home"; the last crumb is the current page.
 */
export function Breadcrumbs({ trail }: { trail: readonly Crumb[] }) {
  const crumbs: Crumb[] = [{ name: site.ui.home, path: "/" }, ...trail];

  return (
    <>
      <nav aria-label={site.ui.breadcrumb} className="container-site pt-4">
        <ol className="flex flex-wrap items-center gap-x-2 text-xs font-semibold text-muted">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className="inline-flex min-h-touch items-center hover:text-ink"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
