import { AreaPage } from "@/components/templates/AreaPage";
import { areaContent } from "@/content/areas";
import { pageMetadata } from "@/lib/metadata";

// To add another area, copy this folder and change the slug. See content/areas.ts.
const area = areaContent("harrow");

export const metadata = pageMetadata({
  ...area.meta,
  path: `/kitchen-fitter-${area.slug}`,
});

export default function Page() {
  return <AreaPage area={area} />;
}
