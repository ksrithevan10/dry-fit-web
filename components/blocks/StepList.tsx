import { Card } from "@/components/ui/Card";

type Step = { title: string; body: string };

/** Numbered steps as cards, e.g. survey → fixed price → fit → handover. */
export function StepList({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="flex flex-wrap gap-5">
      {steps.map((step, index) => (
        <Card as="li" key={step.title} className="grow basis-60 reveal gap-3.5">
          <span
            aria-hidden="true"
            className="font-heading text-numeral text-primary"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-heading text-heading-m">{step.title}</h3>
          <p className="text-base text-muted">{step.body}</p>
        </Card>
      ))}
    </ol>
  );
}
