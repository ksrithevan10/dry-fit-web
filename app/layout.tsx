import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { TopBar } from "@/components/layout/TopBar";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";
import "./globals.css";

/** Headings: Bricolage Grotesque 500–700, with the optical size axis. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable", // one file covers the 500 and 700 weights used
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

/** Body: Hanken Grotesk 400–600. */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "variable", // one file covers the 400, 500 and 600 weights used
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },
  description: site.seo.defaultDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
};

const MAIN_ID = "main";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${bricolage.variable} ${hanken.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SkipLink label={site.ui.skipLink} targetId={MAIN_ID} />
        <TopBar
          message={site.topBar.message}
          call={site.topBar.call}
          phoneHref={site.phone.href}
        />
        <Header />
        <main id={MAIN_ID} tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
