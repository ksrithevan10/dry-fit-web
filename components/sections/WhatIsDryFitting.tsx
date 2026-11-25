import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { SectionLabel } from "@/components/ui/SectionLabel";

type List = { title: string; items: readonly string[] };

export type WhatIsDryFittingProps = {
  label: string;
  heading: string;
  body: string;
  weFit: List;
  yourTrades: List;
};

/** "(03) What is dry fitting?": what we fit versus what your trades do. */
export function WhatIsDryFitting({
  label,
  heading,
  body,
  weFit,
  yourTrades,
}: WhatIsDryFittingProps) {
  return (
    <section
      aria-labelledby="what-is-heading"
      className="container-site flex flex-wrap gap-12 pb-section"
    >
      <div className="flex grow basis-85 reveal flex-col gap-5">
        <SectionLabel>{label}</SectionLabel>
        <h2 id="what-is-heading" className="font-heading text-display-l">
          {heading}
        </h2>
        <p className="max-w-110 text-lead text-muted">{body}</p>
      </div>

      <div className="flex grow-[1.4] basis-130 flex-wrap gap-5">
        <Card className="grow basis-70 reveal gap-4.5">
          <h3 className="font-heading text-heading-s">{weFit.title}</h3>
          <CheckList items={weFit.items} />
        </Card>
        <Card tone="alt" className="grow basis-70 reveal gap-4.5">
          <h3 className="font-heading text-heading-s">{yourTrades.title}</h3>
          <CheckList items={yourTrades.items} variant="dash" />
        </Card>
      </div>
    </section>
  );
}
