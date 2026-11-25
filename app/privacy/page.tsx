import { Breadcrumbs, LegalArticle, PageHeader } from "@/components/blocks";
import { privacyPage as page } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/privacy";

export const metadata = pageMetadata({ ...page.meta, path: PATH });

export default function Page() {
  return (
    <>
      <Breadcrumbs trail={[{ name: page.meta.title, path: PATH }]} />
      <PageHeader label={page.meta.title} heading={page.heading} />
      <LegalArticle updated={page.updated} sections={page.sections} />
    </>
  );
}
