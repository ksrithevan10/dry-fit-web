import { expect, test } from "@playwright/test";
import { home } from "@/content/home";

test.describe("homepage", () => {
  test("renders every section with one h1 and no horizontal scroll", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(home.hero.headingLines[0]!);
    for (const heading of [
      home.priceBuilder.heading,
      home.whatIs.heading,
      home.reviews.heading,
    ]) {
      await expect(
        page.getByRole("heading", { level: 2, name: heading }),
      ).toBeVisible();
    }

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test("price builder updates the summary and links to the quote form", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section", {
      has: page.getByRole("heading", { name: home.priceBuilder.heading }),
    });

    await section.getByText("Trade supplier", { exact: true }).click();
    await section.getByText("20+", { exact: true }).click();
    await section.getByText("Solid wood", { exact: true }).click();
    await expect(section.locator("[aria-live]")).toHaveText(
      "A kitchen from a trade supplier, 20+ units, solid wood worktop.",
    );

    await section
      .getByRole("button", { name: home.priceBuilder.submit.label })
      .click();
    await expect(page).toHaveURL(
      /\/quote\?source=trade&units=20-plus&worktop=solid-wood/,
    );
  });

  test("marquees can be paused", async ({ page }) => {
    await page.goto("/");
    const button = page
      .getByRole("button", { name: home.marquee.pause })
      .first();
    await button.click();
    await expect(
      page.getByRole("button", { name: home.marquee.play }).first(),
    ).toHaveAttribute("aria-pressed", "true");
  });
});
