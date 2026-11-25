import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";

type List = { title: string; items: readonly string[] };

export type WhatIsDryFittingProps = {
  label: string;
  heading: string;
  body: string;
  weFit: List;
  yourTrades: List;
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-1 shrink-0"
    >
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        fill="none"
        className="stroke-primary"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-1 shrink-0"
    >
      <path
        d="M6 12h12"
        fill="none"
        className="stroke-faint"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
          <ul className="flex flex-col gap-3 text-base">
            {weFit.items.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card tone="alt" className="grow basis-70 reveal gap-4.5">
          <h3 className="font-heading text-heading-s">{yourTrades.title}</h3>
          <ul className="flex flex-col gap-3 text-base text-muted">
            {yourTrades.items.map((item) => (
              <li key={item} className="flex gap-3">
                <DashIcon />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
