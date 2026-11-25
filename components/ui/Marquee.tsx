"use client";

import { useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. Slower is calmer. */
  duration?: number;
  reverse?: boolean;
  /** Accessible name for the scrolling area. */
  label: string;
  /** Labels for the pause/play button. */
  pauseLabel: string;
  playLabel: string;
  /** Show the pause/play button. */
  controls?: boolean;
  className?: string;
  trackClassName?: string;
};

/**
 * Infinite horizontal loop. The content is rendered twice and the track moves
 * by -50%, so the loop is seamless. The copy is hidden from screen readers and
 * keyboard focus (`inert`).
 *
 * It pauses on hover and when anything inside has keyboard focus, and the
 * pause button stops it for touch and keyboard users (WCAG 2.2.2). With
 * prefers-reduced-motion it does not move and can be scrolled sideways.
 */
export function Marquee({
  children,
  label,
  duration = 46,
  reverse,
  pauseLabel,
  playLabel,
  controls = true,
  className,
  trackClassName,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={cx("marquee relative", className)} data-paused={paused}>
      <div className="marquee-viewport" role="group" aria-label={label}>
        <div
          className={cx("marquee-track", reverse && "marquee-reverse")}
          style={
            { "--marquee-duration": `${duration}s` } as React.CSSProperties
          }
        >
          <div className={cx("flex shrink-0", trackClassName)}>{children}</div>
          <div
            className={cx("marquee-copy flex shrink-0", trackClassName)}
            aria-hidden="true"
            inert
          >
            {children}
          </div>
        </div>
      </div>

      {controls && (
        <div className="container-site mt-3 flex justify-end motion-reduce:hidden">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className="inline-flex min-h-touch min-w-touch items-center justify-center gap-2 rounded-pill px-3 type-label text-muted hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              {paused ? (
                <path d="M3 1.5v11l9-5.5z" className="fill-current" />
              ) : (
                <path
                  d="M3.5 1.5v11M10.5 1.5v11"
                  className="stroke-current"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
            <span>{paused ? playLabel : pauseLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
