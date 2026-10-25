import { ImageResponse } from "next/og";
import { site } from "../../site-config";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function SocialImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "90px",
        background: "#090e18",
        color: "#f1f5fc",
        border: "2px solid #283349",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 20,
          letterSpacing: 6,
          color: "#8ab4ff",
          marginBottom: 52,
        }}
      >
        PORTFOLIO
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 86,
          fontWeight: 600,
          letterSpacing: -4,
        }}
      >
        {site.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 48,
          color: "#8ab4ff",
          marginTop: 12,
        }}
      >
        {site.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 23,
          color: "#b0bbcd",
          marginTop: 54,
        }}
      >
        React / Next.js / TypeScript
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: 70,
          bottom: 54,
          fontSize: 18,
          color: "#b0bbcd",
        }}
      >
        phanvandat.id.vn
      </div>
    </div>,
    size,
  );
}
