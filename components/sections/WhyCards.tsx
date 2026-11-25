import { Card } from "@/components/ui/Card";

export type WhyCardsProps = {
  /** Visually hidden heading for the section. */
  heading: string;
  cards: ReadonlyArray<{ number: string; title: string; body: string }>;
};

/** Three reasons to choose Dry-Fit. */
export function WhyCards({ heading, cards }: WhyCardsProps) {
  return (
    <section
      aria-labelledby="why-heading"
      className="container-site pb-section"
    >
      <h2 id="why-heading" className="sr-only">
        {heading}
      </h2>
      <ul className="flex flex-wrap gap-6">
        {cards.map((card) => (
          <Card
            as="li"
            key={card.number}
            className="grow basis-75 reveal gap-3.5"
          >
            <span
              aria-hidden="true"
              className="font-heading text-numeral text-primary"
            >
              {card.number}
            </span>
            <h3 className="font-heading text-heading-m">
              <span className="sr-only">{card.number} · </span>
              {card.title}
            </h3>
            <p className="text-base text-muted">{card.body}</p>
          </Card>
        ))}
      </ul>
    </section>
  );
}
