import { Suspense } from "react";
import { Breadcrumbs, PageHeader } from "@/components/blocks";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { quoteForm as page } from "@/content/quote";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/quote";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function QuotePage() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.label, path: PATH }]} />
      <PageHeader
        label={page.label}
        heading={page.heading}
        intro={page.intro}
      />
      <div className="container-site max-w-site pb-section">
        <div className="max-w-200">
          {/* Suspense: the form reads URL parameters for prefill. */}
          <Suspense>
            <QuoteForm
              uploadsEnabled={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
              turnstileSiteKey={
                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined
              }
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
