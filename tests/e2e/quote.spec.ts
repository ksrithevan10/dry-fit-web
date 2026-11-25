import { expect, test } from "@playwright/test";
import { quoteForm, quoteThanks } from "@/content/quote";

test.describe("quote form", () => {
  test("shows errors for an empty submit", async ({ page }) => {
    await page.goto("/quote");
    await page.getByRole("button", { name: quoteForm.submit }).click();

    const summary = page
      .getByRole("alert")
      .filter({ hasText: quoteForm.errors.summary });
    await expect(summary).toContainText(quoteForm.errors.summary);
    await expect(summary).toBeFocused();
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  });

  test("prefills from the homepage and submits to the thank-you page", async ({
    page,
  }) => {
    await page.goto("/quote?source=showroom&units=9-14&worktop=laminate");
    await expect(
      page.locator('input[name="source"][value="showroom"]'),
    ).toBeChecked();
    await expect(
      page.locator('input[name="units"][value="9-14"]'),
    ).toBeChecked();

    await page.fill("#name", "Test Customer");
    await page.fill("#phone", "07700 900123");
    await page.fill("#email", "test@example.com");
    await page.fill("#postcode", "ha1 1aa");
    await page.selectOption("#timing", "asap");
    await page.locator("#plan-files").setInputFiles({
      name: "plan.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("%PDF-1.4 test"),
    });
    await page.check("#consent");

    await page.getByRole("button", { name: quoteForm.submit }).click();
    await expect(page).toHaveURL(/\/quote\/thanks$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      quoteThanks.heading,
    );
  });

  test("flags postcodes outside the main area without blocking", async ({
    page,
  }) => {
    await page.goto("/quote");
    await page.fill("#postcode", "SW1A 1AA");
    await page.locator("#postcode").blur();
    await expect(page.locator("#postcode-area")).toHaveText(
      quoteForm.outsideArea,
    );
  });
});
