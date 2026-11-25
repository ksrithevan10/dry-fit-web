import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ArrowChip, type ArrowDirection } from "./ArrowChip";

export type ButtonVariant = "primary" | "light";
export type ButtonSize = "md" | "sm";

const variants: Record<ButtonVariant, { button: string; chip: string }> = {
  primary: {
    button: "bg-primary text-on-dark hover:bg-primary-hover",
    chip: "bg-white text-primary",
  },
  light: {
    button: "bg-white text-ink hover:bg-button-light-hover",
    chip: "bg-ink text-on-dark",
  },
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-button",
  sm: "min-h-12",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: ArrowDirection | false;
  /** Stretch to the container width, label left and arrow right. */
  block?: boolean;
  className?: string;
  children: ReactNode;
};

function classes({
  variant = "primary",
  size = "md",
  block,
  className,
}: Omit<StyleProps, "children" | "arrow">) {
  return cx(
    "group inline-flex items-center gap-3 rounded-pill pr-2.5 pl-6.5 text-ui font-semibold transition-colors duration-300",
    variants[variant].button,
    sizes[size],
    block && "w-full justify-between",
    className,
  );
}

function Inner({
  variant = "primary",
  arrow = "right",
  children,
}: Pick<StyleProps, "variant" | "arrow" | "children">) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowChip direction={arrow} className={variants[variant].chip} />
      )}
    </>
  );
}

type ButtonLinkProps = StyleProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof StyleProps | "href"> & {
    href: string;
  };

/**
 * Pill button that navigates. Internal paths use next/link; full URLs
 * (WhatsApp, tel:, mailto:) render a plain anchor.
 */
export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  block,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls = classes({ variant, size, block, className });
  const inner = (
    <Inner variant={variant} arrow={arrow}>
      {children}
    </Inner>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

type ButtonProps = StyleProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof StyleProps>;

/** Pill button for forms and actions. */
export function Button({
  variant,
  size,
  arrow,
  block,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes({ variant, size, block, className })}
      {...rest}
    >
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
