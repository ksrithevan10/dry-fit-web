import { ImageResponse } from "next/og";
import { home } from "@/content/home";
import { site } from "@/content/site";

/*
 * Text-based Open Graph image, shared by every page. Colours mirror the tokens
 * in globals.css (ImageResponse cannot read CSS variables).
 */
export const alt = site.seo.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colours = {
  dark: "#17150F",
  primary: "#1F5A43",
  text: "#FFFFFF",
  muted: "#BDB5A8",
};

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colours.dark,
        color: colours.text,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.03em" }}>
        {site.logoText}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {home.hero.headingLines.join(" ")}
        </div>
        <div style={{ fontSize: 30, color: colours.muted }}>
          {site.topBar.message}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: 12,
          width: 160,
          background: colours.primary,
          borderRadius: 999,
        }}
      />
    </div>,
    size,
  );
}
