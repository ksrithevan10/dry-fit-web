# Contributing

A guide for the designer taking over the site after iteration 1. It covers where
things live, how to change the look, and how to get changes live.

## Previewing changes

- **Locally:** run `npm run dev` and open http://localhost:3000. Pages reload as you save.
- **On a real URL:** push your branch and open a pull request. Vercel builds a preview and posts the link on the PR within a minute or two. Share that link for feedback.
- **Reduced motion:** turn on "Reduce motion" in your OS accessibility settings to check the no-animation version. Every animation should end in a sensible final state.

## Design tokens

All tokens live in **one file: `app/globals.css`**, inside the `@theme` block.
They cover colours, the type scale (including the fluid `clamp()` display
sizes), letter spacing, radii, layout widths and gutters, button height, touch
target size, shadows and the easing curve.

Tailwind turns each token into utility classes. For example, `--color-primary`
becomes `bg-primary` and `text-primary`, `--text-display-l` becomes
`text-display-l`, and `--radius-card` becomes `rounded-card`.

Tailwind's default colours and type scale are switched off, so only brand
tokens exist. To restyle the site, change the token values. To add a new
colour or size, add a token and then use its class.

**Rules**

- No hex values, `rgb()` or one-off font sizes inside components. If you need a new value, add a token.
- Use `font-heading` for Bricolage Grotesque headings and `type-label` for the small uppercase section labels.
- Use `surface-dark` or `surface-primary` for dark or green panels. They also switch the focus ring to white.
- Motion lives at the bottom of `globals.css` (`mask-line`, `animate-fade-in`, `reveal`, `fill-on-scroll` and the marquee). Animate only `transform`, `opacity` and `clip-path`.

The one exception is `app/opengraph-image.tsx`, which mirrors a few token values
because `next/og` can't read CSS.

Fonts are loaded in `app/layout.tsx` with `next/font/google`: Bricolage
Grotesque for headings and Hanken Grotesk for body text.

## How components are organised

| Folder                  | What goes in it                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `components/ui/`        | Small, reusable, content-free pieces: `Button`, `ArrowChip`, `Chip`, `Card`, `SectionLabel`, `Stars`, `Marquee`, `OptionGroup`, `CheckList`, `ImageSlot` and the form fields in `ui/form/` |
| `components/layout/`    | `TopBar`, `Header`, `MobileMenu`, `Footer` and `SkipLink`                                                                                                                                  |
| `components/sections/`  | One component per homepage section, in page order in `app/page.tsx`                                                                                                                        |
| `components/blocks/`    | Building blocks for inner pages: `PageHeader`, `Section`, `Breadcrumbs`, `FaqList`, `StepList`, `ServiceLinks`, `QuoteCta`, `LegalArticle`                                                 |
| `components/templates/` | Whole-page templates shared by several routes: `ServicePage`, `AreaPage`                                                                                                                   |
| `components/quote/`     | The quote form and its file upload and spam check                                                                                                                                          |

**Copy never lives in components.** Sections take their text as props, and
pages pass it in from `/content`. To change words, edit `/content`. To change
how they look, edit the component.

## Branches and commits

- `main` is always deployable and deploys to production.
- Do all work on a branch: `feat/<name>` for features, `fix/<name>`, `style/<name>`, `chore/<name>` or `docs/<name>`.
- Open a pull request into `main` and fill in the template (it asks for screenshots and a checklist). CI must pass. Merge with **squash merge**.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `style:`, `refactor:`, `chore:` or `docs:`. Keep each commit small and focused, for example `style: tighten hero spacing on mobile`.

## Checks

- **On commit:** Husky runs Prettier and ESLint on the files you changed.
- **On every pull request:** CI runs typecheck, lint, a format check, the build and the Playwright smoke tests.
- **Locally:**

```sh
npm run typecheck && npm run lint && npm run build
npm run test:e2e
```

## Accessibility and quality bar

These are the targets iteration 1 meets, so please keep them:

- **Lighthouse (mobile):** Performance 95+, Accessibility 100, Best Practices 100, SEO 100.
- **No horizontal scroll** at 360, 768, 1280 and 1440px and wider.
- **Contrast:** WCAG AA. `--color-faint` is for large text and icons only.
- **Touch targets:** 44px or larger (`min-h-touch`).
- **Focus:** visible on every interactive element.
- **One h1 per page**, with headings in order.
- **Motion:** marquees can be paused, and nothing moves under `prefers-reduced-motion`.
