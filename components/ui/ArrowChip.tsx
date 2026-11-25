import { cx } from "@/lib/cx";

export type ArrowDirection = "right" | "up";

type ArrowChipProps = {
  direction?: ArrowDirection;
  /** Colours of the round chip. Set by the parent button variant. */
  className?: string;
};

/**
 * Round chip with an arrow, used inside buttons. It nudges right when the
 * parent `.group` is hovered or focused.
 */
export function ArrowChip({ direction = "right", className }: ArrowChipProps) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-pill transition-transform duration-500 ease-out-expo",
        direction === "right" &&
          "group-hover:translate-x-1 group-focus-visible:translate-x-1",
        direction === "up" &&
          "group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5",
        className,
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={direction === "up" ? "-rotate-90" : undefined}
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
