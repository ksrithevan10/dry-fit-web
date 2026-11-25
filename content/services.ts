/**
 * The four dry-fitting services. Used by the homepage "What we fit" list and
 * the /dry-fitting service pages (page copy arrives in feat/pages).
 */

export type Service = {
  number: string;
  title: string;
  slug: string;
  href: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Units & carcasses",
    slug: "units",
    href: "/dry-fitting/units",
  },
  {
    number: "02",
    title: "Doors, drawers & handles",
    slug: "doors-drawers",
    href: "/dry-fitting/doors-drawers",
  },
  {
    number: "03",
    title: "Worktops",
    slug: "worktops",
    href: "/dry-fitting/worktops",
  },
  {
    number: "04",
    title: "Panels, plinths & cornice",
    slug: "panels-plinths",
    href: "/dry-fitting/panels-plinths",
  },
];
