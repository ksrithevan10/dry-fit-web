import { expect, test } from "@playwright/test";
import { areaContent } from "@/content/areas";

const harrow = areaContent("harrow");

test("Harrow area page has one h1, breadcrumbs and schema", async ({
  page,
}) => {
  await page.goto("/kitchen-fitter-harrow");

  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveText(harrow.heading);
  await expect(
    page.getByRole("navigation", { name: "Breadcrumb" }),
  ).toBeVisible();

  const types = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .flatMap((script) => [JSON.parse(script.textContent ?? "{}")].flat())
        .map((item) => item["@type"]),
    );
  expect(types).toEqual(
    expect.arrayContaining([
      "BreadcrumbList",
      "Service",
      "FAQPage",
      "HomeAndConstructionBusiness",
    ]),
  );

  await expect(page).toHaveTitle(new RegExp(harrow.meta.title));
});

test("unpublished area pages are not built", async ({ page }) => {
  const response = await page.goto("/kitchen-fitter-pinner");
  expect(response?.status()).toBe(404);
});
