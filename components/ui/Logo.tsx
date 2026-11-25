import Link from "next/link";
import { cx } from "@/lib/cx";

type LogoProps = {
  text: string;
  className?: string;
};

/** Text wordmark linking home. Swap for an SVG logo when one exists. */
export function Logo({ text, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cx(
        "inline-flex min-h-touch items-center font-heading text-logo",
        className,
      )}
    >
      {text}
    </Link>
  );
}
