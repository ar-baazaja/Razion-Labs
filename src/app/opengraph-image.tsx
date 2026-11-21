import { ImageResponse } from "next/og";

export const alt = "Razion Labs: Engineer intelligence. Transform operations.";
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
          justifyContent: "space-between",
          padding: 72,
          background: "#FAFAF8",
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#0A0A0A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5 }}>
          Razion <span style={{ color: "#565D60", marginLeft: 10 }}>Labs</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
          <span>Engineer intelligence.</span>
          <span style={{ color: "#00A99A" }}>Transform operations.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#565D60" }}>
          AI engineering · Process mining · Intelligent automation
        </div>
      </div>
    ),
    size,
  );
}
