# Content to do

Everything still missing before launch. Each placeholder shows on the site in
`[square brackets]` so nothing unconfirmed slips through. Edit the value in the
file listed, then tick it off here.

To find any placeholder left in the content:

```sh
grep -rn "\[" content/
```

## Business details: `content/site.ts`

These are reused across every page, the footer and the structured data.

- [ ] Phone number: `phone.display` (as shown) and `phone.href` (international format, e.g. `+442012345678`)
- [ ] WhatsApp number: `whatsappHref`, e.g. `https://wa.me/447700900123`
- [ ] Email address: `[Email]@dry-fit.com`
- [ ] Street address and full postcode: `HA[X] [XXX]`
- [ ] Company number: `[Company no.]`
- [ ] Opening hours, in full: `hours.full` (the top bar already says "Mon–Sat")
- [ ] Google rating: `googleRating` (`[4.9]`)
- [ ] Google review count: `googleReviewCount`
- [ ] Service radius: `serviceRadius` ("Harrow + [X] miles")

Once the rating and review count are real, add `aggregateRating` to
`businessSchema()` in `lib/schema.ts`. It is left out on purpose until then.

## Claims to confirm

- [ ] "Fully insured [confirm]": `content/home.ts` (hero chips)
- [ ] "[X]-year workmanship guarantee": `content/home.ts` (hero chips)
- [ ] "Integrated appliance housings [confirm]": `content/scope.ts`, `content/dry-fitting.ts` (units page)
- [ ] Typical fit "[X–Y] days" for each unit band: `content/home.ts` (`priceBuilder.typicalFit`)
- [ ] Typical fit "[X–Y] days" in general: `content/faqs.ts` (how long) and `content/dry-fitting.ts` (process step 3)
- [ ] Reply time after a quote request: `content/quote.ts` (`[response time]`)
- [ ] Postcodes in the service area: `content/quote.ts` (`coveredPostcodePrefixes`, currently `["HA"]` because all ten listed areas are HA postcodes) and `content/areas.ts` (postcode lists)

## Reviews: `content/reviews.ts`

- [ ] Six real Google reviews (quote, first name, area), with the customers' permission
- [ ] Link to the Google reviews page: `reviewsPage.googleLink.href`

## About page: `content/about.ts`

- [ ] Founder names (x2) and roles
- [ ] Years selling high-street kitchens (`[X]`)
- [ ] Founder story, in your own words
- [ ] Short bios

## Area pages: `content/areas.ts`

Harrow is built, but its local paragraphs and postcodes are still placeholders.

- [ ] Harrow: genuinely local content (the homes and kitchens you fit there, a recent job)
- [ ] Harrow: postcode districts covered

The other nine areas each need **genuinely local content** before their pages
are published. Don't copy the Harrow page and swap the name: thin
find-and-replace pages are bad for search rankings. Until then they link to
`/areas`. The steps to publish one are at the top of `content/areas.ts`.

- [ ] Pinner
- [ ] Stanmore
- [ ] Wembley
- [ ] Edgware
- [ ] Kenton
- [ ] Hatch End
- [ ] Rayners Lane
- [ ] Northwood
- [ ] Ruislip

## Legal: `content/legal.ts`

Both pages are structural drafts. **Get them reviewed by a legal professional
before launch.**

- [ ] Company legal name
- [ ] Privacy: lawful basis, full list of processors and any international transfers, retention periods, cookies
- [ ] Terms: how quotes work, fitting terms, limitation of liability, governing law
- [ ] "Last updated" dates

## Images (future iteration)

Iteration 1 has no photography. Each place an image will go has an `<ImageSlot>`
in the code (search for `<ImageSlot`), which renders nothing for now. See
`components/ui/ImageSlot.tsx` for how to switch one on.

| Slot                                 | Where                                | Brief                                                        |
| ------------------------------------ | ------------------------------------ | ------------------------------------------------------------ |
| `home-hero`                          | `components/sections/Hero.tsx`       | Full-bleed photo of a finished high-street kitchen we fitted |
| `home-closing`                       | `components/sections/ClosingCta.tsx` | Wide shot of a finished kitchen behind the closing headline  |
| `about-founder-1`, `about-founder-2` | `app/about/page.tsx`                 | Founder portraits                                            |
| `area-harrow`                        | `components/templates/AreaPage.tsx`  | A kitchen we fitted in Harrow (one per area page)            |

Image-led sections from the design reference that will return once photos exist:

- **"Recent fits" project panels** on the homepage, between "What we fit" and "What is dry fitting?". The design reference has three full-height panels, and they'll need a `/projects` page.
- **Hover thumbnails** on the "What we fit" list (`components/sections/ServiceList.tsx`).

## Brand assets

- [ ] Logo: the wordmark is text for now (`components/ui/Logo.tsx`)
- [ ] Favicon: `app/icon.svg` is a placeholder in brand colours
- [ ] Open Graph image: `app/opengraph-image.tsx` is text-based and could use a photo later

## Launch setup (Vercel project settings)

- [ ] Connect a Vercel Blob store (sets `BLOB_READ_WRITE_TOKEN`)
- [ ] `RESEND_API_KEY`, `LEADS_EMAIL`, `EMAIL_FROM` (verify the sending domain in Resend)
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`
- [ ] `NEXT_PUBLIC_SITE_URL=https://dry-fit.com` for production
- [ ] Add the `dry-fit.com` domain
