import { ImageResponse } from "next/og";

export const alt = "Raffy Francisco — Web Developer & Graphic Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#202124",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#818cf8", letterSpacing: 4 }}>
          NULLSCOLLECTION.TECH
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 24 }}>
          Raffy Francisco
        </div>
        <div style={{ fontSize: 36, color: "#9aa0a6", marginTop: 16 }}>
          Web Developer & Graphic Designer · AI Automation
        </div>
      </div>
    ),
    size,
  );
}
