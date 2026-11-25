import {
  ServicePage,
  servicePageContent,
} from "@/components/templates/ServicePage";
import { servicePages } from "@/content/dry-fitting";
import { pageMetadata } from "@/lib/metadata";

const content = servicePageContent("units", servicePages);

export const metadata = pageMetadata({
  ...content.meta,
  path: content.service.href,
});

export default function Page() {
  return <ServicePage content={content} />;
}
