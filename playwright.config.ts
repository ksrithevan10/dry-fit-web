import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests against a production build. Run with `npm run test:e2e`
 * (builds first via the webServer command if nothing is running on :3000).
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "off",
  },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 900 },
      },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    // No email, spam or upload keys: the quote form logs and redirects.
    env: {
      RESEND_API_KEY: "",
      TURNSTILE_SECRET_KEY: "",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
      BLOB_READ_WRITE_TOKEN: "",
    },
  },
});
