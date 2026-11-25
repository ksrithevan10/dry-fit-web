/**
 * ImageSlot: a marker for where photography will go.
 *
 * Iteration 1 has no images, so this renders nothing. It stays in the markup
 * so the designer can find every planned image position by searching for
 * `<ImageSlot`. Each slot is also listed in CONTENT_TODO.md.
 *
 * To add an image later, replace this component's body with next/image, for
 * example:
 *
 *   import Image from "next/image";
 *   return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />;
 *
 * and pass `src` from the page's content file.
 */

type ImageSlotProps = {
  /** Short name used in CONTENT_TODO.md, e.g. "home-hero". */
  name: string;
  /** What the photo should show, as a brief for the photographer. */
  brief: string;
  /** Intended aspect ratio, e.g. "16/9". */
  aspect?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ImageSlot(_props: ImageSlotProps) {
  return null;
}
